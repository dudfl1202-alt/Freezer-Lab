"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Recipe } from "@/types";
import { formatPrice, formatTime } from "@/lib/utils";
import AffiliateLink from "@/components/shared/affiliate-link";

const difficultyStyle = {
  쉬움: "bg-success-light text-success",
  보통: "bg-primary-light text-primary",
  어려움: "bg-accent-light text-accent",
};

export default function RecipeDetailPage() {
  const params = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    import("@/data/recipes").then((m) => {
      setRecipe(m.recipes.find((r: Recipe) => r.id === params.id) ?? null);
    });
  }, [params.id]);

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <main className="max-w-lg mx-auto pb-12">
      {/* Hero */}
      <div className="bg-primary-light pt-4 pb-10 px-4">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-t-sub hover:text-primary mb-4 transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          돌아가기
        </Link>
        <div className="text-center">
          <span className="text-5xl block mb-3">{recipe.imageEmoji}</span>
          <h1 className="text-xl font-bold text-t">{recipe.title}</h1>
          <p className="text-sm text-t-sub mt-1 max-w-xs mx-auto">{recipe.description}</p>
          <div className="flex justify-center gap-1.5 mt-3 flex-wrap">
            <span className={`chip ${difficultyStyle[recipe.difficulty]}`}>{recipe.difficulty}</span>
            <span className="chip bg-surface text-t-hint">{formatTime(recipe.prepTime + recipe.cookTime)}</span>
            <span className="chip bg-surface text-t-hint">{formatPrice(recipe.estimatedCost)}</span>
            {recipe.calories && <span className="chip bg-surface text-t-hint">{recipe.calories}kcal</span>}
          </div>
        </div>
      </div>

      <div className="px-4 -mt-5 space-y-4">
        {/* Ingredients */}
        <div className="card p-4">
          <p className="section-title mb-3">재료 ({recipe.servings}인분)</p>
          <div className="space-y-2">
            {recipe.ingredients.map((ing) => (
              <div key={ing.ingredientId} className="flex items-center justify-between py-1 border-b border-border last:border-0">
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${ing.optional ? "text-t-hint" : "text-t"}`}>{ing.name}</span>
                  {ing.optional && <span className="text-[10px] text-t-disabled bg-bg px-1.5 py-0.5 rounded">선택</span>}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-t-sub">{ing.amount}</span>
                  <AffiliateLink href={`#coupang-${ing.ingredientId}`} className="text-[10px] text-primary hover:text-primary-dark transition-colors">
                    구매
                  </AffiliateLink>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="card p-4">
          <p className="section-title mb-3">만드는 방법</p>
          <ol className="space-y-4">
            {recipe.steps.map((step) => (
              <li key={step.order} className="flex gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold mt-0.5">
                  {step.order}
                </span>
                <div className="flex-1">
                  <p className="text-sm text-t leading-relaxed">{step.instruction}</p>
                  {step.duration && <span className="text-[10px] text-t-disabled mt-0.5 block">{formatTime(step.duration)}</span>}
                  {step.tip && <p className="text-xs text-primary mt-1 bg-primary-light rounded-lg px-2.5 py-1.5">{step.tip}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Freeze Guide */}
        {(recipe.freezeInstructions || recipe.reheatInstructions) && (
          <div className="card p-4 border-info/20 bg-info-light">
            <p className="section-title mb-3">냉동 & 해동 가이드</p>
            {recipe.freezeInstructions && (
              <div className="mb-2.5">
                <p className="text-xs font-semibold text-info mb-1">냉동 보관</p>
                <p className="text-sm text-t-sub">{recipe.freezeInstructions}</p>
              </div>
            )}
            {recipe.reheatInstructions && (
              <div>
                <p className="text-xs font-semibold text-info mb-1">해동 & 데우기</p>
                <p className="text-sm text-t-sub">{recipe.reheatInstructions}</p>
              </div>
            )}
            {recipe.portionsYield && (
              <div className="mt-2.5 pt-2.5 border-t border-info/10">
                <p className="text-xs text-info font-medium">{recipe.portionsYield}인분 소분 가능</p>
              </div>
            )}
          </div>
        )}

        <p className="text-[9px] text-t-disabled text-center pt-2 pb-4">
          쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다
        </p>
      </div>
    </main>
  );
}
