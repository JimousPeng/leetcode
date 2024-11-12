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

/**
 * 3258. 统计满足 K 约束的子字符串数量 I
 * @param {string} s 1 <= s.length <= 50
 * @param {number} k 1 <= k <= s.length
 * @return {number}
 */
var countKConstraintSubstrings = function (s, k) {
    /**
     * 给你一个 二进制 字符串 s 和一个整数 k
     * 如果一个 二进制字符串 满足以下任一条件，则认为该字符串满足 k 约束：
     * 1. 字符串中 0 的数量最多为 k
     * 2. 字符串中 1 的数量最多为 k
     * 返回一个整数，表示 s 的所有满足 k 约束 的 子字符串 的数量
     *
     * 输入：s = "10101", k = 1 输出：12
     * s 的所有子字符串中，除了 "1010"、"10101" 和 "0101" 外，其余子字符串都满足 k 约束
     *
     * 输入：s = "1010101", k = 2 输出：25
     * s 的所有子字符串中，除了长度大于 5 的子字符串外，其余子字符串都满足 k 约束。
     */

    const len = s.length
    let count = 0
    for (let left = 0; left < len; left++) {
        count++
        // 计算子串
        let zeroCount = Number(s[left] === '0')
        let oneCount = Number(s[left] === '1')
        for (let right = left + 1; right < len; right++) {
            zeroCount += Number(s[right] === '0')
            oneCount += Number(s[right] === '1')
            if (zeroCount > k && oneCount > k) break
            count++
        }
    }
    return count
}
