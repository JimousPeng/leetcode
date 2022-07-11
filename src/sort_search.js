/*
 * @Author: jimouspeng
 * @LastEditTime: 2022-07-11 11:27:15
 * @Description: 排序和搜索
 * @FilePath: \leetcode\src\sort_search.js
 * 可以输入预定的版权声明、个性签名、空行等
 */

/** 合并两个有序数组
 * 给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目
 * 请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列
 * 最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n
 * 
 * 输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
输出：[1,2,2,3,5,6]
解释：需要合并 [1,2,3] 和 [2,5,6] 。
合并结果是 [1,2,2,3,5,6] ，其中斜体加粗标注的为 nums1 中的元素。
 */
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
    /** 执行用时： 52 ms , 在所有 JavaScript 提交中击败了 96.42% 的用户
     * 内存消耗： 41.4 MB , 在所有 JavaScript 提交中击败了 10.25% 的用户 */
    for (let i = 0; i < nums2.length; i++) {
        nums1.splice(m + i, 1, nums2[i]);
    }
    nums1.sort((a, b) => a - b);
    console.log(nums1);
};

console.log(merge([-1, -20, 1, 2, 3, 0, 0, 0], 5, [2, 5, 6], 3));

/** 第一个错误的版本
 * 假设你有 n 个版本 [1, 2, ..., n]，你想找出导致之后所有版本出错的第一个错误的版本
 * 你可以通过调用 bool isBadVersion(version) 接口来判断版本号 version 是否在单元测试中出错。实现一个函数来查找第一个错误的版本。你应该尽量减少对调用 API 的次数
 * 
 * 输入：n = 5, bad = 4
输出：4
解释：
调用 isBadVersion(3) -> false 
调用 isBadVersion(5) -> true 
调用 isBadVersion(4) -> true
所以，4 是第一个错误的版本。

输入：n = 1, bad = 1
输出：1
 */
/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function (isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function (n) {
        if (n == 1 && isBadVersion(n)) {
            return n;
        }
        /** 当执行数据量大时；递归直接栈溢出 */
        // const midCount = Math.round(n / 2);
        // const getBadIdx = function (v) {
        //     if (!isBadVersion(v - 1) && isBadVersion(v)) {
        //         return v;
        //     }
        //     const midCount = Math.round(v / 2);
        //     v = isBadVersion(midCount) ? midCount : v - 1;
        //     return getBadIdx(v);
        // };
        // return getBadIdx(isBadVersion(midCount) ? midCount : n);

        /** 常规2分法查找
         * 执行用时： 56 ms , 在所有 JavaScript 提交中击败了 81.06% 的用户
         * 内存消耗： 41.3 MB , 在所有 JavaScript 提交中击败了 5.11% 的用户
         */
        let start = 1;
        let end = n;
        while (start < end) {
            let mid = start + parseInt((end - start) / 2);
            if (!isBadVersion(mid)) {
                start = mid + 1;
            } else {
                end = mid;
            }
        }
        return start;
    };
};
