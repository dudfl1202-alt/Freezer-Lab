import type { WeeklyPlan } from "@/types";

export const weeklyPlans: WeeklyPlan[] = [
  {
    id: "office-worker-mealprep",
    title: "직장인 한 주 밀프랩",
    description:
      "바쁜 직장인을 위한 실속 밀프랩. 일요일에 3가지 요리를 한꺼번에 만들어두고, 월~금 점심·저녁을 간편하게 해결하세요.",
    totalCost: 25000,
    prepDay: {
      totalTime: 150,
      tasks: [
        {
          order: 1,
          recipeId: "mushroom-beef-sotbap",
          instruction:
            "쌀 5인분을 불리고, 버섯과 소고기를 손질해 밑간합니다. 솥밥 재료를 넣고 취사 시작합니다.",
          duration: 20,
        },
        {
          order: 2,
          recipeId: "jeyuk-bokkeum",
          instruction:
            "솥밥이 취사되는 동안 돼지고기 목살을 한입 크기로 썰고 고추장 양념에 30분간 재워둡니다.",
          duration: 10,
        },
        {
          order: 3,
          recipeId: "chicken-friedrice",
          instruction:
            "닭가슴살을 삶아서 잘게 찢어두고, 볶음밥용 채소(양파, 당근, 대파)를 잘게 다져 준비합니다.",
          duration: 20,
        },
        {
          order: 4,
          recipeId: "jeyuk-bokkeum",
          instruction:
            "양념에 재운 돼지고기를 센 불에 볶다가 양파, 대파를 넣고 함께 볶아 제육볶음 3인분을 완성합니다.",
          duration: 15,
        },
        {
          order: 5,
          recipeId: "chicken-friedrice",
          instruction:
            "찬밥 또는 갓 지은 밥에 찢은 닭가슴살, 채소를 넣고 참기름과 간장으로 간하며 볶아 3인분을 완성합니다.",
          duration: 15,
        },
        {
          order: 6,
          recipeId: "mushroom-beef-sotbap",
          instruction:
            "솥밥 완성 후 양념장(간장, 참기름, 깨)을 만들고 잘 섞어 5인분으로 나누어 밀폐용기에 담습니다.",
          duration: 10,
        },
        {
          order: 7,
          recipeId: "jeyuk-bokkeum",
          instruction:
            "제육볶음을 3개 용기에 나누어 담고, 밥과 함께 세트로 포장합니다. 완전히 식힌 후 냉동합니다.",
          duration: 10,
        },
        {
          order: 8,
          recipeId: "chicken-friedrice",
          instruction:
            "닭가슴살 볶음밥을 3개 용기에 나눠 담고 완전히 식힌 후 냉동 보관합니다.",
          duration: 10,
        },
      ],
    },
    weekSchedule: [
      {
        day: "월",
        meals: [
          {
            type: "점심",
            recipeId: "mushroom-beef-sotbap",
            reheatMethod: "전자레인지 3분",
          },
          {
            type: "저녁",
            recipeId: "jeyuk-bokkeum",
            reheatMethod: "전자레인지 3분 30초",
          },
        ],
      },
      {
        day: "화",
        meals: [
          {
            type: "점심",
            recipeId: "chicken-friedrice",
            reheatMethod: "전자레인지 2분 30초, 뚜껑 살짝 열어서",
          },
          {
            type: "저녁",
            recipeId: "mushroom-beef-sotbap",
            reheatMethod: "전자레인지 3분",
          },
        ],
      },
      {
        day: "수",
        meals: [
          {
            type: "점심",
            recipeId: "jeyuk-bokkeum",
            reheatMethod: "전자레인지 3분 30초",
          },
          {
            type: "저녁",
            recipeId: "chicken-friedrice",
            reheatMethod: "전자레인지 2분 30초, 뚜껑 살짝 열어서",
          },
        ],
      },
      {
        day: "목",
        meals: [
          {
            type: "점심",
            recipeId: "mushroom-beef-sotbap",
            reheatMethod: "전자레인지 3분",
          },
          {
            type: "저녁",
            recipeId: "jeyuk-bokkeum",
            reheatMethod: "전자레인지 3분 30초",
          },
        ],
      },
      {
        day: "금",
        meals: [
          {
            type: "점심",
            recipeId: "mushroom-beef-sotbap",
            reheatMethod: "전자레인지 3분",
          },
          {
            type: "저녁",
            recipeId: "chicken-friedrice",
            reheatMethod: "전자레인지 2분 30초, 뚜껑 살짝 열어서",
          },
        ],
      },
    ],
  },
  {
    id: "simple-frozen-mealprep",
    title: "초간단 냉동 밀프랩",
    description:
      "요리 초보도 쉽게 따라할 수 있는 2가지 메뉴 밀프랩. 카레와 김치볶음밥만으로 한 주를 든든하게 채워보세요.",
    totalCost: 18000,
    prepDay: {
      totalTime: 90,
      tasks: [
        {
          order: 1,
          recipeId: "curry-rice",
          instruction:
            "감자, 당근, 양파를 깍둑썰기하고 돼지고기 또는 닭고기를 한입 크기로 썰어 준비합니다.",
          duration: 15,
        },
        {
          order: 2,
          recipeId: "curry-rice",
          instruction:
            "냄비에 기름을 두르고 고기를 먼저 볶다가 채소를 넣고 함께 볶습니다. 물을 붓고 끓입니다.",
          duration: 10,
        },
        {
          order: 3,
          recipeId: "kimchi-friedrice",
          instruction:
            "카레가 끓는 동안 김치를 잘게 썰고, 햄·대파 등 볶음밥 재료를 다져 준비합니다.",
          duration: 10,
        },
        {
          order: 4,
          recipeId: "curry-rice",
          instruction:
            "채소가 부드러워지면 불을 끄고 카레 루를 넣어 잘 녹인 뒤 다시 약불에서 5분간 끓여 4인분을 완성합니다.",
          duration: 15,
        },
        {
          order: 5,
          recipeId: "kimchi-friedrice",
          instruction:
            "팬에 참기름을 두르고 김치를 먼저 볶다가 밥과 나머지 재료를 넣고 센 불에 볶아 4인분을 완성합니다.",
          duration: 15,
        },
        {
          order: 6,
          recipeId: "curry-rice",
          instruction:
            "카레를 4개 용기에 밥과 함께 나누어 담습니다. 카레와 밥은 분리해서 담으면 더 좋습니다.",
          duration: 10,
        },
        {
          order: 7,
          recipeId: "kimchi-friedrice",
          instruction:
            "김치볶음밥을 4개 용기에 나누어 담고 완전히 식힌 후 냉동 보관합니다.",
          duration: 10,
        },
      ],
    },
    weekSchedule: [
      {
        day: "월",
        meals: [
          {
            type: "점심",
            recipeId: "curry-rice",
            reheatMethod: "전자레인지 3분, 중간에 한 번 저어주기",
          },
          {
            type: "저녁",
            recipeId: "kimchi-friedrice",
            reheatMethod: "전자레인지 2분 30초",
          },
        ],
      },
      {
        day: "화",
        meals: [
          {
            type: "점심",
            recipeId: "kimchi-friedrice",
            reheatMethod: "전자레인지 2분 30초",
          },
          {
            type: "저녁",
            recipeId: "curry-rice",
            reheatMethod: "전자레인지 3분, 중간에 한 번 저어주기",
          },
        ],
      },
      {
        day: "수",
        meals: [
          {
            type: "점심",
            recipeId: "curry-rice",
            reheatMethod: "전자레인지 3분, 중간에 한 번 저어주기",
          },
          {
            type: "저녁",
            recipeId: "kimchi-friedrice",
            reheatMethod: "전자레인지 2분 30초",
          },
        ],
      },
      {
        day: "목",
        meals: [
          {
            type: "점심",
            recipeId: "kimchi-friedrice",
            reheatMethod: "전자레인지 2분 30초",
          },
          {
            type: "저녁",
            recipeId: "curry-rice",
            reheatMethod: "전자레인지 3분, 중간에 한 번 저어주기",
          },
        ],
      },
      {
        day: "금",
        meals: [
          {
            type: "점심",
            recipeId: "curry-rice",
            reheatMethod: "전자레인지 3분, 중간에 한 번 저어주기",
          },
          {
            type: "저녁",
            recipeId: "kimchi-friedrice",
            reheatMethod: "전자레인지 2분 30초",
          },
        ],
      },
    ],
  },
  {
    id: "healthy-balanced-week",
    title: "건강 균형식 한 주",
    description:
      "아침·점심·저녁을 균형 있게 챙기는 건강 밀프랩. 단백질, 채소, 발효식품을 고루 배치한 일주일 식단입니다.",
    totalCost: 30000,
    prepDay: {
      totalTime: 180,
      tasks: [
        {
          order: 1,
          recipeId: "doenjang-jjigae",
          instruction:
            "멸치·다시마로 육수를 우려냅니다 (물 1.5L, 멸치 10마리, 다시마 2장, 10분 끓이기). 육수는 된장찌개와 잡채에 모두 사용합니다.",
          duration: 15,
        },
        {
          order: 2,
          recipeId: "chicken-dosirak",
          instruction:
            "닭가슴살 5장을 소금, 후추, 맛술로 밑간하고 20분간 재워둡니다.",
          duration: 5,
        },
        {
          order: 3,
          recipeId: "japchae",
          instruction:
            "당면을 삶아 찬물에 헹구고, 시금치·당근·양파·버섯·피망을 채 썰어 준비합니다.",
          duration: 20,
        },
        {
          order: 4,
          recipeId: "doenjang-jjigae",
          instruction:
            "두부, 호박, 양파, 청양고추를 썰고 육수에 된장 3큰술을 풀어 채소와 함께 끓여 3인분을 완성합니다.",
          duration: 25,
        },
        {
          order: 5,
          recipeId: "chicken-dosirak",
          instruction:
            "밑간한 닭가슴살을 에어프라이어 180도에서 12분 또는 팬에 구워 익힙니다. 5장 모두 완성합니다.",
          duration: 20,
        },
        {
          order: 6,
          recipeId: "japchae",
          instruction:
            "채소를 각각 볶은 뒤 당면과 합쳐 간장·참기름·설탕으로 양념하여 잡채 3인분을 완성합니다.",
          duration: 25,
        },
        {
          order: 7,
          recipeId: "chicken-dosirak",
          instruction:
            "닭가슴살을 먹기 좋게 슬라이스하고 현미밥, 브로콜리, 방울토마토와 함께 도시락 용기 5개에 세트로 담습니다.",
          duration: 20,
        },
        {
          order: 8,
          recipeId: "doenjang-jjigae",
          instruction:
            "된장찌개를 3개 밀폐용기에 나누어 담습니다. 국물 요리는 용기의 80%만 채워야 냉동 시 넘치지 않습니다.",
          duration: 10,
        },
        {
          order: 9,
          recipeId: "japchae",
          instruction:
            "잡채를 3개 용기에 나누어 담고, 모든 용기를 완전히 식힌 뒤 냉동실에 보관합니다.",
          duration: 10,
        },
      ],
    },
    weekSchedule: [
      {
        day: "월",
        meals: [
          {
            type: "아침",
            recipeId: "chicken-dosirak",
            reheatMethod: "전자레인지 3분, 브로콜리는 따로 30초만",
          },
          {
            type: "점심",
            recipeId: "japchae",
            reheatMethod: "전자레인지 2분",
          },
          {
            type: "저녁",
            recipeId: "doenjang-jjigae",
            reheatMethod: "냄비에 옮겨 중불로 5분 끓이기",
          },
        ],
      },
      {
        day: "화",
        meals: [
          {
            type: "아침",
            recipeId: "chicken-dosirak",
            reheatMethod: "전자레인지 3분, 브로콜리는 따로 30초만",
          },
          {
            type: "점심",
            recipeId: "doenjang-jjigae",
            reheatMethod: "전자레인지 4분, 중간에 저어주기",
          },
          {
            type: "저녁",
            recipeId: "japchae",
            reheatMethod: "전자레인지 2분",
          },
        ],
      },
      {
        day: "수",
        meals: [
          {
            type: "아침",
            recipeId: "chicken-dosirak",
            reheatMethod: "전자레인지 3분, 브로콜리는 따로 30초만",
          },
          {
            type: "점심",
            recipeId: "japchae",
            reheatMethod: "전자레인지 2분",
          },
          {
            type: "저녁",
            recipeId: "doenjang-jjigae",
            reheatMethod: "냄비에 옮겨 중불로 5분 끓이기",
          },
        ],
      },
      {
        day: "목",
        meals: [
          {
            type: "아침",
            recipeId: "chicken-dosirak",
            reheatMethod: "전자레인지 3분, 브로콜리는 따로 30초만",
          },
          {
            type: "점심",
            recipeId: "doenjang-jjigae",
            reheatMethod: "전자레인지 4분, 중간에 저어주기",
          },
          {
            type: "저녁",
            recipeId: "japchae",
            reheatMethod: "전자레인지 2분",
          },
        ],
      },
      {
        day: "금",
        meals: [
          {
            type: "아침",
            recipeId: "chicken-dosirak",
            reheatMethod: "전자레인지 3분, 브로콜리는 따로 30초만",
          },
          {
            type: "점심",
            recipeId: "japchae",
            reheatMethod: "전자레인지 2분",
          },
          {
            type: "저녁",
            recipeId: "doenjang-jjigae",
            reheatMethod: "냄비에 옮겨 중불로 5분 끓이기",
          },
        ],
      },
      {
        day: "토",
        meals: [
          {
            type: "점심",
            recipeId: "chicken-dosirak",
            reheatMethod: "전자레인지 3분",
          },
          {
            type: "저녁",
            recipeId: "japchae",
            reheatMethod: "전자레인지 2분",
          },
        ],
      },
      {
        day: "일",
        meals: [
          {
            type: "점심",
            recipeId: "doenjang-jjigae",
            reheatMethod: "냄비에 옮겨 중불로 5분 끓이기",
          },
          {
            type: "저녁",
            recipeId: "chicken-dosirak",
            reheatMethod: "전자레인지 3분",
          },
        ],
      },
    ],
  },
];
