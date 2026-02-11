import type { FeatureItem } from "../data";

interface FeatureCardProps {
    feature: FeatureItem;
    onClick: () => void;
}

export const FeatureCard = ({ feature, onClick }: FeatureCardProps) => {
    return (
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
};