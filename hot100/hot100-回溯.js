/** 回溯算法 */

/**
 * 46. 全排列
 * @param {number[]} nums  1 <= nums.length <= 6
 * @return {number[][]}
 */
var permute = function (nums) {
    // 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案
    //   输入：nums = [1,2,3] 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

    function backTrack() {
        const len = nums.length
        const result = []

        function trackingBack(res = []) {
            if (res.length === nums.length) {
                result.push(res)
                return
            }
            for (let i = 0; i < len; i++) {
                const num = nums[i]
                if (res.includes(num)) continue
                trackingBack([...res, num])
            }
        }

        trackingBack()

        return result
    }

    // 回溯优化
    function backTrack() {
        const len = nums.length
        const result = []

        function trackingBack(res = []) {
            if (res.length === nums.length) {
                result.push(res)
                return
            }
            for (let i = 0; i < len; i++) {
                const num = nums[i]
                if (res.includes(num)) continue
                res.push(num)
                trackingBack(res)
                res.pop()
            }
        }

        trackingBack()

        return result
    }
}

/**
 * 78. 子集
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
    /**
     * 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的 子集 （幂集）
     * 解集 不能 包含重复的子集。你可以按 任意顺序 返回解集
     *
     * 输入：nums = [1,2,3] 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
     *
     *   1      2    3
     *  2 3     3
     * 3
     */

    // 回溯解决
    function useTrack() {
        const len = nums.length

        const result = []

        function backTracking(start, res) {
            if (start === len) return
            for (let i = start; i < len; i++) {
                const num = nums[i]
                res.push(num)
                result.push([...res])
                backTracking(i + 1, res)
                res.pop()
            }
        }

        backTracking(0, [])

        result.push([])

        return result
    }
}

/**
 * 17. 电话号码的字母组合
 * @param {string} digits 0 <= digits.length <= 4  digits[i] 是范围 ['2', '9'] 的一个数字
 * @return {string[]}
 */
var letterCombinations = function (digits) {
    /**
     * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回
     * 2: abc 3:def 4 ghi
     * 5: jkl 6:mno 7:pqrs
     * 8: tuv 9:wxyz
     */

    function useBackTrack() {
        if (!digits) return []
        /**
         * 输入：digits = "23" 输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
         * 有一个规律是，输入几位数，组合也需要是几位数，对应的就是常见的组合总和问题中的 k
         *
         * 假设输入'234'
         *        a        b     c
         *   e    d    f     e d f
         * g h i
         */
        const numMap = {
            2: ['a', 'b', 'c'],
            3: ['d', 'e', 'f'],
            4: ['g', 'h', 'i'],
            5: ['j', 'k', 'l'],
            6: ['m', 'n', 'o'],
            7: ['p', 'q', 'r', 's'],
            8: ['t', 'u', 'v'],
            9: ['w', 'x', 'y', 'z'],
        }
        if (digits.length === 1) return numMap[digits]

        const result = []
        const pathRes = []
        const len = digits.length
        // 因为返回长度 = len，所以startIndex是用来限制组合的开始下标的
        function backTracking(numIndex) {
            if (numIndex > len - 1) return
            if (pathRes.length === len) {
                // 满足组合
                result.push(pathRes.join(''))
            }
            const num = digits[numIndex]
            const strList = numMap[num]
            const strLen = strList.length
            for (let i = 0; i < strLen; i++) {
                pathRes.push(strList[i])
                backTracking(numIndex + 1)
                pathRes.pop()
            }
        }
        backTracking(0)

        return result
    }
}

/**
 * 22. 括号生成
 * @param {number} n  1 <= n <= 8
 * @return {string[]}
 */
var generateParenthesis = function (n) {
    /**
     * 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合
     */

    function useBackTrack() {
        
    }
}
