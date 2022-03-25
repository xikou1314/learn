// 线性查找
function search(arr, data) {
  for(var i=0; i<arr.length; i++) {
    if (arr[i] == data) {
      return i
    }
  }
  return -1
}


// 循环二分查找
function binarySearchByWhile(arr, data) {
  var left, right, mid

  left = 0
  right = arr.length
  while(left <= right) {
    mid = Math.floor((right-left)/2 + left)
    if (arr[mid] == data) {
      return mid
    } else if(data < arr[mid]) {
      right = mid - 1
    } else if (data > arr[mid]) {
      left = mid + 1
    }
  }
  return -1
}

// 递归二分查找
function binarySearch(arr, data) {
  return binaryFn(arr, data, 0, arr.length)
}

function binaryFn(arr, data, left, right) {
  if (left > right) return -1
  var mid = Math.floor((right - left) /2) + left
  if (arr[mid] == data) {
    return mid
  } else if(data < arr[mid]) {
    return binaryFn(arr, data, left, mid -1)
  } else if (data > arr[mid]) {
    return binaryFn(arr, data, mid + 1, right)
  }
}
