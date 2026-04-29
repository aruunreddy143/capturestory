import React from "react";
import { View, Text, Pressable, TextInput, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Bell, LogOut, Plus, Search } from "lucide-react-native";
import { useAuth } from "../../context/AuthContext";
import { styles } from "./Header.styles";

const pageTitles: Record<string, string> = {
  Dashboard: "Dashboard",
  Stories: "My Stories",
  Editor: "Write a Story",
  Record: "Record Story",
  Portfolio: "My Portfolio",
};

export default function Header() {
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const { user, logout } = useAuth();

  const title = pageTitles[route?.name] || "CaptureStory";

  const handleLogout = async () => {
    await logout();
    navigation.navigate("Login");
  };

  return (
    <View style={styles.header}>
      <View style={styles.left}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.center}>
        <View style={styles.searchBar}>
          <Search size={18} color="rgba(255,255,255,0.45)" />
          <TextInput
            placeholder="Search stories, authors..."
            placeholderTextColor="rgba(255,255,255,0.35)"
            style={styles.searchInput}
          />
        </View>
      </View>

      <View style={styles.right}>
        <Pressable
          style={styles.newStoryBtn}
          onPress={() => navigation.navigate("Editor")}
        >
          <Plus size={18} color="#ffffff" />
          <Text style={styles.newStoryText}>New Story</Text>
        </Pressable>

        <Pressable style={[styles.iconBtn, styles.notificationBtn]}>
          <Bell size={20} color="rgba(255,255,255,0.7)" />
          <View style={styles.notificationDot} />
        </Pressable>

        <Pressable style={styles.iconBtn} onPress={handleLogout}>
          <LogOut size={18} color="rgba(255,255,255,0.7)" />
        </Pressable>

        <View style={styles.avatar}>
          {user?.photoURL ? (
            <Image source={{ uri: user.photoURL }} style={styles.avatarImg} />
          ) : (
            <Text style={styles.avatarText}>
              {user?.displayName?.charAt(0) ?? "U"}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}
