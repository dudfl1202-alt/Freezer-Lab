"use client";

import { useState } from "react";
import { UserIngredient } from "@/types";
import { commonIngredients } from "@/data/ingredients";

interface Props {
  ingredients: UserIngredient[];
  onAdd: (i: UserIngredient) => void;
  onRemove: (name: string) => void;
}

export default function IngredientInput({ ingredients, onAdd, onRemove }: Props) {
  const [input, setInput] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    input.split(",").map(s => s.trim()).filter(Boolean).forEach(part => {
      if (!ingredients.some(i => i.name === part)) onAdd({ ingredientId: part, name: part });
    });
    setInput("");
  };

  const quickAdd = (name: string) => {
    if (!ingredients.some(i => i.name === name)) onAdd({ ingredientId: name, name });
  };

  return (
    <div className="space-y-4">
      <form onSubmit={submit} className="flex gap-2">
        <input
          type="text" value={input} onChange={e => setInput(e.target.value)}
          placeholder="재료를 입력하세요 (쉼표로 구분)"
          className="flex-1 px-4 py-3 rounded-lg bg-bg text-[13px]
                     focus:outline-none focus:ring-1 focus:ring-main placeholder:text-t-disabled transition-all"
        />
        <button type="submit"
          className="px-5 py-3 rounded-lg bg-main text-white text-[13px] font-bold
                     active:scale-95 transition-transform shrink-0">
          추가
        </button>
      </form>

      {ingredients.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {ingredients.map(ing => (
            <span key={ing.name}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-main-light text-main text-[13px] font-medium">
              {ing.name}
              <button onClick={() => onRemove(ing.name)} className="text-main/40 hover:text-main text-sm ml-0.5">&times;</button>
            </span>
          ))}
          <button onClick={() => ingredients.forEach(i => onRemove(i.name))}
            className="text-[11px] text-t-caption px-1">전체 삭제</button>
        </div>
      )}

      <div>
        <p className="text-[12px] text-t-sub font-semibold mb-2">자주 쓰는 재료</p>
        <div className="flex flex-wrap gap-1.5">
          {commonIngredients.map(name => {
            const added = ingredients.some(i => i.name === name);
            return (
              <button key={name} onClick={() => quickAdd(name)} disabled={added}
                className={added
                  ? "text-[12px] px-2.5 py-1.5 rounded-lg bg-line text-t-disabled"
                  : "text-[12px] px-2.5 py-1.5 rounded-lg bg-bg text-t-sub hover:text-main active:scale-95 transition-all"
                }>{name}</button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
