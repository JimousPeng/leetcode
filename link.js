/** 链表
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

// 83. 删除排序链表中的重复元素
/**
 * 给定一个已排序的链表的头 head ， 删除所有重复的元素，使每个元素只出现一次 。返回 已排序的链表
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
    const linkMap = new Set([head.val])
    let newHead = (curHead = head.next)
    while (curHead) {
        curHead = curHead.next
        if (!linkMap.has(curHead.val)) {
            linkMap.add(curHead.val)
        }
        curHead = curHead?.next
    }
    return newHead
}
