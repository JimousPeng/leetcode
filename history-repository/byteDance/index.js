function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}
function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

/** 青蛙过河
 * 一只青蛙想要过河。 假定河流被等分为若干个单元格，并且在每一个单元格内都有可能放有一块石子（也有可能没有）。 青蛙可以跳上石子，但是不可以跳入水中
 * 给你石子的位置列表 stones（用单元格序号 升序 表示）， 请判定青蛙能否成功过河（即能否在最后一步跳至最后一块石子上）。
 *
 * 开始时， 青蛙默认已站在第一块石子上，并可以假定它第一步只能跳跃 1 个单位（即只能从单元格 1 跳至单元格 2 ）
 * 如果青蛙上一步跳跃了 k 个单位，那么它接下来的跳跃距离只能选择为 k - 1、k 或 k + 1 个单位。 另请注意，青蛙只能向前方（终点的方向）跳跃
 *
 * 输入：stones = [0,1,3,5,6,8,12,17]
 * 输出：true
 * 解释：青蛙可以成功过河，按照如下方案跳跃：
 * 跳 1 个单位到第 2 块石子,
 * 然后跳 2 个单位到第 3 块石子,
 * 接着 跳 2 个单位到第 4 块石子,
 * 然后跳 3 个单位到第 6 块石子, 跳 4 个单位到第 7 块石子, 最后，跳 5 个单位到第 8 个石子（即最后一块石子）。
 * @param {number[]} stones
 * @return {boolean}
 */
var canCross = function (stones) {
    let nextScrop = [];
    for (let i = 1; i < stones.length; i++) {
        const nextstep = stones[i] - stones[i - 1];
    }
};

/** 寻找峰值
 * 峰值元素是指其值严格大于左右相邻值的元素;
 * 给你一个整数数组 nums，找到峰值元素并返回其索引。数组可能包含多个峰值，在这种情况下，返回 任何一个峰值 所在位置即可
 * @param {number[]} nums
 * @return {number}
 */
 var findPeakElement = function (nums) {
    if (nums.length === 1) return nums[0];
    for (let i = 1; i < nums.length - 1; i++) {
        const nextNum = nums[i + 1] || Infinity;
        const prevNum = nums[i - 1];
        if (nums[i] > prevNum && nums[i] < nextNum) {
            return i;
        }
    }
};

/** 阶乘后的零
 * 给定一个整数 n ，返回 n! 结果中尾随零的数量
 * 提示 n! = n * (n - 1) * (n - 2) * ... * 3 * 2 * 1
 *
 * 输入：n = 3
 * 输出：0
 * 解释：3! = 6 ，不含尾随 0
 *
 * 如果直接计算阶乘的值，大数无法处理，需要转换思路
 *
 * 转换为求5的倍数
 * @param {number} n
 * @return {number}
 */
var trailingZeroes = function (n) {
    let ans = 0;
    while (n !== 0) {
        n = Math.floor(n / 5);
        ans += n;
    }
    return ans;
};

console.log(trailingZeroes(5), '???');
