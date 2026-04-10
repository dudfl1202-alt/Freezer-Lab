import { Ingredient } from "@/types";

// ⚠️ averagePrice는 쿠팡 로켓배송 기준 2026년 1분기 평균 시세 (unit 기준)
// 실제 가격은 판매자·계절·할인 여부에 따라 달라질 수 있습니다.
// 분기별 업데이트 권장 (마지막 업데이트: 2026-04)

export const ingredients: Ingredient[] = [
  // 채소 (개별 소매가 기준)
  { id: "carrot", name: "당근", category: "채소", unit: "개", averagePrice: 700, freezable: true },
  { id: "onion", name: "양파", category: "채소", unit: "개", averagePrice: 600, freezable: true },
  { id: "greenonion", name: "대파", category: "채소", unit: "대", averagePrice: 1500, freezable: true },
  { id: "garlic", name: "다진마늘", category: "채소", unit: "g", averagePrice: 5500, freezable: true }, // 다진마늘 500g 기준
  { id: "potato", name: "감자", category: "채소", unit: "개", averagePrice: 600, freezable: false },
  { id: "sweetpotato", name: "고구마", category: "채소", unit: "개", averagePrice: 1200, freezable: true },
  { id: "cabbage", name: "양배추", category: "채소", unit: "통", averagePrice: 4000, freezable: true },
  { id: "babycabbage", name: "알배추", category: "채소", unit: "포기", averagePrice: 3500, freezable: true },
  { id: "beansprout", name: "숙주", category: "채소", unit: "봉지", averagePrice: 1800, freezable: true }, // 300g 봉지
  { id: "mushroom", name: "버섯", category: "채소", unit: "팩", averagePrice: 2500, freezable: true }, // 새송이 150g 팩
  { id: "enoki", name: "팽이버섯", category: "채소", unit: "봉지", averagePrice: 1200, freezable: true },
  { id: "spinach", name: "시금치", category: "채소", unit: "단", averagePrice: 2500, freezable: true },
  { id: "zucchini", name: "애호박", category: "채소", unit: "개", averagePrice: 1800, freezable: true },
  { id: "paprika", name: "파프리카", category: "채소", unit: "개", averagePrice: 1300, freezable: true },
  { id: "broccoli", name: "브로콜리", category: "채소", unit: "송이", averagePrice: 3000, freezable: true },
  { id: "kimchi", name: "김치", category: "채소", unit: "kg", averagePrice: 10000, freezable: true }, // 1kg 기준
  { id: "radish", name: "무", category: "채소", unit: "개", averagePrice: 2500, freezable: true },
  { id: "cucumber", name: "오이", category: "채소", unit: "개", averagePrice: 1200, freezable: false },

  // 육류 (실제 쿠팡 시세 기준)
  { id: "groundpork", name: "돼지고기 다짐육", category: "육류", unit: "500g", averagePrice: 7500, freezable: true },
  { id: "groundbeef", name: "소고기 다짐육", category: "육류", unit: "500g", averagePrice: 15000, freezable: true },
  { id: "chicken", name: "닭가슴살", category: "육류", unit: "1kg", averagePrice: 11000, freezable: true }, // 냉동 1kg
  { id: "porkbelly", name: "삼겹살", category: "육류", unit: "500g", averagePrice: 13000, freezable: true },
  { id: "chadol", name: "냉동차돌", category: "육류", unit: "500g", averagePrice: 15000, freezable: true }, // 500g 기준 현실화
  { id: "spam", name: "스팸", category: "육류", unit: "340g", averagePrice: 5500, freezable: false },
  { id: "sausage", name: "소시지", category: "육류", unit: "봉지", averagePrice: 4500, freezable: true },
  { id: "chickenthigh", name: "닭다리살", category: "육류", unit: "1kg", averagePrice: 9500, freezable: true },

  // 해산물
  { id: "shrimp", name: "냉동새우", category: "해산물", unit: "500g", averagePrice: 10000, freezable: true },
  { id: "tuna", name: "참치캔", category: "해산물", unit: "100g", averagePrice: 2300, freezable: false },
  { id: "squid", name: "오징어", category: "해산물", unit: "마리", averagePrice: 4500, freezable: true },

  // 곡류
  { id: "rice", name: "쌀", category: "곡류", unit: "10kg", averagePrice: 35000, freezable: false },
  { id: "noodle", name: "라면", category: "곡류", unit: "5개입", averagePrice: 4500, freezable: false },
  { id: "udon", name: "우동면", category: "곡류", unit: "2인분", averagePrice: 3000, freezable: true },
  { id: "pasta", name: "파스타면", category: "곡류", unit: "500g", averagePrice: 4000, freezable: false },
  { id: "instantrice", name: "즉석밥", category: "곡류", unit: "12개입", averagePrice: 15000, freezable: false },

  // 유제품
  { id: "egg", name: "계란", category: "유제품", unit: "30구", averagePrice: 8000, freezable: false },
  { id: "cheese", name: "슬라이스치즈", category: "유제품", unit: "20장", averagePrice: 5500, freezable: true },
  { id: "milk", name: "우유", category: "유제품", unit: "1L", averagePrice: 2900, freezable: false },
  { id: "butter", name: "버터", category: "유제품", unit: "200g", averagePrice: 5500, freezable: true },

  // 양념 (대용량 기준)
  { id: "soysauce", name: "간장", category: "양념", unit: "500ml", averagePrice: 4500, freezable: false },
  { id: "gochujang", name: "고추장", category: "양념", unit: "500g", averagePrice: 6500, freezable: false },
  { id: "doenjang", name: "된장", category: "양념", unit: "500g", averagePrice: 5500, freezable: false },
  { id: "sesameoil", name: "참기름", category: "양념", unit: "320ml", averagePrice: 8500, freezable: false },
  { id: "sugar", name: "설탕", category: "양념", unit: "1kg", averagePrice: 3000, freezable: false },
  { id: "salt", name: "소금", category: "양념", unit: "1kg", averagePrice: 2000, freezable: false },
  { id: "pepper", name: "후추", category: "양념", unit: "100g", averagePrice: 3500, freezable: false },
  { id: "coinbroth", name: "코인육수", category: "양념", unit: "20개입", averagePrice: 7500, freezable: false },
  { id: "oysterscauce", name: "굴소스", category: "양념", unit: "500g", averagePrice: 5000, freezable: false },
  { id: "cookingwine", name: "맛술", category: "양념", unit: "500ml", averagePrice: 3500, freezable: false },
  { id: "currypowder", name: "카레가루", category: "양념", unit: "100g", averagePrice: 4000, freezable: false },

  // 기타
  { id: "tofu", name: "두부", category: "기타", unit: "모", averagePrice: 2000, freezable: true },
  { id: "seaweed", name: "김", category: "기타", unit: "봉지", averagePrice: 2500, freezable: false },
  { id: "fishcake", name: "어묵", category: "기타", unit: "400g", averagePrice: 4500, freezable: true },
  { id: "glass_noodle", name: "당면", category: "기타", unit: "300g", averagePrice: 4000, freezable: false },
  { id: "dumpling", name: "냉동만두", category: "냉동식품", unit: "봉지", averagePrice: 6500, freezable: true },
];

export const commonIngredients = [
  "양파", "대파", "계란", "김치", "마늘", "당근",
  "감자", "버섯", "두부", "쌀", "라면", "스팸",
  "참치캔", "고추장", "간장", "삼겹살", "닭가슴살",
  "숙주", "애호박", "시금치",
];

export function findIngredient(name: string): Ingredient | undefined {
  return ingredients.find(
    (i) => i.name === name || i.name.includes(name) || name.includes(i.name)
  );
}
