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
  const [recipesData, setRecipesData] = useState<
    import("@/types").Recipe[] | null
  >(null);

  useEffect(() => {
    const saved = getFromStorage<UserIngredient[]>("fridge-ingredients", []);
    setIngredients(saved);
    import("@/data/recipes").then((m) => setRecipesData(m.recipes));
  }, []);

  useEffect(() => {
    if (ingredients.length > 0) {
      setToStorage("fridge-ingredients", ingredients);
    }
  }, [ingredients]);

  const fridgeRecipes = useMemo(
    () => recipesData?.filter((r) => r.mode.includes("fridge")) ?? [],
    [recipesData]
  );

  const results = useMemo(
    () => matchRecipes(ingredients, fridgeRecipes),
    [ingredients, fridgeRecipes]
  );

  const handleAdd = (ingredient: UserIngredient) => {
    setIngredients((prev) => [...prev, ingredient]);
  };

  const handleRemove = (name: string) => {
    setIngredients((prev) => prev.filter((i) => i.name !== name));
  };

  return (
    <>
      <Header />
      <main className="max-w-lg mx-auto px-4 pt-6 pb-24">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-txt-primary mb-1">
            &#127805; 냉장고 털기
          </h1>
          <p className="text-sm text-txt-muted">
            냉장고에 있는 재료를 입력하면 레시피를 찾아줄게요!
          </p>
        </div>

        <IngredientInput
          ingredients={ingredients}
          onAdd={handleAdd}
          onRemove={handleRemove}
        />

        {/* Results */}
        <div className="mt-8">
          {ingredients.length === 0 ? (
            <div className="text-center py-12">
              <Mascot size={80} expression="thinking" className="mx-auto mb-3" />
              <p className="text-sm text-txt-muted">
                재료를 입력하면 레시피를 추천해줄게요!
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12">
              <Mascot size={80} expression="thinking" className="mx-auto mb-3" />
              <p className="text-sm text-txt-muted">
                이 재료로 만들 수 있는 레시피가 없어요
              </p>
              <p className="text-xs text-txt-light mt-1">
                재료를 더 추가해보세요!
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-txt-primary">
                  &#10024; 추천 레시피
                </h2>
                <span className="text-xs text-txt-light bg-lavender-50 px-2 py-0.5 rounded-full">
                  {results.length}개
                </span>
              </div>
              <div className="space-y-3">
                {results.map((result) => (
                  <RecipeCard
                    key={result.recipe.id}
                    recipe={result.recipe}
                    matchPercentage={result.matchPercentage}
                    missingIngredients={result.missingIngredients}
                    missingSeasonings={result.missingSeasonings}
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
