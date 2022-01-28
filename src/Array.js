/*
 * @Date: 2022-01-28 10:10:45
 * @LastEditors: jimouspeng
 * @Description: 描述文件内容
 * @LastEditTime: 2022-01-28 14:54:46
 * @FilePath: \leetcode\src\Array.js
 */

/**删除排序数组中的重复项
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    let left = 0
    for (let right = 1; right < nums.length; right++) {
        if (nums[right] !== nums[left]) {
            nums[++left] = nums[right]
        }
    }
    return ++left
}

/** 买卖股票的最佳时机 II
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    // 利润记录
    let profix = 0
    // 记录价格锚点
    let buyPrice = prices[0]
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > buyPrice) {
            // 只要当前股价不是下跌，那么记录价格点位,并抛出
            profix += prices[i] - buyPrice
        }
        buyPrice = prices[i]
    }
    return profix
}
