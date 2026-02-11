export interface FeatureItem {
    title: string;
    subtitle: string;
    description: string[];
    img: string; // 建議使用比例一致的佔位圖
}

export interface GroupData {
    title: string;
    features: FeatureItem[];
}