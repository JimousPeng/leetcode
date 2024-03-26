/** 位运算原理：
 *
 * ^ 亦或 相当于 无进位求和  \
 * 想象10进制下的模拟情况: 19 + 1 = 20  无进位求和就是10，而非20；因为它不管进位情况
 *
 * & 与运算  相当于求每位的进位数
 * 先看定义：1&1=1；1&0=0；0&0=0；即都为1的时候才为1，正好可以模拟进位数的情况
 * 想象10进制下模拟情况：（9+1=10，如果是用&的思路来处理，则9+1得到的进位数为1，而不是10)
 *
 * 这样位运算求和的公式就是：(a^b) ^ ((a&b)<<1)  即：每次无进位求和 + 每次得到的进位数 需要不断重复这个过程，直到进位数为0为止
 */

/** LCR 190. 加密运算
 * 请不使用四则运算符的情况下实现一个函数计算两次通信的数据量之和（三种情况均需被统计），以确保在数据传输过程中的高安全性和保密性
 * 输入：dataA = 5, dataB = -1    输出：4
 * @param {number} dataA
 * @param {number} dataB
 * @return {number}
 */
var encryptionCalculate = function (dataA, dataB) {
    // 递归解法
    if (dataA === 0) return dataB
    return encryptionCalculate((dataA & dataB) << 1, dataA ^ dataB)

	// 迭代效率更高： 击败 95.74% 使用 JavaScript 的用户
    let step = dataA
    while (step !== 0) {
        step = (dataA & dataB) << 1
        dataB = dataA ^ dataB
        dataA = step
    }
    return dataB
}
