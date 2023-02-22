/*
 * @Date: 2022-02-15 10:52:04
 * @LastEditors: Please set LastEditors
 * @Description: 动态规划
 * @LastEditTime: 2023-02-22 11:12:17
 * @FilePath: \leetcode\src\dynamic.js
 */
const dynamic = ['1. 确定状态', '  2. 找到转移公式', '  3. 确定初始条件及边界条件', '  4. 计算结果'];
console.log(dynamic.join(' ->'));

/**打家劫舍
 * 你是一个专业的小偷，计划偷窃沿街的房屋。
 * 每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，
 * 如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警
 * 给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。
输入：[1,2,3,1]
输出：4
解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
     偷窃到的最高金额 = 1 + 3 = 4 。
输入：[2,7,9,3,1]
输出：12
解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
     偷窃到的最高金额 = 2 + 9 + 1 = 12 。

状态公式
f(i)不偷的最大金额 = Math.max(f(i-1)偷, f(i-1)不偷)
f(i)偷的最大金额 = f(i-1)不偷的金额 + nums[i]
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
    // function calculateNum(n, total) {
    //     if (n < 0) {
    //         return total
    //     }
    //     return calculateNum(n - 1, nums[n] + total)
    // }
    // const len = nums.length;
    // let maxStole = nums[0];
    // let lastStole = 0; // 损失的收益
    // let getIndex = 0; // 默认偶数项是收益
    // for (let i = 1; i < len; i++) {
    //     if(nums[i] === 0) {
    //         continue
    //     }
    //     if (i % 2 === getIndex) {
    //         // 如果当前是收益项，那么直接计算收益
    //         maxStole += nums[i];
    //     } else {
    //         lastStole += nums[i];
    //         if (maxStole < lastStole) {
    //             getIndex = i % 2;
    //             let tempStole = lastStole;
    //             lastStole = maxStole;
    //             maxStole = tempStole;
    //         } else if(maxStole && i-2 >= 0 && maxStole === lastStole) {
    //             maxStole = maxStole - nums[i - 2] + nums[i]
    //             getIndex = i % 2; 
    //         }
    //     }
    // }
    // return maxStole;
    if(nums === null || nums.length  === 0) {
        return 0;
    }
    let len = nums.length;
    // let dp = nums.reduce((total, el) => {
    //     total.push([])
    //     return total;
    // }, []);
    // dp.forEach(el => el = [])
    // dp[0][0] = 0
    // dp[0][1] = nums[0];
    let dp0 = 0;
    let dp1 = nums[0]
    for(let i = 1; i < len; i++) {
        // dp[i][0] 表示第i家偷了的最大金额,    
        // dp[i][1]表示第i家没偷的最大金额，如果i家要偷，那么i-1就不能偷，那么就用i-1没偷的最大数+当前金额，即dp[i-1][0] + num[i]
        // dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1]);
        // dp[i][1] = dp[i-1][0] + nums[i]
        temMax = Math.max(dp0, dp1);
        dp1 = dp0 + nums[i]
        dp0 = temMax
    }
    return maxStole
}
let price = [1, 2, 3, 1]
// console.log(rob(price))

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
var maxSubArray = function (nums) {
    // 执行用时： 88 ms , 在所有 JavaScript 提交中击败了 79.13% 的用户
    // 内存消耗： 52 MB , 在所有 JavaScript 提交中击败了 7.93% 的用户
    // let maxCount = []
    // let dp = new Array(nums.length)
    // dp[0] = nums[0]
    // let max = dp[0]
    // for (let i = 1; i < nums.length; i++) {
    //     // dp[i]用来表示，终点在i的子序列的最佳子序和
    //     // 如果dp[i-1]大于0，就继续累加，dp[i]=dp[i-1]+num[i]。如果dp[i-1]小于0，我们直接把前面的舍弃，也就是说重新开始计算，否则会越加越小的，直接让dp[i]=num[i]
    //     dp[i] = Math.max(dp[i - 1], 0) + nums[i]
    //     // 再比较当前dp[i]是否大于max，如果大于max, 那么重新开始计算
    //     max = Math.max(max, dp[i])
    // }
    // console.log(dp)
    // return max

    // 优化
    // 执行用时： 76 ms , 在所有 JavaScript 提交中击败了 97.13% 的用户
    // 内存消耗： 49.2 MB , 在所有 JavaScript 提交中击败了 28.64% 的用户
    let calculate = nums[0]; // 计算差值
    let max = nums[0];
    for (let i = 1; i < nums.length; i++) {
        // dp[i]用来表示，终点在i的子序列的最佳子序和
        // 如果dp[i-1]大于0，就继续累加，dp[i]=dp[i-1]+num[i]。如果dp[i-1]小于0，我们直接把前面的舍弃，也就是说重新开始计算，否则会越加越小的，直接让dp[i]=num[i]
        calculate = Math.max(calculate, 0) + nums[i];
        // 再比较当前dp[i]是否大于max，如果大于max, 那么重新开始计算
        max = Math.max(max, calculate);
    }
    return max;
};
// let maxlist = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
// console.log(maxSubArray(maxlist))

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
    for (let i = 0; i < prices.length; i++) {
        if (prices[i] < minProfit) {
            minProfit = prices[i];
        } else if (prices[i] - minProfit > maxPro) {
            maxPro = prices[i] - minProfit;
        }
    }
    return maxPro;
};
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
            return b; // 由上一个a+b计算而来，从第3项开始，每一项都等于前两项之和
        }
        return climbStair(n - 1, b, a + b);
    }
    return climbStair(n, 1, 1);
};

// console.log(climbStairs(5))
