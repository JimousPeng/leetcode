/*
 * @Date: 2022-01-28 10:10:45
 * @FilePath: \leetcode\src\Array.js
 */

/**两个数组的交集 II
 * 给你两个整数数组 nums1 和 nums2 ，请你以数组形式返回两数组的交集。
 * 返回结果中每个元素出现的次数，应与元素在两个数组中都出现的次数一致（如果出现次数不一致，则考虑取较小值）。可以不考虑输出结果的顺序
 * @param {*} nums
 * @returns
 * eg:
 * 输入：nums1 = [1,2,2,1], nums2 = [2,2]
 * 输出：[2,2]
 */
var intersect = function (nums1, nums2) {
    function compareLen(list1, list2) {
        let longNums = null
        let shortNums = null
        if (list1.length > list2.length) {
            longNums = list1.sort()
            shortNums = list2.sort()
        } else {
            longNums = list2.sort()
            shortNums = list1.sort()
        }
        return {
            longNums,
            shortNums,
        }
    }
    /**先找出两个数组标识长短，并分别排序 */
    const { longNums, shortNums } = compareLen(nums1, nums2)
    console.log(longNums, shortNums, '12')
    // markArr: [起始点，终点，count]
    let markArr = [null, 0, 0]
    for (right = 0; right < shortNums.length; right++) {
        if (longNums.indexOf(shortNums[right])) {
            if (Object.prototype.toString.call(markArr[0]) !== '[object Null]') {
                /**开始记录起始点 */
                markArr[0] = right
            } else {
                // 计算count
                markArr[2] = markArr[2] + 1
            }
        } else {
            if (right > 1 && markArr[0]) {
                /**开始记录起始点 */
                markArr[0] = right
            }
        }
    }
}
console.log(intersect([1, 2, 2, 1], [2, 2]))

/**
 * 只出现一次的数字，给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
 * @param {*} nums
 * @param {*} k
 * 输入: [2,2,1]
 * 输出: 1
 */
var singleNumber = function (nums) {
    let getNum = null
    // let hasShow = []
    // for (let i = 0; i < nums.length; i++) {
    //     if (!hasShow.includes(nums[i]) && nums.lastIndexOf(nums[i]) === i) {
    //         getNum = nums[i]
    //         break
    //     } else {
    //         hasShow.push(nums[i])
    //     }
    // }
    // 先排序
    // nums.sort()
    // for (let i = 0; i < nums.length; i+=2) {
    //     if (nums[i] !== nums[i + 1]) {
    //         // 奇数比较
    //         getNum = nums[i]
    //         break
    //     }
    // }
    // return getNum
    // 异或运算, 原理： 例如： 1^2^2 输出1
    return nums.reduce((total, el) => total ^ el, 0)
}
console.log(singleNumber([2, 2, 1]))

/**旋转数组
 * @param {number[]} nums
 * @param {number} k 非负整数
 * @return {void} Do not return anything, modify nums in-place instead.
 */
//  输入: nums = [1,2,3,4,5,6,7], k = 3
//  输出: [5,6,7,1,2,3,4]
//  解释:
//  向右轮转 1 步: [7,1,2,3,4,5,6]
//  向右轮转 2 步: [6,7,1,2,3,4,5]
//  向右轮转 3 步: [5,6,7,1,2,3,4]
/** 每一项在经历了K次旋转后对应的下标符合 [([i+k]: 每一项后移的次数)%数组长度: %4超过长度取余数] 取余即使旋转结束后所处的位置 */
var rotate = function (nums, k) {
    // 方法一：使用额外的数组
    // let tempNums = nums.slice(0)
    // for (let i = 0; i < nums.length; i++) {
    //     const curData = (i + k) % nums.length // 获取当前遍历项旋转后的最终下标
    //     nums[curData] = tempNums[i]
    // }
    // return nums
    // 方法二：环状替换
    // const gcd = (x, y) => (y ? gcd(y, x % y) : x)
    // const n = nums.length
    // k = k % n
    // let count = gcd(k, n)
    // for (let start = 0; start < count; ++start) {
    //     let current = start
    //     let prev = nums[start]
    //     do {
    //         const next = (current + k) % n
    //         const temp = nums[next]
    //         nums[next] = prev
    //         prev = temp
    //         current = next
    //         console.log(start, current);
    //     } while (start !== current)
    // }
    // 方法三：数组翻转
    // const reverse = (nums, start, end) => {
    //     while (start < end) {
    //         const temp = nums[start]
    //         nums[start] = nums[end]
    //         nums[end] = temp
    //         start += 1
    //         end -= 1
    //     }
    // }
    // k %= nums.length
    // reverse(nums, 0, nums.length - 1)
    // reverse(nums, 0, k - 1)
    // reverse(nums, k, nums.length - 1)
}
// console.log(rotate([1, 2, 3, 4], 3))

/**存在重复元素
 * 给你一个整数数组 nums 。如果任一值在数组中出现 至少两次 ，返回 true ；如果数组中每个元素互不相同，返回 false
 * @param {number[]} nums
 * @return {boolean}
 */
//  输入：nums = [1,1,1,3,3,4,3,2,4,2]
//  输出：true
var containsDuplicate = function (nums) {
    const newList = Array.from(new Set(nums))
    return newList.length < nums.length
}

/**删除排序数组中的重复项
 * @param {number[]} nums
 * @return {number}
 */
//  输入：nums = [1,1,2]
//  输出：2, nums = [1,2]
//  解释：函数应该返回新的长度 2 ，并且原数组 nums 的前两个元素被修改为 1, 2 。不需要考虑数组中超出新长度后面的元素。
var removeDuplicates = function (nums) {
    let left = 0
    for (let right = 1; right < nums.length; right++) {
        if (nums[right] !== nums[left]) {
            nums[++left] = nums[right]
        }
    }
    return ++left
}

/** 买卖股票的最佳时机 II
 * @param {number[]} prices
 * @return {number}
 */
//  输入: prices = [7,1,5,3,6,4]
//  输出: 7
//  解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
//       随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。
var maxProfit = function (prices) {
    // 利润记录
    let profix = 0
    // 记录价格锚点
    let buyPrice = prices[0]
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > buyPrice) {
            // 只要当前股价不是下跌，那么记录价格点位,并抛出
            profix += prices[i] - buyPrice
        }
        buyPrice = prices[i]
    }
    return profix
}
