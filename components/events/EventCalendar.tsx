import eventsData from '@/data/events.json';
import { Clock, MapPin } from 'lucide-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

export function EventCalendar() {
    const { i18n } = useTranslation();
    const isJa = i18n.language === 'ja';

    return (
        <View>
            {eventsData.events.map((item) => (
                <View key={item.id} className="bg-white dark:bg-gray-900 p-4 rounded-xl mb-3 shadow-sm border border-gray-100 dark:border-gray-800 flex-row">
                    <View className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl items-center justify-center mr-4 w-16 h-16">
                        <Text className="text-blue-600 dark:text-blue-400 font-bold text-xs uppercase">{new Date(item.date).toLocaleString('en-US', { month: 'short' })}</Text>
                        <Text className="text-blue-800 dark:text-blue-300 font-bold text-xl">{new Date(item.date).getDate()}</Text>
                    </View>

                    <View className="flex-1 justify-center">
                        <Text className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                            {isJa ? item.title_ja : item.title}
                        </Text>

                        <View className="flex-row items-center mb-1">
                            <Clock size={14} color="#6B7280" />
                            <Text className="text-gray-500 dark:text-gray-400 text-xs ml-1">{item.time}</Text>
                        </View>

                        <View className="flex-row items-center">
                            <MapPin size={14} color="#6B7280" />
                            <Text className="text-gray-500 dark:text-gray-400 text-xs ml-1">{item.location}</Text>
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );
}
