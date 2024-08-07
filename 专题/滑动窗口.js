/**
 * 219. 存在重复元素 II
 * @param {number[]} nums  1 <= nums.length <= 10^5
 * @param {number} k  0 <= k <= 10^5
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
    // 给你一个整数数组 nums 和一个整数 k ，判断数组中是否存在两个 不同的索引 i 和 j
    // 满足 nums[i] == nums[j] 且 abs(i - j) <= k 。如果存在，返回 true ；否则，返回 false 。
    // 	示例 1：
    // 输入：nums = [1,2,3,1], k = 3
    // 输出：true
    // 示例 2：
    // 输入：nums = [1,0,1,1], k = 1
    // 输出：true
    // 示例 3：
    // 输入：nums = [1,2,3,1,2,3], k = 2
    // 输出：false
    // 可以用hash表，存入差值和下标，先匹配差值，再匹配下标，如果都满足，那么返回true

    // 滑动窗口解法
    const set = new Set()
    const length = nums.length
    for (let i = 0; i < length; i++) {
        // 维护窗口 [i-k, i]
        if (i > k) {
            set.delete(nums[i - k - 1])
        }
        if (set.has(nums[i])) {
            return true
        }
        set.add(nums[i])
    }
    return false
}
