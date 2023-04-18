/*
 * @Date: 2022-01-28 10:49:52
 * @LastEditors: Please set LastEditors
 * @Description: 字符操作
 * @LastEditTime: 2022-07-14 17:26:16
 * @FilePath: \leetcode\src\String.js
 */

/** 外观数列
 * 给定一个正整数 n ，输出外观数列的第 n 项。
 * 
前五项如下：
1.     1
2.     11
3.     21
4.     1211
5.     111221
第一项是数字 1 
描述前一项，这个数是 1 即 “ 一 个 1 ”，记作 "11"
描述前一项，这个数是 11 即 “ 二 个 1 ” ，记作 "21"
描述前一项，这个数是 21 即 “ 一 个 2 + 一 个 1 ” ，记作 "1211"
描述前一项，这个数是 1211 即 “ 一 个 1 + 一 个 2 + 二 个 1 ” ，记作 "111221"
 */
/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function (n) {
    /** 执行用时： 76 ms , 在所有 JavaScript 提交中击败了 19.58% 的用户
     * 内存消耗： 48.1 MB , 在所有 JavaScript 提交中击败了 5.04% 的用户 */
    if (n === 1) {
        return '1';
    }
    let hashMap = {};
    let initStr = '1';
    let endStr = '';
    while (n > 1) {
        let curKey = initStr[0];
        for (let i = 0; i < initStr.length; i++) {
            if (initStr[i] !== curKey) {
                endStr += hashMap[curKey] + curKey;
                hashMap = {};
                curKey = initStr[i];
            }
            if (hashMap[curKey]) {
                hashMap[curKey]++;
            } else {
                hashMap[curKey] = 1;
            }
            if (i === initStr.length - 1) {
                endStr += hashMap[curKey] + curKey;
            }
        }
        initStr = endStr;
        endStr = '';
        hashMap = {};
        n--;
    }
    return initStr;
};
console.log(countAndSay(6));

/** 最长公共前缀
 * 编写一个函数来查找字符串数组中的最长公共前缀。如果不存在公共前缀，返回空字符串 ""
 * 输入：strs = ["flower","flow","flight"]  输出："fl"
 */
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
    // let minStr = Infinity;
    // const strLen = strs.length;
    // const publicStr = '';
    // for (let i = 0; i < strLen; i++) {
    //     if (strs[i].length < minStr) {
    //         minStr = strs[i]; // 找到最短的字符
    //     }
    // }
    // for (let i = 0; i < minStr.length; i++) {
    //     console.log(minStr[i]);

    // }
    /**
     * startsWith:
     * 执行用时： 60 ms , 在所有 JavaScript 提交中击败了 86.32% 的用户
     * 内存消耗： 41 MB , 在所有 JavaScript 提交中击败了 94.54% 的用户
     *
     * indexOf
     * 执行用时： 64 ms , 在所有 JavaScript 提交中击败了 71.21% 的用户 内存消耗：
     * 41.2 MB , 在所有 JavaScript 提交中击败了 74.38% 的用户
     *  */
    return strs.reduce((total, item) => {
        // while (item.indexOf(total) !== 0) {
        while (!item.startsWith(total)) {
            total = total.slice(0, total.length - 1);
        }
        return total;
    }, strs[0]);
};

longestCommonPrefix(['flower', 'flow', 'flight']);

/** 字符串转换整数 (atoi)
 * 实现一个 myAtoi(string s) 函数，使其能将字符串转换成一个 32 位有符号整数（类似 C/C++ 中的 atoi 函数）
 * 
 * 函数 myAtoi(string s) 的算法如下：

读入字符串并丢弃无用的前导空格
检查下一个字符（假设还未到字符末尾）为正还是负号，读取该字符（如果有）。 确定最终结果是负数还是正数。 如果两者都不存在，则假定结果为正。
读入下一个字符，直到到达下一个非数字字符或到达输入的结尾。字符串的其余部分将被忽略。
将前面步骤读入的这些数字转换为整数（即，"123" -> 123， "0032" -> 32）。如果没有读入数字，则整数为 0 。必要时更改符号（从步骤 2 开始）。
如果整数数超过 32 位有符号整数范围 [−231,  231 − 1] ，需要截断这个整数，使其保持在这个范围内。具体来说，小于 −231 的整数应该被固定为 −231 ，大于 231 − 1 的整数应该被固定为 231 − 1 。
返回整数作为最终结果。
注意：

本题中的空白字符只包括空格字符 ' ' 。
除前导空格或数字后的其余字符串外，请勿忽略 任何其他字符。
 */
