"use client";

import { useState, useMemo } from "react";
import Header from "@/components/layout/header";
import BottomNav from "@/components/layout/bottom-nav";
import AffiliateLink from "@/components/shared/affiliate-link";
import Mascot from "@/components/shared/mascot";
import { shoppingPlans } from "@/data/shopping-plans";
import { formatPrice } from "@/lib/utils";
import { ShoppingPlan } from "@/types";

const budgetTiers = ["1만원", "2만원", "3만원"] as const;

function PlanDetail({ plan }: { plan: ShoppingPlan }) {
  const [showPortioning, setShowPortioning] = useState(false);

  return (
    <div className="bg-white rounded-3xl border border-lavender-100 overflow-hidden shadow-cute">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-txt-primary">{plan.title}</h3>
          <span className="text-xs px-2.5 py-1 rounded-full bg-mint-100 text-mint-600 font-medium">
            {plan.mealsProduced}끼 가능
          </span>
        </div>
        <p className="text-sm text-txt-muted mb-3">{plan.description}</p>

        <div className="flex gap-3 mb-4">
          <div className="flex-1 bg-gradient-to-br from-lavender-50 to-pink-50 rounded-2xl p-3 text-center">
            <p className="text-lg font-bold text-lavender-500">
              {formatPrice(plan.totalCost)}
            </p>
            <p className="text-[10px] text-txt-light">총 비용</p>
          </div>
          <div className="flex-1 bg-gradient-to-br from-mint-50 to-sky-50 rounded-2xl p-3 text-center">
            <p className="text-lg font-bold text-mint-500">
              {formatPrice(Math.round(plan.totalCost / plan.mealsProduced))}
            </p>
            <p className="text-[10px] text-txt-light">1끼당</p>
          </div>
        </div>

        {/* Shopping List */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-txt-primary mb-2">
            &#128722; 장보기 리스트
          </h4>
          <div className="space-y-2">
            {plan.shoppingList.map((item) => (
              <div
                key={item.ingredientId}
                className="flex items-center justify-between py-1.5 border-b border-lavender-50 last:border-0"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm text-txt-primary">{item.name}</span>
                  <span className="text-xs text-txt-light">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-txt-muted">
                    {formatPrice(item.estimatedPrice)}
                  </span>
                  {item.affiliateUrl && (
                    <AffiliateLink
                      href={item.affiliateUrl}
                      className="text-[10px] text-lavender-400 hover:text-pink-500 transition-colors"
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
          className="w-full py-2.5 rounded-2xl border border-lavender-200 text-sm text-lavender-500 font-medium hover:bg-lavender-50 transition-colors"
        >
          {showPortioning ? "접기" : "&#128230; 소분 & 냉동 가이드 보기"}
        </button>

        {showPortioning && (
          <div className="mt-3 bg-gradient-to-br from-sky-50 to-lavender-50 rounded-2xl p-4">
            <h4 className="text-sm font-semibold text-txt-primary mb-3">
              소분 & 냉동 보관 방법
            </h4>
            <ol className="space-y-3">
              {plan.portioningGuide.map((step) => (
                <li key={step.order} className="flex gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-lavender-200 text-lavender-600 text-xs flex items-center justify-center font-bold">
                    {step.order}
                  </span>
                  <div>
                    <p className="text-sm text-txt-primary">{step.instruction}</p>
                    {step.tip && (
                      <p className="text-xs text-lavender-400 mt-0.5">
                        &#128161; {step.tip}
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
      <div className="px-4 py-2 bg-cream-100 border-t border-lavender-50">
        <p className="text-[9px] text-txt-light text-center">
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
        <div className="flex items-center gap-3 mb-6">
          <Mascot size={48} expression="wink" />
          <div>
            <h1 className="text-xl font-bold text-txt-primary">
              &#128722; 스마트 장보기
            </h1>
            <p className="text-sm text-txt-muted">
              예산에 맞는 가성비 밀프랩 플랜!
            </p>
          </div>
        </div>

        {/* Budget Tier Selector */}
        <div className="flex gap-2 mb-6">
          {budgetTiers.map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={
                selectedTier === tier
                  ? "flex-1 py-2.5 rounded-2xl text-sm font-medium bg-gradient-to-r from-lavender-400 to-pink-400 text-white shadow-cute transition-all"
                  : "flex-1 py-2.5 rounded-2xl text-sm font-medium bg-white border border-lavender-100 text-txt-muted hover:border-lavender-300 transition-all"
              }
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
