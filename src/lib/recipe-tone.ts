import { Recipe, FreezerCategory, PrepStyle } from "@/types";

/**
 * 레시피 카테고리/스타일에 따른 카드 톤 (배경/포인트 컬러)
 * 사진 대신 컬러 + 타이포그래피로 카드를 구분하기 위한 디자인 시스템
 */
export interface RecipeTone {
  /** 좌측 컬러 블록 배경 */
  blockBg: string;
  /** 좌측 컬러 블록의 라벨 텍스트 색상 */
  blockText: string;
  /** 카테고리 라벨 텍스트 (가성비/다이어트/재료냉동) */
  categoryLabel: string;
  /** 카테고리 라벨 아래 부가 라벨 (예: 조리 방식) */
  subLabel?: string;
}

const TONE_BUDGET: RecipeTone = {
  blockBg: "#EEF2EC", // olive light
  blockText: "#4A5D4A", // olive
  categoryLabel: "가성비",
};

const TONE_DIET: RecipeTone = {
  blockBg: "#F5F0E8", // sand light
  blockText: "#8A6A3C", // sand dark
  categoryLabel: "다이어트",
};

const TONE_RAW: RecipeTone = {
  blockBg: "#F0F7FF", // ice light
  blockText: "#3B82C4", // ice
  categoryLabel: "재료 냉동",
  subLabel: "끓는 물에 즉석 조리",
};

const TONE_DEFAULT: RecipeTone = {
  blockBg: "#F5F4F0",
  blockText: "#6B6B60",
  categoryLabel: "레시피",
};

export function getRecipeTone(recipe: Recipe): RecipeTone {
  // 재료 냉동 (raw)이 가장 높은 우선순위
  if (recipe.prepStyle === "raw") return TONE_RAW;

  if (recipe.freezerCategory === "다이어트") return TONE_DIET;
  if (recipe.freezerCategory === "가성비") return TONE_BUDGET;

  return TONE_DEFAULT;
}

export function getCategoryToneOnly(category: FreezerCategory | "raw"): RecipeTone {
  if (category === "raw") return TONE_RAW;
  if (category === "다이어트") return TONE_DIET;
  return TONE_BUDGET;
}

/** prepStyle 표시용 한글 라벨 */
export function getPrepStyleLabel(style?: PrepStyle): string {
  if (style === "raw") return "재료 냉동";
  return "조리 후 냉동";
}
