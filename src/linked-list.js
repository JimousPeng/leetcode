/*
 * @Author: jimouspeng
 * @LastEditTime: 2022-07-07 17:48:41
 * @Description: 链表
 * @FilePath: \leetcode\src\linked-list.js
 * 可以输入预定的版权声明、个性签名、空行等
 */

/** 回文链表:
 * 给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
    // 执行用时： 160 ms , 在所有 JavaScript 提交中击败了 50.82% 的用户
    // 内存消耗： 70.5 MB , 在所有 JavaScript 提交中击败了 41.62% 的用户
    let listArray = [];
    while (head) {
        listArray.push(head.val);
        head = head.next;
    }
    if (listArray.length < 2) {
        return true;
    }
    const nodeLen = listArray.length;
    for (let i = 0; i < nodeLen; i++) {
        if (listArray[i] !== listArray[nodeLen - 1 - i]) {
            return false;
        } else if (i > nodeLen - 1 - i) {
            return true;
        }
    }
};

/** 环形链表: 给你一个链表的头节点 head ，判断链表中是否有环
 * 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。
 * 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。注意：pos 不作为参数进行传递 。仅仅是为了标识链表的实际情况
 * 如果链表中存在环 ，则返回 true 。 否则，返回 false
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
    if (!head || !head.next) {
        // 单节点链表，直接返回false
        return false;
    }
    /**
     * 快慢指针：如果相遇就说明有环，如果有一个为空说明没有环
     * 执行用时： 68 ms , 在所有 JavaScript 提交中击败了 87.16% 的用户 
     * 内存消耗： 43.7 MB , 在所有 JavaScript 提交中击败了 56.59% 的用户
     */
    let slowNode = head;
    let fastNode = head;
    while (fastNode !== null && slowNode !== null) {
        slowNode = slowNode.next;
        fastNode = fastNode?.next?.next ? fastNode.next.next : null;
        if (slowNode === fastNode) {
            return true;
        }
    }
    return false;
};

/** 合并两个有序链表
 * 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
    if (list1 === null) {
        return list2;
    } else if (list2 === null) {
        return list1;
    }
    const newNode = new ListNode(0);
    curNode = newNode;
    if (list1.val > list2.val) {
        bigNode = list1;
        smallNode = list2;
    } else {
        bigNode = list2;
        smallNode = list1;
    }
    while (bigNode && smallNode) {
        if (bigNode.val > smallNode.val) {
            // bigNode > newNode, newNode后移
            curNode.next = smallNode;
            smallNode = smallNode.next;
        } else {
            curNode.next = bigNode;
            bigNode = bigNode.next;
        }
        curNode = curNode.next;
    }
    curNode.next = bigNode ? bigNode : smallNode;
    return newNode.next;
};

/** 删除链表的倒数第N个节点
 * 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
 * 输入：head = [1,2,3,4,5], n = 2
 * 输出：[1,2,3,5]
 *
 * 输入：head = [1], n = 1
 * 输出：[]
 *
 * 输入：head = [1,2], n = 1
 * 输出：[1]
 */

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    /** 先遍历出链表长度 */
    let currentNode = head;
    let nodeLen = 0;
    while (currentNode) {
        nodeLen++;
        currentNode = currentNode.next;
    }
    if (n === nodeLen) {
        console.log(n, nodeLen);
        /** 删除第一个，那么直接返回head.next */
        return head.next;
    }
    for (let i = 0; i < nodeLen; i++) {
        if (i === nodeLen - n) {
            /** 找到要删除的节点对应的位置, 处理当前currentNode;
             * 正常逻辑应该是 currentNode = currentNode ? currentNode.next : head; =》 即 currentNode = currentNode.next
             * 由于是要删除的节点，那么currentNode跳过本次取值，按照运算表达式从右往左复制，执行的是 (本次遍历的上一个节点).next = (命中要删除的节点).next
             */
            currentNode.next = currentNode.next.next;
            continue; // 后续节点的.next需要补上，所以不能跳出循环
        }
        /** 其实这里是用来重置当前节点为head节点，之前while遍历里面currentNode已经指向null */
        currentNode = currentNode ? currentNode.next : head;
    }
    return head;
};

