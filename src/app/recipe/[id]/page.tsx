"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Recipe } from "@/types";
import { cn, formatPrice, formatTime } from "@/lib/utils";
import AffiliateLink from "@/components/shared/affiliate-link";

const difficultyColor = {
  쉬움: "bg-fresh-100 text-fresh-700",
  보통: "bg-primary-100 text-primary-700",
  어려움: "bg-coral-400/10 text-coral-600",
};

export default function RecipeDetailPage() {
  const params = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    import("@/data/recipes").then((m) => {
      const found = m.recipes.find((r: Recipe) => r.id === params.id);
      setRecipe(found ?? null);
    });
  }, [params.id]);

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">🔍</div>
          <p className="text-sm text-warm-800/40">레시피를 찾는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-lg mx-auto pb-12">
      {/* Hero */}
      <div className="bg-primary-50 pt-4 pb-8 px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-warm-800/40 hover:text-warm-800/60 mb-4"
        >
          ← 돌아가기
        </Link>
        <div className="text-center">
          <span className="text-6xl">{recipe.imageEmoji}</span>
          <h1 className="text-2xl font-bold text-warm-800 mt-3">
            {recipe.title}
          </h1>
          <p className="text-sm text-warm-800/50 mt-1">{recipe.description}</p>
        </div>
        <div className="flex justify-center gap-3 mt-4">
          <span
            className={cn(
              "text-xs px-3 py-1 rounded-full font-medium",
              difficultyColor[recipe.difficulty]
            )}
          >
            {recipe.difficulty}
          </span>
          <span className="text-xs px-3 py-1 rounded-full bg-white text-warm-800/60">
            ⏱️ {formatTime(recipe.prepTime + recipe.cookTime)}
          </span>
          <span className="text-xs px-3 py-1 rounded-full bg-white text-warm-800/60">
            💰 {formatPrice(recipe.estimatedCost)}
          </span>
          {recipe.calories && (
            <span className="text-xs px-3 py-1 rounded-full bg-white text-warm-800/60">
              🔥 {recipe.calories}kcal
            </span>
          )}
        </div>
      </div>

      <div className="px-4 -mt-4">
        {/* Tags */}
        {recipe.tags.length > 0 && (
          <div className="flex gap-1.5 flex-wrap mb-4">
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-1 rounded-lg bg-ice-50 text-ice-500"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Ingredients */}
        <div className="bg-white rounded-2xl border border-primary-100 p-4 mb-4">
          <h2 className="text-sm font-bold text-warm-800 mb-3">
            🥘 재료 ({recipe.servings}인분)
          </h2>
          <div className="space-y-2">
            {recipe.ingredients.map((ing) => (
              <div
                key={ing.ingredientId}
                className="flex items-center justify-between py-1 border-b border-primary-50 last:border-0"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "text-sm",
                      ing.optional ? "text-warm-800/40" : "text-warm-800"
                    )}
                  >
                    {ing.name}
                  </span>
                  {ing.optional && (
                    <span className="text-[10px] text-warm-800/30">선택</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-warm-800/50">{ing.amount}</span>
                  <AffiliateLink
                    href={`#coupang-${ing.ingredientId}`}
                    className="text-[10px] text-primary-400 hover:text-primary-500"
                  >
                    구매
                  </AffiliateLink>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="bg-white rounded-2xl border border-primary-100 p-4 mb-4">
          <h2 className="text-sm font-bold text-warm-800 mb-3">
            👨‍🍳 만드는 방법
          </h2>
          <ol className="space-y-4">
            {recipe.steps.map((step) => (
              <li key={step.order} className="flex gap-3">
                <span className="shrink-0 w-7 h-7 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center font-bold mt-0.5">
                  {step.order}
                </span>
                <div className="flex-1">
                  <p className="text-sm text-warm-800 leading-relaxed">
                    {step.instruction}
                  </p>
                  {step.duration && (
                    <span className="text-[10px] text-warm-800/30 mt-0.5 block">
                      ⏱️ {formatTime(step.duration)}
                    </span>
                  )}
                  {step.tip && (
                    <p className="text-xs text-primary-400 mt-1">
                      💡 {step.tip}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Freeze & Reheat Instructions */}
        {(recipe.freezeInstructions || recipe.reheatInstructions) && (
          <div className="bg-ice-50 rounded-2xl border border-ice-100 p-4 mb-4">
            <h2 className="text-sm font-bold text-warm-800 mb-3">
              🧊 냉동 & 해동 가이드
            </h2>
            {recipe.freezeInstructions && (
              <div className="mb-3">
                <h3 className="text-xs font-semibold text-ice-500 mb-1">
                  냉동 보관
                </h3>
                <p className="text-sm text-warm-800/70">
                  {recipe.freezeInstructions}
                </p>
              </div>
            )}
            {recipe.reheatInstructions && (
              <div>
                <h3 className="text-xs font-semibold text-ice-500 mb-1">
                  해동 & 데우기
                </h3>
                <p className="text-sm text-warm-800/70">
                  {recipe.reheatInstructions}
                </p>
              </div>
            )}
            {recipe.portionsYield && (
              <div className="mt-2 pt-2 border-t border-ice-200">
                <p className="text-xs text-ice-500">
                  📦 {recipe.portionsYield}인분 소분 가능
                </p>
              </div>
            )}
          </div>
        )}

        {/* Affiliate Disclosure */}
        <div className="text-center py-4">
          <p className="text-[9px] text-warm-800/20">
            이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의
            수수료를 제공받습니다
          </p>
        </div>
      </div>
    </main>
  );
}
