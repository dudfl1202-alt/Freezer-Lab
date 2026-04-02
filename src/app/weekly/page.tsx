"use client";

import { useState, useEffect } from "react";
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
      <ol className="space-y-3">
        {plan.prepDay.tasks.map((task) => (
          <li key={task.order} className="flex gap-3 items-start">
            <span className="shrink-0 w-6 h-6 rounded-full bg-primary-200 text-primary-600 text-xs flex items-center justify-center font-bold mt-0.5">
              {task.order}
            </span>
            <div className="flex-1">
              <p className="text-sm text-warm-800">{task.instruction}</p>
              <span className="text-[10px] text-warm-800/40">
                {formatTime(task.duration)}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function WeekCalendar({
  plan,
  recipesMap,
}: {
  plan: WeeklyPlan;
  recipesMap: Record<string, Recipe>;
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-bold text-warm-800 mb-3">
        🗓️ 주간 식단표
      </h3>
      {plan.weekSchedule.map((day) => (
        <div
          key={day.day}
          className="bg-white rounded-xl border border-primary-50 p-3"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-8 rounded-lg bg-primary-100 text-primary-600 text-sm font-bold flex items-center justify-center">
              {day.day}
            </span>
            <span className="text-xs text-warm-800/40">
              {day.meals.length}끼
            </span>
          </div>
          <div className="space-y-1.5 ml-10">
            {day.meals.map((meal, idx) => {
              const recipe = recipesMap[meal.recipeId];
              return (
                <Link
                  key={idx}
                  href={`/recipe/${meal.recipeId}`}
                  className="flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-warm-800/30 w-6">
                      {meal.type}
                    </span>
                    <span className="text-sm text-warm-800 group-hover:text-primary-500 transition-colors">
                      {recipe?.imageEmoji} {recipe?.title ?? meal.recipeId}
                    </span>
                  </div>
                  <span className="text-[10px] text-warm-800/30">
                    {meal.reheatMethod}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
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

  return (
    <>
      <Header />
      <main className="max-w-lg mx-auto px-4 pt-6 pb-24">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-warm-800 mb-1">
            📅 주간 밀프랩
          </h1>
          <p className="text-sm text-warm-800/50">
            일요일에 한 번 만들고, 평일은 전자레인지만 돌리세요
          </p>
        </div>

        {/* Plan Selector */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {weeklyPlans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={cn(
                "shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
                selectedPlanId === plan.id
                  ? "bg-primary-500 text-white"
                  : "bg-white border border-primary-100 text-warm-800/60 hover:border-primary-300"
              )}
            >
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
                    {selectedPlan.weekSchedule.reduce(
                      (sum, d) => sum + d.meals.length,
                      0
                    )}
                    끼
                  </p>
                  <p className="text-[10px] text-warm-800/40">총 식사</p>
                </div>
              </div>
            </div>

            <PrepChecklist plan={selectedPlan} />
            <WeekCalendar plan={selectedPlan} recipesMap={recipesMap} />
          </>
        )}
      </main>
      <BottomNav />
    </>
  );
}
