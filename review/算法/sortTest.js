// 稳定的算法 冒泡排序 插入排序 归并排序 选择排序

// 不稳定的算法 快速排序 希尔排序 堆排序

// 冒泡排序 稳定
function bubbleSort(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    for (var j = 0; j < i; j++) {
      if (arr[j] < arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}
// 选择排序 稳定
function selectSort(arr) {
  var minIndex = 0
  for (var i = 0; i < arr.length; i++) {
    for (var j = i; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
  }
}
// 插入排序 稳定
function insertSort(arr) {
  for (var i=1; i<arr.length; i++) {
    var temp = arr[i]
    var j = i
    while(j > 0 && arr[j - 1] > temp) {
      arr[j] = arr[j - 1]
      --j
    }
    arr[j] = temp
  }
}

// 归并排序 稳定

function mergeSort(arr) {
  var n = 1
  while(n < arr.length) {
    var left = 0
    var right = n
    while(right + n < arr.length) {
      mergeSortFn(arr, left, left+n, right, right + n)
      left = right + n
      right = left + n
    }
    if (right + n > arr.length) {
      mergeSortFn(arr, left, left + n, right, arr.length)
    }
    n*=2
  }
}
function mergeSortFn(arr, leftStart, leftStop, rightStart, rightStop) {
  var left = arr.slice(leftStart, leftStop)
  var right = arr.slice(rightStart, rightStop)
  var k = leftStart
  var m = 0
  var n = 0
  while(k < rightStop) {
    if (left[m] < right[n]) {
      arr[k] = left[m]
      m++
      k++
    } else {
      arr[k] = right[n]
      n++
      k++
    }
  }
}


// 希尔排序 不稳定
function shellSort(arr) {
  var gaps = [5, 3, 1]
  for (var g=0; g<gaps.length; g++) {
    for(var i=gaps[g]; i<arr.length; i++) {
      var temp = arr[i]
      var j = i
      while(j >= gaps[g]  && arr[j - gaps[g]] > temp) {
        arr[j] = arr[j - gaps[g]]
        j-=gaps[g]
      }
      arr[j] = temp
    }
  }
}

// 动态希尔排序 不稳定

function dynamicShellSort(arr) {
  var gap = 1
  while(gap < arr.length / 3) {
    gap = gap * 3 + 1
  }
  while(gap >= 1) {
    for (var i = gap; i<arr.length; i++) {
      var temp = arr[i]
      var j = i
      while(j >= i && arr[j - gap] > temp) {
        arr[j] = arr[j - gap]
        j-=gap
      }
      arr[j] = temp 
    }
  }
  return arr
}

// 快速排序
function quickSort(arr) {
  var base = arr[0]
  var left = []
  var right = []
  for (var i=0; i< arr.length; i++) {
    if (arr[i] < base) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return [].concat(quickSort(left)).concat(base).concat(quickSort(right))
}