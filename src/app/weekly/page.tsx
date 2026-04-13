"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/layout/header";
import BottomNav from "@/components/layout/bottom-nav";
import {
  budgetMealprepRecipes,
  dietMealprepRecipes,
  mealprepStats,
} from "@/data/recipes-mealprep";
import { formatPrice, formatTime } from "@/lib/utils";
import { getRecipeTone } from "@/lib/recipe-tone";
import { Recipe, FreezerCategory, PrepStyle } from "@/types";

type SortMode = "추천순" | "가격순" | "칼로리순" | "조리시간순";
type StyleFilter = "all" | PrepStyle;

function matchesSearch(recipe: Recipe, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase().trim();
  const text = [
    recipe.title,
    recipe.description,
    ...recipe.ingredients.map((i) => i.name),
    ...recipe.tags,
  ].join(" ").toLowerCase();
  // 띄어쓰기로 나눈 각 키워드가 모두 포함되어야 함
  return q.split(/\s+/).every((word) => text.includes(word));
}

export default function WeeklyPage() {
  const [category, setCategory] = useState<FreezerCategory>("가성비");
  const [styleFilter, setStyleFilter] = useState<StyleFilter>("all");
  const [sortMode, setSortMode] = useState<SortMode>("추천순");
  const [searchQuery, setSearchQuery] = useState("");

  const recipes = useMemo(() => {
    const base = category === "가성비" ? budgetMealprepRecipes : dietMealprepRecipes;
    let filtered = base;
    if (styleFilter !== "all") {
      filtered = filtered.filter((r) => r.prepStyle === styleFilter);
    }
    if (searchQuery.trim()) {
      filtered = filtered.filter((r) => matchesSearch(r, searchQuery));
    }
    const sorted = [...filtered];
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
  }, [category, styleFilter, sortMode, searchQuery]);

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
            전부 냉동 보관 가능한 레시피{" "}
            <span className="font-bold text-olive">{mealprepStats.total}개</span>
          </p>
        </div>

        {/* 검색 */}
        <div className="relative mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="레시피 검색 (예: 김치볶음밥, 닭가슴살)"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface border border-line text-[13px]
                       focus:outline-none focus:border-olive placeholder:text-t-disabled transition-colors"
          />
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2"
            width="16" height="16" viewBox="0 0 16 16" fill="none"
          >
            <circle cx="7" cy="7" r="4.5" stroke="#9C9C90" strokeWidth="1.5" />
            <path d="M10.5 10.5L14 14" stroke="#9C9C90" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-t-disabled hover:text-t-sub text-sm"
            >
              &times;
            </button>
          )}
        </div>

        {/* 카테고리 탭 (가성비/다이어트) */}
        <div className="grid grid-cols-2 gap-2 mb-4">
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

        {/* 조리방식 필터 */}
        <div className="bg-surface rounded-2xl border border-line p-3 mb-4">
          <p className="text-[10px] text-t-caption uppercase tracking-wider mb-2 font-semibold">
            냉동 방식
          </p>
          <div className="flex gap-1.5">
            {([
              { id: "all", label: "전체", desc: "" },
              { id: "cooked", label: "조리 후 냉동", desc: "전자레인지 해동" },
              { id: "raw", label: "재료 냉동", desc: "끓는 물에 즉석 조리" },
            ] as const).map((opt) => (
              <button
                key={opt.id}
                onClick={() => setStyleFilter(opt.id as StyleFilter)}
                className={
                  styleFilter === opt.id
                    ? "flex-1 px-2 py-2 rounded-lg bg-olive text-white text-[11px] font-semibold transition-all"
                    : "flex-1 px-2 py-2 rounded-lg bg-bg text-t-sub text-[11px] transition-all"
                }
              >
                <p>{opt.label}</p>
                {opt.desc && (
                  <p className="text-[9px] opacity-70 mt-0.5">{opt.desc}</p>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 정렬 */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-[11px] text-t-caption uppercase tracking-wider">
            {recipes.length}개 레시피
          </p>
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {(["추천순", "가격순", "칼로리순", "조리시간순"] as SortMode[]).map(
              (mode) => (
                <button
                  key={mode}
                  onClick={() => setSortMode(mode)}
                  className={
                    sortMode === mode
                      ? "shrink-0 px-3 py-1 rounded-full text-olive text-[11px] font-semibold whitespace-nowrap"
                      : "shrink-0 px-3 py-1 rounded-full text-t-disabled text-[11px] whitespace-nowrap"
                  }
                >
                  {mode}
                </button>
              )
            )}
          </div>
        </div>

        {/* 레시피 리스트 */}
        {recipes.length === 0 ? (
          <p className="text-center py-12 text-[13px] text-t-disabled">
            해당 조건의 레시피가 없어요
          </p>
        ) : (
          <div className="space-y-2.5 animate-fade-in">
            {recipes.map((recipe) => (
              <MealprepCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </main>
      <BottomNav />
    </>
  );
}

function MealprepCard({ recipe }: { recipe: Recipe }) {
  const tone = getRecipeTone(recipe);
  return (
    <Link href={`/recipe/${recipe.id}`} className="block">
      <article
        className="rounded-2xl shadow-sm overflow-hidden active:scale-[0.98] transition-transform border border-line"
        style={{ background: "#FFFFFF" }}
      >
        {/* 컬러 톱 밴드 - 카테고리 표시 */}
        <div
          className="px-5 pt-3 pb-2 flex items-center justify-between"
          style={{ background: tone.blockBg }}
        >
          <p
            className="text-[10px] font-bold uppercase tracking-[0.1em]"
            style={{ color: tone.blockText }}
          >
            {tone.categoryLabel}
            {tone.subLabel && (
              <span className="ml-1.5 font-medium opacity-70 normal-case tracking-normal">
                · {tone.subLabel}
              </span>
            )}
          </p>
          {recipe.portionsYield && (
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: "#FFFFFF", color: tone.blockText }}
            >
              {recipe.portionsYield}팩
            </span>
          )}
        </div>

        {/* 본문 */}
        <div className="px-5 py-4">
          <h3 className="font-serif text-[17px] font-bold text-t leading-tight">
            {recipe.title}
          </h3>
          <p className="text-[12px] text-t-caption mt-1 line-clamp-1">
            {recipe.description}
          </p>

          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-line">
            <div>
              <p className="text-[9px] text-t-caption uppercase tracking-wider">Cost</p>
              <p
                className="text-[14px] font-bold tracking-tight"
                style={{ color: tone.blockText }}
              >
                {formatPrice(recipe.estimatedCost)}
              </p>
            </div>
            <div className="w-px h-7 bg-line" />
            <div>
              <p className="text-[9px] text-t-caption uppercase tracking-wider">Time</p>
              <p className="text-[14px] font-bold text-t tracking-tight">
                {formatTime(recipe.prepTime + recipe.cookTime)}
              </p>
            </div>
            {recipe.calories && (
              <>
                <div className="w-px h-7 bg-line" />
                <div>
                  <p className="text-[9px] text-t-caption uppercase tracking-wider">Cal</p>
                  <p className="text-[14px] font-bold text-t tracking-tight">
                    {recipe.calories}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
