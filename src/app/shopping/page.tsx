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
    <div className="bg-surface rounded-xl shadow-sm overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-bold text-[15px] tracking-tight text-t">{plan.title}</h3>
          <span className="text-[11px] font-bold text-main">{plan.mealsProduced}끼</span>
        </div>
        <p className="text-[12px] text-t-sub mb-4">{plan.description}</p>

        {/* 통계 */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          <div className="bg-bg rounded-lg p-3">
            <p className="text-[18px] font-extrabold text-main tracking-tight">{formatPrice(plan.totalCost)}</p>
            <p className="text-[10px] text-t-caption mt-0.5">총 비용</p>
          </div>
          <div className="bg-bg rounded-lg p-3">
            <p className="text-[18px] font-extrabold text-sub tracking-tight">{formatPrice(Math.round(plan.totalCost / plan.mealsProduced))}</p>
            <p className="text-[10px] text-t-caption mt-0.5">1끼당</p>
          </div>
        </div>

        {/* 장보기 리스트 섹션 */}
        <div className="mb-4">
          <p className="text-[13px] font-bold tracking-tight text-t mb-2 pb-2 border-b border-line">장보기 리스트</p>
          {plan.shoppingList.map(item => (
            <div key={item.ingredientId} className="flex items-center justify-between py-2 border-b border-line last:border-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[13px] text-t">{item.name}</span>
                <span className="text-[11px] text-t-caption">{item.quantity}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-t-sub">{formatPrice(item.estimatedPrice)}</span>
                {item.affiliateUrl && (
                  <AffiliateLink href={item.affiliateUrl} className="text-[11px] text-main font-semibold">구매</AffiliateLink>
                )}
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => setOpen(!open)}
          className="w-full py-2.5 rounded-lg border border-line-bold text-[13px] text-t-sub font-semibold active:scale-[0.98] transition-transform">
          {open ? "접기" : "소분 & 냉동 가이드 보기"}
        </button>

        {open && (
          <div className="mt-4 bg-main-light rounded-lg p-4 animate-fade-in">
            <p className="text-[13px] font-bold tracking-tight text-t mb-3">소분 & 냉동 보관</p>
            <ol className="space-y-3">
              {plan.portioningGuide.map(s => (
                <li key={s.order} className="flex gap-2.5">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-main text-white text-[10px] flex items-center justify-center font-bold mt-0.5">{s.order}</span>
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
      <div className="px-5 py-2 bg-bg border-t border-line">
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
        <h1 className="text-[18px] font-extrabold tracking-tight text-t mb-0.5">스마트 장보기</h1>
        <p className="text-[13px] text-t-sub mb-5">예산에 맞는 장보기 플랜</p>

        {/* 탭 */}
        <div className="flex border-b border-line mb-5">
          {tiers.map(t => (
            <button key={t} onClick={() => setTier(t)}
              className={tier === t
                ? "flex-1 py-3 text-[14px] font-bold text-main border-b-2 border-main transition-colors"
                : "flex-1 py-3 text-[14px] font-medium text-t-caption transition-colors"
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
