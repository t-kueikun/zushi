import { GarbageCalendar } from '@/components/garbage/GarbageCalendar';
import { GarbageSearch } from '@/components/garbage/GarbageSearch';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GarbageScreen() {
    const { t } = useTranslation();
    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-black">
            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
                <View className="p-5">
                    <Text className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">{t('tabs.garbage')}</Text>

                    <GarbageCalendar />

                    <View className="h-4" />

                    <GarbageSearch />

                    <View className="h-6" />

                    <View className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-5 border-l-4 border-zushi-accent">
                        <Text className="text-lg font-bold mb-2 text-gray-800 dark:text-white">{t('garbage.bulk_trash_title')}</Text>
                        <Text className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                            {t('garbage.bulk_trash_desc')}
                        </Text>
                        <TouchableOpacity className="bg-zushi-accent/10 p-4 rounded-xl items-center">
                            <Text className="text-zushi-accent font-bold text-lg">{t('garbage.bulk_trash_call')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}
