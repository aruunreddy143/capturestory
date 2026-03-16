import React, { type ReactNode } from "react";
import { View, StyleSheet } from "react-native";

import Header from "./Header";
import Sidebar from "./Sidebar";
import { styles } from "./Layout.styles";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <View style={styles.mainContent}>
        <Header />

        <View style={styles.pageContent}>
          {children}
        </View>
      </View>
    </View>
  );
}