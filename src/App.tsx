import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Layout from "./components/Layout/Layout";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Portfolio from "./pages/Portfolio";
import Record from "./pages/Record";
import Stories from "./pages/Stories";
import StoryEditor from "./pages/StoryEditor";

const Stack = createNativeStackNavigator();

/* Wrap screens with Layout */
const withLayout = (Component: React.ComponentType<any>) => {
  return (props: any) => (
    <Layout>
      <Component {...props} />
    </Layout>
  );
};

function AppNavigator() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          /* If not logged in */
          <Stack.Screen name="Login" component={Login} />
        ) : (
          <>
            <Stack.Screen
              name="Dashboard"
              component={withLayout(Dashboard)}
            />
            <Stack.Screen
              name="Stories"
              component={withLayout(Stories)}
            />
            <Stack.Screen
              name="Editor"
              component={withLayout(StoryEditor)}
            />
            <Stack.Screen
              name="Record"
              component={withLayout(Record)}
            />
            <Stack.Screen
              name="Portfolio"
              component={withLayout(Portfolio)}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}