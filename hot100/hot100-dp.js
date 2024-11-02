/** 动态规划 */

/**
 * 70. 爬楼梯
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  /** 暴力递归 */
  function dfs() {
    if (n === 1) return 1;
    if (n == 2) return 2;
    return climbStairs(n - 1) + climbStairs(n - 2);
  }

  // 带备忘录的递归, 由于递归存在重复计算的场景,即对n-2递归的时候，存在对n-1递归过的节点的重复计算，此时可以保存相同节点的值
  function dfsOpt() {
    const stepMap = {};
    function dfs(n) {
      if (n === 1) return 1;
      if (n === 2) return 2;
      if (stepMap[n] !== undefined) return stepMap[n];
      stepMap[n] = dfs(n - 1) + dfs(n - 2);
      return stepMap[n];
    }
    return dfs(n);
  }

  function useDp() {
    const dp = [];
    dp[0] = 1;
    dp[1] = 2;
    for (let i = 2; i < n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n - 1];
  }

  // dp优化 - 状态压缩  dp[i] 依赖 i-1 和 i-2 的状态
  function useDpOpt() {
    if (n <= 2) return n;
    let p = 1,
      q = 1,
      r = 1;
    for (let i = 2; i <= n; i++) {
      p = q;
      q = r;
      r = p + q;
    }
    return r;
  }
};
