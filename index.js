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

  let liveStatus = "";

  setInterval(() => {
    // 채널아이디를 변수에 담기.
    const channelID = process.env.Channel_ID_natural;

    // 채널불러오기.
    const channel = client.channels.cache.get(channelID);

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
        recentState = data.content.status;
        if (recentState !== liveStatus) {
          if (data.content.status === "OPEN") {
            channel.send("방송중~" + process.env.RyuChzzk);
          } else {
            console.log("지금 아가는 쉬는 중");
          }

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
