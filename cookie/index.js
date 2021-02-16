


function setCookie() {
  var cookieNameElement = document.getElementById('cookieName')
  var cookieValueElement = document.getElementById('cookieValue')
  
  
  console.log(cookieNameElement.value)

  var d = new Date()

  d.setTime(d.getTime() + (24*60*60*1000))
  var expires = "expires=" + d.toGMTString()
  document.cookie = cookieNameElement.value + "=" + cookieValueElement.value + ";" + expires

}

function getCookies() {
  var cookieContent = document.getElementById('cookie-content')
  console.log('cookies', document.cookie)
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