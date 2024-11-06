/** 每日一题 - 2024 */

/**
 * 3254. 长度为 K 的子数组的能量值 I
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var resultsArray = function (nums, k) {
    /**
     * 给你一个长度为 n 的整数数组 nums 和一个正整数 k
     * 一个数组的 能量值 定义为:
     * 如果 所有 元素都是依次 连续 且 上升 的，那么能量值为 最大 的元素
     * 否则为 -1
     *
     * 你需要求出 nums 中所有长度为 k 的 子数组 的能量值
     * 请你返回一个长度为 n - k + 1 的整数数组 results ，其中 results[i] 是子数组 nums[i..(i + k - 1)] 的能量值
     *
     * 输入：nums = [1,2,3,4,3,2,5], k = 3
     * k = 3
     * [1,2,3] [2,3,4] [3,4,3] [4,3,2] [3,2,5]
     * 输出：[3,4,-1,-1,-1]
     */

    /** 双指针： 会超时 */
    function twoPoint(nums, k) {
        const result = []

        function checkNums(numList) {
            let left = 0
            let right = left + 1
            while (right < k) {
                const isNotValid = numList[left] >= numList[right] || numList[left] + 1 < numList[right]
                if (isNotValid) return false
                left++
                right++
            }
            return true
        }

        const len = nums.length
        // [left, right] -> 左闭右闭区间
        let left = 0
        let right = left + k - 1
        console.log(left, right)

        while (right < len) {
            const curNums = nums.slice(left, right + 1)
            if (checkNums(curNums)) {
                result.push(curNums[k - 1])
            } else {
                result.push(-1)
            }
            left++
            right++
        }

        return result
    }

    /** 双层遍历 */
    function cross() {
        const len = nums.length
        const result = new Array(len - k + 1).fill(-1)

        for (let i = 0; i <= len - k; i++) {
            let valid = true
            for (let j = i + 1; j < i + k; j++) {
                if (nums[j] - nums[j - 1] !== 1) {
                    valid = false
                    break
                }
            }
            if (valid) {
                result[i] = nums[i + k - 1]
            }
        }
        return result
    }

    /** 统计升序个数 */
    function countNum() {
        const n = nums.length
        let cnt = 0
        const ans = new Array(n - k + 1).fill(-1)
        for (let i = 0; i < n; i++) {
            cnt = i === 0 || nums[i] - nums[i - 1] !== 1 ? 1 : cnt + 1
            if (cnt >= k) {
                ans[i - k + 1] = nums[i]
            }
        }
        return ans
    }

    return twoPoint(nums, k)
}

console.log(resultsArray([1, 2, 3, 4, 3, 2, 5], 3))
