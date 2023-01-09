/** 反转字符串
 * 编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 s 的形式给出
 * 
 * 直接前后双指针处理
 *
 * 输入：s = ["h","e","l","l","o"]
 * 输出：["o","l","l","e","h"]
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {};

/** 字符串相乘
 * 定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式
 */
var multiply = function (num1, num2) {
    if (num1 === '0' || num2 === '0') return '0';
    const num1Len = num1.length;
    const num2Len = num2.length;
    const strList = new Array(num1Len + num2Len).fill(0);
    for (let i = num1Len - 1; i >= 0; i--) {
        for (let j = num2Len - 1; j >= 0; j--) {
            // 将当前位的相乘结果加上要放置的新的数组对应的下标内的值，该值保存了上次相加的进位数
            // 比如 12 * 9； strList初始值是[0, 0, 0], 当倒叙遍历时， 计算2*9的值是放在strList[2]内，先加上该值(初始值是0), 然后个位取余数，十分位取整数位。
            // 当计算1 * 9的时候，i + j + 1即是取的strList[1],
            const sumTotal = num1[i] * num2[j] + strList[i + j + 1];

            const tensPlace = Math.floor(sumTotal / 10);
            const onesPlace = sumTotal % 10;

            strList[i + j] = tensPlace + strList[i + j];
            strList[i + j + 1] = onesPlace;
        }
    }
    /** 判断首位是否有溢出 */
    if (strList[0] === 0) {
        strList.shift();
    }
    return strList.join('');
};
console.log(multiply('123456789', '987654321'));

/** 盛最多水的容器
 * 给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i])
 * 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水
 * 返回容器可以储存的最大水量
 *
 * 输入：[1,8,6,2,5,4,8,3,7]
 * 输出：49
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
    // const areaList = []; // 用数组反而浪费空间
    let maxArea = 0;
    const heightLen = height.length;
    let maxHeight = height[0];
    let maxIndex = 0;
    for (let i = 1; i < heightLen; i++) {
        const heightIdx = Math.min(height[i], maxHeight);
        const heightCalculate = heightIdx * (i - maxIndex);
        // areaList.push(heightCalculate);
        maxArea = Math.max(maxArea, heightCalculate);
        if (height[i] > maxHeight) {
            maxHeight = height[i];
            maxIndex = i;
        }
    }
    return maxArea;
};
console.log(maxArea([1, 2, 1]));

/** 删除排序数组中的重复项
 *
 * 给你一个 升序排列 的数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度
 * 元素的 相对顺序 应该保持 一致 。
 * 如果在删除重复项之后有 k 个元素，那么 nums 的前 k 个元素应该保存最终结果
 *
 * 输入：nums = [1,1,2]  输出：2, nums = [1,2,_]
 *
 * @param {number[]} nums  1 <= nums.length <= 3 * 104
 * @return {number}
 */
var removeDuplicates = function (nums) {
    const len = nums.length;
    let left = 0;
    let right = 1;
    while (right <= len - 1) {
        while (nums[right] === nums[left]) {
            right++;
        }
        if (nums[right] !== undefined) {
            nums[++left] = nums[right];
        }
        right++;
    }
    return left + 1;
};
console.log(removeDuplicates([-1, 0, 0, 0, 0, 3, 3]));

/** 有效的括号
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效
 *
 * 有效字符串需满足
 * 左括号必须用相同类型的右括号闭合。
 * 左括号必须以正确的顺序闭合
 * 每个右括号都有一个对应的相同类型的左括号。
 *
 * s = "()[]{}"  输出：true
 * s = "(]"      输出：false
 *
 * 思路： 建立映射，如果遇到左符号，那么将右符号存入数组，当遍历字符串遇到当前的遍历项是当前数组的最后一位，那么表示闭合最近的符号，并将最后那位移除，进入下一次遍历。
 *
 * 1 <= s.length <= 104
 */
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    const kuohaoMap = {
        '(': ')',
        '[': ']',
        '{': '}',
    };
    let kuohaoList = [];
    const sList = s.split('');
    for (let i = 0; i < sList.length; i++) {
        const key = sList[i];
        if (kuohaoList[kuohaoList.length - 1] === key) {
            kuohaoList.splice(kuohaoList.length - 1, 1);
            continue;
        }
        kuohaoList.push(kuohaoMap[key]);
    }
    return kuohaoList.length === 0;
};

