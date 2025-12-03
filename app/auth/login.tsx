import { useRouter } from 'expo-router';
import { ArrowRight, Lock, Mail } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            Alert.alert('Error', error.message);
        } else {
            router.replace('/(tabs)');
        }
        setLoading(false);
    };

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-black p-6 justify-center">
            <View className="mb-10">
                <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</Text>
                <Text className="text-gray-500 dark:text-gray-400">Sign in to continue</Text>
            </View>

            <View className="space-y-4">
                <View className="flex-row items-center bg-gray-100 dark:bg-gray-900 p-4 rounded-xl mb-4">
                    <Mail color="#9CA3AF" size={20} />
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#9CA3AF"
                        className="flex-1 ml-3 text-gray-900 dark:text-white text-base"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <View className="flex-row items-center bg-gray-100 dark:bg-gray-900 p-4 rounded-xl mb-6">
                    <Lock color="#9CA3AF" size={20} />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#9CA3AF"
                        className="flex-1 ml-3 text-gray-900 dark:text-white text-base"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                <TouchableOpacity
                    onPress={handleLogin}
                    disabled={loading}
                    className="bg-blue-500 p-4 rounded-xl flex-row justify-center items-center shadow-md shadow-blue-500/30"
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <>
                            <Text className="text-white font-bold text-lg mr-2">Log In</Text>
                            <ArrowRight color="white" size={20} />
                        </>
                    )}
                </TouchableOpacity>
            </View>

            <View className="flex-row justify-center mt-8">
                <Text className="text-gray-500 dark:text-gray-400">Don't have an account? </Text>
                <TouchableOpacity onPress={() => router.push('/auth/signup')}>
                    <Text className="text-blue-500 font-bold">Sign Up</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
