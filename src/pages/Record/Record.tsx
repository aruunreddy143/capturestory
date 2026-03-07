import { CheckCircle, Loader2, Mic, Pause, Play, Radio, RotateCcw, Save, Square, Upload, Video, Volume2 } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadMedia } from '../../services/mediaService';
import { createStory } from '../../services/storyService';
import './Record.css';

type RecordingMode = 'audio' | 'video';
type RecordingStatus = 'idle' | 'recording' | 'paused' | 'stopped';

export default function Record() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<RecordingMode>('audio');
  const [status, setStatus] = useState<RecordingStatus>('idle');
  const [elapsed, setElapsed] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const animationRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const blobRef = useRef<Blob | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const playerRef = useRef<HTMLAudioElement | HTMLVideoElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const startAnalyser = useCallback((stream: MediaStream) => {
    const audioCtx = new AudioContext();
    audioCtxRef.current = audioCtx;
    const source = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);
    analyserRef.current = analyser;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    animationRef.current = setInterval(() => {
      analyser.getByteFrequencyData(dataArray);
      const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
      setAudioLevel((avg / 255) * 100);
    }, 80);
  }, []);

  const stopAnalyser = useCallback(() => {
    if (animationRef.current) clearInterval(animationRef.current);
    analyserRef.current = null;
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    setAudioLevel(0);
  }, []);

  const startRecording = async () => {
    try {
      const constraints: MediaStreamConstraints =
        mode === 'video' ? { audio: true, video: true } : { audio: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      const mimeType = mode === 'video'
        ? (MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus') ? 'video/webm;codecs=vp9,opus' : 'video/webm')
        : (MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus' : 'audio/webm');

      const recorder = new MediaRecorder(stream, { mimeType });
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        blobRef.current = blob;
        const url = URL.createObjectURL(blob);
        setRecordedUrl(url);
      };
      mediaRecorderRef.current = recorder;
      recorder.start(200);

      setStatus('recording');
      setElapsed(0);
      setRecordedUrl(null);
      setIsPlaying(false);
      timerRef.current = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
      startAnalyser(stream);
    } catch (err) {
      console.error('Could not access media devices:', err);
    }
  };

  const pauseRecording = () => {
    setStatus('paused');
    if (timerRef.current) clearInterval(timerRef.current);
    mediaRecorderRef.current?.pause();
    stopAnalyser();
  };

  const resumeRecording = () => {
    setStatus('recording');
    timerRef.current = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    mediaRecorderRef.current?.resume();
    if (streamRef.current) startAnalyser(streamRef.current);
  };

  const stopRecording = () => {
    setStatus('stopped');
    if (timerRef.current) clearInterval(timerRef.current);
    mediaRecorderRef.current?.stop();
    stopAnalyser();
    // Release camera/mic
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  };

  const resetRecording = () => {
    setStatus('idle');
    setElapsed(0);
    setAudioLevel(0);
    setIsPlaying(false);
    setSaving(false);
    setSaveError(null);
    setSaved(false);
    blobRef.current = null;
    if (recordedUrl) {
      URL.revokeObjectURL(recordedUrl);
      setRecordedUrl(null);
    }
    // Stop any playing media
    if (playerRef.current) {
      playerRef.current.pause();
      playerRef.current = null;
    }
  };

  const handleSave = async () => {
    if (!blobRef.current) return;
    setSaving(true);
    setSaveError(null);
    try {
      // 1. Upload the media file
      const upload = await uploadMedia(blobRef.current, mode);

      // 2. Create a story linked to the uploaded media
      await createStory({
        title: `${mode === 'video' ? 'Video' : 'Audio'} Story — ${new Date().toLocaleDateString()}`,
        content: '',
        category: 'fiction',
        mediaType: mode,
        mediaUrl: upload.url,
      });

      setSaved(true);
      // Navigate to stories list after a brief success flash
      setTimeout(() => navigate('/stories'), 1200);
    } catch (err) {
      console.error('Save failed:', err);
      setSaveError(err instanceof Error ? err.message : 'Failed to save recording');
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopAnalyser();
      streamRef.current?.getTracks().forEach((t) => t.stop());
      if (recordedUrl) URL.revokeObjectURL(recordedUrl);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="record-page">
      {/* Mode Selector */}
      <div className="mode-selector">
        <button
          className={`mode-btn ${mode === 'audio' ? 'mode-btn--active' : ''}`}
          onClick={() => {
            setMode('audio');
            resetRecording();
          }}
        >
          <Mic size={20} />
          <span>Audio Story</span>
        </button>
        <button
          className={`mode-btn ${mode === 'video' ? 'mode-btn--active' : ''}`}
          onClick={() => {
            setMode('video');
            resetRecording();
          }}
        >
          <Video size={20} />
          <span>Video Story</span>
        </button>
      </div>

      {/* Recording Area */}
      <div className="recording-area">
        <div
          className={`recording-stage ${status === 'recording' ? 'recording-stage--active' : ''}`}
        >
          {/* Visualizer */}
          <div className="visualizer">
            {mode === 'video' && status === 'idle' && (
              <div className="video-preview-placeholder">
                <Video size={48} />
                <p>Camera preview will appear here</p>
              </div>
            )}

            {mode === 'audio' && (
              <div className="audio-visualizer">
                <div className="wave-container">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div
                      key={i}
                      className="wave-bar"
                      style={{
                        height:
                          status === 'recording'
                            ? `${Math.max(4, audioLevel * Math.sin(i * 0.3 + Date.now() * 0.003) * 0.7 + 20)}%`
                            : '4px',
                        transition: 'height 0.1s ease',
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {mode === 'video' && status !== 'idle' && (
              <div className="video-recording-indicator">
                <div className="camera-frame">
                  <Video size={64} />
                  {status === 'recording' && (
                    <div className="rec-badge">
                      <Radio size={12} />
                      REC
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Timer */}
          <div className="recording-timer">
            <span
              className={`timer-display ${status === 'recording' ? 'timer-display--active' : ''}`}
            >
              {formatTime(elapsed)}
            </span>
            {status === 'recording' && (
              <span className="recording-indicator">
                <span className="pulse-dot" />
                Recording
              </span>
            )}
            {status === 'paused' && <span className="paused-indicator">Paused</span>}
          </div>

          {/* Controls */}
          <div className="recording-controls">
            {status === 'idle' && (
              <button className="record-btn record-btn--start" onClick={startRecording}>
                <div className="record-btn-inner">
                  {mode === 'audio' ? <Mic size={28} /> : <Video size={28} />}
                </div>
                <span>Start Recording</span>
              </button>
            )}

            {status === 'recording' && (
              <div className="control-group">
                <button className="control-btn" onClick={pauseRecording}>
                  <Pause size={20} />
                  <span>Pause</span>
                </button>
                <button className="record-btn record-btn--stop" onClick={stopRecording}>
                  <div className="record-btn-inner record-btn-inner--stop">
                    <Square size={22} />
                  </div>
                </button>
              </div>
            )}

            {status === 'paused' && (
              <div className="control-group">
                <button className="control-btn" onClick={resumeRecording}>
                  <Play size={20} />
                  <span>Resume</span>
                </button>
                <button className="record-btn record-btn--stop" onClick={stopRecording}>
                  <div className="record-btn-inner record-btn-inner--stop">
                    <Square size={22} />
                  </div>
                </button>
              </div>
            )}

            {status === 'stopped' && (
              <div className="control-group">
                <button className="control-btn" onClick={resetRecording} disabled={saving}>
                  <RotateCcw size={20} />
                  <span>Re-record</span>
                </button>
                <button
                  className={`save-btn ${saved ? 'save-btn--success' : ''}`}
                  onClick={handleSave}
                  disabled={saving || saved}
                >
                  {saving ? (
                    <><Loader2 size={18} className="spin-icon" /> <span>Saving…</span></>
                  ) : saved ? (
                    <><CheckCircle size={18} /> <span>Saved!</span></>
                  ) : (
                    <><Save size={18} /> <span>Save Story</span></>
                  )}
                </button>
              </div>
            )}
            {saveError && (
              <p className="save-error">{saveError}</p>
            )}
          </div>

          {/* Playback Section */}
          {status === 'stopped' && recordedUrl && (
            <div className="playback-section">
              <div className="playback-header">
                <Volume2 size={18} />
                <span>Preview Recording</span>
              </div>

              {mode === 'audio' ? (
                <audio
                  ref={(el) => { playerRef.current = el; }}
                  src={recordedUrl}
                  controls
                  className="playback-audio"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                />
              ) : (
                <video
                  ref={(el) => { playerRef.current = el; }}
                  src={recordedUrl}
                  controls
                  className="playback-video"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                />
              )}

              {isPlaying && (
                <span className="playback-status">
                  <span className="pulse-dot pulse-dot--play" />
                  Playing…
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="record-tips">
        <h4 className="tips-heading">Recording Tips</h4>
        <div className="tips-grid">
          <div className="tip-card">
            <span className="tip-emoji">🎙️</span>
            <p>Find a quiet space with minimal background noise for the best recording quality.</p>
          </div>
          <div className="tip-card">
            <span className="tip-emoji">💡</span>
            <p>Speak naturally, as if telling the story to a friend sitting across from you.</p>
          </div>
          <div className="tip-card">
            <span className="tip-emoji">🎬</span>
            <p>For video, ensure good lighting — natural light facing you works best.</p>
          </div>
          <div className="tip-card">
            <span className="tip-emoji">⏱️</span>
            <p>Keep stories between 3-10 minutes for optimal listener engagement.</p>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="upload-section">
        <Upload size={24} />
        <div>
          <p className="upload-title">Or upload an existing recording</p>
          <p className="upload-subtitle">Support MP3, WAV, MP4, WebM up to 500MB</p>
        </div>
        <button className="btn btn-secondary">Choose File</button>
      </div>
    </div>
  );
}
