import type { GroupData } from "../data";

interface SidebarProps {
    groups: GroupData[];
    activeId: string;
    onManualActive: (id: string) => void;
    brandName?: string;
}

export const Sidebar = ({ groups, activeId, onManualActive, brandName = "Template" }: SidebarProps) => {
    const getSlug = (title: string) => title.replace(/\s+/g, "-").toLowerCase();

    return (
        <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 flex-col bg-white overflow-y-auto z-50">
            <div className="p-8 pb-0">
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                    {brandName}
                </h1>
            </div>

            <nav className="flex-1 px-4 space-y-1 pb-8 mt-20">
                {groups.map((group) => {
                    const slug = getSlug(group.title);
                    const isActive = activeId === slug;

                    return (
                        <a
                            key={group.title}
                            href={`#${slug}`}
                            onClick={(e) => {
                                e.preventDefault();
                                onManualActive(slug);
                            }}
                            className={`group flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${isActive
                                ? "bg-indigo-50 text-indigo-700 shadow-sm"
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <span>{group.title}</span>
                        </a>
                    );
                })}
            </nav>
        </aside>
    );
};