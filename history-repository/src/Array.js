/*
 * @Date: 2022-01-28 10:10:45
 * @Description: 数组操作
 * @FilePath: \leetcode\src\Array.js
 */

/** 旋转图像
 * 
输入：matrix = [  [1,2,3],  [4,5,6],  [7,8,9]  ]

输出：[  [7,4,1],  [8,5,2],  [9,6,3]  ]



输入：matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]

输出：[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

 */
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
    // let listMap = {};
    // const list = [];
    // for (let i = matrix.length - 1; i >= 0; i--) {
    //     // debugger;
    //     const curList = matrix[i];
    //     for (let j = 0; j < curList.length; j++) {
    //         if (!listMap[j]) {
    //             listMap[j] = [curList[j]];
    //         } else {
    //             listMap[j].push(curList[j]);
    //         }
    //     }
    // }
    // for (let key in listMap) {
    //     list.push(listMap[key]);
    // }
    // return list;

    // 先上下交换
    let listLen = matrix.length;
    for (let i = 0; i < listLen / 2; i++) {
        let tempList = matrix[i];
        matrix[i] = matrix[listLen - 1 - i];
        matrix[listLen - i - 1] = tempList;
    }

    //在按照对角线交换
    for (let i = 0; i < listLen; ++i) {
        for (let j = i + 1; j < listLen; ++j) {
            let temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }
    return matrix;
};

console.log(
    rotate([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
    ])
);

/**数独
 * 请你判断一个 9 x 9 的数独是否有效。只需要 根据以下规则 ，验证已经填入的数字是否有效即可
 * 数字 1-9 在每一行只能出现一次
 * 数字 1-9 在每一列只能出现一次
 * 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。（请参考示例图）
 * 注意：

一个有效的数独（部分已被填充）不一定是可解的。
只需要根据以上规则，验证已经填入的数字是否有效即可。
空白格用 '.' 表示。
 */
// board的每一项对应的是列
// 输入：board =
// [["5", "3", ".", ".", "7", ".", ".", ".", "."]
// ,["6", ".", ".", "1", "9", "5", ".", ".", "."]
// ,[".", "9", "8", ".", ".", ".", ".", "6", "."]
// ,["8",".",".",".","6",".",".",".","3"]
// ,["4",".",".","8",".","3",".",".","1"]
// ,["7",".",".",".","2",".",".",".","6"]
// ,[".","6",".",".",".",".","2","8","."]
// ,[".",".",".","4","1","9",".",".","5"]
// ,[".",".",".",".","8",".",".","7","9"]]
// 输出：true

// 输入：board =
// [
// ["8","3",".",".","7",".",".",".","."]
// ,["6",".",".","1","9","5",".",".","."]
// ,[".","9","8",".",".",".",".","6","."]
// ,["8",".",".",".","6",".",".",".","3"]
// ,["4",".",".","8",".","3",".",".","1"]
// ,["7",".",".",".","2",".",".",".","6"]
// ,[".","6",".",".",".",".","2","8","."]
// ,[".",".",".","4","1","9",".",".","5"]
// ,[".",".",".",".","8",".",".","7","9"]
// ]
// 输出：false
// 解释：除了第一行的第一个数字从 5 改为 8 以外，空格内其他数字均与 示例1 相同。 但由于位于左上角的 3x3 宫内有两个 8 存在, 因此这个数独是无效的。
// 提示：
// board.length == 9
// board[i].length == 9
// board[i][j] 是一位数字（1-9）或者 '.'
/**
 * 区间段处理：
 * [i0-i2]
 * [i3-i5]
 * [i6-i8]
 *
 */
/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
    // for (let i = 0; i < board.length; i++) {
    //     const curList = board[i];
    //     for (let j = 0; j < curList.length; j++) {

    //     }
    // }
    let row = {};
    let col = {};
    let box = {};
    for (let i = 0; i < board.length; i++) {
        const curList = board[i];
        for (let j = 0; j < curList.length; j++) {
            let num = curList[j];
            if (num !== '.') {
                let boxindex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
                if (row[i + '' + num] || col[j + '' + num] || box[boxindex + '' + num]) {
                    // 横列row要不能有一致的  竖列col不能有一致的  小方块中不能有一致的
                    return false;
                }
                row[i + '' + num] = true;
                col[j + '' + num] = true;
                box[boxindex + '' + num] = true;
            }
        }
    }
    console.log(row, col, box);
    return true;
};

