import { Recipe, UserIngredient, ScoredRecipe } from "@/types";

const ALIASES: Record<string, string[]> = {
  파: ["대파", "파"],
  대파: ["파", "대파"],
  고기: ["돼지고기 다짐육", "소고기 다짐육", "삼겹살"],
  다짐육: ["돼지고기 다짐육", "소고기 다짐육"],
};

function normalizeIngredientName(name: string): string {
  return name.trim().replace(/\s+/g, " ");
}

function ingredientMatches(userInput: string, recipeName: string): boolean {
  const normalized = normalizeIngredientName(userInput);
  const target = normalizeIngredientName(recipeName);

  if (target.includes(normalized) || normalized.includes(target)) return true;

  const aliases = ALIASES[normalized];
  if (aliases) {
    return aliases.some(
      (alias) => target.includes(alias) || alias.includes(target)
    );
  }

  return false;
}

export function matchRecipes(
  userIngredients: UserIngredient[],
  allRecipes: Recipe[]
): ScoredRecipe[] {
  if (userIngredients.length === 0) return [];

  const results: ScoredRecipe[] = [];

  for (const recipe of allRecipes) {
    const requiredIngredients = recipe.ingredients.filter((i) => !i.optional);
    let matchedCount = 0;
    const missingIngredients: string[] = [];

    for (const ri of requiredIngredients) {
      const matched = userIngredients.some((ui) =>
        ingredientMatches(ui.name, ri.name)
      );
      if (matched) {
        matchedCount++;
      } else {
        missingIngredients.push(ri.name);
      }
    }

    const totalRequired = requiredIngredients.length;
    const matchPercentage =
      totalRequired > 0 ? Math.round((matchedCount / totalRequired) * 100) : 0;

    if (matchPercentage >= 30) {
      results.push({
        recipe,
        matchedCount,
        totalRequired,
        matchPercentage,
        missingIngredients,
      });
    }
  }

  return results.sort((a, b) => {
    if (b.matchPercentage !== a.matchPercentage)
      return b.matchPercentage - a.matchPercentage;
    return a.missingIngredients.length - b.missingIngredients.length;
  });
}
