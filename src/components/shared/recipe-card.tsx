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
      <div className="bg-surface rounded-xl shadow-sm p-4 active:scale-[0.98] transition-transform">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[14px] tracking-tight text-t">{recipe.title}</h3>
            <p className="text-[12px] text-t-sub mt-0.5 line-clamp-1">{recipe.description}</p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className={`text-[11px] font-semibold ${
                recipe.difficulty === "쉬움" ? "text-main" : recipe.difficulty === "보통" ? "text-sub" : "text-t-sub"
              }`}>{recipe.difficulty}</span>
              <span className="text-t-disabled text-[10px]">/</span>
              <span className="text-[11px] text-t-caption">{formatTime(recipe.prepTime + recipe.cookTime)}</span>
              <span className="text-t-disabled text-[10px]">/</span>
              <span className="text-[11px] text-t-caption">{formatPrice(recipe.estimatedCost)}</span>
            </div>
          </div>
          {matchPercentage !== undefined && (
            <span className={`text-[14px] font-extrabold shrink-0 ml-3 ${
              matchPercentage >= 80 ? "text-main" : matchPercentage >= 50 ? "text-sub" : "text-t-caption"
            }`}>{matchPercentage}%</span>
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
