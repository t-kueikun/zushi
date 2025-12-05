import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import 'react-native-reanimated';
import "../i18n";
import "./global.css";

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayoutNav() {
  const { t } = useTranslation(); // Get translation hook
  const colorScheme = useColorScheme();
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === 'auth';

    if (!user && !inAuthGroup) {
      // Redirect to the sign-in page.
      router.replace('/auth/login');
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace('/(tabs)');
    }
  }, [user, loading, segments]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerBackTitle: t('common.back') }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false, headerBackTitle: t('common.back') }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="browser" options={{ headerShown: false }} />
        <Stack.Screen name="guide" options={{ headerShown: false }} />
        <Stack.Screen name="guide/transport" options={{ headerShown: false }} />
        <Stack.Screen name="guide/child-rearing" options={{ headerShown: false }} />
        <Stack.Screen name="guide/procedures" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="events" options={{ headerShown: false }} />
        <Stack.Screen name="news" options={{ headerShown: false }} />
        <Stack.Screen name="help" options={{ headerShown: false }} />
        <Stack.Screen name="survey" options={{ title: t('menu.survey') }} />
        <Stack.Screen name="disaster" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

import { ThemeProvider as CustomThemeProvider } from '../context/ThemeContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <CustomThemeProvider>
        <RootLayoutNav />
      </CustomThemeProvider>
    </AuthProvider>
  );
}
