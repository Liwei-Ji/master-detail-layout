// 定義資料介面
export interface FeatureItem {
    title: string;
    subtitle: string;
    description: string[];
    img: string;
}

export interface GroupData {
    title: string;
    features: FeatureItem[];
}

// 預設佔位資料
export const placeholderData: GroupData[] = [
    {
        title: "Getting Started",
        features: [
            {
                title: "Template Overview",
                subtitle: "A professional starting point for your next design project.",
                description: [
                    "This is a sample description paragraph. It explains how the layout works and how the content is presented to the user.",
                    "You can add as many paragraphs as you like, and the detail view will automatically adjust to fit the text."
                ],
                img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
            },
            {
                title: "Visual Hierarchy",
                subtitle: "Understanding grids, spacing, and typography in this UI.",
                description: [
                    "The grid system uses a two-column layout on large screens for maximum clarity.",
                    "The typography is set to be highly readable with a focus on bold headlines."
                ],
                img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&w=800&q=80"
            }
        ]
    },
    {
        title: "Core Assets",
        features: [
            {
                title: "Interface Modules",
                subtitle: "Pre-built components ready for production use.",
                description: ["Everything is responsive and optimized for mobile, tablet, and desktop views."],
                img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80"
            }
        ]
    }
];