/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
    /** 执行用时： 120 ms , 在所有 JavaScript 提交中击败了 5.42% 的用户
     * 内存消耗： 46.3 MB , 在所有 JavaScript 提交中击败了 5.35% 的用户
     */
    let strS = s.match(/^[\s-\+]*\d+/g);
    if (!strS) {
        return 0;
    }
    strS = strS.join('');
    if (!strS.match(/^\s*[-\+]?\d+/g)) {
        return 0;
    }
    strS = strS.match(/-?\d+/g).join('');
    const numStr = parseInt(strS);
    if (numStr < -2147483648) {
        return -2147483648;
    }
    if (numStr > 2147483647) {
        return 2147483647;
    }
    return numStr;
};
console.log(myAtoi('   -42'));

/** 验证回文串: 给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
 * 说明：本题中，我们将空字符串定义为有效的回文串。
 * 输入: "A man, a plan, a canal: Panama"
 * 输出: true
 * 解释："amanaplanacanalpanama" 是回文串
 *
 * 输入: "race a car"
 * 输出: false
 * 解释："raceacar" 不是回文串
 */
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
    /** 执行用时： 64 ms , 在所有 JavaScript 提交中击败了 88.58% 的用户
     * 内存消耗： 45.1 MB , 在所有 JavaScript 提交中击败了 42.63% 的用户 */
    if (!s || s.length < 2) {
        return true;
    }
    const regExe = new RegExp(/([a-zA-Z]|\d)+/, 'g');
    let normlizeStr = '';
    let str;
    while ((str = regExe.exec(s)) !== null) {
        normlizeStr = normlizeStr + str[0];
    }
    normlizeStr = normlizeStr.toLowerCase();
    let right = normlizeStr.length - 1;
    for (let left = 0; left < right; left++) {
        if (normlizeStr[left] !== normlizeStr[right]) {
            return false;
        }
        right--;
    }
    return true;

    /** 执行用时： 80 ms , 在所有 JavaScript 提交中击败了 28.14% 的用户
     * 内存消耗： 48 MB , 在所有 JavaScript 提交中击败了 13.47% 的用户 */
    // const matchStr = s.match(/[a-zA-Z\d]+/g);
    // if (!s || s.length < 2 || !matchStr) {
    //     return true;
    // }
    // const newStr = matchStr.join('').toLowerCase().split('').reverse().join('');
    // s = s.replace(/[^a-zA-Z0-9]/g, '');
    // s = s.toLowerCase();
    // console.log(s, newStr);
    // return s === newStr;
};
console.log(isPalindrome('A man, a plan, a canal: Panama'));

/** 有效的字母异位词
 * 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词
 * 注意：若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词
 * 输入: s = "anagram", t = "nagaram"
 * 输出: true
 *
 * 输入: s = "rat", t = "car"
 * 输出: false
 */
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
    // 执行用时： 76 ms , 在所有 JavaScript 提交中击败了 85.56% 的用户
    // 内存消耗： 42.2 MB , 在所有 JavaScript 提交中击败了 50.77% 的用户
    const firstMap = {};
    let judge = true;
    [].slice.call(s).forEach((el) => {
        if (firstMap[el]) {
            ++firstMap[el].value;
        } else {
            firstMap[el] = {
                value: 1,
            };
        }
    });
    [].slice.call(t).forEach((el) => {
        if (firstMap[el]) {
            --firstMap[el].value;
        } else {
            judge = false;
        }
    });
    Object.keys(firstMap).forEach((key) => {
        if (firstMap[key].value > 0) {
            judge = false;
        }
    });
    return judge;
};
// console.log(isAnagram('ratt', 'car'))

/**反转字符串
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
    let left = 0;
    for (let right = s.length - 1; right > 0; right--) {
        if (right > left) {
            let leftItem = s[left];
            s[left] = s[right];
            s[right] = leftItem;
        } else {
            break;
        }
        left++;
    }
    return s;
};

let str = ['h', 'e', 'l', 'l', 'o'];

// console.log(reverseString(str));
