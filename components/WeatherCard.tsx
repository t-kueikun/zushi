import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, CloudSun, Sun } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Text, View } from 'react-native';

type WeatherData = {
    current_weather: {
        temperature: number;
        weathercode: number;
    };
};

export default function WeatherCard() {
    const { t } = useTranslation();
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    'https://api.open-meteo.com/v1/forecast?latitude=35.2955&longitude=139.5805&current_weather=true'
                );
                const data = await response.json();
                setWeather(data);
            } catch (error) {
                console.error('Error fetching weather:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    const getWeatherIcon = (code: number) => {
        if (code === 0) return <Sun size={32} color="white" />;
        if (code >= 1 && code <= 3) return <CloudSun size={32} color="white" />;
        if (code >= 45 && code <= 48) return <CloudFog size={32} color="white" />;
        if (code >= 51 && code <= 57) return <CloudDrizzle size={32} color="white" />;
        if (code >= 61 && code <= 67) return <CloudRain size={32} color="white" />;
        if (code >= 71 && code <= 77) return <CloudSnow size={32} color="white" />;
        if (code >= 80 && code <= 82) return <CloudRain size={32} color="white" />;
        if (code >= 85 && code <= 86) return <CloudSnow size={32} color="white" />;
        if (code >= 95 && code <= 99) return <CloudLightning size={32} color="white" />;
        return <Cloud size={32} color="white" />;
    };

    const getWeatherLabel = (code: number) => {
        if (code === 0) return t('weather.sunny', 'Sunny');
        if (code >= 1 && code <= 3) return t('weather.cloudy', 'Cloudy');
        if (code >= 45 && code <= 48) return t('weather.fog', 'Fog');
        if (code >= 51 && code <= 67) return t('weather.rain', 'Rain');
        if (code >= 71 && code <= 77) return t('weather.snow', 'Snow');
        if (code >= 80 && code <= 82) return t('weather.rain', 'Rain');
        if (code >= 85 && code <= 86) return t('weather.snow', 'Snow');
        if (code >= 95 && code <= 99) return t('weather.thunderstorm', 'Thunderstorm');
        return t('weather.unknown', 'Unknown');
    };

    if (loading) {
        return (
            <View className="flex-row items-center bg-white/10 p-4 rounded-2xl backdrop-blur-md self-start border border-white/20 min-w-[150px] justify-center">
                <ActivityIndicator size="small" color="white" />
            </View>
        );
    }

    if (!weather) return null;

    return (
        <View className="flex-row items-center bg-white/10 p-4 rounded-2xl backdrop-blur-md self-start border border-white/20">
            {getWeatherIcon(weather.current_weather.weathercode)}
            <View className="ml-3">
                <Text className="text-white font-bold text-xl">
                    {Math.round(weather.current_weather.temperature)}°C
                </Text>
                <Text className="text-white/80 text-xs">
                    {getWeatherLabel(weather.current_weather.weathercode)} • {t('weather.zushi_city', 'Zushi')}
                </Text>
            </View>
        </View>
    );
}
