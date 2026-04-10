"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/layout/header";
import BottomNav from "@/components/layout/bottom-nav";
import { budgetMealprepRecipes, dietMealprepRecipes, mealprepStats } from "@/data/recipes-mealprep";
import { formatPrice, formatTime } from "@/lib/utils";
import { Recipe, FreezerCategory } from "@/types";

type SortMode = "추천순" | "가격순" | "칼로리순" | "조리시간순";

export default function WeeklyPage() {
  const [category, setCategory] = useState<FreezerCategory>("가성비");
  const [sortMode, setSortMode] = useState<SortMode>("추천순");

  const recipes = useMemo(() => {
    const base = category === "가성비" ? budgetMealprepRecipes : dietMealprepRecipes;
    const sorted = [...base];
    switch (sortMode) {
      case "가격순":
        return sorted.sort((a, b) => a.estimatedCost - b.estimatedCost);
      case "칼로리순":
        return sorted.sort((a, b) => (a.calories ?? 0) - (b.calories ?? 0));
      case "조리시간순":
        return sorted.sort(
          (a, b) => a.prepTime + a.cookTime - (b.prepTime + b.cookTime)
        );
      default:
        return sorted;
    }
  }, [category, sortMode]);

  const stats = useMemo(() => {
    const total = recipes.length;
    const avgCost = Math.round(
      recipes.reduce((s, r) => s + r.estimatedCost, 0) / total
    );
    const avgCalories = Math.round(
      recipes.reduce((s, r) => s + (r.calories ?? 0), 0) / total
    );
    return { total, avgCost, avgCalories };
  }, [recipes]);

  return (
    <>
      <Header />
      <main className="max-w-lg mx-auto px-5 pt-6 pb-24">
        {/* 타이틀 */}
        <div className="mb-6">
          <p className="text-[11px] text-t-caption uppercase tracking-wider mb-1">
            Freezer Meal Prep
          </p>
          <h1 className="font-serif text-[24px] font-bold text-t">냉동 밀프랩</h1>
          <p className="text-[13px] text-t-sub mt-1.5 leading-relaxed">
            한 번에 대량 조리해서 냉동실에 쌓아두세요.<br />
            전부 냉동 보관 가능한 레시피 <span className="font-bold text-olive">{mealprepStats.total}개</span>
          </p>
        </div>

        {/* 카테고리 탭 (가성비/다이어트) */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          <button
            onClick={() => setCategory("가성비")}
            className={
              category === "가성비"
                ? "py-4 rounded-2xl bg-olive text-white transition-all active:scale-[0.98]"
                : "py-4 rounded-2xl bg-surface text-t-sub border border-line transition-all active:scale-[0.98]"
            }
          >
            <p className="text-[15px] font-bold">가성비</p>
            <p className="text-[11px] opacity-80 mt-0.5">
              {mealprepStats.budget}개 · 저렴하고 든든
            </p>
          </button>
          <button
            onClick={() => setCategory("다이어트")}
            className={
              category === "다이어트"
                ? "py-4 rounded-2xl bg-olive text-white transition-all active:scale-[0.98]"
                : "py-4 rounded-2xl bg-surface text-t-sub border border-line transition-all active:scale-[0.98]"
            }
          >
            <p className="text-[15px] font-bold">다이어트</p>
            <p className="text-[11px] opacity-80 mt-0.5">
              {mealprepStats.diet}개 · 저칼로리 고단백
            </p>
          </button>
        </div>

        {/* 통계 */}
        <div className="flex gap-4 mb-5 px-1">
          <div>
            <p className="text-[10px] text-t-caption uppercase tracking-wider mb-0.5">Total</p>
            <p className="text-[18px] font-bold text-t tracking-tight">{stats.total}개</p>
          </div>
          <div>
            <p className="text-[10px] text-t-caption uppercase tracking-wider mb-0.5">Avg Cost</p>
            <p className="text-[18px] font-bold text-olive tracking-tight">
              {formatPrice(stats.avgCost)}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-t-caption uppercase tracking-wider mb-0.5">Avg Cal</p>
            <p className="text-[18px] font-bold text-sand tracking-tight">
              {stats.avgCalories}kcal
            </p>
          </div>
        </div>

        {/* 정렬 */}
        <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide -mx-5 px-5">
          {(["추천순", "가격순", "칼로리순", "조리시간순"] as SortMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setSortMode(mode)}
              className={
                sortMode === mode
                  ? "shrink-0 px-4 py-2 rounded-full bg-olive-light text-olive text-[12px] font-semibold whitespace-nowrap"
                  : "shrink-0 px-4 py-2 rounded-full bg-surface text-t-caption text-[12px] border border-line whitespace-nowrap"
              }
            >
              {mode}
            </button>
          ))}
        </div>

        {/* 레시피 리스트 */}
        <div className="space-y-2.5 animate-fade-in">
          {recipes.map((recipe) => (
            <MealprepCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </main>
      <BottomNav />
    </>
  );
}

function MealprepCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/recipe/${recipe.id}`} className="block">
      <div className="bg-surface rounded-2xl p-4 shadow-sm active:scale-[0.98] transition-transform">
        <div className="flex items-start gap-3">
          <div className="w-14 h-14 rounded-xl bg-olive-light flex items-center justify-center text-3xl shrink-0">
            {recipe.imageEmoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-serif text-[15px] font-bold text-t truncate">
                {recipe.title}
              </h3>
              {recipe.portionsYield && (
                <span className="shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-olive text-white font-bold">
                  {recipe.portionsYield}팩
                </span>
              )}
            </div>
            <p className="text-[12px] text-t-caption mt-0.5 line-clamp-1">
              {recipe.description}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[11px] font-semibold text-olive">
                {formatPrice(recipe.estimatedCost)}
              </span>
              <span className="text-[10px] text-t-disabled">·</span>
              <span className="text-[11px] text-t-sub">
                {formatTime(recipe.prepTime + recipe.cookTime)}
              </span>
              {recipe.calories && (
                <>
                  <span className="text-[10px] text-t-disabled">·</span>
                  <span className="text-[11px] text-sand">
                    {recipe.calories}kcal
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
