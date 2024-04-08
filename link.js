/** 链表
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/** LCR 140. 训练计划 II
 * 给定一个头节点为 head 的链表用于记录一系列核心肌群训练项目编号，请查找并返回倒数第 cnt 个训练项目编号
 * @param {ListNode} head  1 <= head.length <= 100
 * @param {number} cnt  1 <= cnt <= head.length
 * @return {ListNode}
 */
var trainingPlan = function (head, cnt) {
    let cur = head
    let count = 0
    while (cur !== null) {
        cur = cur.next
        count++
    }
    let k = count - cnt
    let fast = head
    while (k >= 1) {
        fast = fast.next
        k--
    }
    return fast
}

/** LCR 136. 删除链表的节点
 * 给定单向链表的头指针和一个要删除的节点的值，定义一个函数删除该节点
 * 返回删除后的链表的头节点。
 * 题目保证链表中节点的值互不相同
 * 输入: head = [4,5,1,9], val = 5  输出: [4,1,9]
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var deleteNode = function (head, val) {
    let cur = head
    let prev = null
    while (cur) {
        if (cur.val === val) {
            if (prev === null) {
                return cur.next
            }
            prev.next = cur.next
            return head
        }
        prev = cur
        cur = cur.next
    }
}

/** LCR 123. 图书整理 I
 * 书店店员有一张链表形式的书单，每个节点代表一本书，节点中的值表示书的编号
 * 为更方便整理书架，店员需要将书单倒过来排列，就可以从最后一本书开始整理，逐一将书放回到书架上
 * 请倒序返回这个书单链表
 * 输入：head = [3,6,4,1] 输出：[1,4,6,3]
 * 反转链表的变种
 * @param {ListNode} head  0 <= 链表长度 <= 10000
 * @return {number[]}
 */
var reverseBookList = function (head) {
    /** 误区：需要返回的是值的数组集合，而不是新的链表结构 */
    if (head === null) return []
    const stack = []
    while (head) {
        stack.push(head.val)
        head = head.next
    }
    return stack.reverse()
}

/** LCR 027. 回文链表
 * 给定一个链表的 头节点 head ，请判断其是否为回文链表
 * 如果一个链表是回文，那么链表节点序列从前往后看和从后往前看是相同的
 * 输入: head = [1,2,3,3,2,1]  输出: true
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
    let node = head
    const valStack = []
    while (node !== null) {
        valStack.push(node.val)
        node = node.next
    }
    const nodeLen = valStack.length
    let left = 0,
        right = nodeLen - 1
    while (left <= right) {
        if (valStack[left] !== valStack[right]) {
            return false
        }
        left++
        right--
    }
    return true
}

/** LCR 023. 相交链表
 * 给定两个单链表的头节点 headA 和 headB ，请找出并返回两个单链表相交的起始节点。
 * 如果两个链表没有交点，返回 null
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
    let nodeSet = new Set()

    let nodeA = headA

    while (nodeA) {
        nodeSet.add(nodeA)
        nodeA = nodeA.next
    }

    let nodeB = headB
    while (nodeB) {
        if (nodeSet.has(nodeB)) {
            return nodeB
        }
        nodeB = nodeB.next
    }

    return null
}

/** 82. 删除排序链表中的重复元素 II
 * 给定一个已排序的链表的头 head ， 删除原始链表中所有重复数字的节点，只留下不同的数字 。
 * 返回 已排序的链表
 * 输入：head = [1,2,3,3,4,4,5]  输出：[1,2,5]
 * [1,2,2] -> [1]
 * [1,2,3,3,4,4,5] -> [1,2,5]
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
    /** 官方题解 */

    if (!head) {
        return head
    }

    // 在head节点基础上增加一个哑节点0，用户处理后续的.next判断 0 -> head -> ···
    const dummy = new ListNode(0, head)

    let cur = dummy
    while (cur.next && cur.next.next) {
        if (cur.next.val === cur.next.next.val) {
            const x = cur.next.val
            while (cur.next && cur.next.val === x) {
                cur.next = cur.next.next
            }
        } else {
            cur = cur.next
        }
    }
    return dummy.next

    /**
     * 1. 链表已排序
     * 2. 删除重复数字节点
     * 3. 边界处理：头结点重复，尾节点重复
     */
    let newHead = null
    function dfs(cur, node) {
        if (cur === null) return
        /** 过滤掉重复项 */
        if (cur.next && cur.next.val === cur.val) {
            while (cur.next && cur.next.val === cur.val) {
                cur = cur.next
            }
            cur = cur.next
            return dfs(cur, node)
        }

        if (newHead === null) {
            newHead = new ListNode(cur.val)
            node = newHead
        } else {
            node.next = new ListNode(cur.val)
            node = node.next
        }

        return dfs(cur.next, node)
    }

    dfs(head, newHead)

    return newHead
}

