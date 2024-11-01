/** 单调栈 */

/**
 * 739. 每日温度
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function(temperatures) {
  /**
   * 给定一个整数数组 temperatures ，表示每天的温度
   * 返回一个数组 answer ，其中 answer[i] 是指对于第 i 天，下一个更高温度出现在几天后。
   * 如果气温在这之后都不会升高，请在该位置用 0 来代替
   *
   * 输入: temperatures = [73,74,75,71,69,72,76,73] 输出: [1,1,4,2,1,1,0,0]
   */

  //   单调栈思路
  function useStack() {
    const len = temperatures.length;
    const result = new Array(len).fill(0);

    for (let i = 1; i < len; i++) {
      let top;
      while ((top = result.shift() && temperatures[i] > temperatures[top])) {
        // 当前温度大于栈口温度
        result[top] = i - top;
      }
    }
  }

  // 嵌套循环解决 - 会超时
  function useCross() {
    const len = temperatures.length;
    const result = new Array(len).fill(0);
    for (let i = 0; i < len - 1; i++) {
      for (let j = i + 1; j < len; j++) {
        if (temperatures[j] > temperatures[i]) {
          result[i] = j - i;
          // 这里一定要记得break，不然 result[i]会随着 j 的循环而被变更
          break;
        }
      }
    }
    return result;
  }
};
