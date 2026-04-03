"use client";

import { useState, useMemo } from "react";
import Header from "@/components/layout/header";
import BottomNav from "@/components/layout/bottom-nav";
import AffiliateLink from "@/components/shared/affiliate-link";
import { shoppingPlans } from "@/data/shopping-plans";
import { formatPrice } from "@/lib/utils";
import { ShoppingPlan } from "@/types";

const budgetTiers = ["1만원", "2만원", "3만원"] as const;

function PlanDetail({ plan }: { plan: ShoppingPlan }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-t text-sm">{plan.title}</h3>
          <span className="chip bg-success-light text-success">{plan.mealsProduced}끼</span>
        </div>
        <p className="text-xs text-t-hint mb-3">{plan.description}</p>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-bg rounded-xl p-3 text-center">
            <p className="text-base font-bold text-primary">{formatPrice(plan.totalCost)}</p>
            <p className="text-[10px] text-t-disabled mt-0.5">총 비용</p>
          </div>
          <div className="bg-bg rounded-xl p-3 text-center">
            <p className="text-base font-bold text-success">{formatPrice(Math.round(plan.totalCost / plan.mealsProduced))}</p>
            <p className="text-[10px] text-t-disabled mt-0.5">1끼당</p>
          </div>
        </div>

        <div className="mb-3">
          <p className="section-title mb-2">장보기 리스트</p>
          <div className="space-y-1.5">
            {plan.shoppingList.map((item) => (
              <div key={item.ingredientId} className="flex items-center justify-between py-1 border-b border-border last:border-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-t">{item.name}</span>
                  <span className="text-[11px] text-t-disabled">{item.quantity}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-t-hint">{formatPrice(item.estimatedPrice)}</span>
                  {item.affiliateUrl && (
                    <AffiliateLink href={item.affiliateUrl} className="text-[10px] text-primary hover:text-primary-dark transition-colors">
                      구매
                    </AffiliateLink>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => setOpen(!open)} className="btn-outline w-full text-xs">
          {open ? "접기" : "소분 & 냉동 가이드 보기"}
        </button>

        {open && (
          <div className="mt-3 bg-info-light rounded-xl p-4 animate-fade-up">
            <p className="section-title mb-2.5">소분 & 냉동 보관</p>
            <ol className="space-y-2.5">
              {plan.portioningGuide.map((step) => (
                <li key={step.order} className="flex gap-2.5">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-info/10 text-info text-[10px] flex items-center justify-center font-bold mt-0.5">
                    {step.order}
                  </span>
                  <div>
                    <p className="text-sm text-t leading-relaxed">{step.instruction}</p>
                    {step.tip && <p className="text-xs text-info mt-0.5">{step.tip}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
      <div className="px-4 py-2 bg-bg border-t border-border">
        <p className="text-[9px] text-t-disabled text-center">
          쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다
        </p>
      </div>
    </div>
  );
}

export default function ShoppingPage() {
  const [tier, setTier] = useState<(typeof budgetTiers)[number]>("2만원");
  const filtered = useMemo(() => shoppingPlans.filter((p) => p.budgetTier === tier), [tier]);

  return (
    <>
      <Header />
      <main className="max-w-lg mx-auto px-4 pt-5 pb-24">
        <div className="mb-5">
          <h1 className="text-lg font-bold text-t">스마트 장보기</h1>
          <p className="text-sm text-t-hint mt-0.5">예산에 맞는 밀프랩 장보기 플랜</p>
        </div>

        <div className="flex gap-1.5 p-1 bg-bg rounded-xl mb-5">
          {budgetTiers.map((t) => (
            <button
              key={t}
              onClick={() => setTier(t)}
              className={tier === t
                ? "flex-1 py-2 rounded-lg bg-surface text-primary text-sm font-semibold shadow-sm transition-all duration-200"
                : "flex-1 py-2 rounded-lg text-t-hint text-sm hover:text-t-sub transition-all duration-200"
              }
            >
              {t}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((plan) => <PlanDetail key={plan.id} plan={plan} />)}
        </div>
      </main>
      <BottomNav />
    </>
  );
}
