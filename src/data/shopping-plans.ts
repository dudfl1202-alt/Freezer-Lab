import type { ShoppingPlan } from "@/types";

export const shoppingPlans: ShoppingPlan[] = [
  // ── 1만원 tier ──────────────────────────────────────────────
  {
    id: "plan-kimchi-jjigae-10k",
    title: "1만원 김치찌개 밀프랩",
    description:
      "묵은지, 두부, 대파만 사면 4끼 김치찌개 완성. 자취 냉장고에 김치 반 포기만 있어도 일주일이 든든합니다.",
    budgetTier: "1만원",
    totalCost: 9_400,
    shoppingList: [
      {
        ingredientId: "tofu",
        name: "두부 (1모, 300g)",
        quantity: "1팩",
        estimatedPrice: 1_800,
        affiliateUrl: "#coupang-tofu",
      },
      {
        ingredientId: "kimchi",
        name: "묵은지 (500g)",
        quantity: "1봉",
        estimatedPrice: 4_500,
        affiliateUrl: "#coupang-kimchi",
      },
      {
        ingredientId: "green-onion",
        name: "대파",
        quantity: "1단",
        estimatedPrice: 1_500,
        affiliateUrl: "#coupang-green-onion",
      },
      {
        ingredientId: "gochugaru",
        name: "고춧가루 (소포장)",
        quantity: "1봉",
        estimatedPrice: 1_600,
        affiliateUrl: "#coupang-gochugaru",
      },
    ],
    portioningGuide: [
      {
        order: 1,
        instruction:
          "묵은지 500g을 도마 위에서 한입 크기로 썬 뒤 4등분(약 125g씩)합니다.",
        tip: "국물도 버리지 말고 같이 나눠 담으세요. 감칠맛의 핵심입니다.",
      },
      {
        order: 2,
        instruction:
          "두부 1모를 반으로 가른 뒤 각각 다시 반으로 잘라 총 4조각으로 나눕니다.",
      },
      {
        order: 3,
        instruction:
          "대파는 어슷 썰어서 4등분하여 김치와 함께 지퍼백에 넣습니다.",
        tip: "지퍼백에 '김치찌개 1회분 / 날짜'를 유성펜으로 적어두세요.",
      },
      {
        order: 4,
        instruction:
          "두부는 별도의 밀폐용기에 물과 함께 냉장 보관하고, 조리 직전에 꺼내 넣습니다.",
        tip: "두부를 얼리면 식감이 쫄깃하게 변합니다. 취향에 따라 냉동도 OK.",
      },
      {
        order: 5,
        instruction:
          "냉동 보관할 분량은 지퍼백 공기를 최대한 빼고 납작하게 눌러 냉동실에 세워서 보관합니다.",
        tip: "납작하게 얼리면 해동이 빨라서 퇴근 후 15분이면 끓일 수 있어요.",
      },
    ],
    resultRecipes: ["kimchi-jjigae"],
    mealsProduced: 4,
  },
  {
    id: "plan-egg-friedrice-10k",
    title: "1만원 계란 볶음밥 세트",
    description:
      "계란, 양파, 당근, 대파로 5끼 볶음밥 재료를 한 번에 손질. 밥만 있으면 5분 완성 한 끼입니다.",
    budgetTier: "1만원",
    totalCost: 9_200,
    shoppingList: [
      {
        ingredientId: "eggs",
        name: "계란 (10구)",
        quantity: "1판",
        estimatedPrice: 3_200,
        affiliateUrl: "#coupang-eggs",
      },
      {
        ingredientId: "onion",
        name: "양파",
        quantity: "2개",
        estimatedPrice: 1_800,
        affiliateUrl: "#coupang-onion",
      },
      {
        ingredientId: "carrot",
        name: "당근",
        quantity: "1개",
        estimatedPrice: 1_500,
        affiliateUrl: "#coupang-carrot",
      },
      {
        ingredientId: "green-onion",
        name: "대파",
        quantity: "1단",
        estimatedPrice: 1_500,
        affiliateUrl: "#coupang-green-onion",
      },
      {
        ingredientId: "sesame-oil",
        name: "참기름 (소용량)",
        quantity: "1병",
        estimatedPrice: 1_200,
        affiliateUrl: "#coupang-sesame-oil",
      },
    ],
    portioningGuide: [
      {
        order: 1,
        instruction:
          "양파 2개를 잘게 다지고, 당근 1개도 같은 크기로 다집니다.",
        tip: "다지기 귀찮으면 채칼로 얇게 밀어서 잘게 써세요. 시간 절반으로 줄어듭니다.",
      },
      {
        order: 2,
        instruction:
          "대파 1단을 송송 썰어줍니다.",
      },
      {
        order: 3,
        instruction:
          "다진 양파 + 당근을 잘 섞은 뒤 5등분하여 지퍼백에 나눠 담습니다.",
        tip: "지퍼백에 '볶음밥 채소 1회분 / 날짜'를 꼭 적으세요.",
      },
      {
        order: 4,
        instruction:
          "대파는 한 번에 얼려두면 편합니다. 넓은 지퍼백에 펼쳐서 냉동하면 필요한 만큼 톡톡 꺼내 쓸 수 있어요.",
        tip: "대파를 키친타월로 물기 제거 후 얼리면 뭉치지 않습니다.",
      },
      {
        order: 5,
        instruction:
          "계란은 냉장 보관하고, 조리 시 1회에 2개씩 사용합니다. 남은 채소팩을 꺼내 볶다가 밥과 계란을 넣으면 완성.",
      },
      {
        order: 6,
        instruction:
          "냉동 채소는 해동 없이 바로 팬에 볶아도 됩니다. 센 불에서 수분을 빨리 날리는 게 포인트.",
        tip: "참기름은 마지막에 둘러야 향이 살아요.",
      },
    ],
    resultRecipes: ["egg-friedrice"],
    mealsProduced: 5,
  },

  // ── 2만원 tier ──────────────────────────────────────────────
  {
    id: "plan-chadol-shabu-20k",
    title: "2만원 샤브샤브 밀프랩",
    description:
      "냉동 차돌박이, 버섯, 숙주, 알배추를 사서 5끼 샤브샤브 세트로 소분. 코인육수 하나면 국물 걱정 끝.",
    budgetTier: "2만원",
    totalCost: 19_500,
    shoppingList: [
      {
        ingredientId: "chadol",
        name: "냉동 차돌박이 (600g)",
        quantity: "1팩",
        estimatedPrice: 8_900,
        affiliateUrl: "#coupang-chadol",
      },
      {
        ingredientId: "mushroom-mix",
        name: "모듬버섯 (팽이+새송이)",
        quantity: "1팩",
        estimatedPrice: 2_500,
        affiliateUrl: "#coupang-mushroom-mix",
      },
      {
        ingredientId: "sukju",
        name: "숙주 (300g)",
        quantity: "1봉",
        estimatedPrice: 1_500,
        affiliateUrl: "#coupang-sukju",
      },
      {
        ingredientId: "baby-cabbage",
        name: "알배추",
        quantity: "2포기",
        estimatedPrice: 3_000,
        affiliateUrl: "#coupang-baby-cabbage",
      },
      {
        ingredientId: "coin-stock",
        name: "코인육수 (10개입)",
        quantity: "1봉",
        estimatedPrice: 2_400,
        affiliateUrl: "#coupang-coin-stock",
      },
      {
        ingredientId: "ponzu",
        name: "폰즈소스 (소용량)",
        quantity: "1병",
        estimatedPrice: 1_200,
        affiliateUrl: "#coupang-ponzu",
      },
    ],
    portioningGuide: [
      {
        order: 1,
        instruction:
          "냉동 차돌박이 600g을 5등분(약 120g씩) 합니다. 반냉동 상태에서 칼로 잘라야 깔끔합니다.",
        tip: "완전 냉동 상태면 10분 정도 실온에 두고 칼이 들어갈 때 자르세요.",
      },
      {
        order: 2,
        instruction:
          "알배추 2포기를 세로로 반 가른 뒤 한입 크기로 뜯어 5등분합니다.",
      },
      {
        order: 3,
        instruction:
          "버섯은 팽이는 밑동 자르고 새송이는 슬라이스하여 5등분합니다.",
        tip: "버섯은 물에 씻지 말고 키친타월로 닦아야 냉동 시 물이 안 생겨요.",
      },
      {
        order: 4,
        instruction:
          "숙주는 끓는 물에 10초 데친 후 찬물에 헹궈 물기를 짜고 5등분합니다.",
        tip: "숙주는 날것으로 얼리면 물러지니 살짝 데쳐서 얼리는 게 좋습니다.",
      },
      {
        order: 5,
        instruction:
          "1회분씩 지퍼백에 '차돌 + 알배추 + 버섯'을 함께 담고, 숙주는 별도 소분합니다. 날짜 라벨 필수.",
      },
      {
        order: 6,
        instruction:
          "조리 시 코인육수 2개를 물 500ml에 넣고 끓인 뒤, 냉동팩 그대로 투하하면 10분이면 완성.",
        tip: "칼국수 면을 추가하면 샤브칼국수로 업그레이드됩니다.",
      },
    ],
    resultRecipes: ["chadol-shabu"],
    mealsProduced: 5,
  },
  {
    id: "plan-chicken-dosirak-20k",
    title: "2만원 닭가슴살 도시락 세트",
    description:
      "닭가슴살, 브로콜리, 파프리카, 양파로 6끼 도시락을 한 번에 준비. 다이어트 자취생의 현실적인 식단 관리.",
    budgetTier: "2만원",
    totalCost: 18_800,
    shoppingList: [
      {
        ingredientId: "chicken-breast",
        name: "냉동 닭가슴살 (1kg)",
        quantity: "1팩",
        estimatedPrice: 7_900,
        affiliateUrl: "#coupang-chicken-breast",
      },
      {
        ingredientId: "broccoli",
        name: "브로콜리",
        quantity: "2송이",
        estimatedPrice: 3_500,
        affiliateUrl: "#coupang-broccoli",
      },
      {
        ingredientId: "paprika",
        name: "파프리카 (빨강+노랑)",
        quantity: "2개",
        estimatedPrice: 3_200,
        affiliateUrl: "#coupang-paprika",
      },
      {
        ingredientId: "onion",
        name: "양파",
        quantity: "2개",
        estimatedPrice: 1_800,
        affiliateUrl: "#coupang-onion",
      },
      {
        ingredientId: "soy-sauce",
        name: "간장 (소용량)",
        quantity: "1병",
        estimatedPrice: 1_500,
        affiliateUrl: "#coupang-soy-sauce",
      },
      {
        ingredientId: "olive-oil",
        name: "올리브유 (소용량)",
        quantity: "1병",
        estimatedPrice: 900,
        affiliateUrl: "#coupang-olive-oil",
      },
    ],
    portioningGuide: [
      {
        order: 1,
        instruction:
          "냉동 닭가슴살 1kg을 반해동 후 6등분(약 165g씩) 합니다. 각각 지퍼백에 넣고 간장 1큰술 + 후추로 밑간합니다.",
        tip: "밑간 상태로 냉동하면 해동하면서 간이 배어 더 맛있어요.",
      },
      {
        order: 2,
        instruction:
          "브로콜리 2송이를 한입 크기 소송이로 자른 뒤 끓는 소금물에 1분 데칩니다. 찬물에 바로 헹궈 물기를 뺍니다.",
      },
      {
        order: 3,
        instruction:
          "파프리카 2개를 채 썰고, 양파 2개를 굵게 채 썰어 함께 섞어둡니다.",
      },
      {
        order: 4,
        instruction:
          "데친 브로콜리와 채소 믹스를 각각 6등분하여 지퍼백에 담습니다.",
        tip: "채소는 키친타월로 물기를 꼼꼼히 제거해야 냉동 시 서로 안 붙어요.",
      },
      {
        order: 5,
        instruction:
          "도시락 용기 6개를 준비하고, 각 용기에 '닭가슴살 1팩 + 채소 1팩 = 도시락 1개'로 매칭 라벨을 붙입니다.",
        tip: "전날 밤에 냉장칸으로 옮겨두면 아침에 바로 조리 가능합니다.",
      },
    ],
    resultRecipes: ["chicken-dosirak"],
    mealsProduced: 6,
  },

  // ── 3만원 tier ──────────────────────────────────────────────
  {
    id: "plan-weekly-complete-30k",
    title: "3만원 한 주 완성 세트",
    description:
      "다짐육, 채소, 쌀까지 한 번에 사서 일주일치 저녁을 해결. 카레, 제육볶음, 볶음밥을 돌려먹는 자취 루틴.",
    budgetTier: "3만원",
    totalCost: 29_300,
    shoppingList: [
      {
        ingredientId: "ground-beef-pork",
        name: "돼지 다짐육 (600g)",
        quantity: "1팩",
        estimatedPrice: 6_500,
        affiliateUrl: "#coupang-ground-beef-pork",
      },
      {
        ingredientId: "rice",
        name: "쌀 (2kg)",
        quantity: "1봉",
        estimatedPrice: 5_800,
        affiliateUrl: "#coupang-rice",
      },
      {
        ingredientId: "potato",
        name: "감자",
        quantity: "3개",
        estimatedPrice: 2_500,
        affiliateUrl: "#coupang-potato",
      },
      {
        ingredientId: "carrot",
        name: "당근",
        quantity: "2개",
        estimatedPrice: 2_000,
        affiliateUrl: "#coupang-carrot",
      },
      {
        ingredientId: "onion",
        name: "양파",
        quantity: "3개",
        estimatedPrice: 2_500,
        affiliateUrl: "#coupang-onion",
      },
      {
        ingredientId: "green-onion",
        name: "대파",
        quantity: "1단",
        estimatedPrice: 1_500,
        affiliateUrl: "#coupang-green-onion",
      },
      {
        ingredientId: "curry-roux",
        name: "카레 루 (중간맛)",
        quantity: "1박스",
        estimatedPrice: 2_500,
        affiliateUrl: "#coupang-curry-roux",
      },
      {
        ingredientId: "gochujang",
        name: "고추장 (소용량)",
        quantity: "1개",
        estimatedPrice: 2_800,
        affiliateUrl: "#coupang-gochujang",
      },
      {
        ingredientId: "eggs",
        name: "계란 (10구)",
        quantity: "1판",
        estimatedPrice: 3_200,
        affiliateUrl: "#coupang-eggs",
      },
    ],
    portioningGuide: [
      {
        order: 1,
        instruction:
          "다짐육 600g을 3등분(200g씩) 합니다. 용도별로 라벨: ① 카레용 ② 제육볶음용 ③ 볶음밥용.",
        tip: "지퍼백에 용도와 날짜를 적고 납작하게 펴서 냉동하세요.",
      },
      {
        order: 2,
        instruction:
          "감자 3개, 당근 2개를 깍둑 썰기합니다. 카레용 2/3, 나머지 1/3은 볶음밥용으로 잘게 다집니다.",
      },
      {
        order: 3,
        instruction:
          "양파 3개 중 2개는 카레용으로 굵게 채 썰고, 1개는 제육+볶음밥용으로 잘게 다집니다.",
      },
      {
        order: 4,
        instruction:
          "카레용 채소(감자+당근+양파)를 지퍼백에 담아 냉장 보관합니다. 3일 내 조리 예정이면 냉장, 아니면 냉동.",
        tip: "감자는 냉동하면 식감이 변하니 가능하면 냉장 보관 후 빨리 써주세요.",
      },
      {
        order: 5,
        instruction:
          "제육볶음용 다짐육에 고추장 1큰술 + 간장 1큰술 + 다진마늘로 양념해서 지퍼백에 재워 냉동합니다.",
        tip: "양념장째 냉동하면 해동 시 바로 볶기만 하면 돼서 편합니다.",
      },
      {
        order: 6,
        instruction:
          "대파 1단 전체를 송송 썰어 넓은 지퍼백에 펼쳐 냉동합니다. 일주일간 모든 요리에 고명으로 활용.",
        tip: "주간 루틴: 월화 카레 → 수목 제육볶음 → 금 볶음밥. 주말은 남은 재료로 자유 조리!",
      },
    ],
    resultRecipes: ["curry-rice", "jeyuk-bokkeum", "egg-friedrice"],
    mealsProduced: 7,
  },
  {
    id: "plan-sotbap-guk-30k",
    title: "3만원 솥밥 & 국 세트",
    description:
      "버섯솥밥 + 된장찌개/김치찌개 재료를 한 번에 장보기. 밥과 국이 있는 한식 한 상을 일주일간 돌려먹습니다.",
    budgetTier: "3만원",
    totalCost: 28_900,
    shoppingList: [
      {
        ingredientId: "rice",
        name: "쌀 (2kg)",
        quantity: "1봉",
        estimatedPrice: 5_800,
        affiliateUrl: "#coupang-rice",
      },
      {
        ingredientId: "mushroom-mix",
        name: "모듬버섯 (표고+새송이+팽이)",
        quantity: "1팩",
        estimatedPrice: 3_500,
        affiliateUrl: "#coupang-mushroom-mix",
      },
      {
        ingredientId: "ground-beef",
        name: "소고기 다짐육 (200g)",
        quantity: "1팩",
        estimatedPrice: 5_500,
        affiliateUrl: "#coupang-ground-beef",
      },
      {
        ingredientId: "tofu",
        name: "두부 (2모)",
        quantity: "2팩",
        estimatedPrice: 3_400,
        affiliateUrl: "#coupang-tofu",
      },
      {
        ingredientId: "kimchi",
        name: "묵은지 (500g)",
        quantity: "1봉",
        estimatedPrice: 4_500,
        affiliateUrl: "#coupang-kimchi",
      },
      {
        ingredientId: "doenjang",
        name: "된장 (소용량)",
        quantity: "1개",
        estimatedPrice: 2_200,
        affiliateUrl: "#coupang-doenjang",
      },
      {
        ingredientId: "zucchini",
        name: "애호박",
        quantity: "1개",
        estimatedPrice: 1_500,
        affiliateUrl: "#coupang-zucchini",
      },
      {
        ingredientId: "green-onion",
        name: "대파",
        quantity: "1단",
        estimatedPrice: 1_500,
        affiliateUrl: "#coupang-green-onion",
      },
      {
        ingredientId: "dried-anchovy",
        name: "국물용 멸치 (소포장)",
        quantity: "1봉",
        estimatedPrice: 1_000,
        affiliateUrl: "#coupang-dried-anchovy",
      },
    ],
    portioningGuide: [
      {
        order: 1,
        instruction:
          "모듬버섯을 솥밥용(2/3)과 된장찌개용(1/3)으로 나눕니다. 솥밥용은 얇게 슬라이스, 된장찌개용은 한입 크기로 뜯습니다.",
        tip: "표고버섯 기둥은 버리지 말고 육수 낼 때 함께 넣으면 감칠맛이 올라갑니다.",
      },
      {
        order: 2,
        instruction:
          "소고기 다짐육 200g을 솥밥용으로 4등분(50g씩)하여 지퍼백에 개별 소분합니다.",
        tip: "다짐육에 간장 반 큰술씩 넣고 주물러 냉동하면 솥밥에 바로 넣기 좋아요.",
      },
      {
        order: 3,
        instruction:
          "묵은지 500g을 한입 크기로 썰어 3등분합니다. 김치찌개 3회분 기준.",
      },
      {
        order: 4,
        instruction:
          "두부 2모 중 1모는 김치찌개용으로 깍둑 썰어 물과 함께 밀폐용기 냉장, 나머지 1모는 된장찌개용으로 동일하게 보관합니다.",
        tip: "두부 보관 물은 매일 갈아주면 일주일까지도 신선하게 유지됩니다.",
      },
      {
        order: 5,
        instruction:
          "애호박 1개를 반달 썰기하여 된장찌개 3회분으로 나눠 지퍼백에 소분합니다. 대파도 송송 썰어 냉동 보관.",
      },
      {
        order: 6,
        instruction:
          "멸치 육수를 한 번에 1L 끓여 500ml씩 2등분하여 냉장(3일분) + 냉동(나머지) 보관합니다.",
        tip: "주간 루틴: 월수금 솥밥+된장찌개, 화목 김치찌개+흰밥. 국물류는 육수만 있으면 10분 컷!",
      },
    ],
    resultRecipes: ["mushroom-beef-sotbap", "kimchi-jjigae"],
    mealsProduced: 7,
  },
];
