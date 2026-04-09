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
        <h1 className="text-[18px] font-extrabold tracking-tight text-t">냉동 밀프랩</h1>
        <p className="text-[13px] text-t-sub mt-1 mb-5">한 번 만들고 냉동실에 쌓아두세요</p>

        <div className="flex border-b border-line mb-5">
          {weeklyPlans.map(p => (
            <button key={p.id} onClick={() => setSelectedId(p.id)}
              className={selectedId === p.id
                ? "flex-1 py-3 text-[14px] font-bold text-main border-b-2 border-main"
                : "flex-1 py-3 text-[14px] text-t-caption"
              }>{p.title}</button>
          ))}
        </div>

        {plan && (
          <div className="animate-fade-in">
            {/* 통계 */}
            <div className="bg-surface rounded-xl shadow-sm p-5 mb-5">
              <p className="text-[13px] text-t-sub mb-5">{plan.description}</p>
              <div className="flex gap-6">
                <div>
                  <p className="text-[11px] text-t-caption mb-0.5">총 비용</p>
                  <p className="text-[20px] font-extrabold text-main tracking-tight">{formatPrice(plan.totalCost)}</p>
                </div>
                <div>
                  <p className="text-[11px] text-t-caption mb-0.5">준비 시간</p>
                  <p className="text-[20px] font-extrabold text-sub tracking-tight">{formatTime(plan.prepDay.totalTime)}</p>
                </div>
                <div>
                  <p className="text-[11px] text-t-caption mb-0.5">냉동 소분</p>
                  <p className="text-[20px] font-extrabold text-t tracking-tight">{totalPacks}팩</p>
                </div>
              </div>
            </div>

            {/* 완성 메뉴 */}
            <p className="text-[14px] font-bold tracking-tight text-t mb-3">완성되는 메뉴</p>
            <div className="mb-6">
              {recipeIds.map(id => {
                const r = recipesMap[id];
                if (!r) return null;
                return (
                  <Link key={id} href={`/recipe/${id}`}>
                    <div className="flex items-center justify-between py-3.5 border-b border-line last:border-0 active:bg-bg transition-colors">
                      <div>
                        <p className="text-[14px] font-bold tracking-tight text-t">{r.title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          {r.portionsYield && <span className="text-[11px] text-main font-semibold">{r.portionsYield}팩</span>}
                          {r.reheatInstructions && <span className="text-[11px] text-t-caption">{r.reheatInstructions}</span>}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* 체크리스트 */}
            <div className="flex items-center justify-between mb-3">
              <p className="text-[14px] font-bold tracking-tight text-t">준비 체크리스트</p>
              <span className="text-[11px] text-t-caption">총 {formatTime(plan.prepDay.totalTime)}</span>
            </div>
            <div className="bg-surface rounded-xl shadow-sm p-5">
              <ol className="space-y-5">
                {plan.prepDay.tasks.map(task => (
                  <li key={task.order} className="flex gap-3">
                    <span className="text-[13px] font-bold text-main shrink-0 w-5 mt-px">{task.order}.</span>
                    <div>
                      <p className="text-[13px] text-t leading-[1.7]">{task.instruction}</p>
                      <span className="text-[11px] text-t-caption mt-0.5 block">{formatTime(task.duration)}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </main>
      <BottomNav />
    </>
  );
}
