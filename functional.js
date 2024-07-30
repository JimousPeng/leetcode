/** 功能性题目，以解决问题为出发点 */

/** 47. 全排列 II
 * 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列
 * 输入：nums = [1,1,2]
 * 输出：[[1,1,2],[1,2,1],[2,1,1]]
 *
 * 输入：nums = [1,2,3]
 * 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 * @param {number[]} nums  1 <= nums.length <= 8    -10 <= nums[i] <= 10
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
    const numLen = nums.length
    const res = []
    function trackingBack(path) {
        if (path.length === nums.length) {
            res.push(path)
            return
        }
        for (let i = 0; i < numLen; i++) {
            if (path.includes(nums[i])) {
            }
            trackingBack([...path, nums[i]], i)
        }
    }

    trackingBack([])
    console.error('---------- aiden --------------', res)
}

/** 287. 寻找重复数
 * 给定一个包含 n + 1 个整数的数组 nums
 * 其数字都在 [1, n] 范围内（包括 1 和 n），可知至少存在一个重复的整数。
 * 假设 nums 只有 一个重复的整数 ，返回 这个重复的数
 * 你设计的解决方案必须 不修改 数组 nums 且只用常量级 O(1) 的额外空间
 *
 * 输入：nums = [1,3,4,2,2] 输出：2
 * 输入：nums = [3,1,3,4,2] 输出：3
 * 输入：nums = [3,3,3,3,3] 输出：3
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
    // 快慢指针
    let slow = 0,
        fast = 0
    do {
        slow = nums[slow]
        fast = nums[nums[fast]]
    } while (slow != fast)
    slow = 0
    while (slow != fast) {
        slow = nums[slow]
        fast = nums[fast]
    }
    return slow

    // 1. 不修改数组
    // 2. 存在至少一个重复的整数 >= 1
    // 3. 常量级O(1)的空间复杂度

    // 空间复杂度应该不是0(1)
    // const len = nums.length
    // if (len <= 2) return nums[0]
    // const hasMap = {}
    // for (let i = 0; i < len; i++) {
    //     if (hasMap[nums[i]]) return nums[i]
    //     hasMap[nums[i]] = true
    // }

    // const len = nums.length
    // 题目要求：必须 不修改 数组 nums
    // nums.sort((a, b) => a - b)
    // for (let i = 0; i < len - 1; i++) {
    //     if (nums[i] === nums[i + 1]) {
    //         return nums[i]
    //     }
    // }
}
/** 128. 最长连续序列
 * 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度
 *
 * 请你设计并实现时间复杂度为 O(n) 的算法解决此问题
 *
 * 输入：nums = [100,4,200,1,3,2]  输出：4 解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
 *
 * 输入：nums = [0,3,7,2,5,8,4,6,0,1]  输出：9
 * @param {number[]} nums  0 <= nums.length <= 10^5
 * @return {number}  -10^9 <= nums[i] <= 10^9  *存在负数
 */
var longestConsecutive = function (nums) {
    // 如果是有序的那么一次遍历就很方便，无序数组，如何在时间复杂度O(n)的前提下实现呢
    const len = nums.length
    if (len <= 1) return len

    // 定义一个保存当前遍历数的hash表
    const nearByMap = {}
    for (let i = 0; i < len; i++) {
        const num = nums[i]
        // 先处理hash表状态 - item[0]:是否存在前序节点  item[1]: 当前节点是否存在  item[2:]: 是否存在后续节点
        if (nearByMap[num]) {
            nearByMap[num][1] = 1
        } else {
            nearByMap[num] = [0, 1, 0]
        }

        if (nearByMap[num - 1]) {
            nearByMap[num - 1][2] = 1 // num-1的后置节点更新
        } else {
            nearByMap[num - 1] = [0, 0, 1]
        }

        if (nearByMap[num + 1]) {
            nearByMap[num + 1][0] = 1 // num+1的前置节点更新
        } else {
            nearByMap[num + 1] = [1, 0, 0]
        }
    }

    // 遍历hash表找出最大序列长度
    let res = 1
    const crossMap = {} // 空间换时间：遍历过的序列，就不重复遍历了
    const numList = Object.keys(nearByMap)
    const numLen = numList.length
    for (let i = 0; i < numLen; i++) {
        // 这里不转换成Num，在处理负数的时候会有问题，'-1'+1 = '-11'，在处理 nextNum 的时候，会出问题
        const num = Number(numList[i])

        if (!nearByMap[num][1]) continue // 当前数不存在nums数组中，跳过
        if (crossMap[num]) continue // 遍历过的数跳过

        let lastNum = num - 1,
            nextNum = num + 1,
            countNum = 1
        while (nearByMap[lastNum] && nearByMap[lastNum][1]) {
            countNum++
            if (!nearByMap[lastNum][0]) break
            crossMap[lastNum] = true
            lastNum--
        }
        while (nearByMap[nextNum] && nearByMap[nextNum][1]) {
            countNum++
            if (!nearByMap[nextNum][2]) break
            crossMap[nextNum] = true
            nextNum++
        }
        res = Math.max(res, countNum)
        crossMap[num] = true
    }

    return res
}

/** 703. 数据流中的第 K 大元素
输入：
["KthLargest", "add", "add", "add", "add", "add"]
[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
输出：
[null, 4, 5, 5, 8, 8]

解释：
KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
kthLargest.add(3);   // return 4
kthLargest.add(5);   // return 5
kthLargest.add(10);  // return 5
kthLargest.add(9);   // return 8
kthLargest.add(4);   // return 8
/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function (k, nums) {
    this.sortMax = k
    nums.sort((a, b) => b - a) // 倒叙
    this.sortList = nums.slice(0, k + 1)
}

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
    this.sortList.push(val)
    this.sortList.sort((a, b) => b - a)
    this.sortList = this.sortList.slice(0, k + 1)
    return this.sortList[k - 1]
}

/** 697. 数组的度
 * 给定一个非空且只包含非负数的整数数组 nums
 *
 * 数组的 度 的定义是指数组里任一元素出现频数的最大值
 *
 * 你的任务是在 nums 中找到与 nums 拥有相同大小的度的最短连续子数组，返回其长度
 *
 * 输入：nums = [1,2,2,3,1]  输出：2
 * 解释：输入数组的度是 2 ，因为元素 1 和 2 的出现频数最大，均为 2 ,
 * 连续子数组里面拥有相同度的有如下所示：
 * [1, 2, 2, 3, 1], [1, 2, 2, 3], [2, 2, 3, 1], [1, 2, 2], [2, 2, 3], [2, 2]
 * 最短连续子数组 [2, 2] 的长度为 2 ，所以返回 2 。
 *
 * 输入：nums = [1,2,2,3,1,4,2] 输出：6
 * 解释： 数组的度是 3 ，因为元素 2 重复出现 3 次。 所以 [2,2,3,1,4,2] 是最短子数组，因此返回 6 。
 * @param {number[]} nums  nums.length 在 1 到 50,000 范围内
 * @return {number}  nums[i] 是一个在 0 到 49,999 范围内的整数
 */
var findShortestSubArray = function (nums) {
    if (nums.length === 1) return 1

    // 先找到度

    const len = nums.length
    const countMap = {}
    for (let i = 0; i < len; i++) {
        const num = nums[i]
        if (countMap[num] === undefined) {
            // countMap[num][0] - 统计频率  countMap[num][1] - 起始下标  countMap[num][2] - 终点下标
            countMap[num] = [1, i, i]
        } else {
            countMap[num][0]++
            countMap[num][2] = i
        }
    }

    // useCount[0] 出现的最大频率， useCount[1] 出现的频率对应的数的长度
    const useCount = [-1, Infinity]

    Object.keys(countMap).forEach((key) => {
        const countArr = countMap[key]
        const dif = countArr[2] - countArr[1] + 1
        if (countArr[0] > useCount[0] || (countArr[0] === useCount[0] && dif < useCount[1])) {
            useCount[0] = countArr[0]
            useCount[1] = dif
        }
    })

    return useCount[1]
}

/** 696. 计数二进制子串
 * 给定一个字符串 s，统计并返回具有相同数量 0 和 1 的非空（连续）子字符串的数量
 * 并且这些子字符串中的所有 0 和所有 1 都是成组连续的
 * 重复出现（不同位置）的子串也要统计它们出现的次数
 *
 * 输入：s = "00110011"  输出：6
 * 解释：6 个子串满足具有相同数量的连续 1 和 0 ："0011"、"01"、"1100"、"10"、"0011" 和 "01" 。
 * 注意，一些重复出现的子串（不同位置）要统计它们出现的次数。
 * 另外，"00110011" 不是有效的子串，因为所有的 0（还有 1 ）没有组合在一起。
 *
 * 输入：s = "10101"  输出：4
 * 解释：有 4 个子串："10"、"01"、"10"、"01" ，具有相同数量的连续 1 和 0 。
 * @param {string} s  1 <= s.length <= 10^5
 * @return {number}
 */
var countBinarySubstrings = function (s) {
    // 0 和 1 不能交替出现，在一个子串中只能是连续的0和连续的1，且0和1的数量相同

    const len = s.length
    let res = 0
    // count[0]表示上一个数的个数， count[1]表示当前数的个数
    let count = [0, 1]
    let left = 1
    while (left < len) {
        if (s[left] === s[left - 1]) {
            count[1]++
        } else {
            const useCount = Math.min(count[0], count[1])
            res += useCount
            count[0] = count[1]
            count[1] = 1
        }
        left++
    }
    const useCount = Math.min(count[0], count[1])
    res += useCount
    return res

    // 利用消消乐的模式， 遇到 0 = -1， 遇到 1 ++  ；  会超时
    // const len = s.length
    // let res = 0
    // for (let i = 0; i < len - 1; i++) {
    //     let curStr = s[i]
    //     let right = i + 1
    //     let count = Number(curStr) || -1
    //     while (s[right] === curStr) {
    //         const rightStr = Number(s[right]) || -1
    //         count += rightStr
    //         right++
    //     }
    // 00001111
    //     // "00110011"  => 6
    //     // 000111000 => 6 要注意 0011 和 1100
    //     while (s[right] && s[right] !== curStr) {
    //         let rightStr = Number(s[right]) || -1
    //         count += rightStr
    //         if (count === 0) {
    //             res++
    //         }
    //         right++
    //     }
    // }
    // return res
}

/**
 * 693. 交替位二进制数
 * 给定一个正整数，检查它的二进制表示是否总是 0、1 交替出现
 * 换句话说，就是二进制表示中相邻两位的数字永不相同。
 * @param {number} n
 * @return {boolean}
 */
var hasAlternatingBits = function (n) {
    const binaryStr = n.toString(2)
    const len = binaryStr.length
    let left = 0,
        right = 1
    while (right < len) {
        if (binaryStr[left] === binaryStr[right]) return false
        left++
        right++
    }
    return true
}

/** 682. 棒球比赛
 * 你会得到一个记录操作的字符串列表 ops
 * 其中 ops[i] 是你需要记录的第 i 项操作，ops 遵循下述规则:
整数 x - 表示本回合新获得分数 x
"+" - 表示本回合新获得的得分是前两次得分的总和。题目数据保证记录此操作时前面总是存在两个有效的分数。
"D" - 表示本回合新获得的得分是前一次得分的两倍。题目数据保证记录此操作时前面总是存在一个有效的分数。
"C" - 表示前一次得分无效，将其从记录中移除。题目数据保证记录此操作时前面总是存在一个有效的分数。
请你返回记录中所有得分的总和。
 * 输入：ops = ["5","2","C","D","+"] 输出：30
"5" - 记录加 5 ，记录现在是 [5]
"2" - 记录加 2 ，记录现在是 [5, 2]
"C" - 使前一次得分的记录无效并将其移除，记录现在是 [5].
"D" - 记录加 2 * 5 = 10 ，记录现在是 [5, 10].
"+" - 记录加 5 + 10 = 15 ，记录现在是 [5, 10, 15].
所有得分的总和 5 + 10 + 15 = 30
 * @param {string[]} operations
 * @return {number}
 */
var calPoints = function (operations) {
    const len = operations.length
    const initScore = Number(operations[0])
    if (len === 1) return initScore
    // 记录分数： count[0] 倒数第3次  count[1] 倒数第2次  count[3]最近一次
    let scoreCount = initScore
    const scoreList = [initScore]
    for (let i = 1; i < len; i++) {
        const scoreStr = operations[i]
        const scoreLen = scoreList.length
        if (scoreStr === 'C') {
            // 表示前一次得分无效，将其从记录中移除
            scoreCount -= scoreList[scoreLen - 1]
            scoreList.splice(scoreLen - 1, 1)
        } else if (scoreStr == 'D') {
            // // 本回合新获得的得分是前一次得分的两倍
            let score = scoreList[scoreLen - 1] * 2
            scoreCount += score
            scoreList.push(score)
        } else if (scoreStr === '+') {
            // 本回合新获得的得分是前两次得分的总和
            let score = scoreList[scoreLen - 1] + scoreList[scoreLen - 2]
            scoreList.push(score)
            scoreCount += score
        } else {
            // 更新得分
            let score = Number(scoreStr)
            scoreList.push(score)
            scoreCount += score
        }
    }
    return scoreCount
}

/**
 * 680. 验证回文串 II
 * 给你一个字符串 s，最多 可以从中删除一个字符。
 * 请你判断 s 是否能成为回文字符串：如果能，返回 true ；否则，返回 false
 *
 * 输入：s = "aba"  输出：true
 * 输入：s = "abca" 输出：true  解释：你可以删除字符 'c' 。
 * 输入：s = "abc"  输出：false
 *
 * @param {string} s  1 <= s.length <= 10^5
 * @return {boolean}
 */
var validPalindrome = function (s) {
    const len = s.length
    let left = 0,
        right = len - 1

    function isPalindrome(str) {
        const len = str.length
        let left = 0,
            right = len - 1
        while (left <= right) {
            if (str[left] !== str[right]) {
                return false
            }
            left++
            right--
        }
        return true
    }

    // abca
    while (left <= right) {
        if (s[left] === s[right]) {
            left++
            right--
        } else {
            const leftStr = s.slice(left, right)
            const rightStr = s.slice(left + 1, right + 1)
            return isPalindrome(leftStr) || isPalindrome(rightStr)
        }
    }
    return true
}

/**
 * 674. 最长连续递增序列
 * 给定一个未经排序的整数数组，找到最长且 连续递增的子序列，并返回该序列的长度。
 * 输入：nums = [1,3,5,4,7]  输出：3  解释：最长连续递增序列是 [1,3,5], 长度为3。
 * 尽管 [1,3,5,7] 也是升序的子序列, 但它不是连续的，因为 5 和 7 在原数组里被 4 隔开
 *
 * 输入：nums = [2,2,2,2,2]  输出：1  解释：最长连续递增序列是 [2], 长度为1。
 * @param {number[]} nums  1 <= nums.length <= 10^4
 * @return {number}
 */
var findLengthOfLCIS = function (nums) {
    // 连续，最长

    const len = nums.length
    let max = 1,
        count = 1

    for (let i = 1; i < len; i++) {
        if (nums[i] > nums[i - 1]) {
            count++
        } else {
            count = 1
            max = Math.max(max, count)
        }
    }
    // 有可能最后一项也是递增的一部分,那么在循环中就走不到else分支，所以最后要比较一下； eg: [1,3,5,4,7]
    return Math.max(max, count)
    // return max
}

/** 661. 图片平滑器
 * 
m == img.length
n == img[i].length
1 <= m, n <= 200
0 <= img[i][j] <= 255
 * 
 * [[1,1,1],[1,0,1],[1,1,1]]
 * 
 * @param {number[][]} img
 * @return {number[][]}
 */
var imageSmoother = function (img) {
    // 二维数组, 以下思路是对的，就是会超时
    const columnLen = img.length
    const rowLen = img[0].length
    /** 一定要用个新数组存起来，不然后面的数计算平均值，会被影响 */
    const res = []

    function sumColumn(row, useRow) {
        // count[0] = 总数  count[1] = 有效格子数
        if (!useRow) return [0, 0]
        let count = [0, 0]
        count[0] = useRow[row]
        count[1] = 1
        if (row - 1 >= 0) {
            count[0] += useRow[row - 1]
            count[1]++
        }
        if (row + 1 < rowLen) {
            count[0] += useRow[row + 1]
            count[1]++
        }
        return count
    }

    for (let i = 0; i < columnLen; i++) {
        res[i] = []
        for (let j = 0; j < rowLen; j++) {
            const curRow = img[i]
            const lastRow = img[i - 1]
            const nextRow = img[i + 1]
            const [curSum, curCount] = sumColumn(j, curRow)
            const [lastSum, lastCount] = sumColumn(j, lastRow)
            const [nextSum, nextCount] = sumColumn(j, nextRow)
            const sumTotal = curSum + lastSum + nextSum
            const countToal = curCount + lastCount + nextCount
            res[i][j] = Math.floor(sumTotal / countToal)
        }
    }
    return res
}

/** 657. 机器人能否返回原点
 * 在二维平面上，有一个机器人从原点 (0, 0) 开始。给出它的移动顺序，判断这个机器人在完成移动后是否在 (0, 0) 处结束。
 * 机器人的有效动作有 R（右），L（左），U（上）和 D（下）
 * 输入: moves = "UD"  输出: true
 * 解释：机器人向上移动一次，然后向下移动一次。所有动作都具有相同的幅度，因此它最终回到它开始的原点
 * @param {string} moves 1 <= moves.length <= 2 * 10 ^ 4
 * moves 只包含字符 'U', 'D', 'L' 和 'R'
 * @return {boolean}
 */
var judgeCircle = function (moves) {
    let stepMap = {
        U: 0,
        D: 0,
        R: 0,
        L: 0,
    }
    const moveLen = moves.length
    // "UDDUURLRLLRRUDUDLLRLURLRLRLUUDLULRULRLDDDUDDDDLRRDDRDRLRLURRLLRUDURULULRDRDLURLUDRRLRLDDLUUULUDUUUUL"
    for (let i = 0; i < moveLen; i++) {
        const move = moves[i]
        stepMap[move]++
    }
    // 要回到原点，那么必须前进和返回的路径要能互相抵消
    return stepMap.U === stepMap.D && stepMap.R === stepMap.L
}

/** 645. 错误的集合
 * 集合 s 包含从 1 到 n 的整数
 * 因为数据错误，导致集合里面某一个数字复制了成了集合里面的另外一个数字的值，
 * 导致集合 丢失了一个数字 并且 有一个数字重复
 *
 * 给定一个数组 nums 代表了集合 S 发生错误后的结果。
 * 请你找出重复出现的整数，再找到丢失的整数，将它们以数组的形式返回。
 *
 * 输入：nums = [1,2,2,4]    输出：[2,3]
 * 输入：nums = [1,1]  输出：[1,2]
 * @param {number[]} nums  2 <= nums.length <= 10^4
 * @return {number[]}
 */
var findErrorNums = function (nums) {
    // 效率太慢了，遍历了两轮，还用了 O(n) 的空间复杂度
    const countMap = {}
    const len = nums.length
    for (let i = 0; i < len; i++) {
        const num = nums[i]
        if (countMap[num] === undefined) {
            countMap[num] = 1
        } else {
            countMap[num]++
        }
    }
    let repeatNum, misNum
    for (let i = 0; i < len; i++) {
        const num = i + 1
        if (countMap[num] === undefined) {
            misNum = num
        }
        if (countMap[num] > 1) {
            repeatNum = num
        }
    }
    if (misNum === undefined) {
        misNum = len
    }
    return [repeatNum, misNum]

    // 改造: 求和  1-n 的和 countSum , 与 未去重的数组的和 sum ， 以及 去重后的数组的和 setSumCount
    // countSum - setSumCount = 缺失的真正元素
    // sum - setSumCount = 重复的元素
    const len = nums.length
    const countSum = ((1 + len) * len) / 2
    let sum = 0
    for (let i = 0; i < len; i++) {
        sum += nums[i]
    }
    const setSum = Array.from(new Set(nums))
    const setSumCount = setSum.reduce((total, num) => {
        total += num
        return total
    }, 0)
    return [sum - setSumCount, countSum - setSumCount]
}

