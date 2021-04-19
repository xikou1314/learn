/*
 * @lc app=leetcode.cn id=160 lang=javascript
 *
 * [160] 相交链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  // 时间复杂到位n 空间复杂度为1
  // 遍历节点 并记录每个链表的长度 若最后一个节点相同 则想交
  // 若相交 将长度较长的那个起点与较短的那个对齐 对齐以后再遍历 判断相交的起点

  let indexA = headA
  let indexB = headB
  let lengthA = 0
  let lengthB = 0

  while (indexA.next) {
    indexA = indexA.next
    lengthA++
  }

  while (indexB.next) {
    indexB = indexB.next
    lengthB++
  }

  if (indexA !== indexB) {
    return null
  }

  if (lengthA >= lengthB) {
    const step = lengthA - lengthB
    indexA = headA
    for (let i = 0; i < step; i++) {
      indexA = indexA.next
    }
    indexB = headB
  } else {
    const step = lengthB - lengthA
    indexB = headB
    for (let i = 0; i < step; i++) {
      indexB = indexB.next
    }
    indexA = headA
  }

  while (indexA) {
    if (indexA === indexB) {
      break
    }
    indexA = indexA.next
    indexB = indexB.next
  }

  return indexA


};
// @lc code=end