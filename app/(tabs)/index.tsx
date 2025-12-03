import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Bell, Calendar, ChevronRight, CloudSun, Map, Trash2, Users } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const insets = useSafeAreaInsets();
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(i18n.language, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const QuickLink = ({ icon, label, route, color, delay }: { icon: any, label: string, route: string, color: string, delay?: number }) => (
    <TouchableOpacity
      onPress={() => router.push(route as any)}
      className="bg-white dark:bg-gray-900 p-4 rounded-3xl w-[48%] shadow-sm mb-4 items-center justify-center aspect-[1.1] border border-gray-50 dark:border-gray-800"
    >
      <View className={`p-4 rounded-full mb-3 ${color}`}>
        {icon}
      </View>
      <Text className="text-gray-800 dark:text-gray-100 font-bold text-center text-sm">{label}</Text>
    </TouchableOpacity>
  );

  const NewsCard = ({ category, title, date, color }: { category: string, title: string, date: string, color: string }) => (
    <TouchableOpacity
      onPress={() => router.push('/news')}
      className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm mr-4 w-72 border border-gray-50 dark:border-gray-800 min-h-[120px]"
    >
      <View className="flex-row justify-between items-center mb-2">
        <View className={`px-2 py-1 rounded-md ${color}`}>
          <Text className="text-[10px] font-bold uppercase text-gray-700">{category}</Text>
        </View>
        <Text className="text-xs text-gray-400">{date}</Text>
      </View>
      <Text className="text-gray-900 dark:text-white font-bold text-sm leading-5" numberOfLines={2}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-[#007AFF] dark:bg-black">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <View className="bg-gray-50 dark:bg-black flex-1 pb-24">
          {/* Hero Section */}
          <LinearGradient
            colors={['#007AFF', '#00C6FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{
              paddingTop: insets.top + 20,
              paddingBottom: 40,
              paddingHorizontal: 24,
              borderBottomLeftRadius: 32,
              borderBottomRightRadius: 32
            }}
          >
            {/* Header Row */}
            <View className="flex-row justify-between items-start mb-6">
              <View>
                <Text className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">Zushi City</Text>
                <Text className="text-white text-3xl font-extrabold">{formatDate(currentDate)}</Text>
              </View>
              <View className="flex-row items-center">
                <TouchableOpacity
                  onPress={() => router.push('/profile')}
                  className="bg-white/20 p-2.5 rounded-full backdrop-blur-md mr-3"
                >
                  <Users color="white" size={20} />
                </TouchableOpacity>
                <TouchableOpacity className="bg-white/20 p-2.5 rounded-full backdrop-blur-md">
                  <Bell color="white" size={20} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Weather Widget (Mock) */}
            <View className="flex-row items-center bg-white/10 p-4 rounded-2xl backdrop-blur-md self-start border border-white/20">
              <CloudSun color="white" size={32} />
              <View className="ml-3">
                <Text className="text-white font-bold text-xl">18°C</Text>
                <Text className="text-white/80 text-xs">Sunny • Zushi</Text>
              </View>
            </View>
          </LinearGradient>

          <View className="-mt-8">
            {/* News Carousel */}
            <View className="mb-8">
              <View className="flex-row justify-between items-center px-6 mb-3">
                <Text className="text-lg font-bold text-white">{t('home.latest_news')}</Text>
                <TouchableOpacity onPress={() => router.push('/news')} className="flex-row items-center">
                  <Text className="text-white/90 text-sm font-medium mr-1">{t('home.see_all')}</Text>
                  <ChevronRight size={16} color="white" />
                </TouchableOpacity>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 10 }}>
                <NewsCard
                  category="Important"
                  title={t('home.news_title')}
                  date="Today"
                  color="bg-red-100"
                />
                <NewsCard
                  category="Event"
                  title="Zushi Beach Fireworks Festival 2025 Announced"
                  date="Yesterday"
                  color="bg-blue-100"
                />
                <NewsCard
                  category="City"
                  title="New Recycling Guidelines for Plastic Waste"
                  date="2 days ago"
                  color="bg-green-100"
                />
              </ScrollView>
            </View>

            {/* Quick Links Grid */}
            <View className="px-6">
              <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4">{t('home.quick_links')}</Text>
              <View className="flex-row flex-wrap justify-between">
                <QuickLink
                  icon={<Trash2 size={32} color="#10B981" />}
                  label={t('tabs.garbage')}
                  route="/(tabs)/garbage"
                  color="bg-emerald-50 dark:bg-emerald-900/30"
                />
                <QuickLink
                  icon={<Calendar size={32} color="#F59E0B" />}
                  label={t('tabs.events')}
                  route="/events"
                  color="bg-amber-50 dark:bg-amber-900/30"
                />
                <QuickLink
                  icon={<Map size={32} color="#3B82F6" />}
                  label={t('tabs.map')}
                  route="/(tabs)/map"
                  color="bg-blue-50 dark:bg-blue-900/30"
                />
                <QuickLink
                  icon={<Users size={32} color="#EC4899" />}
                  label={t('guide.child_rearing')}
                  route="/guide/child-rearing"
                  color="bg-pink-50 dark:bg-pink-900/30"
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
