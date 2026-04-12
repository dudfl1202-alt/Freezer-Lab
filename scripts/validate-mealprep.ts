/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * 냉동 밀프랩 레시피 자동 검증 스크립트
 *
 * 사용법: npx tsx scripts/validate-mealprep.ts
 *
 * 검증 항목:
 * 1. 냉동 부적합 재료가 포함됐는지
 * 2. 조리 방법에 냉동 부적합 키워드가 있는지
 * 3. raw prepStyle 레시피에 부적합 재료가 있는지
 * 4. cooked prepStyle 레시피에 부적합 조리법이 있는지
 */

import { allMealprepRecipes } from "../src/data/recipes-mealprep";
import type { Recipe } from "../src/types";

// ============================================================
// 검증 룰
// ============================================================

interface IssueRule {
  id: string;
  severity: "error" | "warning";
  description: string;
  check: (r: Recipe) => boolean;
}

/** 텍스트에 키워드 포함 여부 (재료명/조리법) */
function containsAny(text: string, keywords: string[]): boolean {
  return keywords.some((k) => text.includes(k));
}

function ingredientNames(r: Recipe): string {
  return r.ingredients.map((i) => i.name).join(" ");
}

function stepText(r: Recipe): string {
  return r.steps.map((s) => s.instruction + " " + (s.tip ?? "")).join(" ");
}

function allText(r: Recipe): string {
  return [
    r.title,
    r.description,
    ingredientNames(r),
    stepText(r),
    r.freezeInstructions ?? "",
    r.reheatInstructions ?? "",
  ].join(" ");
}

