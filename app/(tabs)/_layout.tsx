import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Tabs } from 'expo-router';
import { Home, Map as MapIcon, Menu, Trash2 } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          height: 84,
          paddingBottom: 8,
          backgroundColor: Colors[colorScheme ?? 'light'].background,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.home'),
          tabBarIcon: ({ color }) => <Home size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: t('tabs.map'),
          tabBarIcon: ({ color }) => <MapIcon size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="garbage"
        options={{
          title: t('tabs.garbage'),
          tabBarIcon: ({ color }) => <Trash2 size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: t('tabs.menu'),
          tabBarIcon: ({ color }) => <Menu size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
