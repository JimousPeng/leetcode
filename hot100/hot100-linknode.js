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

/**
 * 24. 两两交换链表中的节点
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
    /**
     * 给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。
     * 输入：head = [1,2,3,4] 输出：[2,1,4,3]
     * 输入：head = [1] 输出：[1]
     */

    function twoPoint() {
        if (head === null || head.next === null) return head
        let node = head
        let nextNode = node.next
        let tailNode = new ListNode(0)
        tailNode.next = head

        let prevNode = tailNode

        // 存在可交换的节点，对于node和nextNode交换
        while (node && nextNode) {
            // [1,2] -> [2,1]  => 第一步： [1,2] -> [1, null]  第二步：[2, 1]
            node.next = nextNode.next
            nextNode.next = node

            prevNode.next = nextNode

            prevNode = node

            node = node.next

            nextNode = node?.next || null
        }
        return tailNode.next
    }

    function changeDirect() {
        if (head === null || head.next === null) return head
        let newHead = head.next // 新的头节点，一定是第一个head的next节点
        let changeNode = head // 当前被改变的节点, 与changeNode.next交换
        let tempNode = null
        while (changeNode && changeNode.next) {
            const nextNode = changeNode.next
            const nextStart = nextNode.next // 下一次起点

            // 两两交换
            nextNode.next = changeNode
            changeNode.next = nextStart

            if (tempNode) {
                tempNode.next = nextNode
            }
            tempNode = changeNode

            changeNode = nextStart
        }

        return newHead
    }
}

/**
 * 138. 随机链表的复制
 * @param {_Node} head
 * @return {_Node}
 */
var copyRandomList = function (head) {
    /**
     * 给你一个长度为 n 的链表，每个节点包含一个额外增加的随机指针 random ，该指针可以指向链表中的任何节点或空节点
     * 构造这个链表的 深拷贝
     *
     * 深拷贝应该正好由 n 个 全新 节点组成，其中每个新节点的值都设为其对应的原节点的值。
     * 新节点的 next 指针和 random 指针也都应指向复制链表中的新节点，并使原链表和复制链表中的这些指针能够表示相同的链表状态。
     * 复制链表中的指针都不应指向原链表中的节点
     *
     * 例如，如果原链表中有 X 和 Y 两个节点，其中 X.random --> Y 。那么在复制链表中对应的两个节点 x 和 y ，同样有 x.random --> y
     * 返回复制链表的头节点
     *
     * 用一个由 n 个节点组成的链表来表示输入/输出中的链表。每个节点用一个 [val, random_index] 表示
     * val：一个表示 Node.val 的整数。
     * random_index：随机指针指向的节点索引（范围从 0 到 n-1）；如果不指向任何节点，则为  null
     *
     * Node.random 为 null 或指向链表中的节点
     */

    // 已知 val为值，random指向对应节点node实例
    function cross() {
        if (head === null) return null

        /**
         * 第一步：构建新的节点  A -> B -> C  ===>  A -> A' -> B -> B' -> C -> C'
         * 第二步：构建新节点的random指向
         * 第三步：分离新旧节点
         */

        // 第一步
        let node = head
        while (node) {
            const prevNext = node.next
            let newNode = new ListNode(node.val)
            newNode.next = prevNext || null
            node.next = newNode

            node = prevNext
        }

        // 第二步
        let cur = head
        while (cur) {
            let isNewNode = cur.next

            isNewNode.random = cur.random?.next || null

            cur = isNewNode.next
        }

        let old = head
        const newHead = old.next
        let newNode = newHead
        while (old) {
            old.next = newNode.next
            old = old.next
            if (old !== null) {
                newNode.next = old.next
            } else {
                newNode.next = null
            }
            newNode = newNode.next
        }

        return newHead
    }
}

/**
 * 148. 排序链表  给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function (head) {
    // 输入：head = [4,2,1,3] 输出：[1,2,3,4]
    // 输入：head = [-1,5,3,4,0] 输出：[-1,0,3,4,5]

    function cross() {
        if (head === null || head.next === null) return head
        let node = head
        const nodeStack = []
        while (node) {
            nodeStack.push(node)
            node = node.next
        }
        nodeStack.sort((a, b) => a.val - b.val)

        let newHead = new ListNode(nodeStack[0].val)
        let cur = newHead
        for (let i = 1; i < nodeStack.length; i++) {
            const node = new ListNode(nodeStack[i].val)
            cur.next = node
            cur = cur.next
        }
        cur.next = null
        return newHead
    }
}
