/**
 * 747. 至少是其他数字两倍的最大数
 * @param {number[]} nums 2 <= nums.length <= 50
 * @return {number}  0 <= nums[i] <= 100  nums 中的最大元素是唯一的
 */
var dominantIndex = function (nums) {
    // 给你一个整数数组 nums ，其中总是存在 唯一的 一个最大整数
    // 请你找出数组中的最大元素并检查它是否 至少是数组中每个其他数字的两倍
    // 如果是，则返回 最大元素的下标 ，否则返回 -1
    // 	示例 1：
    // 输入：nums = [3,6,1,0]
    // 输出：1
    // 解释：6 是最大的整数，对于数组中的其他整数，6 至少是数组中其他元素的两倍。6 的下标是 1 ，所以返回 1 。
    // 示例 2：
    // 输入：nums = [1,2,3,4]
    // 输出：-1
    // 解释：4 没有超过 3 的两倍大，所以返回 -1 。

    // 要返回的是下标，不是值
    function cross() {
        nums.sort((a, b) => a - b)
        const len = nums.length
        return nums[len - 1] >= nums[len - 2] * 2 ? nums[len - 1] : -1
    }

    function cross() {
        const len = nums.length
        // dp[0]第二大的数  dp[1]最大的数, 存的是下标
        const dp = [-1, 0]
        for (let i = 1; i < len; i++) {
            const num = nums[i]
            // nums 中的最大元素是唯一的,所以不用纠结是否判断 =
            if (num > nums[dp[1]]) {
                dp[0] = dp[1]
                dp[1] = i
            } else {
                if (dp[0] === -1) {
                    dp[0] = i
                } else if (num > nums[dp[0]]) {
                    dp[0] = i
                }
            }
        }
        return nums[dp[1]] >= nums[dp[0]] * 2 ? dp[1] : -1
    }
}

/**
 * 748. 最短补全词
 * @param {string} licensePlate  1 <= licensePlate.length <= 7 由数字、大小写字母或空格 ' ' 组成
 * @param {string[]} words words[i] 由小写英文字母组成 1 <= words[i].length <= 15
 * @return {string} 1 <= words.length <= 1000
 */
var shortestCompletingWord = function (licensePlate, words) {
    //     给你一个字符串 licensePlate 和一个字符串数组 words ，请你找出 words 中的 最短补全词 。
    // 补全词 是一个包含 licensePlate 中所有字母的单词。忽略 licensePlate 中的 数字和空格 。不区分大小写。如果某个字母在 licensePlate 中出现不止一次，那么该字母在补全词中的出现次数应当一致或者更多。
    // 例如：licensePlate = "aBc 12c"，那么它的补全词应当包含字母 'a'、'b' （忽略大写）和两个 'c' 。可能的 补全词 有 "abccdef"、"caaacab" 以及 "cbca" 。
    // 请返回 words 中的 最短补全词 。题目数据保证一定存在一个最短补全词。当有多个单词都符合最短补全词的匹配条件时取 words 中 第一个 出现的那个。
    //     示例 1：
    // 输入：licensePlate = "1s3 PSt", words = ["step", "steps", "stripe", "stepple"]
    // 输出："steps"
    // 解释：最短补全词应该包括 "s"、"p"、"s"（忽略大小写） 以及 "t"。
    // "step" 包含 "t"、"p"，但只包含一个 "s"，所以它不符合条件。
    // "steps" 包含 "t"、"p" 和两个 "s"。
    // "stripe" 缺一个 "s"。
    // "stepple" 缺一个 "s"。
    // 因此，"steps" 是唯一一个包含所有字母的单词，也是本例的答案。
    // 示例 2：
    // 输入：licensePlate = "1s3 456", words = ["looks", "pest", "stew", "show"]
    // 输出："pest"
    // 解释：licensePlate 只包含字母 "s" 。所有的单词都包含字母 "s" ，其中 "pest"、"stew"、和 "show" 三者最短。答案是 "pest" ，因为它是三个单词中在 words 里最靠前的那个。

    function countSum() {
        const cnt = new Array(26).fill(0)
        for (const ch of licensePlate) {
            if (/^[a-zA-Z]+$/.test(ch)) {
                ++cnt[ch.toLowerCase().charCodeAt() - 'a'.charCodeAt()]
            }
        }
        let idx = -1
        for (let i = 0; i < words.length; ++i) {
            const c = Array(26).fill(0)
            for (let j = 0; j < words[i].length; ++j) {
                const ch = words[i][j]
                ++c[ch.charCodeAt() - 'a'.charCodeAt()]
            }
            let ok = true
            for (let j = 0; j < 26; ++j) {
                if (c[j] < cnt[j]) {
                    ok = false
                    break
                }
            }
            if (ok && (idx < 0 || words[i].length < words[idx].length)) {
                idx = i
            }
        }
        return words[idx]
    }

    /** hash表 忽略 licensePlate 中的 数字和空格 。不区分大小写 */
    function cross() {
        // 先处理原始字符串
        let str = licensePlate.toLowerCase()
        const pureStr = str.replace(/[0-9]|\s/g, '') // 去掉数字，空格
        const len = pureStr.length
        const strMap = new Map()
        for (let i = 0; i < len; i++) {
            if (strMap.has(pureStr[i])) {
                strMap.set(pureStr[i], strMap.get(pureStr[i]) + 1)
            } else {
                strMap.set(pureStr[i], 1)
            }
        }
        // 匹配单词 - 考虑到结果可能会有多个时返回最靠前的，所以结果存入数组中
        let res = undefined
        function compareStr(str) {
            const len = str.length
            const tempMap = new Map()
            for (let i = 0; i < len; i++) {
                if (tempMap.has(str[i])) {
                    tempMap.set(str[i], tempMap.get(str[i]) + 1)
                } else {
                    tempMap.set(str[i], 1)
                }
            }
            // diff
            for (const [key, value] of strMap.entries()) {
                if (value > tempMap.get(key) || !tempMap.has(key)) {
                    return false
                }
            }
            return true
        }
        for (const word of words) {
            // 长度处理下
            if (word.length >= len) {
                if (compareStr(word)) {
                    if (res === undefined || word.length < res.length) {
                        res = word
                    }
                }
            }
        }
        return res
    }
    cross()
}

