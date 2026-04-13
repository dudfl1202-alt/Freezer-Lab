"use client";

import { useState } from "react";
import Image from "next/image";
import { Recipe } from "@/types";
import { getRecipeTone } from "@/lib/recipe-tone";

interface RecipeImageProps {
  recipe: Recipe;
  /** card: 카드 썸네일(h-40), detail: 상세 페이지 히어로(h-56), full: 꽉 참 */
  variant?: "card" | "detail" | "full";
  className?: string;
}

/**
 * 레시피 이미지 컴포넌트
 * - imageUrl이 있으면 실사 사진 표시
 * - 없으면 컬러 블록 fallback (현재 디자인 유지)
 *
 * 이미지 파일 위치: public/images/recipes/{id}.jpg
 * 예: public/images/recipes/mp-b-001.jpg
 */
export default function RecipeImage({ recipe, variant = "card", className = "" }: RecipeImageProps) {
  const [imgError, setImgError] = useState(false);
  const tone = getRecipeTone(recipe);
  const hasImage = !!recipe.imageUrl && !imgError;

  const heights: Record<string, string> = {
    card: "h-40",
    detail: "h-56",
    full: "h-64",
  };

  if (hasImage) {
    return (
      <div className={`relative ${heights[variant]} w-full overflow-hidden rounded-xl ${className}`}>
        <Image
          src={recipe.imageUrl!}
          alt={recipe.title}
          fill
          className="object-cover"
          sizes="(max-width: 512px) 100vw, 512px"
          onError={() => setImgError(true)}
        />
        {/* 하단 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>
    );
  }

  // fallback: 컬러 블록 (이미지 없을 때)
  return (
    <div
      className={`${heights[variant]} w-full rounded-xl flex items-end p-4 ${className}`}
      style={{ background: tone.blockBg }}
    >
      <p
        className="text-[10px] font-bold uppercase tracking-[0.1em]"
        style={{ color: tone.blockText }}
      >
        {tone.categoryLabel}
      </p>
    </div>
  );
}
