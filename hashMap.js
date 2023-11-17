/** 哈希表相关 */

/** 12. 整数转罗马数字
 * 罗马数字包含以下七种字符： I， V， X， L，C，D 和 M
字符          数值
I             1
V             5
X             10
L             50
C             100
D             500
M             1000

例如， 罗马数字 2 写做 II ，即为两个并列的 1。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。

通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：

I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
给你一个整数，将其转为罗马数字。

 *
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
    const numMap = {
        1: 'I',
        4: 'IV',
        5: 'V',
        9: 'IX',
        10: 'X',
        40: 'XL',
        50: 'L',
        90: 'XC',
        100: 'C',
        400: 'CD',
        500: 'D',
        900: 'CM',
        1000: 'M',
    }
    if (numMap[num]) return numMap[num]
    let numCount = ''
    while (num) {
        if (num / 1000 >= 1) {
            numCount += 'M'
            num -= 1000
        } else if (num / 900 >= 1) {
            numCount += 'CM'
            num -= 900
        } else if (num / 500 >= 1) {
            numCount += 'D'
            num -= 500
        } else if (num / 400 >= 1) {
            numCount += 'CD'
            num -= 400
        } else if (num / 100 >= 1) {
            numCount += 'C'
            num -= 100
        } else if (num / 90 >= 1) {
            numCount += 'XC'
            num -= 90
        } else if (num / 50 >= 1) {
            numCount += 'L'
            num -= 50
        } else if (num / 40 >= 1) {
            numCount += 'XL'
            num -= 40
        } else if (num / 10 >= 1) {
            numCount += 'X'
            num -= 10
        } else if (num / 9 >= 1) {
            numCount += 'IX'
            num -= 9
        } else if (num / 5 >= 1) {
            numCount += 'V'
            num -= 5
        } else if (num / 4 >= 1) {
            numCount += 'IV'
            num -= 4
        } else {
            numCount += 'I'
            num--
        }
    }
    return numCount
}
