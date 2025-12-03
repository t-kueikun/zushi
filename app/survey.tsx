import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ChevronRight, Send } from 'lucide-react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SurveyScreen() {
    const { t } = useTranslation();
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [feedback, setFeedback] = useState('');

    const handleSubmit = () => {
        Alert.alert(t('survey.thank_you'), t('survey.received'));
        setFeedback('');
    };

    return (
        <View className="flex-1 bg-[#14B8A6] dark:bg-black">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                <View className="bg-gray-50 dark:bg-black flex-1 pb-24">
                    {/* Header */}
                    <LinearGradient
                        colors={['#14B8A6', '#2DD4BF']}
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
                            <Text className="text-white/80 text-xs font-bold uppercase tracking-widest">Feedback</Text>
                        </View>
                        <Text className="text-white text-3xl font-extrabold">{t('survey.title')}</Text>
                        <Text className="text-white/90 mt-2">{t('survey.description')}</Text>
                    </LinearGradient>

                    <View className="px-4">
                        <View className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
                            <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4">{t('survey.question')}</Text>

                            <TextInput
                                className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-gray-900 dark:text-white min-h-[150px] mb-6 border border-gray-200 dark:border-gray-700"
                                multiline
                                placeholder={t('survey.placeholder')}
                                placeholderTextColor="#9CA3AF"
                                textAlignVertical="top"
                                value={feedback}
                                onChangeText={setFeedback}
                            />

                            <TouchableOpacity
                                className="bg-teal-500 p-4 rounded-xl flex-row justify-center items-center shadow-lg shadow-teal-500/30"
                                onPress={handleSubmit}
                            >
                                <Send size={20} color="white" />
                                <Text className="text-white font-bold text-lg ml-2">{t('survey.submit')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
