import { useRouter } from 'expo-router';
import { ArrowRight, Calendar, MapPin, ShieldAlert } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
    const router = useRouter();
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const slides = [
        {
            id: '1',
            title: t('onboarding.welcome_title'),
            description: t('onboarding.welcome_desc'),
            icon: <MapPin size={100} color="#007AFF" />,
            color: 'bg-blue-50 dark:bg-blue-900/20',
        },
        {
            id: '2',
            title: t('onboarding.garbage_title'),
            description: t('onboarding.garbage_desc'),
            icon: <Calendar size={100} color="#10B981" />,
            color: 'bg-green-50 dark:bg-green-900/20',
        },
        {
            id: '3',
            title: t('onboarding.disaster_title'),
            description: t('onboarding.disaster_desc'),
            icon: <ShieldAlert size={100} color="#EF4444" />,
            color: 'bg-red-50 dark:bg-red-900/20',
        },
    ];

    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            flatListRef.current?.scrollToIndex({
                index: currentIndex + 1,
                animated: true,
            });
        } else {
            router.replace('/auth/signup');
        }
    };

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / width);
        setCurrentIndex(index);
    };

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-black">
            <FlatList
                ref={flatListRef}
                data={slides}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ width }} className="flex-1 items-center justify-center p-8">
                        <View className={`p-10 rounded-full mb-10 ${item.color}`}>
                            {item.icon}
                        </View>
                        <Text className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
                            {item.title}
                        </Text>
                        <Text className="text-lg text-center text-gray-500 dark:text-gray-400 leading-relaxed">
                            {item.description}
                        </Text>
                    </View>
                )}
            />

            <View className="p-6">
                <View className="flex-row justify-center mb-8 space-x-2">
                    {slides.map((_, index) => (
                        <View
                            key={index}
                            className={`h-2 rounded-full transition-all ${index === currentIndex
                                    ? 'w-8 bg-blue-500'
                                    : 'w-2 bg-gray-300 dark:bg-gray-700'
                                }`}
                        />
                    ))}
                </View>

                <TouchableOpacity
                    onPress={handleNext}
                    className="bg-blue-500 p-4 rounded-xl flex-row justify-center items-center shadow-md shadow-blue-500/30"
                >
                    <Text className="text-white font-bold text-lg mr-2">
                        {currentIndex === slides.length - 1 ? t('onboarding.get_started') : t('onboarding.next')}
                    </Text>
                    <ArrowRight color="white" size={20} />
                </TouchableOpacity>

                {currentIndex !== slides.length - 1 && (
                    <TouchableOpacity
                        onPress={() => router.replace('/auth/login')}
                        className="mt-4 items-center"
                    >
                        <Text className="text-gray-500 dark:text-gray-400 font-medium">{t('onboarding.skip')}</Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
}
