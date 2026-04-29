import React, { useEffect, useRef } from "react";
import { View, Text, Pressable, Platform, Linking } from "react-native";
import {
  Mic as MicIcon,
  Video as VideoIcon,
  X as XIcon,
  Play as PlayIcon,
  Pause as PauseIcon,
  RotateCcw as RotateCcwIcon,
} from "lucide-react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { useAudioPlayer } from "expo-audio";

import type { Story } from "../../types";
import { styles } from "./StoryPlayer.styles";

const API_BASE =
  (typeof process !== "undefined" && process.env?.VITE_API_URL) ||
  (globalThis as any)?.VITE_API_URL ||
  "http://localhost:8000";

interface StoryPlayerProps {
  story: Story;
  onClose: () => void;
}

function streamUrl(story: Story): string {
  const mediaUrl = story.mediaUrl ?? "";
  if (mediaUrl.startsWith("http")) return mediaUrl;
  const match = mediaUrl.match(/\/uploads\/(audio|video)\/(.+)$/);
  if (match) {
    const [, mediaType, filename] = match;
    return `${API_BASE}/media/stream/${mediaType}/${filename}`;
  }
  return `${API_BASE.replace(/\/api\/?$/, "")}${mediaUrl}`;
}

function extractBackgroundColor(gradientOrColor?: string) {
  if (!gradientOrColor) return "#e6e6e6";
  const simpleColorMatch = gradientOrColor.match(
    /^(#(?:[0-9a-fA-F]{3,6})|rgba?\([^)]+\))/
  );
  if (simpleColorMatch) return simpleColorMatch[0];
  const hexMatch = gradientOrColor.match(/#(?:[0-9a-fA-F]{3,6})/);
  if (hexMatch) return hexMatch[0];
  return "#6b6b6b";
}

function NativeVideoPlayer({ src }: { src: string }) {
  const player = useVideoPlayer(src, (player) => {
    player.loop = false;
    player.play();
  });

  return (
    <VideoView
      player={player}
      nativeControls
      contentFit="contain"
      style={styles.video}
    />
  );
}

function NativeAudioPlayer({ src }: { src: string }) {
  const player = useAudioPlayer(src);

  useEffect(() => {
    player.play();
  }, [player]);

  return (
    <View style={styles.audioPlayer}>
      <View style={{ flexDirection: "row", gap: 12, justifyContent: "center" }}>
        <Pressable
          onPress={() => player.play()}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 12,
            backgroundColor: "#f0f0f0",
            borderRadius: 6,
          }}
        >
          <PlayIcon size={18} color="#222" />
        </Pressable>

        <Pressable
          onPress={() => player.pause()}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 12,
            backgroundColor: "#f0f0f0",
            borderRadius: 6,
          }}
        >
          <PauseIcon size={18} color="#222" />
        </Pressable>

        <Pressable
          onPress={() => {
            player.seekTo(0);
            player.play();
          }}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 12,
            backgroundColor: "#f0f0f0",
            borderRadius: 6,
          }}
        >
          <RotateCcwIcon size={18} color="#222" />
        </Pressable>
      </View>
    </View>
  );
}

export default function StoryPlayer({ story, onClose }: StoryPlayerProps) {
  const overlayRef = useRef(null);
  const src = streamUrl(story);
  const MediaIcon = story.mediaType === "video" ? VideoIcon : MicIcon;
  const artBackground = extractBackgroundColor(story.coverGradient);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
    return;
  }, [onClose]);

  function openExternally() {
    Linking.openURL(src).catch(() => {});
  }

  return (
    <Pressable style={styles.overlay} ref={overlayRef} onPress={onClose}>
      <Pressable
        style={styles.card}
        onPress={() => {
          /* consume press to avoid closing */
        }}
      >
        <View style={styles.header}>
          <View style={styles.meta}>
            <View style={styles.badge}>
              <MediaIcon size={14} color="#fff" />
              <Text style={styles.badgeText}>{story.mediaType}</Text>
            </View>
            <Text style={styles.category}>{story.category}</Text>
          </View>

          <Pressable
            onPress={onClose}
            style={styles.closeButton}
            accessibilityRole="button"
          >
            <XIcon size={20} color="#222" />
          </Pressable>
        </View>

        <Text style={styles.title}>{story.title}</Text>

        <View style={styles.mediaWrap}>
          {story.mediaType === "video" ? (
            Platform.OS === "web" ? (
              // @ts-ignore - HTML5 video on web
              <video controls src={src} style={styles.video as any} />
            ) : (
              <NativeVideoPlayer src={src} />
            )
          ) : (
            <View style={styles.audioWrap}>
              <View style={[styles.audioArt, { backgroundColor: artBackground }]}>
                <MicIcon size={48} color="#fff" />
              </View>

              {Platform.OS === "web" ? (
                // @ts-ignore - HTML5 audio on web
                <audio controls src={src} style={styles.audioPlayer as any} />
              ) : (
                <NativeAudioPlayer src={src} />
              )}
            </View>
          )}
        </View>

        {story.excerpt ? <Text style={styles.excerpt}>{story.excerpt}</Text> : null}

        <View style={styles.footer}>
          <Text style={styles.author}>{story.author?.name}</Text>
          <Text style={styles.date}>
            {new Date(story.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Text>
        </View>
      </Pressable>
    </Pressable>
  );
}
