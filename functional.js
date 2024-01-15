/** 功能性题目，以解决问题为出发点 */

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
