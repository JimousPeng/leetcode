
/** 两整数之和
 * 给你两个整数 a 和 b ，不使用 运算符 + 和 - ​​​​​​​，计算并返回两整数之和。
 */
var getSum = function (a, b) {
    // 用除法处理
    if (a == 0) return b;
    if (b == 0) return a;
    return Math.log(Math.exp(a) * Math.exp(b));

    // 位运算
    if (a == 0) return b;
    return getSum((a & b) << 1, a ^ b);
};

/** 电话号码的字母组合
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回
 * 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
 * 0 <= digits.length <= 4
 */

var letterCombinations = function (digits) {
    if (!digits) return [];
};
