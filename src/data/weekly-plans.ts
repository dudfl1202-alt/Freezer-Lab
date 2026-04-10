import type { WeeklyPlan } from "@/types";

// 냉동 밀프랩 플랜
// ⚠️ 가격은 2026년 Q1 쿠팡 평균 시세 기준, 실제 가격은 변동 있습니다.
// 각 플랜은 일요일 1회 조리 → 평일 소분 냉동 → 전자레인지 해동 루틴 기반입니다.

export const weeklyPlans: WeeklyPlan[] = [
  // ========================================================
  // 1. 냉동 보관 밀프랩 (클래식, 입문용)
  // ========================================================
  {
    id: "frozen-storage",
    title: "냉동 보관 밀프랩",
    description:
      "한 번에 만들어서 냉동실에 쌓아두고, 먹고 싶을 때 전자레인지만 돌리면 끝. 냉동 보관에 최적화된 클래식 메뉴 구성.",
    totalCost: 28_500,
    prepDay: {
      totalTime: 150,
      tasks: [
        {
          order: 1,
          recipeId: "mushroom-beef-sotbap",
          instruction:
            "쌀 3컵을 씻어서 30분 불립니다. 그동안 소고기 다짐육 200g에 간장 2스푼 + 참기름 1스푼으로 밑간, 버섯 1팩과 당근 반 개는 잘게 썰어둡니다.",
          duration: 10,
        },
        {
          order: 2,
          recipeId: "mushroom-beef-sotbap",
          instruction:
            "밥솥에 불린 쌀을 넣고 위에 소고기·버섯·당근을 올려 취사 시작. 완성되면 간장 2스푼 + 참기름 + 깨 양념장을 섞고 5팩으로 소분합니다.",
          duration: 25,
        },
        {
          order: 3,
          recipeId: "curry-rice",
          instruction:
            "솥밥 짓는 동안 감자 2개, 당근 1개, 양파 1개를 엄지손톱 크기로 깍둑썰기합니다.",
          duration: 10,
        },
        {
          order: 4,
          recipeId: "curry-rice",
          instruction:
            "돼지고기 다짐육 150g을 볶다가 채소 넣고 3분, 물 3컵 넣고 중불 10분. 불 끄고 카레가루 4스푼 녹여 4팩으로 소분합니다.",
          duration: 25,
        },
        {
          order: 5,
          recipeId: "kimchi-friedrice",
          instruction:
            "김치 2주먹을 가위로 잘게 자르고 팬에 참기름 1스푼 + 김치 3분 볶기. 밥 2공기 넣고 센 불 5분 볶아 4팩으로 소분합니다.",
          duration: 15,
        },
        {
          order: 6,
          recipeId: "jeyuk-bokkeum",
          instruction:
            "삼겹살 300g을 썰고 고추장 2스푼 + 간장 1스푼 + 설탕 1스푼 + 마늘 2쪽 양념으로 볶아 3팩으로 소분합니다.",
          duration: 25,
        },
        {
          order: 7,
          recipeId: "jeyuk-bokkeum",
          instruction:
            "모든 용기의 뚜껑을 살짝 열어 식힌 뒤 냉동실로 이동. 지퍼백은 납작하게 눌러 세워서 보관하면 해동이 빨라집니다.",
          duration: 10,
        },
      ],
    },
    weekSchedule: [],
  },

  // ========================================================
  // 2. 다이어트 밀프랩 (저칼로리 고단백)
  // ========================================================
  {
    id: "diet-mealprep",
    title: "다이어트 밀프랩",
    description:
      "고단백 저탄수 위주 구성. 닭가슴살·잡채·닭가슴살 볶음밥으로 한 주를 건강하게 채워보세요.",
    totalCost: 26_500,
    prepDay: {
      totalTime: 110,
      tasks: [
        {
          order: 1,
          recipeId: "chicken-dosirak",
          instruction:
            "닭가슴살 500g(3덩이)을 키친타올로 물기 제거. 간장 2스푼 + 후추 + 맛술 1스푼으로 밑간하고 15분 재웁니다.",
          duration: 5,
        },
        {
          order: 2,
          recipeId: "chicken-dosirak",
          instruction:
            "브로콜리 1송이를 한입 크기로 잘라 끓는 소금물에 1분만 데치고 찬물 헹굼. 파프리카 2개, 양파 1개 채 썰기.",
          duration: 10,
        },
        {
          order: 3,
          recipeId: "chicken-dosirak",
          instruction:
            "팬에 기름 1스푼을 두르고 닭가슴살을 중불에서 앞뒤 각 4분씩 굽고, 1cm 두께로 슬라이스합니다.",
          duration: 12,
        },
        {
          order: 4,
          recipeId: "chicken-dosirak",
          instruction:
            "도시락 용기 5개에 닭가슴살 + 브로콜리 + 파프리카를 담고 현미밥을 곁들여 소분합니다.",
          duration: 10,
        },
        {
          order: 5,
          recipeId: "japchae",
          instruction:
            "당면 200g을 끓는 물에 6분 삶고 찬물에 헹궈 2~3번 자릅니다. 시금치 1줌은 30초 데쳐 꼭 짜둡니다.",
          duration: 10,
        },
        {
          order: 6,
          recipeId: "japchae",
          instruction:
            "당근·양파·버섯을 채 썰어 각각 볶고, 당면과 합쳐 간장 3스푼 + 참기름 2스푼 + 설탕 1스푼으로 버무려 4팩으로 소분합니다.",
          duration: 25,
        },
        {
          order: 7,
          recipeId: "chicken-friedrice",
          instruction:
            "남은 닭가슴살로 볶음밥 만들기: 당근·양파 잘게 다져 볶고 밥과 함께 3팩으로 소분합니다.",
          duration: 30,
        },
      ],
    },
    weekSchedule: [],
  },

  // ========================================================
  // 3. 고단백 밀프랩 (운동러/헬스러)
  // ========================================================
  {
    id: "highprotein-mealprep",
    title: "고단백 밀프랩",
    description:
      "운동 후 근손실 걱정 없이. 닭고기·소고기·계란 위주로 하루 단백질 100g+ 달성 가능한 헬스러 맞춤 구성.",
    totalCost: 38_000,
    prepDay: {
      totalTime: 140,
      tasks: [
        {
          order: 1,
          recipeId: "chicken-teriyaki",
          instruction:
            "닭다리살 600g을 한입 크기로 썰고 간장 4스푼 + 설탕 2스푼 + 다진마늘 1스푼으로 밑간하여 10분 재웁니다.",
          duration: 15,
        },
        {
          order: 2,
          recipeId: "chicken-teriyaki",
          instruction:
            "팬에 기름 두르고 닭다리살을 센 불에서 노릇하게 굽고, 양념장 부어 조려 4팩으로 소분합니다.",
          duration: 20,
        },
        {
          order: 3,
          recipeId: "bulgogi",
          instruction:
            "소고기 400g을 얇게 썰고 양파 1개 채 썰어 간장 3스푼 + 설탕 2스푼 + 참기름 + 마늘 + 배즙으로 30분 재웁니다.",
          duration: 15,
        },
        {
          order: 4,
          recipeId: "bulgogi",
          instruction:
            "팬에 양념한 불고기를 센 불에서 빠르게 볶아 4팩으로 소분합니다.",
          duration: 15,
        },
        {
          order: 5,
          recipeId: "braised-egg",
          instruction:
            "계란 10개를 끓는 물에 12분 삶고 껍질을 깝니다. 간장 반컵 + 물 1컵 + 설탕 2스푼 + 마늘 + 대파를 냄비에 끓여 계란을 10분 조립니다.",
          duration: 30,
        },
        {
          order: 6,
          recipeId: "dakjuk",
          instruction:
            "불린 쌀 1컵 + 찢은 닭가슴살 200g + 당근 반 개 + 물 4컵으로 닭죽을 끓여 3팩으로 소분. 아침/간식용으로 좋습니다.",
          duration: 35,
        },
        {
          order: 7,
          recipeId: "braised-egg",
          instruction:
            "장조림 계란을 양념과 함께 밀폐용기 2개에 담아 냉장 보관합니다 (5일 내 섭취).",
          duration: 10,
        },
      ],
    },
    weekSchedule: [],
  },

  // ========================================================
  // 4. 국물 밀프랩 (집밥 느낌)
  // ========================================================
  {
    id: "soup-mealprep",
    title: "국물 밀프랩",
    description:
      "한국인은 국물이지! 된장찌개·육개장·소고기무국으로 따뜻한 한 끼를 일주일 내내.",
    totalCost: 32_000,
    prepDay: {
      totalTime: 150,
      tasks: [
        {
          order: 1,
          recipeId: "sogogi-muguk",
          instruction:
            "멸치·다시마 육수 1.5L를 10분 끓여 준비합니다. 모든 국물 요리의 베이스로 사용됩니다.",
          duration: 15,
        },
        {
          order: 2,
          recipeId: "sogogi-muguk",
          instruction:
            "무 반 개를 나박썰기해 참기름에 볶다가 소고기 다짐육 150g 추가, 육수 500ml 넣고 10분 끓여 4팩으로 소분합니다.",
          duration: 25,
        },
        {
          order: 3,
          recipeId: "doenjang-jjigae",
          instruction:
            "두부 1모·애호박 반 개·양파 반 개를 깍둑썰기. 냄비에 육수 500ml + 된장 3스푼 풀고 채소 넣어 15분 끓입니다.",
          duration: 25,
        },
        {
          order: 4,
          recipeId: "doenjang-jjigae",
          instruction:
            "된장찌개 3팩으로 소분합니다. 국물 요리는 용기의 80%만 채워야 냉동 시 넘치지 않습니다.",
          duration: 10,
        },
        {
          order: 5,
          recipeId: "yukgaejang",
          instruction:
            "소고기 200g·숙주 1봉·대파 2대·고사리를 고추가루 3스푼 + 간장 2스푼 + 다진마늘로 양념하여 육수 500ml에 20분 끓입니다.",
          duration: 35,
        },
        {
          order: 6,
          recipeId: "yukgaejang",
          instruction:
            "육개장을 4팩으로 소분합니다. 매콤한 국물이라 냉동 후에도 맛 손실이 적어요.",
          duration: 10,
        },
        {
          order: 7,
          recipeId: "mushroom-beef-sotbap",
          instruction:
            "솥밥 3팩을 추가로 지어 국물 요리와 세트로 소분. 국물 + 솥밥 조합으로 매 끼 한식 한 상 완성.",
          duration: 30,
        },
      ],
    },
    weekSchedule: [],
  },

  // ========================================================
  // 5. 초간단 밀프랩 (초보자·바쁜 직장인)
  // ========================================================
  {
    id: "busy-worker-mealprep",
    title: "초간단 밀프랩",
    description:
      "요리 초보도 OK. 복잡한 손질 없이 1시간 30분이면 일주일치 한 끼가 완성되는 입문용 플랜.",
    totalCost: 22_000,
    prepDay: {
      totalTime: 90,
      tasks: [
        {
          order: 1,
          recipeId: "kongnamul-bap",
          instruction:
            "쌀 2컵을 씻고 숙주 1봉을 물기 털어 준비. 돼지고기 다짐육 100g에 간장 1스푼 + 참기름으로 밑간합니다.",
          duration: 10,
        },
        {
          order: 2,
          recipeId: "kongnamul-bap",
          instruction:
            "밥솥에 쌀 + 숙주 + 다짐육 올리고 취사. 완성되면 양념장(간장+참기름+깨) 곁들여 4팩으로 소분합니다.",
          duration: 30,
        },
        {
          order: 3,
          recipeId: "egg-friedrice",
          instruction:
            "양파 반 개·당근 1/4개 잘게 다지고 팬에 볶기. 밥 2공기 + 계란 3개 + 간장 1스푼으로 볶아 3팩 소분합니다.",
          duration: 15,
        },
        {
          order: 4,
          recipeId: "tofu-jorim",
          instruction:
            "두부 2모를 1cm 두께로 썰어 팬에 노릇하게 굽고, 간장 3스푼 + 설탕 1스푼 + 대파로 양념해 3팩 소분합니다.",
          duration: 20,
        },
        {
          order: 5,
          recipeId: "dakgalbi",
          instruction:
            "닭다리살 300g·양배추 1/4통·고구마 1개를 한입 크기로 썰어 고추장 2스푼 + 간장 1스푼 + 설탕 1스푼으로 15분 볶아 3팩 소분합니다.",
          duration: 25,
        },
      ],
    },
    weekSchedule: [],
  },

  // ========================================================
  // 6. 매콤 밀프랩 (매운맛 러버)
  // ========================================================
  {
    id: "spicy-mealprep",
    title: "매콤 밀프랩",
    description:
      "매운맛 없인 못 사는 사람들을 위한 플랜. 제육볶음·닭갈비·돼지김치찜·육개장으로 스트레스 해소 보장.",
    totalCost: 35_000,
    prepDay: {
      totalTime: 160,
      tasks: [
        {
          order: 1,
          recipeId: "jeyuk-bokkeum",
          instruction:
            "삼겹살 400g을 한입 크기로 썰고 고추장 3스푼 + 간장 2스푼 + 설탕 1스푼 + 마늘 3쪽 + 고춧가루 1스푼으로 30분 재웁니다.",
          duration: 20,
        },
        {
          order: 2,
          recipeId: "jeyuk-bokkeum",
          instruction:
            "양파 1개·대파 1대를 썰어 팬에 양념한 삼겹살과 함께 센 불에 볶아 4팩으로 소분합니다.",
          duration: 20,
        },
        {
          order: 3,
          recipeId: "dakgalbi",
          instruction:
            "닭다리살 500g·양배추 반 통·고구마 2개를 썰고 고추장 3스푼 + 고춧가루 1스푼 + 설탕 2스푼으로 재웁니다.",
          duration: 20,
        },
        {
          order: 4,
          recipeId: "dakgalbi",
          instruction:
            "팬에 볶아 닭갈비를 4팩으로 소분합니다. 매콤달콤한 양념이 핵심.",
          duration: 25,
        },
        {
          order: 5,
          recipeId: "pork-kimchi-jjim",
          instruction:
            "묵은지 1포기·삼겹살 300g·두부 1모를 냄비에 넣고 고춧가루 + 설탕 1스푼 + 물 2컵으로 20분 끓여 3팩으로 소분합니다.",
          duration: 35,
        },
        {
          order: 6,
          recipeId: "yukgaejang",
          instruction:
            "소고기 150g·숙주 1봉·대파를 고춧가루 2스푼 + 간장으로 양념해 국물 끓여 3팩으로 소분합니다.",
          duration: 40,
        },
      ],
    },
    weekSchedule: [],
  },
];
