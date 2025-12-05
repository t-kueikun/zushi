import { useRouter } from 'expo-router';
import { Bell, ChevronRight, Database, FileText, Globe, HelpCircle, Info, Mail, Moon, Shield, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActionSheetIOS, Platform, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

export default function SettingsScreen() {
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'ja' : 'en';
        i18n.changeLanguage(newLang);
    };

    const handleThemeChange = () => {
        const options = ['Light', 'Dark', 'System', 'Cancel'];
        const cancelButtonIndex = 3;

        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options,
                    cancelButtonIndex,
                    title: t('settings.theme'),
                },
                (buttonIndex) => {
                    if (buttonIndex === 0) setTheme('light');
                    if (buttonIndex === 1) setTheme('dark');
                    if (buttonIndex === 2) setTheme('system');
                }
            );
        } else {
            // Simple cycle for Android/Web for now, or custom modal
            if (theme === 'system') setTheme('light');
            else if (theme === 'light') setTheme('dark');
            else setTheme('system');
        }
    };

    const getThemeLabel = () => {
        if (theme === 'system') return 'System';
        if (theme === 'light') return 'Light';
        if (theme === 'dark') return 'Dark';
        return 'System';
    };

    const SettingItem = ({ icon, label, value, onPress, isSwitch, switchValue, onSwitchChange }: any) => (
        <TouchableOpacity
            onPress={onPress}
            disabled={isSwitch}
            className="flex-row items-center p-4 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 last:border-0"
        >
            <View className="bg-gray-50 dark:bg-gray-800 p-2 rounded-lg mr-3">
                {icon}
            </View>
            <Text className="flex-1 text-base font-medium text-gray-900 dark:text-white">{label}</Text>
            {isSwitch ? (
                <Switch value={switchValue} onValueChange={onSwitchChange} />
            ) : (
                <View className="flex-row items-center">
                    {value && <Text className="text-gray-500 dark:text-gray-400 mr-2">{value}</Text>}
                    <ChevronRight size={20} color="#9CA3AF" />
                </View>
            )}
        </TouchableOpacity>
    );

    const Section = ({ title, children }: any) => (
        <View className="mb-6">
            <Text className="text-sm font-bold text-gray-500 uppercase mb-2 ml-4">{title}</Text>
            <View className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm">
                {children}
            </View>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-black">
            <View className="px-4 py-3 flex-row items-center border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="p-2 -ml-2 rounded-full active:bg-gray-100 dark:active:bg-gray-800"
                >
                    <ChevronRight size={24} color="#000" className="rotate-180" style={{ transform: [{ rotate: '180deg' }] }} />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-gray-900 dark:text-white ml-2">{t('menu.settings_title')}</Text>
            </View>
            <ScrollView contentContainerStyle={{ padding: 16 }}>

                <Section title={t('settings.account')}>
                    <SettingItem
                        icon={<User size={20} color="#3B82F6" />}
                        label={t('settings.account')}
                        onPress={() => router.push('/profile')}
                    />
                </Section>

                <Section title={t('settings.general')}>
                    <SettingItem
                        icon={<Globe size={20} color="#10B981" />}
                        label={t('settings.language')}
                        value={i18n.language === 'en' ? 'English' : '日本語'}
                        onPress={toggleLanguage}
                    />
                    <SettingItem
                        icon={<Moon size={20} color="#8B5CF6" />}
                        label={t('settings.theme')}
                        value={getThemeLabel()}
                        onPress={handleThemeChange}
                    />
                    <SettingItem
                        icon={<Bell size={20} color="#F59E0B" />}
                        label={t('settings.notifications')}
                        isSwitch
                        switchValue={notificationsEnabled}
                        onSwitchChange={setNotificationsEnabled}
                    />
                </Section>

                <Section title={t('settings.support')}>
                    <SettingItem
                        icon={<HelpCircle size={20} color="#EC4899" />}
                        label={t('settings.help_faq')}
                        onPress={() => router.push('/help')}
                    />
                    <SettingItem
                        icon={<Mail size={20} color="#3B82F6" />}
                        label={t('settings.contact')}
                        onPress={() => { }}
                    />
                </Section>

                <Section title={t('settings.legal')}>
                    <SettingItem
                        icon={<FileText size={20} color="#6B7280" />}
                        label={t('settings.terms')}
                        onPress={() => { }}
                    />
                    <SettingItem
                        icon={<Shield size={20} color="#6B7280" />}
                        label={t('settings.privacy')}
                        onPress={() => { }}
                    />
                </Section>

                <Section title={t('settings.data')}>
                    <SettingItem
                        icon={<Database size={20} color="#EF4444" />}
                        label={t('settings.clear_cache')}
                        onPress={() => { }}
                    />
                </Section>

                <Section title={t('settings.about')}>
                    <SettingItem
                        icon={<Info size={20} color="#6B7280" />}
                        label={t('settings.version')}
                        value="1.0.0"
                        onPress={() => { }}
                    />
                </Section>
            </ScrollView>
        </SafeAreaView>
    );
}
