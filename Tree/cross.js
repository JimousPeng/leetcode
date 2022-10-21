/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 *
 * 前中后序遍历决定了root所处的位置
 */

/**
 * 前序遍历, root-left-right
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root) {
    if (root === null) return [];
    const treeList = [];

    function crossTree(root, list) {
        if (root == null) return;
        list.push(root.val);
        crossTree(root.left, list);
        crossTree(root.right, list);
    }
    crossTree(root, treeList);
    return treeList;
};

/**
 * 中序遍历, left-root-right
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
    if (root === null) return [];
    const treeList = [];

    function crossTree(root, list) {
        if (root == null) return;
        crossTree(root.left, list);
        list.push(root.val);
        crossTree(root.right, list);
    }
    crossTree(root, treeList);
    return treeList;
};

/**
 * 后序遍历, left-right-root
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function (root) {
    if (root === null) return [];
    const treeList = [];

    function crossTree(root, list) {
        if (root == null) return;
        crossTree(root.left, list);
        crossTree(root.right, list);
        list.push(root.val);
    }
    crossTree(root, treeList);
    return treeList;
};
