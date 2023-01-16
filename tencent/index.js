function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

/** 环形链表 II
 * 给定一个链表的头节点  head ，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
    if (head === null || head.next === null) return null;
    
};

/** 环形链表
 * 给你一个链表的头节点 head ，判断链表中是否有环
 *
 * 思路1：
 * 利用快慢双指针,如果快指针存在===慢指针，那么说明有环
 * 重点： 怎么定义快指针 -> 转换为怎么控制慢指针的步进。
 * 引入中间变量，快指针每次移动一位，当快指针制动5位之后，慢指针移动一位
 * 从相对移动来讲，就是将慢指针移动一位，快指针移动5位，转变为 移动快指针5位，移动慢指针一位。
 *
 * 思路2：
 * hash表，保留每一位node节点，用map或者set结构
 *
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
    if (head === null || head.next === null) return false;
    let left = head,
        right = head.next;
    let curindex = 1;
    while (right) {
        // 因为right是快指针，且步进为1；所以right用来当做while的循环条件
        if (curindex % 5 === 0) {
            left = left.next;
        }
        right = right.next;
        curindex++;
        if (left === right) {
            return true;
        }
    }
    return false;
};

/** 旋转链表
 * 给你一个链表的头节点 head ，旋转链表，将链表每个节点向右移动 k 个位置
 *
 * 输入：head = [1,2,3,4,5], k = 2
 * 输出：[4,5,1,2,3]
 *
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function (head, k) {
    if (head == null || k === 0 || head.next === null) return head;
    let nodelen = 1,
        nodehead = head;
    while (nodehead.next !== null) {
        nodehead = nodehead.next;
        nodelen++;
    }
    // 对于nodelen的整数倍k，意味着其实没有移动，真正的移动步数，是 k % nodelen的值, 再通过nodelen - k % nodelen, 拿到移动k次后当前链表最后一项的节点值
    let addstep = nodelen - (k % nodelen);
    if (addstep === nodelen) return head;
    // 尾节点指向节点，成环
    nodehead.next = head;
    while (addstep) {
        nodehead = nodehead.next;
        addstep--;
    }
    // whild循环后，此时nodehead为尾节点
    let last = nodehead.next;
    // 将环断开，尾节点指向null
    nodehead.next = null;
    return last;
};

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
    if (lists.length === 0) return ListNode();
    // 先用栈保存所有的数组，之后将数组转换为链表返回
    let numlist = [];
    for (let i = 0; i < lists.length; i++) {
        let curlink = lists[i];
        while (curlink) {
            numlist.push(curlink.val);
            curlink = curlink.next;
        }
    }
    if (numlist.length === 0) return null;
    numlist.sort((a, b) => a - b);
    let newlink = new ListNode(numlist[0]);
    let linkhead = newlink;
    for (let i = 1; i < numlist.length; i++) {
        newlink.next = new ListNode(numlist[i]);
        newlink = newlink.next;
    }
    return linkhead;
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
