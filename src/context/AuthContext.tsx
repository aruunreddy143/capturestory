import {
  type User,
  GoogleAuthProvider,
  onIdTokenChanged,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  signInWithPopup, // added
} from "firebase/auth";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

import { auth } from "../config/firebase";
import type { AuthUser } from "../types";

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  getToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const googleProvider = new GoogleAuthProvider();

function mapFirebaseUser(firebaseUser: User): AuthUser {
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
    provider: firebaseUser.providerData[0]?.providerId ?? "unknown",
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Handle redirect login result
        await getRedirectResult(auth);
      } catch (err) {
        console.error("Google redirect error:", err);
      }

      const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          setUser(mapFirebaseUser(firebaseUser));

          const token = await firebaseUser.getIdToken();
          await AsyncStorage.setItem("authToken", token);
        } else {
          setUser(null);
          await AsyncStorage.removeItem("authToken");
        }

        setLoading(false);
      });

      return unsubscribe;
    };

    initAuth();
  }, []);

  const signInWithGoogle = async () => {
    if (Platform.OS === "web") {
      // Open a popup on web so the flow is started synchronously from the click handler
      await signInWithPopup(auth, googleProvider);
    } else {
      // keep redirect (or swap for your native/expo flow if needed)
      await signInWithRedirect(auth, googleProvider);
    }
  };

  const logout = async () => {
    await signOut(auth);
    await AsyncStorage.removeItem("authToken");
  };

  const getToken = async (): Promise<string | null> => {
    const currentUser = auth.currentUser;

    if (!currentUser) return null;

    const token = await currentUser.getIdToken();
    await AsyncStorage.setItem("authToken", token);

    return token;
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      signInWithGoogle,
      logout,
      getToken,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}