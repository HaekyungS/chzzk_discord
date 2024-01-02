// 슬래시커멘드
import Discord, { GatewayIntentBits, Message, channelMention } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new Discord.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
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

    // 채널불러오기.
    const channel = client.channels.cache.get(channelID);

    // 라이브상태를 최근라이브상태변수에 대입
    let recentState = liveStatus;

    // fetch 로 치지직 api 에서 방송중여부 가져오기.
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
            channel.send("대쟝왔다!! \n" + process.env.RyuChzzk);
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

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }

  if (interaction.commandName === "today") {
    await interaction.reply("오늘 밖에 되게 우중충해");
  }
});

// 커멘드에 따른 답변
client.on("messageCreate", async (message) => {
  // console.log(message.content);
  if (message.content === "hello") {
    // 아래처럼 하면 언급해서 답변하는 방식
    // await message.reply("hihi")

    // 아래처럼 하면 일반 디엠하듯이 할 수 있음
    await message.channel.send("hihi");
  }
});

client.login(process.env.Token);