/** 643. 子数组最大平均数 I
 * 给你一个由 n 个元素组成的整数数组 nums 和一个整数 k
 * 请你找出平均数最大且 长度为 k 的连续子数组，并输出该最大平均数
 * 任何误差小于 10^-5 的答案都将被视为正确答案
 *
 * 输入：nums = [1,12,-5,-6,50,3], k = 4  输出：12.75
 * 解释：最大平均数 (12-5-6+50)/4 = 51/4 = 12.75
 *
 * 输入：nums = [5], k = 1  输出：5.00000
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function (nums, k) {
    if (nums.length === 1) return nums[0]
    let max = -Infinity
    let start = 0
    let baseCount = 0
    while (start < k) {
        baseCount += nums[start]
        start++
    }
    max = Math.max(max, baseCount)
    const len = nums.length
    while (start < len) {
        let count = baseCount - nums[start - k] + nums[start]
        max = Math.max(max, count)
        start++
        baseCount = count // 更新 baseCount
    }
    return max / k

    /** 会超时 */
    // let count = 0,
    //     start = 0,
    //     len = nums.length,
    //     maxAverage = -Infinity
    // for (let i = 0; i <= len - k; i++) {
    //     count += nums[i]
    //     start = i + 1
    //     while (start - i < k) {
    //         count += nums[start]
    //         start++
    //     }
    //     const average = count / k
    //     maxAverage = Math.max(maxAverage, average)
    //     count = 0
    // }
    // return maxAverage
}

/**
 * 628. 三个数的最大乘积
 * 给你一个整型数组 nums ，在数组中找出由三个数组成的最大乘积，并输出这个乘积
 * 输入：nums = [1,2,3]  输出：6
 * 输入：nums = [1,2,3,4]  输出：24
 * 输入：nums = [-1,-2,-3]  输出：-6
 * @param {number[]} nums  3 <= nums.length <= 10^4
 * @return {number}
 */
var maximumProduct = function (nums) {
    // 三数之和？ 是不是复杂化了
    // for (let i = 0; i < len; i++) {
    //     let left = i + 1,
    //         right = len - 1
    //     while(left <  right) {}
    // }

    // 当逻辑题算，就是分成大于0和小于的两组数
    if (nums.length === 3) return nums[0] * nums[1] * nums[2]
    const len = nums.length
    const moreZero = [] // 大于0
    const lessZero = [] // 小于0
    let hasZero = false // 是否存在0, 0可能会是最大乘积
    for (let i = 0; i < len; i++) {
        if (nums[i] === 0) {
            hasZero = true
        } else if (nums[i] > 0) {
            moreZero.push(nums[i])
        } else {
            lessZero.push(nums[i])
        }
    }
    moreZero.sort((a, b) => a - b)
    lessZero.sort((a, b) => a - b)
    const moreLen = moreZero.length
    const lessLen = lessZero.length
    if (moreLen >= 3) {
        // 可能两个大负数 * 最大的正数
        const count = moreZero[moreLen - 2] * moreZero[moreLen - 3]
        if (lessLen >= 2) {
            let lessCount = lessZero[0] * lessZero[1]
            return Math.max(lessCount, count) * moreZero[moreLen - 1]
        }
        return count * moreZero[moreLen - 1]
    }
    // 正数不够，负数来凑
    if (lessLen >= 2) {
        let lessCount = lessZero[0] * lessZero[1]
        if (moreLen) {
            return lessCount * moreZero[moreLen - 1]
        }
        if (hasZero) return 0
        return lessZero[lessLen - 1] * lessZero[lessLen - 2] * lessZero[lessLen - 3]
    }
    return 0

    /** 换一种思路：
     * 如果数组中全是非负数，则排序后最大的三个数相乘即为最大乘积；
     * 如果全是非正数，则最大的三个数相乘同样也为最大乘积
     *
     * 如果数组中有正数有负数：
     * 则最大乘积既可能是三个最大正数的乘积，
     * 也可能是两个最小负数（即绝对值最大）与最大正数的乘积
     *
     * 分别求出三个最大正数的乘积，以及两个最小负数与最大正数的乘积
     */
    nums.sort((a, b) => a - b)
    const n = nums.length
    return Math.max(nums[0] * nums[1] * nums[n - 1], nums[n - 1] * nums[n - 2] * nums[n - 3])
}

/** 605. 种花问题
 * 假设有一个很长的花坛，一部分地块种植了花，另一部分却没有。可是，花不能种植在相邻的地块上，它们会争夺水源，两者都会死去
 * 给你一个整数数组 flowerbed 表示花坛，由若干 0 和 1 组成，其中 0 表示没种植花，1 表示种植了花
 * 另有一个数 n ，能否在不打破种植规则的情况下种入 n 朵花？能则返回 true ，不能则返回 false
 *
 * 输入：flowerbed = [1,0,0,0,1], n = 1  输出：true
 *
 * 输入：flowerbed = [1,0,0,0,1], n = 2  输出：false
 * @param {number[]} flowerbed  flowerbed[i] 为 0 或 1
 * @param {number} n   0 <= n <= flowerbed.length
 * @return {boolean}
 */
var canPlaceFlowers = function (flowerbed, n) {
    /**
     * 不打破种植规则的情况下种入 n 朵花
     * 规则：花不能种植在相邻的地块上，它们会争夺水源，两者都会死去  *只能基于之前0上面种植，不是往中间插值，如[0,0,0] -> [0,1,0]*
     *
     * 那么就要找出是否满足 当前可种花的数量（每相连的一对 0 可种一朵花 ）是否 >= n
     */
    if (n === 0) return true
    if (n === 1 && flowerbed.length === 1 && flowerbed[0] === 0) return true
    const len = flowerbed.length
    let count = n
    let gap = 0
    for (let i = 0; i < len; i++) {
        if (flowerbed[i] === 0) {
            gap++
        } else {
            gap = 0
        }
        if ((i == 1 || i == len - 1) && gap == 2) {
            count--
            gap = 1
        } else if (gap === 3) {
            count--
            gap = 1
        }
        if (count <= 0) return true
    }
    return false

    // for (int i = 0; i < length; i++) {
    //     if (flowerbed[i] == 0 && (i == 0 || flowerbed[i-1] == 0) && (i == length-1 || flowerbed[i+1] == 0)){
    //         n--;
    //         //把花种上
    //         flowerbed[i] = 1;
    //     }
    //     if (n <= 0){
    //         return true;
    //     }
    // }
    // return false;

    // 贪心算法
    // let count = 0;
    // const m = flowerbed.length;
    // let prev = -1;
    // for (let i = 0; i < m; i++) {
    //     if (flowerbed[i] === 1) {
    //         if (prev < 0) {
    //             count += Math.floor(i / 2);
    //         } else {
    //             count += Math.floor((i - prev - 2) / 2);
    //         }
    //         prev = i;
    //     }
    // }
    // if (prev < 0) {
    //     count += (m + 1) / 2;
    // } else {
    //     count += (m - prev - 1) / 2;
    // }
    // return count >= n;
}

/** 599. 两个列表的最小索引总和
 * 假设 Andy 和 Doris 想在晚餐时选择一家餐厅，并且他们都有一个表示最喜爱餐厅的列表，每个餐厅的名字用字符串表示
 * 你需要帮助他们用最少的索引和找出他们共同喜爱的餐厅
 * 如果答案不止一个，则输出所有答案并且不考虑顺序。 你可以假设答案总是存在
 * 输入:
 * list1 = ["Shogun", "Tapioca Express", "Burger King", "KFC"]，
 * list2 = ["Piatti", "The Grill at Torrey Pines", "Hungry Hunter Steakhouse", "Shogun"]
 * 输出: ["Shogun"] 解释: 他们唯一共同喜爱的餐厅是“Shogun”。
 *
 * 输入:
 * list1 = ["Shogun", "Tapioca Express", "Burger King", "KFC"]，
 * list2 = ["KFC", "Shogun", "Burger King"]
 * 输出: ["Shogun"]
 * 解释: 他们共同喜爱且具有最小索引和的餐厅是“Shogun”，它有最小的索引和1(0+1)。
 * @param {string[]} list1  list1 的所有字符串都是 唯一 的。
 * @param {string[]} list2  list2 中的所有字符串都是 唯一 的
 * @return {string[]}  list1[i] 和 list2[i] 由空格 ' ' 和英文字母组成
 */
var findRestaurant = function (list1, list2) {
    // 用最少的索引和找出他们共同喜爱的餐厅
    const mapOne = {}
    const mapRes = {}
    let res = []
    const lenOne = list1.length
    const lenTwo = list2.length
    for (let i = 0; i < lenOne; i++) {
        const item = list1[i]
        mapOne[item] = i
    }
    for (let i = 0; i < lenTwo; i++) {
        const item = list2[i]
        if (mapOne[item] !== undefined) {
            mapRes[item] = mapOne[item] + i
        }
    }
    // 计算最小索引和  ------  优化点：可以在遍历list2的时候，就计算索引和
    let min = Infinity
    Object.keys(mapRes).forEach((key) => {
        if (mapRes[key] < min) {
            res = [key]
            min = mapRes[key]
        } else if (mapRes[key] === min) {
            res.push(key)
        }
    })
    return res
}

/** 区间加法
 * 给你一个 m x n 的矩阵 M 和一个操作数组 op 。
 * 矩阵初始化时所有的单元格都为 0
 * ops[i] = [ai, bi]
 * 意味着当所有的 0 <= x < ai 和 0 <= y < bi 时， M[x][y] 应该加 1
 * @param {number} m
 * @param {number} n
 * @param {number[][]} ops
 * @return {number}
 */
var maxCount = function (m, n, ops) {
    if (ops.length === 0) return m * n
    let minW = Infinity,
        minH = Infinity
    for (const numList of ops) {
        minW = Math.min(numList[0], minW)
        minH = Math.min(numList[1], minH)
    }
    return minW * minH
}

/** 594. 最长和谐子序列
 * 和谐数组是指一个数组里元素的最大值和最小值之间的差别 正好是 1
 * 现在，给你一个整数数组 nums ，请你在所有可能的子序列中找到最长的和谐子序列的长度
 * 数组的子序列是一个由数组派生出来的序列，它可以通过删除一些元素或不删除元素、且不改变其余元素的顺序而得到
 *
 * - < 其实是可以排序的，因为只需要算长度，不需要返回结果 。。。  >
 *
 * 输入：nums = [1,3,2,2,5,2,3,7] 输出：5 解释：最长的和谐子序列是 [3,2,2,2,3]
 *
 * 输入：nums = [1,2,3,4]  输出：2
 * 输入：nums = [1,1,1,1]  输出：0
 *
 * @param {number[]} nums  1 <= nums.length <= 2 * 104
 * @return {number}
 */
var findLHS = function (nums) {
    /** 最大值和最小值之间的差别 正好是 1  不改变其余元素的顺序而得到
     * 前缀和转化为前缀差
     * [1,3,2,2,5,2,3,7]  => [2,-1,0,3,-3, 1, 4] => 计算和的绝对值为 0 或 1 的总数 =》 [-1,0,3,-3, 1], 总数为5
     */
    const len = nums.length
    let max = 0,
        useMap = {}
    // [-3,-3,-1,-1,-1,-2] 输出3  预期 4
    for (let i = 0; i < len; i++) {
        // 如果剩余长度已经小于当前获取的最大序列，那么没有必要再遍历了
        if (len - i < max) break
        // countDep[0]表示当前为min, countDep[1]表示当前为max
        let countDep = [1, 1],
            canUse = [false, false]
        const baseNum = nums[i]
        if (useMap[baseNum] !== undefined) break
        useMap[baseNum] = true
        for (let j = i + 1; j < len; j++) {
            const dif = nums[j] - baseNum
            if (dif === 1) {
                // 说明当前项比 nums[i] 大
                canUse[0] = true
                countDep[0]++
            }
            if (dif === -1) {
                canUse[1] = true
                countDep[1]++
            }
            if (dif === 0) {
                countDep[0]++
                countDep[1]++
            }
        }
        if (canUse[0]) {
            max = Math.max(max, countDep[0])
        }
        if (canUse[1]) {
            max = Math.max(max, countDep[1])
        }
    }
    return max

    /** 用哈希表计算 */
    const numMap = new Map()
    let res = 0
    for (const num of nums) {
        numMap.set(num, (numMap.get(num) || 0) + 1)
    }
    for (const key of numMap.keys()) {
        if (numMap.has(key + 1)) {
            res = Math.max(res, numMap.get(key) + numMap.get(key + 1))
        }
    }
    return res
}

/** 575. 分糖果
 * Alice 有 n 枚糖，其中第 i 枚糖的类型为 candyType[i] 。
 * Alice 注意到她的体重正在增长，所以前去拜访了一位医生
 * 医生建议 Alice 要少摄入糖分，只吃掉她所有糖的 n / 2 即可（n 是一个偶数）。
 * Alice 非常喜欢这些糖，她想要在遵循医生建议的情况下，尽可能吃到最多不同种类的糖。
 * 给你一个长度为 n 的整数数组 candyType ，
 * 返回： Alice 在仅吃掉 n / 2 枚糖的情况下，可以吃到糖的 最多 种类数
 *
 * n == candyType.length
 * n 是一个偶数
 * 2 <= n <= 10^4
 *
 * 输入：candyType = [1,1,2,2,3,3]  输出：3
 * 解释：Alice 只能吃 6 / 2 = 3 枚糖，由于只有 3 种糖，她可以每种吃一枚。
 * @param {number[]} candyType
 * @return {number}
 */
var distributeCandies = function (candyType) {
    // API大法：先去重，然后对比最大种类是否>n/2

    const set = new Set(candyType)
    return Math.min(set.size, candyType.length / 2)

    const candySet = new Set()
    const candyLen = candyType.length
    for (let i = 0; i < candyLen; i++) {
        const candy = candyType[i]
        candySet.add(candy)
    }
    const candyList = Array.from(candySet).length
    return Math.min(candyLen / 2, candyList)

    /** 返回可以吃到糖的 最多 种类数 */
    const len = candyType.length
    let eatCount = 0
    const eatMap = {}
    let left = 0,
        right = len - 1
    while (left < right) {
        const sugarL = candyType[left]
        const sugarR = candyType[right]
        if (eatCount === len / 2) return eatCount
        if (eatMap[sugarL] === undefined) {
            eatCount++
            eatMap[sugarL] = true
        }
        /** 如果只有两位数，这里需要判断下 */
        if (eatCount === len / 2) return eatCount
        if (eatMap[sugarR] === undefined) {
            eatCount++
            eatMap[sugarR] = true
        }
        left++
        right--
    }
    return eatCount
    for (let i = 0; i < len; i++) {
        const sugar = candyType[i]
        if (eatMap[sugar] !== undefined) {
            eatCount++
            eatMap[sugar] = true
        }
    }
}

/** 566. 重塑矩阵
 * 在 MATLAB 中，有一个非常有用的函数 reshape ，它可以将一个 m x n 矩阵重塑为另一个大小不同（r x c）的新矩阵，但保留其原始数据。
给你一个由二维数组 mat 表示的 m x n 矩阵，以及两个正整数 r 和 c ，分别表示想要的重构的矩阵的行数和列数。

重构后的矩阵需要将原始矩阵的所有元素以相同的 行遍历顺序 填充。

如果具有给定参数的 reshape 操作是可行且合理的，则输出新的重塑矩阵；否则，输出原始矩阵。
 * @param {number[][]} mat
 * @param {number} r
 * @param {number} c 1 <= r, c <= 300
 * @return {number[][]}
 */
var matrixReshape = function (mat, r, c) {
    /** 重构后的矩阵需要将原始矩阵的所有元素以相同的 行遍历顺序 填充 */

    /** 如果具有给定参数的 reshape 操作是可行且合理的，则输出新的重塑矩阵；否则，输出原始矩阵。 */
    let row = 0,
        col = 0
    const res = []
    for (let i = 0; i < r; i++) {
        res[i] = []
        for (let j = 0; j < c; j++) {
            let getCol = mat[row][col]
            if (getCol !== undefined) {
                res[i][j] = getCol
                col++
            } else {
                row++
                col = 0
                if (!mat[row]) return mat
                getCol = mat[row][col]
                if (getCol === undefined) return mat // 不符合填充格式
                res[i][j] = getCol
                col++
            }
        }
    }
    if (mat[row + 1] || mat[row][col]) {
        return mat
    }
    return res
}

/** 561. 数组拆分
 * 给定长度为 2n 的整数数组 nums ，你的任务是将这些数分成 n 对, 
 * 例如 (a1, b1), (a2, b2), ..., (an, bn) ，使得从 1 到 n 的 min(ai, bi) 总和最大。
 * 返回该 最大总和 。
 * 
 * 输入：nums = [1,4,3,2]  输出：4
 * 解释：所有可能的分法（忽略元素顺序）为：
1. (1, 4), (2, 3) -> min(1, 4) + min(2, 3) = 1 + 2 = 3
2. (1, 3), (2, 4) -> min(1, 3) + min(2, 4) = 1 + 2 = 3
3. (1, 2), (3, 4) -> min(1, 2) + min(3, 4) = 1 + 3 = 4
所以最大总和为 4

输入：nums = [6,2,6,5,1,2]
输出：9
解释：最优的分法为 (2, 1), (2, 5), (6, 6). min(2, 1) + min(2, 5) + min(6, 6) = 1 + 2 + 6 = 9
 * @param {number[]} nums  nums.length == 2 * n   1 <= n <= 10^4
 * @return {number}
 */
var arrayPairSum = function (nums) {
    nums.sort((a, b) => a - b)
    let count = 0
    for (let i = 0; i < nums.length; i++) {
        // 这里可以直接 i+=2, 这样就不用 取模 运算来判断奇偶了
        if (i % 2 === 0) {
            // 因为是从0开始下标计算，所以反而需要取偶数项
            count += nums[i]
        }
    }
    return count
}

/** 459. 重复的子字符串
 * 给定一个非空的字符串 s ，检查是否可以通过由它的一个子串重复多次构成。
 * 输入: s = "abab"  输出: true  解释: 可由子串 "ab" 重复两次构成。
 * 输入: s = "aba"   输出: false
 * 输入: s = "abcabcabcabc"  输出: true  解释: 可由子串 "abc" 重复四次构成。 (或子串 "abcabc" 重复两次构成。)
 * @param {string} s  1 <= s.length <= 10^4
 * @return {boolean}
 */
var repeatedSubstringPattern = function (s) {
    // let newStr = s + s
    // const newLen = newStr.length
    // // 将新字符串掐头去尾，如果还能命中 s，说明 s 是由子串重复构成
    // newStr = newStr.substring(1, newLen - 1)
    // return newStr.includes(s)
    // 暴力解法
    // 一个for循环获取 子串的终止位置， 然后判断子串是否能重复构成字符串，又嵌套一个for循环，所以是O(n^2)的时间复杂度

    // 如果一个长度为 n 的字符串 s 可以由它的一个长度为 n ′ 的子串 s ′ 重复多次构成，那么：
    // n 一定是 n ′ 的倍数；
    // s ′ 一定是 s 的前缀；
    // 对于任意的 i∈[n ′ ,n)，有 s[i]=s[i−n ′ ]
    const sLen = s.length
    for (let i = 1; i * 2 <= sLen; i++) {
        if (sLen % i === 0) {
            let match = true
            for (let j = i; j < sLen; j++) {
                if (s[j] !== s[j - i]) {
                    match = false
                    break
                }
            }
            if (match) {
                return true
            }
        }
    }
    return false
}

/** 476. 数字的补数
 * 输入：num = 5  输出：2  解释：5 的二进制表示为 101（没有前导零位），其补数为 010。所以你需要输出 2
 * @param {number} num
 * @return {number}
 */
var findComplement = function (num) {
    // toString, 将数字转换为对应进制的字符串
    const getBinaryStr = num.toString(2)
    const strLen = getBinaryStr.length
    let str = ''
    for (let i = 0; i < strLen; i++) {
        const cur = !Number(getBinaryStr[i])
        str += Number(cur)
    }
    console.log(str)
    // parseInt(str, 2) 将字符串转换为对应进制的数字
    return parseInt(str, 2)
}

/**
 * 205. 同构字符串
 * 给定两个字符串 s 和 t ，判断它们是否是同构的
 * 如果 s 中的字符可以按某种映射关系替换得到 t ，那么这两个字符串是同构的
 * 每个出现的字符都应当映射到另一个字符，同时不改变字符的顺序。不同字符不能映射到同一个字符上，相同字符只能映射到同一个字符上，字符可以映射到自己本身
 * 输入：s = "egg", t = "add"  输出：true
 * 输入：s = "foo", t = "bar"  输出：false
 * 输入：s = "paper", t = "title"  输出：true
 * 输入 s = "bbbaaaba"  t = "aaabbbba"  输出 false
 * @param {string} s  1 <= s.length <= 5 * 104
 * @param {string} t  t.length == s.length  s 和 t 由任意有效的 ASCII 字符组成
 * @return {boolean}
 */
