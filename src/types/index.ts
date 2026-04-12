// --- Core Entities ---

export interface Ingredient {
  id: string;
  name: string;
  category: IngredientCategory;
  unit: string;
  averagePrice: number;
  freezable: boolean;
  affiliateUrl?: string;
}

export type IngredientCategory =
  | "채소"
  | "과일"
  | "육류"
  | "해산물"
  | "유제품"
  | "곡류"
  | "양념"
  | "냉동식품"
  | "기타";

export interface UserIngredient {
  ingredientId: string;
  name: string;
  quantity?: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  mode: RecipeMode[];
  ingredients: RecipeIngredient[];
  steps: CookingStep[];
  servings: number;
  prepTime: number;
  cookTime: number;
  difficulty: "쉬움" | "보통" | "어려움";
  tags: string[];
  calories?: number;
  imageEmoji: string;
  freezeInstructions?: string;
  reheatInstructions?: string;
  portionsYield?: number;
  estimatedCost: number;
  /** 냉동 밀프랩 카테고리 (weekly 모드일 때 사용) */
  freezerCategory?: FreezerCategory;
  /** 냉동 방식: 조리 후 냉동 vs 재료만 소분 냉동 후 즉석 조리 */
  prepStyle?: PrepStyle;
  /** 예산 등급 (1만원/2만원/3만원) - 스마트 장보기 매칭용 */
  budgetTier?: BudgetTier;
}

export type FreezerCategory = "가성비" | "다이어트";

/**
 * 냉동 밀프랩 조리 방식
 * - cooked: 완성품 냉동 → 전자레인지 해동 (예: 김치볶음밥, 카레)
 * - raw: 재료만 소분 냉동 → 즉석 조리 (예: 샤브샤브, 전골, 찌개 재료)
 */
export type PrepStyle = "cooked" | "raw";

export type BudgetTier = "1만원" | "2만원" | "3만원";

export type RecipeMode = "fridge" | "shopping" | "weekly";

export interface RecipeIngredient {
  ingredientId: string;
  name: string;
  amount: string;
  optional: boolean;
}

export interface CookingStep {
  order: number;
  instruction: string;
  duration?: number;
  tip?: string;
}

// --- Shopping Mode ---

export interface ShoppingPlan {
  id: string;
  title: string;
  description: string;
  budgetTier: BudgetTier;
  totalCost: number;
  shoppingList: ShoppingItem[];
  portioningGuide: PortionStep[];
  resultRecipes: string[];
  mealsProduced: number;
}

export interface ShoppingItem {
  ingredientId: string;
  name: string;
  quantity: string;
  estimatedPrice: number;
  affiliateUrl?: string;
}

export interface PortionStep {
  order: number;
  instruction: string;
  tip?: string;
}

// --- Weekly Mode ---

export interface WeeklyPlan {
  id: string;
  title: string;
  description: string;
  totalCost: number;
  prepDay: DayPrep;
  weekSchedule: DayMeal[];
}

export interface DayPrep {
  totalTime: number;
  tasks: PrepTask[];
}

export interface PrepTask {
  order: number;
  recipeId: string;
  instruction: string;
  duration: number;
}

export interface DayMeal {
  day: "월" | "화" | "수" | "목" | "금" | "토" | "일";
  meals: MealSlot[];
}

export interface MealSlot {
  type: "아침" | "점심" | "저녁";
  recipeId: string;
  reheatMethod: string;
}

// --- Recipe Matching ---

export interface ScoredRecipe {
  recipe: Recipe;
  matchedCount: number;
  totalRequired: number;
  matchPercentage: number;
  missingIngredients: string[];
  missingSeasonings: string[];
  mainMatchPercentage: number;
}
