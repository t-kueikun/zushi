import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Bell, Calendar, ChevronRight, Map, Trash2, Users } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WeatherCard from '../../components/WeatherCard';
import { supabase } from '../../lib/supabase';
import { News } from '../../types/news';

export default function HomeScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const insets = useSafeAreaInsets();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 60000);
    fetchNews();
    return () => clearInterval(timer);
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('date', { ascending: false })
        .limit(5);

      if (error) throw error;
      if (data) setNews(data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

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
      className="bg-white dark:bg-gray-900 p-4 rounded-3xl w-[48%] md:w-[23%] shadow-sm mb-4 items-center justify-center aspect-[1.1] border border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
    >
      <View className={`p-4 rounded-full mb-3 ${color}`}>
        {icon}
      </View>
      <Text className="text-gray-800 dark:text-gray-100 font-bold text-center text-sm">{label}</Text>
    </TouchableOpacity>
  );

  const NewsCard = ({ item }: { item: News }) => {
    const title = i18n.language === 'en' ? item.title_en : item.title_ja;
    const color = item.category === 'important' ? 'bg-red-100' : item.category === 'event' ? 'bg-blue-100' : 'bg-green-100';

    return (
      <TouchableOpacity
        onPress={() => router.push('/news')}
        className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm mr-4 w-72 md:w-80 border border-gray-50 dark:border-gray-800 min-h-[120px] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <View className="flex-row justify-between items-center mb-2">
          <View className={`px-2 py-1 rounded-md ${color}`}>
            <Text className="text-[10px] font-bold uppercase text-gray-700">{item.category}</Text>
          </View>
          <Text className="text-xs text-gray-400">{item.date}</Text>
        </View>
        <Text className="text-gray-900 dark:text-white font-bold text-sm leading-5" numberOfLines={2}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-gray-50 dark:bg-black">
      <View className="absolute top-0 left-0 right-0 h-1/2 bg-[#007AFF]" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <View className="bg-gray-50 dark:bg-black flex-1 pb-24">
          {/* Hero Section */}
          <LinearGradient
            colors={['#007AFF', '#00C6FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{
              paddingTop: insets.top + 20,
              paddingBottom: 24,
              paddingHorizontal: 24,
              borderBottomLeftRadius: 32,
              borderBottomRightRadius: 32
            }}
          >
            <View className="w-full max-w-5xl self-center">
              {/* Header Row */}
              <View className="flex-row justify-between items-start mb-6">
                <View>
                  <Text className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">{t('home.zushi_city')}</Text>
                  <Text className="text-white text-3xl font-extrabold">{formatDate(currentDate)}</Text>
                </View>
                <View className="flex-row items-center">
                  <TouchableOpacity
                    onPress={() => router.push('/profile')}
                    className="bg-white/20 p-2.5 rounded-full backdrop-blur-md mr-3 hover:bg-white/30 transition-colors"
                  >
                    <Users color="white" size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-white/20 p-2.5 rounded-full backdrop-blur-md hover:bg-white/30 transition-colors">
                    <Bell color="white" size={20} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Weather Widget */}
              <WeatherCard />

              {/* Latest News Title (Inside Header) */}
              <View className="mt-4 flex-row justify-between items-center">
                <Text className="text-lg font-bold text-white">{t('home.latest_news')}</Text>
                <TouchableOpacity onPress={() => router.push('/news')} className="flex-row items-center">
                  <Text className="text-white/90 text-sm font-medium mr-1">{t('home.see_all')}</Text>
                  <ChevronRight size={16} className="text-white" color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>

          <View className="w-full max-w-5xl self-center mt-4">
            {/* News Carousel */}
            <View className="mb-8">
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 10 }}>
                {news.length > 0 ? (
                  news.map((item) => (
                    <NewsCard key={item.id} item={item} />
                  ))
                ) : (
                  <View className="w-full p-4 items-center justify-center">
                    <Text className="text-gray-500">{t('home.no_news') || 'お知らせはありません'}</Text>
                  </View>
                )}
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