var isIsomorphic = function (s, t) {
    /** 同构字符串，要求组合形式一致
     * 如: egg  xyy 对应 add 也为 xyy格式，所以为同构
     * 转换来看：就是当前遍历的数字，对应的统计个数是否一致，如果不一致，则说明存在不一致
     * bbbaaaba
     * aaabbbba
     *
     * 跑用例的时候发现，统计个数会有问题，比如  bbbaaaba  aaabbbba 如果只统计个数，会判断为复核重构，实际不符合
     * 将条件校验调整为判断当前位的最后一次出现的下标，如果一致，则说明是重构
     */
    if (s.length !== t.length) return false
    let mapS = {},
        mapT = {}
    const strLen = s.length
    for (let i = 0; i < strLen; i++) {
        const strS = s[i]
        const strT = t[i]
        if (mapS[strS] !== mapT[strT]) return false
        // 更新当前元素最后一次出现的下标
        mapS[strS] = i
        mapT[strT] = i
    }
    return true
}

/**
 * 1122. 数组的相对排序 -- 考察：自定义排序规则
 * 给你两个数组，arr1 和 arr2，arr2 中的元素各不相同，arr2 中的每个元素都出现在 arr1 中
 * 对 arr1 中的元素进行排序：
 * 使 arr1 中项的相对顺序和 arr2 中的相对顺序相同；未在 arr2 中出现过的元素需要按照升序放在 arr1 的末尾。
 *
 * 输入：arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]
 * 输出：[2,2,2,1,4,3,3,9,6,7,19]
 *
 * 输入：arr1 = [28,6,22,8,44,17], arr2 = [22,28,8,6]
 * 输出：[22,28,8,6,17,44]
 *
 * @param {number[]} arr1 1 <= arr1.length, arr2.length <= 1000
 * @param {number[]} arr2  arr2 中的元素 arr2[i]  各不相同  arr2 中的每个元素 arr2[i] 都出现在 arr1 中
 * @return {number[]}
 */
var relativeSortArray = function (arr1, arr2) {
    // ****************
    // 相对顺序指的是各个数字的前后相对顺序，不是要求数字是挨着的！！
    //*****************

    /** 思路分析：
     * 1. 先将 arr1 排序，并用hash处理值与下标映射
     * 2. 声明记录的数组变量 res
     * 3. 遍历 arr2 ，以arr2的顺序，在遍历过程中把相同的数值全部提取到 res 中
     * 4. 处理剩余的hash
     *
     * 为什么 Object.keys 处理数值不需要再排序了？
     * Object.keys在内部会根据属性名key的类型进行不同的排序逻辑：
     * 1. 如果属性名的类型是Number，那么Object.keys返回值是按照key从小到大排序 (对于负数是作为字符串处理的)
     * 2. 如果属性名的类型是String，那么Object.keys返回值是按照属性被创建的时间升序排序
     * 3. 如果属性名的类型是Symbol，那么逻辑同String相同
     * 如果对象的属性类型是数字，字符与Symbol混合的;
     * 那么返回顺序永远是数字在前，然后是字符串，最后是Symbol
     */
    arr1.sort((a, b) => a - b)
    const sortLen = arr1.length
    const sortMap = {}
    for (let i = 0; i < sortLen; i++) {
        const item = arr1[i]
        if (sortMap[item]) {
            sortMap[item].count++
            continue
        }
        sortMap[item] = {
            count: 1,
            sort: i,
        }
    }
    const res = []
    const useLen = arr2.length
    for (let i = 0; i < useLen; i++) {
        const item = arr2[i]
        while (sortMap[item].count) {
            res.push(item)
            sortMap[item].count--
        }
    }
    Object.keys(sortMap).forEach((key) => {
        while (sortMap[key].count) {
            res.push(key)
            sortMap[key].count--
        }
    })
    return res
}

/** LCR 180. 文件组合
 * 待传输文件被切分成多个部分，按照原排列顺序，每部分文件编号均为一个 正整数（至少含有两个文件）
 * 传输要求为：连续文件编号总和为接收方指定数字 target 的所有文件。请返回所有符合该要求的文件传输组合列表。
 * 注意，返回时需遵循以下规则：
 * 每种组合按照文件编号 升序 排列；
 * 不同组合按照第一个文件编号 升序 排列。
 *
 * 输入：target = 12  输出：[[3, 4, 5]]  解释：存在一个连续正整数序列的和为 12，为 [3, 4, 5]。
 * 输入：target = 18  输出：[[3,4,5,6],[5,6,7]]
 * @param {number} target  1 <= target <= 10^5
 * @return {number[][]}
 */
var fileCombination = function (target) {
    // 双重循环
    // const res = []
    // const limit = Math.ceil(target / 2)
    // for (let i = 1; i < limit + 1; i++) {
    //     let count = i
    //     let temp = [i]
    //     for (let j = i + 1; j <= limit + 1; j++) {
    //         count += j
    //         temp.push(j)
    //         if (count === target) {
    //             res.push(temp)
    //             break
    //         } else if (count > target) {
    //             break
    //         }
    //     }
    // }
    // return res

    // 双指针
    const res = []
    for (let l = 1, r = 2; l < r; ) {
        // 利用等差数列求和公式 a,b,c   sum(a,b,c) = ((a+c)*(c-a+1))/2
        const sum = ((l + r) * (r - l + 1)) / 2
        if (sum === target) {
            const temp = []
            for (let i = l; i <= r; i++) {
                temp.push(i)
            }
            res.push(temp)
            l++
        } else if (sum > target) {
            l++
        } else {
            r++
        }
    }
    return res
}

/**
 * LCR 159. 库存管理 III
 * 仓库管理员以数组 stock 形式记录商品库存表，其中 stock[i] 表示对应商品库存余量
 * 请返回库存余量最少的 cnt 个商品余量，返回 顺序不限
 * 输入：stock = [2,5,7,4], cnt = 1  输出：[2]
 * 输入：stock = [0,2,3,6], cnt = 2  输出：[0,2] 或 [2,0]
 * @param {number[]} stock
 * @param {number} cnt 0 <= cnt <= stock.length <= 10000
 * @return {number[]}
 */
var inventoryManagement = function (stock, cnt) {
    /** 简单粗暴sort排序 */
    // if (cnt === 0) return []
    // stock.sort((a, b) => a - b)
    // return stock.slice(0, cnt + 1)
}

/** LCR 158. 库存管理 II
 * 仓库管理员以数组 stock 形式记录商品库存表。stock[i] 表示商品 id，可能存在重复。
 * 请返回库存表中数量大于 stock.length / 2 的商品 id。
 * 输入: stock = [6, 1, 3, 1, 1, 1] 输出: 1
 * @param {number[]} stock 1 <= stock.length <= 50000
 * @return {number}
 */
var inventoryManagement = function (stock) {
    // const len = stock.length
    // // 边界处理
    // if (len === 1) return stock[0]
    // const flag = Math.floor(len / 2)
    // const goodsMap = {}
    // // 可用双指针做时间复杂度优化
    // for (let i = 0; i < len; i++) {
    //     const goods = stock[i]
    //     if (goodsMap[goods] !== undefined) {
    //         goodsMap[goods]++
    //         if (goodsMap[goods] > flag) {
    //             // 过半了就可以结束了
    //             return goods
    //         }
    //     } else {
    //         goodsMap[goods] = 1
    //     }
    // }

    /** 摩尔投票法，由于一定存在半数以上的数，那么任意两个数对比，如果不同则抵消-消消乐，那么最终剩下来的数，肯定是众数 */
    const len = stock.length
    let max = stock[0]
    let count = 1
    for (let i = 1; i < len; i++) {
        const goods = stock[i]
        if (count === 0) {
            max = goods
            count++
        } else {
            if (goods === max) {
                count++
            } else {
                count--
            }
        }
    }
    return max
}

/** LCR 128. 库存管理 I
 * 仓库管理员以数组 stock 形式记录商品库存表。stock[i] 表示商品 id，可能存在重复。
 * 原库存表按商品 id 升序排列。
 * 现因突发情况需要进行商品紧急调拨，管理员将这批商品 id 提前依次整理至库存表最后。
 * 请你找到并返回库存表中编号的 最小的元素 以便及时记录本次调拨
 * 输入：stock = [4,5,8,3,4]  输出：3
 * 输入：stock = [5,7,9,1,2] 输出：1
 * @param {number[]} stock
 * @return {number}
 */
var stockManagement = function (stock) {
    // 找出最小元素
    // let min = Infinity
    // const len = stock.length
    // let left = 0,
    //     right = len - 1
    // while (left <= right) {
    //     min = Math.min(stock[left], stock[right], min)
    //     left++
    //     right--
    // }
    // return min

    const len = stock.length
    let low = 0,
        high = len - 1
    // 二分法，重点是处理区间
    while (low < high) {
        const mid = low + Math.floor((high - low) / 2)
        if (stock[mid] > stock[high]) {
            low = mid + 1
        } else if (stock[mid] < stock[high]) {
            high = mid
        } else {
            high--
        }
    }
    return stock[low]
}

/**
 * 2924. 找到冠军 II
 * 一场比赛中共有 n 支队伍，按从 0 到  n - 1 编号。每支队伍也是 有向无环图（DAG - 有向无环图 是不存在任何环的有向图） 上的一个节点。
 * 给你一个整数 n 和一个下标从 0 开始、长度为 m 的二维整数数组
 * edges 表示这个有向无环图，其中 edges[i] = [ui, vi] 表示图中存在一条从 ui 队到 vi 队的有向边
 * 从 a 队到 b 队的有向边意味着 a 队比 b 队 强 ，也就是 b 队比 a 队 弱 。
 *
 * 在这场比赛中，如果不存在某支强于 a 队的队伍，则认为 a 队将会是 冠军 。
 *
 * 如果这场比赛存在 唯一 一个冠军，则返回将会成为冠军的队伍。否则，返回 -1 。
 *
 * 输入：n = 3, edges = [[0,1],[1,2]] 输出：0
 * 0 -> 2  1 -> 2
 * 解释：1 队比 0 队弱。2 队比 1 队弱。所以冠军是 0 队。
 *
 * 输入：n = 4, edges = [[0,2],[1,3],[1,2]]   输出：-1
 * 解释：
 * 0 -> 2   1 -> 3   1 -> 2
 * 2 队比 0 队和 1 队弱。3 队比 1 队弱。但是 1 队和 0 队之间不存在强弱对比。所以答案是 -1
 * @param {number} n  1 <= n <= 100
 * @param {number[][]} edges  edges[i].length == 2    0 <= edge[i][j] <= n - 1     edges[i][0] != edges[i][1]
 * @return {number}
 */
var findChampion = function (n, edges) {
    /**
     * 如果不存在某支强于 a 队的队伍，则认为 a 队将会是 冠军，也就是说 a 队不可能会在左边
     * 如果这场比赛存在 唯一 一个冠军，则返回将会成为冠军的队伍。否则，返回 -1
     */

    // const len = edges.length
    // /** 边界处理，n 与 edges 的范围
    //  * len === 0 && n === 1：只有一个队伍，没有比赛，直接就是冠军 findChampion(1, [[]])
    //  * len === 1 && n === 2：只有两个队伍，一场比赛，冠军就是赢得队伍 edges[0][0]  findChampion(2, [[1,0]])
    //  * len < n-1 比赛场次小于对于数量，说明有队伍之间没有比赛，没有冠军
    //  */
    // if (len === 0 && n === 1) return 0
    // if (len === 1 && n === 2) return edges[0][0]

    // // findChampion(3, [[0,1],[2,1]])
    // if (len < n - 1) return -1
    // let score = new Array(n).fill(0) // 统计分数, 这里要注意从n初始化，而不是len，n代表队伍的数量,从0开始，每失败一次则-1
    // for (let i = 0; i < len; i++) {
    //     const loss = edges[i][1]
    //     score[loss]--
    // }
    // let res = -1
    // for (let i = 0; i < n; i++) {
    //     if (score[i] === 0) {
    //         if (res > -1) {
    //             return -1
    //         }
    //         res = i
    //     }
    // }
    // return res

    /** 时间复杂度优化 */
    const len = edges.length
    if (len === 0 && n === 1) return 0
    if (len === 1 && n === 2) return edges[0][0]
    if (len < n - 1) return -1
    let score = new Array(n).fill(0) // 统计分数, 这里要注意从n初始化，而不是len，n代表队伍的数量,从0开始，每失败一次则-1
    let left = 0,
        right = len - 1
    while (left <= right) {
        const lossLeft = edges[left][1]
        const lossRight = edges[right][1]
        score[lossLeft]--
        score[lossRight]--
        left++
        right--
    }
    let res = []
    ;(left = 0), (right = n - 1)
    while (left <= right) {
        if (score[left] === 0) {
            res.push(left)
        }
        if (right !== left && score[right] === 0) {
            res.push(right)
        }
        left++
        right--
    }
    return res.length > 1 ? -1 : res[0]

    /** 官解 */
    let degree = new Array(n).fill(0)
    edges.forEach((e) => {
        degree[e[1]]++
    })
    let champion = -1
    for (let i = 0; i < n; i++) {
        if (degree[i] === 0) {
            if (champion === -1) {
                champion = i
            } else {
                return -1
            }
        }
    }
    return champion
}

/**
 * 2923. 找到冠军 I
 * 一场比赛中共有 n 支队伍，按从 0 到  n - 1 编号。
 * 给你一个下标从 0 开始、大小为 n * n 的二维布尔矩阵 grid 。对于满足 0 <= i, j <= n - 1 且 i != j 的所有 i, j
 * 如果 grid[i][j] == 1，那么 i 队比 j 队 强 ；否则，j 队比 i 队 强 。
 * 在这场比赛中，如果不存在某支强于 a 队的队伍，则认为 a 队将会是 冠军 。 返回这场比赛中将会成为冠军的队伍。
 * 输入：grid = [[0,1],[0,0]]  输出：0
 * 解释：比赛中有两支队伍。 grid[0][1] == 1 表示 0 队比 1 队强。所以 0 队是冠军。
 *
 * 输入：grid = [[0,0,1],[1,0,1],[0,0,0]]  输出：1
 * 解释：比赛中有三支队伍。 grid[1][0] == 1 表示 1 队比 0 队强。 grid[1][2] == 1 表示 1 队比 2 队强。 所以 1 队是冠军。
 *
 * n == grid.length
 * n == grid[i].length
 * 2 <= n <= 100
 * grid[i][j] 的值为 0 或 1
 * 对于所有 i， grid[i][i] 等于 0.
 * 对于满足 i != j 的所有 i, j ，grid[i][j] != grid[j][i] 均成立
 * 生成的输入满足：如果 a 队比 b 队强，b 队比 c 队强，那么 a 队比 c 队强
 * @param {number[][]} grid
 * @return {number}
 */
var findChampion = function (grid) {
    const len = grid.length
    const max = [0, 0]
    /** 能不能理解为赢得多的一定是冠军 -_- 没想到真是这样 */
    for (let i = 0; i < len; i++) {
        const curScore = grid[i].reduce((total, item) => (total += item), 0)

        if (curScore > max[0]) {
            max[0] = curScore
            max[1] = i
        }
    }
    return max[1]

    /** 打擂台 */
    const len = grid.length
    let max = 0 // 假设当前冠军的下标是0
    for (let i = 0; i < len; i++) {
        if (grid[i][max] === 1) {
            max = i
        }
    }
    return max
}

/**LCP 06. 拿硬币
 * 桌上有 n 堆力扣币，每堆的数量保存在数组 coins 中。我们每次可以选择任意一堆，拿走其中的一枚或者两枚，求拿完所有力扣币的最少次数。
 * 输入：[4,2,1]  输出：4
 * 解释：第一堆力扣币最少需要拿 2 次，第二堆最少需要拿 1 次，第三堆最少需要拿 1 次，总共 4 次即可拿完。
 * 输入：[2,3,10]  输出：8
 * @param {number[]} coins  1 <= n <= 4
 * @return {number}   1 <= coins[i] <= 10
 */
var minCount = function (coins) {
    const len = coins.length
    let count = 0
    for (let i = 0; i < len - 1; i++) {
        const num = coins[i]
        count += Math.ceil(num / 2)
    }
    return count

    // [) 左闭右开
    let left = 0,
        right = len
    let count = 0
    while (left < right) {
        const leftNum = coins[left]
        const rightNum = coins[right - 1]
        count += Math.ceil(leftNum / 2)
        count += Math.ceil(rightNum)
        left++
        right--
    }
    return count
}

/** LCR 179. 查找总价格为目标值的两个商品
 * 购物车内的商品价格按照升序记录于数组 price
 * 请在购物车中找到两个商品的价格总和刚好是 target。若存在多种情况，返回任一结果即可。
 * 输入：price = [3, 9, 12, 15], target = 18   输出：[3,15] 或者 [15,3]
 *
 * 输入：price = [8, 21, 27, 34, 52, 66], target = 61   输出：[27,34] 或者 [34,27]
 * @param {number[]} price  1 <= price.length <= 10^5   1 <= price[i] <= 10^6
 * @param {number} target   1 <= target <= 2*10^6
 * @return {number[]}
 */
var twoSum = function (price, target) {
    // 按照升序 - 可以做剪枝
    let difMap = {}
    const priceLen = price.length
    for (let i = 0; i < priceLen; i++) {
        const p = price[i]
        if (p > target) continue
        if (difMap[p] !== undefined) {
            return [p, difMap[p]]
        } else {
            const dif = target - p
            difMap[dif] = p
        }
    }
    return []

    // 因为是升序，所以也可以左右指针
    let left = 0,
        right = price.length - 1
    while (price[right] > target) {
        right--
    }

    while (left < right) {
        const sum = price[left] + price[right]

        if (sum > target) {
            right--
        } else if (sum < target) {
            left++
        } else {
            return [price[left], price[right]]
        }
    }
}

/** 1502. 判断能否形成等差数列
 * 给你一个数字数组 arr 。如果一个数列中，任意相邻两项的差总等于同一个常数，那么这个数列就称为 等差数列
 * 如果可以重新排列数组形成等差数列，请返回 true ；否则，返回 false
 * 输入：arr = [3,5,1] 输出：true
 * @param {number[]} arr  2 <= arr.length <= 1000
 * @return {boolean}
 */
var canMakeArithmeticProgression = function (arr) {
    // arr.sort((a, b) => a - b)
    // const len = arr.length
    // const flag = arr[1] - arr[0]
    // for (let i = 1; i < len; i++) {
    //     if (arr[i] - arr[i - 1] !== flag) return false
    // }
    // return true

    arr.sort((a, b) => a - b)
    const len = arr.length
    let left = 1,
        right = len - 1
    // [1,10,10,10,19]
    const flag = arr[1] - arr[0]
    while (left <= right) {
        if (arr[left] - arr[left - 1] !== flag || arr[right] - arr[right - 1] !== flag) {
            return false
        }
        left++
        right--
    }
    return true
}

/** LCR 173. 点名
 * 某班级 n 位同学的学号为 0 ~ n-1。点名结果记录于升序数组 records。假定仅有一位同学缺席，请返回他的学号
 * 输入: records = [0,1,2,3,5]   输出: 4
 * 输入: records = [0,1,2,4,5]   输出: 3
 * @param {number[]} records  1 <= records.length <= 10000
 * @return {number}
 */
