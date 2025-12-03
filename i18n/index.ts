import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import ja from './ja.json';
import zh from './zh.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            ja: { translation: ja },
            zh: { translation: zh },
        },
        lng: Localization.getLocales()[0].languageCode ?? 'ja',
        fallbackLng: 'ja',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