/** 876. 链表的中间结点
 * 给你单链表的头结点 head ，请你找出并返回链表的中间结点
 * head = [1,2,3,4,5]   输出：[3,4,5]
 * 输入：head = [1,2,3,4,5,6]   输出：[4,5,6] 解释：该链表有两个中间结点，值分别为 3 和 4 ，返回第二个结点。
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function (head) {
    // let nodeList = []
    // let node = head
    // while (node.next) {
    //     nodeList.push(node)
    //     node = node.next
    // }
    // nodeList.push(node)
    // const getMid = Math.floor(nodeList.length / 2)
    // return nodeList[getMid]

    // 空间优化
    let n = 0
    let node = head
    while (node !== null) {
        n++
        node = node.next
    }
    let k = 1
    let cur = head
    const getMid = Math.floor(n / 2)
    while (k <= getMid) {
        cur = cur.next
        k++
    }
    return cur
}

/** 面试题 02.01. 移除重复节点
 * 编写代码，移除未排序链表中的重复节点。保留最开始出现的节点
 * 输入：[1, 2, 3, 3, 2, 1]  输出：[1, 2, 3]
 * 输入：[1, 1, 1, 1, 2]     输出：[1, 2]
 * @param {ListNode} head  链表长度在[0, 20000]范围内
 * @return {ListNode}
 */
var removeDuplicateNodes = function (head) {
    if (head === null || head.next === null) return head
    const nodeMap = {}
    nodeMap[head.val] = true
    let node = head
    let useHead = node

    let temp = head.next
    while (temp) {
        if (nodeMap[temp.val] === undefined) {
            node.next = temp
            node = node.next
        }
        nodeMap[temp.val] = true

        temp = temp.next
    }
    // 要终止末端节点的.next指针
    node.next = null
    return useHead
}

/** 面试题 02.02. 返回倒数第 k 个节点
 * 实现一种算法，找出单向链表中倒数第 k 个节点。返回该节点的值
 * 输入： 1->2->3->4->5 和 k = 2  输出： 4
 * @param {ListNode} head
 * @param {number} k  给定的 k 保证是有效的
 * @return {number}
 */
var kthToLast = function (head, k) {
    if (head.next === null) return head.val
    // 双指针
    let fast = head,
        slow = head
    while (k > 0 && fast.next) {
        fast = fast.next
        k--
    }
    /** 如果已经到末尾了还是没有结束k，那么返回头节点 */
    if (k > 0) return head.val
    while (fast.next) {
        fast = fast.next
        slow = slow.next
    }
    return slow.next.val
}

/** 面试题 02.03. 删除中间节点
 * 若链表中的某个节点，既不是链表头节点，也不是链表尾节点，则称其为该链表的「中间节点」
 * 假定已知链表的某一个中间节点，请实现一种算法，将该节点从链表中删除
 * 例如，传入节点 c（位于单向链表 a->b->c->d->e->f 中），将其删除后，剩余链表为 a->b->d->e->f
 * 输入：节点 5 （位于单向链表 4->5->1->9 中）
 * 输出：不返回任何数据，从链表中删除传入的节点 5，使链表变为 4->1->9
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function (node) {
    if (node.next === null) {
        // 因为是中间节点，所以这个判断其实是多余的
        node.val == null
        return
    } else {
        const temp = node.next
        node.val = temp.val
        node.next = temp.next
    }
}

/** 面试题 02.06. 回文链表
 * 编写一个函数，检查输入的链表是否是回文的
 * 输入： 1->2->2->1   输出： true
 * 输入： 1->2         输出： false
 *
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
    let node = head
    const res = []
    while (node) {
        res.push(node.val)
        node = node.next
    }

    let left = 0,
        right = res.length - 1
    while (left < right) {
        if (res[left] !== res[right]) {
            return false
        }
        left++
        right--
    }
    return true
}

/** 面试题 02.07. 链表相交
 * 给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。
 * 如果两个链表没有交点，返回 null
 * 题目数据 保证 整个链式结构中不存在环
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
    // let head1 = headA
    // let nodeMap = new Set()
    // while (head1) {
    //     nodeMap.add(head1)
    //     head1 = head1.next
    // }
    // let head2 = headB
    // while (head2) {
    //     if (nodeMap.has(head2)) {
    //         return head2
    //     }
    //     head2 = head2.next
    // }
    // return null

    // 双指针 数学原理：若相较于c点，则前进距离 a+c+b = b+c+a  若不相交，a+b -> null  b+a -> null ，返回null
    let left = headA,
        right = headB
    while (left !== right) {
        left = left === null ? headB : left.next
        right = right === null ? headA : right.next
    }
    return left
}

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