var takeAttendance = function (records) {
    // const len = records.length
    // for (let i = 0; i < len; i++) {
    //     if (records[i] > i) {
    //         return i
    //     }
    // }
    // // 为什么return len, 针对[0]  [0, 1] 这种数据
    // return len

    const len = records.length
    let left = 0,
        right = len - 1
    while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        if (records[mid] === mid) {
            // 说明左区间是正常递增，left 扩大
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    // return records[left] === left ? len : left
    return left
}

/** 面试题 01.09. 字符串轮转
 * 字符串轮转。给定两个字符串s1和s2，请编写代码检查s2是否为s1旋转而成
 * （比如，waterbottle是erbottlewat旋转后的字符串）
 * 输入：s1 = "waterbottle", s2 = "erbottlewat"  输出：True
 * w a t e r b o t t l e
 * e r b 0 t t l e w a t    e r b 0 t t l e w a t
 * 输入：s1 = "aa", s2 = "aba" 输出：False
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var isFlipedString = function (s1, s2) {
    if (s1 === s2) return true
    if (s1.length !== s2.length) return false
    let countS2 = s2 + s2
    const resetStr = countS2.split(s1)
    if (resetStr.length === 1) return false
    return resetStr[1] + resetStr[0] === s1
}

/**
 * LCR 139. 训练计划 I
 * 教练使用整数数组 actions 记录一系列核心肌群训练项目编号。为增强训练趣味性，需要将所有奇数编号训练项目调整至偶数编号训练项目之前。
 * 请将调整后的训练项目编号以 数组 形式返回。
 * 输入：actions = [1,2,3,4,5]  输出：[1,3,5,2,4]  解释：为正确答案之一
 * @param {number[]} actions
 * @return {number[]}
 */
var trainingPlan = function (actions) {
    // return actions.sort((a, b) => b % 2 - a % 2)

    // const oddList = []
    // const evenList = []
    // const len = actions.length
    // for (let i = 0; i < len; i++) {
    //     const num = actions[i]
    //     if (num % 2 !== 0) {
    //         oddList.push(num)
    //     } else {
    //         evenList.push(num)
    //     }
    // }
    // 双指针减少遍历次数
    // let left = 0,
    //     right = len - 1
    // while (left <= right) {
    //     const leftNum = actions[left]
    //     const rightNum = actions[right]
    //     if (leftNum % 2 !== 0) {
    //         oddList.push(leftNum)
    //     } else {
    //         evenList.push(leftNum)
    //     }
    //     if (right > left) {
    //         if (rightNum % 2 !== 0) {
    //             oddList.push(rightNum)
    //         } else {
    //             evenList.push(rightNum)
    //         }
    //     }
    //     left++
    //     right--
    // }
    // return [...oddList, ...evenList]

    const res = []
    const len = actions.length
    let left = 0,
        right = len - 1
    while (left <= right) {
        const leftNum = actions[left]
        const rightNum = actions[right]
        if (leftNum % 2 !== 0) {
            res.unshift(leftNum)
        } else {
            res.push(leftNum)
        }
        if (right > left) {
            if (rightNum % 2 !== 0) {
                res.unshift(rightNum)
            } else {
                res.push(rightNum)
            }
        }
        left++
        right--
    }
    return res
}

/** LCR 135. 报数
 * 实现一个十进制数字报数程序，请按照数字从小到大的顺序返回一个整数数列，该数列从数字 1 开始，到最大的正整数 cnt 位数字结束
 * @param {number} cnt
 * @return {number[]}
 */
var countNumbers = function (cnt) {
    // const maxNum = Number(1 + new Array(cnt).fill(0).join(''))
    const maxNum = Math.pow(10, cnt)
    const count = []
    for (let i = 0; i < maxNum; i++) {
        count.push(i)
    }
    return count
}

/** 2706. 购买两块巧克力
 * 给你一个整数数组 prices ，它表示一个商店里若干巧克力的价格。同时给你一个整数 money ，表示你一开始拥有的钱数
 * 你必须购买 恰好 两块巧克力，而且剩余的钱数必须是 非负数 。同时你想最小化购买两块巧克力的总花费
 * 请你返回在购买两块巧克力后，最多能剩下多少钱
 * 输入：prices = [1,2,2], money = 3    输出：0
 * 输入：prices = [3,2,3], money = 3    输出：3
 * @param {number[]} prices  2 <= prices.length <= 50
 * @param {number} money     1 <= prices[i] <= 100
 * @return {number}
 */
var buyChoco = function (prices, money) {
    /** 排序由于底层设计，所以遍历次数大于1次，未必是最优解 */
    prices.sort((a, b) => a - b)
    const cost = prices[0] + prices[1]
    if (cost > money) return money
    return money - cost

    let len = prices.length
    let price1 = prices[0],
        price2 = prices[1]
    let minUse = Math.min(price1, price2)
    let maxUse = Math.max(price1, price2)
    for (let i = 2; i < len; i++) {
        const cost = prices[i]
        if (cost >= maxUse) {
            continue
        } else {
            if (cost <= minUse) {
                maxUse = minUse
                minUse = cost
            } else {
                maxUse = cost
            }
        }
    }
    const totalCost = minUse + maxUse
    return totalCost > money ? money : money - totalCost
}

/** LCR 181. 字符串中的单词反转
 * 输入字符串 message 中可能会存在前导空格、尾随空格或者单词间的多个空格。
 * 返回的结果字符串中，单词间应当仅用单个空格分隔，且不包含任何额外的空格
 * @param {string} message
 * @return {string}
 */
var reverseMessage = function (message) {
    let msgList = message.split(' ')
    msgList.reverse()
    // 过滤点空字符
    msgList = msgList.filter((item) => item)
    return msgList.join(' ').trim()
}

/** LCR 182. 动态口令
 * 某公司门禁密码使用动态口令技术。初始密码为字符串 password，密码更新均遵循以下步骤：
 * 设定一个正整数目标值 target
 * 将 password 前 target 个字符按原顺序移动至字符串末尾
 * 请返回更新后的密码字符串
 * @param {string} password
 * @param {number} target
 * @return {string}
 */
var dynamicPassword = function (password, target) {
    let strPre = password.slice(0, target)
    let strEnd = password.slice(target, password.length)

    return strEnd + strPre
}

/** LCR 186. 文物朝代判断
 * 展览馆展出来自 13 个朝代的文物，每排展柜展出 5 个文物
 * 某排文物的摆放情况记录于数组 places，其中 places[i] 表示处于第 i 位文物的所属朝代编号，其中，编号为 0 的朝代表示未知朝代。
 * 请判断并返回这排文物的所属朝代编号是否连续（如遇未知朝代可算作连续情况）
 * 输入: places = [0, 6, 9, 0, 7] 输出: True
 * 输入: places = [7, 8, 9, 10, 11] 输出: True
 * @param {number[]} places
 * @return {boolean}
 */
var checkDynasty = function (places) {
    // 这排文物的所属朝代编号是否连续 - 默认是乱序， 0 可以代替任何数
    places.sort((a, b) => a - b)
    const len = places.length
    let pre = places[0]
    let canFill = 0
    for (let i = 0; i < len; i++) {
        if (places[i] === 0) {
            canFill++
            continue
        }
        if (i > 0 && pre !== 0) {
            let diff = places[i] - pre - 1
            if (diff > 0) {
                canFill -= diff
            }
            if (diff < 0 || canFill < 0) {
                return false
            }
        }
        pre = places[i]
    }
    return true
}

/** LCR 187. 破冰游戏
 * 社团共有 num 位成员参与破冰游戏，编号为 0 ~ num-1。成员们按照编号顺序围绕圆桌而坐
 * 社长抽取一个数字 target，从 0 号成员起开始计数，排在第 target 位的成员离开圆桌，且成员离开后从下一个成员开始计数
 * 请返回游戏结束时最后一位成员的编号
 * 输入：num = 7, target = 4    输出：1
 * 输入：num = 12, target = 5   输出：0
 * @param {number} num    1 <= num <= 10^5
 * @param {number} target 1 <= target <= 10^6
 * @return {number}
 */
var iceBreakingGame = function (num, target) {
    // 数学 + 递归

    function lastDelete(num, target) {
        // 当只有一位数时，一定返回0
        if (num === 1) return 0
        let x = dfs(num - 1, target)
        // x 为新一轮的开始下标，每次删除的数默认都是 target % num
        // 由于要接着上一次删除的数往下删，所以需要 target + x
        return (target + x) % num
    }

    return lastDelete(num, target)

    /** 迭代 */
    let res = 0
    for (let i = 2; i !== num + 1; ++i) {
        // res表示第i个数的开始计数下标
        res = (target + res) % i
    }
    return res

    /** 链表能解，但是会超时 */
    function LinkNode(val) {
        this.val = val
        this.next = undefined
    }
    let start = 0
    let head = new LinkNode(0)
    let curNode = head
    while (start < num - 1) {
        curNode.next = new LinkNode(++start)
        curNode = curNode.next
    }
    // 成环
    curNode.next = head

    /** 环形链表遍历 */

    // head -> 0  1
    //      5       2
    //         4  3

    if (target == 1) return curNode.val // 如果target=1,直接return最后一位即可
    let step = 1
    let node = head
    let prev
    //    0          0
    //  3   1            1
    //    2          2
    while (node.next && node.next.val !== node.val) {
        if (step === target) {
            prev.next = node.next
            node = node.next
            // 重置step
            step = 1
        }
        prev = node
        node = node.next
        step++
    }
    // console.log('最终', node)
    return node.val
}

/** LCS 01. 下载插件
 * 小扣打算给自己的 VS code 安装使用插件，初始状态下带宽每分钟可以完成 1 个插件的下载。
 * 假定每分钟选择以下两种策略之一:
 * 1. 使用当前带宽下载插件
 * 2. 将带宽加倍（下载插件数量随之加倍）即当前这一分钟用来升级带宽，升级之后，后续每一分钟可以完成 2n 个插件
 * 请返回小扣完成下载 n 个插件最少需要多少分钟
 * 注意：实际的下载的插件数量可以超过 n 个
 * 输入：n = 4  输出：3
 * 解释： 最少需要 3 分钟可完成 4 个插件的下载，以下是其中一种方案:
 * 第一分钟带宽加倍，带宽可每分钟下载 2 个插件; 此时下载量为0
 * 第二分钟下载 2 个插件;
 * 第三分钟下载 2 个插件
 * @param {number} n
 * @return {number}
 */
var leastMinutes = function (n) {
    if (n < 2) return 1

    let speed = 1 // 当前下载速度
    let res = 0 // 分钟数

    while (speed < n) {
        speed = speed * 2
        res++
    }

    return res + 1
}

/** LCS 02. 完成一半题目
 * 有 N 位扣友参加了微软与力扣举办了「以扣会友」线下活动。主办方提供了 2*N 道题目
 * 整型数组 questions 中每个数字对应了每道题目所涉及的知识点类型
 *  若每位扣友选择不同的一题，请返回被选的 N 道题目至少包含多少种知识点类型
 * 输入：questions = [2,1,6,2]  输出：1
 * 解释：可一起选择完成知识点类型为 2 的题目时，此时仅一种知识点类型 因此至少包含 1 种知识点类型
 *
 * 输入：questions = [1,5,1,3,4,5,2,5,3,3,8,6]  输出：2
 * 解释： 选择完成知识点类型为 3、5 的题目，因此至少包含 2 种知识点类型
 * @param {number[]} questions
 * @return {number}
 */
var halfQuestions = function (questions) {
    // map 哈希表处理 - 统计题目个数与人数匹配即可
    const queLen = questions.length
    const target = queLen / 2
    const typeMap = {}

    for (let i = 0; i < queLen; i++) {
        const que = questions[i]
        if (typeMap[que]) {
            typeMap[que]++
            if (typeMap[que] >= target) {
                return 1
            }
        } else {
            typeMap[que] = 1
        }
    }

    const typeList = Object.keys(typeMap).map((item) => typeMap[item])
    const typeLen = typeList.length
    typeList.sort((a, b) => a - b)
    let res = 0
    let need = target
    for (let i = typeLen - 1; i >= 0; i--) {
        if (need <= typeList[i]) {
            return res + 1
        } else {
            need -= typeList[i]
            res++
        }
    }
    return res
}

/** 面试题 01.01. 判定字符是否唯一
 * 实现一个算法，确定一个字符串 s 的所有字符是否全都不同。
 * 输入: s = "leetcode"  输出: false
 * 输入: s = "abc"  输出: true
 * @param {string} astr
 * @return {boolean}
 */
var isUnique = function (astr) {
    const strMap = {}
    const strLen = astr.length
    for (let i = 0; i < strLen; i++) {
        const str = astr[i]
        if (strMap[str]) {
            return false
        } else {
            strMap[str] = true
        }
    }
    return true
}

/** 面试题 01.02. 判定是否互为字符重排
 * 给定两个由小写字母组成的字符串 s1 和 s2，请编写一个程序，确定其中一个字符串的字符重新排列后，能否变成另一个字符串
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var CheckPermutation = function (s1, s2) {
    if (s1.length !== s2.length) return false
    const strMap = {}
    for (let i = 0; i < s1.length; i++) {
        const key = s1[i]
        if (strMap[key]) {
            strMap[key]++
        } else {
            strMap[key] = 1
        }
    }
    for (let i = 0; i < s2.length; i++) {
        const key = s2[i]
        if (strMap[key]) {
            strMap[key]--
            /** 遍历优化 */
            if (strMap[key] < 0) return false
        } else {
            return false
        }
    }
    const countStr = Object.keys(strMap)
    return !!countStr.find((count) => count !== 0)

    // API大法
    // return s1.length == s2.length && [...s1].sort().join('') === [...s2].sort().join('')
}

/** 面试题 01.03. URL化
 * URL化。编写一种方法，将字符串中的空格全部替换为%20。假定该字符串尾部有足够的空间存放新增字符，并且知道字符串的“真实”长度
 * 输入："Mr John Smith    ", 13  输出："Mr%20John%20Smith"
 * @param {string} S
 * @param {number} length
 * @return {string}
 */
var replaceSpaces = function (S, length) {
    // 139 ms 击败 21.43% 使用 JavaScript 的用户   81.58 MB 击败 25.39% 使用 JavaScript 的用户
    // let res = ''
    // for (let i = 0; i < length; i++) {
    //     if (S[i] === ' ') {
    //         res += '%20'
    //     } else {
    //         res += S[i]
    //     }
    // }
    // return res

    // 数组置换 - 好像没有快多少，反而更费事
    const strList = []
    let left = 0,
        right = length - 1
    while (left <= right) {
        if (S[left] === ' ') {
            strList[left] = '%20'
        } else {
            strList[left] = S[left]
        }
        if (S[right] === ' ') {
            strList[right] = '%20'
        } else {
            strList[right] = S[right]
        }
        left++
        right--
    }
    return strList.join('')
}

/** 面试题 01.04. 回文排列
 * 给定一个字符串，编写一个函数判定其是否为某个回文串的排列之一。
 * 回文串是指正反两个方向都一样的单词或短语。排列是指字母的重新排列
 * 回文串不一定是字典当中的单词。
 * 输入："tactcoa" 输出：true（排列有"tacocat"、"atcocta"，等等）
 * 'code' -> false
 * @param {string} s
 * @return {boolean}
 */
var canPermutePalindrome = function (s) {
    // 不需要回溯，只需要判断字符串是否最多只有一个单字母，其他都是对数存在即可

    if (s.length < 2) return true
    const strLen = s.length
    const strMap = {}
    for (let i = 0; i < strLen; i++) {
        const str = s[i]
        if (strMap[str]) {
            strMap[str]++
        } else {
            strMap[str] = 1
        }
    }
    let flag = 0
    Object.keys(strMap).forEach((str) => {
        if (strMap[str] % 2 === 1) {
            flag++
        }
    })
    return flag < 2
}

/** 面试题 01.06. 字符串压缩
 * 利用字符重复出现的次数，编写一种方法，实现基本的字符串压缩功能。
 * 比如，字符串aabcccccaaa会变为a2b1c5a3。
 * 若“压缩”后的字符串没有变短，则返回原先的字符串。
 * 你可以假设字符串中只包含大小写英文字母（a至z）
 * 输入："aabcccccaaa"  输出："a2b1c5a3"
 * 输入："abbccd"输出："abbccd"解释："abbccd"压缩后为"a1b2c2d1"，比原字符串长度更长。
 * @param {string} S
 * @return {string}
 */
var compressString = function (S) {
    if (S.length < 2) return S
    const strLen = S.length
    let res = S[0]
    let temp = S[0]
    let count = 1
    for (let i = 1; i < strLen; i++) {
        const str = S[i]
        if (str === temp) {
            count++
            if (i === strLen - 1) {
                // 最后一个元素
                res += count
            }
        } else {
            res += count
            res += str
            temp = str
            count = 1
            if (i === strLen - 1) {
                // 最后一个元素
                res += 1
            }
        }
    }

    return res.length < strLen ? res : S

    // 思路不对，只合并相邻的重复字符
    // const strSort = []
    // const strMap = {}
    // const strLen = S.length
    // for (let i = 0; i < strLen; i++) {
    //     const str = S[i]
    //     if (strMap[str]) {
    //         strMap[str]++
    //     } else {
    //         strMap[str] = 1
    //         strSort.push(str)
    //     }
    // }
    // let res = ''
    // strSort.forEach((str) => {
    //     const count = str + strMap[str]
    //     res += count
    // })
    // return res.length < strLen ? res : S
}

/** 15. 三数之和
 * 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]]
 * 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0
 * 返回所有和为 0 且不重复的三元组
 * 输入：nums = [-1,0,1,2,-1,-4] 输出：[[-1,-1,2],[-1,0,1]]

 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    nums.sort((a, b) => a - b)
    const res = []
    const numLen = nums.length
    for (let i = 0; i < numLen - 2; i++) {
        if (nums[i] > 0) break // 这里要结束循环
        if (i > 0 && nums[i] === nums[i - 1]) continue
        let left = i + 1,
            right = numLen - 1
        while (left < right) {
            const count = nums[left] + nums[right] + nums[i]
            if (count > 0) {
                // 整个和>0,right移动
                right--
            } else if (count < 0) {
                left++
            } else {
                // 符合条件， nums[left] + nums[right] + nums[i] === 0
                res.push([nums[left], nums[right], nums[i]])
                while (left < right && nums[left] === nums[left + 1]) {
                    left++
                }
                while (left < right && nums[right] === nums[right - 1]) {
                    right--
                }
                left++
                right--
            }
        }
    }
    return res

    /** 用hashmap很难解决去重问题，所以建议用双指针 */
    // const numLen = nums.length
    // const targetSet = new Set()
    // // 因为目标是不重复的三元组，所以遍历的时候需要先排序，跳过相同的初始值
    // nums.sort((a, b) => a - b)
    // for (let i = 0; i < numLen; i++) {
    //     // 跳过相同的初始值
    //     if (nums[i] == nums[i - 1]) continue
    //     const sumMap = {}
    //     for (let j = i + 1; j < numLen; j++) {
    //         if (j > i +1 && nums[j] === nums[j - 1]) break
    //         const cur = nums[j]
    //         const dif = 0 - nums[i] - cur
    //         // 满足 i!==j  i!==k  j!==k
    //         if (sumMap[cur] !== undefined) {
    //             targetSet.add([nums[i], cur, nums[sumMap[cur]]])
    //             break;
    //         } else {
    //             sumMap[dif] = j
    //         }
    //     }
    // }
    // return Array.from(targetSet)
}

/** 两数之和
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标
 *
 * 输入：nums = [2,7,11,15], target = 9  输出：[0,1]  解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    const sumMap = {}
    const numLen = nums.length
    for (let i = 0; i < numLen; i++) {
        const curNum = nums[i]
        if (sumMap[curNum] !== undefined) {
            return [sumMap[curNum], i]
        } else {
            const dif = target - curNum
            sumMap[dif] = i
        }
    }
}

/** 面试题 01.05. 一次编辑 - 力扣（LeetCode）
 * 字符串有三种编辑操作:插入一个英文字符、删除一个英文字符或者替换一个英文字符
 * 给定两个字符串，编写一个函数判定它们是否只需要一次(或者零次)编辑
 * 输入: first = "pale" second = "ple"  输出: True
 * @param {string} first
 * @param {string} second
 * @return {boolean}
 */
var oneEditAway = function (first, second) {
    /**
     * 符合要求的编辑
     * 1次编辑的情况
     * 一次插入(不等长，但是其他元素都一致)  一次删除  一次替换
     * 0次编辑的情况
     * first===second
     */
    if (first === second) return true
    if (Math.abs(first.length - second.length) > 1) return false // 长度超过2位差，肯定不满足1|0次编辑条件
    if (first.length > second.length) {
        // 调整长短边，用于遍历
        ;[second, first] = [first, second]
    }
    // 遍历更短的字符
    for (let i = 0; i < first.length; i++) {
        if (first[i] !== second[i]) {
            // first[i + 1] === second[i + 1] 遇到当前i不等，但是后续的值都相等，那么此时只需要一次替换
            // first[i + 1] === second[i + 1] 遇到当前i不等，但是长的删除之后都相等
            return first.slice(i + 1) === second.slice(i + 1) || first.slice(i) === second.slice(i + 1)
        }
    }
    return true
}

