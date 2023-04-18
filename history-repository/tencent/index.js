function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}
function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

/** 括号生成
 * 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合
 *
 * 输入：n = 3  输出：["((()))","(()())","(())()","()(())","()()()"]
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {};

/**
 * 子集
 * 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）; 解集 不能 包含重复的子集。你可以按 任意顺序 返回解集
 *
 * 输入：nums = [1,2,3]
 * 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
    const sublist = [[]];
    for (let i = 0; i < nums.length; i++) {
        const newlist = JSON.parse(JSON.stringify(sublist));
        newlist.forEach((item) => {
            item.push(nums[i]);
        });
        sublist = sublist.concat(newlist);
    }
    return sublist;
};

/** LRU缓存机制
 * 请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。
 *
 * 实现 LRUCache 类：
 * LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
 * int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1
 * void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组 key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字
 * 函数 get 和 put 必须以 O(1) 的平均时间复杂度运行
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
    this.max = capacity;
    this.keylist = [];
    this.keepcontain = new Map();
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
    /** 做两件事：
     * 1. 返回获取值，如果没有则返回-1；
     * 2. 更新当前获取的key的权重为0
     */
    const getval = this.keepcontain.get(key);
    if (getval) {
        const exitindex = this.keylist.findIndex((item) => item === key);
        this.keylist.splice(exitindex, 1);
        this.keylist.unshift(key);

        return getval;
    }
    return -1;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
    /** 做两件事：
     * 判断是否超出最大项，如果超出，则移除容量之外的数据，如果没有超出，正常
     * 更新当前key所在是索引下标
     */
    this.keepcontain.set(key, value);
    if (this.keylist.length >= this.max) {
        this.keepcontain.forEach((item) => {
            const exitindex = this.keylist.findIndex((k) => item === k);
            if (exitindex > 1) {
                this.keepcontain.delete(item);
            }
        });
    }
    // 更新下标
    const exitindex = this.keylist.findIndex((item) => item === key);
    if (exitindex > -1) {
        // 说明当前key存在，需要删除
        this.keylist.splice(exitindex, 1);
    }
    this.keylist.unshift(key);
};

