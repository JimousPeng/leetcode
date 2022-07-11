/*
 * @Date: 2022-01-28 10:49:52
 * @LastEditors: Please set LastEditors
 * @Description: 字符操作
 * @LastEditTime: 2022-07-11 17:47:08
 * @FilePath: \leetcode\src\String.js
 */

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
