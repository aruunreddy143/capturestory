import React from "react";
import { View, Text, Pressable, Platform } from "react-native";
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

export default function Sidebar(props: any) {
  const navigation: any = props.navigation;
  const state = props.state;

  return (
    <View style={styles.sidebar}>
      <View style={styles.brand}>
        <View style={styles.brandIcon}>
          <Feather size={24} color="#ffffff" />
        </View>

        <Text style={styles.brandText}>CaptureStory</Text>
      </View>

      <View style={styles.nav}>
        {navItems.map((item) => {
          const Icon = item.icon;

          // ✅ FIX: safer active route detection
          const currentRoute =
            state?.routes?.[state.index]?.name || "";
          const active = currentRoute === item.name;

          return (
            <Pressable
              key={item.name}
              style={[styles.navItem, active && styles.activeItem]}
              onPress={() => {
                // ✅ CORRECT navigation (works with linking)
                navigation.navigate(item.name);

                // ✅ close drawer only on mobile
                if (Platform.OS !== "web") {
                  navigation.closeDrawer();
                }
              }}
            >
              {active && <View style={styles.activeIndicator} />}

              <Icon
                size={20}
                color={active ? "#ffffff" : "rgba(255,255,255,0.52)"}
              />

              <Text style={[styles.navText, active && styles.activeText]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.footer}>
        <Pressable
          style={styles.navItem}
          onPress={() => {
            if (navigation?.navigate) {
              navigation.navigate("Settings");
            }
          }}
        >
          <Settings size={20} color="rgba(255,255,255,0.52)" />
          <Text style={styles.navText}>Settings</Text>
        </Pressable>
      </View>
    </View>
  );
}