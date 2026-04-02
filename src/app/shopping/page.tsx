"use client";

import { useState, useMemo } from "react";
import Header from "@/components/layout/header";
import BottomNav from "@/components/layout/bottom-nav";
import AffiliateLink from "@/components/shared/affiliate-link";
import { shoppingPlans } from "@/data/shopping-plans";
import { cn, formatPrice } from "@/lib/utils";
import { ShoppingPlan } from "@/types";

const budgetTiers = ["1만원", "2만원", "3만원"] as const;

function PlanDetail({ plan }: { plan: ShoppingPlan }) {
  const [showPortioning, setShowPortioning] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-primary-100 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-warm-800">{plan.title}</h3>
          <span className="text-xs px-2 py-1 rounded-full bg-fresh-100 text-fresh-600 font-medium">
            {plan.mealsProduced}끼 가능
          </span>
        </div>
        <p className="text-sm text-warm-800/50 mb-3">{plan.description}</p>

        <div className="flex gap-3 mb-4">
          <div className="flex-1 bg-warm-50 rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-primary-500">
              {formatPrice(plan.totalCost)}
            </p>
            <p className="text-[10px] text-warm-800/40">총 비용</p>
          </div>
          <div className="flex-1 bg-warm-50 rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-fresh-500">
              {formatPrice(Math.round(plan.totalCost / plan.mealsProduced))}
            </p>
            <p className="text-[10px] text-warm-800/40">1끼당</p>
          </div>
        </div>

        {/* Shopping List */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-warm-800 mb-2">
            🛒 장보기 리스트
          </h4>
          <div className="space-y-2">
            {plan.shoppingList.map((item) => (
              <div
                key={item.ingredientId}
                className="flex items-center justify-between py-1.5 border-b border-primary-50 last:border-0"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm text-warm-800">{item.name}</span>
                  <span className="text-xs text-warm-800/40">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-warm-800/50">
                    {formatPrice(item.estimatedPrice)}
                  </span>
                  {item.affiliateUrl && (
                    <AffiliateLink
                      href={item.affiliateUrl}
                      className="text-[10px] text-primary-400 hover:text-primary-500"
                    >
                      구매
                    </AffiliateLink>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Portioning Toggle */}
        <button
          onClick={() => setShowPortioning(!showPortioning)}
          className="w-full py-2.5 rounded-xl border border-primary-200 text-sm text-primary-500 font-medium hover:bg-primary-50 transition-colors"
        >
          {showPortioning ? "접기" : "📦 소분 & 냉동 가이드 보기"}
        </button>

        {showPortioning && (
          <div className="mt-3 bg-ice-50 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-warm-800 mb-3">
              소분 & 냉동 보관 방법
            </h4>
            <ol className="space-y-3">
              {plan.portioningGuide.map((step) => (
                <li key={step.order} className="flex gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-ice-200 text-ice-500 text-xs flex items-center justify-center font-bold">
                    {step.order}
                  </span>
                  <div>
                    <p className="text-sm text-warm-800">{step.instruction}</p>
                    {step.tip && (
                      <p className="text-xs text-ice-500 mt-0.5">
                        💡 {step.tip}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {/* Affiliate Disclosure */}
      <div className="px-4 py-2 bg-warm-50 border-t border-primary-50">
        <p className="text-[9px] text-warm-800/30 text-center">
          이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의
          수수료를 제공받습니다
        </p>
      </div>
    </div>
  );
}

export default function ShoppingPage() {
  const [selectedTier, setSelectedTier] =
    useState<(typeof budgetTiers)[number]>("2만원");

  const filteredPlans = useMemo(
    () => shoppingPlans.filter((p) => p.budgetTier === selectedTier),
    [selectedTier]
  );

  return (
    <>
      <Header />
      <main className="max-w-lg mx-auto px-4 pt-6 pb-24">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-warm-800 mb-1">
            🛒 스마트 장보기
          </h1>
          <p className="text-sm text-warm-800/50">
            예산에 맞는 장보기 플랜으로 가성비 밀프랩을 시작하세요
          </p>
        </div>

        {/* Budget Tier Selector */}
        <div className="flex gap-2 mb-6">
          {budgetTiers.map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={cn(
                "flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors",
                selectedTier === tier
                  ? "bg-primary-500 text-white"
                  : "bg-white border border-primary-100 text-warm-800/60 hover:border-primary-300"
              )}
            >
              {tier}
            </button>
          ))}
        </div>

        {/* Plans */}
        <div className="space-y-4">
          {filteredPlans.map((plan) => (
            <PlanDetail key={plan.id} plan={plan} />
          ))}
        </div>
      </main>
      <BottomNav />
    </>
  );
}
