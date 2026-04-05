"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/layout/header";
import BottomNav from "@/components/layout/bottom-nav";
import Mascot from "@/components/shared/mascot";
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
        {/* 헤더 */}
        <div className="flex items-center gap-3 mb-5">
          <Mascot size={40} mood="cook" />
          <div>
            <h1 className="text-[18px] font-bold text-t">냉동 밀프랩</h1>
            <p className="text-[13px] text-t-caption">한 번 만들고 쭉 먹어요</p>
          </div>
        </div>

        {/* 플랜 선택 */}
        <div className="flex gap-1 p-1 bg-line rounded-xl mb-5">
          {weeklyPlans.map(p => (
            <button key={p.id} onClick={() => setSelectedId(p.id)}
              className={selectedId === p.id
                ? "flex-1 py-2.5 rounded-lg bg-surface text-main text-[13px] font-semibold shadow-sm transition-all"
                : "flex-1 py-2.5 rounded-lg text-t-caption text-[13px] transition-all"
              }>{p.title}</button>
          ))}
        </div>

        {plan && (
          <div className="space-y-3 animate-fade-in">
            {/* 개요 */}
            <div className="bg-surface rounded-2xl p-4 shadow-card">
              <p className="text-[13px] text-t-sub mb-3">{plan.description}</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "총 비용", value: formatPrice(plan.totalCost), color: "text-main" },
                  { label: "준비 시간", value: formatTime(plan.prepDay.totalTime), color: "text-sub" },
                  { label: "냉동 소분", value: `${totalPacks}팩`, color: "text-t" },
                ].map(s => (
                  <div key={s.label} className="bg-bg rounded-xl p-2.5 text-center">
                    <p className={`text-[16px] font-bold ${s.color}`}>{s.value}</p>
                    <p className="text-[10px] text-t-disabled mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 완성 메뉴 */}
            <div>
              <p className="text-[14px] font-bold text-t mb-2">완성되는 메뉴</p>
              <div className="space-y-2">
                {recipeIds.map(id => {
                  const r = recipesMap[id];
                  if (!r) return null;
                  return (
                    <Link key={id} href={`/recipe/${id}`}>
                      <div className="bg-surface rounded-2xl p-3.5 shadow-card flex items-center gap-3 active:scale-[0.98] transition-transform mb-2">
                        <div className="w-10 h-10 rounded-xl bg-main-light flex items-center justify-center text-lg">{r.imageEmoji}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-bold text-t truncate">{r.title}</p>
                          <div className="flex gap-2 mt-0.5">
                            {r.portionsYield && <span className="text-[11px] text-main font-medium">{r.portionsYield}팩</span>}
                            {r.reheatInstructions && <span className="text-[11px] text-t-disabled truncate">{r.reheatInstructions}</span>}
                          </div>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="#B0B8C1" strokeWidth="1.5" strokeLinecap="round" /></svg>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* 준비 체크리스트 */}
            <div className="bg-main-light rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[14px] font-bold text-t">준비 체크리스트</p>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-surface text-t-caption">총 {formatTime(plan.prepDay.totalTime)}</span>
              </div>
              <ol className="space-y-3">
                {plan.prepDay.tasks.map(task => (
                  <li key={task.order} className="flex gap-2.5 items-start">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-main text-white text-[10px] flex items-center justify-center font-bold mt-0.5">{task.order}</span>
                    <div className="flex-1">
                      <p className="text-[13px] text-t leading-relaxed">{task.instruction}</p>
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
