import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { ArrowRight, Lock, Mail, User } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';

const ACCOUNT_CREATED_KEY = 'has_created_zushi_account';

export default function SignUpScreen() {
    const { t, i18n } = useTranslation();
    const router = useRouter();

    // Wizard State
    const [currentStep, setCurrentStep] = useState(0);
    const totalSteps = 7; // Language, Resident, Location, Display Name, Email, OTP, Password

    // Form State
    const [language, setLanguage] = useState<'ja' | 'en'>('ja');
    const [isResident, setIsResident] = useState(true);
    const [district, setDistrict] = useState('hisagi');
    const [prefecture, setPrefecture] = useState('Kanagawa');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [restrictionChecked, setRestrictionChecked] = useState(false);
    const [isRestricted, setIsRestricted] = useState(false);

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

    // Prefecture Options
    const prefectures = [
        { label: '神奈川県 (Kanagawa)', value: 'Kanagawa' },
        { label: '東京都 (Tokyo)', value: 'Tokyo' },
        { label: '埼玉県 (Saitama)', value: 'Saitama' },
        { label: '千葉県 (Chiba)', value: 'Chiba' },
        { label: 'その他 (Other)', value: 'Other' },
        { label: '国外 (Outside Japan)', value: 'Outside Japan' },
    ];

    useEffect(() => {
        checkDeviceRestriction();
    }, []);

    const checkDeviceRestriction = async () => {
        try {
            const hasCreated = await SecureStore.getItemAsync(ACCOUNT_CREATED_KEY);
            if (hasCreated) {
                setIsRestricted(true);
            }
        } catch (error) {
            console.error('Error checking device restriction:', error);
        } finally {
            setRestrictionChecked(true);
        }
    };

    const resetRestriction = async () => {
        await SecureStore.deleteItemAsync(ACCOUNT_CREATED_KEY);
        setIsRestricted(false);
        Alert.alert("完了", "端末制限を解除しました。");
    };

    const handleNext = async () => {
        // Validation per step
        if (currentStep === 3) { // Display Name Step
            if (!fullName.trim()) {
                Alert.alert(t('auth.error'), "表示名を入力してください");
                return;
            }
        }

        if (currentStep === 4) { // Email Step
            if (!email) {
                Alert.alert(t('auth.error'), t('auth.fill_all'));
                return;
            }
            await sendOtp();
            return;
        }

        if (currentStep === 5) { // OTP Step
            if (!otp || otp.length < 6) {
                Alert.alert(t('auth.error'), "認証コードを入力してください");
                return;
            }
            await verifyOtp();
            return;
        }

        if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleFinalize();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        } else {
            router.back();
        }
    };

    // Step 4 Action: Send OTP (Email)
    const sendOtp = async () => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    data: {
                        full_name: fullName,
                        language,
                        is_resident: isResident,
                        district: isResident ? district : null,
                        prefecture: !isResident ? prefecture : null,
                    }
                }
            });

            if (error) throw error;

            Alert.alert("確認", "認証コードをメールで送信しました");
            setCurrentStep(currentStep + 1); // Move to OTP step
        } catch (error: any) {
            Alert.alert(t('auth.error'), error.message);
        } finally {
            setLoading(false);
        }
    };

    // Step 5 Action: Verify OTP
    const verifyOtp = async () => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.verifyOtp({
                email,
                token: otp,
                type: 'magiclink',
            });

            if (error) throw error;

            // Success: User is now logged in (passwordless state)
            setCurrentStep(currentStep + 1); // Move to Password step
        } catch (error: any) {
            Alert.alert(t('auth.error'), "認証コードが正しくありません");
        } finally {
            setLoading(false);
        }
    };

    // Final Step: Set Password
    const handleFinalize = async () => {
        if (!password || !confirmPassword) {
            Alert.alert(t('auth.error'), t('auth.fill_all'));
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert(t('auth.error'), t('auth.password_mismatch'));
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase.auth.updateUser({
                password
            });

            if (error) throw error;

            // Mark device as having created an account
            await SecureStore.setItemAsync(ACCOUNT_CREATED_KEY, 'true');

            Alert.alert(t('auth.success'), "アカウント登録が完了しました！");
            router.replace('/(tabs)');

        } catch (error: any) {
            Alert.alert(t('auth.error'), error.message);
        } finally {
            setLoading(false);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0: // Language
                return (
                    <View>
                        <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('auth.language')}</Text>
                        <View className="gap-3">
                            <TouchableOpacity
                                onPress={() => setLanguage('ja')}
                                className={`p-4 rounded-xl border-2 ${language === 'ja' ? 'bg-blue-50 border-blue-500' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800'}`}
                            >
                                <Text className={`text-center font-bold text-lg ${language === 'ja' ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400'}`}>日本語</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setLanguage('en')}
                                className={`p-4 rounded-xl border-2 ${language === 'en' ? 'bg-blue-50 border-blue-500' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800'}`}
                            >
                                <Text className={`text-center font-bold text-lg ${language === 'en' ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400'}`}>English</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            case 1: // Resident Status
                return (
                    <View>
                        <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('auth.is_resident')}</Text>
                        <View className="gap-3 mb-6">
                            <TouchableOpacity
                                onPress={() => setIsResident(true)}
                                className={`p-4 rounded-xl border-2 ${isResident ? 'bg-blue-50 border-blue-500' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800'}`}
                            >
                                <Text className={`text-center font-bold text-lg ${isResident ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400'}`}>{t('auth.resident_yes')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setIsResident(false)}
                                className={`p-4 rounded-xl border-2 ${!isResident ? 'bg-blue-50 border-blue-500' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800'}`}
                            >
                                <Text className={`text-center font-bold text-lg ${!isResident ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400'}`}>{t('auth.resident_no')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            case 2: // Location (District or Prefecture)
                return (
                    <View>
                        <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            {isResident ? t('auth.district') : 'お住まいの地域 (Location)'}
                        </Text>

                        {isResident ? (
                            <View className="flex-row flex-wrap gap-2">
                                {districts.map((d) => (
                                    <TouchableOpacity
                                        key={d.value}
                                        onPress={() => setDistrict(d.value)}
                                        className={`px-4 py-3 rounded-full border ${district === d.value ? 'bg-blue-500 border-blue-500' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700'}`}
                                    >
                                        <Text className={`font-medium ${district === d.value ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                                            {d.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ) : (
                            <View className="gap-2">
                                {prefectures.map((p) => (
                                    <TouchableOpacity
                                        key={p.value}
                                        onPress={() => setPrefecture(p.value)}
                                        className={`p-4 rounded-xl border ${prefecture === p.value ? 'bg-blue-500 border-blue-500' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700'}`}
                                    >
                                        <Text className={`font-medium text-lg ${prefecture === p.value ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                                            {p.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                );
            case 3: // Display Name
                return (
                    <View>
                        <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('auth.display_name')}</Text>
                        <View className="flex-row items-center bg-gray-100 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
                            <User color="#9CA3AF" size={24} />
                            <TextInput
                                placeholder="例: 逗子 太郎"
                                placeholderTextColor="#9CA3AF"
                                className="flex-1 ml-3 text-gray-900 dark:text-white text-xl p-0 -mt-3"
                                value={fullName}
                                onChangeText={setFullName}
                                autoFocus
                            />
                        </View>
                        <Text className="text-gray-500 text-sm mt-2">※ アプリ内で表示される名前です（後で変更可能）</Text>
                    </View>
                );
            case 4: // Email
                return (
                    <View>
                        <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('auth.email')}</Text>
                        <View className="flex-row items-center bg-gray-100 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
                            <Mail color="#9CA3AF" size={24} />
                            <TextInput
                                placeholder="name@example.com"
                                placeholderTextColor="#9CA3AF"
                                className="flex-1 ml-3 text-gray-900 dark:text-white text-xl p-0 -mt-3"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                value={email}
                                onChangeText={setEmail}
                                autoFocus
                            />
                        </View>
                        <Text className="text-gray-500 text-sm mt-2">※ 認証コードを送信します</Text>
                    </View>
                );
            case 5: // OTP
                return (
                    <View>
                        <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">認証コード入力</Text>
                        <Text className="text-gray-500 dark:text-gray-400 mb-4">{email} に送信された認証コードを入力してください</Text>
                        <View className="h-16 flex-row items-center bg-gray-100 dark:bg-gray-900 px-4 rounded-xl border border-gray-200 dark:border-gray-800">
                            <Lock color="#9CA3AF" size={24} />
                            <TextInput
                                placeholder="12345678"
                                placeholderTextColor="#9CA3AF"
                                className="flex-1 ml-3 text-gray-900 dark:text-white text-xl tracking-widest h-full"
                                keyboardType="number-pad"
                                maxLength={8}
                                value={otp}
                                onChangeText={setOtp}
                                autoFocus
                            />
                        </View>
                    </View>
                );
            case 6: // Password
                return (
                    <View>
                        <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('auth.password')}</Text>
                        <View className="space-y-4">
                            <View className="flex-row items-center bg-gray-100 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
                                <Lock color="#9CA3AF" size={24} />
                                <TextInput
                                    placeholder={t('auth.password')}
                                    placeholderTextColor="#9CA3AF"
                                    className="flex-1 ml-3 text-gray-900 dark:text-white text-xl p-0 -mt-3"
                                    secureTextEntry
                                    value={password}
                                    onChangeText={setPassword}
                                    autoFocus
                                />
                            </View>
                            <View className="flex-row items-center bg-gray-100 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
                                <Lock color="#9CA3AF" size={24} />
                                <TextInput
                                    placeholder={t('auth.confirm_password')}
                                    placeholderTextColor="#9CA3AF"
                                    className="flex-1 ml-3 text-gray-900 dark:text-white text-xl p-0 -mt-3"
                                    secureTextEntry
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                />
                            </View>
                        </View>
                    </View>
                );
            default:
                return null;
        }
    };

    if (!restrictionChecked) {
        return (
            <View className="flex-1 justify-center items-center bg-white dark:bg-black">
                <ActivityIndicator size="large" color="#3B82F6" />
            </View>
        );
    }

    if (isRestricted) {
        return (
            <View className="flex-1 justify-center items-center bg-white dark:bg-black p-6">
                <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                    制限されています
                </Text>
                <Text className="text-gray-500 dark:text-gray-400 mb-8 text-center">
                    この端末では既にアカウントが作成されています。
                </Text>
                <TouchableOpacity
                    onPress={() => router.replace('/auth/login')}
                    className="bg-blue-500 px-6 py-3 rounded-full mb-4 w-full"
                >
                    <Text className="text-white font-bold text-center">ログイン画面へ</Text>
                </TouchableOpacity>

                {/* Debug Button */}
                <TouchableOpacity
                    onPress={resetRestriction}
                    className="bg-gray-200 dark:bg-gray-800 px-6 py-3 rounded-full w-full"
                >
                    <Text className="text-gray-700 dark:text-gray-300 font-bold text-center">【開発用】制限を解除する</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-black">
            <View className="flex-1 px-6 pt-8">
                {/* Progress Bar */}
                <View className="flex-row mb-8 gap-2">
                    {[...Array(totalSteps)].map((_, i) => (
                        <View
                            key={i}
                            className={`h-1 flex-1 rounded-full ${i <= currentStep ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-800'}`}
                        />
                    ))}
                </View>

                {/* Header */}
                <View className="mb-8">
                    <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('auth.create_account')}</Text>
                    <Text className="text-gray-500 dark:text-gray-400">Step {currentStep + 1} of {totalSteps}</Text>
                </View>

                {/* Step Content */}
                <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
                    {renderStep()}
                </ScrollView>

                {/* Navigation Buttons */}
                <View className="py-6 gap-3">
                    <TouchableOpacity
                        onPress={handleNext}
                        disabled={loading}
                        className="bg-blue-500 p-4 rounded-xl flex-row justify-center items-center shadow-md shadow-blue-500/30"
                    >
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <>
                                <Text className="text-white font-bold text-lg mr-2">
                                    {currentStep === totalSteps - 1 ? t('auth.signup') : '次へ'}
                                </Text>
                                <ArrowRight color="white" size={20} />
                            </>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleBack}
                        disabled={loading}
                        className="p-4 rounded-xl flex-row justify-center items-center"
                    >
                        <Text className="text-gray-500 font-bold text-lg">{currentStep === 0 ? 'キャンセル' : '戻る'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
