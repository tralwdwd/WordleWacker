const todayDate = new Date();
const month = (todayDate.getMonth() + 1).toString().padStart(2, "0");
const day = todayDate.getDate().toString().padStart(2, "0");
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
  
      let observer = new MutationObserver((mut) => {
        const game = document.querySelector(".App-module_gameContainer__K_CBh");
        if (game) {
          console.log("LOG: Game Loaded!");
          enterAnswer();
          observer.disconnect();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    
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

loadDay();
