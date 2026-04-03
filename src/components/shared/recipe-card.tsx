import Link from "next/link";
import { Recipe } from "@/types";
import { formatPrice, formatTime } from "@/lib/utils";

interface RecipeCardProps {
  recipe: Recipe;
  matchPercentage?: number;
  missingIngredients?: string[];
  missingSeasonings?: string[];
}

const difficultyStyle = {
  쉬움: "bg-mint-100 text-mint-600",
  보통: "bg-lavender-100 text-lavender-600",
  어려움: "bg-pink-100 text-pink-600",
};

export default function RecipeCard({
  recipe,
  matchPercentage,
  missingIngredients,
  missingSeasonings,
}: RecipeCardProps) {
  return (
    <Link href={`/recipe/${recipe.id}`}>
      <div className="bg-white rounded-3xl border border-lavender-100 p-4 hover:shadow-cute-lg transition-all active:scale-[0.98]">
        <div className="flex items-start gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-lavender-50 to-pink-50 flex items-center justify-center text-3xl shrink-0">
            {recipe.imageEmoji}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-txt-primary truncate">
              {recipe.title}
            </h3>
            <p className="text-xs text-txt-muted mt-0.5 line-clamp-1">
              {recipe.description}
            </p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${difficultyStyle[recipe.difficulty]}`}
              >
                {recipe.difficulty}
              </span>
              <span className="text-[10px] text-txt-light">
                {formatTime(recipe.prepTime + recipe.cookTime)}
              </span>
              <span className="text-[10px] text-txt-light">
                {formatPrice(recipe.estimatedCost)}
              </span>
              {recipe.calories && (
                <span className="text-[10px] text-txt-light">
                  {recipe.calories}kcal
                </span>
              )}
            </div>
          </div>
          {matchPercentage !== undefined && (
            <div
              className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold ${
                matchPercentage >= 80
                  ? "bg-mint-100 text-mint-600"
                  : matchPercentage >= 50
                  ? "bg-lavender-100 text-lavender-600"
                  : "bg-cream-200 text-txt-muted"
              }`}
            >
              {matchPercentage}%
            </div>
          )}
        </div>
        {(missingIngredients?.length || missingSeasonings?.length) ? (
          <div className="mt-2.5 pt-2.5 border-t border-lavender-50 space-y-1">
            {missingIngredients && missingIngredients.length > 0 && (
              <p className="text-[10px] text-txt-light">
                추가 재료:{" "}
                <span className="text-pink-400">
                  {missingIngredients.join(", ")}
                </span>
              </p>
            )}
            {missingSeasonings && missingSeasonings.length > 0 && (
              <p className="text-[10px] text-mint-500">
                &#10024; 이 양념만 있으면 OK: {missingSeasonings.join(", ")}
              </p>
            )}
          </div>
        ) : null}
        {recipe.tags.length > 0 && (
          <div className="flex gap-1 mt-2 flex-wrap">
            {recipe.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-1.5 py-0.5 rounded-full bg-lavender-50 text-lavender-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
