import React from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
} from "react-native";

import {
  ArrowUpRight,
  BookOpen,
  Eye,
  Heart,
  Mic,
  TrendingUp,
} from "lucide-react-native";

import { useNavigation } from "@react-navigation/native";

import StoryCard from "../../components/StoryCard/StoryCard";
import {
  dashboardStats,
  featuredPortfolios,
  stories,
} from "../../data/mockData";
import { styles } from "./Dashboard.styles";

const statCards = [
  {
    label: "Total Stories",
    value: dashboardStats.totalStories,
    icon: BookOpen,
    color: "#667eea",
    change: "+3 this month",
  },
  {
    label: "Total Views",
    value: dashboardStats.totalViews,
    icon: Eye,
    color: "#4facfe",
    change: "+18% from last month",
  },
  {
    label: "Total Likes",
    value: dashboardStats.totalLikes,
    icon: Heart,
    color: "#f5576c",
    change: "+24% from last month",
  },
  {
    label: "Recordings",
    value: dashboardStats.totalRecordings,
    icon: Mic,
    color: "#43e97b",
    change: "+2 this week",
  },
];

export default function Dashboard() {
  const navigation: any = useNavigation();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* WELCOME SECTION */}

      <View style={styles.welcomeSection}>
        <View style={{ flex: 1, marginRight: 32 }}>
          <Text style={styles.welcomeTitle}>
            Welcome back, <Text style={styles.gradientText}>Arun</Text> ✨
          </Text>

          <Text style={styles.welcomeSubtitle}>
            Ready to capture your next story? Your audience is waiting.
          </Text>
        </View>

        <View style={styles.welcomeActions}>
          <Pressable
            style={[styles.btn, styles.btnPrimary]}
            onPress={() => navigation.navigate("Editor")}
          >
            <BookOpen size={18} color="#fff" />
            <Text style={styles.btnText}>Write Story</Text>
          </Pressable>

          <Pressable
            style={[styles.btn, styles.btnSecondary]}
            onPress={() => navigation.navigate("Record")}
          >
            <Mic size={18} color="#fff" />
            <Text style={styles.btnText}>Record Story</Text>
          </Pressable>
        </View>
      </View>

      {/* STATS GRID */}

      <View style={styles.statsGrid}>
        {statCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <View key={stat.label} style={styles.statCard}>
              <View style={styles.statCardHeader}>
                <View
                  style={[styles.statIcon, { backgroundColor: stat.color }]}
                >
                  <Icon size={20} color="#fff" />
                </View>

                <ArrowUpRight size={16} color="#43e97b" />
              </View>

              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>

              <View style={styles.statChange}>
                <TrendingUp size={12} color="#43e97b" />
                <Text style={styles.statChangeText}>{stat.change}</Text>
              </View>
            </View>
          );
        })}
      </View>

      {/* RECENT STORIES */}

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Stories</Text>

          <Pressable onPress={() => navigation.navigate("Stories")}>
            <Text style={styles.link}>View All</Text>
          </Pressable>
        </View>

        <View style={styles.storiesGrid}>
          {stories.slice(0, 3).map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </View>
      </View>

      {/* FEATURED STORYTELLERS */}

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Storytellers</Text>
          <Pressable>
            <Text style={styles.link}>Discover More</Text>
          </Pressable>
        </View>

        {featuredPortfolios.map((person) => (
          <View key={person.id} style={styles.storytellerCard}>

            <View style={styles.storytellerAvatar}>
              <Text style={styles.storytellerAvatarText}>
                {person.avatar}
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.storytellerName}>{person.name}</Text>
              <Text style={styles.storytellerBio}>{person.bio}</Text>

              <Text style={styles.storytellerStats}>
                {person.storiesCount} stories •{" "}
                {person.followers.toLocaleString()} followers
              </Text>
            </View>

            <Pressable style={styles.btnFollow}>
              <Text style={styles.btnFollowText}>Follow</Text>
            </Pressable>
          </View>
        ))}
      </View>

    </ScrollView>
  );
}