/** 不同路径
 * 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）
 * 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。 问总共有多少条不同的路径
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
    const f = new Array(m).fill(0).map(() => new Array(n).fill(0));
    for (let i = 0; i < m; i++) {
        f[i][0] = 1;
    }
    for (let j = 0; j < n; j++) {
        f[0][j] = 1;
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            f[i][j] = f[i - 1][j] + f[i][j - 1];
        }
    }
    return f[m - 1][n - 1];
};

/** 买卖股票的最佳时机 II
 * 给你一个整数数组 prices ，其中 prices[i] 表示某支股票第 i 天的价格
 * 在每一天，你可以决定是否购买和/或出售股票。你在任何时候 最多 只能持有 一股 股票。你也可以先购买，然后在 同一天 出售。
 * 返回 你能获得的 最大 利润
 *
 * prices = [7,1,5,3,6,4]
 * 在第 2 天（股票价格 = 1）的时候买入，
 * 在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5 - 1 = 4 。
 * 随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6 - 3 = 3 。
 * 总利润为 4 + 3 = 7
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    let income = 0;
    let buyprice = prices[i];
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) {
            // 如果有收入，就抛出
            income = Math.max(prices[i] - buyprice, 0) + income;
            buyprice = prices[i];
        } else {
            // 否则就买入
            buyprice = Math.min(prices[i], buyprice);
        }
    }
    return income;
};

/** 买卖股票的最佳时机
 * 给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格
 * 你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。
 * 返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 
 * 
 * 输入：[7,1,5,3,6,4]
输出：5
解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    // 动态规划，先找到状态公式：
    let income = 0;
    let buyprice = prices[0]; // 买入的价格，假设第一天买入
    for (let i = 1; i < prices.length; i++) {
        income = Math.max(prices[i] - buyprice, income); // 这里不好处理，因为存在后续的更大值
        buyprice = Math.min(prices[i], buyprice); // 如果遇到更低的，就买入
    }
    return income;
};

/** 最大子序和
 * 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和
 *
 * nums = [-2,1,-3,4,-1,2,1,-5,4]  ：连续子数组 [4,-1,2,1] 的和最大，为 6 。
 *
 * 输入：nums = [5,4,-1,7,8]  输出：23
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    let calculate = nums[0];
    let max = nums[0];
    for (let i = 1; i < nums.length; i++) {
        calculate = Math.max(calculate, 0) + nums[i];
        max = Math.max(max, calculate);
    }
    return max;
};

/** 爬楼梯
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶; 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 *
 * n = 2 v输出：2
 * 1. 1 阶 + 1 阶
 * 2. 2 阶
 * f(1) = 1; f(2) = 2; f(3) = f(1) + f(2)
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
    function climbStair(n, cur, total) {
        console.log(n, cur, total);
        if (n < 2) return total;
        // 尾递归优化
        return climbStair(n - 1, total, cur + total);
    }
    return climbStair(n, 1, 1);
};

/** 二叉树的最近公共祖先
 * 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先:
 * 对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
    let ans;

    const dfs = (root, p, q) => {
        if (root === null) return false;
        const lson = dfs(root.left, p, q);
        const rson = dfs(root.right, p, q);
        if ((lson && rson) || ((root.val === p.val || root.val === q.val) && (lson || rson))) {
            /**
             * lson && rson : 左子树和右子树均包含  p 节点或  q 节点
             * 如果左子树包含的是  p 节点，那么右子树只能包含  q 节点，反之亦然
             * 因为  p 节点和  q 节点都是不同且唯一的节点，因此如果满足这个判断条件即可说明  x 就是我们要找的最近公共祖先
             *
             * (root.val === p.val || root.val === q.val) && (lson || rson):
             *  x 恰好是 p 节点或  q 节点且它的左子树或右子树有一个包含了另一个节点的情况，因此如果满足这个判断条件亦可说明  x 就是我们要找的最近公共祖先
             *
             * 因为是自底向上从叶子节点开始更新的，所以在所有满足条件的公共祖先中一定是深度最大的祖先先被访问到
             */
            ans = root;
        }
        // 利用深度优先搜索，找到匹配的子节点
        return lson || rson || root.val === p.val || root.val === q.val;
    };
    dfs(root, p, q);
    return ans;
};

