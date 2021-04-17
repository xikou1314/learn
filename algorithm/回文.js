// 2进制 8进制 10进制的回文数 且10进制大于10

function reverse(str) {
  return str.split('').reverse().join('');
}


function Moslems() {
 var start = 11;
 while(true) {
   if (start.toString(2) === reverse(start.toString(2)) 
    && start.toString(8) === reverse(start.toString(8))
    && start.toString(10) === reverse(start.toString(10))
   ) {
     break
   } else {
     start += 2
   }
 } 
 return start
}

console.log(Moslems())