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
    <div className="bg-surface rounded-2xl shadow-card overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-[14px] text-t">{plan.title}</h3>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-main-light text-main font-semibold">{plan.mealsProduced}끼</span>
        </div>
        <p className="text-[12px] text-t-caption mb-3">{plan.description}</p>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-bg rounded-xl p-3 text-center">
            <p className="text-[16px] font-bold text-main">{formatPrice(plan.totalCost)}</p>
            <p className="text-[10px] text-t-disabled mt-0.5">총 비용</p>
          </div>
          <div className="bg-bg rounded-xl p-3 text-center">
            <p className="text-[16px] font-bold text-sub">{formatPrice(Math.round(plan.totalCost / plan.mealsProduced))}</p>
            <p className="text-[10px] text-t-disabled mt-0.5">1끼당</p>
          </div>
        </div>

        <p className="text-[13px] font-bold text-t mb-2">장보기 리스트</p>
        <div className="space-y-1">
          {plan.shoppingList.map(item => (
            <div key={item.ingredientId} className="flex items-center justify-between py-1.5 border-b border-line last:border-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[13px] text-t">{item.name}</span>
                <span className="text-[11px] text-t-disabled">{item.quantity}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-t-caption">{formatPrice(item.estimatedPrice)}</span>
                {item.affiliateUrl && (
                  <AffiliateLink href={item.affiliateUrl} className="text-[11px] text-main font-medium">구매</AffiliateLink>
                )}
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => setOpen(!open)}
          className="w-full mt-3 py-2.5 rounded-xl border border-line-bold text-[13px] text-t-sub font-medium active:scale-[0.98] transition-transform">
          {open ? "접기" : "소분 & 냉동 가이드 보기"}
        </button>

        {open && (
          <div className="mt-3 bg-main-50 rounded-xl p-4 animate-fade-in">
            <p className="text-[13px] font-bold text-t mb-2">소분 & 냉동 보관</p>
            <ol className="space-y-2.5">
              {plan.portioningGuide.map(s => (
                <li key={s.order} className="flex gap-2.5">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-main text-white text-[10px] flex items-center justify-center font-bold mt-0.5">{s.order}</span>
                  <div>
                    <p className="text-[13px] text-t leading-relaxed">{s.instruction}</p>
                    {s.tip && <p className="text-[11px] text-main mt-0.5">{s.tip}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
      <div className="px-4 py-2 bg-line border-t border-line">
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
        <h1 className="text-[18px] font-bold text-t mb-1">스마트 장보기</h1>
        <p className="text-[13px] text-t-caption mb-5">예산에 맞는 장보기 플랜</p>

        <div className="flex gap-1 p-1 bg-line rounded-xl mb-5">
          {tiers.map(t => (
            <button key={t} onClick={() => setTier(t)}
              className={tier === t
                ? "flex-1 py-2 rounded-lg bg-surface text-main text-[13px] font-semibold shadow-sm transition-all"
                : "flex-1 py-2 rounded-lg text-t-caption text-[13px] transition-all"
              }>{t}</button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map(p => <Plan key={p.id} plan={p} />)}
        </div>
      </main>
      <BottomNav />
    </>
  );
}