/** 化栈为队 */
var MyQueue = function () {
    this.inStack = []
    this.outStack = []
}

MyQueue.prototype.push = function (x) {
    this.inStack.push(x)
}

MyQueue.prototype.pop = function () {
    if (!this.outStack.length) {
        this.in2out()
    }
    return this.outStack.pop()
}

MyQueue.prototype.peek = function () {
    if (!this.outStack.length) {
        this.in2out()
    }
    return this.outStack[this.outStack.length - 1]
}

MyQueue.prototype.empty = function () {
    return this.outStack.length === 0 && this.inStack.length === 0
}

MyQueue.prototype.in2out = function () {
    while (this.inStack.length) {
        this.outStack.push(this.inStack.pop())
    }
}

/** 面试题 08.01. 三步问题
 * 三步问题。有个小孩正在上楼梯，楼梯有n阶台阶，小孩一次可以上1阶、2阶或3阶
 * 实现一种方法，计算小孩有多少种上楼梯的方式。结果可能很大，你需要对结果模1000000007。
 * @param {number} n
 * @return {number}
 */
var waysToStep = function (n) {
    if (n == 1) return 1
    if (n === 2) return 2
    if (n === 3) return 4 // f(1) + f(2) + 1 = 4
    const dp = []
    dp[0] = 1
    dp[1] = 1
    dp[2] = 2
    for (let i = 3; i <= n; i++) {
        dp[i] = (((dp[i - 1] + dp[i - 2]) % 1000000007) + dp[i - 3]) % 1000000007
    }
    return dp[n]
}

/** 面试题 08.03. 魔术索引
 * 满足条件A[i] = i。给定一个有序整数数组，编写一种方法找出魔术索引，若有的话，在数组A中找出一个魔术索引，如果没有，则返回-1。
 * 若有多个魔术索引，返回索引值最小的一个
 * 输入：nums = [0, 2, 3, 4, 5] 输出：0
 * 输入：nums = [1, 1, 1] 输出：1
 * @param {number[]} nums nums长度在[1, 1000000]之间
 * @return {number}
 */
var findMagicIndex = function (nums) {
    const len = nums.length
    let left = 0,
        right = len - 1
    let idxMap = {}
    while (left <= right) {
        if (nums[left] === left) {
            idxMap[left] = true
        } else if (nums[right] === right) {
            idxMap[right] = true
        }
        left++
        right--
    }
    const ids = Object.keys(idxMap)
    if (ids.length === 0) return -1
    ids.sort((a, b) => a - b)
    return ids[0]

    // 优化
    const len = nums.length
    let left = 0,
        right = len - 1
    let res = -1
    function updateRes(idx) {
        if (res === -1) {
            res = idx
        } else {
            res = Math.min(idx, res)
        }
    }
    while (left <= right) {
        if (nums[left] === left) {
            updateRes(left)
        } else if (nums[right] === right) {
            updateRes(right)
        }
        left++
        right--
    }
    return res
}

/** 面试题 08.06. 汉诺塔问题
 * 在经典汉诺塔问题中，有 3 根柱子及 N 个不同大小的穿孔圆盘，盘子可以滑入任意一根柱子
 * 一开始，所有盘子自上而下按升序依次套在第一根柱子上(即每一个盘子只能放在更大的盘子上面)
 * 移动圆盘时受到以下限制:
 * (1) 每次只能移动一个盘子;
 * (2) 盘子只能从柱子顶端滑出移到下一根柱子;
 * (3) 盘子只能叠在比它大的盘子上。
 * 请编写程序，用栈将所有盘子从第一根柱子移到最后一根柱子。
 *
 * 输入：A = [2, 1, 0], B = [], C = [] 输出：C = [2, 1, 0]   [2] [0] [1]   [2,0] [1][]     [2] [1, 0] []  [][1,0][2]  [1][0][2]  [][0][2,1]  [][][2,1,0]
 * 输入：A = [4, 3, 2, 1, 0], B = [], C = [] 输出：C = [4, 3, 2, 1, 0]
 * 43210
 * 4321 0
 * 432 0 1
 * 432   10
 * 一层汉诺塔 [1][][]    -> [][][1]
 * 两层汉诺塔 [2,1][][]  -> [][][2,1]
 * 输入：A = [1, 0], B = [], C = []  输出：C = [1, 0]
 *
 * @param {number[]} A A中盘子的数目不大于14个。
 * @param {number[]} B
 * @param {number[]} C
 * @return {void} Do not return anything, modify C in-place instead.
 */
var hanota = function (A, B, C) {
    const size = A.length
    /**
     *
     * @param {*} size   需要移动的盘子数量
     * @param {*} start  当前移动的盘子
     * @param {*} use    辅助移动的盘子
     * @param {*} target 目标盘子
     * @returns
     */
    function dfs(size, a, b, c) {
        if (size === 1) {
            // 只剩一个盘子，直接移到目标盘子
            c.push(a.pop())
            return
        }
        dfs(size - 1, a, c, b) // 将n-1从A移动到B
        c.push(a.pop()) // n-1移走了，还剩最后一个最大的底盘，移动到C
        dfs(size - 1, b, a, c) // 将n-1从B移动到C，这里移动的是，借助了C作为辅助盘，因为C经过上面的操作，C是最大的底盘，所以可以继续当辅助盘用
    }
    dfs(size, A, B, C)
}

/** 面试题 10.01. 合并排序的数组
 * 给定两个排序后的数组 A 和 B，其中 A 的末端有足够的缓冲空间容纳 B
 * 编写一个方法，将 B 合并入 A 并排序。
 * A = [1,2,3,0,0,0], m = 3
 * B = [2,5,6],       n = 3
 * 初始化 A 和 B 的元素数量分别为 m 和 n。
 * 输出: [1,2,2,3,5,6]
 * @param {number[]} A A.length == n + m
 * @param {number} m
 * @param {number[]} B
 * @param {number} n
 * @return {void} Do not return anything, modify A in-place instead.
 */
var merge = function (A, m, B, n) {
    // api
    A.splice(m, A.length - m, ...B)
    A.sort((a, b) => a - b)

    // 手动并入
    const res = []
    let right = 0
    for (let left = 0; left < m; left++) {
        const cur = A[left]
        // 将B并入并排序
        while (B[right] < cur && right < n) {
            res.push(B[right])
            right++
        }
        res.push(cur)
    }
    while (right < n) {
        res.push(B[right])
        right++
    }
    for (let i = 0; i < m; i++) {
        A[i] = res[i]
    }
}

/** 面试题 10.05. 稀疏数组搜索
 * 稀疏数组搜索。有个排好序的字符串数组，其中散布着一些空字符串，编写一种方法，找出给定字符串的位置。
 * 输入: words = ["at", "", "", "", "ball", "", "", "car", "", "","dad", "", ""], s = "ta"  输出：-1
 * @param {string[]} words
 * @param {string} s
 * @return {number}
 */
var findString = function (words, s) {
    for (let i = 0; i < words.length; i++) {
        if (words[i] === s) return i
    }
    return -1

    // 前后指针更高效O(N/2)
    let left = 0,
        right = words.length
    while (left <= right) {
        if (words[left] === s) {
            return left
        } else if (words[right] === s) {
            return right
        }
        left++
        right--
    }
    return -1
}

/** 面试题 16.05. 阶乘尾数
 * 设计一个算法，算出 n 阶乘有多少个尾随零。
 * 输入: 3   输出: 0  解释: 3! = 6, 尾数中没有零。 1 * 2 * 3
 * 输入: 5   输出: 1  解释: 5! = 120, 尾数中有 1 个零  1 * 2 * 3 * 4 * 5
 * @param {number} n
 * @return {number}
 * 你算法的时间复杂度应为 O(log n)
 */
var trailingZeroes = function (n) {
    // 求0的个数，推导为存在多少个 2 * 5，5在2的后面，那么求5的个数即可
    let count = 0
    let num = n
    while (num >= 5) {
        num = Math.floor(num / 5)

        count += num
    }
    return count
}

/** 面试题 16.07. 最大数值
 * 编写一个方法，找出两个数字a和b中最大的那一个。不得使用if-else或其他比较运算符
 * 输入： a = 1, b = 2 输出： 2
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var maximum = function (a, b) {
    // return Math.max(a, b)
    return (Math.abs(a - b) + a + b) / 2
}

/** 面试题 16.11. 跳水板
 * 你正在使用一堆木板建造跳水板
 * 有两种类型的木板，其中长度较短的木板长度为shorter，长度较长的木板长度为longer
 * 你必须正好使用k块木板。编写一个方法，生成跳水板所有可能的长度
 * 返回的长度需要从小到大排列。
 *
 * 输入： shorter = 1 longer = 2   k = 3  输出： [3,4,5,6]
 *   1           2
 *  1   2      1    2
 * 1 2 1 2    1 2  1 2
 * 解释： 可以使用 3 次 shorter，得到结果 3；使用 2 次 shorter 和 1 次 longer，得到结果 4 。以此类推，得到最终结果
 * @param {number} shorter 0 < shorter <= longer
 * @param {number} longer  0 <= k <= 100000 -> 由于length足够大，所以没法用递归
 * @param {number} k
 * @return {number[]}
 */
var divingBoard = function (shorter, longer, k) {
    if (k === 0) return []
    if (shorter === longer) return [shorter * k]
    const res = []
    for (let i = 0; i <= k; i++) {
        // 取长补短
        res[i] = shorter * [k - i] + longer * i
    }
    return res

    // 回溯超时，k的值太大
    // const canUse = [shorter, longer]
    // const res = []
    // function trackingBack(k, count) {
    //     if (k === 0) {
    //         if (!res.includes(count)) {
    //             res.push(count)
    //         }
    //         return
    //     }
    //     for (let i = 0; i < canUse.length; i++) {
    //         const use = canUse[i]
    //         trackingBack(k - 1, count + use)
    //     }
    // }
    // trackingBack(k, 0)
    // console.log(res)
    // return res.sort((a, b) => a - b)
}

/** 面试题 16.15. 珠玑妙算
 *
 * 思路： hash表
 *
 * 计算机有4个槽，每个槽放一个球，颜色可能是红色（R）、黄色（Y）、绿色（G）或蓝色（B）
 * 例如，计算机可能有RGGB 4种（槽1为红色，槽2、3为绿色，槽4为蓝色）。
 * 作为用户，你试图猜出颜色组合。
 * 打个比方，你可能会猜YRGB。
 *
 * 猜对某个槽的颜色，则算一次“猜中”；
 * 只猜对颜色但槽位猜错了，则算一次“伪猜中”。注意，“猜中”不能算入“伪猜中”。
 *
 * 给定一种颜色组合solution和一个猜测guess，编写一个方法，返回猜中和伪猜中的次数answer，其中answer[0]为猜中的次数，answer[1]为伪猜中的次数。
 *
 * 输入： solution="RGBY",guess="GGRR"  输出： [1,1]  解释： 猜中1次，伪猜中1次。
 * @param {string} solution
 * @param {string} guess
 * len(solution) = len(guess) = 4
 * solution和guess仅包含"R","G","B","Y"这4种字符
 * @return {number[]}
 */
var masterMind = function (solution, guess) {
    const solLen = solution.length
    const colorlMap = {
        R: 0,
        G: 0,
        B: 0,
        Y: 0,
    }
    const resetGes = []
    let count = 0
    let difCount = 0
    for (let i = 0; i < solLen; i++) {
        const sol = solution[i]
        const ges = guess[i]
        if (sol === ges) {
            count++
        } else {
            colorlMap[sol]++
            resetGes.push(ges)
        }
    }
    for (let j = 0; j < resetGes.length; j++) {
        const key = resetGes[j]
        if (colorlMap[key] > 0) {
            difCount++
            colorlMap[key]--
        }
    }
    return [count, difCount]
}

/** 面试题 17.01. 不用加号的加法
 * 设计一个函数把两个数字相加。不得使用 + 或者其他算术运算符
 * 输入: a = 1, b = 1  输出: 2
 * a, b 均可能是负数或 0
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var add = function (a, b) {
    /**
     * 求 a + b
     * a & b 获取进位， << 1 拿到进位后的值
     * a ^ b 获取
     */
    while (b !== 0) {
        const carry = (a & b) << 1 // 进位结果
        a = a ^ b // 无进位加法结果 与 进位结果的和
        b = carry
    }
    return a
}

/** 面试题 17.04. 消失的数字
 * 数组nums包含从0到n的所有整数，但其中缺了一个。请编写代码找出那个缺失的整数。你有办法在O(n)时间内完成吗？
 * 输入：[3,0,1]  输出：2
 * 输入：[9,6,4,2,3,5,7,0,1] 输出：8
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
    const numsLen = nums.length
    nums.sort((a, b) => a - b)
    for (let i = 0; i < numsLen; i++) {
        if (nums[i] !== i) {
            return i
        }
    }
    return numsLen // 缺少最后一位
}

/** 面试题 17.10. 主要元素
 * 数组中占比超过一半的元素称之为主要元素。给你一个 整数 数组，找出其中的主要元素 若没有，返回 -1
 * 请设计时间复杂度为 O(N) 、空间复杂度为 O(1) 的解决方案
 * 输入：[1,2,5,9,5,9,5,5,5] 输出：5
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
    const numsLen = nums.length
    if (numsLen === 0) return -1
    if (numsLen === 1) return nums[0]
    nums.sort((a, b) => a - b) // 因为有排序，所以其实时间复杂度已经不是 0(n) 了
    let count = 0
    let halfFlag = numsLen / 2
    for (let i = 1; i < numsLen; i++) {
        if (nums[i] === nums[i - 1]) {
            count++
            if (count > halfFlag) return nums[i]
            // if(count * 2 > numsLen) return nums[i]
        } else {
            count = 0
        }
    }
    return -1
}

/** 152. 乘积最大子数组
 * 给你一个整数数组 nums ，请你找出数组中乘积最大的非空连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积
 * 子数组 是数组的连续子序列
 * @param {number[]} nums 1 <= nums.length <= 2 * 104
 * @return {number} -10 <= nums[i] <= 10
 */
var maxProduct = function (nums) {
    if (nums.length === 1) return nums[0]
    const numsLen = nums.length
    let res = 0
    let max = 1
    let min = 1
    for (let i = 0; i < numsLen; i++) {
        if (nums[i] < 0) {
            // 由于存在负数，那么会导致最大的变最小的，最小的变最大的。因此还需要维护当前最小值imin
            const temp = max
            max = min
            min = temp
        }
        max = Math.max(max * nums[i], nums[i])
        min = Math.min(min * nums[i], nums[i])
        res = Math.max(max, res)
    }
    return res
    /** 动态规划思路
     *
     * 对于每一次遍历的数都有两个选择，一个是累积乘积，一个是以当前数为起点重新乘积
     *
     * dp[i][0] = Math.max()
     * dp[i][1] = dp[i-1][1]
     *
     * dp[i][0] 不继续累加
     * dp[i][1] 乘以当前数的最大乘积
     */
    const numsLen = nums.length
    let p = nums[0]
    let maxP = nums[0]
    let minP = nums[0]
    for (let i = 1; i < numsLen; i++) {
        // 更新当前节点的最大值和最小值
        const curMax = maxP
        maxP = Math.max(maxP * nums[i], nums[i], minP * nums[i])
        minP = Math.min(curMax * nums[i], nums[i], minP * nums[i])
        p = Math.max(maxP, p)
    }
    return p
}

/** 64. 最小路径和
 * 给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
 * 说明：每次只能向下或者向右移动一步。
 * 1 3 1
 * 1 5 1
 * 4 2 1
 * 输入：grid = [[1,3,1],[1,5,1],[4,2,1]] 输出：7 解释：因为路径 1→3→1→1→1 的总和最小
 *
 * 1 2 3
 * 4 5 6
 * 输入：grid = [[1,2,3],[4,5,6]]
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
    /** 动态规划 | 二维数组 dp[i][j] = Math.min(dp[i-1][j-1], dp[i-1][j]) + grid[i][j] */
    const rowLen = grid.length
    const dp = []
    for (let i = 0; i < rowLen; i++) {
        const row = grid[i]
        const columnLen = row.length
        for (let j = 0; j < columnLen; j++) {
            /** 找到递推公式 */
            if (dp[i] === undefined) {
                dp[i] = []
            }
            if (i === 0) {
                if (j === 0) {
                    dp[0][0] = grid[0][0]
                } else {
                    dp[0][j] = dp[0][j - 1] + grid[0][j]
                }
            } else {
                if (j === 0) {
                    dp[i][0] = dp[i - 1][0] + grid[i][0]
                } else {
                    dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
                }
            }
        }
    }
    return dp[rowLen - 1][grid[0].length - 1]
}

/** 75. 颜色分类
 * 给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
 * 我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色
 * 必须在不使用库内置的 sort 函数的情况下解决这个问题。
 *
 * 排序规则： 红 -> 白 -> 蓝 即 0 -> 1 -> 2
 *
 * 输入：nums = [2,0,2,1,1,0]  输出：[0,0,1,1,2,2]
 * @param {number[]} nums  1 <= nums.length <= 300
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
    // 排序问题 - 手动实现

    /** 冒泡的遍历次数太多了 */
    // const numLen = nums.length
    // if (numLen === 1) return nums
    // for (let i = 0; i < numLen - 1; i++) {
    //     for (let j = 0; j < numLen - 1 - i; j++) {
    //         if (nums[j] > nums[j + 1]) {
    //             const temp = nums[j]
    //             nums[j] = nums[j + 1]
    //             nums[j + 1] = temp
    //         }
    //     }
    // }

    const numLen = nums.length
    let useIdx = 0
    for (let i = 0; i < numLen; i++) {
        // 第一次遍历将0替换到前面
        if (nums[i] === 0) {
            const temp = nums[i]
            nums[i] = nums[useIdx]
            nums[useIdx] = temp
            useIdx++
        }
    }
    for (let i = useIdx; i < numLen; i++) {
        // 第一次遍历将1替换到前面
        if (nums[i] === 1) {
            const temp = nums[i]
            nums[i] = nums[useIdx]
            nums[useIdx] = temp
            useIdx++
        }
    }

    /** 合并两次遍历，一次性交换0和1 */
    const numLen = nums.length
    let p0 = 0,
        p1 = 0
    for (let i = 0; i < numLen; i++) {
        if (nums[i] === 0) {
            const temp = nums[i]
            nums[i] = nums[p0]
            nums[p0] = temp
            // 由于P1也是从0，开始计数，要交换p0,p1
            /**
             * 比如 nums = [2,0,2,1,1,0]
             * 第1次交换0，遍历到节点0，下标为1       [2,0,2,1,1,0] -> [0,2,2,1,1,0]
             * 第1次交换1，遍历到节点1，下标为3       [0,2,2,1,1,0] -> [0,1,2,2,1,0]
             * 第2次交换1，遍历到第二个节点1，下标为4  [0,1,2,2,1,0] -> [0,1,1,2,2,0]
             * 第2次交换0，遍历到第二个节点0，下标为5  [0,1,1,2,2,0] -> [0,0,1,2,2,1]
             */
            if (p0 !== p1) {
                // 此时p0<p1,在0之前有交换1，导致p0!==p1;此时需要将当前p0,即交换之后的nums[i]，与 nums[p1]交换
                const temp = nums[i]
                nums[i] = nums[p1]
                nums[p1] = temp
            }
            // p1也要跟随p0++
            p0++
            p1++
        } else if (nums[i] === 1) {
            const temp = nums[i]
            nums[i] = nums[p1]
            nums[p1] = temp
            p1++
        }
    }
}

/** 56. 合并区间
 * 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi]
 * 请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间
 *
 * 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]  输出：[[1,6],[8,10],[15,18]] 解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
 * 输入：intervals = [[1,4],[4,5]]  输出：[[1,5]]  解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
 *
 * @param {number[][]} intervals 1 <= intervals.length <= 104  intervals[i].length == 2
 * @return {number[][]}
 */
var merge = function (intervals) {
    const len = intervals.length
    if (len === 1) return intervals
    // 先排序
    intervals = intervals.sort((a, b) => {
        return a[0] - b[0]
    })
    const res = [intervals[0]]
    for (let i = 1; i < len; i++) {
        const cur = intervals[i]
        const last = res[res.length - 1]
        if (cur[0] >= last[1] && cur[0] <= last[1]) {
            // 有交集
            if (cur[1] > last[1]) {
                last[1] = cur[1]
            }
        } else if (cur[0] >= last[0] && cur[1] <= last[1]) {
            // 是子集
            continue
        } else {
            res.push(cur)
        }
    }
    return res
}

