"use client";

import { useState } from "react";
import { UserIngredient } from "@/types";
import { commonIngredients } from "@/data/ingredients";
import { cn } from "@/lib/utils";

interface IngredientInputProps {
  ingredients: UserIngredient[];
  onAdd: (ingredient: UserIngredient) => void;
  onRemove: (name: string) => void;
}

export default function IngredientInput({
  ingredients,
  onAdd,
  onRemove,
}: IngredientInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const parts = input.split(",").map((s) => s.trim()).filter(Boolean);
    for (const part of parts) {
      if (!ingredients.some((i) => i.name === part)) {
        onAdd({ ingredientId: part, name: part });
      }
    }
    setInput("");
  };

  const handleQuickAdd = (name: string) => {
    if (!ingredients.some((i) => i.name === name)) {
      onAdd({ ingredientId: name, name });
    }
  };

  return (
    <div>
      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="재료 입력 (쉼표로 구분, 예: 당근, 양파, 계란)"
          className="flex-1 px-4 py-3 rounded-xl border border-primary-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 placeholder:text-warm-800/30"
        />
        <button
          type="submit"
          className="px-4 py-3 rounded-xl bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 active:bg-primary-700 transition-colors shrink-0"
        >
          추가
        </button>
      </form>

      {/* Tags */}
      {ingredients.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {ingredients.map((ing) => (
            <span
              key={ing.name}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm"
            >
              {ing.name}
              {ing.quantity && (
                <span className="text-primary-400 text-xs">
                  {ing.quantity}
                </span>
              )}
              <button
                onClick={() => onRemove(ing.name)}
                className="ml-0.5 text-primary-400 hover:text-primary-600"
              >
                &times;
              </button>
            </span>
          ))}
          <button
            onClick={() => ingredients.forEach((i) => onRemove(i.name))}
            className="text-xs text-warm-800/30 hover:text-warm-800/50 px-2"
          >
            전체 삭제
          </button>
        </div>
      )}

      {/* Quick Add */}
      <div className="mt-4">
        <p className="text-xs text-warm-800/40 mb-2">자주 쓰는 재료</p>
        <div className="flex flex-wrap gap-1.5">
          {commonIngredients.map((name) => {
            const isAdded = ingredients.some((i) => i.name === name);
            return (
              <button
                key={name}
                onClick={() => handleQuickAdd(name)}
                disabled={isAdded}
                className={cn(
                  "text-xs px-2.5 py-1.5 rounded-lg border transition-colors",
                  isAdded
                    ? "bg-primary-100 border-primary-200 text-primary-400 cursor-default"
                    : "bg-white border-primary-100 text-warm-800/60 hover:border-primary-300 hover:text-primary-500 active:bg-primary-50"
                )}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
