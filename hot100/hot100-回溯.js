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

    /** 思路 - 递归思路
     *   (    )
     *  ( )
     * ( )
     */
    function useDfs() {
        let result = []

        function dfs(left, right, res) {
            if (left === 0 && right === 0) {
                // 括号消耗干净
                result.push(res)
                return
            }
            if (left === right) {
                // 只能以左括号起手
                dfs(left - 1, right, res + '(')
            } else {
                // 既可以用左括号，也可以用右括号
                if (left > 0) {
                    dfs(left - 1, right, res + '(')
                }
                dfs(left, right - 1, res + ')')
            }
        }
        dfs(n, n, '')

        return result
    }

    /**
     *  left: ( ( (     right: ) ) )
     *
     *        (
     *    (      )
     *   (  )
     *  (
     *
     *
     *  )
     */
    function useBackTrack() {
        let result = []

        function backTracking(res, open, close) {
            if (res.length === n * 2) {
                result.push(res.join(''))
                return
            }
            if (open < n) {
                res.push('(')
                backTracking(res, open + 1, close)
                res.pop()
            }
            if (close < open) {
                res.push(')')
                backTracking(res, open, close + 1)
                res.pop()
            }
        }

        backTracking([], 0, 0)

        return result
    }
}

/**
 * 131. 分割回文串
 * @param {string} s  1 <= s.length <= 16
 * @return {string[][]}
 */
var partition = function (s) {
    // 给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是 回文串 。返回 s 所有可能的分割方案

    /**
     * 输入：s = "aab" 输出：[["a","a","b"],["aa","b"]]
     *    a       aa   aab
     *  a  ab    b
     * b
     */
    function useBackTrack(s) {
        const result = []
        const strList = s.split('') // 'aab' -> ['a', 'a', 'b']

        // 判断是否是回文串
        function checkStr(str) {
            let left = 0,
                right = str.length - 1
            while (left < right) {
                if (str[left] !== str[right]) return false
                left++
                right--
            }
            return true
        }

        let len = s.length
        function backTracking(startIndex, res) {
            if (startIndex === len) {
                result.push([...res])
                return
            }
            for (let i = startIndex; i < len; i++) {
                const str = strList.slice(startIndex, i + 1)
                if (!checkStr(str)) continue
                res.push(str.join(''))
                // 这里回溯处于递归深度
                backTracking(i + 1, res)
                res.pop()
            }
        }

        backTracking([], 0)
        return result
    }
}

/**
 * 79. 单词搜索
 * @param {character[][]} board
 * @param {string} word  1 <= word.length <= 15
 * @return {boolean}
 */
var exist = function (board, word) {
    /**
     * 给定一个 m x n 二维字符网格 board 和一个字符串单词 word
     * 如果 word 存在于网格中，返回 true ；否则，返回 false
     * 单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用
     *
     * 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"  输出：true
     * A B C E
     * S F C S
     * A D E E
     *
     * 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE" 输出：true
     * A B C E
     * S F C S
     * A D E E
     */

    // 难道要先暴力遍历出所有的结果？
    function useBackTrack() {
        const rowLen = board.length
        const colLen = board[0].length

        for (let r = 0; r < rowLen; r++) {
            for (let c = 0; c < colLen; c++) {
                if (board[r][c] === word[0]) {
                    // 先处理首字母
                }
            }
        }

        let flag
        function backTracking(startIndex, r, c, res) {
            if (flag) return
            if (r > rowLen || c > colLen) {
                if (res.join('') === word) {
                    flag = true
                }
                return
            }
            if (res.length > word) return // 根据长度剪枝
            const strList = board[startIndex]
        }
        backTracking(0, 0, 0, [])
    }
}
