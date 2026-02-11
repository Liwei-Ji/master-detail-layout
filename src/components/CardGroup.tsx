import type { GroupData, FeatureItem } from "../data";

// 內置 FeatureCard 以減少檔案數量，方便複用
const FeatureCard = ({ feature, onClick }: { feature: FeatureItem; onClick: () => void }) => (
    <div
        role="button"
        onClick={onClick}
        className="group cursor-pointer flex flex-col items-center rounded-3xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-indigo-200 h-full"
    >
        <div className="mb-6 h-64 w-full overflow-hidden rounded-2xl bg-gray-50 relative">
            <img
                src={feature.img}
                alt={feature.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
        </div>
        <div className="w-full text-left">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
                {feature.subtitle}
            </p>
        </div>
    </div>
);

export const CardGroup = ({ group, onFeatureClick }: { group: GroupData; onFeatureClick: (f: FeatureItem) => void }) => {
    const slug = group.title.replace(/\s+/g, "-").toLowerCase();

    return (
        <section id={slug} className="scroll-mt-28 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 min-h-[40vh]">
            <div className="flex items-center gap-3 mb-8">
                <div className="h-6 w-1 rounded-full bg-indigo-500" />
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{group.title}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                {group.features.map((feature) => (
                    <FeatureCard key={feature.title} feature={feature} onClick={() => onFeatureClick(feature)} />
                ))}
            </div>
        </section>
    );
};