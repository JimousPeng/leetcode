/*
 * @Date: 2022-02-15 10:52:04
 * @LastEditors: jimouspeng
 * @Description: 动态规划
 * @LastEditTime: 2022-02-15 13:34:17
 * @FilePath: \leetcode\src\dynamic.js
 */

/**最大子序和
 * 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * 子数组 是数组中的一个连续部分。
输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
输出：6
解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。

输入：nums = [1]
输出：1

输入：nums = [5,4,-1,7,8]
输出：23
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
 var maxSubArray = function(nums) {

};


/**买卖股票的最佳时机
 * 给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。
 * 你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润
 * 返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 
输入：[7,1,5,3,6,4]
输出：5
解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。

输入：prices = [7,6,4,3,1]
输出：0
解释：在这种情况下, 没有交易完成, 所以最大利润为 0。
 */
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    // 方法1： 暴力求解     执行结果：超出时间限制
    // let maxNum = 0
    // for (let i = 0; i < prices.length - 1; i++) {
    //     for (let j = i + 1; j < prices.length; j++) {
    //         if (prices[j] - prices[i] > maxNum) {
    //             maxNum = prices[j] - prices[i]
    //         }
    //     }
    // }
    // return maxNum
    // 方法2： 一次遍历
    let minProfit = Infinity;
    let maxPro = 0;
    for(let i = 0; i < prices.length; i++) {
        if(prices[i] < minProfit) {
            minProfit = prices[i]
        } else if(prices[i] - minProfit > maxPro) {
            maxPro = prices[i] - minProfit
        }
    }
    return maxPro
}
// let price = [7, 1, 5, 3, 6, 4]
// let price = [7, 6, 4, 3, 1]
// let price = [3, 2, 6, 5, 0, 3]
// console.log(maxProfit(price))

/**爬楼梯
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 */
//  输入：n = 2
//  输出：2
//  解释：有两种方法可以爬到楼顶。
//  1. 1 阶 + 1 阶
//  2. 2 阶
//  公式： f(n) = f(n-1) + f(n-2) 当n > 2时，f(1)=1; f(2)=2
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
    // if (n <= 1) {
    //     return 1
    // }
    // if (n < 3) {
    //     return n
    // }
    // // 由于不是尾调用，所以这里会导致内存占用多大，有必要进行尾调用优化
    // return climbStairs(n - 1) + climbStairs(n - 2)

    // 递归优化 1+1+2+3+5+8+...+n  其实就是一个斐波那契数列,求n, n = (n-1) + (n-2), n>=3
    function climbStair(n, a, b) {
        if (n <= 1) {
            return b // 由上一个a+b计算而来，从第3项开始，每一项都等于前两项之和
        }
        return climbStair(n - 1, b, a + b)
    }
    return climbStair(n, 1, 1)
}

// console.log(climbStairs(5))
