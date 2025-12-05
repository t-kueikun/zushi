import { ExternalLink, Map } from 'lucide-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    disasterMode?: boolean;
}

export function MapComponent({ disasterMode = false }: Props) {
    const { t } = useTranslation();

    const openGoogleMaps = () => {
        Linking.openURL('https://www.google.com/maps/search/?api=1&query=Zushi+City+Hall');
    };

    return (
        <View style={styles.container}>
            <View className="items-center p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-xl max-w-sm w-full mx-4 border border-gray-100 dark:border-gray-800">
                <View className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-full mb-6">
                    <Map size={64} color="#007AFF" />
                </View>

                <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                    {t('map.web_unsupported')}
                </Text>

                <Text className="text-gray-500 dark:text-gray-400 mb-8 text-center leading-6">
                    {t('map.web_message')}
                </Text>

                <TouchableOpacity
                    onPress={openGoogleMaps}
                    className="bg-blue-500 w-full py-4 rounded-xl flex-row items-center justify-center shadow-lg active:opacity-90"
                >
                    <Text className="text-white font-bold text-lg mr-2">{t('map.open_google_maps')}</Text>
                    <ExternalLink size={20} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
