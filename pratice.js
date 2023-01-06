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
        if (nums[right]) {
            let nextVal = nums[right];
            nums[++left] = nextVal;
            right++;
        } else {
            return left + 1;
        }
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
