// 线性搜索

function search(arr, data) {
  // 直接全量地在数组中遍历查找
  for (var i = 0; i< arr.length; i++) {
    if (arr[i] == data) {
      return i
    }
  }
  return -1
}

// 循环实现二分搜索
function binarySearchByWhile(arr, data) {
  // 比中值大的 在右边去找 比中值小的 在左边去找
  var left = 0
  var right = arr.length
  var mid 
  while(left <= right) {
    mid = Math.floor((right - left) / 2)
    if (arr[mid] == data) {
      return mid
    } else if(data < arr[mid]) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return -1
}

// 递归实现二分搜索
function binarySearch(arr, data) {
  return binarySearchFn(arr, data, 0, arr.length)
}
function binarySearchFn(arr, data, left, right) {
  var mid = Math.floor((right - left) / 2)
  if (arr[mid] == data) {
    return mid
  } else if (data < arr[mid]) {
    return binarySearchFn(arr, data, left, mid - 1)
  } else {
    return binarySearchFn(arr, data, mid + 1, right)
  }
}