"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/layout/header";
import BottomNav from "@/components/layout/bottom-nav";
import Mascot from "@/components/shared/mascot";
import { weeklyPlans } from "@/data/weekly-plans";
import { formatPrice, formatTime } from "@/lib/utils";
import { WeeklyPlan, Recipe } from "@/types";

function PrepChecklist({ plan }: { plan: WeeklyPlan }) {
  return (
    <div className="bg-gradient-to-br from-lavender-50 to-pink-50 rounded-3xl p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-txt-primary">
          &#128203; 일요일 준비 체크리스트
        </h3>
        <span className="text-xs text-txt-light bg-white/60 px-2 py-0.5 rounded-full">
          총 {formatTime(plan.prepDay.totalTime)}
        </span>
      </div>
      <ol className="space-y-4">
        {plan.prepDay.tasks.map((task) => (
          <li key={task.order} className="flex gap-3 items-start">
            <span className="shrink-0 w-7 h-7 rounded-full bg-lavender-200 text-lavender-600 text-xs flex items-center justify-center font-bold mt-0.5">
              {task.order}
            </span>
            <div className="flex-1">
              <p className="text-sm text-txt-primary leading-relaxed">
                {task.instruction}
              </p>
              <span className="text-[10px] text-txt-light mt-1 block">
                &#9201; {formatTime(task.duration)}
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
  const recipeIds = useMemo(() => {
    const ids = new Set<string>();
    plan.prepDay.tasks.forEach((t) => ids.add(t.recipeId));
    return Array.from(ids);
  }, [plan]);

  return (
    <div className="mb-4">
      <h3 className="text-sm font-bold text-txt-primary mb-3">
        &#127857; 완성되는 메뉴
      </h3>
      <div className="space-y-2">
        {recipeIds.map((id) => {
          const recipe = recipesMap[id];
          if (!recipe) return null;
          return (
            <Link key={id} href={`/recipe/${id}`}>
              <div className="bg-white rounded-2xl border border-lavender-100 p-3 flex items-center gap-3 hover:shadow-cute transition-all active:scale-[0.98] mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lavender-50 to-pink-50 flex items-center justify-center text-xl">
                  {recipe.imageEmoji}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-txt-primary">
                    {recipe.title}
                  </p>
                  <div className="flex gap-2 mt-0.5">
                    {recipe.portionsYield && (
                      <span className="text-[10px] text-mint-500">
                        &#128230; {recipe.portionsYield}팩 소분
                      </span>
                    )}
                    {recipe.reheatInstructions && (
                      <span className="text-[10px] text-txt-light">
                        {recipe.reheatInstructions}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-lavender-300">&rarr;</span>
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
        <div className="flex items-center gap-3 mb-6">
          <Mascot size={48} expression="cooking" />
          <div>
            <h1 className="text-xl font-bold text-txt-primary">
              &#128197; 주간 밀프랩
            </h1>
            <p className="text-sm text-txt-muted">
              한 번 만들고, 먹고 싶을 때 전자레인지만!
            </p>
          </div>
        </div>

        {/* Plan Selector */}
        <div className="flex gap-2 mb-6">
          {weeklyPlans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={
                selectedPlanId === plan.id
                  ? plan.id === "frozen-storage"
                    ? "flex-1 py-3 rounded-2xl text-sm font-medium bg-gradient-to-r from-sky-400 to-lavender-400 text-white shadow-cute transition-all"
                    : "flex-1 py-3 rounded-2xl text-sm font-medium bg-gradient-to-r from-mint-400 to-mint-500 text-white shadow-cute transition-all"
                  : "flex-1 py-3 rounded-2xl text-sm font-medium bg-white border border-lavender-100 text-txt-muted hover:border-lavender-300 transition-all"
              }
            >
              {plan.id === "frozen-storage" ? "&#129482; " : "&#129388; "}
              {plan.title}
            </button>
          ))}
        </div>

        {selectedPlan && (
          <>
            {/* Plan Overview */}
            <div className="bg-white rounded-3xl border border-lavender-100 p-4 mb-4 shadow-cute">
              <p className="text-sm text-txt-muted mb-3">
                {selectedPlan.description}
              </p>
              <div className="flex gap-3">
                <div className="flex-1 bg-gradient-to-br from-lavender-50 to-pink-50 rounded-2xl p-3 text-center">
                  <p className="text-lg font-bold text-lavender-500">
                    {formatPrice(selectedPlan.totalCost)}
                  </p>
                  <p className="text-[10px] text-txt-light">총 비용</p>
                </div>
                <div className="flex-1 bg-gradient-to-br from-mint-50 to-sky-50 rounded-2xl p-3 text-center">
                  <p className="text-lg font-bold text-mint-500">
                    {formatTime(selectedPlan.prepDay.totalTime)}
                  </p>
                  <p className="text-[10px] text-txt-light">준비 시간</p>
                </div>
                <div className="flex-1 bg-gradient-to-br from-sky-50 to-lavender-50 rounded-2xl p-3 text-center">
                  <p className="text-lg font-bold text-sky-500">
                    {totalPacks}팩
                  </p>
                  <p className="text-[10px] text-txt-light">냉동 소분</p>
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
