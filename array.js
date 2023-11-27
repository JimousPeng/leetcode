/** 数组操作相关 */

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
