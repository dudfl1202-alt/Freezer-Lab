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
      <main className="max-w-lg mx-auto px-5 pt-6 pb-24">
        <p className="text-[11px] text-t-caption uppercase tracking-wider mb-1">Meal Prep Planner</p>
        <h1 className="font-serif text-[22px] font-bold text-t mb-5">냉동 밀프랩</h1>

        {/* 플랜 선택 - pill 버튼 (가로 스크롤) */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1 -mx-5 px-5 scrollbar-hide">
          {weeklyPlans.map(p => (
            <button key={p.id} onClick={() => setSelectedId(p.id)}
              className={selectedId === p.id
                ? "shrink-0 px-5 py-2.5 rounded-full bg-olive text-white text-[13px] font-semibold transition-all whitespace-nowrap"
                : "shrink-0 px-5 py-2.5 rounded-full bg-surface text-t-sub text-[13px] transition-all border border-line whitespace-nowrap"
              }>{p.title}</button>
          ))}
        </div>

        {plan && (
          <div className="animate-fade-in">
            {/* 설명 + 통계 */}
            <div className="mb-8">
              <p className="text-[13px] text-t-sub leading-relaxed mb-5">{plan.description}</p>
              <div className="flex gap-6">
                <div>
                  <p className="text-[10px] text-t-caption uppercase tracking-wider mb-0.5">Cost</p>
                  <p className="text-[22px] font-bold text-olive tracking-tight">{formatPrice(plan.totalCost)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-t-caption uppercase tracking-wider mb-0.5">Time</p>
                  <p className="text-[22px] font-bold text-sand tracking-tight">{formatTime(plan.prepDay.totalTime)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-t-caption uppercase tracking-wider mb-0.5">Packs</p>
                  <p className="text-[22px] font-bold text-t tracking-tight">{totalPacks}</p>
                </div>
              </div>
            </div>

            {/* 완성 메뉴 */}
            <div className="mb-8">
              <p className="text-[11px] text-t-caption uppercase tracking-wider mb-3">What You&apos;ll Make</p>
              <div className="grid grid-cols-2 gap-3">
                {recipeIds.map(id => {
                  const r = recipesMap[id];
                  if (!r) return null;
                  return (
                    <Link key={id} href={`/recipe/${id}`}>
                      <div className="bg-olive-light rounded-2xl p-4 h-[100px] flex flex-col justify-end active:scale-[0.97] transition-transform">
                        <p className="text-[14px] font-bold text-t">{r.title}</p>
                        <p className="text-[11px] text-t-caption mt-0.5">
                          {r.portionsYield}팩 · {r.reheatInstructions}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* 체크리스트 */}
            <div>
              <div className="flex items-end justify-between mb-3">
                <p className="text-[11px] text-t-caption uppercase tracking-wider">Prep Checklist</p>
                <span className="text-[11px] text-t-caption">{formatTime(plan.prepDay.totalTime)}</span>
              </div>
              <div className="bg-surface rounded-2xl shadow-sm p-5">
                <ol className="space-y-5">
                  {plan.prepDay.tasks.map(task => (
                    <li key={task.order} className="flex gap-3">
                      <span className="text-[13px] font-semibold text-olive shrink-0 w-5 mt-px">{task.order}.</span>
                      <div>
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
