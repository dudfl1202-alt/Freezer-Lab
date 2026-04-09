"use client";

import { useState, useMemo, useEffect } from "react";
import { UserIngredient } from "@/types";
import { matchRecipes } from "@/lib/recipe-matcher";
import { getFromStorage, setToStorage } from "@/lib/storage";
import Header from "@/components/layout/header";
import BottomNav from "@/components/layout/bottom-nav";
import IngredientInput from "@/components/fridge/ingredient-input";
import RecipeCard from "@/components/shared/recipe-card";

export default function FridgePage() {
  const [ingredients, setIngredients] = useState<UserIngredient[]>([]);
  const [recipes, setRecipes] = useState<import("@/types").Recipe[] | null>(null);

  useEffect(() => {
    setIngredients(getFromStorage<UserIngredient[]>("fridge-ingredients", []));
    import("@/data/recipes").then(m => setRecipes(m.recipes));
  }, []);

  useEffect(() => {
    if (ingredients.length > 0) setToStorage("fridge-ingredients", ingredients);
  }, [ingredients]);

  const fridge = useMemo(() => recipes?.filter(r => r.mode.includes("fridge")) ?? [], [recipes]);
  const results = useMemo(() => matchRecipes(ingredients, fridge), [ingredients, fridge]);

  return (
    <>
      <Header />
      <main className="max-w-lg mx-auto px-5 pt-6 pb-24">
        <p className="text-[11px] text-t-caption uppercase tracking-wider mb-1">What&apos;s in your fridge?</p>
        <h1 className="font-serif text-[22px] font-bold text-t mb-5">냉장고 털기</h1>

        <div className="bg-surface rounded-2xl shadow-sm p-5 mb-8">
          <IngredientInput
            ingredients={ingredients}
            onAdd={i => setIngredients(prev => [...prev, i])}
            onRemove={n => setIngredients(prev => prev.filter(i => i.name !== n))}
          />
        </div>

        {ingredients.length === 0 ? (
          <p className="text-center text-[13px] text-t-disabled py-16">재료를 입력하면 레시피를 찾아드려요</p>
        ) : results.length === 0 ? (
          <p className="text-center text-[13px] text-t-disabled py-16">매칭되는 레시피가 없어요. 재료를 더 추가해보세요.</p>
        ) : (
          <>
            <div className="flex items-end justify-between mb-3">
              <h2 className="font-serif text-[18px] font-bold text-t">Recipes for You</h2>
              <span className="text-[12px] text-t-caption">{results.length}개</span>
            </div>
            <div className="space-y-2.5">
              {results.map(r => (
                <RecipeCard key={r.recipe.id} recipe={r.recipe} matchPercentage={r.matchPercentage}
                  missingIngredients={r.missingIngredients} missingSeasonings={r.missingSeasonings} />
              ))}
            </div>
          </>
        )}
      </main>
      <BottomNav />
    </>
  );
}
