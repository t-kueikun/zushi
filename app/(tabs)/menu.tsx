import { useRouter } from 'expo-router';
import {
    AlertTriangle,
    BookOpen,
    Calendar,
    ChevronRight,
    ExternalLink,
    FileText,
    HelpCircle,
    Info,
    Map as MapIcon,
    MessageSquare,
    Phone,
    Settings,
    Trash2,
    Truck,
    Users
} from 'lucide-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MenuScreen() {
    const { t } = useTranslation();
    const router = useRouter();

    const openLink = (url: string) => {
        Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
    };

    const QuickAccessItem = ({ icon, label, route, color, isExternal = false }: any) => (
        <TouchableOpacity
            onPress={() => isExternal ? openLink(route) : router.push(route)}
            className="items-center justify-center w-[22%] aspect-square bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 mb-2"
        >
            <View className={`p-3 rounded-full ${color} mb-1`}>
                {icon}
            </View>
            <Text className="text-[10px] font-bold text-gray-700 dark:text-gray-300 text-center">{label}</Text>
        </TouchableOpacity>
    );

    const ListItem = ({ icon, label, route, color, isExternal = false, subLabel }: any) => (
        <TouchableOpacity
            onPress={() => isExternal ? openLink(route) : router.push(route)}
            className="bg-white dark:bg-gray-900 p-4 rounded-2xl mb-3 flex-row items-center shadow-sm border border-gray-50 dark:border-gray-800"
        >
            <View className={`p-3 rounded-xl mr-4 ${color}`}>
                {icon}
            </View>
            <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900 dark:text-white">{label}</Text>
                {subLabel && <Text className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{subLabel}</Text>}
            </View>
            {isExternal ? <ExternalLink size={18} color="#9CA3AF" /> : <ChevronRight size={20} color="#9CA3AF" />}
        </TouchableOpacity>
    );

    const SectionHeader = ({ title }: { title: string }) => (
        <Text className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase mb-3 ml-1 mt-6 tracking-wider">
            {title}
        </Text>
    );

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-black">
            <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
                <View className="bg-gray-50 dark:bg-black flex-1 pb-10">
                    {/* Header Section */}
                    <View className="px-6 pt-4 pb-6 bg-white dark:bg-gray-900 rounded-b-[32px] shadow-sm mb-6">
                        <Text className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">
                            {t('tabs.menu')}
                        </Text>
                        <Text className="text-gray-500 dark:text-gray-400 text-sm">
                            {t('menu.portal_subtitle')}
                        </Text>

                        {/* Quick Access Grid */}
                        <View className="flex-row flex-wrap justify-between mt-6">
                            <QuickAccessItem
                                icon={<MapIcon size={20} color="#007AFF" />}
                                label={t('tabs.map')}
                                route="/(tabs)/map"
                                color="bg-blue-50 dark:bg-blue-900/30"
                            />
                            <QuickAccessItem
                                icon={<Calendar size={20} color="#F59E0B" />}
                                label={t('tabs.events')}
                                route="/events"
                                color="bg-amber-50 dark:bg-amber-900/30"
                            />
                            <QuickAccessItem
                                icon={<Trash2 size={20} color="#10B981" />}
                                label={t('tabs.garbage')}
                                route="/(tabs)/garbage"
                                color="bg-emerald-50 dark:bg-emerald-900/30"
                            />
                            <QuickAccessItem
                                icon={<AlertTriangle size={20} color="#EF4444" />}
                                label={t('home.disaster_info')}
                                route="/disaster"
                                color="bg-red-50 dark:bg-red-900/30"
                            />
                        </View>
                    </View>

                    <View className="px-4">
                        {/* Living & Procedures */}
                        <SectionHeader title={t('menu.living_procedures')} />
                        <ListItem
                            icon={<BookOpen size={22} color="#8B5CF6" />}
                            label={t('home.guide')}
                            subLabel={t('menu.living_procedures')} // Reusing for sublabel or create specific if needed
                            route="/guide"
                            color="bg-purple-50 dark:bg-purple-900/30"
                        />
                        <ListItem
                            icon={<Users size={22} color="#EC4899" />}
                            label={t('menu.child_rearing')}
                            subLabel={t('menu.child_rearing_sub')}
                            route="/guide/child-rearing"
                            color="bg-pink-50 dark:bg-pink-900/30"
                        />
                        <ListItem
                            icon={<Truck size={22} color="#0EA5E9" />}
                            label={t('menu.public_transport')}
                            subLabel={t('menu.public_transport_sub')}
                            route="/guide/transport"
                            color="bg-sky-50 dark:bg-sky-900/30"
                        />

                        {/* City Information */}
                        <SectionHeader title={t('menu.city_info')} />
                        <ListItem
                            icon={<FileText size={22} color="#6366F1" />}
                            label={t('menu.news_updates')}
                            route="/news"
                            color="bg-indigo-50 dark:bg-indigo-900/30"
                        />
                        <ListItem
                            icon={<MessageSquare size={22} color="#14B8A6" />}
                            label={t('menu.survey')}
                            subLabel={t('menu.survey_sub')}
                            route="/survey"
                            color="bg-teal-50 dark:bg-teal-900/30"
                        />

                        {/* Support & Settings */}
                        <SectionHeader title={t('menu.support')} />
                        <ListItem
                            icon={<HelpCircle size={22} color="#F97316" />}
                            label={t('menu.help_faq')}
                            route="/help"
                            color="bg-orange-50 dark:bg-orange-900/30"
                        />
                        <ListItem
                            icon={<Settings size={22} color="#6B7280" />}
                            label={t('menu.settings')} // You might want to rename this key to 'profile' later or keep it as Settings
                            route="/profile"
                            color="bg-gray-100 dark:bg-gray-800"
                        />

                        {/* Official Links */}
                        <SectionHeader title={t('menu.official_links')} />
                        <View className="flex-row gap-3 mb-8">
                            <TouchableOpacity
                                onPress={() => openLink('https://www.city.zushi.kanagawa.jp/')}
                                className="flex-1 bg-white dark:bg-gray-900 p-4 rounded-2xl items-center border border-gray-100 dark:border-gray-800 shadow-sm"
                            >
                                <Info size={24} color="#007AFF" className="mb-2" />
                                <Text className="text-xs font-bold text-gray-600 dark:text-gray-300">{t('menu.website')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => openLink('https://twitter.com/zushi_official')}
                                className="flex-1 bg-white dark:bg-gray-900 p-4 rounded-2xl items-center border border-gray-100 dark:border-gray-800 shadow-sm"
                            >
                                <MessageSquare size={24} color="#1DA1F2" className="mb-2" />
                                <Text className="text-xs font-bold text-gray-600 dark:text-gray-300">{t('menu.twitter')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => openLink('https://www.instagram.com/zushi_official')}
                                className="flex-1 bg-white dark:bg-gray-900 p-4 rounded-2xl items-center border border-gray-100 dark:border-gray-800 shadow-sm"
                            >
                                <Phone size={24} color="#E1306C" className="mb-2" />
                                <Text className="text-xs font-bold text-gray-600 dark:text-gray-300">{t('menu.contact')}</Text>
                            </TouchableOpacity>
                        </View>

                        <Text className="text-center text-gray-400 text-xs mb-4">
                            Zushi City App v1.0.0
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
