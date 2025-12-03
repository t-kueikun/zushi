import garbageData from '@/data/garbage.json';
import { Search } from 'lucide-react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextInput, View } from 'react-native';

export function GarbageSearch() {
    const { t } = useTranslation();
    const [query, setQuery] = useState('');

    const filteredItems = garbageData.items.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <View className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-5">
            <Text className="text-lg font-bold mb-4 text-gray-800 dark:text-white">{t('garbage.search_title')}</Text>

            <View className="flex-row items-center bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-3 mb-4 border border-gray-100 dark:border-gray-700">
                <Search size={20} color="#6B7280" />
                <TextInput
                    className="flex-1 ml-3 text-base text-gray-800 dark:text-white"
                    placeholder={t('garbage.search_placeholder')}
                    placeholderTextColor="#9CA3AF"
                    value={query}
                    onChangeText={setQuery}
                />
            </View>

            {query.length > 0 && (
                <View className="bg-gray-50 dark:bg-gray-800/50 rounded-xl overflow-hidden">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item, index) => (
                            <View key={index} className="flex-row justify-between items-center p-4 border-b border-gray-100 dark:border-gray-700 last:border-0 bg-white dark:bg-gray-800">
                                <Text className="font-semibold text-gray-800 dark:text-white text-base">{item.name}</Text>
                                <View className="items-end">
                                    <View className={`px-2 py-1 rounded-md mb-1 ${item.type === 'burnable' ? 'bg-red-100' :
                                            item.type === 'non_burnable' ? 'bg-blue-100' :
                                                item.type === 'recyclable' ? 'bg-green-100' : 'bg-orange-100'
                                        }`}>
                                        <Text className={`text-xs font-bold ${item.type === 'burnable' ? 'text-red-700' :
                                                item.type === 'non_burnable' ? 'text-blue-700' :
                                                    item.type === 'recyclable' ? 'text-green-700' : 'text-orange-700'
                                            }`}>
                                            {t(`garbage.types.${item.type}`)}
                                        </Text>
                                    </View>
                                    {item.note && <Text className="text-xs text-gray-500 dark:text-gray-400">{item.note}</Text>}
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text className="text-gray-500 dark:text-gray-400 text-center py-6 italic">{t('garbage.no_items_found', { query })}</Text>
                    )}
                </View>
            )}
        </View>
    );
}
