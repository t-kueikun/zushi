import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Bus, ChevronRight, ExternalLink, Train } from 'lucide-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TransportScreen() {
    const { t } = useTranslation();
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const openBrowser = (url: string, title: string) => {
        router.push({
            pathname: '/browser',
            params: { url, title }
        });
    };

    const trainLinks = [
        {
            title: t('guide.jr_zushi'),
            url: 'https://traininfo.jreast.co.jp/train_info/kanto.aspx',
            icon: <Train size={24} color="#166534" />, // Green for JR
            desc: t('guide.service_status')
        },
        {
            title: t('guide.keikyu_zushi'),
            url: 'https://unkou.keikyu.co.jp/',
            icon: <Train size={24} color="#DC2626" />, // Red for Keikyu
            desc: t('guide.service_status')
        }
    ];

    const busLinks = [
        {
            title: t('guide.keikyu_bus_search'),
            url: 'https://transfer.navitime.biz/keikyubus/pc/map/Top',
            icon: <Bus size={24} color="#2563EB" />,
            desc: t('guide.bus_search_desc')
        },
        {
            title: t('guide.zushi_station_bus'),
            url: 'https://www.keikyu-bus.co.jp/line/nori_05.html',
            icon: <Bus size={24} color="#2563EB" />,
            desc: t('guide.platform_map')
        }
    ];

    const LinkCard = ({ link }: any) => (
        <TouchableOpacity
            className="p-4 border-b border-gray-100 dark:border-gray-800 flex-row items-center bg-white dark:bg-gray-900 last:border-0"
            onPress={() => openBrowser(link.url, link.title)}
        >
            <View className="bg-gray-50 dark:bg-gray-800 p-3 rounded-full mr-4">
                {link.icon}
            </View>
            <View className="flex-1">
                <Text className="font-bold text-gray-900 dark:text-white text-lg">
                    {link.title}
                </Text>
                <Text className="text-gray-500 dark:text-gray-400 text-sm">
                    {link.desc}
                </Text>
            </View>
            <ExternalLink size={20} color="#9CA3AF" />
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 bg-[#0EA5E9] dark:bg-black">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                <View className="bg-gray-50 dark:bg-black flex-1 pb-24">
                    {/* Header */}
                    <LinearGradient
                        colors={['#0EA5E9', '#38BDF8']}
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
                            <Text className="text-white/80 text-xs font-bold uppercase tracking-widest">{t('guide.access')}</Text>
                        </View>
                        <Text className="text-white text-3xl font-extrabold">{t('guide.transport')}</Text>
                    </LinearGradient>

                    <View className="px-4">
                        <Text className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-3 ml-1">
                            {t('guide.train_info')}
                        </Text>
                        <View className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm mb-6 border border-gray-100 dark:border-gray-800">
                            {trainLinks.map((link, index) => (
                                <LinkCard key={index} link={link} />
                            ))}
                        </View>

                        <Text className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-3 ml-1">
                            {t('guide.bus_schedule')}
                        </Text>
                        <View className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm mb-6 border border-gray-100 dark:border-gray-800">
                            {busLinks.map((link, index) => (
                                <LinkCard key={index} link={link} />
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
