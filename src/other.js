/*
 * @Author: jimouspeng
 * @LastEditTime: 2022-07-21 16:58:40
 * @Description: 其他问题
 * @FilePath: \leetcode\src\other.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
/** 位1的个数
 * 编写一个函数，输入是一个无符号整数（以二进制串的形式），返回其二进制表达式中数字位数为 '1' 的个数（也被称为汉明重量）
 * 
 * 输入：00000000000000000000000000001011
输出：3
解释：输入的二进制串 00000000000000000000000000001011 中，共有三位为 '1'。
 */
var hammingWeight = function (n) {
    return n.toString(2).split('').filter(item => item === '1').length
};

/** 
 * 汉明距离
 * 两个整数之间的 汉明距离 指的是这两个数字对应二进制位不同的位置的数目。
 * 给你两个整数 x 和 y，计算并返回它们之间的汉明距离
 * 
 * 输入：x = 1, y = 4
输出：2
解释：
1   (0 0 0 1)
4   (0 1 0 0)
       ↑   ↑
上面的箭头指出了对应二进制位不同的位置。
 */
/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function (x, y) {
    console.log((x ^ y).toString(2));
    return (x ^ y)
        .toString(2)
        .split('')
        .filter((item) => item === '1').length;
};

hammingDistance(1, 4);

/** 颠倒二进制位
 * 颠倒给定的 32 位无符号整数的二进制位
输入：n = 00000010100101000001111010011100
输出：964176192 (00111001011110000010100101000000)
解释：输入的二进制串 00000010100101000001111010011100 表示无符号整数 43261596，
     因此返回 964176192，其二进制表示形式为 00111001011110000010100101000000。
 */
/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
/**
 * >>有符号右位移
 * >>> 无符号右位移
 * | 位或
 * & 位与
 */
var reverseBits = function (n) {
    let num = 0;
    let t = 32;
    while (t--) {
        num = num << 1;
        num |= n & 1;
        n = n >>> 1;
    }
    num = num >>> 0;
    return num;
};

/** 杨辉三角
 *在「杨辉三角」中，每个数是它左上方和右上方的数的和

输入: numRows = 5
输出: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]

输入: numRows = 1
输出: [[1]]

 */
/**
 * @param {number} numRows 1 <= numRows <= 30
 * @return {number[][]}
 */
var generate = function (numRows) {
    /** 执行用时： 56 ms , 在所有 JavaScript 提交中击败了 82.97% 的用户
     * 内存消耗： 41.1 MB , 在所有 JavaScript 提交中击败了 47.30% 的用户 */
    if (numRows === 1) {
        return [[1]];
    }
    if (numRows === 2) {
        return [[1], [1, 1]];
    }
    let initList = [[1], [1, 1]];
    let curList;
    while (numRows > 2) {
        const curLen = initList.length;
        let lastList = initList[curLen - 1];
        curList = lastList.reduce(
            (total, item, index) => {
                if (lastList[index + 1]) {
                    // 如果存在下一个
                    total.push(item + lastList[index + 1]);
                } else {
                    total.push(item);
                }
                return total;
            },
            [1]
        );
        initList.push(curList);
        numRows--;
    }
    return initList;
};

console.info(generate(5));

/** 有效的括号
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效
 * 
 * 有效字符串需满足：
左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。

输入：s = "()[]{}"
输出：true

输入：s = "(]"
输出：false

输入：s = "{[]}"
输出：true
 */
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    /** 执行用时： 68 ms , 在所有 JavaScript 提交中击败了 33.62% 的用户
     * 内存消耗： 41.5 MB , 在所有 JavaScript 提交中击败了 27.21% 的用户 */
    if (s.length < 2 || s.length % 2 !== 0) {
        /** 先处理边界，有效提高效率 */
        return false;
    }
    const hasMap = {
        '(': ')',
        '{': '}',
        '[': ']',
    };
    const mapList = [];
    for (let i = 0; i < s.length; i++) {
        const key = s[i];
        if (hasMap[key]) {
            mapList.unshift(hasMap[key]);
        } else {
            if (mapList.length === 0) {
                return false;
            }
            const curEle = mapList.shift();
            if (s[i] !== curEle) {
                return false;
            }
        }
    }
    return mapList.length === 0;
};
// isValid('()[]{}');
// isValid('(]');
isValid('([)]');

/** 缺失数字
 * 给定一个包含 [0, n] 中 n 个数的数组 nums ，找出 [0, n] 这个范围内没有出现在数组中的那个数。
 * 输入：nums = [3,0,1]
 * 
n == nums.length
1 <= n <= 104
0 <= nums[i] <= n
nums 中的所有数字都 独一无二
 * 
输出：2
解释：n = 3，因为有 3 个数字，所以所有的数字都在范围 [0,3] 内。2 是丢失的数字，因为它没有出现在 nums 中。
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
    /** 执行用时： 68 ms , 在所有 JavaScript 提交中击败了 73.49% 的用户
     * 内存消耗： 43.3 MB , 在所有 JavaScript 提交中击败了 50.84% 的用户 */
    let listLen = nums.length;
    if (nums.length === 1 && nums[0] !== 1) {
        return 1;
    }
    nums.sort((a, b) => a - b);
    for (let i = 0; i < listLen; i++) {
        if (nums[i] !== i) {
            return i;
        }
    }
    if (nums[listLen - 1] !== listLen) {
        return listLen;
    }
};

// console.log(missingNumber([3, 0, 1]));
console.log(missingNumber([0, 1]));
