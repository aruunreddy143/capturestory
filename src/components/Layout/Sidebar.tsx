import React from "react";
import { View, Text, Pressable, Platform } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  BookOpen,
  Feather,
  LayoutDashboard,
  Mic,
  PenTool,
  Settings,
  User,
} from "lucide-react-native";

import { styles } from "./Sidebar.styles";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { name: "Stories", icon: BookOpen, label: "My Stories" },
  { name: "Editor", icon: PenTool, label: "Write" },
  { name: "Record", icon: Mic, label: "Record" },
  { name: "Portfolio", icon: User, label: "Portfolio" },
];

export default function Sidebar() {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  return (
    <View style={styles.sidebar}>
      <View style={styles.brand}>
        <Feather size={24} />
        <Text style={styles.brandText}>CaptureStory</Text>
      </View>

      <View style={styles.nav}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = route?.name === item.name;

          return (
            <Pressable
              key={item.name}
              style={[styles.navItem, active && styles.activeItem]}
              onPress={() => navigation.navigate(item.name)}
            >
              <Icon size={20} />
              <Text style={styles.navText}>{item.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.footer}>
        <Pressable
          style={styles.navItem}
          onPress={() => navigation.navigate("Settings")}
        >
          <Settings size={20} />
          <Text style={styles.navText}>Settings</Text>
        </Pressable>
      </View>
    </View>
  );
}