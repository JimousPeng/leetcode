/**
 * 路径总和--减法处理
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
    if (root == null) return false;
    if (root.left == null && root.right == null && targetSum - root.val === 0) {
        return true;
    }
    return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);
};

/**
 * 对称二叉树
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
    if (root == null) return;

    function checkTree(left, right) {
        if (left == null && right == null) return true;
        if (left == null || right == null) return false;
        return left.val == right.val && checkTree(left.left, right.right) && checkTree(left.right, right.left);
    }

    return checkTree(root, root);
};

/**
 * 二叉树的最大深度
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
    let depth = 0;

    function getDepth(root, dep) {
        if (root == null) return dep;
        return Math.max(getDepth(root.left, dep + 1), getDepth(root.right, dep + 1));
    }
    return getDepth(root, depth);
};
