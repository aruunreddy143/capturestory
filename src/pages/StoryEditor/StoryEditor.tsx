import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  Image as ImageIcon,
  Italic,
  Link,
  Save,
  Send,
  Underline,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { createStory } from '../../services/storyService';
import type { StoryCategory } from '../../types';
import { styles } from './StoryEditor.styles';

const categories: StoryCategory[] = [
  'fiction',
  'non-fiction',
  'poetry',
  'memoir',
  'fantasy',
  'mystery',
  'romance',
  'sci-fi',
];

export default function StoryEditor() {
  const navigation: any = useNavigation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<StoryCategory>('fiction');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;

  const handleSave = async (publish: boolean) => {
    if (!title.trim()) return;
    setSaving(true);
    setError(null);
    try {
      await createStory({
        title,
        content,
        excerpt: content.slice(0, 160),
        category,
        mediaType: 'text',
        isPublished: publish,
      });
      navigation.navigate('Stories');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save story');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.container}>
        {/* Main editor */}
        <View style={styles.editorContainer}>
          {/* Editor Header */}
          <View style={styles.editorHeader}>
            <View style={styles.editorMeta}>
              <View style={styles.categorySelector}>
                <Pressable
                  style={styles.categoryTrigger}
                  onPress={() => setShowCategoryDropdown((s) => !s)}
                  accessibilityRole="button"
                >
                  <View style={[styles.categoryDot, { backgroundColor: '#6c5ce7' }]} />
                  <Text style={styles.categoryText}>{category}</Text>
                  <ChevronDown size={16} color="#444" />
                </Pressable>

                {showCategoryDropdown && (
                  <View style={styles.categoryDropdown}>
                    {categories.map((cat) => (
                      <Pressable
                        key={cat}
                        style={[
                          styles.categoryOption,
                          cat === category && styles.categoryOptionActive,
                        ]}
                        onPress={() => {
                          setCategory(cat);
                          setShowCategoryDropdown(false);
                        }}
                        accessibilityRole="button"
                      >
                        <Text style={[styles.categoryOptionText, cat === category && styles.categoryOptionTextActive]}>
                          {cat}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                )}
              </View>

              <Text style={styles.editorStats}>
                {wordCount} words · {charCount} characters
              </Text>
            </View>

            <View style={styles.editorActions}>
              {error && <Text style={styles.errorText}>{error}</Text>}

              <Pressable
                style={[styles.btn, styles.btnGhost]}
                onPress={() => handleSave(false)}
                disabled={saving}
                accessibilityRole="button"
              >
                <Save size={16} color="#444" />
                <Text style={styles.btnText}>{saving ? 'Saving...' : 'Save Draft'}</Text>
              </Pressable>

              <Pressable
                style={[styles.btn, styles.btnPublish]}
                onPress={() => handleSave(true)}
                disabled={saving}
                accessibilityRole="button"
              >
                <Send size={16} color="#fff" />
                <Text style={[styles.btnText, styles.btnTextPublish]}>{saving ? 'Publishing...' : 'Publish'}</Text>
              </Pressable>
            </View>
          </View>

          {/* Toolbar */}
          <View style={styles.editorToolbar}>
            <View style={styles.toolbarGroup}>
              <Pressable style={styles.toolbarBtn} accessibilityRole="button">
                <Bold size={16} color="#444" />
              </Pressable>
              <Pressable style={styles.toolbarBtn} accessibilityRole="button">
                <Italic size={16} color="#444" />
              </Pressable>
              <Pressable style={styles.toolbarBtn} accessibilityRole="button">
                <Underline size={16} color="#444" />
              </Pressable>
            </View>

            <View style={styles.toolbarDivider} />

            <View style={styles.toolbarGroup}>
              <Pressable style={styles.toolbarBtn} accessibilityRole="button">
                <AlignLeft size={16} color="#444" />
              </Pressable>
              <Pressable style={styles.toolbarBtn} accessibilityRole="button">
                <AlignCenter size={16} color="#444" />
              </Pressable>
              <Pressable style={styles.toolbarBtn} accessibilityRole="button">
                <AlignRight size={16} color="#444" />
              </Pressable>
            </View>

            <View style={styles.toolbarDivider} />

            <View style={styles.toolbarGroup}>
              <Pressable style={styles.toolbarBtn} accessibilityRole="button">
                <ImageIcon size={16} color="#444" />
              </Pressable>
              <Pressable style={styles.toolbarBtn} accessibilityRole="button">
                <Link size={16} color="#444" />
              </Pressable>
            </View>
          </View>

          {/* Writing Area */}
          <View style={styles.writingArea}>
            <TextInput
              style={styles.titleInput}
              placeholder="Give your story a title..."
              value={title}
              onChangeText={setTitle}
              placeholderTextColor="#999"
            />

            <TextInput
              style={styles.contentInput}
              placeholder="Start writing your story here... Let your imagination flow freely."
              value={content}
              onChangeText={setContent}
              placeholderTextColor="#999"
              multiline
              textAlignVertical="top"
              scrollEnabled
            />
          </View>
        </View>

        {/* Side Panel */}
        <View style={styles.sidePanel}>
          <View style={styles.panelSection}>
            <Text style={styles.panelTitle}>Story Cover</Text>
            <View style={styles.coverPreview}>
              <View style={styles.coverPlaceholder}>
                <ImageIcon size={28} color="#666" />
                <Text style={styles.coverText}>Add Cover Image</Text>
              </View>
            </View>
          </View>

          <View style={styles.panelSection}>
            <Text style={styles.panelTitle}>Writing Tips</Text>

            <View style={styles.tipsCard}>
              <Text style={styles.tip}>💡 Start with a hook — the first sentence should grab the reader's attention.</Text>
            </View>

            <View style={styles.tipsCard}>
              <Text style={styles.tip}>🎭 Show, don't tell — let readers experience the story through actions and senses.</Text>
            </View>

            <View style={styles.tipsCard}>
              <Text style={styles.tip}>✨ Read it aloud — if it sounds natural when spoken, it will read well too.</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}