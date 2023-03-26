/** 从前序与中序遍历序列构造二叉树
 * 前序遍历：根节点->左子树->右子树（根->左->右）
 * 中序遍历：左子树->根节点->右子树（左->根->右）
 * 后序遍历：左子树->右子树->根节点（左->右->根）
 *
 * 输入: preorder = [3,9,20,15,7] 先序遍历, inorder = [9,3,15,20,7] 中序遍历
 * 输出: [3,9,20,null,null,15,7]
 *
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
    const targetRoot = new TreeNode(preorder[0])
}

/** 二叉树的锯齿形层次遍历
 * 给你二叉树的根节点 root ，返回其节点值的 锯齿形层序遍历
 * （即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。
 *
 * 输入：root = [3,9,20,null,null,15,7]
 * 输出：[[3],[20,9],[15,7]]
 *
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function (root) {
    if (root == null) return []
    const treeList = []
    putNode(root, 0)
    function putNode(root, idx) {
        if (root == null) return
        if (!treeList[idx]) {
            treeList[idx] = []
        }
        idx % 2 === 0 ? treeList[idx].push(root.val) : treeList[idx].unshift(root.val)
        putNode(root.left, idx + 1)
        putNode(root.right, idx + 1)
        return treeList
    }
    return treeList
}
//
//

/** 二叉树的中序遍历
 *  给定一个二叉树的根节点 root ，返回 它的 中序 遍历
 *
 * 中序遍历： 首先遍历左子树，然后访问根结点，最后遍历右子树
 *
 * 输入：root = [1,null,2,3]
 * 输出：[1,3,2]
 *
 * 输入：root = [1]
 * 输出：[1]
 *
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
    if (root == null) return []
    let initList = []
    return inorder(root, initList)
}

function inorder(root, initList) {
    if (root == null) return //递归的终止条件
    inorder(root.left, initList)
    initList.push(root.val)
    inorder(root.right, initList)
    return initList
}
