/** 单调栈 */

/**
 * 739. 每日温度
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
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

    // result 存的是数组的下标
    const result = new Array(len).fill(0);
    const stack = []; // 单调栈
    stack.push(0);

    for (let i = 1; i < len; i++) {
      while (temperatures[i] > temperatures[stack[0]]) {
        // 当前温度大于栈口温度
        let stackTemp = stack[0];
        result[stackTemp] = i - stackTemp;
        stack.shift();
      }
      stack.unshift(i);
    }
    return result;
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

  // 嵌套循环优化 - 采用从数组末尾开始往前遍历
  // 对于temperatures[i],需要找到最小下标j，满足 temperatures[i] < temperatures[j] && i < j
  function useCross() {
    const len = temperatures.length;
    const result = new Array(len).fill(0);

    // 输入: temperatures = [73,74,75,71,69,72,76,73] 输出: [1,1,4,2,1,1,0,0]
    /**
     * temperatures = [73,74,75,71,69,72,76,73]
     */
    const nextList = new Array(101).fill(Infinity); // 记录一个遍历过的温度最小下标，因为存的是0-100, 所以需要101位

    for (let i = len - 1; i >= 0; i--) {
      const temp = temperatures[i];
      let min = Infinity;
      for (let t = temp + 1; t <= 100; t++) {
        // 更新当前温度对应前一个数的最小下标
        min = Math.min(min, nextList[t]);
      }
      if (min !== Infinity) {
        // 说明
        result[i] = min - i;
      }
      nextList[temp] = i; // 这里为nextList赋值
    }
    return result;
  }
};

/**
 * 20. 有效的括号
 * @param {string} s 1 <= s.length <= 104
 * @return {boolean}
 */
var isValid = function (s) {
  /**
   * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
   * 有效字符串需满足：
   * 1. 左括号必须用相同类型的右括号闭合。
   * 2. 左括号必须以正确的顺序闭合
   * 3. 每个右括号都有一个对应的相同类型的左括号
   *
   * 输入：s = "()[]{}" 输出：true
   * 输入：s = "()[{]}" false
   * 输入：s = "(]" 输出：false
   */

  // 使用单调栈
  function useStack(s) {
    const len = s.length;
    if (len % 2 !== 0) return false;
    const strMap = {
      "(": ")",
      "{": "}",
      "[": "]",
    };
    const stack = [];
    stack.push(strMap[s[0]]);
    for (let i = 1; i < len; i++) {
      const str = s[i];
      if (str === stack[0]) {
        stack.shift();
      } else {
        stack.unshift(strMap[str]);
      }
    }
    return stack.length === 0;
  }
};
