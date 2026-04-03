import { Recipe, UserIngredient, ScoredRecipe } from "@/types";

const ALIASES: Record<string, string[]> = {
  파: ["대파", "파"],
  대파: ["파", "대파"],
  고기: ["돼지고기 다짐육", "소고기 다짐육", "삼겹살"],
  다짐육: ["돼지고기 다짐육", "소고기 다짐육"],
};

// 기본 양념류 - 대부분의 자취생이 이미 갖고 있는 것들
const BASIC_SEASONINGS = new Set([
  "간장", "고추장", "된장", "참기름", "설탕", "소금", "후추",
  "식용유", "마요네즈", "맛술", "굴소스",
]);

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

function isSeasoning(ingredientName: string): boolean {
  return BASIC_SEASONINGS.has(ingredientName);
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
    const missingSeasonings: string[] = [];

    for (const ri of requiredIngredients) {
      const matched = userIngredients.some((ui) =>
        ingredientMatches(ui.name, ri.name)
      );
      if (matched) {
        matchedCount++;
      } else if (isSeasoning(ri.name)) {
        missingSeasonings.push(ri.name);
      } else {
        missingIngredients.push(ri.name);
      }
    }

    // 메인 재료(양념 제외) 중 매칭률 계산
    const mainIngredients = requiredIngredients.filter(
      (ri) => !isSeasoning(ri.name)
    );
    const mainMatched = mainIngredients.filter((ri) =>
      userIngredients.some((ui) => ingredientMatches(ui.name, ri.name))
    ).length;
    const mainTotal = mainIngredients.length;

    // 메인 재료 1개라도 매치되면 추천 (양념은 "이것만 있으면 OK" 형태로 안내)
    const mainMatchPercentage =
      mainTotal > 0 ? Math.round((mainMatched / mainTotal) * 100) : 0;

    if (mainMatched >= 1) {
      const totalRequired = requiredIngredients.length;
      const matchPercentage =
        totalRequired > 0
          ? Math.round((matchedCount / totalRequired) * 100)
          : 0;

      results.push({
        recipe,
        matchedCount,
        totalRequired,
        matchPercentage,
        missingIngredients,
        missingSeasonings,
        mainMatchPercentage,
      });
    }
  }

  return results.sort((a, b) => {
    // 메인 재료 매칭률 우선, 같으면 부족한 재료 적은 순
    if (b.mainMatchPercentage !== a.mainMatchPercentage)
      return b.mainMatchPercentage - a.mainMatchPercentage;
    if (b.matchPercentage !== a.matchPercentage)
      return b.matchPercentage - a.matchPercentage;
    return a.missingIngredients.length - b.missingIngredients.length;
  });
}
