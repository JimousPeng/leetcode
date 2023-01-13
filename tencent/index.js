function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

/** 合并K个排序链表
 * 给你一个链表数组，每个链表都已经按升序排列
 *
 * 请你将所有链表合并到一个升序链表中，返回合并后的链表
 * 
 * 思路： 假设新链表为数组的第一项，从第二项开始遍历数组，将每一项的链表内的值都插入到新链表中
 *
 * 输入：lists = [[1,4,5],[1,3,4],[2,6]]   ->   [1->4->5,1->3->4,2->6]
 * 输出：[1,1,2,3,4,4,5,6]
 *
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
    let newlink = lists[0];
    for (let i = 1; i < lists.length; i++) {}
};

/** 合并两个有序链表
 * 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的

 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
    /** 先处理边界情况 */
    if (list1 === null && list2 === null) return list1;
    if (list1 === null) return list2;
    if (list2 === null) return list1;

    let left = list1;
    let right = list2;
    let newlink = null;
    let initlink = true;
    let newlinkhead = null;
    let crossend = false;
    while ((left || right) && !crossend) {
        if (left && right) {
            let curnum = null;
            // 处理指针,谁小谁往前移动
            if (left.val > right.val) {
                curnum = right.val;
                right = right.next;
            } else if (left < right.val) {
                curnum = left.val;
                left = left.next;
            } else {
                curnum = left.val;
                left = left.next;
            }

            if (initlink) {
                newlink = new ListNode(curnum);
                newlinkhead = newlink;
                initlink = false;
            } else {
                newlink.next = new ListNode(curnum);
                newlink = newlink.next;
            }
        } else {
            // 只存在某个链表，那么直接处理即可
            const nextnode = left || right;
            nextnode && (newlink.next = nextnode);
            crossend = true;
        }
    }
    return newlinkhead;
};

/** 两数相加
 * 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字
 * 请你将两个数相加，并以相同形式返回一个表示和的链表
 *
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    let headl1 = l1;
    let headl2 = l2;
    let cursum = headl1.val + headl2.val;
    let curyushu = Math.floor(cursum / 10);
    let newlink = new ListNode(cursum % 10);

    const linkhead = newlink;

    headl1 = headl1.next;
    headl2 = headl2.next;

    while (headl1 || headl2) {
        headl1val = headl1 ? headl1.val : 0;
        headl2val = headl2 ? headl2.val : 0;
        let cursum = headl1val + headl2val + curyushu;
        curyushu = Math.floor(cursum / 10);

        newlink.next = new ListNode(cursum % 10);
        headl1 && (headl1 = headl1.next);
        headl2 && (headl2 = headl2.next);
        newlink = newlink.next;
    }
    if (curyushu) {
        newlink.next = new ListNode(curyushu);
    }
    return linkhead;
};

/** 只出现一次的数字
 * 给你一个 非空 整数数组 nums ，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素
 *
 * 输入：nums = [2,2,1]  输出：1
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
    return nums.reduce((total, item) => {
        // 直接利用位运算处理
        total = total ^ item;
        return total;
    }, 0);
};

/** 反转链表
 * 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表
 *
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
    if (head === null) return head;
    let curnode = head;
    let nodelist = [];
    while (curnode) {
        nodelist.push(curnode); // 直接保存节点
        curnode = curnode.next;
    }
    nodelist.reverse().forEach((item, index) => {
        if (!nodelist[index + 1]) {
            item.next = null;
        } else {
            item.next = nodelist[index + 1];
        }
    });
    return nodelist[0];
};

/**
 * 最长回文子串： 正读和反读都相同的字符序列为“回文”
 *
 * 输入：s = "babad"
 * 输出："bab" 或者 aba
 *
 * @param {string} s
 * 1 <= s.length <= 1000
 * s 仅由数字和英文字母组成
 * @return {string}
 */
var longestPalindrome = function (s) {
    // 怎么确定一个字符串是回文
    function isPalindrome(s) {
        let left = 0;
        let right = s.length - 1;
        while (left < right) {
            if (s[left] !== s[right]) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
    function compareLength(s1, s2) {
        if (s1.length > s2.length) {
            return s1;
        }
        return s2;
    }
    // 遍历字符串，找出所有的排列组合，并找到符合回文字符串的列表
    const strMap = {};
    for (let i = 0; i < s.length; i++) {
        if (Object.keys(strMap).length) {
            for (const key in strMap) {
                strMap[key] += s[i];
            }
        }
        strMap[i] = s[i];
    }
    let maxPd;
    // 找到最长的那个
    Object.keys(strMap).forEach((key) => {
        if (isPalindrome(strMap[key])) {
            maxPd = compareLength(maxPd, strMap[key]);
        }
    });
    return maxPd;
};

const palindrome = longestPalindrome('babad');
console.log(palindrome);
