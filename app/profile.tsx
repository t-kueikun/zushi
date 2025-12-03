import { useRouter } from 'expo-router';
import { LogOut, User } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
    const { user, signOut } = useAuth();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        router.replace('/auth/login');
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-black p-6">
            <View className="items-center mb-8 mt-4">
                <View className="bg-blue-100 dark:bg-blue-900 p-6 rounded-full mb-4">
                    <User size={48} color="#007AFF" />
                </View>
                <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                    {user?.email || 'Guest User'}
                </Text>
                <Text className="text-gray-500 dark:text-gray-400">Zushi Citizen</Text>
            </View>

            <View className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm">
                <Text className="text-sm font-bold text-gray-500 uppercase mb-4">Account</Text>

                <TouchableOpacity
                    onPress={handleSignOut}
                    className="flex-row items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-xl"
                >
                    <LogOut size={20} color="#EF4444" />
                    <Text className="ml-3 text-red-500 font-bold text-base">Sign Out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
