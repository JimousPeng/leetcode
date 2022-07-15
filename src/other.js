/*
 * @Author: jimouspeng
 * @LastEditTime: 2022-07-15 17:39:19
 * @Description: 其他问题
 * @FilePath: \leetcode\src\other.js
 * 可以输入预定的版权声明、个性签名、空行等
 */

/** 有效的括号
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效
 * 
 * 有效字符串需满足：
左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。

输入：s = "()[]{}"
输出：true

输入：s = "(]"
输出：false

输入：s = "{[]}"
输出：true
 */
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {};

/** 缺失数字
 * 给定一个包含 [0, n] 中 n 个数的数组 nums ，找出 [0, n] 这个范围内没有出现在数组中的那个数。
 * 输入：nums = [3,0,1]
 * 
n == nums.length
1 <= n <= 104
0 <= nums[i] <= n
nums 中的所有数字都 独一无二
 * 
输出：2
解释：n = 3，因为有 3 个数字，所以所有的数字都在范围 [0,3] 内。2 是丢失的数字，因为它没有出现在 nums 中。
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
    /** 执行用时： 68 ms , 在所有 JavaScript 提交中击败了 73.49% 的用户
     * 内存消耗： 43.3 MB , 在所有 JavaScript 提交中击败了 50.84% 的用户 */
    let listLen = nums.length;
    if (nums.length === 1 && nums[0] !== 1) {
        return 1;
    }
    nums.sort((a, b) => a - b);
    for (let i = 0; i < listLen; i++) {
        if (nums[i] !== i) {
            return i;
        }
    }
    if (nums[listLen - 1] !== listLen) {
        return listLen;
    }
};

// console.log(missingNumber([3, 0, 1]));
console.log(missingNumber([0, 1]));
