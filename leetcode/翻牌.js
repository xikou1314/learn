// 100张牌牌面向下 从第n张开始 每隔n-1张翻一张牌 n >= 2 最后无牌可翻时 牌面向上的牌是哪几张?

for (var i=1; i<= 100; i++) {
  var count = 0
  for (var k=2; k<=i; k++) {
   if (i%k == 0) {
     count++
   }
  }
  if (count % 2 == 0) {
    console.log('牌面向上', i)
  }
}