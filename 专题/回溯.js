/** 回溯相关算法 */

/**
 * 77. 组合
 * @param {number} n  1 <= n <= 20
 * @param {number} k  1 <= k <= n
 * @return {number[][]}
 */
var combine = function (n, k) {
  // 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合
  function useBackTrack() {
    const result = [];

    function backTracking(startIndex, res) {
      if (res.length === k) {
        // 因为 res 是一个引用类型，所以将res存入 result 时，需要复制处理
        result.push([...res]);
        return;
      }

      for (let i = startIndex; i <= n; i++) {
        res.push(i);
        backTracking(i + 1, res);
        // 将上一层遍历的结果弹出，保证在组合处理完[1,2]后，弹出2，之后继续for循环遍历[3,4]，以达到组合[1,3], [1,4]
        res.pop();
      }
    }

    backTracking(1, []);

    return result;
  }

  // 回溯剪枝优化
  function useBackTrackOpt() {
    const result = [];

    function backTracking(startIndex, res) {
      if (res.length === k) {
        // 因为 res 是一个引用类型，所以将res存入 result 时，需要复制处理
        result.push([...res]);
        return;
      }

      // 剪枝处理在于处理for循环中i的范围，限制i的最小起始范围
      // eg: n = 4, k =2
      // 当遍历到 [1,2],对于[3,4]，其实是不需要递归了，因为满足了 k = 2的情况，所以需要限制 i 的起始
      // res.length: 已选取的元素大小
      // k - res.length: 还需要选取的元素大小
      // n - (k - res.length) + 1: 当前for循环选取的元素至多可以从哪个开始选取的下标，+1是因为起始包括startIndex
      const size = n - (k - res.length) + 1;
      for (let i = startIndex; i <= size; i++) {
        res.push(i);
        backTracking(i + 1, res);
        // 将上一层遍历的结果弹出，保证在组合处理完[1,2]后，弹出2，之后继续for循环遍历[3,4]，以达到组合[1,3], [1,4]
        res.pop();
      }
    }

    backTracking(1, []);

    return result;
  }
};

/**
 * 216. 组合总和 III
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function (k, n) {
  /**
   * 找出所有相加之和为 n 的 k 个数的组合，且满足下列条件
   * 1. 只使用数字1到9
   * 2. 每个数字 最多使用一次
   * 返回 所有可能的有效组合的列表 。该列表不能包含相同的组合两次，组合可以以任何顺序返回
   * 输入: k = 3, n = 7 输出: [[1,2,4]] 解释: 1 + 2 + 4 = 7 没有其他符合的组合了。
   */

  function useBackTrack() {
    const result = [];
    function backTracking(startIndex, target, res) {
      // 组合内达到三个数，就不往下遍历了
      if (target < 0) return;
      if (res.length === k) {
        if (target === 0) {
          result.push([...res]);
        }
        return;
      }
      // 只能使用 1-9，res.length = k
      for (let i = startIndex; i <= 9; i++) {
        res.push(i);
        backTracking(i + 1, target - i, res);
        res.pop();
      }
    }
    backTracking(1, n, []);
    return result;
  }

  // 回溯剪枝优化 - 当遍历数大于目标数，直接break
  function useBackTrackOpz() {
    const result = [];
    function backTracking(startIndex, target, res) {
      if (res.length === k) {
        if (target === 0) {
          result.push([...res]);
        }
        return;
      }
      // 只能使用 1-9，res.length = k
      // 这里可以对i的边界做剪枝，结合k的值
      // max = 9 - (k - res.length) + 1;
      for (let i = startIndex; i <= 9; i++) {
        if (target - i < 0) break; // 当前i已经大于target，直接结束循环

        res.push(i);
        backTracking(i + 1, target - i, res);
        res.pop();
      }
    }
    backTracking(1, n, []);
    return result;
  }
};

/**
 * 组合总和
 * @param {number[]} candidates  candidate 中的每个元素都是独一无二的
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  // 给定一个无重复元素的正整数数组 candidates 和一个正整数 target ，
  // 找出 candidates 中所有可以使数字和为目标数 target 的唯一组合
  // candidates 中的数字可以无限制重复被选取。如果至少一个所选数字数量不同，则两种组合是不同的
  // 输入: candidates = [2,3,6,7], target = 7 输出: [[7],[2,2,3]]

  // 由于是组合，以下写法没有去重处理，会导致：
  // 输入: candidates = [2,3,6,7], target = 7
  // 输出:[[2,2,3],[2,3,2],[3,2,2],[7]]
  function backTrack() {
    const result = [];
    const len = candidates.length;
    function backTracking(sum, res) {
      if (sum === target) {
        result.push([...res]);
        return;
      }
      for (let i = 0; i < len; i++) {
        const num = candidates[i];
        if (sum + num > target) break; // 剪枝
        res.push(num);
        backTracking(sum + num, res);
        res.pop();
      }
    }
    backTracking(0, []);
    return result;
  }

  // 回溯优化-组合去重, 要保证for循环的起始只能从当前遍历项开始
  function backTrackOptimize() {
    // 需要先排序，才更方便递归
    candidates.sort((a, b) => a - b);
    const result = [];
    const len = candidates.length;
    function backTracking(start, sum, res) {
      if (sum === target) {
        result.push([...res]);
        return;
      }
      for (let i = start; i < len; i++) {
        const num = candidates[i];
        if (sum + num > target) break; // 剪枝
        res.push(num);
        backTracking(i, sum + num, res);
        res.pop();
      }
    }
    backTracking(0, 0, []);
    return result;
  }
};
