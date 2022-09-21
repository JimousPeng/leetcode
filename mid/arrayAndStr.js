/**

 * 
输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]
解释：
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
不同的三元组是 [-1,0,1] 和 [-1,-1,2] 
注意，输出的顺序和三元组的顺序并不重要


输入：nums = [0,1,1]
输出：[]
解释：唯一可能的三元组和不为 0 

 * @param {number[]} nums
 * @return {number[][]}。
 */
var threeSum = function (nums) {
    nums.sort((a, b) => a - b); // 先排序
    console.log(nums);
    const listLen = nums.length;
    const targetList = [];
    /** 因为存在双指针操作，所以遍历到倒数第二位即可 */
    for (let i = 0; i < listLen - 2; i++) {
        /** 已经对数组排序的前提下，所以当前遍历项大于0，那么肯定无法找到累加为0的数 */
        if (nums[i] > 0) break;
        /** 过滤掉重复项 */
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        let left = i + 1; // 左指针
        let right = listLen - 1; // 右指针
        const targetNum = -nums[i]; // num[i] + (-num[i]) = 0
        while (left < right) {
            const sum = nums[left] + nums[right];
            if (sum === targetNum) {
                // 命中
                targetList.push([nums[i], nums[left], nums[right]]);
                /** 通过两个while，过滤掉重复的值 */
                while (left < right && nums[left] === nums[left + 1]) {
                    left++;
                }
                while (left < right && nums[right] === nums[right - 1]) {
                    right--;
                }
                left++;
                right--;
            } else if (sum < targetNum) {
                // 即sum + nums[i] < 0; 左指针前移
                left++;
            } else {
                // 即sum + nums[i] > 0; 右指针前移
                right--;
            }
        }
    }
    return targetList;
};

// console.log(threeSum([-1, 0, 1, 2, -1, -4]));

/**
 * 给定一个 m x n 的矩阵，如果一个元素为 0 ，则将其所在行和列的所有元素都设为 0 。请使用 原地 算法
 *
 * 输入：matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
 * 0 1 2 0      0 0 0 0
 * 3 4 5 2  =>  0 4 5 2
 * 1 3 1 5      0 3 1 0
 * 输出：[[0,0,0,0],[0,4,5,0],[0,3,1,0]]
 *
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
    const listLen = matrix.length;
    const zeroColumn = [];
    const zeroRow = [];
    for (let i = 0; i < listLen; i++) {
        const item = matrix[i];
        for (let j = 0; j < item.length; j++) {
            // debugger;
            /** 处理当前行 */
            let curZero = false;
            if (item[j] === 0) {
                curZero = true;
                zeroColumn.push(j);
                zeroRow.push(i);
                if (j !== 0) {
                    /** 如果不是第一位元素，把之前遍历的元素归零 */
                    let start = 0;
                    while (start < j) {
                        item[start] = 0;
                        start++;
                    }
                }
                if (i !== 0) {
                    /** 如果不是第一行，把之前的元素对应的列归零 */
                    let start = 0;
                    while (start < i) {
                        matrix[start][j] = 0;
                        start++;
                    }
                }
            }
            /** 处理列的影响 */
            if (zeroColumn.indexOf(j) > -1 || zeroRow.indexOf(i) > -1) {
                item[j] = 0;
            }
        }
    }
    return matrix;
};

// setZeroes([
//     [0, 1, 1],
//     [1, 0, 0],
//     [1, 1, 1],
// ]);
// console.log(
//     setZeroes([
//         [1, 1, 1],
//         [1, 0, 1],
//         [1, 1, 1],
//     ])
// );

/** 字母异位词分组
 * 给你一个字符串数组，请你将[字母异位词]组合在一起。可以按任意顺序返回结果列表
 * 字母异位词 是由重新排列源单词的字母得到的一个新单词，所有源单词中的字母通常恰好只用一次
 *
 * 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
 * 输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
 *
 * 输入: strs = [""]
 * 输入: strs = [""]
 *
 * 输入: strs = ["a"]
 * 输出: [["a"]]
 *
 * @param {string[]} strs
 * @return {string[][]}
 * strs[i] 仅包含小写字母
 * 0 <= strs[i].length <= 100
 * 1 <= strs.length <= 104
 */
var groupAnagrams = function (strs) {
    if (strs.length === 1) {
        return [[strs[0]]];
    }
    const strLen = strs.length;
    const targetList = [];
    let curStr = strs[0];
    for (let i = 1; i < strLen; i++) {}
};

