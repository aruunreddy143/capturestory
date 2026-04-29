import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Filter, Grid3X3, List } from 'lucide-react-native';
import StoryCard from '../../components/StoryCard/StoryCard';
import StoryPlayer from '../../components/StoryPlayer/StoryPlayer';
import { getStories } from '../../services/storyService';
import type { Story, StoryCategory } from '../../types';
import { styles } from './Stories.styles';

const categories: (StoryCategory | 'all')[] = [
  'all',
  'fiction',
  'non-fiction',
  'poetry',
  'memoir',
  'fantasy',
  'mystery',
  'romance',
  'sci-fi',
];

export default function Stories() {
  const [activeCategory, setActiveCategory] = useState<StoryCategory | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playingStory, setPlayingStory] = useState<Story | null>(null);

  useEffect(() => {
    getStories()
      .then(setStories)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load stories'))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeCategory === 'all' ? stories : stories.filter((s) => s.category === activeCategory);

  const isGrid = viewMode === 'grid';
  const screenWidth = Dimensions.get('window').width;
  const gridItemWidth = Math.min(420, (screenWidth - 48) / 2); // keep a reasonable max width per card

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Filters Bar */}
      <View style={styles.filtersBar}>
        <View style={styles.filtersLeft}>
          <Filter size={18} color="#444" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryPillsWrap}>
            {categories.map((cat) => (
              <Pressable
                key={cat}
                onPress={() => setActiveCategory(cat)}
                style={[
                  styles.pill,
                  activeCategory === cat && styles.pillActive,
                ]}
                accessibilityRole="button"
              >
                <Text style={[styles.pillText, activeCategory === cat && styles.pillTextActive]}>
                  {cat}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.viewToggle}>
          <Pressable
            onPress={() => setViewMode('grid')}
            style={[styles.toggleBtn, isGrid && styles.toggleBtnActive]}
            accessibilityRole="button"
          >
            <Grid3X3 size={18} color={isGrid ? '#fff' : '#666'} />
          </Pressable>

          <Pressable
            onPress={() => setViewMode('list')}
            style={[styles.toggleBtn, !isGrid && styles.toggleBtnActive]}
            accessibilityRole="button"
          >
            <List size={18} color={!isGrid ? '#fff' : '#666'} />
          </Pressable>
        </View>
      </View>

      {/* Stories */}
      {loading && (
        <View style={styles.emptyState}>
          <ActivityIndicator size="small" color="#666" />
          <Text style={styles.emptyText}>Loading stories...</Text>
        </View>
      )}

      {error && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Error: {error}</Text>
        </View>
      )}

      {!loading && !error && filtered.length > 0 && (
        <View style={[styles.storiesList, isGrid ? styles.storiesGrid : styles.storiesListColumn]}>
          {filtered.map((story) => (
            <View
              key={story.id}
              style={isGrid ? [styles.gridItem, { width: gridItemWidth }] : undefined}
            >
              <StoryCard
                story={story}
                variant={isGrid ? 'default' : 'compact'}
                onClick={
                  story.mediaType !== 'text' && story.mediaUrl
                    ? () => setPlayingStory(story)
                    : undefined
                }
              />
            </View>
          ))}
        </View>
      )}

      {!loading && !error && filtered.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No stories found in this category.</Text>
        </View>
      )}

      {/* Media Player Overlay */}
      {playingStory && (
        <StoryPlayer story={playingStory} onClose={() => setPlayingStory(null)} />
      )}
    </ScrollView>
  );
}
