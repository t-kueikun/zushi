import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ChevronDown, ChevronRight, MessageSquare } from 'lucide-react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HelpScreen() {
    const { t } = useTranslation();
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
        const [expanded, setExpanded] = useState(false);
        return (
            <TouchableOpacity
                onPress={() => setExpanded(!expanded)}
                className="bg-white dark:bg-gray-900 p-5 rounded-2xl mb-3 border border-gray-100 dark:border-gray-800 shadow-sm"
            >
                <View className="flex-row justify-between items-center">
                    <Text className="text-base font-bold text-gray-900 dark:text-white flex-1 mr-4">{question}</Text>
                    {expanded ? <ChevronDown size={20} color="#9CA3AF" /> : <ChevronRight size={20} color="#9CA3AF" />}
                </View>
                {expanded && (
                    <Text className="text-gray-600 dark:text-gray-300 mt-3 leading-6">
                        {answer}
                    </Text>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View className="flex-1 bg-[#F97316] dark:bg-black">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                <View className="bg-gray-50 dark:bg-black flex-1 pb-24">
                    {/* Header */}
                    <LinearGradient
                        colors={['#F97316', '#FB923C']}
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
                            <Text className="text-white/80 text-xs font-bold uppercase tracking-widest">Support</Text>
                        </View>
                        <Text className="text-white text-3xl font-extrabold">{t('menu.help_faq')}</Text>
                    </LinearGradient>

                    <View className="px-4">
                        <FAQItem
                            question="How do I sort my garbage?"
                            answer="You can use the 'Garbage' tab to search for specific items or check the collection calendar for your district."
                        />
                        <FAQItem
                            question="Where is the nearest evacuation shelter?"
                            answer="Check the 'Map' tab and select the 'Shelter' layer to see all available evacuation centers in Zushi."
                        />
                        <FAQItem
                            question="How can I register for child allowance?"
                            answer="Please visit the City Hall's Child Rearing Support division or check the 'Guide' section for required documents."
                        />

                        <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4 mt-6">Still need help?</Text>
                        <TouchableOpacity
                            onPress={() => router.push('/survey')}
                            className="bg-blue-500 p-4 rounded-2xl shadow-lg shadow-blue-500/30 flex-row items-center justify-center"
                        >
                            <MessageSquare size={24} color="white" className="mr-2" />
                            <Text className="text-white font-bold text-lg ml-2">Contact Support</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
