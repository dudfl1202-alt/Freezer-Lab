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
      <div className="bg-surface rounded-2xl p-4 shadow-sm active:scale-[0.98] transition-transform">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-[15px] font-bold text-t">{recipe.title}</h3>
            <p className="text-[12px] text-t-caption mt-1 line-clamp-1">{recipe.description}</p>
            <p className="text-[11px] text-t-sub mt-2">
              {recipe.difficulty} · {formatTime(recipe.prepTime + recipe.cookTime)} · {formatPrice(recipe.estimatedCost)}
            </p>
          </div>
          {matchPercentage !== undefined && (
            <span className={`text-[15px] font-bold shrink-0 ${
              matchPercentage >= 80 ? "text-olive" : matchPercentage >= 50 ? "text-sand" : "text-t-caption"
            }`}>{matchPercentage}%</span>
          )}
        </div>

        {(missingIngredients?.length || missingSeasonings?.length) ? (
          <div className="mt-3 pt-3 border-t border-line space-y-0.5">
            {missingIngredients && missingIngredients.length > 0 && (
              <p className="text-[11px] text-t-caption">
                <span className="text-sand font-medium">{missingIngredients.join(", ")}</span> 추가 필요
              </p>
            )}
            {missingSeasonings && missingSeasonings.length > 0 && (
              <p className="text-[11px] text-olive font-medium">
                {missingSeasonings.join(", ")}만 있으면 OK
              </p>
            )}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
