import { supabase } from '@/lib/supabase';
import { News } from '@/types/news';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Calendar, Tag } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NewsDetailScreen() {
    const { id } = useLocalSearchParams();
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const [news, setNews] = useState<News | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchNewsDetail();
        }
    }, [id]);

    const fetchNewsDetail = async () => {
        try {
            const { data, error } = await supabase
                .from('news')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            setNews(data);
        } catch (error) {
            console.error('Error fetching news detail:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-white dark:bg-black">
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    if (!news) {
        return (
            <View className="flex-1 justify-center items-center bg-white dark:bg-black">
                <Text className="text-gray-500">{t('common.error')}</Text>
            </View>
        );
    }

    const title = i18n.language === 'en' ? news.title_en : news.title_ja;
    const content = i18n.language === 'en' ? news.content_en : news.content_ja;

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'important': return 'bg-red-100 text-red-800';
            case 'event': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-black">
            <View className="px-4 py-2 border-b border-gray-100 dark:border-gray-800 flex-row items-center">
                <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                    <ArrowLeft size={24} className="text-gray-900 dark:text-white" color={i18n.language === 'ja' ? '#000' : '#000'} />
                </TouchableOpacity>
                <Text className="text-lg font-bold ml-2 text-gray-900 dark:text-white flex-1" numberOfLines={1}>
                    {t('tabs.news')}
                </Text>
            </View>

            <ScrollView className="flex-1 p-6">
                <View className="flex-row items-center mb-4 space-x-3">
                    <View className={`px-3 py-1 rounded-full flex-row items-center ${getCategoryColor(news.category).split(' ')[0]}`}>
                        <Tag size={12} className="mr-1 text-current" color="#000" />
                        <Text className={`text-xs font-bold uppercase ${getCategoryColor(news.category).split(' ')[1]}`}>
                            {news.category}
                        </Text>
                    </View>
                    <View className="flex-row items-center">
                        <Calendar size={14} className="text-gray-400 mr-1" color="#9CA3AF" />
                        <Text className="text-gray-500 text-sm">{news.date}</Text>
                    </View>
                </View>

                <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                    {title}
                </Text>

                <View className="h-[1px] bg-gray-100 dark:bg-gray-800 mb-6" />

                <Text className="text-base text-gray-700 dark:text-gray-300 leading-7">
                    {content}
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}
