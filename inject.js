if (chrome.storage.sync.get(["status"]) != "true") {
  chrome.storage.sync.set({ status: "true" });
  chrome.storage.sync.set({ preferred: "button" });
}
const todayDate = new Date();
const month = (todayDate.getMonth() + 1).toString().padStart("0", 2);
const day = todayDate.getDate().toString().padStart("0", 2);
const year = todayDate.getFullYear();
console.log(
  `https://www.nytimes.com/svc/wordle/v2/${year}-${month}-${day}.json`
);
async function loadDay() {
  const response = await fetch(
    `https://www.nytimes.com/svc/wordle/v2/${year}-${month}-${day}.json`,
    {
      headers: {
        "Content-Encoding": "gzip",
      },
      mode: "cors",
      method: "GET",
    }
  );
  const jsons = await response.json();
  console.log(jsons.solution);
  chrome.storage.local.get(["preferred"]).then((result) => {
    if (result.preferred == "auto") {
      //alert(jsons.solution);
      let observer = new MutationObserver((mut) => {
        const game = document.querySelector(".App-module_gameContainer__K_CBh");
        if (game) {
          console.log("LOG: Game Loaded!");
          enterAnswer();
          observer.disconnect();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    } else {
      chrome.runtime.onMessage.addListener(function (request) {
        if (request.message == "answer") {
          enterAnswer();
        }
      });
    }
  });
  function enterAnswer() {
    const letters = jsons.solution.split("");
    console.log(letters);
    try {
      for (let i = 0; i < letters.length; i++) {
        document.querySelector(`[data-key=${letters[i]}]`).click();
      }
    } finally {
      document.querySelector("[data-key=↵]").click();
    }
  }
}
function minTwoDigits(n) {
  return (n < 10 ? "0" : "") + n;
}
loadDay();
