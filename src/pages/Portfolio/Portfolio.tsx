import React from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Share,
  Alert,
  Platform,
} from 'react-native';
import {
  BookOpen,
  Calendar,
  Edit3,
  FileText,
  Mic,
  Share2,
  UserPlus,
  Users,
  Video,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import StoryCard from '../../components/StoryCard/StoryCard';
import { currentUser, stories } from '../../data/mockData';
import { styles } from './Portfolio.styles';

export default function Portfolio() {
  const navigation: any = useNavigation();

  const textStories = stories.filter((s) => s.mediaType === 'text');
  const audioStories = stories.filter((s) => s.mediaType === 'audio');
  const videoStories = stories.filter((s) => s.mediaType === 'video');

  const handleEdit = () => {
    navigation.navigate?.('EditProfile');
  };

  const handleShare = async () => {
    const url = (currentUser as any).profileUrl ?? '';
    try {
      await Share.share(
        {
          message: Platform.select({
            ios: `Check out ${currentUser.name}'s profile: ${url}`,
            default: `${currentUser.name}'s profile: ${url}`,
          }),
          url,
          title: `${currentUser.name} on CaptureStory`,
        },
        { dialogTitle: `Share ${currentUser.name}` }
      );
    } catch (err) {
      Alert.alert('Share failed', String(err));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.profileHeaderBg} />

        <View style={styles.profileHeaderContent}>
          <View style={styles.profileAvatarLarge}>
            <Text style={styles.avatarText}>{currentUser.avatar}</Text>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{currentUser.name}</Text>
            <Text style={styles.profileBio}>{currentUser.bio}</Text>
            <View style={styles.profileMeta}>
              <View style={styles.metaItem}>
                <Calendar size={14} color="#666" />
                <Text style={styles.metaText}>
                  {'  '}Joined{' '}
                  {new Date(currentUser.joinedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.profileActions}>
            <Pressable
              style={[styles.btn, styles.btnPrimary]}
              onPress={handleEdit}
              accessibilityRole="button"
            >
              <Edit3 size={16} color="#fff" />
              <Text style={styles.btnText}>Edit Profile</Text>
            </Pressable>

            <Pressable
              style={[styles.btn, styles.btnSecondary]}
              onPress={handleShare}
              accessibilityRole="button"
            >
              <Share2 size={16} color="#fff" />
              <Text style={styles.btnText}>Share</Text>
            </Pressable>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.profileStatsRow}>
          <View style={styles.profileStat}>
            <BookOpen size={18} color="#333" />
            <View style={styles.statTextWrap}>
              <Text style={styles.profileStatValue}>{currentUser.storiesCount}</Text>
              <Text style={styles.profileStatLabel}>Stories</Text>
            </View>
          </View>

          <View style={styles.profileStat}>
            <Users size={18} color="#333" />
            <View style={styles.statTextWrap}>
              <Text style={styles.profileStatValue}>
                {currentUser.followers.toLocaleString()}
              </Text>
              <Text style={styles.profileStatLabel}>Followers</Text>
            </View>
          </View>

          <View style={styles.profileStat}>
            <UserPlus size={18} color="#333" />
            <View style={styles.statTextWrap}>
              <Text style={styles.profileStatValue}>{currentUser.following}</Text>
              <Text style={styles.profileStatLabel}>Following</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Content Sections */}
      <View style={styles.portfolioContent}>
        {/* Written Stories */}
        <View style={styles.portfolioSection}>
          <View style={styles.portfolioSectionHeader}>
            <FileText size={18} color="#333" />
            <Text style={styles.sectionTitle}>Written Stories</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{textStories.length}</Text>
            </View>
          </View>
          <View style={styles.portfolioStoriesGrid}>
            {textStories.map((story) => (
              <StoryCard key={story.id} story={story} variant="compact" />
            ))}
          </View>
        </View>

        {/* Audio Stories */}
        <View style={styles.portfolioSection}>
          <View style={styles.portfolioSectionHeader}>
            <Mic size={18} color="#333" />
            <Text style={styles.sectionTitle}>Audio Stories</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{audioStories.length}</Text>
            </View>
          </View>

          <View style={styles.portfolioStoriesGrid}>
            {audioStories.map((story) => (
              <StoryCard key={story.id} story={story} variant="compact" />
            ))}
          </View>

          {audioStories.length === 0 && (
            <View style={styles.emptySection}>
              <Mic size={32} color="#999" />
              <Text style={styles.emptyText}>No audio stories yet. Record your first one!</Text>
            </View>
          )}
        </View>

        {/* Video Stories */}
        <View style={styles.portfolioSection}>
          <View style={styles.portfolioSectionHeader}>
            <Video size={18} color="#333" />
            <Text style={styles.sectionTitle}>Video Stories</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{videoStories.length}</Text>
            </View>
          </View>

          <View style={styles.portfolioStoriesGrid}>
            {videoStories.map((story) => (
              <StoryCard key={story.id} story={story} variant="compact" />
            ))}
          </View>

          {videoStories.length === 0 && (
            <View style={styles.emptySection}>
              <Video size={32} color="#999" />
              <Text style={styles.emptyText}>No video stories yet. Start recording!</Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
