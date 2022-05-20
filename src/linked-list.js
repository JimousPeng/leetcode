/*
 * @Author: jimouspeng
 * @LastEditTime: 2022-05-20 13:22:50
 * @Description: 链表
 * @FilePath: \leetcode\src\linked-list.js
 * 可以输入预定的版权声明、个性签名、空行等
 */

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