/** 删除链表中的节点
 * 请编写一个函数，用于 删除单链表中某个特定节点 。在设计函数时需要注意，你无法访问链表的头节点 head ，只能直接访问 要被删除的节点 。
 * 题目数据保证需要删除的节点 不是末尾节点
 * 输入：head = [4,5,1,9], node = 5
 * 输出：[4,1,9]
 * 解释：指定链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9
 *
 * 输入：head = [4,5,1,9], node = 1
 * 输出：[4,5,9]
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function (node) {
    node.val = node.next.val;
    node.next = node.next.next;
};

// console.log(deleteNode([4, 5, 1, 9]));
/*
 * @Author: jimouspeng
 * @LastEditTime: 2022-05-23 01:30:20
 * @Description: 链表
 * @FilePath: \leetcode\src\linked-list.js
 * 可以输入预定的版权声明、个性签名、空行等
 */

/**
 * 反转链表
 * 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表
 *
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
    // 使用栈处理
    // 执行用时： 68 ms , 在所有 JavaScript 提交中击败了 45.27% 的用户
    // 内存消耗： 42.6 MB , 在所有 JavaScript 提交中击败了 96.38% 的用户
    // let curNode = head
    // let nodeStack = []
    // while (curNode) {
    //     nodeStack.push(curNode)
    //     curNode = curNode.next
    // }
    // if(!nodeStack.length) {
    //     return head;
    // }
    // nodeStack.reverse().forEach((el, index) => {
    //     if (!nodeStack[index + 1]) {
    //         el.next = null
    //     } else {
    //         el.next = nodeStack[index + 1]
    //     }
    // })
    // return nodeStack[0]

    // 使用新链表处理
}

/** 删除链表的倒数第N个节点
 * 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
 * 输入：head = [1,2,3,4,5], n = 2
 * 输出：[1,2,3,5]
 *
 * 输入：head = [1], n = 1
 * 输出：[]
 *
 * 输入：head = [1,2], n = 1
 * 输出：[1]
 */

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    /** 先遍历出链表长度 */
    let currentNode = head
    let nodeLen = 0
    while (currentNode) {
        nodeLen++
        currentNode = currentNode.next
    }
    if (n === nodeLen) {
        console.log(n, nodeLen)
        /** 删除第一个，那么直接返回head.next */
        return head.next
    }
    for (let i = 0; i < nodeLen; i++) {
        if (i === nodeLen - n) {
            /** 找到要删除的节点对应的位置, 处理当前currentNode;
             * 正常逻辑应该是 currentNode = currentNode ? currentNode.next : head; =》 即 currentNode = currentNode.next
             * 由于是要删除的节点，那么currentNode跳过本次取值，按照运算表达式从右往左复制，执行的是 (本次遍历的上一个节点).next = (命中要删除的节点).next
             */
            currentNode.next = currentNode.next.next
            continue // 后续节点的.next需要补上，所以不能跳出循环
        }
        /** 其实这里是用来重置当前节点为head节点，之前while遍历里面currentNode已经指向null */
        currentNode = currentNode ? currentNode.next : head
    }
    return head
}

/** 删除链表中的节点
 * 请编写一个函数，用于 删除单链表中某个特定节点 。在设计函数时需要注意，你无法访问链表的头节点 head ，只能直接访问 要被删除的节点 。
 * 题目数据保证需要删除的节点 不是末尾节点
 * 输入：head = [4,5,1,9], node = 5
 * 输出：[4,1,9]
 * 解释：指定链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9
 *
 * 输入：head = [4,5,1,9], node = 1
 * 输出：[4,5,9]
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function (node) {
    node.val = node.next.val
    node.next = node.next.next
}

// console.log(deleteNode([4, 5, 1, 9]));
