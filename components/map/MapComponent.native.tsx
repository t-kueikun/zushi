import facilitiesData from '@/data/facilities.json';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_DEFAULT } from 'react-native-maps';

interface Props {
    disasterMode?: boolean;
}

interface Facility {
    id: string;
    name: string;
    name_ja: string;
    type: string;
    latitude: number;
    longitude: number;
    address: string;
}

export function MapComponent({ disasterMode = false }: Props) {
    const { t, i18n } = useTranslation();
    const isJa = i18n.language === 'ja';

    const [region, setRegion] = useState({
        latitude: 35.2965,
        longitude: 139.5786,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    });

    const getPinColor = (type: string) => {
        switch (type) {
            case 'public': return 'blue';
            case 'shelter': return 'red';
            case 'park': return 'green';
            case 'transport': return 'orange';
            default: return 'gray';
        }
    };

    const displayedFacilities = disasterMode
        ? facilitiesData.facilities.filter((f: Facility) => f.type === 'shelter')
        : facilitiesData.facilities;

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_DEFAULT}
                initialRegion={region}
                showsUserLocation={true}
                showsMyLocationButton={true}
            >
                {displayedFacilities.map((facility: Facility) => (
                    <Marker
                        key={facility.id}
                        coordinate={{
                            latitude: facility.latitude,
                            longitude: facility.longitude,
                        }}
                        pinColor={getPinColor(facility.type)}
                    >
                        <Callout tooltip>
                            <View className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 w-48">
                                <Text className="font-bold text-base mb-1 text-gray-900 dark:text-white">
                                    {isJa ? facility.name_ja : facility.name}
                                </Text>
                                <View className="bg-gray-100 dark:bg-gray-700 self-start px-2 py-1 rounded-md mb-2">
                                    <Text className="text-xs font-medium text-gray-600 dark:text-gray-300 uppercase">
                                        {facility.type}
                                    </Text>
                                </View>
                                <Text className="text-xs text-gray-500 dark:text-gray-400">
                                    {facility.address}
                                </Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>

            {!disasterMode && (
                <View className="absolute bottom-8 left-4 right-4 bg-white/95 dark:bg-gray-900/95 p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 backdrop-blur-md">
                    <Text className="font-bold mb-3 text-gray-800 dark:text-white text-sm uppercase tracking-wider">{t('map.legend')}</Text>
                    <View className="flex-row flex-wrap gap-4">
                        <View className="flex-row items-center">
                            <View className="w-3 h-3 rounded-full bg-blue-500 mr-2 shadow-sm" />
                            <Text className="text-sm font-medium text-gray-600 dark:text-gray-300">{t('map.public')}</Text>
                        </View>
                        <View className="flex-row items-center">
                            <View className="w-3 h-3 rounded-full bg-red-500 mr-2 shadow-sm" />
                            <Text className="text-sm font-medium text-gray-600 dark:text-gray-300">{t('map.shelter')}</Text>
                        </View>
                        <View className="flex-row items-center">
                            <View className="w-3 h-3 rounded-full bg-green-500 mr-2 shadow-sm" />
                            <Text className="text-sm font-medium text-gray-600 dark:text-gray-300">{t('map.park')}</Text>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
