/**
 * 냉동 밀프랩 레시피 100개 통합 인덱스
 *
 * - 가성비 50개 (mp-b-001 ~ mp-b-050)
 * - 다이어트 50개 (mp-d-001 ~ mp-d-050)
 *
 * 모든 레시피는 냉동 보관 가능하며 weekly + fridge 모드로 제공됩니다.
 */

import { Recipe, FreezerCategory } from "@/types";
import { mpB1 } from "./recipes-mp-b1";
import { mpB2 } from "./recipes-mp-b2";
import { mpB3 } from "./recipes-mp-b3";
import { mpB4 } from "./recipes-mp-b4";
import { mpB5 } from "./recipes-mp-b5";
import { mpD1 } from "./recipes-mp-d1";
import { mpD2 } from "./recipes-mp-d2";
import { mpD3 } from "./recipes-mp-d3";
import { mpD4 } from "./recipes-mp-d4";
import { mpD5 } from "./recipes-mp-d5";

export const budgetMealprepRecipes: Recipe[] = [
  ...mpB1,
  ...mpB2,
  ...mpB3,
  ...mpB4,
  ...mpB5,
];

export const dietMealprepRecipes: Recipe[] = [
  ...mpD1,
  ...mpD2,
  ...mpD3,
  ...mpD4,
  ...mpD5,
];

export const allMealprepRecipes: Recipe[] = [
  ...budgetMealprepRecipes,
  ...dietMealprepRecipes,
];

export function getMealprepRecipesByCategory(
  category: FreezerCategory
): Recipe[] {
  if (category === "가성비") return budgetMealprepRecipes;
  return dietMealprepRecipes;
}

export const mealprepStats = {
  total: allMealprepRecipes.length,
  budget: budgetMealprepRecipes.length,
  diet: dietMealprepRecipes.length,
};
