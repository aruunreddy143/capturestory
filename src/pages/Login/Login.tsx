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

export default function Login() {
  const { user, signInWithGoogle } = useAuth();
  const navigation: any = useNavigation();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      // reset navigation to Home (web/native compatible)
      navigation.reset?.({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
  }, [user, navigation]);

  const handleGoogle = async (e?: any) => {
    // prevent form submit / default navigation on web
    e?.preventDefault?.();
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  // Don't show login UI if already authenticated (navigation effect will redirect)
  if (user) return null;

  return (
    <View style={styles.page}>
      <View style={styles.card}>
        {/* Brand */}
        <View style={styles.brand}>
          <View style={styles.brandIcon}>
            <Feather size={32} />
          </View>
          <Text style={styles.title}>CaptureStory</Text>
          <Text style={styles.subtitle}>Sign in to start capturing your stories</Text>
        </View>

        {/* Error */}
        {error ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {/* SSO Buttons */}
        <View style={styles.buttons}>
          <Pressable
            style={({ pressed }) => [
              styles.ssoBtn,
              styles.googleBtn,
              pressed && styles.btnPressed,
              loading && styles.btnDisabled,
            ]}
            // ensure the rendered element is a non-submit button on web
            {...({ type: 'button' } as any)}
            onPress={handleGoogle}
            disabled={loading}
            accessibilityRole="button"
          >
            <View style={styles.googleIcon}>
              <Text style={styles.googleG}>G</Text>
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

        {/* Divider */}
        <View style={styles.divider}>
          <Text style={styles.dividerText}>
            Secure authentication powered by Firebase
          </Text>
        </View>
      </View>
    </View>
  );
}
