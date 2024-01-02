// fetch 로 치지직 api 에서 방송중여부 가져오기.
fetch(
  "https://api.chzzk.naver.com/polling/v1/channels/f67b66f4051fd2744ba9366571565771/live-status",
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }
)
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    console.log(data.content.status);
    if (data.content.status === "OPEN") {
      channel.send("방송중~ https://chzzk.naver.com/live/f67b66f4051fd2744ba9366571565771");
    } else {
      channel.send("지금은 방송안하는즁");
    }
  })
  .catch((err) => console.log(err));
