// 슬래시커멘드
import Discord, { GatewayIntentBits, Message, channelMention } from "discord.js";
import dotenv from "dotenv";
import { embedChzzk } from "./ryuChzzk.js";
import { todayRyu } from "./models/todayRyu.js";
import { linkCommands } from "./models/link.js";
import { likemessage } from "./models/likemessage.js";
import { message } from "./models/message.js";
import { message2 } from "./models/message2.js";
import { today } from "./models/today.js";
import { recommendSong } from "./models/recommendSong.js";

dotenv.config();

const client = new Discord.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
  disableEveryone: false,
});

// 봇을 온라인 상태로
client.on("ready", () => {
  console.log(`Woking ${client.user.tag}!`);

  // 라이브 상태에 대한 변수
  let liveStatus = "";

  // 반복적인 확인을 위해 setInterval
  setInterval(() => {
    // 채널아이디를 변수에 담기.
    const channelID = process.env.Channel_ID_natural;
    const channelID2 = process.env.Channel_ID_Play;
    const channelID3 = process.env.Channel_ID_Test;
    const channelID4 = process.env.Channel_ID_Zoe;

    // 채널불러오기.
    const channel = client.channels.cache.get(channelID);
    const channel2 = client.channels.cache.get(channelID2);
    const channel3 = client.channels.cache.get(channelID3);
    const channel4 = client.channels.cache.get(channelID4);

    // 라이브상태를 최근라이브상태변수에 대입
    let recentState = liveStatus;

    // fetch 로 치지직 api 에서 방송중여부 가져오기.
    // 치지직 방송 알림
    fetch(process.env.liveAPI, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // 최근 라이브 상태를 api로 재확인
        recentState = data.content.status;

        // 최근 라이브상태와 라이브상태가 같지않은 경우
        if (recentState !== liveStatus) {
          // 만약 그 상태가 open 이라면 방송알림
          if (data.content.status === "OPEN") {
            const embedsChzzk = embedChzzk(
              data.content.liveTitle,
              "귀엽둥이 류님",
              process.env.RyuChzzk,
              data.content.categoryType,
              data.content.liveCategoryValue
            );

            channel.send({ embeds: [embedsChzzk] });
            channel2.send({ embeds: [embedsChzzk] });
            channel3.send({ embeds: [embedsChzzk] });
            channel4.send({ embeds: [embedsChzzk] });
          } else {
            // 뱅종하면 console로 확인
            console.log("지금 아가는 쉬는 중");
          }

          // 바뀐 경우에 바뀐 값을 라이브상태에 대입
          liveStatus = recentState;
        }
      })
      .catch((err) => console.log(err));
  }, 3000);
});

// 명령어에 따른 답변
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "link") {
    await interaction.reply(linkCommands);
  }

  if (interaction.commandName === "todayryu") {
    let random = Math.floor(Math.random() * todayRyu.length);
    await interaction.reply(todayRyu[random]);
  }

  if (interaction.commandName === "today") {
    let random = Math.floor(Math.random() * today.length);
    await interaction.reply(today[random]);
  }

  if (interaction.commandName === "question1") {
    let random = Math.floor(Math.random() * likemessage.length);
    await interaction.reply(
      "만약 당신이 아카이로 류에게 사귀자 했을 때, 대답은?! \n 아카이로 류 : " + likemessage[random]
    );
  }

  if (interaction.commandName === "question2") {
    let random = Math.floor(Math.random() * message.length);
    await interaction.reply(
      "임무 중 다친 나를 발견한 아카이로 류, 반응은?! \n 아카이로 류 : " + message[random]
    );
  }

  if (interaction.commandName === "question3") {
    let random = Math.floor(Math.random() * message2.length);
    await interaction.reply(
      "훈련장에서 아카이로 류와 눈이 마주쳤다. 류의 반응은? \n 아카이로 류 : " + message2[random]
    );
  }

  if (interaction.commandName === "recommend_song") {
    let random = Math.floor(Math.random() * recommendSong.length);
    await interaction.reply(recommendSong[random]);
  }

  if (interaction.commandName === "help") {
    await interaction.reply("스스로 강하게 커야지? 키킼");
  }
});

// 커멘드에 따른 답변
// client.on("messageCreate", async (message) => {
//   // console.log(message.content);
//   if (message.content === "hello") {
//     // 아래처럼 하면 언급해서 답변하는 방식
//     // await message.reply("hihi")

//     // 아래처럼 하면 일반 디엠하듯이 할 수 있음
//     await message.channel.send("hihi");
//   }
// });

client.login(process.env.Token);
