"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Recipe } from "@/types";
import { formatPrice, formatTime } from "@/lib/utils";
import AffiliateLink from "@/components/shared/affiliate-link";

export default function RecipeDetailPage() {
  const params = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    import("@/data/recipes").then(m => {
      setRecipe(m.recipes.find((r: Recipe) => r.id === params.id) ?? null);
    });
  }, [params.id]);

  if (!recipe) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-5 h-5 rounded-full border-2 border-main border-t-transparent animate-spin" />
    </div>
  );

  return (
    <main className="max-w-lg mx-auto pb-12">
      {/* 헤더 */}
      <div className="bg-main-light pt-4 pb-10 px-5 rounded-b-[28px]">
        <Link href="/" className="inline-flex items-center gap-1 text-[13px] text-t-sub mb-5">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8l4 4" stroke="#6B7684" strokeWidth="1.5" strokeLinecap="round" /></svg>
          돌아가기
        </Link>
        <div className="text-center">
          <span className="text-5xl block mb-2">{recipe.imageEmoji}</span>
          <h1 className="text-[20px] font-bold text-t">{recipe.title}</h1>
          <p className="text-[13px] text-t-sub mt-1">{recipe.description}</p>
          <div className="flex justify-center gap-1.5 mt-3">
            <span className={`text-[11px] px-2 py-1 rounded-full font-medium ${
              recipe.difficulty === "쉬움" ? "bg-main/10 text-main" : recipe.difficulty === "보통" ? "bg-line-bold text-t-sub" : "bg-sub-light text-sub"
            }`}>{recipe.difficulty}</span>
            <span className="text-[11px] px-2 py-1 rounded-full bg-surface text-t-caption">{formatTime(recipe.prepTime + recipe.cookTime)}</span>
            <span className="text-[11px] px-2 py-1 rounded-full bg-surface text-t-caption">{formatPrice(recipe.estimatedCost)}</span>
            {recipe.calories && <span className="text-[11px] px-2 py-1 rounded-full bg-surface text-t-caption">{recipe.calories}kcal</span>}
          </div>
        </div>
      </div>

      <div className="px-5 -mt-5 space-y-3">
        {/* 재료 */}
        <div className="bg-surface rounded-2xl p-4 shadow-card">
          <p className="text-[14px] font-bold text-t mb-3">재료 <span className="text-t-caption font-normal">({recipe.servings}인분)</span></p>
          {recipe.ingredients.map(ing => (
            <div key={ing.ingredientId} className="flex items-center justify-between py-2 border-b border-line last:border-0">
              <div className="flex items-center gap-1.5">
                <span className={`text-[13px] ${ing.optional ? "text-t-caption" : "text-t"}`}>{ing.name}</span>
                {ing.optional && <span className="text-[10px] text-t-disabled bg-line px-1.5 py-0.5 rounded">선택</span>}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-t-sub">{ing.amount}</span>
                <AffiliateLink href={`#coupang-${ing.ingredientId}`} className="text-[11px] text-main font-medium">구매</AffiliateLink>
              </div>
            </div>
          ))}
        </div>

        {/* 만드는 방법 */}
        <div className="bg-surface rounded-2xl p-4 shadow-card">
          <p className="text-[14px] font-bold text-t mb-3">만드는 방법</p>
          <ol className="space-y-4">
            {recipe.steps.map(step => (
              <li key={step.order} className="flex gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-main text-white text-[10px] flex items-center justify-center font-bold mt-0.5">{step.order}</span>
                <div className="flex-1">
                  <p className="text-[13px] text-t leading-relaxed">{step.instruction}</p>
                  {step.duration && <span className="text-[11px] text-t-disabled mt-0.5 block">{formatTime(step.duration)}</span>}
                  {step.tip && <p className="text-[12px] text-main mt-1.5 bg-main-50 rounded-lg px-3 py-2">{step.tip}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* 냉동 가이드 */}
        {(recipe.freezeInstructions || recipe.reheatInstructions) && (
          <div className="bg-main-50 rounded-2xl p-4 border border-main-light">
            <p className="text-[14px] font-bold text-t mb-3">냉동 & 해동 가이드</p>
            {recipe.freezeInstructions && (
              <div className="mb-2">
                <p className="text-[12px] font-semibold text-main mb-0.5">냉동 보관</p>
                <p className="text-[13px] text-t-sub">{recipe.freezeInstructions}</p>
              </div>
            )}
            {recipe.reheatInstructions && (
              <div>
                <p className="text-[12px] font-semibold text-main mb-0.5">해동 & 데우기</p>
                <p className="text-[13px] text-t-sub">{recipe.reheatInstructions}</p>
              </div>
            )}
            {recipe.portionsYield && (
              <p className="text-[12px] text-main font-medium mt-2 pt-2 border-t border-main-light">{recipe.portionsYield}인분 소분 가능</p>
            )}
          </div>
        )}

        <p className="text-[9px] text-t-disabled text-center py-4">
          쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다
        </p>
      </div>
    </main>
  );
}
