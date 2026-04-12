/**
 * 냉동 밀프랩 레시피 통합 인덱스
 *
 * 구성:
 * - 가성비 50개 (mp-b-001 ~ mp-b-050) - 조리 후 냉동
 * - 다이어트 50개 (mp-d-001 ~ mp-d-050) - 조리 후 냉동
 * - 재료 소분 냉동형 8개 (mp-r-001 ~ mp-r-008) - 즉석 조리
 *
 * 모든 레시피는 weekly + fridge 모드로 제공됩니다.
 *
 * 예산 등급(budgetTier) 자동 부여 규칙:
 * - 1만원: estimatedCost ≤ 3500
 * - 2만원: estimatedCost ≤ 6000
 * - 3만원: estimatedCost  > 6000
 */

import { Recipe, FreezerCategory, BudgetTier, PrepStyle } from "@/types";
import { mpB1 } from "./recipes-mp-b1";
import { mpB2 } from "./recipes-mp-b2";
import { mpB3 } from "./recipes-mp-b3";
import { mpB4 } from "./recipes-mp-b4";
import { mpB5 } from "./recipes-mp-b5";
import { mpB6 } from "./recipes-mp-b6";
import { mpB7 } from "./recipes-mp-b7";
import { mpB8 } from "./recipes-mp-b8";
import { mpB9 } from "./recipes-mp-b9";
import { mpB10 } from "./recipes-mp-b10";
import { mpD1 } from "./recipes-mp-d1";
import { mpD2 } from "./recipes-mp-d2";
import { mpD3 } from "./recipes-mp-d3";
import { mpD4 } from "./recipes-mp-d4";
import { mpD5 } from "./recipes-mp-d5";
import { mpD6 } from "./recipes-mp-d6";
import { mpD7 } from "./recipes-mp-d7";
import { mpD8 } from "./recipes-mp-d8";
import { rawPrepRecipes } from "./recipes-mp-raw";

/** estimatedCost 기준으로 budgetTier 자동 추론 */
function inferBudgetTier(cost: number): BudgetTier {
  if (cost <= 3500) return "1만원";
  if (cost <= 6000) return "2만원";
  return "3만원";
}

/** 레시피에 prepStyle / budgetTier 기본값 자동 부여 */
function withDefaults(recipes: Recipe[], style: PrepStyle = "cooked"): Recipe[] {
  return recipes.map((r) => ({
    ...r,
    prepStyle: r.prepStyle ?? style,
    budgetTier: r.budgetTier ?? inferBudgetTier(r.estimatedCost),
  }));
}

// 카테고리별 레시피 풀
export const budgetMealprepRecipes: Recipe[] = withDefaults([
  ...mpB1,
  ...mpB2,
  ...mpB3,
  ...mpB4,
  ...mpB5,
  ...mpB6,
  ...mpB7,
  ...mpB8,
  ...mpB9,
  ...mpB10,
  ...rawPrepRecipes.filter((r) => r.freezerCategory === "가성비"),
]);

export const dietMealprepRecipes: Recipe[] = withDefaults([
  ...mpD1,
  ...mpD2,
  ...mpD3,
  ...mpD4,
  ...mpD5,
  ...mpD6,
  ...mpD7,
  ...mpD8,
  ...rawPrepRecipes.filter((r) => r.freezerCategory === "다이어트"),
]);

/** 전체 100+개 밀프랩 레시피 통합 풀 */
export const allMealprepRecipes: Recipe[] = [
  ...budgetMealprepRecipes,
  ...dietMealprepRecipes,
];

/** 카테고리로 필터 */
export function getMealprepRecipesByCategory(category: FreezerCategory): Recipe[] {
  if (category === "가성비") return budgetMealprepRecipes;
  return dietMealprepRecipes;
}

/** 예산 등급으로 필터 (스마트 장보기에서 사용) */
export function getMealprepRecipesByBudget(tier: BudgetTier): Recipe[] {
  return allMealprepRecipes.filter((r) => r.budgetTier === tier);
}

/** 카테고리 + 예산 등급 + 조리방식 복합 필터 */
export function filterMealprepRecipes(opts: {
  category?: FreezerCategory;
  tier?: BudgetTier;
  prepStyle?: PrepStyle;
}): Recipe[] {
  return allMealprepRecipes.filter((r) => {
    if (opts.category && r.freezerCategory !== opts.category) return false;
    if (opts.tier && r.budgetTier !== opts.tier) return false;
    if (opts.prepStyle && r.prepStyle !== opts.prepStyle) return false;
    return true;
  });
}

/** ID로 레시피 조회 */
export function findMealprepRecipe(id: string): Recipe | undefined {
  return allMealprepRecipes.find((r) => r.id === id);
}

export const mealprepStats = {
  total: allMealprepRecipes.length,
  budget: budgetMealprepRecipes.length,
  diet: dietMealprepRecipes.length,
  cooked: allMealprepRecipes.filter((r) => r.prepStyle === "cooked").length,
  raw: allMealprepRecipes.filter((r) => r.prepStyle === "raw").length,
  byTier: {
    "1만원": allMealprepRecipes.filter((r) => r.budgetTier === "1만원").length,
    "2만원": allMealprepRecipes.filter((r) => r.budgetTier === "2만원").length,
    "3만원": allMealprepRecipes.filter((r) => r.budgetTier === "3만원").length,
  },
};
