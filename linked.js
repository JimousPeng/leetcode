/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
    // 递归反转链表 72 ms	43.5 MB
    // if (head === null || head.next === null) return head
    // let newHead = reverseList(head.next)
    // head.next.next = head // 让head的下一个指向自己, 反转自己与下一个节点
    // head.next = null // 将当前节点指向null,目的是递归执行到head的时候保证最初的头节点Head指向null
    // return newHead

    // 迭代 	76 ms	42.9 MB
    // let prev = null
    // let cur = head
    // while (cur) {
    //     const next = cur.next
    //     cur.next = prev
    //     prev = cur
    //     cur = next
    // }
    // return prev

    // 栈 	68 ms	43.1 MB
    if (head === null || head.next === null) return head
    const stack = []
    while (head) {
        stack.push(head)
        head = head.next
    }
    let last = (newhead = stack[stack.length - 1])
    for (let i = stack.length - 2; i >= 0; i--) {
        if (!stack[i]) {
            break
        }
        newhead.next = stack[i]
        newhead = newhead.next
    }
    newhead.next = null
    return last
}
