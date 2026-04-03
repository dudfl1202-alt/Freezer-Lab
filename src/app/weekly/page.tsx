"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/layout/header";
import BottomNav from "@/components/layout/bottom-nav";
import { weeklyPlans } from "@/data/weekly-plans";
import { formatPrice, formatTime } from "@/lib/utils";
import { WeeklyPlan, Recipe } from "@/types";

function ResultRecipes({ plan, recipesMap }: { plan: WeeklyPlan; recipesMap: Record<string, Recipe> }) {
  const recipeIds = useMemo(() => {
    const ids = new Set<string>();
    plan.prepDay.tasks.forEach((t) => ids.add(t.recipeId));
    return Array.from(ids);
  }, [plan]);

  return (
    <div className="mb-4">
      <p className="section-title mb-2.5">완성되는 메뉴</p>
      <div className="space-y-2">
        {recipeIds.map((id) => {
          const recipe = recipesMap[id];
          if (!recipe) return null;
          return (
            <Link key={id} href={`/recipe/${id}`} className="block">
              <div className="card p-3.5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center text-lg shrink-0">
                  {recipe.imageEmoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-t truncate">{recipe.title}</p>
                  <div className="flex gap-2 mt-0.5">
                    {recipe.portionsYield && (
                      <span className="text-[10px] text-primary">{recipe.portionsYield}팩 소분</span>
                    )}
                    {recipe.reheatInstructions && (
                      <span className="text-[10px] text-t-disabled truncate">{recipe.reheatInstructions}</span>
                    )}
                  </div>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0"><path d="M6 4L10 8L6 12" stroke="#CDCDE0" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function PrepChecklist({ plan }: { plan: WeeklyPlan }) {
  return (
    <div className="bg-primary-light rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="section-title">준비 체크리스트</p>
        <span className="chip bg-surface text-t-hint">총 {formatTime(plan.prepDay.totalTime)}</span>
      </div>
      <ol className="space-y-3.5">
        {plan.prepDay.tasks.map((task) => (
          <li key={task.order} className="flex gap-3 items-start">
            <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold mt-0.5">
              {task.order}
            </span>
            <div className="flex-1">
              <p className="text-sm text-t leading-relaxed">{task.instruction}</p>
              <span className="text-[10px] text-t-hint mt-0.5 block">{formatTime(task.duration)}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function WeeklyPage() {
  const [selectedId, setSelectedId] = useState(weeklyPlans[0]?.id);
  const [recipesMap, setRecipesMap] = useState<Record<string, Recipe>>({});

  useEffect(() => {
    import("@/data/recipes").then((m) => {
      const map: Record<string, Recipe> = {};
      m.recipes.forEach((r: Recipe) => { map[r.id] = r; });
      setRecipesMap(map);
    });
  }, []);

  const plan = weeklyPlans.find((p) => p.id === selectedId);

  const totalPacks = useMemo(() => {
    if (!plan) return 0;
    const ids = new Set<string>();
    plan.prepDay.tasks.forEach((t) => ids.add(t.recipeId));
    return Array.from(ids).reduce((s, id) => s + (recipesMap[id]?.portionsYield ?? 0), 0);
  }, [plan, recipesMap]);

  return (
    <>
      <Header />
      <main className="max-w-lg mx-auto px-4 pt-5 pb-24">
        <div className="mb-5">
          <h1 className="text-lg font-bold text-t">냉동 밀프랩</h1>
          <p className="text-sm text-t-hint mt-0.5">한 번 만들고 냉동실에 쌓아두세요</p>
        </div>

        {/* Plan Selector */}
        <div className="flex gap-1.5 p-1 bg-bg rounded-xl mb-5">
          {weeklyPlans.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              className={selectedId === p.id
                ? "flex-1 py-2.5 rounded-lg bg-surface text-primary text-sm font-semibold shadow-sm transition-all duration-200"
                : "flex-1 py-2.5 rounded-lg text-t-hint text-sm hover:text-t-sub transition-all duration-200"
              }
            >
              {p.title}
            </button>
          ))}
        </div>

        {plan && (
          <div className="space-y-4 animate-fade-up">
            {/* Stats */}
            <div className="card p-4">
              <p className="text-sm text-t-sub mb-3">{plan.description}</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-bg rounded-xl p-3 text-center">
                  <p className="text-base font-bold text-primary">{formatPrice(plan.totalCost)}</p>
                  <p className="text-[10px] text-t-disabled mt-0.5">총 비용</p>
                </div>
                <div className="bg-bg rounded-xl p-3 text-center">
                  <p className="text-base font-bold text-success">{formatTime(plan.prepDay.totalTime)}</p>
                  <p className="text-[10px] text-t-disabled mt-0.5">준비 시간</p>
                </div>
                <div className="bg-bg rounded-xl p-3 text-center">
                  <p className="text-base font-bold text-info">{totalPacks}팩</p>
                  <p className="text-[10px] text-t-disabled mt-0.5">냉동 소분</p>
                </div>
              </div>
            </div>

            <ResultRecipes plan={plan} recipesMap={recipesMap} />
            <PrepChecklist plan={plan} />
          </div>
        )}
      </main>
      <BottomNav />
    </>
  );
}
