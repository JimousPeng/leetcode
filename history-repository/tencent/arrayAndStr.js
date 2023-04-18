/** 数组和字符串 */

/**
 * 寻找两个正序数组的中位数
 * 给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数
 * 输入：nums1 = [1,3], nums2 = [2]
 * 输出：2.00000
 * 解释：合并数组 = [1,2,3] ，中位数 2
 *
 * 输入：nums1 = [1,2], nums2 = [3,4]
 * 输出：2.50000
 * 解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
    const newList = nums1.concat(nums2);
    newList.sort((a, b) => a - b);
    const numLen = newList.length;
    if (numLen % 2 === 1) {
        const getIndex = Math.floor(numLen / 2);
        return newList[getIndex];
    } else {
        const midNum = numLen / 2;
        return Number(((newList[midNum - 1] + newList[midNum]) / 2).toFixed(5));
    }
};

/**
 * 两数之和-给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 * 只会存在一个有效答案
 */
var twoSum = function (nums, target) {
    const numMap = new Map();
    const indexList = [];
    for (let i = 0; i < nums.length; i++) {
        if (numMap.has(nums[i])) {
            const firstIndex = numMap.get(nums[i]);
            indexList.push(firstIndex, i);
            break;
        } else {
            numMap.set(target - nums[i], i);
        }
    }
    return indexList;
};
