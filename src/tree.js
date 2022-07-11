/*
 * @Author: jimouspeng
 * @LastEditTime: 2022-07-11 09:44:38
 * @Description: 二叉树
 * @FilePath: \leetcode\src\tree.js
 * 可以输入预定的版权声明、个性签名、空行等
 */

/** 二叉树的最大深度
 * 给定一个二叉树，找出其最大深度
 * 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数
 * 说明: 叶子节点是指没有子节点的节点
 * 给定二叉树 [3,9,20,null,null,15,7]
 * 返回它的最大深度 3
 */

/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
    if (root.length === 0) {
        return 0;
    }
    let maxDeep = 0;
    let idx = 0;
    while (root[idx]) {
        maxDeep += 1;
        idx = 2^maxDeep - 1
    }
};
