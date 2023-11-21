/** 数组数据接口相关 */

// 双指针
/** 349. 两个数组的交集
 * 给定两个数组 nums1 和 nums2 ，返回 它们的交集 。
 * 输出结果中的每个元素一定是 唯一 的。我们可以 不考虑输出结果的顺序
 * 输入：nums1 = [1,2,2,1], nums2 = [2,2]
 * 输出：[2]
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
    // if (!nums1.length || !nums2.length) return []
    // const nums = []
    // let left = 0,
    //     right = 0
    // while (left < nums1.length) {
    // 这个while循环的使用，就相当于for循环，对nums1的每一项，都对nums2遍历，时间复杂度 n*n
    //     const leftNum = nums1[left]
    //     while (right < nums2.length && !nums.includes(leftNum)) {
    //         const rightNum = nums2[right]
    //         if (leftNum === rightNum) {
    //             nums.push(rightNum)
    //             break
    //         }
    //         right++
    //     }
    //     right = 0
    //     left++
    // }
    // return nums

    // 优化，先排序,执行用时会更快
    const nums = []
    nums1.sort((a, b) => a - b)
    nums2.sort((a, b) => a - b)
    let left = 0
    let right = 0
    while (left < nums1.length && right < nums2.length) {
        const leftNum = nums1[left]
        const rightNum = nums2[right]
        if (leftNum < rightNum) {
            left++
        } else if (leftNum > rightNum) {
            right++
        } else {
            if (!nums.includes(leftNum)) {
                nums.push(leftNum)
            }
            left++
            right++
        }
    }
    return nums
}
