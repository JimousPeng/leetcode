/*
 * @Date: 2022-01-28 10:49:52
 * @LastEditors: Please set LastEditors
 * @Description: 字符操作
 * @LastEditTime: 2022-02-27 15:55:46
 * @FilePath: \leetcode\src\String.js
 */

/** 字符串中的第一个唯一字符
 * 给定一个字符串 s ，找到 它的第一个不重复的字符，并返回它的索引 。如果不存在，则返回 -1
 * 输入: s = "leetcode" 输出: 0
 */
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
    // 执行用时： 108 ms , 在所有 JavaScript 提交中击败了 55.96% 的用户
    // 内存消耗： 47.2 MB , 在所有 JavaScript 提交中击败了 15.78% 的用户
    const arryS = s.split('');
    const mapS = {};
    arryS.forEach((el) => {
        if (!mapS[el]) {
            mapS[el] = { value: 1 };
        } else {
            let val = mapS[el].value;
            mapS[el].value = ++val;
        }
    });
    const keyList = Object.keys(mapS);
    for (let i = 0; i < keyList.length; i++) {
        if (mapS[keyList[i]].value === 1) {
            return arryS.indexOf(keyList[i]);
        }
    }
    return -1
};
console.log(firstUniqChar('leetcode'));

/** 整数反转
 * 给你一个 32 位的有符号整数 x ，返回将 x 中的数字部分反转后的结果。

如果反转后整数超过 32 位的有符号整数的范围 [−231,  231 − 1] ，就返回 0
输入：x = 123
输出：321

输入：x = 120
输出：21

输入：x = -123
输出：-321
 */
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
    if (x == 0) {
        return x;
    }
    const xlessZero = x < 0;
    const strX = String(Math.abs(x));
    const strArray = strX.split('');
    strArray.reverse();
    const newStr = strArray.join('');
    let numX = xlessZero ? -1 * Number(newStr) : Number(newStr);
    numX = numX > 2 ** 31 - 1 || numX < -1 * 2 ** 31 ? 0 : numX;
    return numX;
};
// console.log(reverse(1534236469));

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
