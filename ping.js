import { REST, Routes } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

// 사용할 슬래시 커멘드
const commands = [
  {
    name: "link",
    description: "아카이로 류의 치지직 링크를 알려드립니다.",
  },
  {
    name: "todayryu",
    description: "오늘의 아카이로 류를 알려드립니다.",
  },
  {
    name: "today",
    description: "오늘의 운세를 알려드립니다.",
  },
  {
    name: "help",
    description: "도와줘?",
  },
  {
    name: "question1",
    description: "만약 당신이 아카이로 류에게 사귀자 했을 때, 대답은?!",
  },
  {
    name: "question2",
    description: "임무 중 다친 나를 발견한 아카이로 류, 반응은?!",
  },
  {
    name: "question3",
    description: "훈련장에서 아카이로 류와 눈이 마주쳤다. 류의 반응은?",
  },
  {
    name: "recommend_song",
    description: "오늘의 추천 곡을 알려드립니다!",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.Token);

try {
  console.log("슬래시커맨드할라면 이걸 성공해야한대 뭔지 모르겠는데 웅 그렇대");

  // 봇에 위의 커멘드를 등록
  await rest.put(Routes.applicationCommands(process.env.Bot_ID), { body: commands });
} catch (err) {
  console.log(err);
}
