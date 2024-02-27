/** 动态规划 */

/** 面试题 16.17. 连续数列
 * 给定一个整数数组，找出总和最大的连续数列，并返回总和\
 * 输入： [-2,1,-3,4,-1,2,1,-5,4]  输出： 6
 * 解释： 连续子数组 [4,-1,2,1] 的和最大，为 6
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    /** 动态规划
     * dp[i][0] 当前值不累加
     * dp[i][1] 当前值累加
     */
    const numsLen = nums.length

    if (numsLen === 1) return nums[0]
    if (numsLen === 2) return Math.max(nums[0], nums[1], nums[0] + nums[1])

    let max = -Infinity
    const dp = []

    for (let i = 0; i < numsLen; i++) {
        if (dp[i] === undefined) {
            dp[i] = []
        }
        if (i === 0) {
            dp[i][0] = -Infinity
            dp[i][1] = nums[i]
        } else {
            dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1])
            dp[i][1] = Math.max(dp[i - 1][1] + nums[i], nums[i])
            max = Math.max(dp[i][0], dp[i][1], max)
        }
    }
    return max

    /** 动态规划优化 */
    const numsLen = nums.length
    let dp0 = -Infinity,
        dp1 = nums[0]
    for (let i = 1; i < numsLen; i++) {
        const tempDp0 = Math.max(dp0, dp1)
        const tempDp1 = Math.max(dp1 + nums[i], nums[i])
        dp0 = tempDp0
        dp1 = tempDp1
    }
    return Math.max(dp0, dp1)
}

/** 面试题 17.16. 按摩师
 * 一个有名的按摩师会收到源源不断的预约请求，每个预约都可以选择接或不接。
 * 在每次预约服务之间要有休息时间，因此她不能接受相邻的预约。
 * 给定一个预约请求序列，替按摩师找到最优的预约集合（总预约时间最长），返回总的分钟数。
 *
 * 输入： [1,2,3,1]  输出： 4  解释： 选择 1 号预约和 3 号预约，总时长 = 1 + 3 = 4。
 * 输入： [2,7,9,3,1]  输出： 12  解释： 选择 1 号预约、 3 号预约和 5 号预约，总时长 = 2 + 9 + 1 = 12。
 * @param {number[]} nums
 * @return {number}
 */
var massage = function (nums) {
    /**
     * 动态规划 不能接受相邻的预约
     * dp[i] 第i次预约的最大时长
     * dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1]): 第i次不预约的最大时长
     * dp[i][1] = dp[i-1][0] + nums[i]: 第i次预约的最大时长 = 前一次不预约 + 当前预约时长
     */
    if (nums.length === 1) return nums[0]
    if (nums.length === 2) return Math.max(nums[0], nums[1])
    const numsLen = nums.length
    const dp = []
    let max = 0
    for (let i = 0; i < numsLen; i++) {
        if (dp[i] === undefined) {
            dp[i] = []
        }
        if (i === 0) {
            dp[i][0] = 0
            dp[i][1] = nums[i]
        } else {
            dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1])
            dp[i][1] = dp[i - 1][0] + nums[i]
            max = Math.max(dp[i][0], dp[i][1])
        }
    }
    return max

    /**
     * 动态规划优化
     * 从状态递推公式来看：dp[i][0/1]只跟前一个状态dp[i][0/1]有关，不使用二维数组优化
     */
    const numsLen = nums.length
    if (numsLen === 0) return 0
    let dp0 = 0
    let dp1 = nums[0]
    for (let i = 1; i < numsLen; i++) {
        const tdp0 = Math.max(dp0, dp1)
        const tdp1 = dp0 + nums[i]
        dp0 = tdp0
        dp1 = tdp1
    }
    return Math.max(dp0, dp1)
}

/** 121. 买卖股票的最佳时机
 * 给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格
 * 你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润
 * 返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0
 * 输入：[7,1,5,3,6,4] 输出：5
 * 解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
 * 注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票
 * @param {number[]} prices 1 <= prices.length <= 105
 * @return {number} 0 <= prices[i] <= 104
 */
var maxProfit = function (prices) {
    // 一只股票有两种状态，持有， 获利
    const dp = []
    const len = prices.length
    for (let i = 0; i < len; i++) {
        if (dp[i] === undefined) {
            dp[i] = []
        }
        if (i == 0) {
            dp[i][0] = prices[0] // 持有
            dp[i][1] = 0 // 收益
        } else {
            dp[i][0] = Math.min(dp[i - 1][0], prices[i])
            const charge = prices[i] - dp[i - 1][0]
            dp[i][1] = Math.max(dp[i - 1][1], charge < 0 ? 0 : charge)
        }
    }
    return dp[len - 1][1]

    /** 不用动态规划，一次遍历
     * 遇到最低值买入，遇到高值卖出，更新利润最大值
     */
    let max = 0
    let buy = prices[0]
    for (let i = 1; i < prices.length; i++) {
        const curGet = prices[i] - buy
        if (curGet < 0) {
            buy = prices[i]
        } else if (curGet > max) {
            max = curGet
        }
    }
    return max
}