const RULES: IssueRule[] = [
  // ────────────────────────────────────────────
  // 냉동 부적합 채소 (조리 후 냉동 시 식감 망가짐)
  // optional: true 이면 조리 직전 추가용이라고 간주하고 통과
  // ────────────────────────────────────────────
  {
    id: "raw-veg-frozen",
    severity: "error",
    description:
      "생채소(숙주/양상추/오이/깻잎 등)는 냉동 시 물러집니다. raw prepStyle이거나 조리 직전 추가해야 합니다.",
    check: (r) => {
      if (r.prepStyle === "raw") return false;
      const badNames = ["숙주", "양상추", "상추", "오이", "깻잎", "쌈채소"];
      // optional이 아닌 (필수) 재료에서만 검사
      const hasBadVeg = r.ingredients.some(
        (i) => !i.optional && badNames.some((v) => i.name.includes(v))
      );
      return hasBadVeg;
    },
  },

  // ────────────────────────────────────────────
  // 마요네즈 냉동
  // ────────────────────────────────────────────
  {
    id: "mayo-frozen",
    severity: "error",
    description:
      "마요네즈는 냉동 시 분리됩니다. 해동 후 추가해야 합니다.",
    check: (r) => {
      const ing = ingredientNames(r);
      return ing.includes("마요네즈") || ing.includes("마요");
    },
  },

  // ────────────────────────────────────────────
  // 통감자 냉동 (으깨지 않거나 푹 익히지 않은 경우)
  // ────────────────────────────────────────────
  {
    id: "potato-whole-frozen",
    severity: "warning",
    description:
      "통감자는 냉동 시 모래 같은 식감으로 변합니다. 으깨거나 카레/스튜/짜장처럼 푹 익힌 형태여야 안전합니다.",
    check: (r) => {
      const ing = ingredientNames(r);
      const hasPotato = ing.includes("감자") && !ing.includes("고구마");
      if (!hasPotato) return false;
      // 푹 익히는 요리 (카레/스튜/탕/찌개/짜장/매시 등) → OK
      const text = allText(r);
      const safeContext = [
        "카레", "스튜", "탕", "찌개", "으깨", "매시", "짜장",
        "잘게 썰", "새끼손톱", "푹 익", "푹 끓",
      ].some((s) => text.includes(s));
      return !safeContext;
    },
  },

  // ────────────────────────────────────────────
  // 튀김류 냉동 후 전자레인지
  // ────────────────────────────────────────────
  {
    id: "fried-microwave",
    severity: "warning",
    description:
      "튀김류는 전자레인지로 데우면 눅눅해집니다. 에어프라이어/오븐 안내가 있어야 합니다.",
    check: (r) => {
      const text = r.title + r.description;
      const isFried = ["돈까스", "튀김", "까스", "프라이드"].some((k) =>
        text.includes(k)
      );
      if (!isFried) return false;
      const reheat = r.reheatInstructions ?? "";
      return !reheat.includes("에어프라이어") && !reheat.includes("오븐");
    },
  },

  // ────────────────────────────────────────────
  // 면류 냉동 (라면, 우동, 파스타, 소면)
  // ────────────────────────────────────────────
  {
    id: "noodle-frozen",
    severity: "error",
    description:
      "면류는 냉동 후 해동 시 불어서 식감이 떨어집니다. raw prepStyle로 면을 따로 보관하거나 즉석 조리 권장.",
    check: (r) => {
      if (r.prepStyle === "raw") return false;
      const ing = ingredientNames(r);
      return ["라면", "우동면", "파스타", "소면", "당면"].some((n) =>
        ing.includes(n) && !ing.includes("당면")  // 당면은 잡채로 OK
      ) || ing.includes("우동") || ing.includes("파스타");
    },
  },

  // ────────────────────────────────────────────
  // 빵 베이스 냉동 (토스트, 샌드위치)
  // ────────────────────────────────────────────
  {
    id: "bread-frozen",
    severity: "error",
    description: "빵 베이스 음식은 냉동 후 눅눅해집니다.",
    check: (r) => {
      const text = r.title + ingredientNames(r);
      return ["토스트", "샌드위치", "식빵"].some((k) => text.includes(k));
    },
  },

  // ────────────────────────────────────────────
  // 김밥/주먹밥 냉동
  // ────────────────────────────────────────────
  {
    id: "gimbap-frozen",
    severity: "warning",
    description:
      "김밥/주먹밥은 김이 눅눅해지고 밥 식감이 변합니다. 냉장이 더 적합합니다.",
    check: (r) => {
      const text = r.title + r.description;
      return ["김밥", "주먹밥", "유부초밥"].some((k) => text.includes(k));
    },
  },

  // ────────────────────────────────────────────
  // 계란 단독 조리물 냉동 (계란찜, 계란말이는 OK)
  // ────────────────────────────────────────────
  {
    id: "egg-fry-frozen",
    severity: "warning",
    description:
      "계란 프라이/스크램블은 단독 냉동 시 고무 같은 식감이 됩니다. 볶음밥 등 다른 재료와 섞인 경우는 OK.",
    check: (r) => {
      const title = r.title;
      // 계란찜, 계란말이, 장조림은 OK
      if (["계란찜", "계란말이", "계란장조림", "계란조림"].some((s) => title.includes(s))) {
        return false;
      }
      // 볶음밥/덮밥은 OK
      if (["볶음밥", "덮밥", "비빔밥", "솥밥"].some((s) => title.includes(s))) {
        return false;
      }
      // 계란이 메인 재료인 경우만 경고
      const isEggMain = ["에그", "계란 프라이"].some((s) => title.includes(s));
      return isEggMain;
    },
  },

  // ────────────────────────────────────────────
  // 두부 냉동 경고 (두부조림은 OK, 생두부는 식감 변함)
  // ────────────────────────────────────────────
  {
    id: "tofu-raw-frozen",
    severity: "warning",
    description:
      "생두부는 냉동 시 스펀지 식감이 됩니다 (의도적이면 OK). 두부조림/스테이크는 안전합니다.",
    check: (r) => {
      const ing = ingredientNames(r);
      if (!ing.includes("두부")) return false;
      const title = r.title;
      // 조림/스테이크/찌개는 OK
      if (["조림", "스테이크", "찌개", "전골", "부침"].some((s) => title.includes(s))) {
        return false;
      }
      // 샐러드는 절대 안 됨
      if (title.includes("샐러드") || title.includes("샐럿")) return true;
      return false;
    },
  },

  // ────────────────────────────────────────────
  // 샐러드/생채소 냉동 (절대 불가)
  // ────────────────────────────────────────────
  {
    id: "salad-frozen",
    severity: "error",
    description: "샐러드/생채소는 냉동 불가능합니다.",
    check: (r) => {
      const title = r.title;
      return ["샐러드", "샐럿", "생채소", "쌈", "겉절이"].some((k) => title.includes(k));
    },
  },

  // ────────────────────────────────────────────
  // 메타데이터 검증
  // ────────────────────────────────────────────
  {
    id: "missing-freeze-instructions",
    severity: "warning",
    description: "냉동 보관 안내가 없습니다.",
    check: (r) => !r.freezeInstructions || r.freezeInstructions.trim().length === 0,
  },
  {
    id: "missing-reheat-instructions",
    severity: "warning",
    description: "해동/조리 안내가 없습니다.",
    check: (r) =>
      !r.reheatInstructions || r.reheatInstructions.trim().length === 0,
  },
  {
    id: "missing-portions-yield",
    severity: "warning",
    description: "소분 팩 수(portionsYield)가 없습니다.",
    check: (r) => !r.portionsYield || r.portionsYield < 1,
  },
];