/** 最接近的三数之和
 *
 * 给你一个长度为 n 的整数数组 nums 和 一个目标值 target。请你从 nums 中选出三个整数，使它们的和与 target 最接近
 * 假定每组输入只存在恰好一个解。
 *
 * nums = [-1,2,1,-4], target = 1；  输出：2，  与 target 最接近的和是 2 (-1 + 2 + 1 = 2)
 *
 * 思路： 要最接近，只需要找到差值最小的那个数
 *
 */
var threeSumClosest = function (nums, target) {
    if (nums.length === 3) {
        return nums.reduce((total, item) => {
            total = total + item;
            return total;
        }, 0);
    }
    nums.sort((a, b) => a - b);
    let minestNum = null;
    for (let i = 0; i < nums.length - 2; i++) {
        let left = i + 1;
        let right = nums.length - 1;
        while (left < right) {
            // 获取当前的三数之和
            let curNum = nums[i] + nums[left] + nums[right];
            if (minestNum === null) {
                minestNum = curNum;
            }

            if (curNum > target) {
                right--;
            } else if (curNum < target) {
                left++;
            } else {
                minestNum = curNum;
                return minestNum;
            }

            let targetNum = target - curNum;
            // 对比差值，如果比当前差值还小，那么更新差值锚点
            if (Math.abs(targetNum) < Math.abs(target - minestNum)) {
                minestNum = curNum;
            }
        }
    }
    return minestNum;
};

/** 三数之和
 *
 * 三数之和，转换成两数之和处理
 *
 * 给你一个整数数组 nums ，
 * 判断是否存在三元组 [nums[i], nums[j], nums[k]]
 * 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。
 * 请你返回所有和为 0 且不重复的三元组
 *
 * 输入：nums = [-1,0,1,2,-1,-4]
 * 输出：[[-1,-1,2],[-1,0,1]]
 *
 */
var threeSum = function (nums) {
    if (nums.length < 3) {
        return [];
    }
    // eg: [-1, 0, 1, 2, -1, -4]
    nums.sort((a, b) => a - b); // 先排序 -> [-4, -1, -1, 0, 1, 2]
    const resultList = [];
    for (let i = 0; i < nums.length - 2; i++) {
        if (nums[i] > 0) break;
        if (i > 0 && nums[i] === nums[i - 1]) continue; // 如果当前项之前已经遍历过了，那么需要跳过处理
        let left = i + 1;
        let right = nums.length - 1;
        while (left < right) {
            const sumTotal = nums[i] + nums[left] + nums[right];
            if (sumTotal === 0) {
                resultList.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) {
                    left++;
                }
                while (left < right && nums[right] === nums[right - 1]) {
                    right--;
                }
                left++;
                right--;
            } else if (sumTotal < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return resultList;
};

/** 最长公共前缀，
 *
 * 思路： 利用减法思想和锚点思想，将第一项定义为最大公共前缀，再去每一项匹配获取得到真正的最大公共前缀
 *
 *  strs = ["flower","flow","flight"]
 * "fl"
 *
 * 1 <= strs.length <= 200
 * strs[i] 仅由小写英文字母组成
 */
var longestCommonPrefix = function (strs) {
    return strs.reduce((total, item) => {
        while (!item.startsWith(total)) {
            // 如果当前项不是以total-当前最大公共前缀开始，那么继续处理公共前缀
            total = total.slice(0, total.length - 1);
        }
        return total;
    }, strs[0]);
};

/**
 * 字符串转换整数 (atoi)
 * @param {string} s
 * @return {number}
 *
 * 如果整数数超过 32 位有符号整数范围 [−231,  231 − 1] ，需要截断这个整数，使其保持在这个范围内。具体来说，小于 −231 的整数应该被固定为 −231 ，大于 231 − 1 的整数应该被固定为 231 − 1
 */
var myAtoi = function (s) {
    // -\+确定符号位
    let strList = s.match(/^[\s-\+]*\d+/g);
    if (!strList) return 0;
    let strS = strList.join('');
    if (!strS.match(/^\s*[-\+]?\d+/g)) {
        return 0;
    }
    strS = strS.match(/[-\+]?\d+/g).join('');
    const numStr = parseInt(strS);
    if (numStr < -2147483648) {
        return -2147483648;
    }
    if (numStr > 2147483647) {
        return 2147483647;
    }
    return numStr;
};
