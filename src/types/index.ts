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
}

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
  budgetTier: "1만원" | "2만원" | "3만원";
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
