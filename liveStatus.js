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
    }
  })
  .catch((err) => console.log(err));