/** 122. 买卖股票的最佳时机 II
 * 给你一个整数数组 prices ，其中 prices[i] 表示某支股票第 i 天的价格
 * 在每一天，你可以决定是否购买和/或出售股票。你在任何时候 最多 只能持有 一股 股票。你也可以先购买，然后在 同一天 出售。
 * 输入：prices = [7,1,5,3,6,4]  输出：7
 * 解释：
 * 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5 - 1 = 4 。
 * 随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6 - 3 = 3 。
 * 总利润为 4 + 3 = 7 。
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    /** 一次遍历 */
    let res = 0
    let buy = prices[0]
    const len = prices.length
    for (let i = 1; i < len; i++) {
        if (prices[i] > buy) {
            res += prices[i] - buy
        }
        buy = prices[i]
    }
    return res

    /** 动态规划 1
     * 对于一只股票有两种状态，持有0，卖出1  低价持有，高价卖出
     * 定义dp[i] -> dp[i][0] 为持有该股票的收益   dp[i][1]为当前获得的收益
     *
     */
    const len = prices.length
    const dp = []
    for (let i = 0; i < len; i++) {
        if (dp[i] === undefined) {
            dp[i] = []
        }
        if (i === 0) {
            dp[i][0] = prices[i]
            dp[i][1] = 0
        } else {
            if (prices[i] < dp[i - 1][0]) {
                // 持有
                dp[i][0] = prices[i]
            } else {
                dp[i][0] = Math.max(prices[i], dp[i - 1][0]) // 高价卖出
            }
            dp[i][1] = Math.max(prices[i] - dp[i - 1][0], 0) + dp[i - 1][1] // 计算收益
        }
    }
    return dp[len - 1][1]

    /** 动态规划2：
     * 定义新的递归公式 dp[i]
     * dp[i][0] 表示第 i 天交易完后手里没有股票的最大利润, 即卖出
     * dp[i][1] 表示第 i 天交易完后手里持有一支股票的最大利润（i 从 0 开始）
     *
     * dp[i][0] = max(dp[i-1][0], dp[i-1][1]+prices[i])
     * dp[i][1] = max(dp[i-1][1], dp[i-1][0]-prices[i])
     */
    const len = prices.length
    const dp = []
    for (let i = 0; i < len; i++) {
        if (dp[i] === undefined) {
            dp[i] = []
        }
        if (i === 0) {
            dp[i][0] = 0 // 交易完后手里没有股票的最大利润, 因为是当天卖出，所以收益为0
            dp[i][1] = -prices[i] // 持有股票的收益，对第一天来说负收益
        } else {
            dp[i][0] = Math.max(dp[i - 1][1] + prices[i], dp[i][0]) // 获取当前股票收益 prices[i], 当 dp[i - 1][1] + prices[i] > dp[i][0], 即当前卖出当前股票收益 大于 历史收益，更新卖出收益 dp[i][0]
            dp[i][1] = Math.max(dp[i - 1][0] - prices[i], dp[i][1]) // 这里要买入股票，是继续持有，所以是上一个交易完的状态 dp[i-1][0] - prices[i] 买入当前股票之后 计算的收益跟 上一次交易继续持有股票的交易做对比，判断要不要持有
        }
    }
    // 由于全部交易结束后，持有股票的收益 一定低于 不持有股票的收益 即最终股票还是要卖出
    return dp[len - 1][0]
}

/** 198. 打家劫舍
 * 如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警
 * 给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额
 * 输入：[1,2,3,1] 输出：4
 * 解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。 偷窃到的最高金额 = 1 + 3 = 4 。
 * @param {number[]} nums 1 <= nums.length <= 100
 * @return {number}
 */
