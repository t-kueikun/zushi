import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Baby, Bus, ChevronRight, FileText } from 'lucide-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function GuideScreen() {
    const { t } = useTranslation();
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const sections = [
        {
            title: t('guide.procedures'),
            icon: <FileText size={24} color="#8B5CF6" />,
            route: '/guide/procedures',
            color: 'bg-purple-50 dark:bg-purple-900/30'
        },
        {
            title: t('guide.child_rearing'),
            icon: <Baby size={24} color="#EC4899" />,
            route: '/guide/child-rearing',
            color: 'bg-pink-50 dark:bg-pink-900/30'
        },
        {
            title: t('guide.transport'),
            icon: <Bus size={24} color="#0EA5E9" />,
            route: '/guide/transport',
            color: 'bg-sky-50 dark:bg-sky-900/30'
        }
    ];

    return (
        <View className="flex-1 bg-[#8B5CF6] dark:bg-black">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                <View className="bg-gray-50 dark:bg-black flex-1 pb-24">
                    {/* Header */}
                    <LinearGradient
                        colors={['#8B5CF6', '#A78BFA']}
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
                            <Text className="text-white/80 text-xs font-bold uppercase tracking-widest">{t('home.services')}</Text>
                        </View>
                        <Text className="text-white text-3xl font-extrabold">{t('home.guide')}</Text>
                    </LinearGradient>

                    <View className="px-4">
                        <View className="bg-white dark:bg-gray-900 rounded-2xl p-2 shadow-sm border border-gray-100 dark:border-gray-800">
                            {sections.map((section, index) => (
                                <TouchableOpacity
                                    key={index}
                                    className="flex-row items-center p-4 border-b border-gray-100 dark:border-gray-800 last:border-0"
                                    onPress={() => router.push(section.route as any)}
                                >
                                    <View className={`${section.color} p-3 rounded-xl mr-4`}>
                                        {section.icon}
                                    </View>
                                    <Text className="flex-1 text-lg font-bold text-gray-900 dark:text-white">{section.title}</Text>
                                    <ChevronRight size={20} color="#9CA3AF" />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
