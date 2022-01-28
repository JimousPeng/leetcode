/*
 * @Date: 2022-01-28 10:49:52
 * @LastEditors: jimouspeng
 * @Description: 描述文件内容
 * @LastEditTime: 2022-01-28 10:50:16
 * @FilePath: \leetcode\src\String.js
 */

/**反转字符串
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
 var reverseString = function(s) {
    let left = 0;
    for(let right = s.length -1; right > 0; right--) {
        if(right > left) {
            let leftItem = s[left];
            s[left] = s[right];
            s[right] = leftItem;
        } else {
            break;
        }
        left ++;
    }
    return s;
};

let str = ["h","e","l","l","o"];

console.log(reverseString(str));