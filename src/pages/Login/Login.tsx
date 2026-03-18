import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Feather } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { styles } from './Login.styles';
import { LinearGradient } from 'expo-linear-gradient';

// ✅ SVG
import Svg, { Path } from 'react-native-svg';

export default function Login() {
  const { user, signInWithGoogle } = useAuth();
  const navigation: any = useNavigation();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigation.reset?.({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
  }, [user, navigation]);

  const handleGoogle = async (e?: any) => {
    if (Platform.OS === 'web') e?.preventDefault?.();

    setError(null);
    setLoading(true);

    try {
      await signInWithGoogle();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to sign in with Google'
      );
    } finally {
      setLoading(false);
    }
  };

  if (user) return null;

  return (
    <View style={styles.page}>

      <View style={styles.card}>
        {/* BRAND */}
        <View style={styles.brand}>
          <View style={styles.brandIcon}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.brandGradient}
            >
              <Feather size={32} color="#fff" />
            </LinearGradient>
          </View>

          <Text style={styles.title}>CaptureStory</Text>
          <Text style={styles.subtitle}>
            Sign in to start capturing your stories
          </Text>
        </View>

        {/* ERROR */}
        {error ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {/* GOOGLE BUTTON */}
        <View style={styles.buttons}>
          <Pressable
            style={({ pressed, hovered }: any) => [
              styles.ssoBtn,
              hovered ? styles.googleHover : null, // ✅ safer
              pressed ? styles.btnPressed : null,
              loading ? styles.btnDisabled : null,
            ]}
            {...(Platform.OS === 'web' ? { type: 'button' } : {})}
            onPress={handleGoogle}
            disabled={loading}
          >
            {/* GOOGLE ICON */}
            <View style={styles.googleIcon}>
              <Svg
                width={22}   // 🔥 slightly smaller = better alignment
                height={22}
                viewBox="0 0 24 24"
              >
                <Path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <Path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <Path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <Path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </Svg>
            </View>

            <Text style={styles.ssoText}>
              {loading ? 'Signing in…' : 'Continue with Google'}
            </Text>

            {loading && (
              <ActivityIndicator
                size="small"
                color="#fff"
                style={styles.loadingIndicator}
              />
            )}
          </Pressable>
        </View>

        {/* DIVIDER */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>
            Secure authentication powered by Firebase
          </Text>
          <View style={styles.dividerLine} />
        </View>
      </View>
    </View>
  );
}