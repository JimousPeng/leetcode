/**
 * 322. 零钱兑换
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  /**
   * 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。
   * 计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1
   *
   * 输入：coins = [1, 2, 5], amount = 11 输出：3 解释：11 = 5 + 5 + 1
   */

  // 递归解决 - 会超时
  function useDfs() {
    const len = coins.length;
    let res = Infinity;
    function trackBack(amount, count) {
      if (amount === 0) {
        res = Math.min(res, count);
        return;
      }
      if (amount < 0) return;

      for (let i = 0; i < len; i++) {
        trackBack(amount - coins[i], count + 1);
      }
    }
    trackBack(amount, 0);
    return res === Infinity ? -1 : res;
  }

  // 递归解决 - 超时优化, 通过 countMap 消除子问题的冗余
  function useDfs() {
    // 转换成子问题

    const countMap = new Map();
    function dfs(n) {
      if (n === 0) return 0; // 不需要硬币了
      if (n < 0) return -1;

      if (countMap.get(n)) return countMap.get(n);

      let res = Infinity;
      for (let coin of coins) {
        // 统计还需要的硬币数
        const count = dfs(n - coin);

        if (count === -1) continue;

        res = Math.min(res, count + 1);
      }
      if (res === Infinity) {
        countMap.set(n, -1);
        return -1;
      }
      countMap.set(n, res);
      return res;
    }

    return dfs(amount);
  }

  // dp动规：dp[i]: 第目标金额为i时，至少需要dp[i]枚硬币
  /**
   * 分析：
   * 假设：输入：coins = [1, 2, 5], amount = 11
   * 因为初始下标为0-11，所以数组构建长度为 amount + 1
   * dp -> [0, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11]   dp.length = 12  dp[0] = 10
   * 之后对dp遍历
   * dp[0]  ->  [1,2,5]  0 -1 < 0 continue
   * dp[1]  ->  [1]  dp[1] = 1   1-2 < 0 continue
   * dp[2]  ->  i-1 = 1  dp[2] = Math.min(dp[2], 1 + dp[1]) = 1
   *            i-2 = 0  dp[2] = Math.min(dp[2], 1 + dp[0]) = 1
   *            dp[2] = 1
   * dp[3]  ->  [1,2,5]
   *            i-1 =2   dp[3] = Math.min(dp[3], 1 + dp[2]) = 3
   *            i-2 =1   dp[3] = Math.min(dp[3], 1 + dp[1]) = 2
   *            i-5 < 0  continue
   *            dp[3] = 2
   *
   */
  function useDp() {
    const len = coins.length;
    // dp初始值设置为 amount + 1，是因为最多的情况下是全部用1元的硬币，用amount+1个
    const dp = new Array(amount + 1).fill(amount + 1);
    dp[0] = 0;
    // 外层for循环遍历所有状态的所有取值
    for (let i = 0; i < dp.length; i++) {
      //  子问题求解： dp[i] = Math.min(dp[i], 1 + dp[i - coin]); 实际上是对dp[amount]的下标赋值的过程
      // 求所有选择的最小值
      for (const coin in coins) {
        if (i - coin < 0) continue; // 说明当前硬币不可取
        dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
      }
    }
    return dp[amount] === amount + 1 ? -1 : dp[amount];
  }
};

/**
 * 面试题 17.23. 最大黑方阵
 * 给定一个方阵，其中每个单元(像素)非黑即白。设计一个算法，找出 4 条边皆为黑色像素的最大子方阵
 * @param {number[][]} matrix
 * @return {number[]}
 */
var findSquare = function (matrix) {
  /**
   * 返回一个数组 [r, c, size] ，其中 r, c 分别代表子方阵左上角的行号和列号，size 是子方阵的边长
   *
   * 1  0  1
   * 0  0  1
   * 0  0  1
   * 输入: [ [1,0,1], [0,0,1], [0,0,1] ] 输出: [1,0,2] 解释: 输入中 0 代表黑色，1 代表白色，标粗的元素即为满足条件的最大子方阵
   *
   * 0  1  1
   * 1  0  1
   * 1  1  0
   * 输入: [ [0,1,1], [1,0,1], [1,1,0] ] 输出: [0,0,1]
   *
   * 找出 4 条边皆为黑色(值为0)像素的最大子方阵
   */
};
