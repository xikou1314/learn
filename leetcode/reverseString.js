// 反转字符串
function reverse (str) {
    var arr = str.split('').reverse();
    var result = '';
    arr.forEach(v => {
        result += v;
    })
    return result;
}
console.log(reverse('Hello World!'));
// 回问
function isPalindrome(str) {
    str = str.replace(/[^a-z]/ig,'');
    
    var str1 = str.split('').reverse().join('');

    return str === str1;
}

console.log(isPalindrome('sas'));
// 整数反转
function intReverse(num) {
    return Math.sign(num) * parseInt((num+'').split('').reverse().join(''));
}

console.log(intReverse(-1234));

// Fizz Buzz
function fizzBuzz(num) {
    for(var i=1; i<=num; i++) {
        if(i%6 === 0) {
            console.log('Fizz Buzz')
        } else if(i%3 === 0) {
            console.log('Buzz');
        } else if(i%2 === 0) {
            console.log('Fizz');
        } else {
            console.log(i);
        }
    }
}
fizzBuzz(24);

function characterNum(str) {
    var arr = str.split('');
    var ob = {};
    arr.forEach(v => {
        if(ob[v]) {
            ob[v] ++;
        } else {
            ob[v] = 1;
        }
    })
    var keys = Object.keys(ob);
    var max = 0;
    var result = "";
    for (var key of keys) {
        if(ob[key] > max) {
            max = ob[key];
            result = key;
        }
    }
    return result;
}

console.log(characterNum('sdsdafertghashjdgasdgasdgahjsdashjdashjdg'));