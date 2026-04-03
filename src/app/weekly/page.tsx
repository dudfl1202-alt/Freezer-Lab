"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/layout/header";
import BottomNav from "@/components/layout/bottom-nav";
import { weeklyPlans } from "@/data/weekly-plans";
import { cn, formatPrice, formatTime } from "@/lib/utils";
import { WeeklyPlan, Recipe } from "@/types";

function PrepChecklist({ plan }: { plan: WeeklyPlan }) {
  return (
    <div className="bg-primary-50 rounded-2xl p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-warm-800">
          📋 일요일 준비 체크리스트
        </h3>
        <span className="text-xs text-warm-800/40">
          총 {formatTime(plan.prepDay.totalTime)}
        </span>
      </div>
      <ol className="space-y-4">
        {plan.prepDay.tasks.map((task) => (
          <li key={task.order} className="flex gap-3 items-start">
            <span className="shrink-0 w-7 h-7 rounded-full bg-primary-200 text-primary-600 text-xs flex items-center justify-center font-bold mt-0.5">
              {task.order}
            </span>
            <div className="flex-1">
              <p className="text-sm text-warm-800 leading-relaxed">
                {task.instruction}
              </p>
              <span className="text-[10px] text-warm-800/40 mt-1 block">
                ⏱️ {formatTime(task.duration)}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ResultRecipes({
  plan,
  recipesMap,
}: {
  plan: WeeklyPlan;
  recipesMap: Record<string, Recipe>;
}) {
  // 준비 태스크에서 고유 레시피 ID 추출
  const recipeIds = useMemo(() => {
    const ids = new Set<string>();
    plan.prepDay.tasks.forEach((t) => ids.add(t.recipeId));
    return Array.from(ids);
  }, [plan]);

  return (
    <div className="mb-4">
      <h3 className="text-sm font-bold text-warm-800 mb-3">
        🍱 완성되는 메뉴
      </h3>
      <div className="space-y-2">
        {recipeIds.map((id) => {
          const recipe = recipesMap[id];
          if (!recipe) return null;
          return (
            <Link key={id} href={`/recipe/${id}`}>
              <div className="bg-white rounded-xl border border-primary-50 p-3 flex items-center gap-3 hover:shadow-sm transition-shadow active:scale-[0.98] mb-2">
                <span className="text-2xl">{recipe.imageEmoji}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-warm-800">
                    {recipe.title}
                  </p>
                  <div className="flex gap-2 mt-0.5">
                    {recipe.portionsYield && (
                      <span className="text-[10px] text-fresh-600">
                        📦 {recipe.portionsYield}팩 소분
                      </span>
                    )}
                    {recipe.reheatInstructions && (
                      <span className="text-[10px] text-warm-800/40">
                        {recipe.reheatInstructions}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-warm-800/20">&rarr;</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function WeeklyPage() {
  const [selectedPlanId, setSelectedPlanId] = useState(weeklyPlans[0]?.id);
  const [recipesMap, setRecipesMap] = useState<Record<string, Recipe>>({});

  useEffect(() => {
    import("@/data/recipes").then((m) => {
      const map: Record<string, Recipe> = {};
      m.recipes.forEach((r: Recipe) => {
        map[r.id] = r;
      });
      setRecipesMap(map);
    });
  }, []);

  const selectedPlan = weeklyPlans.find((p) => p.id === selectedPlanId);

  // 총 소분 팩 수 계산
  const totalPacks = useMemo(() => {
    if (!selectedPlan) return 0;
    const recipeIds = new Set<string>();
    selectedPlan.prepDay.tasks.forEach((t) => recipeIds.add(t.recipeId));
    return Array.from(recipeIds).reduce((sum, id) => {
      const recipe = recipesMap[id];
      return sum + (recipe?.portionsYield ?? 0);
    }, 0);
  }, [selectedPlan, recipesMap]);

  return (
    <>
      <Header />
      <main className="max-w-lg mx-auto px-4 pt-6 pb-24">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-warm-800 mb-1">
            📅 주간 밀프랩
          </h1>
          <p className="text-sm text-warm-800/50">
            일요일에 한 번 만들고, 먹고 싶을 때 전자레인지만 돌리세요
          </p>
        </div>

        {/* Plan Selector */}
        <div className="flex gap-2 mb-6">
          {weeklyPlans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={cn(
                "flex-1 py-3 rounded-xl text-sm font-medium transition-colors text-center",
                selectedPlanId === plan.id
                  ? plan.id === "frozen-storage"
                    ? "bg-ice-500 text-white"
                    : "bg-fresh-500 text-white"
                  : "bg-white border border-primary-100 text-warm-800/60 hover:border-primary-300"
              )}
            >
              {plan.id === "frozen-storage" ? "🧊 " : "🥗 "}
              {plan.title}
            </button>
          ))}
        </div>

        {selectedPlan && (
          <>
            {/* Plan Overview */}
            <div className="bg-white rounded-2xl border border-primary-100 p-4 mb-4">
              <p className="text-sm text-warm-800/60 mb-3">
                {selectedPlan.description}
              </p>
              <div className="flex gap-3">
                <div className="flex-1 bg-warm-50 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-primary-500">
                    {formatPrice(selectedPlan.totalCost)}
                  </p>
                  <p className="text-[10px] text-warm-800/40">총 비용</p>
                </div>
                <div className="flex-1 bg-warm-50 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-fresh-500">
                    {formatTime(selectedPlan.prepDay.totalTime)}
                  </p>
                  <p className="text-[10px] text-warm-800/40">준비 시간</p>
                </div>
                <div className="flex-1 bg-warm-50 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-ice-500">
                    {totalPacks}팩
                  </p>
                  <p className="text-[10px] text-warm-800/40">냉동 소분</p>
                </div>
              </div>
            </div>

            <ResultRecipes plan={selectedPlan} recipesMap={recipesMap} />
            <PrepChecklist plan={selectedPlan} />
          </>
        )}
      </main>
      <BottomNav />
    </>
  );
}
