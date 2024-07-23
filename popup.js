chrome.storage.local.get(["preferred"]).then((result)=>{
  if (result.preferred == "button"){
    document.querySelector("#sub").addEventListener("click", function(){
      chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {message:"answer"})
      })
      console.log("click")
    })
  }else if(result.preferred == "auto"){
    document.querySelector("#sub").remove()
    chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, {message:"answer"})
    })
  }
})




function sendAnswer(solution){
    alert(solution)
}