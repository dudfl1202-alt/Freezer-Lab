"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/layout/header";
import BottomNav from "@/components/layout/bottom-nav";
import AffiliateDisclosure from "@/components/shared/affiliate-disclosure";
import { allMealprepRecipes, getMealprepRecipesByBudget } from "@/data/recipes-mealprep";
import { formatPrice, formatTime } from "@/lib/utils";
import { BudgetTier, Recipe, FreezerCategory } from "@/types";

const tiers: BudgetTier[] = ["1만원", "2만원", "3만원"];

const tierMeta: Record<BudgetTier, { label: string; range: string; color: string; bg: string }> = {
  "1만원": { label: "1만원대", range: "~ 3,500원/끼", color: "#4A5D4A", bg: "#EEF2EC" },
  "2만원": { label: "2만원대", range: "~ 6,000원/끼", color: "#C4A97D", bg: "#F5F0E8" },
  "3만원": { label: "3만원대", range: "6,000원+/끼", color: "#8A6A3C", bg: "#F2E8D8" },
};

export default function ShoppingPage() {
  const [tier, setTier] = useState<BudgetTier>("1만원");
  const [category, setCategory] = useState<FreezerCategory | "all">("all");

  const recipesInTier = useMemo(() => {
    const all = getMealprepRecipesByBudget(tier);
    if (category === "all") return all;
    return all.filter((r) => r.freezerCategory === category);
  }, [tier, category]);

  const totalCount = allMealprepRecipes.length;
  const tierStats = useMemo(
    () => ({
      "1만원": getMealprepRecipesByBudget("1만원").length,
      "2만원": getMealprepRecipesByBudget("2만원").length,
      "3만원": getMealprepRecipesByBudget("3만원").length,
    }),
    []
  );

  return (
    <>
      <Header />
      <main className="max-w-lg mx-auto px-5 pt-6 pb-24">
        <p className="text-[11px] text-t-caption uppercase tracking-wider mb-1">Smart Shopping</p>
        <h1 className="font-serif text-[22px] font-bold text-t">스마트 장보기</h1>
        <p className="text-[13px] text-t-sub mt-1.5 mb-5">
          예산에 맞는 밀프랩 레시피를 찾아드려요. 총 <span className="font-semibold text-t">{totalCount}개</span> 레시피.
        </p>

        {/* Budget tier selector */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {tiers.map((t) => {
            const meta = tierMeta[t];
            const active = tier === t;
            return (
              <button
                key={t}
                onClick={() => setTier(t)}
                className={`p-3 rounded-2xl text-left transition-all active:scale-[0.97] ${
                  active ? "shadow-card" : "shadow-sm"
                }`}
                style={{
                  background: active ? meta.bg : "#FFFFFF",
                  border: active ? `1.5px solid ${meta.color}` : "1px solid #EEEEE8",
                }}
              >
                <p className="text-[10px] text-t-caption uppercase tracking-wider mb-0.5">{meta.range}</p>
                <p
                  className="text-[15px] font-bold tracking-tight"
                  style={{ color: active ? meta.color : "#1C2118" }}
                >
                  {meta.label}
                </p>
                <p className="text-[10px] text-t-caption mt-0.5">{tierStats[t]}개 레시피</p>
              </button>
            );
          })}
        </div>

        {/* Category sub-filter */}
        <div className="flex gap-1.5 mb-5">
          {(["all", "가성비", "다이어트"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={
                category === c
                  ? "px-3.5 py-1.5 rounded-full bg-t text-white text-[12px] font-semibold transition-all"
                  : "px-3.5 py-1.5 rounded-full bg-surface text-t-sub text-[12px] transition-all border border-line"
              }
            >
              {c === "all" ? "전체" : c}
            </button>
          ))}
        </div>

        <AffiliateDisclosure variant="prominent" className="mb-5" />

        {/* Recipe grid */}
        {recipesInTier.length === 0 ? (
          <p className="text-center py-12 text-[13px] text-t-disabled">
            해당 조건의 레시피가 없어요
          </p>
        ) : (
          <div className="space-y-2.5">
            <p className="text-[11px] text-t-caption uppercase tracking-wider mb-3">
              {recipesInTier.length}개 레시피 · {tierMeta[tier].range}
            </p>
            {recipesInTier.map((r) => (
              <RecipeRow key={r.id} recipe={r} />
            ))}
          </div>
        )}

        <AffiliateDisclosure variant="inline" className="mt-6 text-center" />
      </main>
      <BottomNav />
    </>
  );
}

function RecipeRow({ recipe }: { recipe: Recipe }) {
  const isRaw = recipe.prepStyle === "raw";
  return (
    <Link href={`/recipe/${recipe.id}`} className="block">
      <div className="bg-surface rounded-2xl shadow-sm p-4 active:scale-[0.98] transition-transform">
        <div className="flex items-start gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
            style={{ background: isRaw ? "#F0F7FF" : "#EEF2EC" }}
          >
            {recipe.imageEmoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
              <h3 className="font-bold text-[14px] tracking-tight text-t truncate">
                {recipe.title}
              </h3>
              {isRaw && (
                <span
                  className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                  style={{ background: "#D0E8F5", color: "#3B82C4" }}
                >
                  재료냉동
                </span>
              )}
            </div>
            <p className="text-[12px] text-t-caption mt-0.5 line-clamp-1">
              {recipe.description}
            </p>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span
                className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                  recipe.freezerCategory === "다이어트"
                    ? "bg-sand-light text-sand"
                    : "bg-olive-light text-olive"
                }`}
              >
                {recipe.freezerCategory}
              </span>
              <span className="text-[11px] text-t-caption">
                {formatTime(recipe.prepTime + recipe.cookTime)}
              </span>
              <span className="text-[11px] text-t-caption">·</span>
              <span className="text-[11px] text-t-sub font-semibold">
                {formatPrice(recipe.estimatedCost)}/끼
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
