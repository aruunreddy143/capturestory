import {
  type User,
  onIdTokenChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithCredential,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import { auth } from "../config/firebase";
import type { AuthUser } from "../types";

WebBrowser.maybeCompleteAuthSession();

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getToken: () => Promise<string | null>;
  signInWithGoogle: () => Promise<void>;
  requestReady: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function mapFirebaseUser(firebaseUser: User): AuthUser {
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
    provider: firebaseUser.providerData[0]?.providerId || "email",
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const WEB_CLIENT_ID =
    process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ??
    "423069409071-8fshcabs85eu6skjguj7i98pnke6v6rh.apps.googleusercontent.com";

  const IOS_CLIENT_ID =
    process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID ??
    "423069409071-a1o93iqbe5mgilrnhbh2b9aro9vidats.apps.googleusercontent.com";

  const ANDROID_CLIENT_ID =
    process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID ??
    "423069409071-jhebj9rnb9qmcmcdeot8qmi4j2mgc2ks.apps.googleusercontent.com";

  const redirectUri = "com.ammulureddy.capturestory:/oauthredirect";

  const googleConfig =
    Platform.OS === "web"
      ? {
          webClientId: WEB_CLIENT_ID,
          scopes: ["openid", "profile", "email"],
        }
      : {
          iosClientId: IOS_CLIENT_ID,
          androidClientId: ANDROID_CLIENT_ID,
          webClientId: WEB_CLIENT_ID,
          scopes: ["openid", "profile", "email"],
          redirectUri,
        };

  const [request, response, promptAsync] = Google.useAuthRequest(
    googleConfig as any
  );

  useEffect(() => {
    if (Platform.OS !== "android") {
      return;
    }

    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  useEffect(() => {
    const handleGoogleResponse = async () => {
      if (response?.type === "success") {
        const idToken =
          response.authentication?.idToken ??
          response.params?.id_token ??
          null;

        const accessToken =
          response.authentication?.accessToken ??
          response.params?.access_token ??
          null;

        if (!idToken && !accessToken) {
          console.log("No Google token");
          console.log("Google response params:", response.params);
          console.log("Google authentication:", response.authentication);
          return;
        }

        try {
          const credential = GoogleAuthProvider.credential(
            idToken,
            accessToken
          );

          await signInWithCredential(auth, credential);
        } catch (err) {
          console.error("Firebase Google Sign-In error:", err);
        }
      } else if (response?.type === "error") {
        console.error("Google auth error:", response);
      }
    };

    handleGoogleResponse();
  }, [response]);

  useEffect(() => {
    console.log("Platform:", Platform.OS);
    console.log("Google clientId:", request?.clientId);
    console.log("Google redirectUri:", request?.redirectUri);
    console.log("Forced redirectUri:", redirectUri);
  }, [request]);

  useEffect(() => {
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
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
    await AsyncStorage.removeItem("authToken");
  };

  const getToken = async (): Promise<string | null> => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      return null;
    }

    const token = await currentUser.getIdToken();
    await AsyncStorage.setItem("authToken", token);

    return token;
  };

  const signInWithGoogle = async () => {
    try {
      if (Platform.OS === "web") {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        return;
      }

      if (!request) {
        console.log("Google request not ready");
        return;
      }

      const result = await promptAsync();
      console.log("promptAsync result:", result);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
      getToken,
      signInWithGoogle,
      requestReady: !!request,
    }),
    [user, loading, request]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
