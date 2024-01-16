/** 数组操作相关 */

/** 219. 存在重复元素 II
 *  给你一个整数数组 nums 和一个整数 k ，判断数组中是否存在两个 不同的索引 i 和 j ，满足 nums[i] == nums[j] 且 abs(i - j) <= k 。
 *  如果存在，返回 true ；否则，返回 false
 *
 *  输入：nums = [1,2,3,1], k = 3  输出：true
 *  输入：nums = [1,2,3,1,2,3], k = 2 输出：false
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
    // 找到相同的两个值，满足索引不同，且下标间隔 <= k

    const numsMap = {}
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i]
        // 因为下标是从0开始，所以要处理 numsMap 为0的情况
        if ((numsMap[num] || numsMap[num] == 0) && i - numsMap[num] <= k) {
            return true
        } else {
            numsMap[num] = i
        }
    }
    return false

    // 两个while循环太费时了，超出时间限制
    // let left = 0
    // let flag = false
    // while (left < nums.length - 1) {
    //     if (flag) return flag
    //     let right = left + 1
    //     while (right <= nums.length - 1) {
    //         if (nums[right] === nums[left] && right - left <= k) {
    //             flag = true
    //             return flag
    //         }
    //         right++
    //     }
    //     left++
    // }
    // return false
}

/** 26. 删除有序数组中的重复项
 * 给你一个 非严格递增排列 -> 应该是升序数组，但是有重复项 的数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，
 * 返回删除后数组的新长度。元素的 相对顺序 应该保持 一致 。然后返回 nums 中唯一元素的个数
 *
 * 更改数组 nums ，使 nums 的前 k 个元素包含唯一元素，并按照它们最初在 nums 中出现的顺序排列。nums 的其余元素与 nums 的大小不重要
 *
 * 输入：nums = [0,0,1,1,1,2,2,3,3,4]  输出：5, nums = [0,1,2,3,4]
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    let left = 0,
        right = left + 1
    while (right < nums.length) {
        if (nums[left] === nums[right]) {
            right++
        } else {
            nums[++left] = nums[right]
            right++
        }
    }
    return left + 1 // 因为left是从0开始，我们需要返回的是length
}
