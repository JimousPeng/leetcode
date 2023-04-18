/*
 * @Author: jimouspeng
 * @LastEditTime: 2022-09-17 10:05:33
 * @Description: 二叉树
 * @FilePath: \leetcode\src\tree.js
 * 可以输入预定的版权声明、个性签名、空行等
 */

/** 验证二叉搜索树-给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树
 * 有效 二叉搜索树定义如下：

节点的左子树只包含 小于 当前节点的数。
节点的右子树只包含 大于 当前节点的数。
所有左子树和右子树自身必须也是二叉搜索树
  */
/**
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
var isValidBST = function (root) {
    return isValidBST(root, Infinity, -Infinity)
}

isValidBST = function (root, maxNum = Infinity, minNum = -Infinity) {
    if (root === null) {
        return true
    }
    if (root.val >= maxNum || root.val <= minNum) {
        return false
    }
    return isValidBST(root.left, root.val, -Infinity) && isValidBST(root.right, Infinity, root.val)
}
