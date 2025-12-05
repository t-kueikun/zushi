import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { AlertTriangle, ChevronRight, Map, Phone, Shield } from 'lucide-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DisasterScreen() {
    const { t } = useTranslation();
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const EmergencyContact = ({ icon, label, number, color }: any) => (
        <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${number}`)}
            className="flex-row items-center bg-white dark:bg-gray-900 p-4 rounded-2xl mb-3 border border-gray-100 dark:border-gray-800 shadow-sm"
        >
            <View className={`p-3 rounded-full ${color} mr-4`}>
                {icon}
            </View>
            <View className="flex-1">
                <Text className="text-lg font-bold text-gray-900 dark:text-white">{label}</Text>
                <Text className="text-xl font-bold text-gray-500 dark:text-gray-400">{number}</Text>
            </View>
            <Phone size={24} color="#10B981" />
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 bg-[#EF4444] dark:bg-black">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                <View className="bg-red-50 dark:bg-black flex-1 pb-24">
                    {/* Header */}
                    <LinearGradient
                        colors={['#EF4444', '#F87171']}
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
                            <Text className="text-white/80 text-xs font-bold uppercase tracking-widest">{t('disaster.emergency_header')}</Text>
                        </View>
                        <Text className="text-white text-3xl font-extrabold">{t('disaster.title')}</Text>
                    </LinearGradient>

                    <View className="px-4">
                        {/* Emergency Mode Banner */}
                        <View className="bg-white dark:bg-gray-900 p-5 rounded-2xl mb-8 flex-row items-center shadow-lg shadow-red-500/10 border border-red-100 dark:border-red-900/30">
                            <View className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full mr-4">
                                <AlertTriangle size={32} color="#EF4444" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-red-600 dark:text-red-400 font-bold text-lg">{t('disaster.emergency_mode')}</Text>
                                <Text className="text-gray-500 dark:text-gray-400 text-sm">{t('disaster.active_alerts')}</Text>
                            </View>
                            <ChevronRight size={24} color="#EF4444" />
                        </View>

                        <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4">{t('disaster.emergency_contact')}</Text>
                        <EmergencyContact
                            icon={<Shield size={24} color="#EF4444" />}
                            label={t('disaster.fire_ambulance')}
                            number="119"
                            color="bg-red-100 dark:bg-red-900/30"
                        />
                        <EmergencyContact
                            icon={<Shield size={24} color="#3B82F6" />}
                            label={t('disaster.police')}
                            number="110"
                            color="bg-blue-100 dark:bg-blue-900/30"
                        />

                        <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4 mt-6">{t('disaster.shelters')}</Text>
                        <TouchableOpacity
                            onPress={() => router.push('/(tabs)/map')}
                            className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex-row items-center"
                        >
                            <View className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mr-4">
                                <Map size={24} color="#10B981" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-lg font-bold text-gray-900 dark:text-white">{t('disaster.view_map')}</Text>
                                <Text className="text-gray-500 dark:text-gray-400">{t('disaster.find_shelters')}</Text>
                            </View>
                            <ChevronRight size={24} color="#9CA3AF" />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