var rob = function (nums) {
    /**
     * 打家劫舍-动态规划
     * 对于每个房屋可以偷，也可以不偷，这会影响他能不能偷下一个房屋, 0代表不偷，1代表偷
     * 最大金额 = Math.max(dp[i-1][0] + nums[i] -> dp[i][0], dp[i][1])
     *
     * 1. 定义DP数组，dp[i] = 当前房间能偷的最大金额
     * 2. 寻找递推公式
     *    dp[i]存在两种状态，偷 | 不偷
     *    偷   -> dp[i] = dp[i-2] + nums[i]
     *    不偷 -> dp[i] = dp[i-1]
     */
    const numsLen = nums.length
    if (numsLen === 1) return nums[0]
    if (numsLen === 2) return Math.max(nums[0], nums[1])
    const dp = []
    // [2,1,1,2]
    dp[0] = nums[0]
    dp[1] = Math.max(nums[0], nums[1])
    for (let i = 2; i < numsLen; i++) {
        dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1])
    }
    return dp[numsLen - 1]

    // 二位数组解法
    const numsLen = nums.length
    if (numsLen === 1) return nums[0]
    if (numsLen === 2) return Math.max(nums[0], nums[1])
    const dp = []
    let max = 0
    for (let i = 0; i < numsLen; i++) {
        if (dp[i] === undefined) {
            dp[i] = []
        }
        if (i === 0) {
            dp[i][0] = 0
            dp[i][1] = nums[i]
        } else if (i === 1) {
            dp[i][0] = dp[0][1]
            dp[i][1] = nums[i]
        } else {
            // dp[i][0] = dp[i - 1][1] // 关键在这里： 这里不能直接取 dp[i - 1][1]， 因为可以不偷i-1,即i-1在不偷状态下才是最大金额
            dp[i][0] = Math.max(dp[i - 1][1], dp[i - 1][0])
            dp[i][1] = dp[i - 1][0] + nums[i]
            max = Math.max(dp[i][0], dp[i][1])
        }
    }
    return max
}

/** 213. 打家劫舍 II
 *
 * 唯一的区别是此题中的房间是 环状排列 的（即首尾相接），而 198 题中的房间是 单排排列 的；
 *
 * 你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都 围成一圈 , 这意味着第一个房屋和最后一个房屋是紧挨着的
 * 同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警
 * 给定一个代表每个房屋存放金额的非负整数数组，计算你在不触动警报装置的情况下 ，今晚能够偷窃到的最高金额
 *
 * 输入：nums = [2,3,2]   输出：3  解释：你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的
 * 输入：nums = [1,2,3,1] 输出：4  解释：你可以先偷窃 1 号房屋（金额 = 1），然后偷窃 3 号房屋（金额 = 3）。 偷窃到的最高金额 = 1 + 3 = 4 。
 * @param {number[]} nums 1 <= nums.length <= 100
 * @return {number} 0 <= nums[i] <= 1000
 */
var rob = function (nums) {
    /**
     * 已知信息：
     * 第一个房屋和最后一个房屋是紧挨着的，也就是说第一个房间偷了，那么倒数第二个房间不能偷，这里有环
     *
     * 那么这种情况下最大值会在哪里呢
     * 0-nums.length-2 中，偷了nums.length-2时最大，说明偷了nums.length-2，那么nums.length-1就不会偷，避免回环
     * 假设 1-nums.length-1 中，偷了nums.length-1时最大，说明偷了nums.length-1， 那么第0个也就是第一个房屋没有偷，也避免了回环
     * 此时，只需要对比这两个方案哪个最大即可
     */
    const numsLen = nums.length
    if (numsLen === 1) return nums[0]
    if (numsLen === 2) return Math.max(nums[0], nums[1])
    const dp = []
    const dpDif = []
    dpDif[0][0] = 0
    dpDif[0][1] = 0
    let max1 = 0,
        max2 = 0
    /** 不偷最后一家 */
    for (let i = 0; i < numsLen - 1; i++) {
        if (dp[i] === undefined) {
            dp[i] = []
        }
        if (i === 0) {
            dp[i][0] = 0
            dp[i][1] = nums[0]
        } else if (i === 1) {
            dp[i][0] = dp[0][1]
            dp[i][1] = nums[1]
        } else {
            dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1])
            dp[i][1] = dp[i - 1][0] + nums[i]
            // max1 = Math.max(dp[i][0], dp[i][1]) // max不需要每次更新
        }
    }

    max1 = Math.max(dp[numsLen - 2][0], dp[numsLen - 2][1])

    for (let i = 1; i < numsLen; i++) {
        if (dpDif[i] === undefined) {
            dpDif[i] = []
        }
        if (i === 1) {
            dpDif[i][0] = 0
            dpDif[i][1] = nums[i]
        } else {
            dpDif[i][0] = Math.max(dpDif[i - 1][0], dpDif[i - 1][1])
            dpDif[i][1] = dpDif[i - 1][0] + nums[i]
            // max2 = Math.max(dpDif[i][0], dpDif[i][1])
        }
    }

    max2 = Math.max(dpDif[numsLen - 1][0], dpDif[numsLen - 1][1])

    return Math.max(max1, max2)
}