const a = [
    ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
    ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
    ['.', '9', '8', '.', '.', '.', '.', '6', '.'],

    ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
    ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
    ['7', '.', '.', '.', '2', '.', '.', '.', '6'],

    ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
    ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
    ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
];
// console.log(isValidSudoku(a));

/**两数之和
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标
 * 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
 * 你可以按任意顺序返回答案
 * 只会存在一个有效答案
 */
//  输入：nums = [2,7,11,15], target = 9
//  输出：[0,1]
//  解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1]
// 输入：nums = [3,3], target = 6
// 输出：[0,1]
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    // 方案1：暴力求解
    // 执行用时： 160 ms , 在所有 JavaScript 提交中击败了 17.09% 的用户
    // 内存消耗： 41.6 MB , 在所有 JavaScript 提交中击败了 12.50% 的用户
    // for (let i = 0; i < nums.length; i++) {
    //     let targetIndex = nums.indexOf(target - nums[i])
    //     if (targetIndex > -1 && targetIndex !== i) {
    //         return [i, targetIndex]
    //     }
    // }

    // 方案2:  哈希表
    // 执行用时： 68 ms , 在所有 JavaScript 提交中击败了 92.48% 的用户
    // 内存消耗： 42 MB , 在所有 JavaScript 提交中击败了 9.97% 的用户
    const resolveObj = {};
    for (let i = 0; i < nums.length; i++) {
        if (resolveObj.hasOwnProperty(nums[i])) {
            return [resolveObj[nums[i]], i];
        } else {
            resolveObj[target - nums[i]] = i;
        }
    }
};

// console.log(twoSum([2, 7, 11, 15], 9))

/**移动零 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序
 * 请注意 ，必须在不复制数组的情况下原地对数组进行操作。
 */
//  输入: nums = [0,1,0,3,12]
//  输出: [1,3,12,0,0]
// 输入: nums = [0]
// 输出: [0]
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
    // 方案实现1： (有点过度设计了)
    // 执行用时： 308 ms , 在所有 JavaScript 提交中击败了 13.52% 的用户
    // 内存消耗： 51.3 MB , 在所有 JavaScript 提交中击败了 5.05% 的用户
    // left: 非零指针
    // let left = nums.findIndex((num) => num !== 0)
    // // right: 0值指针
    // let right = nums.indexOf(0)
    // let numsLen = nums.length
    // if (right < 0 || left < 0 || numsLen < 2) {
    //     return nums
    // }
    // if (left > right) {
    //     // 先调整两个指针位置,非零指针在前
    //     let curLeft = left
    //     left = right
    //     right = curLeft
    //     nums[left] = nums[right]
    //     nums[right] = 0
    // } else {
    //     left = right - 1
    // }
    // while (right < numsLen) {
    //     if (nums[++right] && nums[right] !== 0) {
    //         nums[++left] = nums[right]
    //         nums[right] = 0
    //     }
    //     console.log(right, left, '打印看看')
    // }
    // return nums

    // 方案2：
    // 执行用时： 84 ms , 在所有 JavaScript 提交中击败了 94.16% 的用户
    // 内存消耗： 46.2 MB , 在所有 JavaScript 提交中击败了 5.05% 的用户
    let zeroCount = 0;
    // 题解：这里可以参照双指针的思路解决，指针j是一直往后移动的，如果指向的值不等于0才对他进行操作。而i统计的是前面0的个数，我们可以把j-i看做另一个指针，它是指向前面第一个0的位置，然后我们让j指向的值和j-i指向的值交换
    for (let left = 0; left < nums.length; left++) {
        if (nums[left] === 0) {
            zeroCount++;
        } else if (zeroCount !== 0) {
            nums[left - zeroCount] = nums[left];
            nums[left] = 0;
        }
    }
    return nums;
};
// console.log(moveZeroes([0, 1, 0, 3, 12]))
// console.log(moveZeroes([1, 0, 1]))
// console.log(moveZeroes([0, 1, 0, 3, 12]))
// console.log(moveZeroes([4, 2, 4, 0, 0, 3, 0, 5, 1, 0]))

