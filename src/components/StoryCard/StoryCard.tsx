import React from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
import { Clock, Eye, FileText, Heart, Mic, Video } from 'lucide-react-native';
import type { Story } from '../../types';
import { styles } from './StoryCard.styles';

interface StoryCardProps {
  story: Story;
  variant?: 'default' | 'compact' | 'featured';
  onClick?: () => void;
}

const mediaIcons: Record<Story['mediaType'], React.ComponentType<any>> = {
  text: FileText,
  audio: Mic,
  video: Video,
};

function extractBackgroundColor(gradientOrColor?: string) {
  if (!gradientOrColor) return '#e6e6e6';
  // If it's a simple color (hex or rgb), use it directly
  const simpleColorMatch = gradientOrColor.match(/^(#(?:[0-9a-fA-F]{3,6})|rgba?\([^)]+\))/);
  if (simpleColorMatch) return simpleColorMatch[0];
  // Try to extract first hex color from a gradient string like: linear-gradient(..., #123456, ...)
  const hexMatch = gradientOrColor.match(/#(?:[0-9a-fA-F]{3,6})/);
  if (hexMatch) return hexMatch[0];
  // Fallback
  return '#6b6b6b';
}

export default function StoryCard({ story, variant = 'default', onClick }: StoryCardProps) {
  const MediaIcon = mediaIcons[story.mediaType];
  const dateLabel = new Date(story.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const coverBackground = extractBackgroundColor(story.coverGradient);

  const Container: any = onClick ? Pressable : View;

  return (
    <Container
      onPress={onClick}
      disabled={!onClick}
      accessibilityRole={onClick ? 'button' : undefined}
      style={[
        styles.card,
        variant === 'compact' && styles.cardCompact,
        variant === 'featured' && styles.cardFeatured,
      ]}
    >
      <View style={[styles.cover, { backgroundColor: coverBackground }]}>
        <View style={styles.mediaBadge}>
          <MediaIcon size={14} color="#fff" />
          <Text style={styles.mediaText}>{story.mediaType}</Text>
        </View>

        {story.duration ? (
          <View style={styles.duration}>
            <Clock size={12} color="#fff" />
            <Text style={styles.durationText}>{story.duration}</Text>
          </View>
        ) : null}

        {!story.isPublished ? (
          <View style={styles.draftBadge}>
            <Text style={styles.draftText}>Draft</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.body}>
        <Text style={styles.category}>{story.category}</Text>
        <Text numberOfLines={2} style={styles.title}>
          {story.title}
        </Text>
        <Text numberOfLines={3} style={styles.excerpt}>
          {story.excerpt}
        </Text>

        <View style={styles.footer}>
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Heart size={14} color="#666" />
              <Text style={styles.statText}>{story.likes}</Text>
            </View>
            <View style={styles.stat}>
              <Eye size={14} color="#666" />
              <Text style={styles.statText}>{story.views}</Text>
            </View>
          </View>

          <Text style={styles.date}>{dateLabel}</Text>
        </View>
      </View>
    </Container>
  );
}
