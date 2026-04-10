"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Recipe } from "@/types";
import { formatPrice, formatTime } from "@/lib/utils";
import AffiliateLink from "@/components/shared/affiliate-link";
import AffiliateDisclosure from "@/components/shared/affiliate-disclosure";
import { FreezerTrackerButton } from "@/components/freezer/freezer-tracker";

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
      <div className="w-5 h-5 rounded-full border-2 border-olive border-t-transparent animate-spin" />
    </div>
  );

  return (
    <main className="max-w-lg mx-auto pb-12">
      {/* 상단 */}
      <div className="pt-4 pb-8 px-5">
        <Link href="/" className="text-[13px] text-t-caption inline-block mb-8">
          Back
        </Link>
        <p className="text-[11px] text-t-caption uppercase tracking-wider mb-1">Recipe</p>
        <h1 className="font-serif text-[24px] font-bold text-t leading-snug">{recipe.title}</h1>
        <p className="text-[13px] text-t-sub mt-2 leading-relaxed">{recipe.description}</p>
        <div className="flex gap-4 mt-3">
          <span className={`text-[12px] font-semibold ${
            recipe.difficulty === "쉬움" ? "text-olive" : recipe.difficulty === "보통" ? "text-sand" : "text-t-sub"
          }`}>{recipe.difficulty}</span>
          <span className="text-[12px] text-t-caption">{formatTime(recipe.prepTime + recipe.cookTime)}</span>
          <span className="text-[12px] text-t-caption">{formatPrice(recipe.estimatedCost)}</span>
          {recipe.calories && <span className="text-[12px] text-t-caption">{recipe.calories}kcal</span>}
        </div>
      </div>

      <div className="px-5 space-y-6">
        {/* 쿠팡 파트너스 공지 */}
        <AffiliateDisclosure variant="prominent" />

        {/* 재료 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] text-t-caption uppercase tracking-wider">Ingredients · {recipe.servings}인분</p>
            <p className="text-[10px] text-t-disabled">* 가격 변동 있음</p>
          </div>
          <div className="bg-surface rounded-2xl shadow-sm p-5">
            {recipe.ingredients.map(ing => (
              <div key={ing.ingredientId} className="flex items-center justify-between py-2.5 border-b border-line last:border-0">
                <div>
                  <span className={`text-[13px] ${ing.optional ? "text-t-caption" : "text-t"}`}>{ing.name}</span>
                  {ing.optional && <span className="text-[10px] text-t-disabled ml-1">선택</span>}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-t-sub">{ing.amount}</span>
                  <AffiliateLink keyword={ing.name} className="text-[11px] text-olive font-semibold">구매</AffiliateLink>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 만드는 방법 */}
        <div>
          <p className="text-[11px] text-t-caption uppercase tracking-wider mb-3">Directions</p>
          <div className="bg-surface rounded-2xl shadow-sm p-5">
            <ol className="space-y-5">
              {recipe.steps.map(step => (
                <li key={step.order} className="flex gap-3">
                  <span className="text-[13px] font-semibold text-olive shrink-0 w-5 mt-px">{step.order}.</span>
                  <div>
                    <p className="text-[13px] text-t leading-[1.7]">{step.instruction}</p>
                    {step.duration && <span className="text-[11px] text-t-caption mt-0.5 block">{formatTime(step.duration)}</span>}
                    {step.tip && (
                      <div className="mt-2 bg-sand-light rounded-xl px-3 py-2">
                        <p className="text-[12px] text-sand">{step.tip}</p>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* 냉동 보관 시작 */}
        <FreezerTrackerButton recipeId={recipe.id} recipeName={recipe.title} />

        {/* 냉동 가이드 */}
        {(recipe.freezeInstructions || recipe.reheatInstructions) && (
          <div>
            <p className="text-[11px] text-t-caption uppercase tracking-wider mb-3">Freeze & Reheat</p>
            <div className="bg-olive-light rounded-2xl p-5">
              {recipe.freezeInstructions && (
                <div className="mb-3">
                  <p className="text-[12px] font-semibold text-olive mb-0.5">냉동 보관</p>
                  <p className="text-[13px] text-t-sub leading-relaxed">{recipe.freezeInstructions}</p>
                </div>
              )}
              {recipe.reheatInstructions && (
                <div>
                  <p className="text-[12px] font-semibold text-olive mb-0.5">해동 & 데우기</p>
                  <p className="text-[13px] text-t-sub leading-relaxed">{recipe.reheatInstructions}</p>
                </div>
              )}
              {recipe.portionsYield && (
                <p className="text-[12px] text-olive font-medium mt-3 pt-3 border-t border-olive-muted/30">
                  {recipe.portionsYield}인분 소분 가능
                </p>
              )}
            </div>
          </div>
        )}

        <AffiliateDisclosure variant="inline" className="text-center pt-4 pb-4" />
      </div>
    </main>
  );
}
