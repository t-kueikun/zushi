export interface News {
    id: string;
    created_at: string;
    title_en: string;
    title_ja: string;
    content_en?: string;
    content_ja?: string;
    category: string;
    date: string;
}
