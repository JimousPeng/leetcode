/*
 * @Author: jimouspeng
 * @LastEditTime: 2022-07-26 17:29:56
 * @Description: 数学问题
 * @FilePath: \leetcode\src\math.js
 * 可以输入预定的版权声明、个性签名、空行等
 */

/** Fizz Buzz
 * 给你一个整数 n ，找出从 1 到 n 各个整数的 Fizz Buzz 表示，并用字符串数组 answer（下标从 1 开始）返回结果，其中：
answer[i] == "FizzBuzz" 如果 i 同时是 3 和 5 的倍数。
answer[i] == "Fizz" 如果 i 是 3 的倍数。
answer[i] == "Buzz" 如果 i 是 5 的倍数。
answer[i] == i （以字符串形式）如果上述条件全不满足。

输入：n = 3
输出：["1","2","Fizz"]


输入：n = 5
输出：["1","2","Fizz","4","Buzz"]


 */

/**
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = function (n) {
    let countList = [];
    for (let i = 1; i <= n; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            countList.push('FizzBuzz');
        } else if (i % 3 === 0) {
            countList.push('Fizz');
        } else if (i % 5 === 0) {
            countList.push('Buzz');
        } else {
            countList.push(i + '');
        }
    }
    return countList;
};

console.log(fizzBuzz(3));

/** 计数质数
 * 给定整数 n ，返回 所有小于非负整数 n 的质数的数量
 * 
 * 【质数： 质数是指在大于1的自然数中，除了1和它本身以外不再有其他因数的自然数】
 * 
输入：n = 10
输出：4
解释：小于 10 的质数一共有 4 个, 它们是 2, 3, 5, 7 。
 */
/**
 * @param {number} n
 * @return {number}
 */
var countPrimes = function (n) {
    /** 这个方法大数会超时 */
    // if (n <= 2) {
    //     return 0;
    // }
    // function isPrimes(num) {
    //     let flag = true;
    //     for (let i = 2; i < num; i++) {
    //         // debugger;
    //         if (num % i === 0) {
    //             flag = false;
    //         }
    //     }
    //     return flag;
    // }
    // let countList = [];
    // n--;
    // while (n > 1) {
    //     if (n === 2) {
    //         countList.push(n);
    //     } else if (n % 2 !== 0) {
    //         if (isPrimes(n) && countList.indexOf(n) < 0) {
    //             countList.push(n);
    //         }
    //     }
    //     n--;
    // }
    // console.log(countList);
    // return countList.length;

    if (n < 3) {
        return 0;
    }
    const result = new Array(n).fill(true);
    let count = 0;
    let list = [];
    for (let i = 2; i < n; i++) {
        if (result[i]) ++count;
        for (let j = i * 2; j < n; j = j + i) {
            // debugger
            if (j % i === 0) {
                result[j] = false;
                list.push(j);
            }
        }
    }
    // console.log(list);
    return count;
};
console.log(countPrimes(20));

/** 3的幂
 * 给定一个整数，写一个函数来判断它是否是 3 的幂次方。如果是，返回 true ；否则，返回 false;
 * 整数 n 是 3 的幂次方需满足：存在整数 x 使得 n == 3^x
 * 
输入：n = 27
输出：true
 */
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfThree = function (n) {
    /** 执行用时： 156 ms , 在所有 JavaScript 提交中击败了 88.54% 的用户
     * 内存消耗： 48.9 MB , 在所有 JavaScript 提交中击败了 99.65% 的用户 */
    let count = 0;
    while (Math.pow(3, count) < n) {
        count++;
    }
    return Math.pow(3, count) === n;
};

/** 罗马数字转整数
 * 罗马数字包含以下七种字符: I， V， X， L，C，D 和 M
字符          数值
I             1
V             5
X             10
L             50
C             100
D             500
M             1000

例如， 罗马数字 2 写做 II ，即为两个并列的 1 。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。

通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：

I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
给定一个罗马数字，将其转换成整数。

输入: s = "IX"
输出: 9

输入: s = "IV"
输出: 4

输入: s = "LVIII"
输出: 58
解释: L = 50, V= 5, III = 3.
 */
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
    const typeMap = {
        I: 1,
        V: 5, // I 放在 V (5)的左边，表示 4
        X: 10, // I 放在 X (10)的左边，表示 9
        L: 50, // X 放在 L (50)左边，表示 40
        C: 100, // X 放在C (100) 的左边，表示 90
        D: 500,
        M: 1000,
    };
    let count = 0;
    let curStr = s;
    // while(curStr.length) {
    //     switch(curStr) {
    //         case M
    //     }
    // }
};