// shortestCompletingWord('1s3 PSt', ['step', 'steps', 'stripe', 'stepple'])

shortestCompletingWord('GrC8950', ['measure', 'other', 'every', 'base', 'according', 'level', 'meeting', 'none', 'marriage', 'rest'])

/**
 * 762. 二进制表示中质数个计算置位
 * @param {number} left 1 <= left <= right <= 10^6  0 <= right - left <= 10^4
 * @param {number} right
 * @return {number}
 */
var countPrimeSetBits = function (left, right) {
    // 给你两个整数 left 和 right ，在闭区间 [left, right] 范围内，统计并返回 计算置位位数为质数 的整数个数
    // 计算置位位数 就是二进制表示中 1 的个数
    //     示例 1：
    // 输入：left = 6, right = 10
    // 输出：4
    // 解释：
    // 6 -> 110 (2 个计算置位，2 是质数)
    // 7 -> 111 (3 个计算置位，3 是质数)
    // 9 -> 1001 (2 个计算置位，2 是质数)
    // 10-> 1010 (2 个计算置位，2 是质数)
    // 共计 4 个计算置位为质数的数字。
    // 示例 2：
    // 输入：left = 10, right = 15
    // 输出：5
    // 解释：
    // 10 -> 1010 (2 个计算置位, 2 是质数)
    // 11 -> 1011 (3 个计算置位, 3 是质数)
    // 12 -> 1100 (2 个计算置位, 2 是质数)
    // 13 -> 1101 (3 个计算置位, 3 是质数)
    // 14 -> 1110 (3 个计算置位, 3 是质数)
    // 15 -> 1111 (4 个计算置位, 4 不是质数)
    // 共计 5 个计算置位为质数的数字。

    /** 置位位数为质数 的整数个数 质数：只能被1和其本身整数的数
     * 质数是指在大于1的自然数中，除了1和它本身以外不再有其他因数的自然数
     *
     * 质数定义：一个大于1的整数，除了1和它本身，没有其他的正因数
     * 检查数 n 是否为质数的一种高效方法是只检查到 √n
     * 因为如果 n 能被某个数 a 整除，那么 n = a * b，其中 a 和 b 必然至少有一个小于或等于 √n
     *
     */
    function cross() {
        function isPrime(n) {
            // 偶数绝对不是质数
            if (n <= 1) return false // 质数必须大于1
            if (n <= 3) return true // 2和3是质数

            // 2和3的倍数一定是非质数
            if (n % 2 === 0 || n % 3 === 0) return false

            // 由于已经排除了2和3的倍数，检查的步长为6; ：即 i 和 i+2，分别为 6 的倍数的两个相邻数
            //i 为 6的倍数-1； i+2为6的倍数+1
            // 当i = 5； 只需要考虑 5 和 7； 6,8,9,10 不是2的倍数就是3的倍数
            for (let i = 5; i <= Math.sqrt(n); i += 6) {
                if (n % i === 0 || n % (i + 2) === 0) return false
            }
            return true
        }
        function countOne(str) {
            let count = 0
            for (let i = 0; i < str.length; i++) {
                if (str[i] === '1') {
                    count++
                }
            }
            return count
        }
        let res = 0
        for (let i = left; i <= right; i++) {
            const str = i.toString(2)
            // 计算 当前数的计算置位
            const num = countOne(str)
            res += Number(isPrime(num))
        }
        return res
    }

    cross()
}

