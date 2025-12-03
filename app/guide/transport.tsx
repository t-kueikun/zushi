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
            title: 'JR East (Zushi Station)',
            title_ja: 'JR東日本 (逗子駅)',
            url: 'https://traininfo.jreast.co.jp/train_info/kanto.aspx',
            icon: <Train size={24} color="#166534" />, // Green for JR
            desc: 'Live Service Status / 運行情報'
        },
        {
            title: 'Keikyu Line',
            title_ja: '京急線 (逗子・葉山駅)',
            url: 'https://unkou.keikyu.co.jp/',
            icon: <Train size={24} color="#DC2626" />, // Red for Keikyu
            desc: 'Live Service Status / 運行情報'
        }
    ];

    const busLinks = [
        {
            title: 'Keikyu Bus Timetable',
            title_ja: '京急バス 時刻表・経路検索',
            url: 'https://transfer.navitime.biz/keikyubus/pc/map/Top',
            icon: <Bus size={24} color="#2563EB" />,
            desc: 'Search by bus stop / バス停検索'
        },
        {
            title: 'Zushi Station Bus Stops',
            title_ja: '逗子駅 バス乗り場案内',
            url: 'https://www.keikyu-bus.co.jp/line/nori_05.html',
            icon: <Bus size={24} color="#2563EB" />,
            desc: 'Platform Map / 乗り場マップ'
        }
    ];

    const LinkCard = ({ link }: any) => (
        <TouchableOpacity
            className="p-4 border-b border-gray-100 dark:border-gray-800 flex-row items-center bg-white dark:bg-gray-900 last:border-0"
            onPress={() => openBrowser(link.url, link.title_ja)}
        >
            <View className="bg-gray-50 dark:bg-gray-800 p-3 rounded-full mr-4">
                {link.icon}
            </View>
            <View className="flex-1">
                <Text className="font-bold text-gray-900 dark:text-white text-lg">
                    {link.title_ja}
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
                            <Text className="text-white/80 text-xs font-bold uppercase tracking-widest">Access</Text>
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
