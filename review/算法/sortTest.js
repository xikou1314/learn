// 稳定的算法 冒泡排序 插入排序 归并排序 选择排序

// 不稳定的算法 快速排序 希尔排序 堆排序

// 冒泡排序 稳定
function bubbleSort(arr) {
  // 从最后开始 一个个的交换 已经冒泡上来的就不动了
  for (var i = arr.length - 1; i > 0; i--) {
    for (var j = 0; j < i; j++) {
      if (arr[j] < arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
// 选择排序 稳定
function selectSort(arr) {
  // 从最前开始 每次选最小的和当前交换位置 已经选出来的不要动了
  var minIndex = 0;
  for (var i = 0; i < arr.length; i++) {
    for (var j = i; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
}
// 插入排序 稳定
function insertSort(arr) {
  // 从当前位置开始 若前面的比当前的大 他们就都往后移一位 比当前小的或相等的 才把当前位置的值赋值给他
  for (var i = 1; i < arr.length; i++) {
    var temp = arr[i];
    var j = i;
    while (j > 0 && arr[j - 1] > temp) {
      arr[j] = arr[j - 1];
      --j;
    }
    arr[j] = temp;
  }
}

// 归并排序 稳定

function mergeSort(arr) {
  // 从步数1开始 用左右两个指针控制 把当前数组都归并完 然后再把步数翻倍 继续归并 直到step大于数组的长度
  var step = 1;
  while (step < arr.length) {
    var left = 0;
    var right = step;
    while (right + step < arr.length) {
      mergeSortFn(arr, left, left + step, right, right + step);
      left = right + step;
      right = left + step;
    }
    if (right + step > arr.length) {
      mergeSortFn(arr, left, left + step, right, arr.length);
    }
    step *= 2;
  }
}

function mergeSortFn(arr, leftStart, leftStop, rightStart, rightStop) {
  var left = arr.slice(leftStart, leftStop);
  var right = arr.slice(rightStart, rightStop);
  var k = leftStart;
  var m = 0;
  var n = 0;
  while (k < rightStop) {
    if (left[m] < right[n]) {
      arr[k] = left[m];
      m++;
      k++;
    } else {
      arr[k] = right[n];
      n++;
      k++;
    }
  }
}

// 希尔排序 不稳定
function shellSort(arr) {
  // 类似插入排序 不过按照间隔分成多组 进行插入排序 最后一个间隔为1 基本上不用做多少改变
  var gaps = [5, 3, 1];
  for (var g = 0; g < gaps.length; g++) {
    for (var i = gaps[g]; i < arr.length; i++) {
      var temp = arr[i];
      var j = i;
      while (j >= gaps[g] && arr[j - gaps[g]] > temp) {
        arr[j] = arr[j - gaps[g]];
        j -= gaps[g];
      }
      arr[j] = temp;
    }
  }
}

// 动态希尔排序 不稳定

function dynamicShellSort(arr) {
  var gap = 1;
  while (gap < arr.length / 3) {
    gap = gap * 3 + 1;
  }
  while (gap >= 1) {
    for (var i = gap; i < arr.length; i++) {
      var temp = arr[i];
      var j = i;
      while (j >= i && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
    gap = (gap - 1) / 3
  }
  return arr;
}

// 快速排序
function quickSort(arr) {
  // 使用递归的方式 用参照值将数组分为大于参照值的数组和小于参照值的数组  然后递归的快速排序这两个数组
  var base = arr[0];
  var left = [];
  var right = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < base) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [].concat(quickSort(left)).concat(base).concat(quickSort(right));
}
