


function setCookie() {
  var cookieNameElement = document.getElementById('cookieName')
  var cookieValueElement = document.getElementById('cookieValue')
  var d = new Date()

  d.setTime(d.getTime() + (24*60*60*1000))
  var expires = "expires=" + d.toGMTString()
  document.cookie = cookieNameElement.value + "=" + cookieValueElement.value + ";" + expires

}

function getCookies() {
  var cookieContent = document.getElementById('cookie-content')
  cookieContent.innerText = document.cookie
}

function getCookie(cookieName) {
  var name =  cookieName + "="
  var ca = document.cookie.split(';')

  for (var i=0; i<ca.length; i++) {
    var c = ca[i].trim()
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
    return ""
  }
}

function CookieEnable(){
  var result = false;
  if (navigator.cookiesEnabled) return true;

  document.cookie = "testcookie=yes;";

  var cookieSet = document.cookie;

  if (cookieSet.indexOf("testcookie=yes") > -1) result = true;

  document.cookie = "";

  return result;
}

if(!CookieEnable()){
  alert("对不起，您的浏览器的Cookie功能被禁用，请开启");
}