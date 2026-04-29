import "react-native-gesture-handler";
import React from "react";
import { StatusBar, View, ActivityIndicator, Platform, useWindowDimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { AuthProvider, useAuth } from "./context/AuthContext";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Portfolio from "./pages/Portfolio";
import Record from "./pages/Record";
import Stories from "./pages/Stories";
import StoryEditor from "./pages/StoryEditor";

import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DrawerNavigator() {
  const { width } = useWindowDimensions();

  const isDesktop = Platform.OS === "web" && width >= 768;

  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={(props: any) => <Sidebar {...props} />}
      screenOptions={{
        headerShown: isDesktop,
        header: () => <Header />,

        drawerType: isDesktop ? "permanent" : "front",

        drawerStyle: isDesktop
          ? {
              width: 260,
              backgroundColor: "#0d0e18",
              borderRightWidth: 1,
              borderRightColor: "rgba(255,255,255,0.08)",
            }
          : undefined,

        overlayColor: "transparent",
      }}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Stories" component={Stories} />
      <Drawer.Screen name="Editor" component={StoryEditor} />
      <Drawer.Screen name="Record" component={Record} />
      <Drawer.Screen name="Portfolio" component={Portfolio} />
    </Drawer.Navigator>
  );
}

function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#090a13",
        }}
      >
        <ActivityIndicator size="large" color="#667eea" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="MainApp" component={DrawerNavigator} />
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