/**加一
 * 给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一
 * 最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。
 * 你可以假设除了整数 0 之外，这个整数不会以零开头。
 * @param {number[]} digits
 * @return {number[]}
 * 1 <= digits.length <= 100
 * 0 <= digits[i] <= 9
 */
//  输入：digits = [1,2,3]
//  输出：[1,2,4]
//  解释：输入数组表示数字 123。
var plusOne = function (digits) {
    let increase = 1;
    const digistLen = digits.length;
    // 执行用时：64 ms, 在所有 JavaScript 提交中击败了87.17%的用户
    // 内存消耗：40.9 MB, 在所有 JavaScript 提交中击败了11.07%的用户
    for (let i = digistLen - 1; i >= 0; i--) {
        // 原有写法

        // 如果还存在进位
        // if (increase) {
        // 判断当前项是否溢出
        // if (digits[i] + increase > 9) {
        //     // digits[i] = 0
        //     // if (i === 0) {
        //     //     digits.unshift(1)
        //     // }
        // } else {
        //     digits[i] = digits[i] + increase
        //     // 进位被消耗
        //     increase = 0
        // }
        // } else {
        //     break;
        // }

        // 改进:
        digits[i] = digits[i] + 1;
        digits[i] = digits[i] % 10;
        if (digits[i] !== 0) {
            return digits;
        }
    }

    digits.unshift(1);
    return digits;
};
// console.log(plusOne([9]))

/**两个数组的交集 II
 * 给你两个整数数组 nums1 和 nums2 ，请你以数组形式返回两数组的交集。
 * 返回结果中每个元素出现的次数，应与元素在两个数组中都出现的次数一致（如果出现次数不一致，则考虑取较小值）。可以不考虑输出结果的顺序
 *
 * 本题除了双指针，可存一个哈希表，即用短的数组遍历，保存一个对象数组结构，把短的每个不重复的数字作为key,value存出现次数
 * 之后遍历长数组，每一项去匹配之前的哈希表(对象),当有值的时候，即为交集，存入交集数组，并对应value -1，然后进入下一项匹配
 *
 * @param {*} nums
 * @returns
 * eg:
 * 输入：nums1 = [1,2,2,1], nums2 = [2,2]
 * 输出：[2,2]
 */
