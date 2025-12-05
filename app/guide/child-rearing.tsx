import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Baby, ChevronRight, ExternalLink } from 'lucide-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ChildRearingScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const openBrowser = (url: string, title: string) => {
    router.push({
      pathname: '/browser',
      params: { url, title }
    });
  };

  const InfoCard = ({ title, description, url, icon }: any) => (
    <TouchableOpacity
      className="bg-white dark:bg-gray-900 p-5 rounded-2xl mb-4 shadow-sm border border-gray-100 dark:border-gray-800"
      onPress={() => openBrowser(url, title)}
    >
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-row items-center flex-1 mr-4">
          <View className="bg-pink-50 dark:bg-pink-900/30 p-3 rounded-xl mr-3">
            {icon}
          </View>
          <Text className="text-lg font-bold text-gray-900 dark:text-white flex-1">{title}</Text>
        </View>
        <ExternalLink size={20} color="#9CA3AF" />
      </View>
      <Text className="text-gray-600 dark:text-gray-300 leading-6 ml-1">
        {description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-[#EC4899] dark:bg-black">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <View className="bg-gray-50 dark:bg-black flex-1 pb-24">
          {/* Header */}
          <LinearGradient
            colors={['#EC4899', '#F472B6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{
              paddingTop: insets.top + 20,
              paddingBottom: 30,
              paddingHorizontal: 24,
              borderBottomLeftRadius: 32,
              borderBottomRightRadius: 32,
              marginBottom: 24
            }}
          >
            <View className="flex-row items-center mb-2">
              <TouchableOpacity onPress={() => router.back()} className="bg-white/20 p-2 rounded-full mr-3">
                <ChevronRight size={24} color="white" style={{ transform: [{ rotate: '180deg' }] }} />
              </TouchableOpacity>
              <Text className="text-white/80 text-xs font-bold uppercase tracking-widest">{t('menu.support')}</Text>
            </View>
            <Text className="text-white text-3xl font-extrabold">{t('guide.child_rearing')}</Text>
          </LinearGradient>

          <View className="px-4">
            <InfoCard
              title={t('guide.vaccination')}
              description="定期予防接種のスケジュールや医療機関について。予診票の送付時期なども確認できます。"
              url="https://www.city.zushi.kanagawa.jp/kosodate/kenko/yobou/index.html"
              icon={<Baby size={24} color="#EC4899" />}
            />

            <InfoCard
              title={t('guide.nursery')}
              description="保育園・認定こども園の入園申し込み手続きや空き状況について。"
              url="https://www.city.zushi.kanagawa.jp/kosodate/hoiku/index.html"
              icon={<Baby size={24} color="#EC4899" />}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
