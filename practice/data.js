/** 下一个更大元素I
 *
 * nums1 中数字 x 的 下一个更大元素 是指 x 在 nums2 中对应位置 右侧 的 第一个 比 x 大的元素
 * 给你两个 没有重复元素 的数组 nums1 和 nums2 ，下标从 0 开始计数，其中nums1 是 nums2 的子集
 *
 * 输入：nums1 = [4,1,2], nums2 = [1,3,4,2].
 * 输出：[-1,3,-1]
 *
 * 对于每个 0 <= i < nums1.length ，找出满足 nums1[i] == nums2[j] 的下标 j ，并且在 nums2 确定 nums2[j] 的 下一个更大元素 。如果不存在下一个更大元素，那么本次查询的答案是 -1
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
    const ans = []
    // 	124 ms	45.6 MB
    // for (let i = 0; i < nums1.length; i++) {
    //     const curNum = nums1[i]
    //     // 先找到下标
    //     let left = nums2.findIndex((item) => item === curNum)
    //     let initFlag
    //     left += 1
    //     // 在轮询nums2的值
    //     while (curNum > nums2[left] && nums2[left] !== undefined) {
    //         left++
    //     }
    //     initFlag = nums2[left] ? nums2[left] : -1
    //     ans.push(initFlag)
    // }
    // return ans

    // 优化：其实可以先用个map表存下num2的key:index, value: value
    // 	68 ms	42.9 MB  : 对比上一个方案，执行时间优化了一半，用map缩短了每次从nums2.findIndex的查找耗时
    // const nums2Map = new Map()
    // for (let i = 0; i < nums2.length; i++) {
    //     nums2Map.set(nums2[i], i)
    // }
    // for (let i = 0; i < nums1.length; i++) {
    //     const curNum = nums1[i]
    //     let left = nums2Map.get(curNum) + 1
    //     while (curNum > nums2[left] && nums2[left] !== undefined) {
    //         left++
    //     }
    //     let initFlag = nums2[left] || -1
    //     ans.push(initFlag)
    // }
    // return ans

    // 单调栈, 从后往前扫描元素
    // 	64 ms	43.1 MB
    const stackS = []
    const numMap = new Map()
    for (let i = nums2.length - 1; i >= 0; i--) {
        // 如果栈内元素比当前元素小，那么将元素出栈
        while (stackS.length && stackS[stackS.length - 1] <= nums2[i]) {
            stackS.pop()
        }
        let curFlag = !stackS.length ? -1 : stackS[stackS.length - 1]
        stackS.push(nums2[i])
        numMap.set(nums2[i], curFlag)
    }
    for (let i = 0; i < nums1.length; i++) {
        ans.push(numMap.get(nums1[i]))
    }
    return ans
}

/** 下一个更大元素 II：解决循环数组问题
 * 给定一个循环数组 nums （ nums[nums.length - 1] 的下一个元素是 nums[0] ），返回 nums 中每个元素的 下一个更大元素
 * nums = [1,2,1]  输出: [2,-1,2]
 * @param {number[]} nums
 * @return {number[]}
 */
// 利用求模运算模拟数组
// let arr = [1, 2, 3, 4, 5]
// let arrLen = arr.length
// let index = 0
// while (true) {
//     console.log(arr[index], '看看数组长度')
//     index = (index + 1) % arrLen
// }

var nextGreaterElements = function (nums) {
    const n = nums.length
    const res = []
    const stackNum = []
    for (let i = 2 * n - 1; i >= 0; i--) {
        while (stackNum.length && stackNum[stackNum.length - 1] <= nums[i % n]) {
            stackNum.pop()
        }
        res[i % n] = stackNum.length ? stackNum[stackNum.length - 1] : -1
        stackNum.push(nums[i % n])
    }
    return res
}

/** 下一个更大元素 III
 * 给你一个正整数 n ，请你找出符合条件的最小整数，其由重新排列 n 中存在的每位数字组成，并且其值大于 n 。
 * 如果不存在这样的正整数，则返回 -1
 * 输入：n = 12  输出：21
 * 输入：n = 21  输出：-1  21 -> 12; 12 < 21, 所以返回-1
 * @param {number} n
 * @return {number}
 */
var nextGreaterElement = function (n) {}
