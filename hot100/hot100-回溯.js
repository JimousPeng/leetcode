/** 回溯算法 */

/**
 * 46. 全排列
 * @param {number[]} nums  1 <= nums.length <= 6
 * @return {number[][]}
 */
var permute = function (nums) {
  // 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案
  //   输入：nums = [1,2,3] 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

  const len = nums.length;
  const result = [];

  function trackingBack(res = []) {
    if (res.length === nums.length) {
      result.push(res);
      return;
    }
    for (let i = 0; i < len; i++) {
      const num = nums[i];
      if (res.includes(num)) continue;
      trackingBack([...res, num]);
    }
  }

  trackingBack();

  return result;
};

/**
 * 78. 子集
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  /**
   * 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的 子集 （幂集）
   * 解集 不能 包含重复的子集。你可以按 任意顺序 返回解集
   */

  // 回溯解决
  function useTrack() {
    const len = nums.length;

    const result = [];

    function trackingBack(res = []) {
      for (let i = 0; i < len; i++) {
          
      }
    }

    trackingBack([]);

    return result.push([]);
  }
};
