"use client";

import { useState, useMemo } from "react";
import Header from "@/components/layout/header";
import BottomNav from "@/components/layout/bottom-nav";
import AffiliateLink from "@/components/shared/affiliate-link";
import AffiliateDisclosure from "@/components/shared/affiliate-disclosure";
import { shoppingPlans } from "@/data/shopping-plans";
import { formatPrice } from "@/lib/utils";
import { ShoppingPlan } from "@/types";

const tiers = ["1만원", "2만원", "3만원"] as const;

function Plan({ plan }: { plan: ShoppingPlan }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-surface rounded-2xl shadow-sm p-5">
      <h3 className="font-serif text-[16px] font-bold text-t">{plan.title}</h3>
      <p className="text-[12px] text-t-caption mt-1 mb-4">{plan.description}</p>

      <div className="flex gap-6 mb-5 pb-5 border-b border-line">
        <div>
          <p className="text-[10px] text-t-caption uppercase tracking-wider mb-0.5">Total</p>
          <p className="text-[18px] font-bold text-olive tracking-tight">{formatPrice(plan.totalCost)}</p>
        </div>
        <div>
          <p className="text-[10px] text-t-caption uppercase tracking-wider mb-0.5">Per Meal</p>
          <p className="text-[18px] font-bold text-sand tracking-tight">{formatPrice(Math.round(plan.totalCost / plan.mealsProduced))}</p>
        </div>
        <div>
          <p className="text-[10px] text-t-caption uppercase tracking-wider mb-0.5">Meals</p>
          <p className="text-[18px] font-bold text-t tracking-tight">{plan.mealsProduced}끼</p>
        </div>
      </div>

      <p className="text-[11px] text-t-caption uppercase tracking-wider mb-3">Shopping List</p>
      {plan.shoppingList.map(item => (
        <div key={item.ingredientId} className="flex items-center justify-between py-2.5 border-b border-line last:border-0">
          <div>
            <span className="text-[13px] text-t">{item.name}</span>
            <span className="text-[11px] text-t-caption ml-1.5">{item.quantity}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-t-sub">{formatPrice(item.estimatedPrice)}</span>
            <AffiliateLink keyword={item.name} className="text-[11px] text-olive font-semibold">구매</AffiliateLink>
          </div>
        </div>
      ))}

      <button onClick={() => setOpen(!open)}
        className="w-full mt-4 py-3 text-[13px] text-olive font-semibold active:scale-[0.98] transition-transform">
        {open ? "접기" : "소분 & 냉동 가이드 보기"}
      </button>

      {open && (
        <div className="mt-2 pt-4 border-t border-line animate-fade-in">
          <p className="text-[11px] text-t-caption uppercase tracking-wider mb-3">Storage Guide</p>
          <ol className="space-y-3">
            {plan.portioningGuide.map(s => (
              <li key={s.order} className="flex gap-2.5">
                <span className="text-[13px] font-semibold text-olive shrink-0 w-5">{s.order}.</span>
                <div>
                  <p className="text-[13px] text-t leading-relaxed">{s.instruction}</p>
                  {s.tip && <p className="text-[11px] text-olive mt-0.5">{s.tip}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default function ShoppingPage() {
  const [tier, setTier] = useState<(typeof tiers)[number]>("2만원");
  const filtered = useMemo(() => shoppingPlans.filter(p => p.budgetTier === tier), [tier]);

  return (
    <>
      <Header />
      <main className="max-w-lg mx-auto px-5 pt-6 pb-24">
        <p className="text-[11px] text-t-caption uppercase tracking-wider mb-1">Seasonal Market</p>
        <h1 className="font-serif text-[22px] font-bold text-t mb-5">스마트 장보기</h1>

        <div className="flex gap-2 mb-6">
          {tiers.map(t => (
            <button key={t} onClick={() => setTier(t)}
              className={tier === t
                ? "px-5 py-2.5 rounded-full bg-olive text-white text-[13px] font-semibold transition-all"
                : "px-5 py-2.5 rounded-full bg-surface text-t-sub text-[13px] transition-all border border-line"
              }>{t}</button>
          ))}
        </div>

        {/* 쿠팡 파트너스 공지 */}
        <AffiliateDisclosure variant="prominent" className="mb-4" />

        <div className="space-y-4">
          {filtered.map(p => <Plan key={p.id} plan={p} />)}
        </div>

        <AffiliateDisclosure variant="inline" className="mt-6 text-center" />
      </main>
      <BottomNav />
    </>
  );
}
