"use client";

import { useState, useMemo, useEffect } from "react";
import { UserIngredient } from "@/types";
import { matchRecipes } from "@/lib/recipe-matcher";
import { getFromStorage, setToStorage } from "@/lib/storage";
import Header from "@/components/layout/header";
import BottomNav from "@/components/layout/bottom-nav";
import IngredientInput from "@/components/fridge/ingredient-input";
import RecipeCard from "@/components/shared/recipe-card";
import Mascot from "@/components/shared/mascot";

export default function FridgePage() {
  const [ingredients, setIngredients] = useState<UserIngredient[]>([]);
  const [recipesData, setRecipesData] = useState<import("@/types").Recipe[] | null>(null);

  useEffect(() => {
    const saved = getFromStorage<UserIngredient[]>("fridge-ingredients", []);
    setIngredients(saved);
    import("@/data/recipes").then((m) => setRecipesData(m.recipes));
  }, []);

  useEffect(() => {
    if (ingredients.length > 0) setToStorage("fridge-ingredients", ingredients);
  }, [ingredients]);

  const fridgeRecipes = useMemo(
    () => recipesData?.filter((r) => r.mode.includes("fridge")) ?? [],
    [recipesData]
  );
  const results = useMemo(
    () => matchRecipes(ingredients, fridgeRecipes),
    [ingredients, fridgeRecipes]
  );

  return (
    <>
      <Header />
      <main className="max-w-lg mx-auto px-4 pt-5 pb-24">
        <div className="mb-5">
          <h1 className="text-lg font-bold text-t">냉장고 털기</h1>
          <p className="text-sm text-t-hint mt-0.5">
            있는 재료를 입력하면 만들 수 있는 레시피를 찾아드려요
          </p>
        </div>

        <IngredientInput
          ingredients={ingredients}
          onAdd={(ing) => setIngredients((prev) => [...prev, ing])}
          onRemove={(name) => setIngredients((prev) => prev.filter((i) => i.name !== name))}
        />

        <div className="mt-6">
          {ingredients.length === 0 ? (
            <div className="text-center py-14">
              <Mascot size={56} className="mx-auto mb-3 opacity-40" />
              <p className="text-sm text-t-hint">재료를 입력해보세요</p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-14">
              <Mascot size={56} className="mx-auto mb-3 opacity-40" />
              <p className="text-sm text-t-hint">매칭되는 레시피가 없어요</p>
              <p className="text-xs text-t-disabled mt-1">재료를 더 추가해보세요</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-3">
                <span className="section-title">추천 레시피</span>
                <span className="chip bg-bg text-t-hint">{results.length}개</span>
              </div>
              <div className="space-y-2.5">
                {results.map((r) => (
                  <RecipeCard
                    key={r.recipe.id}
                    recipe={r.recipe}
                    matchPercentage={r.matchPercentage}
                    missingIngredients={r.missingIngredients}
                    missingSeasonings={r.missingSeasonings}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <BottomNav />
    </>
  );
}
