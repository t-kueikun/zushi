import { useFocusEffect, useRouter } from 'expo-router';
import { Camera, ChevronLeft, ChevronRight, LogOut, Mail, MapPin, Save, Trash2, User } from 'lucide-react-native';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

export default function ProfileScreen() {
    const { t } = useTranslation();
    const { user, signOut } = useAuth();
    const router = useRouter();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Profile State
    const [fullName, setFullName] = useState('');
    const [isResident, setIsResident] = useState(true);
    const [district, setDistrict] = useState('');
    const [prefecture, setPrefecture] = useState('');

    // District Options
    const districts = [
        { label: '久木 (Hisagi)', value: 'hisagi' },
        { label: '小坪 (Kotsubo)', value: 'kotsubo' },
        { label: '沼間 (Numama)', value: 'numama' },
        { label: '池子 (Ikego)', value: 'ikego' },
        { label: '新宿 (Shinjuku)', value: 'shinjuku' },
        { label: '逗子 (Zushi)', value: 'zushi' },
        { label: '桜山 (Sakurayama)', value: 'sakurayama' },
        { label: '山の根 (Yamanone)', value: 'yamanone' },
    ];

    const prefectures = [
        { label: '神奈川県 (Kanagawa)', value: 'Kanagawa' },
        { label: '東京都 (Tokyo)', value: 'Tokyo' },
        { label: '千葉県 (Chiba)', value: 'Chiba' },
        { label: 'その他 (Other)', value: 'Other' },
        { label: '国外 (Outside Japan)', value: 'Outside Japan' },
    ];

    useFocusEffect(
        useCallback(() => {
            if (user) {
                fetchProfile();
            }
        }, [user])
    );

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user?.id)
                .single();

            if (data) {
                setFullName(data.full_name || '');
                setIsResident(data.is_resident);
                setDistrict(data.district || '');
                setPrefecture(data.prefecture || '');
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const updates = {
                id: user?.id,
                full_name: fullName,
                is_resident: isResident,
                district: isResident ? district : null,
                prefecture: !isResident ? prefecture : null,
                updated_at: new Date(),
            };

            const { error } = await supabase
                .from('profiles')
                .upsert(updates);

            if (error) throw error;

            setIsEditing(false);
            Alert.alert("成功", "プロフィールを更新しました");
        } catch (error: any) {
            Alert.alert(t('auth.error'), error.message);
        } finally {
            setSaving(false);
        }
    };

    const handleSignOut = async () => {
        await signOut();
        router.replace('/auth/login');
    };

    const handleDeleteAccount = () => {
        Alert.alert(
            "アカウント削除",
            "本当にアカウントを削除しますか？この操作は取り消せません。",
            [
                { text: "キャンセル", style: "cancel" },
                {
                    text: "削除する",
                    style: "destructive",
                    onPress: async () => {
                        await signOut();
                        router.replace('/auth/login');
                    }
                }
            ]
        );
    };

    const InfoRow = ({ icon, label, value, isEditable = false, onPress }: any) => (
        <TouchableOpacity
            disabled={!isEditable && !onPress}
            onPress={onPress}
            className="flex-row items-center py-4 border-b border-gray-100 dark:border-gray-800"
        >
            <View className="w-10 items-center justify-center">
                {icon}
            </View>
            <View className="flex-1 ml-2">
                <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</Text>
                <Text className="text-base font-medium text-gray-900 dark:text-white" numberOfLines={1}>
                    {value || '未設定'}
                </Text>
            </View>
            {(isEditable || onPress) && (
                <ChevronRight size={20} color={isDark ? '#4B5563' : '#D1D5DB'} />
            )}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-black">
            {/* Header */}
            <View className="px-4 py-2 flex-row items-center justify-between border-b border-gray-100 dark:border-gray-800">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="p-2 -ml-2 rounded-full active:bg-gray-100 dark:active:bg-gray-900"
                >
                    <ChevronLeft size={24} color={isDark ? '#FFF' : '#000'} />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-gray-900 dark:text-white">プロフィール</Text>
                <TouchableOpacity
                    onPress={() => setIsEditing(!isEditing)}
                    className="p-2 -mr-2"
                >
                    <Text className="text-blue-600 font-bold text-base">
                        {isEditing ? '完了' : '編集'}
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
                {/* Avatar Section */}
                <View className="items-center py-8 bg-gray-50 dark:bg-gray-900/50">
                    <View className="relative">
                        <View className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900 items-center justify-center mb-4 border-4 border-white dark:border-black shadow-sm">
                            <User size={48} color="#007AFF" />
                        </View>
                        {isEditing && (
                            <TouchableOpacity className="absolute bottom-4 right-0 bg-blue-600 p-2 rounded-full border-2 border-white dark:border-black">
                                <Camera size={16} color="white" />
                            </TouchableOpacity>
                        )}
                    </View>

                    {isEditing ? (
                        <TextInput
                            value={fullName}
                            onChangeText={setFullName}
                            placeholder="表示名を入力"
                            placeholderTextColor="#9CA3AF"
                            className="text-2xl font-bold text-gray-900 dark:text-white text-center min-w-[200px] border-b border-blue-500 pb-1"
                            autoFocus
                        />
                    ) : (
                        <Text className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                            {fullName || t('auth.guest_user')}
                        </Text>
                    )}

                    <Text className="text-gray-500 dark:text-gray-400 mt-1 font-medium">
                        {isResident ? '逗子市民' : '市外在住'}
                    </Text>
                </View>

                {/* Info Section */}
                <View className="px-6 mt-6">
                    <Text className="text-sm font-bold text-gray-900 dark:text-white mb-2">基本情報</Text>
                    <View className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 px-4 shadow-sm">
                        <InfoRow
                            icon={<Mail size={20} color="#6B7280" />}
                            label="メールアドレス"
                            value={user?.email}
                        />

                        {isEditing ? (
                            <View className="py-4 border-b border-gray-100 dark:border-gray-800">
                                <View className="flex-row items-center mb-2">
                                    <View className="w-10 items-center justify-center">
                                        <MapPin size={20} color="#6B7280" />
                                    </View>
                                    <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider">居住地設定</Text>
                                </View>

                                <View className="pl-12">
                                    <View className="flex-row gap-2 mb-3">
                                        <TouchableOpacity
                                            onPress={() => setIsResident(true)}
                                            className={`flex-1 py-2 rounded-lg border ${isResident ? 'bg-blue-50 border-blue-500' : 'border-gray-200 dark:border-gray-700'}`}
                                        >
                                            <Text className={`text-center font-bold ${isResident ? 'text-blue-600' : 'text-gray-500'}`}>市内</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => setIsResident(false)}
                                            className={`flex-1 py-2 rounded-lg border ${!isResident ? 'bg-blue-50 border-blue-500' : 'border-gray-200 dark:border-gray-700'}`}
                                        >
                                            <Text className={`text-center font-bold ${!isResident ? 'text-blue-600' : 'text-gray-500'}`}>市外</Text>
                                        </TouchableOpacity>
                                    </View>

                                    {isResident ? (
                                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                                            {districts.map((d) => (
                                                <TouchableOpacity
                                                    key={d.value}
                                                    onPress={() => setDistrict(d.value)}
                                                    className={`mr-2 px-3 py-2 rounded-full border ${district === d.value ? 'bg-blue-500 border-blue-500' : 'border-gray-200 dark:border-gray-700'}`}
                                                >
                                                    <Text className={`text-xs font-bold ${district === d.value ? 'text-white' : 'text-gray-500'}`}>{d.label.split(' ')[0]}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </ScrollView>
                                    ) : (
                                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                                            {prefectures.map((p) => (
                                                <TouchableOpacity
                                                    key={p.value}
                                                    onPress={() => setPrefecture(p.value)}
                                                    className={`mr-2 px-3 py-2 rounded-full border ${prefecture === p.value ? 'bg-blue-500 border-blue-500' : 'border-gray-200 dark:border-gray-700'}`}
                                                >
                                                    <Text className={`text-xs font-bold ${prefecture === p.value ? 'text-white' : 'text-gray-500'}`}>{p.label.split(' ')[0]}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </ScrollView>
                                    )}
                                </View>
                            </View>
                        ) : (
                            <InfoRow
                                icon={<MapPin size={20} color="#6B7280" />}
                                label="居住地"
                                value={isResident
                                    ? districts.find(d => d.value === district)?.label || district
                                    : prefectures.find(p => p.value === prefecture)?.label || prefecture}
                            />
                        )}
                    </View>
                </View>

                {/* Save Button (Only when editing) */}
                {isEditing && (
                    <View className="px-6 mt-6">
                        <TouchableOpacity
                            onPress={handleSave}
                            disabled={saving}
                            className="bg-blue-600 p-4 rounded-xl flex-row justify-center items-center shadow-lg shadow-blue-200 dark:shadow-none active:bg-blue-700"
                        >
                            {saving ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <>
                                    <Save color="white" size={20} className="mr-2" />
                                    <Text className="text-white font-bold text-lg">変更を保存</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </View>
                )}

                {/* Danger Zone */}
                <View className="px-6 mt-8">
                    <Text className="text-sm font-bold text-gray-900 dark:text-white mb-2">アカウント操作</Text>
                    <View className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                        <TouchableOpacity
                            onPress={handleSignOut}
                            className="flex-row items-center p-4 border-b border-gray-100 dark:border-gray-800 active:bg-gray-50 dark:active:bg-gray-800"
                        >
                            <View className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 items-center justify-center mr-3">
                                <LogOut size={16} color="#4B5563" />
                            </View>
                            <Text className="flex-1 text-base font-medium text-gray-900 dark:text-white">ログアウト</Text>
                            <ChevronRight size={20} color="#D1D5DB" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={handleDeleteAccount}
                            className="flex-row items-center p-4 active:bg-red-50 dark:active:bg-red-900/10"
                        >
                            <View className="w-8 h-8 rounded-full bg-red-50 dark:bg-red-900/20 items-center justify-center mr-3">
                                <Trash2 size={16} color="#EF4444" />
                            </View>
                            <Text className="flex-1 text-base font-medium text-red-500">アカウント削除</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="h-8" />
            </ScrollView>
        </SafeAreaView>
    );
}
