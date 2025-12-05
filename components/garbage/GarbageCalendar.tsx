import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import garbageData from '../../data/garbage.json';

type DistrictId = keyof typeof garbageData.schedules;

export function GarbageCalendar() {
    const { t, i18n } = useTranslation();
    const { user } = useAuth();
    const [selectedDistrict, setSelectedDistrict] = useState<DistrictId>('north');

    useEffect(() => {
        if (user) {
            fetchUserDistrict();
        }
    }, [user]);

    const fetchUserDistrict = async () => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('district')
                .eq('id', user?.id)
                .single();

            if (data?.district) {
                const district = data.district;
                // Map specific districts to North/South
                const northDistricts = ['ikego', 'numama', 'hisagi', 'yamanone'];
                // South is default for others (zushi, kotsubo, shinjuku, sakurayama)

                if (northDistricts.includes(district)) {
                    setSelectedDistrict('north');
                } else {
                    setSelectedDistrict('south');
                }
            }
        } catch (error) {
            console.error('Error fetching user district:', error);
        }
    };

    const today = new Date();
    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(today.getDate() + i);
        return d;
    });

    const getGarbageType = (date: Date, district: DistrictId) => {
        const day = date.getDay(); // 0: Sun, 1: Mon, ...
        const schedule = garbageData.schedules[district];

        if (schedule.burnable.includes(day)) return { type: 'burnable', label: 'Burnable', color: 'bg-red-100 text-red-800' };
        if (schedule.non_burnable.includes(day)) return { type: 'non_burnable', label: 'Non-burnable', color: 'bg-blue-100 text-blue-800' };
        if (schedule.recyclable.includes(day)) return { type: 'recyclable', label: 'Recyclable', color: 'bg-green-100 text-green-800' };
        return null;
    };

    return (
        <View className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-5 mb-6">
            <Text className="text-lg font-bold mb-4 text-gray-800 dark:text-white flex-row items-center">
                {t('garbage.calendar_title')}
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
                {garbageData.districts.map((d) => (
                    <TouchableOpacity
                        key={d.id}
                        onPress={() => setSelectedDistrict(d.id as DistrictId)}
                        className={`mr-3 px-5 py-2.5 rounded-full border ${selectedDistrict === d.id
                            ? 'bg-zushi-blue border-zushi-blue'
                            : 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700'
                            }`}
                    >
                        <Text className={`font-medium ${selectedDistrict === d.id ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                            {i18n.language === 'ja' ? d.name_ja : d.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View className="space-y-3">
                {weekDays.map((date, index) => {
                    const garbage = getGarbageType(date, selectedDistrict);
                    const isToday = index === 0;

                    return (
                        <View key={index} className={`flex-row items-center p-3 rounded-xl ${isToday ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800' : 'bg-gray-50 dark:bg-gray-800/50'}`}>
                            <View className="w-14 items-center justify-center bg-white dark:bg-gray-700 rounded-lg h-14 shadow-sm">
                                <Text className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase">{date.toLocaleDateString('en-US', { weekday: 'short' })}</Text>
                                <Text className="text-xl font-bold text-gray-800 dark:text-white">{date.getDate()}</Text>
                            </View>
                            <View className="flex-1 ml-4">
                                {garbage ? (
                                    <View className="flex-row items-center">
                                        <View className={`w-3 h-3 rounded-full mr-2 ${garbage.color.split(' ')[0].replace('bg-', 'bg-')}`} />
                                        <Text className="text-base font-semibold text-gray-800 dark:text-white">{t(`garbage.types.${garbage.type}`)}</Text>
                                    </View>
                                ) : (
                                    <Text className="text-gray-400 dark:text-gray-500 italic">{t('garbage.no_collection')}</Text>
                                )}
                            </View>
                            {isToday && (
                                <View className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">
                                    <Text className="text-blue-700 dark:text-blue-300 text-xs font-bold">{t('garbage.today')}</Text>
                                </View>
                            )}
                        </View>
                    );
                })}
            </View>
        </View>
    );
}
