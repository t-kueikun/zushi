import { supabase } from '@/lib/supabase';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Alert, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PostNewsScreen() {
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title_en: '',
        title_ja: '',
        content_en: '',
        content_ja: '',
        category: 'general'
    });

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'ja' : 'en';
        i18n.changeLanguage(newLang);
    };

    const categories = [
        { label: t('admin.cat_general'), value: 'general' },
        { label: t('admin.cat_important'), value: 'important' },
        { label: t('admin.cat_event'), value: 'event' }
    ];

    const handleSubmit = async () => {
        if (!formData.title_en || !formData.title_ja) {
            const msg = t('admin.fill_titles');
            if (Platform.OS === 'web') {
                window.alert(msg);
            } else {
                Alert.alert('Error', msg);
            }
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase
                .from('news')
                .insert([
                    {
                        ...formData,
                        date: new Date().toISOString().split('T')[0]
                    }
                ]);

            if (error) throw error;

            const msg = t('admin.success');
            if (Platform.OS === 'web') {
                window.alert(msg);
            } else {
                Alert.alert('Success', msg);
            }
            router.back();
        } catch (error: any) {
            console.error('Error posting news:', error);
            const msg = t('admin.error') + ': ' + error.message;
            if (Platform.OS === 'web') {
                window.alert(msg);
            } else {
                Alert.alert('Error', msg);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-black">
            <Stack.Screen options={{ title: t('admin.title'), headerShown: true }} />
            <ScrollView contentContainerStyle={{ padding: 20, maxWidth: 800, alignSelf: 'center', width: '100%' }}>
                <View className="flex-row justify-between items-center mb-6">
                    <Text className="text-2xl font-bold text-gray-900 dark:text-white">{t('admin.title')}</Text>
                    <TouchableOpacity
                        onPress={toggleLanguage}
                        className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700"
                    >
                        <Text className="text-sm font-bold text-gray-900 dark:text-white">
                            {i18n.language === 'en' ? '日本語' : 'English'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <View className="mb-4">
                        <Text className="text-sm font-bold text-gray-500 mb-2">{t('admin.category')}</Text>
                        <View className="flex-row gap-2">
                            {categories.map((cat) => (
                                <TouchableOpacity
                                    key={cat.value}
                                    onPress={() => setFormData({ ...formData, category: cat.value })}
                                    className={`px-4 py-2 rounded-full border ${formData.category === cat.value
                                        ? 'bg-blue-500 border-blue-500'
                                        : 'bg-transparent border-gray-300 dark:border-gray-700'
                                        }`}
                                >
                                    <Text className={formData.category === cat.value ? 'text-white font-bold' : 'text-gray-600 dark:text-gray-400'}>
                                        {cat.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View className="flex-row gap-4 mb-4">
                        <View className="flex-1">
                            <Text className="text-sm font-bold text-gray-500 mb-2">{t('admin.title_en')}</Text>
                            <TextInput
                                className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                                placeholder="News Title"
                                value={formData.title_en}
                                onChangeText={(text) => setFormData({ ...formData, title_en: text })}
                            />
                        </View>
                        <View className="flex-1">
                            <Text className="text-sm font-bold text-gray-500 mb-2">{t('admin.title_ja')}</Text>
                            <TextInput
                                className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                                placeholder="ニュースのタイトル"
                                value={formData.title_ja}
                                onChangeText={(text) => setFormData({ ...formData, title_ja: text })}
                            />
                        </View>
                    </View>

                    <View className="mb-6">
                        <Text className="text-sm font-bold text-gray-500 mb-2">{t('admin.content_en')}</Text>
                        <TextInput
                            className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white min-h-[100px]"
                            placeholder="News content..."
                            multiline
                            value={formData.content_en}
                            onChangeText={(text) => setFormData({ ...formData, content_en: text })}
                            style={{ textAlignVertical: 'top' }}
                        />
                    </View>

                    <View className="mb-8">
                        <Text className="text-sm font-bold text-gray-500 mb-2">{t('admin.content_ja')}</Text>
                        <TextInput
                            className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white min-h-[100px]"
                            placeholder="ニュースの内容..."
                            multiline
                            value={formData.content_ja}
                            onChangeText={(text) => setFormData({ ...formData, content_ja: text })}
                            style={{ textAlignVertical: 'top' }}
                        />
                    </View>

                    <TouchableOpacity
                        onPress={handleSubmit}
                        disabled={loading}
                        className={`p-4 rounded-xl items-center ${loading ? 'bg-gray-400' : 'bg-blue-600'}`}
                    >
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text className="text-white font-bold text-lg">{t('admin.submit')}</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