/** 二叉搜索树的最近公共祖先
 *
 * 二叉搜索树（BST）是二叉树的一种特殊表示形式，它满足如下特性
 * 每个节点中的值必须大于（或等于）存储在其左侧子树中的任何值
 * 每个节点中的值必须小于（或等于）存储在其右子树中的任何值
 * 所有左子树和右子树自身必须也是二叉搜索树
 *
 * 给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先
 *
 * 所有节点的值都是唯一的
 * p、q 为不同节点且均存在于给定的二叉搜索树中
 *
 * 既然是找祖先，那就说明要向上查找，同时保证了所有节点的值的唯一性，所以最先查找到的公共值，就是这两个节点的最近公共祖先。
 *
 * 暴力求解： 先找到彼此的祖先，然后从祖先里面匹配最近的公共祖先
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
    if (root === null) return;
    if (root.val > p.val && root.val > q.val) {
        // 如果当前节点的值大于  p 和  q 的值，说明  p 和  q 应该在当前节点的左子树，因此将当前节点移动到它的左子节点
        return lowestCommonAncestor(root.left, p, q);
    }
    if (root.val < p.val && root.val < q.val) {
        // 如果当前节点的值大于  p 和  q 的值，说明  p 和  q 应该在当前节点的左子树，因此将当前节点移动到它的左子节点
        return lowestCommonAncestor(root.right, p, q);
    }
    return root;
};

/** 二叉树中的最大路径和
 * 路径 被定义为一条从树中任意节点出发，沿父节点-子节点连接，达到任意节点的序列。同一个节点在一条路径序列中 至多出现一次 。该路径 至少包含一个 节点，且不一定经过根节点
 * 路径和 是路径中各节点值的总和
 * 输入：root = [1,2,3]
 * 输出：6
 * 解释：最优路径是 2 -> 1 -> 3 ，路径和为 2 + 1 + 3 = 6
 *
 * 思路： 生成数据模型 modeMax
 * 对于单个父节点，它的最大路径就是 modeMax -->  root.val + Math.max(root.left.val, root.right.val);
 * root.left.val 如果 < 0， 那么应该直接舍弃， root.right.val同理。
 * 以此类推，root.left也可能是一个根节点，同样适用于modeMax模型
 *
 *
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function (root) {
    let maxsum = -Infinity;
    function getMaxPathSum(root, maxsum) {
        if (root === null) {
            return 0;
        }
        let leftmax = getMaxPathSum(root.left, maxsum);
        leftmax = leftmax > 0 ? leftmax : 0; // 左侧如果小于0就舍弃

        let rightmax = getMaxPathSum(root.right, maxsum);
        rightmax = rightmax > 0 ? rightmax : 0; // 右侧同理

        let curmax = leftmax + root.val + rightmax;

        maxsum = curmax > maxsum ? curmax : maxsum;
        return root.val + Math.max(leftmax, rightmax);
    }
    getMaxPathSum(root, maxsum);
    return maxsum;
};

/** 二叉树的最大深度
 * 给定一个二叉树，找出其最大深度。
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
    // 要获取最大深度，
    let depthRecord = [];
    function crossTree(root, depth = 0) {
        if (root === null) {
            // 当遍历到最底部，拿到此时的深度
            depthRecord.push(depth);
            return;
        }
        crossTree(root.left, depth + 1);
        crossTree(root.right, depth + 1);
    }
    crossTree(root);
    return Math.max(...depthRecord);
};

/** 二叉搜索树中第K小的元素
 * 给定一个二叉搜索树的根节点 root ，和一个整数 k ，请你设计一个算法查找其中第 k 个最小元素（从 1 开始计数）
 *
 * 输入：root = [3,1,4,null,2], k = 1
 * 输出：1
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
    // 既然是找到第K小，那么需要找到二叉树上所有的值，然后找到第K小的数
    let treeList = [];
    function crossTree(root) {
        if (root === null) return;
        treeList.push(root.val);
        crossTree(root.left);
        crossTree(root.right);
    }
    crossTree(root);
    treeList.sort((a, b) => a - b);
    return treeList[k - 1];
};

/** 搜索旋转排序数组
 * 整数数组 nums 按升序排列，数组中的值 互不相同
 * 给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1
 *
 * 输入：nums = [4,5,6,7,0,1,2], target = 0
 * 输出：4
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    /** 最简单就是用indexOf, 然后就是双指针(效率有点慢，O(n) ) */
    let left = 0,
        right = nums.length - 1;
    while (left > right) {
        if (nums[left] === target) return left;
        if (nums[right] === target) return right;
        left++;
        right--;
    }
};

/** 数组中的第K个最大元素
 * 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素
 *
 * 输入: [3,2,1,5,6,4], k = 2
 * 输出: 5
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
    // 先排序，然后再返回k对应的值
    nums.sort((a, b) => b - a);
    return nums[k - 1];
};

/** 给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表
 *
 * 输入：head = [-1,5,3,4,0]
 * 输出：[-1,0,3,4,5]
 *
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function (head) {
    /** 要返回排序后的链表，那么就先将链表的值进行排序, 然后根据排序后的数组，构造新链表 */
    if (head === null) return head;
    let curhead = head;
    let nodelist = [];
    while (curhead) {
        nodelist.push(curhead.val);
        curhead = curhead.next;
    }
    nodelist.sort((a, b) => a - b);
    let newhead = new ListNode(nodelist[0]);
    let flaghead = newhead;
    for (let i = 1; i < nodelist.length; i++) {
        newhead.next = new ListNode(nodelist[i]);
        newhead = newhead.next;
    }
    return flaghead;
};

