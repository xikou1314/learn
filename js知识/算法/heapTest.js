// 最大堆

class MaxHeap {
  constructor(arr) {
    this.data = arr
    // 从第一个父节点开始 逐个下沉
    for (var i = this.parent(arr.length - 1); i >= 0; i--) {
      this.siftDown(i)
    }
  }
  parent(index) {
    if (index == 0) {
      throw new Error('index-0 does not have parent')
    }
    return (index - 1) / 2 | 0
  }
  leftChild(index) {
    return 2 * index + 1
  }
  rightChild() {
    return 2 * index + 2
  }
  siftDown(index) {
    // 当前节点有子节点是
    while (this.leftChild(index) < this.data.length) {
      // 左节点
      var j = this.leftChild(index)
      // 拿到左右子节点当中最大的那一个
      if (j + 1 < this.data.length && this.data[j + 1] > this.data[j]) {
        j = j + 1
      }
      // 如果当前节点比子节点都大 则终止
      if (this.data[index] > this.data[j]) {
        break
      } else {
        // 否则和子节点中最大的交换
        [this.data[index], this.data[j]] = [this.data[j], this.data[index]]
        // 然后继续下沉
        index = j
      }
    }
  }
  siftUp(index) {
    // 只要当前节点比父节点大 就上浮 交换 然后继续上浮
    while (this.data[index] > this.parent(index)) {
      [this.data[index], this.data[this.parent(index)]] = [this.data[this.parent(index)], this.data[index]]
      index = this.parent(index)
    }
  }
  findMax() {
    if (this.data.length == 0) {
      throw new Error('is empty')
    }
    return this.data[0]
  }
  extractMax() {
    [this.data[0], this.data[this.data.length - 1]] = [this.data[this.data.length - 1], this.data[0]]
    var ret = this.data.pop()
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
  constructor(arr) {
    this.data = arr
    for(var i = this.parent(this.data.length - 1); i>=0; i--) {
      this.siftDown(i)
    }
  }
  parent(index) {
    if (index == 0) {
      throw new Error('index-0 does not have parent')
    }
    return (index - 1) / 2 | 0
  }
  leftChild(index) {
    return 2 * index + 1
  }
  rightChild(index) {
    return 2 * index + 2
  }
  swap(index1, index2) {
    [this.data[index1], this.data[index2]] = [this.data[index2], this.data[index1]]
  }
  siftDown(index) {
    while (this.leftChild(index) < this.data.length) {
      var j = this.leftChild(index)
      if (j + 1 < this.data.length && this.data[j + 1] < this.data[j]) {
        j = j + 1
      }
      if (this.data[index] < this.data[j]) {
        break
      } else {
        this.swap(index, j)
        index = j
      }
    }
  }
  siftUp(index) {
    while (this.data[index] < this.data[this.parent(index)]) {
      this.swap(index, this.parent(index))
      index = this.parent(index)
    }
  }
  findMin() {
    return this.data[0]
  }
  extractMin() {
    this.swap(0, this.data.length)
    var ret = this.data.pop()
    this.siftDown(0)
    return ret
  }
  addElement(element) {
    this.data.push(element)
    this.siftUp(this.data.length - 1)
  }
}