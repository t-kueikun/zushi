import newsData from '@/data/news.json';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

export function NewsList() {
    const { i18n } = useTranslation();
    const isJa = i18n.language === 'ja';
    const router = useRouter();

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'important': return 'bg-red-100 text-red-800';
            case 'event': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <View>
            {newsData.news.map((item) => (
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
                        {isJa ? item.title_ja : item.title}
                    </Text>
                    <Text className="text-gray-600 dark:text-gray-300 text-sm" numberOfLines={2}>
                        {item.content}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}