var intersect = function (nums1, nums2) {
    /** 实现1思路跟题解不一致，题解只需要返回数字交集， 不需要顺序上的交集 */
    // function compareLen(list1, list2) {
    //     let longNums = null
    //     let shortNums = null
    //     if (!(list1.length < list2.length)) {
    //         longNums = list1
    //         shortNums = list2
    //     } else {
    //         longNums = list2
    //         shortNums = list1
    //     }
    //     return {
    //         longNums,
    //         shortNums,
    //     }
    // }
    // /**先找出两个数组标识长短 */
    // const { longNums, shortNums } = compareLen(nums1, nums2)
    // console.log(longNums, shortNums, '12')
    // // markArr: [起始点，终点，count]
    // let markArr = [null, 0, 0]
    // // getLongFirst: 获取更长的数组对应的index
    // let longIndex = null
    // for (i = 0; i < shortNums.length; i++) {
    //     longIndex = typeof longIndex === 'number' ? longIndex : longNums.indexOf(shortNums[i])
    //     if (longIndex > -1) {
    //         // 如果当前起始点不是null, 那记录起始点
    //         if (Object.prototype.toString.call(markArr[0]) === '[object Null]') {
    //             markArr[0] = i
    //             markArr[2] = ++markArr[2]
    //         }
    //         // 存在起始点，判断下一个
    //         else {
    //             if (shortNums[i] !== longNums[longIndex] && typeof markArr[0] === 'number') {
    //                 markArr[1] = i - 1
    //                 break
    //             } else if (shortNums[i] === longNums[longIndex] && typeof markArr[0] === 'number') {
    //                 markArr[1] = i
    //                 markArr[2] = ++markArr[2]
    //             }
    //         }
    //         ++longIndex
    //     } else {
    //         markArr = [0, 0, 0]
    //     }
    // }
    // console.log(markArr, '打印mark')
    // if (markArr[2] === 0) {
    //     return []
    // } else {
    //     return shortNums.slice(markArr[0], markArr[1] + 1)
    // }
    function compareLen(list1, list2) {
        let BigNums = null;
        let smallNums = null;
        // 默认sort会按照字符串比较大小，首先它比较第一个字符串的索引，如果第一个字符串的索引和那个比较的字符串中的第一个字符串的索引不相等就比较第一个字符串的索引，不再比较后面的，不管后面有没有大于它的，如果相等那么继续比较后面的字符串索引，直到比较完最后一个字符串的索引
        // 如果需要按照number比较，需要传入自定义比较参数 (a, b) => a - b -》 表示正序
        list1.sort((a, b) => a - b);
        list2.sort((a, b) => a - b);
        if (!(list1[0] < list2[0])) {
            BigNums = list1;
            smallNums = list2;
        } else {
            BigNums = list2;
            smallNums = list1;
        }
        return {
            BigNums,
            smallNums,
        };
    }
    // /**先找出两个数组标识长短 */
    const { BigNums, smallNums } = compareLen(nums1, nums2);
    let commonList = [];
    var left = 0;
    var right = 0;
    do {
        if (smallNums[left] < BigNums[right]) {
            left++;
        } else if (smallNums[left] > BigNums[right]) {
            right++;
        } else {
            commonList.push(smallNums[left]);
            left++;
            right++;
        }
    } while (left < smallNums.length && right < BigNums.length);
    return commonList.sort();
};
// console.log(intersect([1, 2, 2, 1], [2, 2]))
// console.log(
//     intersect(
//         [
//             61, 24, 20, 58, 95, 53, 17, 32, 45, 85, 70, 20, 83, 62, 35, 89, 5, 95, 12, 86, 58, 77, 30, 64, 46, 13, 5, 92, 67, 40, 20, 38, 31, 18, 89,
//             85, 7, 30, 67, 34, 62, 35, 47, 98, 3, 41, 53, 26, 66, 40, 54, 44, 57, 46, 70, 60, 4, 63, 82, 42, 65, 59, 17, 98, 29, 72, 1, 96, 82, 66,
//             98, 6, 92, 31, 43, 81, 88, 60, 10, 55, 66, 82, 0, 79, 11, 81,
//         ],
//         [
//             5, 25, 4, 39, 57, 49, 93, 79, 7, 8, 49, 89, 2, 7, 73, 88, 45, 15, 34, 92, 84, 38, 85, 34, 16, 6, 99, 0, 2, 36, 68, 52, 73, 50, 77, 44, 61,
//             48,
//         ]
//     )
// )
// console.log([5, 4, 57, 79, 7, 89, 88, 45, 34, 92, 38, 85, 6, 0, 77, 44, 61].sort())
// console.log(intersect([1], [1]))
// console.log(intersect([2,1], [1, 2]));
// console.log(intersect([4, 9, 5], [9, 4, 9, 8, 4]))

/**
 * 只出现一次的数字，给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
 * @param {*} nums
 * @param {*} k
 * 输入: [2,2,1]
 * 输出: 1
 */
var singleNumber = function (nums) {
    let getNum = null;
    // let hasShow = []
    // for (let i = 0; i < nums.length; i++) {
    //     if (!hasShow.includes(nums[i]) && nums.lastIndexOf(nums[i]) === i) {
    //         getNum = nums[i]
    //         break
    //     } else {
    //         hasShow.push(nums[i])
    //     }
    // }
    // 先排序
    // nums.sort()
    // for (let i = 0; i < nums.length; i+=2) {
    //     if (nums[i] !== nums[i + 1]) {
    //         // 奇数比较
    //         getNum = nums[i]
    //         break
    //     }
    // }
    // return getNum
    // 异或运算, 原理： 例如： 1^2^2 输出1
    return nums.reduce((total, el) => total ^ el, 0);
};
// console.log(singleNumber([2, 2, 1]))