/** 55. 跳跃游戏
 * 给你一个非负整数数组 nums ，你最初位于数组的 第一个下标 。数组中的每个元素代表你在该位置可以跳跃的最大长度
 * 判断你是否能够到达最后一个下标，如果可以，返回 true ；否则，返回 false
 *
 * 输入：nums = [2,3,1,1,4]  输出：true
 * 解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。
 *
 * 输入：nums = [3,2,1,0,4]  输出：false
 * 解释：无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ， 所以永远不可能到达最后一个下标。
 * @param {number[]} nums  1 <= nums.length <= 10^4   0 <= nums[i] <= 105
 * @return {boolean}
 */
var canJump = function (nums) {
    // 能不能递归解决呢，从最后一格往前找答案; 最后用回溯解决了
    const numLen = nums.length
    let res = false
    function backTracking(idx, resetStep) {
        // resetStep: 剩余可走步数
        if (idx > nums.length - 1) return
        if (idx === nums.length - 1) {
            res = true
        }
        const curStep = nums[idx]
        if (curStep + resetStep === 0) return
        const canUseStep = Math.max(curStep, resetStep)
        backTracking(idx + 1, canUseStep - 1)
    }

    backTracking(0, 0)

    return res

    // 贪心算法，找到能达到的最右位置，并不断更新位置节点，如果位置节点 >= 最后一个节点，那么返回 true, 否则返回flase; 整个思路感觉跟回溯是类似的
    const numLen = nums.length
    let rightMost = 0
    for (let i = 0; i < numLen; i++) {
        if (i <= rightMost) {
            rightMost = Math.max(rightMost, i + nums[i])
            if (rightMost >= numLen - 1) {
                return true
            }
        }
    }
    return false
}

/** 49. 字母异位词分组
 * 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表
 * 字母异位词 是由重新排列源单词的所有字母得到的一个新单词
 *
 *
 *
 * 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
 * 输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
 *
 * 输入: strs = [""]  输出: [[""]]
 *
 * 输入: strs = ["a"]  输出: [["a"]]
 * @param {string[]} strs  1 <= strs.length <= 104  strs[i] 仅包含小写字母
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
    /** 找出由相同字母组成的单词，并分为一个组 */
    const strLen = strs.length
    if (strLen === 1) return [strs]

    const groupMap = {}

    for (let i = 0; i < strLen; i++) {
        const curStr = strs[i].split('')
        // 先将字符排序，然后用mapHash 保存排序后的下标，在后续的遍历中，只要排序后的字符一致，那么下标保存到同一个数组中
        curStr.sort()

        if (groupMap[curStr]) {
            groupMap[curStr].push(i)
        } else {
            groupMap[curStr] = [i]
        }
    }

    return Object.keys(groupMap).map((_item) => {
        return groupMap[_item].map((_index) => strs[_index])
    })
}

/** 40. 组合总和 II
 * 给定一个候选人编号的集合 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合
 * candidates 中的每个数字在每个组合中只能使用 一次
 * 输入: candidates = [10,1,2,7,6,1,5], target = 8
 * 先排序： [ 1,1,2,5,6,7,10 ]
 *            8
 *     1               1 2 5 6 7 10
 * 1 2 5 6 7 10
 *
 * 输出:[[1,1,6],[1,2,5],[1,7],[2,6]]
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
    candidates.sort((a, b) => a - b)

    const res = []

    const len = candidates.length
    function backTracking(target, combine, idx, useFlag) {
        if (target < 0) return
        if (target === 0) {
            res.push(combine)
            return
        }
        for (let i = idx; i < len; i++) {
            // 处理去重逻辑, 同时要避免 1,1,6 这种组合被影响，所以要判断在第二次重复的时候做去重，即for循环在第二个1开始递归的时候
            // 如果判断for循环是在第二个1开始，此时第一个1是未使用的, 定义一个数组，用来保存相应下标的使用状态
            if (i > 0 && candidates[i] === candidates[i - 1] && !useFlag[i - 1]) continue
            useFlag[i] = true
            backTracking(target - candidates[i], [...combine, candidates[i]], i + 1, [...useFlag])
            useFlag[i] = false
        }
    }

    backTracking(target, [], 0, [])

    return res
}

/** 46. 全排列 - 回溯
 * 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案
 * 输入：nums = [1,2,3]  输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 *    1             2                  3
 *  2   3        1     3            1     2
 * 3     2      3         1       2          1
 * @param {number[]} nums 1 <= nums.length <= 6
 * @return {number[][]}   -10 <= nums[i] <= 10
 */
var permute = function (nums) {
    const res = []
    function backTracking(arr) {
        if (arr.length === nums.length) {
            res.push(arr)
            return
        }
        for (let i = 0; i < nums.length; i++) {
            if (arr.includes(nums[i])) continue
            backTracking([...arr, nums[i]])
        }
    }
    backTracking([])
    return res
}

/**39. 组合总和
 * 给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，
 * 找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合
 * candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的
 *
 * 输入：candidates = [2,3,6,7], target = 7  输出：[[2,2,3],[7]]   2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次
 * 输入: candidates = [2,3,5], target = 8    输出: [[2,2,2,2],[2,3,3],[3,5]]
 * 输入: candidates = [2], target = 1        输出: []
 * @param {number[]} candidates 1 <= candidates.length <= 30
 * @param {number} target       1 <= target <= 40
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
    // 回溯算法 以 [2,3,6,7] 为例
    //
    const ans = []

    function dfs(target, combine, idx) {
        if (idx === candidates.length) return
        if (target === 0) {
            // target 为 0， 即得到组合综合 = target
            ans.push(combine)
            return
        }
        dfs(target, combine, idx + 1) // 递归处理下一个数
        if (target - candidates[idx] >= 0) {
            // 当前数处理，每个数字可以被无限制重复选取，所以这里idx可以不变
            dfs(target - candidates[idx], [...combine, candidates[idx]], idx)
        }
    }

    dfs(target, [], 0)

    return ans
}

/** 551. 学生出勤记录 I
 * 给你一个字符串 s 表示一个学生的出勤记录，其中的每个字符用来标记当天的出勤情况
 * 'A'：Absent，缺勤
 * 'L'：Late，迟到
 * 'P'：Present，到场
 * 如果学生能够 同时 满足下面两个条件，则可以获得出勤奖励
 * 1. 按 总出勤 计，学生缺勤（'A'）严格 少于两天
 * 2. 学生 不会 存在 连续 3 天或 连续 3 天以上的迟到（'L'）记录
 * 如果学生可以获得出勤奖励，返回 true ；否则，返回 false
 * 输入：s = "PPALLP" 输出：true 学生缺勤次数少于 2 次，且不存在 3 天或以上的连续迟到记录
 * @param {string} s
 * @return {boolean}
 */
var checkRecord = function (s) {
    const lateMap = new Map()
    const sLen = s.length
    let count = 0
    for (let i = 0; i < sLen; i++) {
        const cur = s[i]
        if (cur === 'A') {
            if (lateMap.has('A')) {
                return false
            }
            lateMap.set('A', true)
            count = 0
        } else if (cur === 'L') {
            count++
            if (count === 3) return false
        } else {
            count = 0
        }
    }
    return true
}

/** 541. 反转字符串 II
 * 给定一个字符串 s 和一个整数 k，从字符串开头算起，每计数至 2k 个字符，就反转这 2k 字符中的前 k 个字符
 * 如果剩余字符少于 k 个，则将剩余字符全部反转。
 * 如果剩余字符小于 2k 但大于或等于 k 个，则反转前 k 个字符，其余字符保持原样。
 * 输入：s = "abcdefg", k = 2  输出："bacdfeg" ab,ef需要反转
 * @param {string} s 1 <= s.length <= 10^4
 * @param {number} k 1 <= k <= 10^4
 * @return {string}
 */
var reverseStr = function (s, k) {
    /**
     * 每计数至 2k 个字符，就反转这 2k 字符中的前 k 个字符
     * < 循环周期: 2k； 反转范围: k >
     * 边界条件：
     * 0 < (i + 1) % (2 * k) < k
     * 1. 剩余字符少于 k 个，剩余字符全部反转
     * 2. 剩余字符小于2k，大于等于k，反转前K个字符
     */
    // const strLen = s.length
    // if (strLen === 1) return s
    // const strList = s.split('')
    // if (strLen <= k) return strList.reverse().join('')
    // let res = []
    // let handList = []
    // for (let i = 0; i < strLen; i++) {
    //     const str = s[i]
    //     const flag = (i + 1) % (2 * k)
    //     if (flag <= k && flag > 0) {
    //         // 这是需要反转的字符区间
    //         handList.push(str)
    //     } else {
    //         handList.reverse()
    //         res.push(...handList, str)
    //         handList = []
    //     }
    // }
    // if (handList.length) {
    //     handList.reverse()
    //     res.push(...handList)
    // }
    // return res.join('')

    /** 不用 reverse */
    const strLen = s.length
    if (strLen === 1) return s
    // const res = Array.from(s)
    const res = s.split('')
    for (let i = 0; i < strLen; i += 2 * k) {
        let left = i,
            right = Math.min(i + k, strLen) - 1
        while (left < right) {
            const temp = res[left]
            res[left] = res[right]
            res[right] = temp
            left++
            right--
        }
    }
    return res.join('')
}

/** 34. 在排序数组中查找元素的第一个和最后一个位置
 *  给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置
 *  如果数组中不存在目标值 target，返回 [-1, -1]
 *  输入：nums = [5,7,7,8,8,10], target = 8  输出：[3,4]
 *  输入：nums = [], target = 0  输出：[-1,-1]
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
    if (nums.length === 0) return [-1, -1]
    // 1. 非递减顺序 -> 递增
    // api有点取巧了，这里可以用二分法找到target的初始化位置
    // const left = nums.findIndex((item) => item === target)
    // if (left < 0) return [-1, -1]
    // let right = left + 1
    // while (nums[right] === target) {
    //     right++
    // }
    // return [left, right - 1]

    // 两次for循环
    // const res = [-1, -1]
    // const numLen = nums.length
    // for (let i = 0; i < numLen; i++) {
    //     if (nums[i] === target) {
    //         res[0] = i
    //         break
    //     }
    // }
    // if (res[0] < 0) return res // 第一次for循环没有找到，直接返回
    // for (let i = numLen - 1; i >= 0; i--) {
    //     if (nums[i] === target) {
    //         res[1] = i
    //         break
    //     }
    // }
    // return res

    const numLen = nums.length
    let left = 0,
        right = numLen - 1,
        start = undefined
    while (left <= right) {
        const mid = parseInt((right + left) / 2)
        if (nums[mid] === target) {
            start = mid
            // right = left - 1
            break
            // 找到 mid 时， left <= right 不一定满足，所以需要手动 设置 right < left  或者 直接 break
        } else if (nums[mid] > target) {
            right = mid - 1
        } else {
            left = mid + 1
        }
    }
    if (start == undefined) return [-1, -1]
    let lf = start - 1,
        rh = start + 1
    while (nums[lf] === target || nums[rh] === target) {
        if (nums[lf] === target) {
            lf--
        }
        if (nums[rh] === target) {
            rh++
        }
    }
    return [lf + 1, rh - 1]
    console.log(mid)
}

/**
 * 31. 下一个排列
 *
 * 字典序: 对于数字1、2、3......n的排列，不同排列的先后关系是从左到右逐个比较对应的数字的先后来决定的
 * 例如对于5个数字的排列 12354和12345，排列12345在前，排列12354在后
 * 5个数字的所有的排列中最前面的是12345，最后面的是 54321
 *
 * 显然的做法是先按照第一个字母、以 a、b、c……z 的顺序排列；
 * 如果第一个字母一样，那么比较第二个、第三个乃至后面的字母。如果比到最后两个单词不一样长（比如，sigh 和 sight），那么把短者排在前
 *
 * 所以 对于 1,2,3 依次排序为：1,2,3 -> 1,3,2 -> 2,1,3 -> 2,3,1 -> 3,1,2 -> 3,2,1  (先比较第一位，然后比较第二位，保证下一个排列比上一个大)
 *
 * 整数数组的一个 排列  就是将其所有成员以序列或线性顺序排列
 * 整数数组的 下一个排列 是指其整数的下一个 字典序 更大的排列。
 * 更正式地，如果数组的所有排列根据其字典顺序从小到大排列在一个容器中，那么数组的 下一个排列 就是在这个有序容器中排在它后面的那个排列。
 * 如果不存在下一个更大的排列，那么这个数组必须重排为字典序最小的排列（即，其元素按升序排列）
 *
 * 给你一个整数数组 nums ，找出 nums 的下一个排列
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 *
 * 必须 原地 修改，只允许使用额外常数空间
 */
var nextPermutation = function (nums) {
    // 有成员以序列或线性顺序排列
    const numsLen = nums.length
    if (numsLen === 1) return nums
    if (numsLen === 2) return nums.reverse()
    let left = numsLen - 2
    let right = numsLen - 1

    while (left >= 0) {
        if (nums[right] > nums[left]) {
            if (right === numsLen - 1) {
                const temp = nums[right]
                // 正好是最后一个，直接替换
                nums[right] = nums[left]
                nums[left] = temp
                return
            }
            // 找到递减序列的插入下标
            while (nums[right] > nums[left]) {
                right++
            }

            right--

            const temp = nums[right]
            nums[right] = nums[left]
            nums[left] = temp

            const sortNum = nums.slice(left + 1, numsLen)
            const sortLen = sortNum.length
            let index = 0
            for (let i = left + 1; i < numsLen; i++) {
                nums[i] = sortNum[sortLen - 1 - index]
                index++
            }
            return
        }
        right--
        left--
    }
    /** 当这里说明left是最大的,且当前数组是递减数组，那么直接反转即可 */
    nums.reverse()
}

/** 521. 最长特殊序列 Ⅰ
 * 「最长特殊序列」 定义如下：该序列为 某字符串独有的最长子序列（即不能是其他字符串的子序列） 。
 *
 *  字符串 s 的子序列是在从 s 中删除任意数量的字符后可以获得的字符串
 *  例如，"abc" 是 "aebdc" 的子序列，因为删除 "aebdc" 中 e d 字符可以得到 "abc" 。 "aebdc" 的子序列还包括 "aebdc" 、 "aeb" 和 "" (空字符串)
 *
 *  给你两个字符串 a 和 b，请返回 这两个字符串中 最长的特殊序列  的长度。如果不存在，则返回 -1
 *  输入: a = "aba", b = "cdc" 输出: 3  解释: 最长特殊序列可为 "aba" (或 "cdc")，两者均为自身的子序列且不是对方的子序列
 *  输入：a = "aaa", b = "bbb" 输出: 3  解释: 最长特殊序列是 "aaa" 和 "bbb" 。
 *  输入：a = "aaa", b = "aaa" 输出：-1 解释: 字符串 a 的每个子序列也是字符串 b 的每个子序列。同样，字符串 b 的每个子序列也是字符串 a 的子序列
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
var findLUSlength = function (a, b) {
    if (a === b) return -1
    const lenA = a.length
    const lenB = b.length
    return Math.max(lenA, lenB)
}

/**
 * 520. 检测大写字母 在以下情况时，单词的大写用法是正确的
 * 1. 全部字母都是大写，比如 "USA"
 * 2. 单词中所有字母都不是大写，比如 "leetcode"
 * 3. 如果单词不只含有一个字母，只有首字母大写， 比如 "Google"
 *
 * @param {string} word
 * @return {boolean}
 */
var detectCapitalUse = function (word) {
    const len = word.length
    if (len > 1) {
        const diffWord = word.slice(1, len)
        // 全部字母大写， 或者 首字母之外所有字母都是小写
        return word === word.toUpperCase() || diffWord === diffWord.toLowerCase()
    }
    return true
}

/** 509. 斐波那契数
 *  F(n) = F(n - 1) + F(n - 2)，其中 n > 1
 *  F(0) = 0，F(1) = 1
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
    if (n < 2) return n
    return fib(n - 1) + fib(n - 2)

    // 动态规划 - 解决栈堆积问题
    if (n < 2) {
        return n
    }
    let p = 0,
        q = 0,
        r = 1
    for (let i = 2; i <= n; i++) {
        p = q
        q = r
        r = p + q
    }
    return r
}

/**
 * 507. 完美数 对于一个 正整数，如果它和除了它自身以外的所有 正因子 之和相等，我们称它为 「完美数」
 *
 * 正因数，或称为正约数，指的是一个整数中大于0的因数。如：12的正因数有1，2，3，4，6，12。因数必须是整数，所以任何整数的最小正因数都是1
 *
 * 给定一个 整数 n， 如果是完美数，返回 true；否则返回 false。
 * 输入：num = 28  输出：true  解释：28 = 1 + 2 + 4 + 7 + 14   1, 2, 4, 7, 和 14 是 28 的所有正因子（2*14， 4*7）。
 * @param {number} num
 * @return {boolean}
 */
var checkPerfectNumber = function (num) {
    /** 先找到所有正因数，然后判断该整数是否等于所有正因数之和 */
    if (num === 1) return false

    let left = 2,
        right = num - 1
    let res = 0
    while (left < right) {
        if (left * right === num) {
            if (left === right) {
                res += left
            } else {
                res += left + right
            }
            left++
            right--
        } else if (left * right > num) {
            right--
        } else {
            left++
        }
    }
    console.log(res)
    return res + 1 === num
}

/** 506. 相对名次
 *  输入：score = [5,4,3,2,1]
 *  输出：["Gold Medal","Silver Medal","Bronze Medal","4","5"]
 *  名次第 1 的运动员获金牌 "Gold Medal"
 *  名次第 2 的运动员获银牌 "Silver Medal"
 *  名次第 3 的运动员获铜牌 "Bronze Medal"
 *  从名次第 4 到第 n 的运动员，只能获得他们的名次编号（即，名次第 x 的运动员获得编号 "x"）
 *  输入：score = [10,3,8,9,4] 输出：["Gold Medal","5","Bronze Medal","Silver Medal","4"]
 * @param {number[]} score
 * @return {string[]}
 */
var findRelativeRanks = function (score) {
    const sortScore = score.slice(0)
    sortScore.sort((a, b) => b - a)
    const scoreMap = {
        0: 'Gold Medal',
        1: 'Silver Medal',
        2: 'Bronze Medal',
    }
    const scoreUse = {}
    sortScore.forEach((_item, index) => {
        if (index <= 2) {
            scoreUse[_item] = scoreMap[index]
        } else {
            scoreUse[_item] = index + 1 + ''
        }
    })
    return score.map((item) => {
        return scoreUse[item]
    })
}

/** 504. 七进制数
 *  给定一个整数 num，将其转化为 7 进制，并以字符串形式输出
 *  输入: num = 100  输出: "202" 100 / 7 -> 14 余 2
 *  输入: num = -7 输出: "-10"
 * @param {number} num -107 <= num <= 107
 * @return {string}
 */
var convertToBase7 = function (num) {
    if (num === 0) return '0'
    let res = ''
    let useCount = Math.abs(num)
    while (useCount >= 7) {
        const curIdx = useCount % 7
        useCount = Math.floor(useCount / 7)
        res = curIdx + res
        console.log(res, useCount)
    }
    const absNum = useCount + res
    return num > 0 ? absNum : '-' + absNum
}

/** 500. 键盘行
 *  给你一个字符串数组 words ，只返回可以使用在 美式键盘 同一行的字母打印出来的单词
 *  第一行由字符 "qwertyuiop" 组成
 *  第二行由字符 "asdfghjkl" 组成
 *  第三行由字符 "zxcvbnm" 组成
 *
 *  hash对象
/**
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (words) {
    const strMap = {}

    const lineOne = 'qwertyuiop'.split('')
    lineOne.forEach((item) => (strMap[item] = 1))

    const lineTwo = 'asdfghjkl'.split('')
    lineTwo.forEach((item) => (strMap[item] = 2))

    const lineThree = 'zxcvbnm'.split('')
    lineThree.forEach((item) => (strMap[item] = 3))

    let res = []
    const wordsLen = words.length
    for (let i = 0; i < wordsLen; i++) {
        const useWord = words[i].toLowerCase()
        const key = useWord[0]
        let flag = strMap[key]
        let useFlag = true
        for (let i = 1; i < useWord.length; i++) {
            let curKey = useWord[i]
            if (strMap[curKey] !== flag) {
                useFlag = false
                break
            }
        }
        if (useFlag) {
            res.push(words[i])
        }
    }
    return res
}

/** 495. 提莫攻击
 *  输入：timeSeries = [1,4], duration = 2  输出：4
 *
 *  输入：timeSeries = [1,2], duration = 2  输出：3
 *  - 第 1 秒，提莫攻击艾希并使其立即中毒。中毒状态会维持 2 秒，即第 1 秒和第 2 秒。
 *  - 第 2 秒，提莫再次攻击艾希，并重置中毒计时器，艾希中毒状态需要持续 2 秒，即第 2 秒和第 3 秒
 *  艾希在第 1、2、3 秒处于中毒状态，所以总中毒秒数是 3
 * @param {number[]} timeSeries
 * @param {number} duration
 * @return {number}
 */
