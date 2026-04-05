import Link from "next/link";
import { Recipe } from "@/types";
import { formatPrice, formatTime } from "@/lib/utils";

interface RecipeCardProps {
  recipe: Recipe;
  matchPercentage?: number;
  missingIngredients?: string[];
  missingSeasonings?: string[];
}

export default function RecipeCard({ recipe, matchPercentage, missingIngredients, missingSeasonings }: RecipeCardProps) {
  return (
    <Link href={`/recipe/${recipe.id}`} className="block">
      <div className="bg-surface rounded-2xl p-4 shadow-card active:scale-[0.98] transition-transform">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl bg-main-light flex items-center justify-center text-xl shrink-0">
            {recipe.imageEmoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-[14px] text-t truncate">{recipe.title}</h3>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                recipe.difficulty === "쉬움" ? "bg-main-light text-main"
                : recipe.difficulty === "보통" ? "bg-line text-t-sub"
                : "bg-sub-light text-sub"
              }`}>{recipe.difficulty}</span>
            </div>
            <p className="text-[12px] text-t-caption mt-0.5 line-clamp-1">{recipe.description}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[11px] text-t-disabled">{formatTime(recipe.prepTime + recipe.cookTime)}</span>
              <span className="w-0.5 h-0.5 rounded-full bg-line-bold" />
              <span className="text-[11px] text-t-disabled">{formatPrice(recipe.estimatedCost)}</span>
            </div>
          </div>
          {matchPercentage !== undefined && (
            <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-[12px] font-bold ${
              matchPercentage >= 80 ? "bg-main-light text-main"
              : matchPercentage >= 50 ? "bg-main-50 text-main-dark"
              : "bg-line text-t-caption"
            }`}>
              {matchPercentage}%
            </div>
          )}
        </div>

        {(missingIngredients?.length || missingSeasonings?.length) ? (
          <div className="mt-3 pt-3 border-t border-line space-y-0.5">
            {missingIngredients && missingIngredients.length > 0 && (
              <p className="text-[11px] text-t-caption">
                <span className="text-sub font-medium">{missingIngredients.join(", ")}</span> 추가 필요
              </p>
            )}
            {missingSeasonings && missingSeasonings.length > 0 && (
              <p className="text-[11px] text-main font-medium">
                {missingSeasonings.join(", ")}만 있으면 OK
              </p>
            )}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
