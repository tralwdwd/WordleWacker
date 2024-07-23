if (chrome.storage.sync.get(["status"]) != "true") {
  chrome.storage.sync.set({ status: "true" });
  chrome.storage.sync.set({ preferred: "button" });
}
const todayDate = new Date();
const month = minTwoDigits(todayDate.getMonth() + 1);
const day = minTwoDigits(todayDate.getDate());
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
      alert(jsons.solution);
      window.addEventListener("load", function () {
        document
          .querySelectorAll("[data-testid=Play]")[0]
          .addEventListener("click", function () {
            setTimeout(function () {
              document.querySelector(
                ".Toolbar-module_toolbar__DGjo1"
              ).innerHTML += `<p style="color:white;font-size:25px;">The answer is ${jsons.solution.toUpperCase()}</p>`;
            }, );
          });
      });
    } else {
      chrome.runtime.onMessage.addListener(function (
        request,
        sender,
        sendResponse
      ) {
        if (request.message == "answer") {
          alert(jsons.solution);
          if (
            document.querySelector(".Toolbar-module_toolbar__DGjo1") != null
          ) {
            document.querySelector(
              ".Toolbar-module_toolbar__DGjo1"
            ).innerHTML += `<p style="color:white;font-size:25px;">The answer is ${jsons.solution.toUpperCase()}</p>`;
          }
        }
      });
    }
  });
}
function minTwoDigits(n) {
  return (n < 10 ? "0" : "") + n;
}
loadDay();
