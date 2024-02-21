/** 链表
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/** 143. 重排链表
 * 给定一个单链表 L 的头节点 head ，单链表 L 表示为：
 * L0 → L1 → … → Ln - 1 → Ln
 * 请将其重新排列后变为：
 * L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
 * 不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换
 *
 * 输入：head = [1,2,3,4] 输出：[1,4,2,3]
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {
    if (head === null) return
    let slow = head
    let fast = head
    // 找到链表中间节点 - slow
    while (fast.next !== null && fast.next.next !== null) {
        fast = fast.next.next
        slow = slow.next
    }
    // 反转后半段链表 - pre节点为尾节点
    let pre = null,
        cur = slow.next

    slow.next = null // 避免原节点产生环

    while (cur) {
        const temp = cur.next
        cur.next = pre
        pre = cur
        cur = temp
    }

    // 将前半段链表与反转后的后半段链表重新组合
    while (pre) {
        const tempPre = pre.next
        const tempHead = head.next
        head.next = pre
        head.next.next = tempHead
        head = tempHead
        pre = tempPre
    }
}

/** 24. 两两交换链表中的节点
 *  给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
    if (head === null || head.next === null) return head
    let newHead = head.next

    let changeNode = head
    let tempNode = null
    while (changeNode && changeNode.next) {
        const nextNode = changeNode.next
        let temp = nextNode.next // 暂存下一次交换的头结点
        nextNode.next = changeNode

        changeNode.next = temp

        if (tempNode) {
            tempNode.next = nextNode // 将上一次交换的尾节点与当前头节点建联
        }
        tempNode = changeNode

        changeNode = temp
    }
    return newHead
}

/** 203. 移除链表元素
 *  给你一个链表的头节点 head 和一个整数 val ，请你删除链表中所有满足 Node.val == val 的节点，并返回 新的头节点
 *  输入：head = [1,2,6,3,4,5,6], val = 6  输出：[1,2,3,4,5]
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
    // 递归效率不如while循环好
    if (head == null) return null

    head.next = removeElements(head.next, val)
    if (head.val === val) {
        return head.next
    } else {
        return head
    }

    // let headNode = head
    // let cur = head
    // let prev = null
    // while (cur) {
    //     if (headNode.val === val) {
    //         headNode = headNode.next
    //     }
    //     if (cur.val === val) {
    //         if (prev) {
    //             prev.next = cur.next
    //         }
    //     } else {
    //         prev = cur
    //     }
    //     cur = cur.next
    // }
    // return headNode
}

// 83. 删除排序链表中的重复元素
/**
 * 给定一个已排序的链表的头 head ， 删除所有重复的元素，使每个元素只出现一次 。返回 已排序的链表
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
    if (head == null || head.next == null) {
        return head
    }
    let res = head
    while (head) {
        if (head.next === null) break
        if (head.val === head.next.val) {
            head.next = head.next.next
        } else {
            head = head.next
        }
    }
    return res
}
