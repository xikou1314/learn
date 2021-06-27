function cutTree(m, n) {
  var count = 0;
  var current = 1;
  while (n > current) {
    current += current < m ? current : m;
    count++;
  }
  return count
}

console.log(cutTree(3, 20))
console.log(cutTree(5, 100))


function cutTree1(m, n, current) {
  if (current >= n) {
    return 0
  } else if (current < m) {
    return 1 + cutTree1(m, n, current * 2)
  } else {
    return 1 + cutTree1(m, n, current + m)
  }
}

console.log(cutTree1(3, 20,1))
console.log(cutTree1(5, 100,1))