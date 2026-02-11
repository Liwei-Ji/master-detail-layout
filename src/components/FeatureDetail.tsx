import { useEffect, useMemo } from "react";
// 引入資料與類型定義
import { placeholderData } from "../data";
import type { FeatureItem, GroupData } from "../data";
// 引入圖示庫 (確保已安裝 lucide-react)
import { ArrowLeft, ChevronLeft, ChevronRight, List } from "lucide-react";

interface Props {
    feature: FeatureItem;
    onBack: () => void;
    onNavigate: (feature: FeatureItem) => void;
}

export const FeatureDetail = ({ feature, onBack, onNavigate }: Props) => {
    // 將所有分組中的 features 攤平，方便計算前後順序
    const allFeatures = useMemo(() => {
        return placeholderData.flatMap((group: GroupData) => group.features || []);
    }, []);

    // 找到目前卡片在陣列中的位置
    const currentIndex = allFeatures.findIndex((f: FeatureItem) => f.title === feature.title);
    const prevFeature = allFeatures[currentIndex - 1];
    const nextFeature = allFeatures[currentIndex + 1];

    // 當切換內容時，強制滾動到頂部
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant",
        });
    }, [feature]);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 min-h-screen">
            {/* 頂部返回導航 */}
            <nav className="sticky top-0 z-20 py-4 bg-gray-50/90 backdrop-blur-md mb-8">
                <button
                    onClick={onBack}
                    className="group flex items-center gap-3 text-sm font-bold text-gray-500 hover:text-indigo-600 transition-all"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm group-hover:border-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        <ArrowLeft size={16} />
                    </div>
                    <span>Back to Overview</span>
                </button>
            </nav>

            {/* 內容佈局 */}
            <div className="flex flex-col space-y-12">
                {/* 文字說明區 */}
                <div className="space-y-8 max-w-3xl">
                    <header>
                        <h1 className="text-5xl font-black text-gray-900 mb-6 leading-[1.1] tracking-tight">
                            {feature.title}
                        </h1>
                        <p className="text-xl text-gray-500 font-medium leading-relaxed">
                            {feature.subtitle}
                        </p>
                    </header>

                    <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                        {feature.description && feature.description.length > 0 ? (
                            feature.description.map((desc: string, index: number) => (
                                <p key={index}>{desc}</p>
                            ))
                        ) : (
                            <p>No additional details provided for this section.</p>
                        )}
                    </div>
                </div>

                {/* 預覽區 (顯示圖片) */}
                {/* border-2 邊框粗細 2px,  */}
                {/* border-dashed 邊框樣式為虛線 */}
                {/* border-gray-300 邊框顏色為灰色 */}
                {/* rounded-[2rem] 邊框圓角為 2rem */}
                {/* min-h-[400px] 最小高度為 400px */}
                {/* flex items-center justify-center 內容置中 */}
                {/* bg-white 背景顏色為白色 */}
                {/* shadow-inner 內陰影 */}
                {/* overflow-hidden 溢出內容隱藏 */}
                <div className="lg:sticky lg:top-24 space-y-6">
                    <div className="border-gray-300 rounded-[2rem] min-h-[400px] flex items-center justify-center ">
                        <img
                            src={feature.img}
                            alt={feature.title}
                            className="max-h-[350px] w-full object-contain drop-shadow-2xl p-8"
                        />
                    </div>

                    {/* 底部前後切換按鈕區 */}
                    <div className="grid grid-cols-2 gap-4 pt-6">
                        {/* 左側：如果是第一張則顯示返回列表，否則顯示上一張 */}
                        {currentIndex === 0 ? (
                            <button
                                onClick={onBack}
                                className="flex items-center gap-4 p-5 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all group shadow-sm"
                            >
                                <List className="text-gray-400 group-hover:text-gray-900" size={20} />
                                <div className="text-left">
                                    <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Return</div>
                                    <div className="text-sm font-bold text-gray-900">Overview</div>
                                </div>
                            </button>
                        ) : (
                            <button
                                onClick={() => onNavigate(prevFeature)}
                                className="flex items-center gap-4 p-5 rounded-2xl border border-gray-200 bg-white hover:border-indigo-200 hover:bg-indigo-50 transition-all group shadow-sm"
                            >
                                <ChevronLeft className="text-gray-400 group-hover:text-indigo-600" size={20} />
                                <div className="text-left">
                                    <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Previous</div>
                                    <div className="text-sm font-bold text-gray-900">{prevFeature.title}</div>
                                </div>
                            </button>
                        )}

                        {/* 右側：如果有下一張就顯示，否則留空 */}
                        {nextFeature ? (
                            <button
                                onClick={() => onNavigate(nextFeature)}
                                className="flex items-center justify-end gap-4 p-5 rounded-2xl border border-gray-200 bg-white hover:border-indigo-200 hover:bg-indigo-50 transition-all group shadow-sm text-right"
                            >
                                <div className="text-right">
                                    <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Next</div>
                                    <div className="text-sm font-bold text-gray-900">{nextFeature.title}</div>
                                </div>
                                <ChevronRight className="text-gray-400 group-hover:text-indigo-600" size={20} />
                            </button>
                        ) : (
                            <div /> /* 佔位用 */
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};