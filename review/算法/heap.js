// 最大堆
class MaxHeap {
  constructor(arr = []) {
    this.data = arr
    for (let i = this.parent(arr.length - 1); i >= 0; i--) {
      this.siftDown(i)
    }
  }
  parent(index) {
    if (index === 0) {
      throw new Error('index-0 does not have parent')
    }
    return (index - 1) / 2 | 0
  }
  leftChild(index) {
    return index * 2 + 1
  }
  rightChild(index) {
    return index * 2 + 2
  }

  swap(arr, i, j) {
    if (i < 0 || i > arr.length || j < 0 || j > arr.length) {
      throw new Error('数组越界')
    }
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }

  siftDown(index) {
    while (this.leftChild(index) < this.data.length) {
      let j = this.leftChild(index)
      if (j + 1 < this.data.length && this.data[j + 1] > this.data[j]) {
        j = this.rightChild(index)
      }
      if (this.data[index] > this.data[j]) {
        break
      } else {
        this.swap(this.data, index, j)
        index = j
      }
    }
  }

  siftUp(index) {
    while (index > 0 && this.data[parent(index)] < this.data[index]) {
      this.swap(arr, index, parent(index))
      index = parent(index)
    }
  }

  findeMax() {
    if (this.data.length === 0) {
      throw new Error('is empty')
    }
    return this.data[0]
  }

  extractMax() {
    var ret = this.findeMax()
    this.swap(this.data, 0, this.data.length - 1)
    this.data.pop()
    this.siftDown(0)
    return ret
  }

  add(element) {
    this.data.push(element)
    this.siftUp(this.data.length - 1)
  }
}





// 最小堆

class MinHeap {
  constructor(data) {
    this.data = data
    for (var i = parent(this.data.length - 1); i >= 0; i--) {
      this.siftDown(i)
    }
  }

  parent(index) {
    if (index === 0) {
      throw new Error('index=0 does not have parent')
    }
    return (index - 1) / 2 | 0
  }
  leftChild(index) {
    return index * 2 + 1
  }
  rightChild(index) {
    return index * 2 + 2
  }
  swap(arr, i, j) {
    if (i < 0 || i > arr.length || j < 0 || j > arr.length) {
      throw new Error('out of boundary of array')
    }
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  siftDown(index) {
    while(this.leftChild(index) < this.data.length) {
      var j = this.leftChild(index)
      if (j + 1 < this.data.length && this.data[j + 1] < this.data[j]) {
        j = this.rightChild(index)
      }
      if (this.data[index] < this.data[j]) {
        break
      } else {
        this.swap(arr, index, j)
        index = j
      }
    }
  }
  siftUp(index) {
    while(index > 0 && this.data[index] < this.data[parent[index]]) {
      this.swap(this.data, index, parent[index])
      index = parent(index)
    }
  }
  findMin() {
    if (this.data.length === 0) {
      throw new Error('arrary is empty')
    }
    return this.data[0]
  }
  extractMin() {
    var ret = this.findMin()
    this.swap(this.data, 0, this.data.length - 1)
    this.data.pop()
    this.siftDown(0)
    return ret
  }
}