/**
 * 766. 托普利茨矩阵
 * @param {number[][]} matrix  m == matrix.length  n == matrix[i].length
 * @return {boolean}           1 <= m, n <= 20   0 <= matrix[i][j] <= 99
 */
var isToeplitzMatrix = function (matrix) {
    /**
     * 给你一个 m x n 的矩阵 matrix 。如果这个矩阵是托普利茨矩阵，返回 true ；否则，返回 false
     * 如果矩阵上每一条由左上到右下的对角线上的元素都相同，那么这个矩阵是 托普利茨矩阵
     *
     * 输入：matrix = [[1,2,3,4],[5,1,2,3],[9,5,1,2]] 输出：true
     * 1 2 3 4
     * 5 1 2 3
     * 9 5 1 2
     * 解释： 在上述矩阵中, 其对角线为: "[9]", "[5, 5]", "[1, 1, 1]", "[2, 2, 2]", "[3, 3]", "[4]"。 各条对角线上的所有元素均相同, 因此答案是 True
     *
     * 输入：matrix = [[1,2],[2,2]] 输出：false
     * 1 2
     * 2 2
     * 解释： 对角线 "[1, 2]" 上的元素不同。
     *
     * 进阶：
     * 如果矩阵存储在磁盘上，并且内存有限，以至于一次最多只能将矩阵的一行加载到内存中，该怎么办？
     * 如果矩阵太大，以至于一次只能将不完整的一行加载到内存中，该怎么办？
     */

    /**
     * 托普利茨矩阵 - 矩阵上每一条由左上到右下的对角线上的元素都相同
     * matrix[i][j] === matrix[i+1][j+1]
     */
    function cross() {
        const rowLen = matrix.length
        const colLen = matrix[0].length
        function checkConfines(row, col) {
            if (row < 0 || row > rowLen - 1) return false
            if (col < 0 || col > colLen - 1) return false
            return true
        }
        // check 处理左上，matrix[0]
        let row = 0,
            col = 0
        for (let i = 0; i < colLen; i++) {
            col = i
            row = 0
            let diffNum = matrix[row][col]
            while (checkConfines(row, col)) {
                if (matrix[row][col] !== diffNum) return false
                row++
                col++
            }
        }
        row = 0
        col = 0
        for (let r = 0; r < rowLen; r++) {
            row = r
            col = 0
            let diffNum = matrix[row][col]
            while (checkConfines(row, col)) {
                if (matrix[row][col] !== diffNum) return false
                row++
                col++
            }
        }
        return true
    }

    /**
     * 1 2 3 4
     * 5 1 2 3
     * 9 5 1 2
     *
     * 遍历优化
     */
    function crossOptimize() {
        const rowLen = matrix.length
        const colLen = matrix[0].length
        for (let r = 1; r < rowLen; r++) {
            for (let c = 1; c < colLen; c++) {
                if (matrix[r][c] !== matrix[r - 1][c - 1]) return flase
            }
        }
        return true
    }
}

/**
 * 771. 宝石与石头
 * @param {string} jewels 1 <= jewels.length, stones.length <= 50
 * @param {string} stones
 * @return {number}
 */
var numJewelsInStones = function (jewels, stones) {
    /**
     * 给你一个字符串 jewels 代表石头中宝石的类型
     * 另有一个字符串 stones 代表你拥有的石头。 
     * stones 中每个字符代表了一种你拥有的石头的类型，你想知道你拥有的石头中有多少是宝石。
     * 字母区分大小写，因此 "a" 和 "A" 是不同类型的石头
示例 1：
输入：jewels = "aA", stones = "aAAbbbb"
输出：3
示例 2：
输入：jewels = "z", stones = "ZZ"
输出：0
     */
    let res = 0
    const jewelsSet = new Set()
    const jewelsLen = jewels.length
    const stonesLen = stones.length
    for (let i = 0; i < jewelsLen; i++) {
        jewelsSet.add(jewels[i])
    }
    for (let i = 0; i < stonesLen; i++) {
        if (jewelsSet.has(stones[i])) {
            res++
        }
    }
    return res
}
