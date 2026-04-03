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
  쉬움: "bg-success-light text-success",
  보통: "bg-primary-light text-primary",
  어려움: "bg-accent-light text-accent",
};

export default function RecipeCard({
  recipe,
  matchPercentage,
  missingIngredients,
  missingSeasonings,
}: RecipeCardProps) {
  return (
    <Link href={`/recipe/${recipe.id}`} className="block">
      <div className="card p-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-2xl shrink-0">
            {recipe.imageEmoji}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-t text-sm truncate">
              {recipe.title}
            </h3>
            <p className="text-xs text-t-hint mt-0.5 line-clamp-1">
              {recipe.description}
            </p>
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              <span className={`chip text-[10px] ${difficultyStyle[recipe.difficulty]}`}>
                {recipe.difficulty}
              </span>
              <span className="text-[10px] text-t-disabled">
                {formatTime(recipe.prepTime + recipe.cookTime)}
              </span>
              <span className="text-[10px] text-t-disabled">
                {formatPrice(recipe.estimatedCost)}
              </span>
            </div>
          </div>
          {matchPercentage !== undefined && (
            <div className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-xs font-bold ${
              matchPercentage >= 80 ? "bg-success-light text-success"
              : matchPercentage >= 50 ? "bg-primary-light text-primary"
              : "bg-bg text-t-hint"
            }`}>
              {matchPercentage}%
            </div>
          )}
        </div>

        {(missingIngredients?.length || missingSeasonings?.length) ? (
          <div className="mt-3 pt-3 border-t border-border space-y-1">
            {missingIngredients && missingIngredients.length > 0 && (
              <p className="text-[11px] text-t-hint">
                <span className="text-accent">{missingIngredients.join(", ")}</span> 필요
              </p>
            )}
            {missingSeasonings && missingSeasonings.length > 0 && (
              <p className="text-[11px] text-success">
                {missingSeasonings.join(", ")}만 있으면 OK
              </p>
            )}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
