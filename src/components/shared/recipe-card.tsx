import Link from "next/link";
import { Recipe } from "@/types";
import { cn, formatPrice, formatTime } from "@/lib/utils";

interface RecipeCardProps {
  recipe: Recipe;
  matchPercentage?: number;
  missingIngredients?: string[];
}

const difficultyColor = {
  쉬움: "bg-fresh-100 text-fresh-700",
  보통: "bg-primary-100 text-primary-700",
  어려움: "bg-coral-400/10 text-coral-600",
};

export default function RecipeCard({
  recipe,
  matchPercentage,
  missingIngredients,
}: RecipeCardProps) {
  return (
    <Link href={`/recipe/${recipe.id}`}>
      <div className="bg-white rounded-2xl border border-primary-100 p-4 hover:shadow-md transition-shadow active:scale-[0.98] transition-transform">
        <div className="flex items-start gap-3">
          <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center text-3xl shrink-0">
            {recipe.imageEmoji}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-warm-800 truncate">
              {recipe.title}
            </h3>
            <p className="text-xs text-warm-800/50 mt-0.5 line-clamp-1">
              {recipe.description}
            </p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span
                className={cn(
                  "text-[10px] px-2 py-0.5 rounded-full font-medium",
                  difficultyColor[recipe.difficulty]
                )}
              >
                {recipe.difficulty}
              </span>
              <span className="text-[10px] text-warm-800/40">
                {formatTime(recipe.prepTime + recipe.cookTime)}
              </span>
              <span className="text-[10px] text-warm-800/40">
                {formatPrice(recipe.estimatedCost)}
              </span>
              {recipe.calories && (
                <span className="text-[10px] text-warm-800/40">
                  {recipe.calories}kcal
                </span>
              )}
            </div>
          </div>
          {matchPercentage !== undefined && (
            <div
              className={cn(
                "shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold",
                matchPercentage >= 80
                  ? "bg-fresh-100 text-fresh-600"
                  : matchPercentage >= 50
                  ? "bg-primary-100 text-primary-600"
                  : "bg-warm-100 text-warm-800/50"
              )}
            >
              {matchPercentage}%
            </div>
          )}
        </div>
        {missingIngredients && missingIngredients.length > 0 && (
          <div className="mt-2 pt-2 border-t border-primary-50">
            <p className="text-[10px] text-warm-800/40">
              부족한 재료:{" "}
              <span className="text-coral-500">
                {missingIngredients.join(", ")}
              </span>
            </p>
          </div>
        )}
        {recipe.tags.length > 0 && (
          <div className="flex gap-1 mt-2 flex-wrap">
            {recipe.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-1.5 py-0.5 rounded bg-ice-50 text-ice-500"
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
