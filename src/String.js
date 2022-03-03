/*
 * @Date: 2022-01-28 10:49:52
 * @LastEditors: Please set LastEditors
 * @Description: 字符操作
 * @LastEditTime: 2022-03-03 22:13:03
 * @FilePath: \leetcode\src\String.js
 */

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
    const firstMap = {}
    let judge = true
    ;[].slice.call(s).forEach((el) => {
        if (firstMap[el]) {
            ++firstMap[el].value
        } else {
            firstMap[el] = {
                value: 1,
            }
        }
    })
    ;[].slice.call(t).forEach((el) => {
        if (firstMap[el]) {
            --firstMap[el].value
        } else {
            judge = false
        }
    })
    Object.keys(firstMap).forEach((key) => {
        if (firstMap[key].value > 0) {
            judge = false
        }
    })
    return judge
}
console.log(isAnagram('ratt', 'car'))

/**反转字符串
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
    let left = 0
    for (let right = s.length - 1; right > 0; right--) {
        if (right > left) {
            let leftItem = s[left]
            s[left] = s[right]
            s[right] = leftItem
        } else {
            break
        }
        left++
    }
    return s
}

let str = ['h', 'e', 'l', 'l', 'o']

// console.log(reverseString(str));
