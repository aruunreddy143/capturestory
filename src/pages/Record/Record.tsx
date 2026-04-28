import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Platform,
  ActivityIndicator,
  Alert,
  Linking,
} from "react-native";

import {
  Mic as MicIcon,
  Pause as PauseIcon,
  Play as PlayIcon,
  RotateCcw as RotateCcwIcon,
  Save as SaveIcon,
  Square as SquareIcon,
  Upload as UploadIcon,
  Video as VideoIcon,
} from "lucide-react-native";

import { useNavigation } from "@react-navigation/native";
import { VideoView, useVideoPlayer } from "expo-video";
import { useAudioPlayer } from "expo-audio";

import { uploadMedia } from "../../services/mediaService";
import { createStory } from "../../services/storyService";
import { styles } from "./Record.styles";

type RecordingMode = "audio" | "video";
type RecordingStatus = "idle" | "recording" | "paused" | "stopped";

function NativeVideoPlayback({ uri }: { uri: string }) {
  const player = useVideoPlayer(uri, (player) => {
    player.loop = false;
  });

  return (
    <VideoView
      player={player}
      style={styles.playbackVideo}
      nativeControls
      allowsPictureInPicture
      contentFit="contain"
    />
  );
}

function NativeAudioPlayback({ uri }: { uri: string }) {
  const player = useAudioPlayer(uri);

  return (
    <View style={{ padding: 16, alignItems: "center", gap: 12 }}>
      <View style={styles.controlGroup}>
        <Pressable
          style={styles.controlBtn}
          onPress={() => {
            player.play();
          }}
        >
          <PlayIcon size={20} color="#fff" />
        </Pressable>

        <Pressable
          style={styles.controlBtn}
          onPress={() => {
            player.pause();
          }}
        >
          <PauseIcon size={20} color="#fff" />
        </Pressable>

        <Pressable
          style={styles.controlBtn}
          onPress={() => {
            player.seekTo(0);
            player.play();
          }}
        >
          <RotateCcwIcon size={20} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
}

export default function Record() {
  const navigation: any = useNavigation();

  const [mode, setMode] = useState<RecordingMode>("audio");
  const [status, setStatus] = useState<RecordingStatus>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const timerRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const blobRef = useRef<Blob | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      if (recordedUrl && recordedUrl.startsWith("blob:")) {
        try {
          URL.revokeObjectURL(recordedUrl);
        } catch {}
      }
    };
  }, [recordedUrl]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
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

      recorder.ondataavailable = (e: any) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: mode === "audio" ? "audio/webm" : "video/webm",
        });

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
    try {
      mediaRecorderRef.current?.pause();
      setStatus("paused");
    } catch {}
  };

  const resumeRecording = () => {
    try {
      mediaRecorderRef.current?.resume();
      setStatus("recording");
    } catch {}
  };

  const stopRecording = () => {
    try {
      mediaRecorderRef.current?.stop();
    } catch {}

    setStatus("stopped");

    if (timerRef.current) clearInterval(timerRef.current);

    try {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    } catch {}
  };

  const resetRecording = () => {
    setStatus("idle");
    setElapsed(0);
    setRecordedUrl(null);
    setSaving(false);
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
    } catch (err: any) {
      setSaveError(err?.message ?? "Upload failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
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

      <View style={styles.recordingStage}>
        <Text style={styles.timerDisplay}>{formatTime(elapsed)}</Text>

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

      {recordedUrl &&
        (Platform.OS === "web" ? (
          mode === "video" ? (
            // @ts-ignore
            <video controls src={recordedUrl} style={styles.playbackVideo as any} />
          ) : (
            // @ts-ignore
            <audio controls src={recordedUrl} style={styles.playbackVideo as any} />
          )
        ) : mode === "video" ? (
          <NativeVideoPlayback uri={recordedUrl} />
        ) : mode === "audio" ? (
          <NativeAudioPlayback uri={recordedUrl} />
        ) : (
          <View style={{ padding: 16, alignItems: "center" }}>
            <Text style={styles.saveError}>Playback not available.</Text>

            <Pressable
              onPress={() => {
                if (recordedUrl) Linking.openURL(recordedUrl).catch(() => {});
              }}
              style={styles.saveBtn}
            >
              <Text style={styles.saveText}>Open recording</Text>
            </Pressable>
          </View>
        ))}

      <View style={styles.uploadSection}>
        <UploadIcon size={24} color="#fff" />
        <Text style={styles.uploadTitle}>Upload existing recording</Text>
      </View>
    </ScrollView>
  );
}