/** 2的幂
 * 给你一个整数 n，请你判断该整数是否是 2 的幂次方。如果是，返回 true ；否则，返回 false
 * 如果存在一个整数 x 使得 n == 2x ，则认为 n 是 2 的幂次方
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function (n) {
    if (n === 1) {
        return true;
    }
    if (n < 2) {
        // 说明没有被整除
        return false;
    }
    return isPowerOfTwo(n / 2);
};

/** 多数元素
 * 给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
    if (nums.length < 2) return nums[0];
    const max = Math.ceil(nums.length / 2);
    let left = 0,
        right = nums.length - 1;
    const nummap = {};
    while (left <= right) {
        const leftkey = nums[left];
        const rightkey = nums[right];
        if (nummap[leftkey]) {
            nummap[leftkey].count++;
            if (nummap[leftkey].count >= max) {
                return leftkey;
            }
        } else {
            nummap[leftkey] = { count: 1 };
        }
        if (nummap[rightkey]) {
            nummap[rightkey].count++;
            if (nummap[rightkey].count >= max) {
                return rightkey;
            }
        } else {
            nummap[rightkey] = { count: 1 };
        }
        left++;
        right--;
    }
};

/** 回文数
 * 给你一个整数 x ，如果 x 是一个回文整数，返回 true ；否则，返回 false 。
 * 回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
    if (x < 0 || (x % 10 === 0 && x !== 0)) {
        return false;
    }
    const xstring = x + '';
    let left = 0,
        right = xstring.length - 1;
    while (left < right) {
        if (xstring[left] !== xstring[right]) {
            return false;
        }
    }
    return true;
};

console.log(isPalindrome(-121));

/** 整数反转
 * 给你一个 32 位的有符号整数 x ，返回将 x 中的数字部分反转后的结果
 * 如果反转后整数超过 32 位的有符号整数的范围 [−231,  231 − 1] ，就返回 0
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
    // 边界处理
    if (x === 0) return x;
    let flag = false;
    if (x < 0) {
        flag = true;
    }
    // 正数化处理绝对值，先抛弃符号位
    x = Math.abs(x) + '';
    xlist = x.split('');
    xlist = xlist.reverse();
    newx = xlist.join('');
    flag && (newx = '-' + newx);
    newx = +newx;
    if ((newx < -(2 ** 31)) | (newx > 2 ** 31 - 1)) {
        return 0;
    }
    return newx;
};

/**
 * 删除链表中的节点
 * 有一个单链表的 head，我们想删除它其中的一个节点 node
 * 输入：head = [4,5,1,9], node = 1
 * 输出：[4,5,9]
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function (node) {
    node.val = node.next.val;
    node.next = node.next.next;
};

/** 相交链表
 * 给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null
 * 题目数据 保证 整个链式结构中不存在环
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
    const nodeSet = new Set();
    while (headA) {
        nodeSet.add(headA);
        headA = headA.next;
    }
    while (headB) {
        if (nodeSet.has(headB)) {
            return headB;
        }
        headB = headB.next;
    }
    return null;
};

/** 环形链表 II
 * 给定一个链表的头节点  head ，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
 *
 * 先找到环，然后返回该节点
 *
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
    if (head === null || head.next === null) return null;
    const nodeset = new Set();
    while (head !== null) {
        if (nodeset.has(head)) {
            console.log(nodeset, head);
            return head;
        }
        nodeset.add(head);
        head = head.next;
    }
    return null;
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
    // if (s.length < 2) return s;
    // function isPalindrome(left, right) {
    //     let curstr = s.substring(left, right + 1);
    //     return curstr === curstr.split('').reverse().join('');
    // }
    // let maxLen = 1,
    //     begin = 0;
    // for (let i = 0; i < s.length - 1; i++) {
    //     for (let j = i + 1; j < s.length; j++) {
    //         if (j - i + 1 > maxLen && isPalindrome(i, j)) {
    //             maxLen = j - i + 1;
    //             begin = i;
    //         }
    //     }
    // }
    // return s.substring(begin, begin + maxLen);let max = 0, res = ''
    if (s.length < 2) return s;
    let max = 0,
        res = '';
    for (let i = 0; i < s.length; i++) {
        let left = i - 1,
            count = 1;
        while (s[i] === s[i + 1] && i < s.length) {
            i++;
            count++;
        }
        let right = i + 1;
        while (s[left] === s[right] && left >= 0 && right < s.length) {
            count += 2;
            left--;
            right++;
        }
        if (count > max) {
            max = count;
            res = s.slice(left + 1, right);
        }
    }
    return res;
};

longestPalindrome('ababad');

// const palindrome = longestPalindrome('babad');
// console.log(palindrome);