var findPoisonedDuration = function (timeSeries, duration) {
    /** 攻击间隔时间 - 持续时间duration = 当前攻击有效时间
     *  攻击持续时间计算：前一次攻击开始算，后一次攻击不算，属于前闭合
     */
    const len = timeSeries.length
    let res = 0
    for (let i = 1; i < len; i++) {
        const timeDiff = timeSeries[i] - timeSeries[i - 1]
        // 前后diff的时间差来计算重置中毒计时器累加的有效时间
        const usefulTime = timeDiff > duration ? duration : timeDiff
        res += usefulTime
    }
    // 最后一次加上 duration
    return res + duration
}

/** 492. 构造矩形
 *  你的任务是设计一个长度为 L 和宽度为 W 且满足以下要求的矩形的页面：
 *  1. 设计的矩形页面必须等于给定的目标面积
 *  2. 宽度 W 不应大于长度 L ，换言之，要求 L >= W
 *  3. 长度 L 和宽度 W 之间的差距应当尽可能小
 *  返回一个 数组 [L, W]，其中 L 和 W 是你按照顺序设计的网页的长度和宽度
 *
 *  输入: area = 37  输出: [37,1]
 * @param {number} area
 * @return {number[]}
 */
var constructRectangle = function (area) {
    // 乘积问题, 从中点往上找，找到第一个符合的整除数

    // 官方解法：% 取值

    /** 因为w是短边，所以初始值向下取整 */
    let w = Math.floor(Math.sqrt(area))
    while (area % w !== 0) {
        --w
    }
    return [Math.floor(area / w), w]

    // 双指针遍历
    let mid = Math.ceil(Math.sqrt(area))

    if (mid * mid === area) return [mid, mid]

    let left = (right = mid)

    while (left <= right) {
        if (left * right === area) {
            return [right, left]
        } else if (left * right < area) {
            right++
        } else {
            left--
        }
    }
    return [right, left]
}

/** 485. 最大连续 1 的个数
 * 给定一个二进制数组 nums ， 计算其中最大连续 1 的个数
 * 输入：nums = [1,1,0,1,1,1] 输出：3
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function (nums) {
    // 思路，既然是二进制数，那么先将0切割，然后逐个对比长度
    const str = nums.join('')
    const numsList = str.split('0')
    const numLen = numsList.length
    let max = 0
    for (let i = 0; i < numLen; i++) {
        const len = numsList[i].length
        max = Math.max(max, len)
    }
    return max

    // 正常遍历, 性能更好，不需要数组转换
    let maxCount = 0,
        count = 0
    const n = nums.length
    for (let i = 0; i < n; i++) {
        if (nums[i] === 1) {
            count++
        } else {
            maxCount = Math.max(maxCount, count)
            count = 0
        }
    }
    maxCount = Math.max(maxCount, count)
    return maxCount
}

/** 482. 密钥格式化
 *  给定一个许可密钥字符串 s，仅由字母、数字字符和破折号组成。字符串由 n 个破折号分成 n + 1 组。你也会得到一个整数 k
 *
 * 输入：S = "5F3Z-2e-9-w", k = 4 输出："5F3Z-2E9W" 字符串 S 被分成了两个部分，每部分 4 个字符；注意，两个额外的破折号需要删掉。
 * 输入：S = "2-5g-3-J", k = 2  输出："2-5G-3J" 字符串 S 被分成了 3 个部分，按照前面的规则描述，第一部分的字符可以少于给定的数量，其余部分皆为 2 个字符
 *
 * 重新格式化字符串 s，使每一组包含 k 个字符，除了第一组，它可以比 k 短，但仍然必须包含至少一个字符。此外，两组之间必须插入破折号，并且应该将所有小写字母转换为大写字母。
 * @param {string} s 1 <= s.length <= 105 只包含字母、数字和破折号 '-'.
 * @param {number} k 1 <= k <= 104
 * @return {string}
 */
var licenseKeyFormatting = function (s, k) {
    /**
     * 1. 每一组包含 k 个字符(除了第一组)；
     * 2. 除了第一组，它可以比 k 短，但仍然必须包含至少一个字符
     */
    // 以下思路只保证了第一组外，剩下的各组依次平分剩下的字符，但是无法保证第一组之外的每一个组包含 k 个字符
    // s = s.toUpperCase()
    // if (s.length === 1) return s
    // const str = s.split('-')
    // const strLen = str.length
    // let flowStr = '' // 上一节处理溢出的字符
    // let res = ''
    // for (let i = 0; i < strLen; i++) {
    //     const item = flowStr + str[i]
    //     let count = item
    //     if (item.length > k) {
    //         count = item.slice(0, k)
    //         flowStr = item.slice(k, item.length)
    //     } else if (i > 0 && item.length < k) {
    //         // 小于k ，更新溢出的字符
    //         flowStr = item
    //         continue
    //     } else {
    //         flowStr = ''
    //     }
    //     if (res === '') {
    //         res += count
    //     } else {
    //         res = res + '-' + count
    //     }
    // }
    // return flowStr ? res + '-' + flowStr : res

    /** 思路如下：
     * 1. 确定第一段数据，需要保留几个，以确保后续每一段的字符长度都是 k
     * 2. 统一小写转换为大写
     * 3. 去掉'-'
     *
     * 官方题解思路：
     * 1. 从后往前遍历，将每一个字符存入数组中，用一个变量计算当前字符长度，每 k 长度, 数组推入 '-'
     * 2. 最后一项去掉'-'
     * 3. 反转数组并合并所有项
     */
    s = s.toUpperCase()
    if (s.length === 1) return s.replace(/-/g, '') // 首字符如果包含'-'，还需要考虑到
    let getFirst = s.replace(/-/g, '')
    const firstLen = getFirst.length % k || k
    const str = s.split('')
    const strLen = str.length
    let flowStr = '' // 上一节处理溢出的字符
    let res = ''
    for (let i = 0; i < strLen; i++) {
        if (str[i] === '-') continue
        const item = flowStr + str[i]
        let count = item

        // 第一行特殊处理-或者说第一段数据
        if (i === 0 || res === '') {
            if (item.length < firstLen) {
                flowStr = count
                continue
            } else {
                count = item.slice(0, firstLen)
                flowStr = item.slice(firstLen, item.length)
            }
        } else if (item.length > k) {
            count = item.slice(0, k)
            flowStr = item.slice(k, item.length)
        } else if (item.length < k) {
            // 小于k ，更新溢出的字符
            flowStr = item
            continue
        } else {
            flowStr = ''
        }
        if (res === '') {
            res += count
        } else {
            res = res + '-' + count
        }
    }
    return flowStr ? res + '-' + flowStr : res

    // 以下是官方思路：
    // const ans = [];
    // let cnt = 0;

    // for (let i = s.length - 1; i >= 0; i--) {
    //     if (s[i] !== '-') {
    //         cnt++;
    //         ans.push(s[i].toUpperCase());
    //         if (cnt % k === 0) {
    //             ans.push("-");
    //         }
    //     }
    // }
    // if (ans.length > 0 && ans[ans.length - 1] === '-') {
    //     ans.pop();
    // }

    // return ans.reverse().join('');
}
console.log(licenseKeyFormatting('2-4A0r7-4k'))

/** 455. 分发饼干
 *  对每个孩子 i，都有一个胃口值 g[i]，这是能让孩子们满足胃口的饼干的最小尺寸；并且每块饼干 j，都有一个尺寸 s[j] 。
 *  如果 s[j] >= g[i]，我们可以将这个饼干 j 分配给孩子 i ，这个孩子会得到满足。你的目标是尽可能满足越多数量的孩子，并输出这个最大数值
 *  输入: g = [1,2,3], s = [1,1] 输出: 1
 *  输入: g = [1,2], s = [1,2,3] 输出: 2
 * @param {number[]} g 1 <= g.length <= 3 * 10^4
 * @param {number[]} s 0 <= s.length <= 3 * 10^4
 * @return {number}
 */
var findContentChildren = function (g, s) {
    if (s.length == 0) return 0
    // 找到满足 s[j] > g[i] 的最大数值
    g.sort((a, b) => a - b)
    s.sort((a, b) => a - b)
    let left = 0
    let right = 0
    let gLen = g.length
    let sLen = s.length

    let res = 0
    // 从最小的开始分配能保证数值最大吗
    while (left < gLen && right < sLen) {
        // while的循环条件要用 &&
        if (g[left] <= s[right]) {
            // 可以满足
            res++
            left++
        }
        // 每次循环，食物都是要变动的
        right++
    }
    return res
}

/** 448. 找到所有数组中消失的数字
 *  给你一个含 n 个整数的数组 nums ，其中 nums[i] 在区间 [1, n] 内。请你找出所有在 [1, n] 范围内但没有出现在 nums 中的数字，并以数组的形式返回结果
 *  输入：nums = [4,3,2,7,8,2,3,1] 输出：[5,6]
 *  输入：nums = [1,1] 输出：[2]
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
    // 区间范围为 [1, n]
    nums.sort((a, b) => a - b)
    let left = 1, // 1-n 的下标
        right = 0
    const res = []
    // 补中间遗漏
    while (right < nums.length) {
        if (nums[right] === left) {
            left++
        } else if (nums[right] > left) {
            res.push(left)
            left++
            continue
        }
        right++
    }
    // 补尾数不够
    const len = nums.length
    while (len - left >= 0) {
        res.push(left)
        left++
    }
    return res
}

/** 441. 排列硬币
 *  你总共有 n 枚硬币，并计划将它们按阶梯状排列。对于一个由 k 行组成的阶梯，其第 i 行必须正好有 i 枚硬币。阶梯的最后一行 可能 是不完整的
 *  给你一个数字 n ，计算并返回可形成 完整阶梯行 的总行数
 *  1 <= n <= 231 - 1
 * @param {number} n
 * @return {number}
 */
var arrangeCoins = function (n) {
    if (n === 1) return 1
    let row = 1
    n--
    while (n > row) {
        const curNeed = row + 1
        const rest = n - curNeed
        if (rest >= 0) {
            row++
        }
        n = rest
    }
    return row
}

/** 434. 字符串中的单词数
 *  统计字符串中的单词个数，这里的单词指的是连续的不是空格的字符
 *  请注意，你可以假定字符串里不包括任何不可打印的字符
 *  输入: "Hello, my name is John" 输出: 5
 *  解释: 这里的单词是指连续的不是空格的字符，所以 "Hello," 算作 1 个单词。
 * @param {string} s
 * @return {number}
 */
var countSegments = function (s) {
    if (s === '') return 0
    let left = 0
    let count = 0
    let flag = false
    const sLen = s.length
    while (left < sLen) {
        if (s[left] !== ' ') {
            flag = true
        } else {
            if (flag) {
                count++
                flag = false
            }
        }
        left++
    }
    return flag ? count + 1 : count
}

/** 415. 字符串相加
 *   给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和并同样以字符串形式返回
 *  你不能使用任何內建的用于处理大整数的库（比如 BigInteger）， 也不能直接将输入的字符串转换为整数形式。
 *  输入：num1 = "11", num2 = "123"  输出："134"
 *
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
    // 使用了 BigInt api
    return BigInt(num1) + BigInt(num2) + ''

    // 如何相加，就是遍历记录位数 比如 '11' + '12' => 1 + 2 算出当前个位， 1 + 1 算出十位
    let left = num1.length - 1
    let right = num2.length - 1
    /** 之前考虑将res用数组标识，将每次的值存入，之后将res.reverse()反转之后join('')，发现太麻烦了，性能不好，不如直接用字符处理 */
    let res = ''
    let increme = 0 // 进位标识
    while (left >= 0 || right >= 0) {
        let curCount = Number(num1[left] || 0) + Number(num2[right] || 0) + increme
        increme = 0 // Increme 用完即回收
        if (curCount > 9) {
            increme = 1
            curCount = curCount - 10
        }
        res = curCount + res
        left--
        right--
    }
    return increme ? increme + res : res
}

/** 414. 第三大的数
 *  给你一个非空数组，返回此数组中 第三大的数 。如果不存在，则返回数组中最大的数
 *  输入：[3, 2, 1] 输出：1
 *  输入：[1, 2]    输出：2 第三大的数不存在, 所以返回最大的数 2
 * @param {number[]} nums
 * @return {number}
 */
var thirdMax = function (nums) {
    // api取巧
    const newNum = Array.from(new Set(nums))
    newNum.sort((a, b) => b - a)
    return newNum[2] !== undefined ? newNum[2] : newNum[0]

    // 这个效率要更高
    nums.sort((a, b) => b - a)
    for (let i = 1, diff = 1; i < nums.length; ++i) {
        if (nums[i] !== nums[i - 1] && ++diff === 3) {
            // 此时 nums[i] 就是第三大的数
            return nums[i]
        }
    }
    return nums[0]
}

/** 409. 最长回文串
 *  给定一个包含大写字母和小写字母的字符串 s ，返回 通过这些字母构造成的 最长的回文串 。
 *  输入:s = "abccccdd" 输出:7 我们可以构造的最长的回文串是"dccaccd", 它的长度是 7
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function (s) {
    // 只需要求回文串的长度，那么只需要找到复数的回文串即可
    if (s.length < 2) return s
    let res = 0
    let strMap = new Map()
    for (let i = 0; i < s.length; i++) {
        const str = s[i]
        if (strMap.get(str) === 1) {
            res++
            strMap.set(str, 0)
        } else {
            strMap.set(str, 1)
        }
    }
    return res * 2 === s.length ? res * 2 : res * 2 + 1
}

/** 392. 判断子序列
 *  给定字符串 s 和 t ，判断 s 是否为 t 的子序列
 *  字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。
 *  （例如，"ace"是"abcde"的一个子序列，而"aec"不是）
 *  输入：s = "abc", t = "ahbgdc"  输出：true
 *  输入：s = "axc", t = "ahbgdc"  输出：false
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
    // 双指针, left从字符s往后移，right从字符t往后移
    if (s === '') return true
    if (t === '') return false
    let left = 0
    let right = 0
    let hasFlag = false
    while (left < s.length && right < t.length) {
        if (s[left] === t[right]) {
            hasFlag = true // 确保left只有一个节点的时候有匹配到
            left++
        }
        right++
    }
    return hasFlag && left === s.length // 因为left最后一个节点匹配之后还是执行一次left++，所以直接用left 跟 s.length 匹配即可。

    // 暴力解法
    if (s === '') return true
    if (t === '') return false
    // 子序列问题
    let tLen = t.length
    let startIdx = undefined

    for (let i = 0; i < tLen; i++) {
        if (startIdx === undefined) {
            if (t[i] === s[0]) {
                startIdx = 0
            }
        } else {
            if (t[i] === s[startIdx + 1]) {
                startIdx++
            }
        }
    }

    return startIdx !== undefined && startIdx === s.length - 1
}

/** 389. 找不同
 *  给定两个字符串 s 和 t ，它们只包含小写字母。 字符串 t 由字符串 s 随机重排，然后在随机位置添加一个字母。
 *  请找出在 t 中被添加的字母。
 *  输入：s = "abcd", t = "abcde" 输出："e"
 *  输入：s = "", t = "y" 输出："y"
 * 输入：s = "a", t = "aa" 输出："a"
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function (s, t) {
    // 思路跟 题目383 是一样，都是用hash
    if (s === '') return t
    const strMap = {}
    for (let i = 0; i < s.length; i++) {
        const key = s[i]
        if (!strMap[key]) {
            strMap[key] = 1
        } else {
            strMap[key]++
        }
    }
    for (let i = 0; i < t.length; i++) {
        const key = t[i]
        if (!strMap[key]) {
            return key
        } else {
            strMap[key]--
        }
    }
    return Object.keys(strMap).find((item) => item > 0)
}

/** 383. 赎金信
 * 给你两个字符串：ransomNote 和 magazine ，判断 ransomNote 能不能由 magazine 里面的字符构成
 *  输入：ransomNote = "a", magazine = "b"  输出：false
 *  输入：ransomNote = "aa", magazine = "aab"  输出：true
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
    // 允许被打乱
    // const reg = new RegExp(ransomNote)
    // return magazine.match(reg).length >= 0

    // 1. 构建资源
    const strMap = {}
    for (let i = 0; i < magazine.length; i++) {
        const key = magazine[i]
        if (!strMap[key]) {
            strMap[key] = 1
        } else {
            strMap[key]++
        }
    }
    // 2. 消费资源
    for (let i = 0; i < ransomNote.length; i++) {
        const useKey = ransomNote[i]
        if (!strMap[useKey] || strMap[useKey] === 0) {
            return false
        } else {
            strMap[useKey]--
        }
    }
    return true
}

/**
 * 374. 猜数字大小
 * 你可以通过调用一个预先定义好的接口 int guess(int num) 来获取猜测结果，返回值一共有 3 种可能的情况（-1，1 或 0）：
 * -1：我选出的数字比你猜的数字小 pick < num
 * 1：我选出的数字比你猜的数字大 pick > num
 * 0：我选出的数字和你猜的数字一样。恭喜！你猜对了！pick == num
 *
 * 输入：n = 10, pick = 6 输出：6
 * 输入：n = 2, pick = 1 输出：1
 *
 * @param {number} n  1 <= n <= 2^31 - 1
 * @return {number}
 */
var guessNumber = function (n) {
    /** 这种写法面对大数处理会超出时间限制，且效率及其底下 */
    // while (guess(n) === -1) {
    //     n--
    // }
    // while (guess(n) === 1) {
    //     n++
    // }
    // if (guess(n) === 0) return n

    // 用二分法吧

    function Dep(left, right) {
        n = Math.ceil((right - left) / 2) + left
        if (guess(n) === 0) return n
        if (guess(n) === -1) {
            // 选出的数字比你猜的数字小
            return Dep(0, n)
        } else {
            // 选出的数字比你猜的数字大
            return Dep(n, right)
        }
    }

    return Dep(0, n)

    /** while循环要比递归性能还要好一点 */
    let left = 0,
        right = n
    while (left <= right) {
        const n = Math.ceil((right - left) / 2) + left
        if (guess(n) === 0) return n
        if (guess(n) === -1) {
            // 选出的数字比你猜的数字小
            right = n + 1
        }
        if (guess(n) === 1) {
            // 选出的数字比你猜的数字大
            left = n - 1
        }
    }
}

/** 367. 有效的完全平方数
 *  给你一个正整数 num 。如果 num 是一个完全平方数，则返回 true ，否则返回 false
 *  完全平方数 是一个可以写成某个整数的平方的整数。换句话说，它可以写成某个整数和自身的乘积。
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function (num) {
    // 1 <= num <= 231 - 1
    // if (num === 1) return true
    // let start = Math.floor(num / 2)
    // while (start > 0) {
    //     if (start * start === num) {
    //         return start
    //     }
    //     start--
    // }
    // return false

    // 二分法
    if (num === 1) return true
    let left = 0
    right = num

    while (left <= right) {
        const mid = Math.floor((right - left) / 2) + left
        const res = mid * mid
        if (res > num) {
            right = mid - 1
        } else if (res < num) {
            left = mid + 1
        } else {
            return true
        }
    }
    return false
}

/** 303. 区域和检索 - 数组不可变
 * @param {number[]} nums
 */
var NumArray = function (nums) {
    // 记录前缀和
    for (let i = 1; i < nums.length; i++) {
        nums[i] += nums[i - 1]
    }
    this.nums = nums
}

/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function (left, right) {
    // let res = 0
    // for (let i = left; i <= right; i++) {
    //     res += this.nums[i]
    // }
    // return res
    return i === 0 ? this.nums[right] : this.nums[right] - this.nums[left - 1] // left-1，因为要保留left
}

