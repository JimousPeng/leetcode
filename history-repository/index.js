/**
 * 108. 将有序数组转换为一棵 高度平衡 二叉搜索树 —— 高度平衡: 即树的高度一致。
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
    function tranformTree(root) {
        // 生成二叉树
        new TreeNode(root, left, right);
    }
};

// 100. 相同的树
var isSameTree = function (p, q) {
    let isSame = true;
    /** 对树遍历 */
    function crossTree(root1, root2) {
        if (root1 == null || root2 == null) {
            isSame = root1 !== null || root2 !== null;
            return;
        }
        if (root1.val !== root2.val) {
            isSame = false;
            return;
        }
        crossTree(root1.left, root2.left);
        crossTree(root1.right, root2.right);
    }
    crossTree(p, q);
    return isSame;
};

/**
 * 你一个整数数组 nums ，和两个整数 limit 与 goal 。数组 nums 有一条重要属性：abs(nums[i]) <= limit 。

返回使数组元素总和等于 goal 所需要向数组中添加的 最少元素数量 ，添加元素 不应改变 数组中 abs(nums[i]) <= limit 这一属性。

注意，如果 x >= 0 ，那么 abs(x) 等于 x ；否则，等于 -x 。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/minimum-elements-to-add-to-form-a-given-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * 
 * @param {*} nums 
 * @param {*} limit  1 <= limit <= 106
 * @param {*} goal 
 */

var minElements = function (nums, limit, goal) {
    // limit最大值, goal目标值 1 <= limit <= 106
    const curNum = nums.reduce((total, num) => {
        total += num;
        return total;
    }, 0);
    let goalRes = goal - curNum;
    let goalNum = 0;
    if (goalRes > 0) {
        while (goalRes > 0) {
            goalRes = goalRes - limit;
            goalNum++;
        }
    } else {
        while (goalRes < 0) {
            goalRes = goalRes + limit;
            goalNum++;
        }
    }
    return goalNum;
};
let nums = [1, -1, 1],
    limit = 3,
    goal = -4;
const num = minElements(nums, limit, goal);
// console.log(num);
