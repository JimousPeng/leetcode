/** 功能性题目，以解决问题为出发点 */

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
