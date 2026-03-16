import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
import { Video as ExpoVideo } from 'expo-av';
import { Mic as MicIcon, Video as VideoIcon, X as XIcon } from 'lucide-react-native';
import type { Story } from '../../types';
import { styles } from './StoryPlayer.styles';

const API_BASE =
  (typeof process !== 'undefined' && process.env?.VITE_API_URL) ||
  // fallback for environments that may set a global
  (globalThis as any)?.VITE_API_URL ||
  'http://localhost:8000';

interface StoryPlayerProps {
  story: Story;
  onClose: () => void;
}

/**
 * Build the streamable URL for a story's media.
 *
 * `story.mediaUrl` is stored as `/uploads/audio/20260307_abc.webm`.
 * We rewrite it to hit the streaming endpoint that supports Range requests:
 *   → `{API_BASE}/media/stream/audio/20260307_abc.webm`
 */
function streamUrl(story: Story): string {
  const mediaUrl = story.mediaUrl ?? '';

  // Already an absolute URL (e.g. https://…) — use as-is
  if (mediaUrl.startsWith('http')) return mediaUrl;

  // Expected format: /uploads/{audio|video}/{filename}
  const match = mediaUrl.match(/\/uploads\/(audio|video)\/(.+)$/);
  if (match) {
    const [, mediaType, filename] = match;
    return `${API_BASE}/media/stream/${mediaType}/${filename}`;
  }

  // Fallback: serve from the static mount
  return `${API_BASE.replace(/\/api\/?$/, '')}${mediaUrl}`;
}

/**
 * Try to extract a simple background color from a CSS gradient or color string.
 * React Native doesn't accept CSS gradients here, so we pick the first color.
 */
function extractBackgroundColor(gradientOrColor?: string) {
  if (!gradientOrColor) return '#e6e6e6';
  const simpleColorMatch = gradientOrColor.match(/^(#(?:[0-9a-fA-F]{3,6})|rgba?\([^)]+\))/);
  if (simpleColorMatch) return simpleColorMatch[0];
  const hexMatch = gradientOrColor.match(/#(?:[0-9a-fA-F]{3,6})/);
  if (hexMatch) return hexMatch[0];
  return '#6b6b6b';
}

export default function StoryPlayer({ story, onClose }: StoryPlayerProps) {
  const overlayRef = useRef(null);
  const src = streamUrl(story);
  const MediaIcon = story.mediaType === 'video' ? VideoIcon : MicIcon;
  const artBackground = extractBackgroundColor(story.coverGradient);

  // Close on Escape (web)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }
    return;
  }, [onClose]);

  // Overlay press closes; inner card Pressable consumes the press.
  return (
    <Pressable style={styles.overlay} ref={overlayRef} onPress={onClose}>
      <Pressable style={styles.card} onPress={() => { /* consume press to avoid closing */ }}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.meta}>
            <View style={styles.badge}>
              <MediaIcon size={14} color="#fff" />
              <Text style={styles.badgeText}>{story.mediaType}</Text>
            </View>
            <Text style={styles.category}>{story.category}</Text>
          </View>

          <Pressable onPress={onClose} style={styles.closeButton} accessibilityRole="button">
            <XIcon size={20} color="#222" />
          </Pressable>
        </View>

        {/* Title */}
        <Text style={styles.title}>{story.title}</Text>

        {/* Player */}
        <View style={styles.mediaWrap}>
          {story.mediaType === 'video' ? (
            <ExpoVideo
              source={{ uri: src }}
              useNativeControls
              shouldPlay
              resizeMode={'contain' as any}
              style={styles.video}
            />
          ) : (
            <View style={styles.audioWrap}>
              <View style={[styles.audioArt, { backgroundColor: artBackground }]}>
                <MicIcon size={48} color="#fff" />
              </View>

              <ExpoVideo
                source={{ uri: src }}
                useNativeControls
                shouldPlay
                isLooping={false}
                style={styles.audioPlayer}
              />
            </View>
          )}
        </View>

        {/* Story info */}
        {story.excerpt ? <Text style={styles.excerpt}>{story.excerpt}</Text> : null}

        <View style={styles.footer}>
          <Text style={styles.author}>{story.author?.name}</Text>
          <Text style={styles.date}>
            {new Date(story.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </Text>
        </View>
      </Pressable>
    </Pressable>
  );
}