/** 290. 单词规律
 *  给定一种规律 pattern 和一个字符串 s ，判断 s 是否遵循相同的规律
 *  这里的 遵循 指完全匹配，例如， pattern 里的每个字母和字符串 s 中的每个非空单词之间存在着双向连接的对应规律。
 *  输入: pattern = "abba", s = "dog cat cat dog" 输出: true
 *  输入: pattern = "aaaa", s = "dog cat cat dog" 输出: false
 *  pattern = "abba" s = "dog dog dog dog" false
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function (pattern, s) {
    /** 思路：
     *  1. 匹配长度是否一致，不一致直接返回false;
     *  2. 遍历 pattern , 建立 pattern <-> str 的映射关系
     *     当第一次命中 pattern 时，记录映射关系；
     *     当 pattern 遍历过程中发现已有隐射关系，查找映射关系中的 str 是否与当前 s 的对应字符一致
     *     为了保证 pattern 与 str 映射关系的一致性，还需要一个数组记录使用过的 str ，如果遍历中出现新的 pattern ，但是此时对应的 s 已经被使用，那么也返回false
     */
    const len = pattern.length
    const strList = s.split(' ')
    if (len !== strList.length) return false
    const strMap = {}
    const useStr = []
    let flag = true
    for (let i = 0; i < len; i++) {
        const key = pattern[i]
        if (!strMap[key]) {
            if (useStr.includes(strList[i])) {
                // pattern不一致，但是str已被使用，false
                return false
            }
            strMap[key] = strList[i]
        } else {
            /** 这里存在不一致的情况需要处理 */
            flag = strMap[key] === strList[i]
            if (!flag) {
                return false
            }
        }
        useStr.push(strList[i])
    }
    return flag
}

/** 263. 丑数
 *  丑数 就是只包含质因数 2、3 和 5 的正整数  给你一个整数 n ，请你判断 n 是否为 丑数 。如果是，返回 true ；否则，返回 false
 * @param {number} n
 * @return {boolean}
 */
var isUgly = function (n) {
    if (n <= 0) return false // 根据丑数的定义，0 和负整数一定不是丑数
    if (n === 1) return n
    while (n % 5 === 0) {
        n = n / 5
    }
    while (n % 3 === 0) {
        n = n / 3
    }
    while (n % 2 === 0) {
        n = n / 2
    }
    return n == 1
}
/** 258. 各位相加
 *  给定一个非负整数 num，反复将各个位上的数字相加，直到结果为一位数。返回这个结果
 *  输入: num = 38  输出: 2
 *  38 --> 3 + 8 --> 11  11 --> 1 + 1 --> 2  由于 2 是一位数，所以返回 2
/**
 * @param {number} num
 * @return {number}
 */
var addDigits = function (num) {
    if (num < 10) return num

    // 解法1：
    // while (num >= 10) {
    //     let sum = 0;
    //     while (num > 0) {
    //         sum += num % 10;
    //         num = Math.floor(num / 10);
    //     }
    //     num = sum;
    // }
    // return num;

    // 解法2：
    // let toNum = num
    // while (toNum > 9) {
    //     let str = (toNum + '').split('')
    //     toNum = str.reduce((total, item) => {
    //         total = Number(item) + total
    //         return total
    //     }, 0)
    // }
    // return toNum

    // 解法3：
    // 简化公式 =   return (num - 1) % 9 + 1;
    if (num === 0) return 0
    if (num % 9 === 0) return 9
    return num % 9
}

/** 228. 汇总区间
 *  给定一个  无重复元素 的 有序 整数数组 nums 。
 *  返回 恰好覆盖数组中所有数字 的 最小有序 区间范围列表 。也就是说，nums 的每个元素都恰好被某个区间范围所覆盖，并且不存在属于某个范围但不属于 nums 的数字 x
 *  输入：nums = [0,1,2,4,5,7] 输出：["0->2","4->5","7"]
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function (nums) {
    if (nums.length === 0) return []
    if (nums.length === 1) return [nums[0] + '']

    let left = 0
    let right = 1
    const len = nums.length
    const res = []

    while (right < len) {
        if (nums[right - 1] + 1 !== nums[right]) {
            if (right - 1 === left) {
                // 前后项, 单项入栈
                res.push(nums[left] + '')
            } else {
                res.push(nums[left] + '->' + nums[right - 1])
            }
            if (right === len - 1) {
                // 边界处理
                res.push(nums[right] + '')
            }
            left = right
        } else {
            if (right === len - 1) {
                // 边界处理
                res.push(nums[left] + '->' + nums[right])
            }
        }
        right++
    }

    return res

    // 下面这个算法比较低效

    // const res = []
    // let str = nums[0] + ''
    // let prev = nums[0]
    // const len = nums.length
    // for (let i = 1; i < len; i++) {
    //     const cur = nums[i]
    //     if (cur === prev + 1) {
    //         if (i == len - 1) {
    //             // 最后一个数
    //             str = str + '->' + cur
    //         }
    //         prev = cur
    //         continue
    //     } else {
    //         // str == prev 判断单个数 如 [1,2,3, 6, 8, 9] 中的 6
    //         str = str == prev ? str : str + '->' + prev
    //         res.push(str)
    //         str = '' + cur
    //     }
    //     prev = cur
    // }
    // if (str) res.push(str)
    // return res
}

/** 225. 用队列实现栈
 *  请你仅使用两个队列实现一个后入先出（LIFO）的栈，并支持普通栈的全部四种操作（push、top、pop 和 empty）
 *  实现 MyStack 类：
 *  void push(int x) 将元素 x 压入栈顶。
 *  int pop() 移除并返回栈顶元素。
 *  int top() 返回栈顶元素。
 *  boolean empty() 如果栈是空的，返回 true ；否则，返回 false 。
 */

var MyStack = function () {
    this.stack = []
}

/**
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function (x) {
    return this.stack.unshift(x)
}

/**
 * @return {number}
 */
MyStack.prototype.pop = function () {
    return this.stack.shift()
}

/**
 * @return {number}
 */
MyStack.prototype.top = function () {
    return this.stack[0]
}

/**
 * @return {boolean}
 */
MyStack.prototype.empty = function () {
    return this.stack.length === 0
}

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */

/** 22. 括号生成
 *  数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
 *  n = 3 输出：["((()))","(()())","(())()","()(())","()()()"]
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
    // '(' 和 ')' 的对数
    const res = []
    function Dfs(left, right, str) {
        if (left === 0 && right === 0) {
            res.push(str)
            return
        }
        if (left === right) {
            //剩余左右括号数相等，下一个只能用左括号
            Dfs(left - 1, right, str + '(')
        } else {
            //剩余左括号小于右括号，下一个可以用左括号也可以用右括号
            if (left > 0) {
                Dfs(left - 1, right, str + '(')
            }
            Dfs(left, right - 1, str + ')')
        }
    }
    Dfs(n, n, '')
    return res
}

/** 17. 电话号码的字母组合
 *  给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回
 *
 *  2: abc  3: def  4: ghi
 *  5: jkl  6: mno  7: pqrs
 *  8: tuv  9: wxyz
 *
 *  输入：digits = "23" 输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]  <- 有 2-abc 3-def 拼接组成
 *  0 <= digits.length <= 4
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
    if (!digits) return []
    const numMap = {
        2: 'abc',
        3: 'def',
        4: 'ghi',
        5: 'jkl',
        6: 'mno',
        7: 'pqrs',
        8: 'tuv',
        9: 'wxyz',
    }
    const strList = digits.split('').map((item) => numMap[item])
    let res = strList[0].split('')
    for (let i = 1; i < strList.length; i++) {
        const curNum = strList[i].split('')
        const total = []
        for (let i = 0; i < res.length; i++) {
            for (let j = 0; j < curNum.length; j++) {
                const newStr = res[i] + curNum[j]
                total.push(newStr)
            }
        }
        res = total
    }
    return res
}

/** 6. Z 字形变换 -> 实际上就是排序为 1234321234···
 
 比如输入字符串为 "PAYPALISHIRING" 行数为 3 时，排列如下

 1: P   A   H   N
 2: A P L S I I G
 3: Y   I   R

实际排列规则: 1232123···
之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："PAHNAPLSIIGYIR"

 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
    const strMap = {}
    let sLen = 0
    let flag = 1 // 12321
    let isUp = true
    while (sLen < s.length) {
        if (!strMap[flag]) {
            strMap[flag] = s[sLen]
        } else {
            strMap[flag] = strMap[flag] + s[sLen]
        }
        sLen++

        isUp && flag++
        !isUp && flag--
        if (flag === numRows) {
            isUp = false
        } else if (flag === 1) {
            isUp = true
        }
    }
    // const seq = Object.keys(strMap)
    // seq.sort((a, b) => a - b)
    // let res = ''
    return Object.keys(strMap).reduce((total, key) => {
        total += strMap[key]
        return total
    }, '')

    /** 把问题想复杂了，给每个值打标记就行了 */
    // const strList = s.split('')
    // let res = []
    // let flag = 0
    // let start = 0
    // while (start < strList.length) {
    //     let len = numRows
    //     let curList = []
    //     while (len > 0) {
    //         curList.push(strList[start])
    //         len--
    //         start++
    //     }
    // }
    // // 以列为单位构造数组
    // for (let i = 0; i < strList.length; i++) {
    //     const curStr = strList[i]
    //     if (res.length === 0) {
    //         res[0] = [curStr]
    //     } else {
    //         const len = res.length
    //     }
    // }
}

/** 704. 二分查找
 * 给定一个 n (n 将在 [1, 10000]之间) 个元素有序的（升序）整型数组 nums 和一个目标值 target
 * 写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1
 */
var search = function (nums, target) {
    if (nums.length === 1) {
        // 感觉这里的代码优化性能不大
        return nums[0] === target ? 0 : -1
    }
    let left = 0,
        right = nums.length - 1
    while (left <= right) {
        // 考虑当nums只有一项时候的匹配
        if (nums[left] === target) return left
        if (nums[right] === target) return right
        const mid = left + Math.floor((right - left) / 2) // 防止left,right大数相加
        if (nums[mid] === target) {
            return mid
        } else if (nums[mid] < target) {
            left = mid
            right--
        } else {
            right = mid
            left++
        }
    }
    return -1
}

/** 202. 快乐数
 * 「快乐数」 定义为：
 * 对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和
 * 然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1
 * 如果这个过程 结果为 1，那么这个数就是快乐数
 */
var isHappy = function (n) {
    let numMap = new Set()
    let curNum = n + ''
    let happyFlag = false
    function transformHappy(arg) {
        const totalNum = arg.reduce((total, item) => {
            total += Math.pow(item, 2) // 字符会隐式转换为num类型
            return total
        }, 0)
        return totalNum + ''
    }

    while (!numMap.has(curNum) && !happyFlag) {
        numMap.add(curNum)
        curNum = transformHappy(curNum.split(''))
        if (curNum === '1') happyFlag = true
    }

    return happyFlag
}

/** 171. Excel 表列序号
 *  给你一个字符串 columnTitle ，表示 Excel 表格中的列名称。返回 该列名称对应的列序号
 */
var titleToNumber = function (columnTitle) {
    const numMap = {
        A: 1,
        B: 2,
        C: 3,
        D: 4,
        E: 5,
        F: 6,
        G: 7,
        H: 8,
        I: 9,
        J: 10,
        K: 11,
        L: 12,
        M: 13,
        N: 14,
        O: 15,
        P: 16,
        Q: 17,
        R: 18,
        S: 19,
        T: 20,
        U: 21,
        V: 22,
        W: 23,
        X: 24,
        Y: 25,
        Z: 26,
    }
    if (numMap[columnTitle]) return numMap[columnTitle]
    const numList = (columnTitle + '').split('').reverse()
    return numList.reduce((total, item, index) => {
        const curNum = numMap[item] * Math.pow(26, index)
        total += curNum
        return total
    }, 0)
}

/** 119. 杨辉三角 II
 * 给定一个非负索引 rowIndex，返回「杨辉三角」的第 rowIndex 行
 */
var getRow = function (rowIndex) {
    if (rowIndex === 0) return [1]
    if (rowIndex === 1) return [1, 1]
    let origin = [1, 1]
    let result = []
    rowIndex--
    while (rowIndex > 0) {
        result = origin.reduce(
            (total, item, index) => {
                if (origin[index + 1]) {
                    total.push(item + origin[index + 1])
                }
                return total
            },
            [1]
        )
        result.push(1)
        rowIndex--
        origin = result
    }
    return result
}

// 168. Excel表列名称 - 力扣（LeetCode）
/**
 * core: 其实就相当于26进制计算
 * @param {number} columnNumber
 * @return {string}
 * 给你一个整数 columnNumber ，返回它在 Excel 表中相对应的列名称
 * A -> 1  B -> 2  C -> 3
 */
var convertToTitle = function (columnNumber) {
    const columnMap = {
        0: 'A',
        1: 'B',
        2: 'C',
        3: 'D',
        4: 'E',
        5: 'F',
        6: 'G',
        7: 'H',
        8: 'I',
        9: 'J',
        10: 'K',
        11: 'L',
        12: 'M',
        13: 'N',
        14: 'O',
        15: 'P',
        16: 'Q',
        17: 'R',
        18: 'S',
        19: 'T',
        20: 'U',
        21: 'V',
        22: 'W',
        23: 'X',
        24: 'Y',
        25: 'Z',
        26: 'AA',
    }
    const numMap = {
        A: 1,
        B: 2,
        C: 3,
        D: 4,
        E: 5,
        F: 6,
        G: 7,
        H: 8,
        I: 9,
        J: 10,
        K: 11,
        L: 12,
        M: 13,
        N: 14,
        O: 15,
        P: 16,
        Q: 17,
        R: 18,
        S: 19,
        T: 20,
        U: 21,
        V: 22,
        W: 23,
        X: 24,
        Y: 25,
        Z: 26,
    }
    if (columnNumber.length === 1) return columnMap[columnNumber]
    let res = []
    while (columnNumber > 0) {
        res.unshift(columnMap[(columnNumber - 1) % 26])
        columnNumber = Math.floor((columnNumber - 1) / 26)
    }
    return res.join('')
}

// 69. x 的平方根
/**给你一个非负整数 x ，计算并返回 x 的 算术平方根
 * 由于返回类型是整数，结果只保留 整数部分 ，小数部分将被 舍去
 * 注意：不允许使用任何内置指数函数和算符，例如 pow(x, 0.5) 或者 x ** 0.5
 * 二分查找的下界为 0 0，上界可以粗略地设定为 x。
 * 在二分查找的每一步中，我们只需要比较中间元素 mid mid 的平方与 x 的大小关系，并通过比较的结果调整上下界的范围。
 * 由于我们所有的运算都是整数运算，不会存在误差，因此在得到最终的答案 ans ans 后，也就不需要再去尝试 ans + 1 ans+1 了
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
    // 二分查找
    if (x < 2) return x
    let left = 0,
        right = x
    while (left < right) {
        const mid = Math.floor((left + right) / 2)
        if (mid * mid < x) {
            left = mid + 1
        } else if (mid * mid > x) {
            right = mid
        } else {
            return Math.floor(mid)
        }
    }
    return right - 1
}

// 67. 二进制求和
/**给你两个二进制字符串 a 和 b ，以二进制字符串的形式返回它们的和
 * 输入:a = "11", b = "1" 输出："100"
 * 输入：a = "1010", b = "1011" 输出："10101"
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
    const minLen = Math.min(a.length, b.length)
    let minNum = a.length === minLen ? a : b
    const maxNum = a.length === minLen ? b : a
    const targetNum = maxNum.length - minNum.length
    let tempArray = new Array(targetNum).fill(0)
    let numArray = minNum.split('')
    numArray.unshift(...tempArray)
    minNum = numArray.join('')
    let last = 0,
        res = [] // 余数
    for (let i = maxNum.length - 1; i >= 0; i--) {
        const num1 = parseInt(maxNum[i]),
            num2 = parseInt(minNum[i]),
            count = num1 + num2 + last
        if (count > 1) {
            res.unshift(count - 2)
            last = 1
        } else {
            res.unshift(num1 || num2 || last)
            last = 0
        }
    }
    if (last) res.unshift(last)
    return res.join('')
}

// 58. 最后一个单词的长度
/**
 * 给你一个字符串 s，由若干单词组成，单词前后用一些空格字符隔开。返回字符串中 最后一个 单词的长度
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
    // api解决
    // const strArray = s.trim().split(' ')
    // return strArray[strArray.length - 1].length

    // 效率最高
    s = s.trim()
    if (s.length < 2) return s.length
    let len = 0
    for (let i = s.length - 1; i >= 0; i--) {
        if (s[i] === ' ') {
            if (!len) {
                continue
            } else {
                return len
            }
        }
        len++
    }
    return len
}

// 35. 搜索插入位置
/**
 * 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置
 * @param {number[]} nums nums 为 无重复元素 的 升序 排列数组
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
    const len = nums.length
    // if (target < nums[0]) return 0
    // if (target > nums[len - 1]) return len

    // const getIdx = nums.indexOf(target)
    // if (getIdx > -1) return getIdx
    // let len = nums.length
    // for (let i = 0; i < len; i++) {
    //     if (nums[i] > target && nums[i - 1] < target) {
    //         return i
    //     }
    // }
    // if (nums[len - 1] < target) return len
    // return 0

    // 二分法
    let left = 0,
        right = len - 1
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2)
        if (nums[mid] > target) {
            right = mid - 1
        } else if (nums[mid] < target) {
            left = mid + 1
        } else {
            return mid
        }
    }
    return right + 1
}

// 27. 移除元素
/**
 * 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度
 * 输入：nums = [0,1,2,2,3,0,4,2], val = 2
 * 输出：5, nums = [0,1,4,0,3] 这五个元素可为任意顺序。你不需要考虑数组中超出新长度后面的元素
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
    if (!nums.length) return nums.length
    // for (let i = 0; i < nums.length; i++) {
    //     if (nums[i] === val) {
    //         nums[i].splice(i, 0)
    //     }
    // }
    // return nums.length

    // 不删除旧元素的做法, 这里其实也是利用了双指针的思想
    // let newIndex = 0
    // for (let i = 0; i < nums.length; i++) {
    //     if (nums[i] !== val) {
    //         nums[newIndex++] = nums[i] // 用正确的值覆盖下标
    //     }
    // }
    // return newIndex

    // 双指针优化,左指针只保留常规数，当左指针
    let left = 0,
        right = nums.length - 1
    // while (left <= right) {
    //     if (nums[right] === val) {
    //         right--
    //     } else if (nums[left] === val) {
    //         nums[left] = nums[right]
    //         left++
    //         right--
    //     } else {
    //         left++
    //     }
    // }
    while (left <= right) {
        if (nums[left] === val) {
            nums[left] = nums[right]
            right-- // 这里left不动是为了在下一轮验证交换过来的nums[right]的合法性
        } else {
            left++
        }
    }
    return left
}

// 13. 罗马数字转整数
/**
 * @param {string} s
 * @return {number}
 * I=1， V=5， X=10， L=50，C=100，D=500 和 M=1000
 * I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9
 * X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90
 * C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900
 * 给定一个罗马数字，将其转换成整数
 */
var romanToInt = function (s) {
    let res = 0,
        idx = 0
    const numMap = { I: 1, IV: 4, IX: 9, V: 5, X: 10, L: 50, XL: 40, XC: 90, C: 100, CD: 400, CM: 900, D: 500, M: 1000 }
    if (s.length < 2) return numMap[s]
    while (s[idx]) {
        const curNum = s[idx]
        const nextNum = s[idx + 1]
        if (curNum === 'I') {
            if (nextNum && ['V', 'X'].includes(nextNum)) {
                res += numMap[curNum + nextNum]
                idx += 2
            } else {
                res += numMap[curNum]
                idx++
            }
        } else if (curNum === 'X') {
            if (nextNum && ['L', 'C'].includes(nextNum)) {
                res += numMap[curNum + nextNum]
                idx += 2
            } else {
                res += numMap[curNum]
                idx++
            }
        } else if (curNum === 'C') {
            if (nextNum && ['D', 'M'].includes(nextNum)) {
                res += numMap[curNum + nextNum]
                idx += 2
            } else {
                res += numMap[curNum]
                idx++
            }
        } else {
            res += numMap[curNum]
            idx++
        }
    }
    return res
}
