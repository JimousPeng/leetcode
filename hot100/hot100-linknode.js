/** 链表节点结构
 *
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * 19. 删除链表的倒数第 N 个结点
 * 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    // 输入：head = [1,2,3,4,5], n = 2 输出：[1,2,3,5]
    // 输入：head = [1], n = 1 输出：[]
    // 输入：head = [1,2], n = 1 输出：[1]
    // head = [1,2]  n = 2  => [2]

    /** 这里涉及到两次遍历 */
    function crossTwice() {
        let len = 0
        let node = head
        while (node) {
            len++
            node = node.next
        }

        if (len === n && n === 1) return head.next

        const jumpStart = len - n

        /** 如果倒数到第一项，那么直接返回 head.next
         * head = [1,2]  n = 2  => [2]
         */
        if (jumpStart === 0) {
            return head.next
        }

        let newHead = head
        let count = 0
        while (newHead) {
            count++
            if (count === jumpStart) {
                newHead.next = newHead.next.next
                return head
            } else {
                newHead = newHead.next
            }
        }
    }

    /** 一次遍历的思路应该是利用快慢指针，类似于 fast = slow + n */
    function crossOnce() {
        let fast = head
        let count = 0
        while (fast && count < n) {
            count++
            fast = fast.next
        }

        let mockHead = new ListNode(0)
        mockHead.next = head
        let slow = mockHead
        while (fast) {
            fast = fast.next
            slow = slow.next
        }
        slow.next = slow.next.next
        return mockHead.next
    }
}
