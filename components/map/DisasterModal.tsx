import { AlertTriangle, Phone, Shield, X } from 'lucide-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    visible: boolean;
    onClose: () => void;
}

export function DisasterModal({ visible, onClose }: Props) {
    const { t } = useTranslation();

    return (
        <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
            <View className="flex-1 bg-white dark:bg-gray-900 p-6">
                <View className="flex-row justify-between items-center mb-6">
                    <View className="flex-row items-center">
                        <AlertTriangle size={32} color="#EF4444" />
                        <Text className="text-2xl font-bold ml-3 text-gray-900 dark:text-white">{t('disaster.title')}</Text>
                    </View>
                    <TouchableOpacity onPress={onClose} className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full">
                        <X size={24} color="#6B7280" />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl mb-6 border border-red-100 dark:border-red-800">
                        <Text className="text-red-800 dark:text-red-200 font-bold text-lg mb-2">{t('disaster.emergency_contact')}</Text>
                        <View className="flex-row items-center mb-2">
                            <Phone size={20} color="#EF4444" />
                            <Text className="text-xl font-bold ml-2 text-gray-900 dark:text-white">119</Text>
                            <Text className="ml-2 text-gray-600 dark:text-gray-400">({t('disaster.fire_ambulance')})</Text>
                        </View>
                        <View className="flex-row items-center">
                            <Phone size={20} color="#EF4444" />
                            <Text className="text-xl font-bold ml-2 text-gray-900 dark:text-white">110</Text>
                            <Text className="ml-2 text-gray-600 dark:text-gray-400">({t('disaster.police')})</Text>
                        </View>
                    </View>

                    <Text className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{t('disaster.shelters')}</Text>
                    <View className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl mb-4">
                        <View className="flex-row items-center mb-2">
                            <Shield size={20} color="#10B981" />
                            <Text className="font-bold ml-2 text-gray-900 dark:text-white">Zushi Elementary School</Text>
                        </View>
                        <Text className="text-gray-600 dark:text-gray-400 ml-7">4-2-1 Zushi</Text>
                    </View>
                    <View className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl mb-4">
                        <View className="flex-row items-center mb-2">
                            <Shield size={20} color="#10B981" />
                            <Text className="font-bold ml-2 text-gray-900 dark:text-white">Hisagi Elementary School</Text>
                        </View>
                        <Text className="text-gray-600 dark:text-gray-400 ml-7">2-1-1 Hisagi</Text>
                    </View>

                    <View className="h-10" />
                </ScrollView>
            </View>
        </Modal>
    );
}
