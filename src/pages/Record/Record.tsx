import { Mic, Pause, Play, Radio, RotateCcw, Save, Square, Upload, Video } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import './Record.css';

type RecordingMode = 'audio' | 'video';
type RecordingStatus = 'idle' | 'recording' | 'paused' | 'stopped';

export default function Record() {
  const [mode, setMode] = useState<RecordingMode>('audio');
  const [status, setStatus] = useState<RecordingStatus>('idle');
  const [elapsed, setElapsed] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const animationRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const simulateAudioLevel = useCallback(() => {
    animationRef.current = setInterval(() => {
      setAudioLevel(Math.random() * 100);
    }, 100);
  }, []);

  const startRecording = () => {
    setStatus('recording');
    setElapsed(0);
    timerRef.current = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    simulateAudioLevel();
  };

  const pauseRecording = () => {
    setStatus('paused');
    if (timerRef.current) clearInterval(timerRef.current);
    if (animationRef.current) clearInterval(animationRef.current);
    setAudioLevel(0);
  };

  const resumeRecording = () => {
    setStatus('recording');
    timerRef.current = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    simulateAudioLevel();
  };

  const stopRecording = () => {
    setStatus('stopped');
    if (timerRef.current) clearInterval(timerRef.current);
    if (animationRef.current) clearInterval(animationRef.current);
    setAudioLevel(0);
  };

  const resetRecording = () => {
    setStatus('idle');
    setElapsed(0);
    setAudioLevel(0);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (animationRef.current) clearInterval(animationRef.current);
    };
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
                <button className="control-btn" onClick={resetRecording}>
                  <RotateCcw size={20} />
                  <span>Re-record</span>
                </button>
                <button className="save-btn">
                  <Save size={18} />
                  <span>Save Story</span>
                </button>
              </div>
            )}
          </div>
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
