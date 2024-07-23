function getForm(){
    if(document.getElementById("auto").checked){
        chrome.storage.local.set({"preferred":"auto"})
    }else if(document.getElementById("button").checked){
        chrome.storage.local.set({"preferred":"button"})
    }

}
document.getElementById("submit").addEventListener("click", getForm);

window.onload=function(){
chrome.storage.local.get(["preferred"]).then((result)=>{
   console.log(result.preferred)
   document.getElementById(result.preferred).checked=true
})
}