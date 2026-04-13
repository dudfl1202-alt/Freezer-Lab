"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Recipe } from "@/types";
import { formatPrice, formatTime } from "@/lib/utils";
import AffiliateLink from "@/components/shared/affiliate-link";
import AffiliateDisclosure from "@/components/shared/affiliate-disclosure";
import { FreezerTrackerButton } from "@/components/freezer/freezer-tracker";
import { getRecipeTone } from "@/lib/recipe-tone";
import RecipeImage from "@/components/shared/recipe-image";

export default function RecipeDetailPage() {
  const params = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    Promise.all([
      import("@/data/recipes"),
      import("@/data/recipes-mealprep"),
    ]).then(([base, mealprep]) => {
      const id = params.id as string;
      const found =
        mealprep.allMealprepRecipes.find((r: Recipe) => r.id === id) ??
        base.recipes.find((r: Recipe) => r.id === id) ??
        null;
      setRecipe(found);
    });
  }, [params.id]);

  if (!recipe) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-5 h-5 rounded-full border-2 border-olive border-t-transparent animate-spin" />
    </div>
  );

  const tone = getRecipeTone(recipe);

  return (
    <main className="max-w-lg mx-auto pb-12">
      {/* 히어로 이미지 (있을 때만) */}
      {recipe.imageUrl && (
        <RecipeImage recipe={recipe} variant="detail" className="rounded-none" />
      )}

      {/* 컬러 헤더 */}
      <header
        className="px-5 pt-4 pb-10"
        style={{ background: recipe.imageUrl ? undefined : tone.blockBg }}
      >
        <Link
          href="/"
          className="text-[13px] inline-block mb-6 font-medium"
          style={{ color: recipe.imageUrl ? "#6B6B60" : tone.blockText }}
        >
          ← Back
        </Link>
        <p
          className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2"
          style={{ color: tone.blockText }}
        >
          {tone.categoryLabel}
          {tone.subLabel && (
            <span className="ml-1.5 font-medium opacity-70 normal-case tracking-normal">
              · {tone.subLabel}
            </span>
          )}
        </p>
        <h1 className="font-serif text-[26px] font-bold text-t leading-tight">
          {recipe.title}
        </h1>
        <p className="text-[13px] text-t-sub mt-2 leading-relaxed">
          {recipe.description}
        </p>
        <div className="flex items-center gap-3 mt-5">
          <div>
            <p className="text-[9px] text-t-caption uppercase tracking-wider">Cost</p>
            <p
              className="text-[16px] font-bold tracking-tight"
              style={{ color: tone.blockText }}
            >
              {formatPrice(recipe.estimatedCost)}
            </p>
          </div>
          <div className="w-px h-7 bg-line-bold" />
          <div>
            <p className="text-[9px] text-t-caption uppercase tracking-wider">Time</p>
            <p className="text-[16px] font-bold text-t tracking-tight">
              {formatTime(recipe.prepTime + recipe.cookTime)}
            </p>
          </div>
          {recipe.calories && (
            <>
              <div className="w-px h-7 bg-line-bold" />
              <div>
                <p className="text-[9px] text-t-caption uppercase tracking-wider">
                  Cal
                </p>
                <p className="text-[16px] font-bold text-t tracking-tight">
                  {recipe.calories}
                </p>
              </div>
            </>
          )}
          <div className="w-px h-7 bg-line-bold" />
          <div>
            <p className="text-[9px] text-t-caption uppercase tracking-wider">
              Level
            </p>
            <p className="text-[16px] font-bold text-t tracking-tight">
              {recipe.difficulty}
            </p>
          </div>
        </div>
      </header>

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
