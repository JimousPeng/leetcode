/**
 * 细节处理：
 * 1. 哈希表判断用 if(hash[key] !== undefined) 代替 if(hash[key]); 值可能为0
 */

/**
 * 1. 两数之和
 * 给定一个整数数组 nums 和一个整数目标值 target
 * 请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标
 * 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现
 * 你可以按任意顺序返回答案。
 * 输入：nums = [2,7,11,15], target = 9
 * 输出：[0,1]  因为 nums[0] + nums[1] == 9 ，返回 [0, 1]
 * @param {number[]} nums  2 <= nums.length <= 10^4
 * @param {number} target
 * @return {number[]}  只会存在一个有效答案
 */
var twoSum = function (nums, target) {
    const targetMap = {}
    const len = nums.length
    for (let i = 0; i < len; i++) {
        const num = nums[i]
        if (targetMap[num] !== undefined) {
            return [i, targetMap[num]]
        }
        targetMap[target - num] = i
    }
}

/**
 * 49. 字母异位词分组
 * 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表
 * 字母异位词 是由重新排列源单词的所有字母得到的一个新单词
 * 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
 * 输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
 *
 * 输入: strs = [""]  输出: [[""]]
 *
 * 输入: strs = ["a"] 输出: [["a"]]
 *
 * @param {string[]} strs  1 <= strs.length <= 10^4   0 <= strs[i].length <= 100
 * @return {string[][]}  strs[i] 仅包含小写字母
 */
var groupAnagrams = function (strs) {
	
}
