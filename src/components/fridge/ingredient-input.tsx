"use client";

import { useState } from "react";
import { UserIngredient } from "@/types";
import { commonIngredients } from "@/data/ingredients";

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
          placeholder="재료 입력 (쉼표로 구분)"
          className="flex-1 px-4 py-3 rounded-2xl border border-lavender-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-lavender-300 focus:border-transparent placeholder:text-txt-light shadow-cute"
        />
        <button
          type="submit"
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-lavender-400 to-pink-400 text-white text-sm font-medium hover:opacity-90 active:scale-95 transition-all shrink-0 shadow-cute"
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
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-lavender-100 to-pink-100 text-lavender-600 text-sm border border-lavender-200"
            >
              {ing.name}
              <button
                onClick={() => onRemove(ing.name)}
                className="ml-0.5 text-lavender-300 hover:text-pink-500 transition-colors"
              >
                &times;
              </button>
            </span>
          ))}
          <button
            onClick={() => ingredients.forEach((i) => onRemove(i.name))}
            className="text-xs text-txt-light hover:text-pink-400 px-2 transition-colors"
          >
            전체 삭제
          </button>
        </div>
      )}

      {/* Quick Add */}
      <div className="mt-4">
        <p className="text-xs text-txt-muted mb-2">&#127859; 자주 쓰는 재료</p>
        <div className="flex flex-wrap gap-1.5">
          {commonIngredients.map((name) => {
            const isAdded = ingredients.some((i) => i.name === name);
            return (
              <button
                key={name}
                onClick={() => handleQuickAdd(name)}
                disabled={isAdded}
                className={
                  isAdded
                    ? "text-xs px-2.5 py-1.5 rounded-full bg-lavender-100 border border-lavender-200 text-lavender-300 cursor-default"
                    : "text-xs px-2.5 py-1.5 rounded-full bg-white border border-lavender-100 text-txt-secondary hover:border-pink-300 hover:text-pink-500 hover:bg-pink-50 active:scale-95 transition-all"
                }
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
