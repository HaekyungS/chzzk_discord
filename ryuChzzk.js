import { EmbedBuilder } from "discord.js";

export const embedChzzk = (title, name, link, content, contentname) => {
  const chzzk = new EmbedBuilder()
    // 임베디드 색상
    .setColor(0xf08080)
    //알림 제목 -> 이게 방제여야하나..?
    .setTitle(title)
    // 알림 링크
    .setURL(link)
    // 작성자(봇이름하면되지않으까) iconUrl / Link 도 넣을 수 있음
    .setAuthor({ name: "chzzk" })
    .setDescription(`치지직에서 ${name}의 생방송이 시작되었습니다!`)
    // 썸네일...? 방송 정보 제공자료에 썸네일도 있는지 볼것
    // .setThumbnail()
    .setFields({ name: content, value: contentname, inline: true })
    // .setImage(image)
    .setFooter({ text: "제작자 김쪼에" });

  return chzzk;
};
