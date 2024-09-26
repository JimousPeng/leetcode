/**
 * 165. 比较版本号
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function (version1, version2) {
    /**
     * 给你两个 版本号字符串 version1 和 version2 ，请你比较它们。版本号由被点 '.' 分开的修订号组成
     * 修订号的值 是它 转换为整数 并忽略前导零
     * 比较版本号时，请按 从左到右的顺序 依次比较它们的修订号。
     * 如果其中一个版本字符串的修订号较少，则将缺失的修订号视为 0
     *
     * 如果 version1 < version2 返回 -1
     * 如果 version1 > version2 返回 1
     * 否则返回0
     *
     * 输入：version1 = "1.2", version2 = "1.10" 输出：-1
     * 解释：
     * version1 的第二个修订号为 "2"，version2 的第二个修订号为 "10"：2 < 10，
     * 所以 version1 < version2。
     *
     * 输入：version1 = "1.01", version2 = "1.001"  输出：0
     * 忽略前导零，"01" 和 "001" 都代表相同的整数 "1"
     *
     * 输入：version1 = "1.0", version2 = "1.0.0.0"  输出：0
     * version1 有更少的修订号，每个缺失的修订号按 "0" 处理
     */
    const v1 = version1.split('.').map((v) => Number(v))
    const v2 = version2.split('.').map((v) => Number(v))
    const maxLen = Math.max(v1.length, v2.length)
    while (v1.length < maxLen) {
        v1.push(0)
    }
    while (v2.length < maxLen) {
        v2.push(0)
    }
    for (let i = 0; i < maxLen; i++) {
        if (v1[i] < v2[i]) {
            return -1
        } else if (v1[i] > v2[i]) {
            return 1
        }
    }
    return 0
}

/**
 * 82. 删除排序链表中的重复元素 II
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {}

/**
 * 206. 反转链表
 */

/**
 * LCR 026. 重排链表
 */

/**
 * 35. 搜索插入位置
 */

/**
 * 11. 盛最多水的容器
 * @param {number[]} height n == height.length  2 <= n <= 10^5
 * @return {number}
 */
var maxArea = function (height) {
    /**
     * 给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i])
     * 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水
     * 返回容器可以储存的最大水量。
     */
}

/**
 * 215. 数组中的第K个最大元素
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
    /**
     * 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素
     * 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素
     * 你必须设计并实现时间复杂度为 O(n) 的算法解决此问题
     */
}

/**
 * 139. 单词拆分
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
    /**
     * 给你一个字符串 s 和一个字符串列表 wordDict 作为字典。
     * 如果可以利用字典中出现的一个或多个单词拼接出 s 则返回 true
     * 注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用
     *
     * 输入: s = "leetcode", wordDict = ["leet", "code"] 输出: true
     * 解释: 返回 true 因为 "leetcode" 可以由 "leet" 和 "code" 拼接成。
     *
     * 输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"] 输出: false
     */
}

/**
 * 56. 合并区间
 * @param {number[][]} intervals  1 <= intervals.length <= 10^4
 * @return {number[][]}
 */
var merge = function (intervals) {
    /**
     * 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。
     * 请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间
     *
     * 输入：intervals = [[1,3],[2,6],[8,10],[15,18]] 输出：[[1,6],[8,10],[15,18]]
     * 解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
     */
}

/**
 * 70. 爬楼梯
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
    /**
     * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶
     * 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
     * 输入：n = 2 输出：2 解释：有两种方法可以爬到楼顶。 1. 1 阶 + 1 阶 2. 2 阶
     */
}

/**
 * 958. 二叉树的完全性检验
 */

/**
 * LCR 152. 验证二叉搜索树的后序遍历序列
 */

/**
 * LCR 016. 无重复字符的最长子串
 */

/**
 * 1047. 删除字符串中的所有相邻重复项
 * @param {string} s  1 <= s.length <= 10^5  s 仅由小写英文字母组成。
 * @return {string}
 */
var removeDuplicates = function (s) {
    /**
     * 给出由小写字母组成的字符串 s，重复项删除操作会选择两个相邻且相同的字母，并删除它们
     * 在 s 上反复执行重复项删除操作，直到无法继续删除
     * 在完成所有重复项删除操作后返回最终的字符串。答案保证唯一
     *
     * 输入："abbaca" 输出："ca"
     * 解释：
     * 例如，在 "abbaca" 中，我们可以删除 "bb" 由于两字母相邻且相同，这是此时唯一可以执行删除操作的重复项。
     * 之后我们得到字符串 "aaca"，其中又只有 "aa" 可以执行重复项删除操作，所以最后的字符串为 "ca"。
     */
}

/**
 * 54. 螺旋矩阵
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
    // 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素
}

/**
 * 48. 旋转图像
 */
