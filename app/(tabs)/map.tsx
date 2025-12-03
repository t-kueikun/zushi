import { DisasterModal } from '@/components/map/DisasterModal';
import { MapComponent } from '@/components/map/MapComponent';
import { AlertTriangle } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

export default function MapScreen() {
    const { t } = useTranslation();
    const [disasterMode, setDisasterMode] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View className="flex-1">
            <MapComponent disasterMode={disasterMode} />

            <View className="absolute top-12 right-4 flex-row gap-2">
                <TouchableOpacity
                    onPress={() => setDisasterMode(!disasterMode)}
                    className={`p-3 rounded-full shadow-lg ${disasterMode ? 'bg-red-500' : 'bg-white dark:bg-gray-800'}`}
                >
                    <AlertTriangle size={24} color={disasterMode ? 'white' : '#EF4444'} />
                </TouchableOpacity>
            </View>

            {disasterMode && (
                <View className="absolute top-12 left-4 bg-red-500 px-4 py-2 rounded-full shadow-lg">
                    <Text className="text-white font-bold">{t('disaster.mode_active')}</Text>
                </View>
            )}

            {disasterMode && (
                <View className="absolute bottom-10 left-4 right-4">
                    <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                        className="bg-red-500 p-4 rounded-xl shadow-lg items-center"
                    >
                        <Text className="text-white font-bold text-lg">{t('disaster.open_info')}</Text>
                    </TouchableOpacity>
                </View>
            )}

            <DisasterModal visible={modalVisible} onClose={() => setModalVisible(false)} />
        </View>
    );
}
