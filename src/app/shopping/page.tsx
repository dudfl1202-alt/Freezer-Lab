"use client";

import { useState, useMemo } from "react";
import Header from "@/components/layout/header";
import BottomNav from "@/components/layout/bottom-nav";
import AffiliateLink from "@/components/shared/affiliate-link";
import { shoppingPlans } from "@/data/shopping-plans";
import { formatPrice } from "@/lib/utils";
import { ShoppingPlan } from "@/types";

const tiers = ["1만원", "2만원", "3만원"] as const;

function Plan({ plan }: { plan: ShoppingPlan }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-surface rounded-xl shadow-sm">
      <div className="p-5">
        <h3 className="font-bold text-[15px] tracking-tight text-t">{plan.title}</h3>
        <p className="text-[12px] text-t-sub mt-1 mb-4">{plan.description}</p>

        <div className="flex gap-6 mb-5">
          <div>
            <p className="text-[11px] text-t-caption mb-0.5">총 비용</p>
            <p className="text-[18px] font-extrabold text-main tracking-tight">{formatPrice(plan.totalCost)}</p>
          </div>
          <div>
            <p className="text-[11px] text-t-caption mb-0.5">1끼당</p>
            <p className="text-[18px] font-extrabold text-sub tracking-tight">{formatPrice(Math.round(plan.totalCost / plan.mealsProduced))}</p>
          </div>
          <div>
            <p className="text-[11px] text-t-caption mb-0.5">총</p>
            <p className="text-[18px] font-extrabold text-t tracking-tight">{plan.mealsProduced}끼</p>
          </div>
        </div>

        <p className="text-[13px] font-bold tracking-tight text-t mb-2">장보기 리스트</p>
        {plan.shoppingList.map(item => (
          <div key={item.ingredientId} className="flex items-center justify-between py-2.5 border-b border-line last:border-0">
            <div>
              <span className="text-[13px] text-t">{item.name}</span>
              <span className="text-[11px] text-t-caption ml-1.5">{item.quantity}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-t-sub">{formatPrice(item.estimatedPrice)}</span>
              {item.affiliateUrl && (
                <AffiliateLink href={item.affiliateUrl} className="text-[11px] text-main font-semibold">구매</AffiliateLink>
              )}
            </div>
          </div>
        ))}

        <button onClick={() => setOpen(!open)}
          className="w-full mt-4 py-2.5 text-[13px] text-t-sub font-semibold active:scale-[0.98] transition-transform border-t border-line">
          {open ? "접기" : "소분 & 냉동 가이드 보기"}
        </button>

        {open && (
          <div className="mt-4 animate-fade-in">
            <p className="text-[13px] font-bold tracking-tight text-t mb-3">소분 & 냉동 보관</p>
            <ol className="space-y-3">
              {plan.portioningGuide.map(s => (
                <li key={s.order} className="flex gap-2.5">
                  <span className="text-[13px] font-bold text-main shrink-0 w-5 mt-px">{s.order}.</span>
                  <div>
                    <p className="text-[13px] text-t leading-relaxed">{s.instruction}</p>
                    {s.tip && <p className="text-[11px] text-main mt-0.5 font-medium">{s.tip}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
      <div className="px-5 py-2 border-t border-line">
        <p className="text-[9px] text-t-disabled text-center">쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다</p>
      </div>
    </div>
  );
}

export default function ShoppingPage() {
  const [tier, setTier] = useState<(typeof tiers)[number]>("2만원");
  const filtered = useMemo(() => shoppingPlans.filter(p => p.budgetTier === tier), [tier]);

  return (
    <>
      <Header />
      <main className="max-w-lg mx-auto px-5 pt-5 pb-24">
        <h1 className="text-[18px] font-extrabold tracking-tight text-t">스마트 장보기</h1>
        <p className="text-[13px] text-t-sub mt-1 mb-5">예산에 맞는 장보기 플랜</p>

        <div className="flex border-b border-line mb-5">
          {tiers.map(t => (
            <button key={t} onClick={() => setTier(t)}
              className={tier === t
                ? "flex-1 py-3 text-[14px] font-bold text-main border-b-2 border-main"
                : "flex-1 py-3 text-[14px] text-t-caption"
              }>{t}</button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map(p => <Plan key={p.id} plan={p} />)}
        </div>
      </main>
      <BottomNav />
    </>
  );
}
