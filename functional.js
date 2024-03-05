/** 功能性题目，以解决问题为出发点 */


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
