/*
 * @Date: 2022-01-28 10:10:45
 * @FilePath: \leetcode\src\Array.js
 */

/**旋转数组
 * @param {number[]} nums
 * @param {number} k 非负整数
 * @return {void} Do not return anything, modify nums in-place instead.
 */
//  输入: nums = [1,2,3,4,5,6,7], k = 3
//  输出: [5,6,7,1,2,3,4]
//  解释:
//  向右轮转 1 步: [7,1,2,3,4,5,6]
//  向右轮转 2 步: [6,7,1,2,3,4,5]
//  向右轮转 3 步: [5,6,7,1,2,3,4]
var rotate = function (nums, k) {
    if (k % 2 === 0) {
        return nums;
    } else if ( !k < nums.length && k % 2 > 0) {
        // K > 数组长度且是奇数次数旋转
        return nums.reverse();
    } else if (nums.length > k) {
        // 获取最后几位的数组数据
        const lastList = nums.slice(-k);
        nums.splice(nums.length - k, k);
        for (let i = lastList.length - 1; i > -1; i--) {
            nums.unshift(lastList[i]);
        }
        return nums;
    }
};
console.log(rotate([1, 2, 3, 4, 5], 4));

/**存在重复元素
 * 给你一个整数数组 nums 。如果任一值在数组中出现 至少两次 ，返回 true ；如果数组中每个元素互不相同，返回 false 
 * @param {number[]} nums
 * @return {boolean}
 */
//  输入：nums = [1,1,1,3,3,4,3,2,4,2]
//  输出：true
 var containsDuplicate = function(nums) {
    const newList = Array.from(new Set(nums));
    return newList.length < nums.length
};

/**删除排序数组中的重复项
 * @param {number[]} nums
 * @return {number}
 */
//  输入：nums = [1,1,2]
//  输出：2, nums = [1,2]
//  解释：函数应该返回新的长度 2 ，并且原数组 nums 的前两个元素被修改为 1, 2 。不需要考虑数组中超出新长度后面的元素。
var removeDuplicates = function (nums) {
    let left = 0;
    for (let right = 1; right < nums.length; right++) {
        if (nums[right] !== nums[left]) {
            nums[++left] = nums[right];
        }
    }
    return ++left;
};

/** 买卖股票的最佳时机 II
 * @param {number[]} prices
 * @return {number}
 */
//  输入: prices = [7,1,5,3,6,4]
//  输出: 7
//  解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
//       随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。
var maxProfit = function (prices) {
    // 利润记录
    let profix = 0;
    // 记录价格锚点
    let buyPrice = prices[0];
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > buyPrice) {
            // 只要当前股价不是下跌，那么记录价格点位,并抛出
            profix += prices[i] - buyPrice;
        }
        buyPrice = prices[i];
    }
    return profix;
};
