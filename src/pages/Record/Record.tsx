import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";

import {
  CheckCircle,
  Mic as MicIcon,
  Pause as PauseIcon,
  Play as PlayIcon,
  Radio as RadioIcon,
  RotateCcw as RotateCcwIcon,
  Save as SaveIcon,
  Square as SquareIcon,
  Upload as UploadIcon,
  Video as VideoIcon,
  Volume2 as VolumeIcon,
} from "lucide-react-native";

import { useNavigation } from "@react-navigation/native";
import { Video as ExpoVideo, ResizeMode } from "expo-av";

import { uploadMedia } from "../../services/mediaService";
import { createStory } from "../../services/storyService";
import { styles } from './Record.styles';

type RecordingMode = "audio" | "video";
type RecordingStatus = "idle" | "recording" | "paused" | "stopped";

export default function Record() {
  const navigation: any = useNavigation();

  const [mode, setMode] = useState<RecordingMode>("audio");
  const [status, setStatus] = useState<RecordingStatus>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const timerRef = useRef<any>(null);
  const animationRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const blobRef = useRef<Blob | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const playerRef = useRef<any>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const startRecording = async () => {
    try {
      if (!navigator?.mediaDevices?.getUserMedia) {
        Alert.alert(
          "Recording not supported",
          "Media recording only works in web builds."
        );
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: mode === "video",
      });

      streamRef.current = stream;

      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];

      recorder.ondataavailable = (e: BlobEvent) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current);
        blobRef.current = blob;
        const url = URL.createObjectURL(blob);
        setRecordedUrl(url);
      };

      mediaRecorderRef.current = recorder;
      recorder.start();

      setStatus("recording");
      setElapsed(0);

      timerRef.current = setInterval(() => {
        setElapsed((p) => p + 1);
      }, 1000);
    } catch (err) {
      Alert.alert("Permission error", "Microphone / camera access denied.");
    }
  };

  const pauseRecording = () => {
    mediaRecorderRef.current?.pause();
    setStatus("paused");
  };

  const resumeRecording = () => {
    mediaRecorderRef.current?.resume();
    setStatus("recording");
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setStatus("stopped");

    if (timerRef.current) clearInterval(timerRef.current);

    streamRef.current?.getTracks().forEach((t) => t.stop());
  };

  const resetRecording = () => {
    setStatus("idle");
    setElapsed(0);
    setRecordedUrl(null);
    setSaved(false);
    setSaveError(null);
    blobRef.current = null;
  };

  const handleSave = async () => {
    if (!blobRef.current) return;

    setSaving(true);
    setSaveError(null);

    try {
      const upload = await uploadMedia(blobRef.current, mode);

      await createStory({
        title: `${mode} story`,
        content: "",
        category: "fiction",
        mediaType: mode,
        mediaUrl: upload.url,
      });

      setSaved(true);
      setTimeout(() => navigation.navigate("Stories"), 1200);
    } catch (err: any) {
      setSaveError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      {/* MODE SELECTOR */}

      <View style={styles.modeSelector}>
        <Pressable
          style={[styles.modeBtn, mode === "audio" && styles.modeBtnActive]}
          onPress={() => {
            setMode("audio");
            resetRecording();
          }}
        >
          <MicIcon size={18} color="#fff" />
          <Text style={styles.modeText}>Audio Story</Text>
        </Pressable>

        <Pressable
          style={[styles.modeBtn, mode === "video" && styles.modeBtnActive]}
          onPress={() => {
            setMode("video");
            resetRecording();
          }}
        >
          <VideoIcon size={18} color="#fff" />
          <Text style={styles.modeText}>Video Story</Text>
        </Pressable>
      </View>

      {/* RECORDING AREA */}

      <View style={styles.recordingStage}>
        <Text style={styles.timerDisplay}>{formatTime(elapsed)}</Text>

        {/* CONTROLS */}

        {status === "idle" && (
          <Pressable
            style={[styles.recordBtn, styles.recordBtnStart]}
            onPress={startRecording}
          >
            <MicIcon size={28} color="#fff" />
          </Pressable>
        )}

        {status === "recording" && (
          <View style={styles.controlGroup}>
            <Pressable style={styles.controlBtn} onPress={pauseRecording}>
              <PauseIcon size={20} color="#fff" />
            </Pressable>

            <Pressable
              style={[styles.recordBtn, styles.recordBtnStop]}
              onPress={stopRecording}
            >
              <SquareIcon size={20} color="#fff" />
            </Pressable>
          </View>
        )}

        {status === "paused" && (
          <View style={styles.controlGroup}>
            <Pressable style={styles.controlBtn} onPress={resumeRecording}>
              <PlayIcon size={20} color="#fff" />
            </Pressable>

            <Pressable
              style={[styles.recordBtn, styles.recordBtnStop]}
              onPress={stopRecording}
            >
              <SquareIcon size={20} color="#fff" />
            </Pressable>
          </View>
        )}

        {status === "stopped" && (
          <View style={styles.controlGroup}>
            <Pressable style={styles.controlBtn} onPress={resetRecording}>
              <RotateCcwIcon size={20} color="#fff" />
            </Pressable>

            <Pressable style={styles.saveBtn} onPress={handleSave}>
              {saving ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <SaveIcon size={18} color="#fff" />
                  <Text style={styles.saveText}>Save Story</Text>
                </>
              )}
            </Pressable>
          </View>
        )}

        {saveError && <Text style={styles.saveError}>{saveError}</Text>}
      </View>

      {/* PLAYBACK */}

      {recordedUrl && (
        <ExpoVideo
          ref={playerRef}
          source={{ uri: recordedUrl }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          style={styles.playbackVideo}
        />
      )}

      {/* UPLOAD */}

      <View style={styles.uploadSection}>
        <UploadIcon size={24} color="#fff" />
        <Text style={styles.uploadTitle}>Upload existing recording</Text>
      </View>
    </ScrollView>
  );
}