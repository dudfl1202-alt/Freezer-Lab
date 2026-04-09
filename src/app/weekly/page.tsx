"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/layout/header";
import BottomNav from "@/components/layout/bottom-nav";
import { weeklyPlans } from "@/data/weekly-plans";
import { formatPrice, formatTime } from "@/lib/utils";
import { Recipe } from "@/types";

export default function WeeklyPage() {
  const [selectedId, setSelectedId] = useState(weeklyPlans[0]?.id);
  const [recipesMap, setRecipesMap] = useState<Record<string, Recipe>>({});

  useEffect(() => {
    import("@/data/recipes").then(m => {
      const map: Record<string, Recipe> = {};
      m.recipes.forEach((r: Recipe) => { map[r.id] = r; });
      setRecipesMap(map);
    });
  }, []);

  const plan = weeklyPlans.find(p => p.id === selectedId);

  const recipeIds = useMemo(() => {
    if (!plan) return [];
    const ids = new Set<string>();
    plan.prepDay.tasks.forEach(t => ids.add(t.recipeId));
    return Array.from(ids);
  }, [plan]);

  const totalPacks = useMemo(
    () => recipeIds.reduce((s, id) => s + (recipesMap[id]?.portionsYield ?? 0), 0),
    [recipeIds, recipesMap]
  );

  return (
    <>
      <Header />
      <main className="max-w-lg mx-auto px-5 pt-5 pb-24">
        <h1 className="text-[18px] font-extrabold tracking-tight text-t mb-0.5">냉동 밀프랩</h1>
        <p className="text-[13px] text-t-sub mb-5">한 번 만들고 냉동실에 쌓아두세요</p>

        {/* 플랜 탭 */}
        <div className="flex border-b border-line mb-5">
          {weeklyPlans.map(p => (
            <button key={p.id} onClick={() => setSelectedId(p.id)}
              className={selectedId === p.id
                ? "flex-1 py-3 text-[14px] font-bold text-main border-b-2 border-main transition-colors"
                : "flex-1 py-3 text-[14px] font-medium text-t-caption transition-colors"
              }>{p.title}</button>
          ))}
        </div>

        {plan && (
          <div className="space-y-4 animate-fade-in">
            {/* 통계 */}
            <div className="bg-surface rounded-xl shadow-sm p-5">
              <p className="text-[13px] text-t-sub mb-4">{plan.description}</p>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <p className="text-[20px] font-extrabold text-main tracking-tight">{formatPrice(plan.totalCost)}</p>
                  <p className="text-[10px] text-t-caption mt-1">총 비용</p>
                </div>
                <div className="text-center">
                  <p className="text-[20px] font-extrabold text-sub tracking-tight">{formatTime(plan.prepDay.totalTime)}</p>
                  <p className="text-[10px] text-t-caption mt-1">준비 시간</p>
                </div>
                <div className="text-center">
                  <p className="text-[20px] font-extrabold text-t tracking-tight">{totalPacks}팩</p>
                  <p className="text-[10px] text-t-caption mt-1">냉동 소분</p>
                </div>
              </div>
            </div>

            {/* 완성 메뉴 - 카드형 */}
            <div>
              <p className="text-[14px] font-bold tracking-tight text-t mb-3">완성되는 메뉴</p>
              {recipeIds.map(id => {
                const r = recipesMap[id];
                if (!r) return null;
                return (
                  <Link key={id} href={`/recipe/${id}`} className="block mb-2">
                    <div className="bg-surface rounded-xl shadow-sm overflow-hidden flex active:scale-[0.98] transition-transform">
                      <div className="w-1 shrink-0 bg-main" />
                      <div className="flex-1 p-3.5 flex items-center gap-3">
                        <span className="text-[22px]">{r.imageEmoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-bold tracking-tight text-t truncate">{r.title}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            {r.portionsYield && <span className="text-[11px] text-main font-semibold">{r.portionsYield}팩</span>}
                            {r.reheatInstructions && (
                              <span className="text-[11px] text-t-caption truncate">{r.reheatInstructions}</span>
                            )}
                          </div>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="#CCC" strokeWidth="1.5" strokeLinecap="round" /></svg>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* 체크리스트 */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[14px] font-bold tracking-tight text-t">준비 체크리스트</p>
                <span className="text-[11px] text-t-caption">총 {formatTime(plan.prepDay.totalTime)}</span>
              </div>
              <div className="bg-surface rounded-xl shadow-sm p-5">
                <ol className="space-y-4">
                  {plan.prepDay.tasks.map(task => (
                    <li key={task.order} className="flex gap-3 items-start">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-main text-white text-[11px] flex items-center justify-center font-bold mt-0.5">
                        {task.order}
                      </span>
                      <div className="flex-1">
                        <p className="text-[13px] text-t leading-[1.7]">{task.instruction}</p>
                        <span className="text-[11px] text-t-caption mt-0.5 block">{formatTime(task.duration)}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}
      </main>
      <BottomNav />
    </>
  );
}
