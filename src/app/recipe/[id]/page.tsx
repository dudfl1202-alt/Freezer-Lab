"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Recipe } from "@/types";
import { formatPrice, formatTime } from "@/lib/utils";
import AffiliateLink from "@/components/shared/affiliate-link";
import Mascot from "@/components/shared/mascot";

const difficultyStyle = {
  쉬움: "bg-mint-100 text-mint-600",
  보통: "bg-lavender-100 text-lavender-600",
  어려움: "bg-pink-100 text-pink-600",
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
          <Mascot size={80} expression="thinking" className="mx-auto mb-3" />
          <p className="text-sm text-txt-muted">레시피를 찾는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-lg mx-auto pb-12">
      {/* Hero */}
      <div className="bg-gradient-to-br from-lavender-50 via-pink-50 to-peach-50 pt-4 pb-8 px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-txt-muted hover:text-lavender-500 mb-4 transition-colors"
        >
          &#8592; 돌아가기
        </Link>
        <div className="text-center">
          <span className="text-6xl">{recipe.imageEmoji}</span>
          <h1 className="text-2xl font-bold text-txt-primary mt-3">
            {recipe.title}
          </h1>
          <p className="text-sm text-txt-muted mt-1">{recipe.description}</p>
        </div>
        <div className="flex justify-center gap-2 mt-4 flex-wrap">
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${difficultyStyle[recipe.difficulty]}`}
          >
            {recipe.difficulty}
          </span>
          <span className="text-xs px-3 py-1 rounded-full bg-white/80 text-txt-muted">
            &#9201; {formatTime(recipe.prepTime + recipe.cookTime)}
          </span>
          <span className="text-xs px-3 py-1 rounded-full bg-white/80 text-txt-muted">
            &#128176; {formatPrice(recipe.estimatedCost)}
          </span>
          {recipe.calories && (
            <span className="text-xs px-3 py-1 rounded-full bg-white/80 text-txt-muted">
              &#128293; {recipe.calories}kcal
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
                className="text-[10px] px-2 py-1 rounded-full bg-lavender-50 text-lavender-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Ingredients */}
        <div className="bg-white rounded-3xl border border-lavender-100 p-4 mb-4 shadow-cute">
          <h2 className="text-sm font-bold text-txt-primary mb-3">
            &#129379; 재료 ({recipe.servings}인분)
          </h2>
          <div className="space-y-2">
            {recipe.ingredients.map((ing) => (
              <div
                key={ing.ingredientId}
                className="flex items-center justify-between py-1 border-b border-lavender-50 last:border-0"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm ${ing.optional ? "text-txt-light" : "text-txt-primary"}`}
                  >
                    {ing.name}
                  </span>
                  {ing.optional && (
                    <span className="text-[10px] text-txt-light bg-cream-200 px-1.5 py-0.5 rounded-full">선택</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-txt-muted">{ing.amount}</span>
                  <AffiliateLink
                    href={`#coupang-${ing.ingredientId}`}
                    className="text-[10px] text-lavender-400 hover:text-pink-500 transition-colors"
                  >
                    구매
                  </AffiliateLink>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="bg-white rounded-3xl border border-lavender-100 p-4 mb-4 shadow-cute">
          <h2 className="text-sm font-bold text-txt-primary mb-3">
            &#128104;&#8205;&#127859; 만드는 방법
          </h2>
          <ol className="space-y-4">
            {recipe.steps.map((step) => (
              <li key={step.order} className="flex gap-3">
                <span className="shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-lavender-400 to-pink-400 text-white text-xs flex items-center justify-center font-bold mt-0.5">
                  {step.order}
                </span>
                <div className="flex-1">
                  <p className="text-sm text-txt-primary leading-relaxed">
                    {step.instruction}
                  </p>
                  {step.duration && (
                    <span className="text-[10px] text-txt-light mt-0.5 block">
                      &#9201; {formatTime(step.duration)}
                    </span>
                  )}
                  {step.tip && (
                    <p className="text-xs text-lavender-400 mt-1">
                      &#128161; {step.tip}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Freeze & Reheat Instructions */}
        {(recipe.freezeInstructions || recipe.reheatInstructions) && (
          <div className="bg-gradient-to-br from-sky-50 to-lavender-50 rounded-3xl border border-sky-100 p-4 mb-4">
            <h2 className="text-sm font-bold text-txt-primary mb-3">
              &#129482; 냉동 & 해동 가이드
            </h2>
            {recipe.freezeInstructions && (
              <div className="mb-3">
                <h3 className="text-xs font-semibold text-sky-500 mb-1">
                  냉동 보관
                </h3>
                <p className="text-sm text-txt-secondary">
                  {recipe.freezeInstructions}
                </p>
              </div>
            )}
            {recipe.reheatInstructions && (
              <div>
                <h3 className="text-xs font-semibold text-sky-500 mb-1">
                  해동 & 데우기
                </h3>
                <p className="text-sm text-txt-secondary">
                  {recipe.reheatInstructions}
                </p>
              </div>
            )}
            {recipe.portionsYield && (
              <div className="mt-2 pt-2 border-t border-sky-100">
                <p className="text-xs text-sky-500">
                  &#128230; {recipe.portionsYield}인분 소분 가능
                </p>
              </div>
            )}
          </div>
        )}

        {/* Affiliate Disclosure */}
        <div className="text-center py-4">
          <p className="text-[9px] text-txt-light">
            이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의
            수수료를 제공받습니다
          </p>
        </div>
      </div>
    </main>
  );
}
