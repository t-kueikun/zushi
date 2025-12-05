import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

type NewsItem = {
    id: string;
    title_en: string;
    title_ja: string;
    content_en: string;
    content_ja: string;
    category: string;
    date: string;
};

export function NewsList() {
    const { i18n } = useTranslation();
    const isJa = i18n.language === 'ja';
    const router = useRouter();
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const { data, error } = await supabase
                .from('news')
                .select('*')
                .order('date', { ascending: false });

            if (error) throw error;
            if (data) setNews(data);
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false);
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'important': return 'bg-red-100 text-red-800';
            case 'event': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <View className="py-10">
                <ActivityIndicator size="large" color="#6366F1" />
            </View>
        );
    }

    if (news.length === 0) {
        return (
            <View className="py-10 items-center">
                <Text className="text-gray-500 dark:text-gray-400">No news available.</Text>
            </View>
        );
    }

    return (
        <View>
            {news.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    className="bg-white dark:bg-gray-900 p-4 rounded-xl mb-3 shadow-sm border border-gray-100 dark:border-gray-800"
                    onPress={() => { }}
                >
                    <View className="flex-row justify-between items-start mb-2">
                        <View className={`px-2 py-1 rounded-md ${getCategoryColor(item.category).split(' ')[0]}`}>
                            <Text className={`text-xs font-bold uppercase ${getCategoryColor(item.category).split(' ')[1]}`}>
                                {item.category}
                            </Text>
                        </View>
                        <Text className="text-gray-500 dark:text-gray-400 text-xs">{item.date}</Text>
                    </View>
                    <Text className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                        {isJa ? item.title_ja : item.title_en}
                    </Text>
                    <Text className="text-gray-600 dark:text-gray-300 text-sm" numberOfLines={2}>
                        {isJa ? (item.content_ja || item.content_en) : item.content_en}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}
