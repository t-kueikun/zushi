import { useLocalSearchParams, useRouter } from 'expo-router';
import { RefreshCw, Share as ShareIcon, X } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, Share, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

export default function BrowserScreen() {
    const { url, title } = useLocalSearchParams<{ url: string; title: string }>();
    const router = useRouter();
    const webViewRef = React.useRef<WebView>(null);

    const handleShare = async () => {
        try {
            await Share.share({
                message: url,
            });
        } catch (error) {
            console.error(error);
        }
    };

    if (!url) {
        return (
            <SafeAreaView className="flex-1 bg-white dark:bg-black items-center justify-center">
                <Text className="text-red-500">Invalid URL</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-black" edges={['top']}>
            <View className="flex-row items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                <TouchableOpacity onPress={() => router.back()} className="p-2">
                    <X size={24} color="#4B5563" />
                </TouchableOpacity>
                <Text className="font-bold text-gray-900 dark:text-white flex-1 text-center" numberOfLines={1}>
                    {title || 'Browser'}
                </Text>
                <View className="flex-row gap-2">
                    <TouchableOpacity onPress={() => webViewRef.current?.reload()} className="p-2">
                        <RefreshCw size={20} color="#4B5563" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleShare} className="p-2">
                        <ShareIcon size={20} color="#4B5563" />
                    </TouchableOpacity>
                </View>
            </View>
            <WebView
                ref={webViewRef}
                source={{ uri: url }}
                startInLoadingState
                renderLoading={() => (
                    <View className="absolute inset-0 items-center justify-center bg-white dark:bg-gray-900">
                        <ActivityIndicator size="large" color="#007AFF" />
                    </View>
                )}
            />
        </SafeAreaView>
    );
}