// ============================================================
// 실행
// ============================================================

interface RecipeIssue {
  recipe: Recipe;
  issues: IssueRule[];
}

const results: RecipeIssue[] = [];

for (const recipe of allMealprepRecipes) {
  const matched = RULES.filter((rule) => rule.check(recipe));
  if (matched.length > 0) {
    results.push({ recipe, issues: matched });
  }
}

// 정렬: error 먼저
results.sort((a, b) => {
  const aErr = a.issues.filter((i) => i.severity === "error").length;
  const bErr = b.issues.filter((i) => i.severity === "error").length;
  return bErr - aErr;
});

// ============================================================
// 리포트 출력
// ============================================================

console.log("\n========================================");
console.log("냉동 밀프랩 레시피 검증 리포트");
console.log("========================================\n");
console.log(`전체 레시피: ${allMealprepRecipes.length}개`);
console.log(`문제 발견: ${results.length}개\n`);

const errorCount = results.filter((r) =>
  r.issues.some((i) => i.severity === "error")
).length;
const warningCount = results.length - errorCount;

console.log(`🔴 ERROR: ${errorCount}개`);
console.log(`🟡 WARNING: ${warningCount}개\n`);
console.log("----------------------------------------\n");

for (const { recipe, issues } of results) {
  const errors = issues.filter((i) => i.severity === "error");
  const warnings = issues.filter((i) => i.severity === "warning");
  const icon = errors.length > 0 ? "🔴" : "🟡";

  console.log(`${icon} [${recipe.id}] ${recipe.title}`);
  console.log(`   카테고리: ${recipe.freezerCategory ?? "?"} / ${recipe.prepStyle ?? "cooked"}`);

  for (const issue of errors) {
    console.log(`   🔴 ${issue.id}: ${issue.description}`);
  }
  for (const issue of warnings) {
    console.log(`   🟡 ${issue.id}: ${issue.description}`);
  }
  console.log("");
}

// 룰별 통계
console.log("========================================");
console.log("룰별 통계");
console.log("========================================\n");

const ruleStats = new Map<string, number>();
for (const { issues } of results) {
  for (const issue of issues) {
    ruleStats.set(issue.id, (ruleStats.get(issue.id) ?? 0) + 1);
  }
}

const sorted = [...ruleStats.entries()].sort((a, b) => b[1] - a[1]);
for (const [ruleId, count] of sorted) {
  const rule = RULES.find((r) => r.id === ruleId);
  console.log(`${rule?.severity === "error" ? "🔴" : "🟡"} ${ruleId}: ${count}개`);
}

console.log("\n========================================");
console.log("완료");
console.log("========================================\n");
