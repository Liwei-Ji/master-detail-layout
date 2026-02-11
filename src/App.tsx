import { useState, useEffect, useCallback, useRef } from "react";
import { placeholderData as data } from "./data";
import type { FeatureItem } from "./data";

import { CardGroup } from "./components/CardGroup";
import { Sidebar } from "./components/Sidebar";
import { FeatureDetail } from "./components/FeatureDetail";

function App() {
  const [activeId, setActiveId] = useState("");
  const [selectedFeature, setSelectedFeature] = useState<FeatureItem | null>(null);

  // 防止點擊跳轉時引發的滾動偵測衝突
  const isManualScrolling = useRef(false);

  // 核心滾動偵測邏輯：計算每個區塊距離頂部的距離
  const handleScroll = useCallback(() => {
    // 如果在詳細頁面，或正在手動跳轉中，不進行自動偵測
    if (selectedFeature || isManualScrolling.current) return;

    // 抓取所有具備 ID 的 section 標籤
    const sections = document.querySelectorAll("section[id]");
    let currentActive = "";

    // 設定偵測基準線：視窗頂部往下 160px (考慮到 Header 或 padding)
    const detectionLine = 160;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      // 只要區塊的頂部「小於等於」偵測線，就暫時認定它是當前活躍區塊
      if (rect.top <= detectionLine) {
        currentActive = section.id;
      }
    });

    // 特殊處理：當滾動到最上方時，強制選中第一個
    if (window.scrollY < 100) {
      currentActive = sections[0]?.id || "";
    }

    // 特殊處理：當滾動到頁面底部時，選中最後一個
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20) {
      currentActive = sections[sections.length - 1]?.id || "";
    }

    if (currentActive && currentActive !== activeId) {
      setActiveId(currentActive);
    }
  }, [activeId, selectedFeature]);

  // 初始化與滾動監聽
  useEffect(() => {
    // 監聽滾動事件
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 初始化偵測：確保刷新頁面後側邊欄能立刻對應
    const initTimer = setTimeout(() => {
      handleScroll();
    }, 150);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(initTimer);
    };
  }, [handleScroll]);

  // 處理點擊跳轉
  const handleNavigation = (id: string) => {
    setActiveId(id);
    setSelectedFeature(null);

    isManualScrolling.current = true;

    requestAnimationFrame(() => {
      const element = document.getElementById(id);
      if (element) {
        // 使用 smooth 捲動
        element.scrollIntoView({ behavior: "smooth" });

        // 偵測捲動是否停止 (檢查元素是否已到達預定位置)
        const checkStop = setInterval(() => {
          const rect = element.getBoundingClientRect();
          // 28 是 scroll-mt-28 對應的約 112px
          if (Math.abs(rect.top - 112) < 5) {
            isManualScrolling.current = false;
            clearInterval(checkStop);
          }
        }, 100);

        // 安全鎖：0.8秒後無論如何都恢復偵測
        setTimeout(() => { isManualScrolling.current = false; }, 800);
      }
    });
  };

  useEffect(() => {
    if (selectedFeature) {
      // 在資料中尋找這張卡片屬於哪個 Group
      const parentGroup = data.find((group) =>
        group.features.some((f) => f.title === selectedFeature.title)
      );

      if (parentGroup) {
        const slug = parentGroup.title.replace(/\s+/g, "-").toLowerCase();
        // 如果目前的 activeId 不對，就更新它
        if (activeId !== slug) {
          setActiveId(slug);
        }
      }
    }
  }, [selectedFeature, activeId]);

  return (
    <div className="flex bg-gray-50 min-h-screen text-gray-900">
      <Sidebar
        groups={data}
        activeId={activeId}
        onManualActive={handleNavigation}
        brandName="Template"
      />
      <main className="flex-1 md:ml-64 p-4 md:p-12">
        <div className="max-w-5xl mx-auto">
          {selectedFeature ? (
            <FeatureDetail
              feature={selectedFeature}
              onBack={() => setSelectedFeature(null)}
              onNavigate={(f) => setSelectedFeature(f)}
            />
          ) : (
            data.map((group) => (
              <CardGroup
                key={group.title}
                group={group}
                onFeatureClick={setSelectedFeature}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default App;