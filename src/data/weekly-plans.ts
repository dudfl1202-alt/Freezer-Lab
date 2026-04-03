import type { WeeklyPlan } from "@/types";

export const weeklyPlans: WeeklyPlan[] = [
  {
    id: "frozen-storage",
    title: "냉동 보관 밀프랩",
    description:
      "한 번에 만들어서 냉동실에 쌓아두고, 먹고 싶을 때 전자레인지만 돌리면 끝. 냉동 보관에 최적화된 메뉴 구성이에요.",
    totalCost: 22000,
    prepDay: {
      totalTime: 120,
      tasks: [
        {
          order: 1,
          recipeId: "mushroom-beef-sotbap",
          instruction:
            "쌀 3컵(종이컵 기준)을 씻어서 30분 불립니다. 그동안 소고기 다짐육 200g에 간장 2스푼 + 참기름 1스푼으로 밑간합니다.",
          duration: 5,
        },
        {
          order: 2,
          recipeId: "mushroom-beef-sotbap",
          instruction:
            "버섯 1팩을 잘게 썰고, 당근 반 개를 주사위 크기로 깍둑썰기합니다. 불린 쌀 위에 버섯, 당근, 밑간한 소고기를 올리고 밥솥에 취사합니다.",
          duration: 10,
        },
        {
          order: 3,
          recipeId: "curry-rice",
          instruction:
            "솥밥 짓는 동안 카레 준비! 감자 2개, 당근 1개, 양파 1개를 엄지손톱 크기로 깍둑썰기합니다. 돼지고기 다짐육 150g을 냄비에 볶다가 채소를 넣고 3분 볶습니다.",
          duration: 15,
        },
        {
          order: 4,
          recipeId: "curry-rice",
          instruction:
            "물 3컵(종이컵)을 붓고 센 불에서 끓인 후, 감자가 젓가락으로 찔릴 때까지 중불 10분. 불 끄고 카레가루 4스푼을 넣어 잘 저어 녹입니다.",
          duration: 15,
        },
        {
          order: 5,
          recipeId: "kimchi-friedrice",
          instruction:
            "김치 2주먹 분량을 가위로 잘게 자릅니다. 팬에 참기름 1스푼을 두르고 김치를 3분 볶은 후, 밥 2공기를 넣고 센 불에서 5분간 볶습니다.",
          duration: 10,
        },
        {
          order: 6,
          recipeId: "mushroom-beef-sotbap",
          instruction:
            "솥밥이 완성되면 간장 2스푼 + 참기름 1스푼 + 깨를 섞어 양념장을 만듭니다. 솥밥에 양념장을 넣고 잘 비빕니다.",
          duration: 5,
        },
        {
          order: 7,
          recipeId: "mushroom-beef-sotbap",
          instruction:
            "밀폐용기에 주먹밥 크기(약 200g)씩 5개로 소분합니다. 뚜껑을 살짝 열어 김을 빼고, 식으면 냉동실에 넣습니다.",
          duration: 10,
        },
        {
          order: 8,
          recipeId: "curry-rice",
          instruction:
            "카레를 4개 용기에 나눠 담습니다. 밥과 카레는 따로 담아야 해동 시 식감이 좋습니다. 밥도 1공기씩 따로 4개 소분합니다.",
          duration: 10,
        },
        {
          order: 9,
          recipeId: "kimchi-friedrice",
          instruction:
            "김치볶음밥을 4개 용기에 나눠 담고, 완전히 식힌 후 냉동합니다. 총 13팩 완성!",
          duration: 10,
        },
      ],
    },
    weekSchedule: [],
  },
  {
    id: "diet-mealprep",
    title: "다이어트 밀프랩",
    description:
      "고단백 저탄수 위주로 구성한 다이어트 밀프랩. 닭가슴살 + 채소 볶음 + 잡채로 건강하게 한 주를 채워보세요.",
    totalCost: 25000,
    prepDay: {
      totalTime: 100,
      tasks: [
        {
          order: 1,
          recipeId: "chicken-dosirak",
          instruction:
            "닭가슴살 500g(약 3덩이)을 키친타올로 물기를 제거합니다. 간장 2스푼 + 후추 약간 + 맛술 1스푼으로 밑간하고 15분 재워둡니다.",
          duration: 5,
        },
        {
          order: 2,
          recipeId: "chicken-dosirak",
          instruction:
            "브로콜리 1송이를 한 입 크기로 잘라 끓는 물에 소금 반 스푼을 넣고 1분만 데칩니다. 찬물에 바로 헹궈야 아삭해요. 파프리카 2개, 양파 1개를 채 썹니다.",
          duration: 10,
        },
        {
          order: 3,
          recipeId: "chicken-dosirak",
          instruction:
            "팬에 기름 1스푼을 두르고 닭가슴살을 중불에서 앞뒤 각 4분씩 굽습니다. 속까지 익었는지 가장 두꺼운 부분을 잘라서 확인하세요.",
          duration: 10,
        },
        {
          order: 4,
          recipeId: "japchae",
          instruction:
            "당면 200g(건면 기준 한 줌 반)을 끓는 물에 6분 삶고 찬물에 헹굽니다. 가위로 2~3번 잘라두면 먹기 편해요.",
          duration: 8,
        },
        {
          order: 5,
          recipeId: "japchae",
          instruction:
            "시금치 1줌을 끓는 물에 30초 데치고 찬물에 헹궈 꼭 짭니다. 당근 반 개는 성냥개비 크기로, 양파 반 개는 채 썰어 각각 팬에 기름 반 스푼씩 넣고 2분간 볶습니다.",
          duration: 15,
        },
        {
          order: 6,
          recipeId: "japchae",
          instruction:
            "큰 볼에 당면 + 볶은 채소를 넣고, 간장 3스푼 + 참기름 2스푼 + 설탕 1스푼을 넣어 골고루 비빕니다.",
          duration: 5,
        },
        {
          order: 7,
          recipeId: "chicken-dosirak",
          instruction:
            "닭가슴살을 1cm 두께로 슬라이스합니다. 도시락 용기 5개에 닭가슴살 + 브로콜리 + 파프리카를 담습니다. 현미밥을 곁들이려면 밥도 따로 소분합니다.",
          duration: 10,
        },
        {
          order: 8,
          recipeId: "japchae",
          instruction:
            "잡채를 4개 용기에 나눠 담고 완전히 식힌 후 냉동합니다. 총 9팩 완성!",
          duration: 10,
        },
      ],
    },
    weekSchedule: [],
  },
];
