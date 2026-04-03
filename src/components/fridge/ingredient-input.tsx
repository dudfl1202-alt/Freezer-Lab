"use client";

import { useState } from "react";
import { UserIngredient } from "@/types";
import { commonIngredients } from "@/data/ingredients";

interface IngredientInputProps {
  ingredients: UserIngredient[];
  onAdd: (ingredient: UserIngredient) => void;
  onRemove: (name: string) => void;
}

export default function IngredientInput({ ingredients, onAdd, onRemove }: IngredientInputProps) {
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
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="재료를 입력하세요 (쉼표로 구분)"
          className="flex-1 px-4 py-3 rounded-xl bg-surface border border-border text-sm
                     focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                     placeholder:text-t-disabled transition-all duration-200"
        />
        <button type="submit" className="btn-primary shrink-0">추가</button>
      </form>

      {ingredients.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {ingredients.map((ing) => (
            <span
              key={ing.name}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                         bg-primary-light text-primary text-sm font-medium
                         animate-scale-in"
            >
              {ing.name}
              <button
                onClick={() => onRemove(ing.name)}
                className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center
                           text-primary/60 hover:bg-primary/20 hover:text-primary transition-colors text-xs"
              >
                &times;
              </button>
            </span>
          ))}
          <button
            onClick={() => ingredients.forEach((i) => onRemove(i.name))}
            className="text-xs text-t-disabled hover:text-accent px-1 transition-colors"
          >
            전체 삭제
          </button>
        </div>
      )}

      <div>
        <p className="text-xs text-t-hint mb-2 font-medium">자주 쓰는 재료</p>
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
                    ? "chip bg-primary-light text-primary/40 cursor-default"
                    : "chip bg-surface border border-border text-t-sub hover:border-primary hover:text-primary active:scale-95 transition-all duration-150"
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