/**旋转数组
 * @param {number[]} nums
 * @param {number} k 非负整数
 * @return {void} Do not return anything, modify nums in-place instead.
 */
//  输入: nums = [1,2,3,4,5,6,7], k = 3
//  输出: [5,6,7,1,2,3,4]
//  解释:
//  向右轮转 1 步: [7,1,2,3,4,5,6]
//  向右轮转 2 步: [6,7,1,2,3,4,5]
//  向右轮转 3 步: [5,6,7,1,2,3,4]
/** 每一项在经历了K次旋转后对应的下标符合 [([i+k]: 每一项后移的次数)%数组长度: %4超过长度取余数] 取余即使旋转结束后所处的位置 */
var rotate = function (nums, k) {
    // 方法一：使用额外的数组
    // let tempNums = nums.slice(0)
    // for (let i = 0; i < nums.length; i++) {
    //     const curData = (i + k) % nums.length // 获取当前遍历项旋转后的最终下标
    //     nums[curData] = tempNums[i]
    // }
    // return nums
    // 方法二：环状替换
    // const gcd = (x, y) => (y ? gcd(y, x % y) : x)
    // const n = nums.length
    // k = k % n
    // let count = gcd(k, n)
    // for (let start = 0; start < count; ++start) {
    //     let current = start
    //     let prev = nums[start]
    //     do {
    //         const next = (current + k) % n
    //         const temp = nums[next]
    //         nums[next] = prev
    //         prev = temp
    //         current = next
    //         console.log(start, current);
    //     } while (start !== current)
    // }
    // 方法三：数组翻转
    // const reverse = (nums, start, end) => {
    //     while (start < end) {
    //         const temp = nums[start]
    //         nums[start] = nums[end]
    //         nums[end] = temp
    //         start += 1
    //         end -= 1
    //     }
    // }
    // k %= nums.length
    // reverse(nums, 0, nums.length - 1)
    // reverse(nums, 0, k - 1)
    // reverse(nums, k, nums.length - 1)
};
// console.log(rotate([1, 2, 3, 4], 3))

/**存在重复元素
 * 给你一个整数数组 nums 。如果任一值在数组中出现 至少两次 ，返回 true ；如果数组中每个元素互不相同，返回 false
 * @param {number[]} nums
 * @return {boolean}
 */
//  输入：nums = [1,1,1,3,3,4,3,2,4,2]
//  输出：true
var containsDuplicate = function (nums) {
    const newList = Array.from(new Set(nums));
    return newList.length < nums.length;
};

/**删除排序数组中的重复项
 * @param {number[]} nums
 * @return {number}
 */
//  输入：nums = [1,1,2]
//  输出：2, nums = [1,2]
//  解释：函数应该返回新的长度 2 ，并且原数组 nums 的前两个元素被修改为 1, 2 。不需要考虑数组中超出新长度后面的元素。
var removeDuplicates = function (nums) {
    let left = 0;
    for (let right = 1; right < nums.length; right++) {
        if (nums[right] !== nums[left]) {
            nums[++left] = nums[right];
        }
    }
    return ++left;
};

/** 买卖股票的最佳时机 II
 * @param {number[]} prices
 * @return {number}
 */
//  输入: prices = [7,1,5,3,6,4]
//  输出: 7
//  解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
//       随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。
var maxProfit = function (prices) {
    // 利润记录
    let profix = 0;
    // 记录价格锚点
    let buyPrice = prices[0];
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > buyPrice) {
            // 只要当前股价不是下跌，那么记录价格点位,并抛出
            profix += prices[i] - buyPrice;
        }
        buyPrice = prices[i];
    }
    return profix;
};
