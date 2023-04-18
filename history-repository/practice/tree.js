/**
 * 前序遍历：根节点->左子树->右子树（根->左->右）
 * 中序遍历：左子树->根节点->右子树（左->根->右）
 * 后序遍历：左子树->右子树->根节点（左->右->根）
 */

/**
 * 前序遍历
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root) {
    // 递归解决
    // if (root == null) return []
    // const nodeList = []
    // getNode(root)
    // function getNode(root) {
    //     if (root == null) return
    //     nodeList.push(root.val)
    //     getNode(root.left)
    //     getNode(root.right)
    // }
    // return nodeList
    // 遍历法, 自己维护一个存放节点的栈
    if (root == null) return []
    const nodeList = []
    const stack = []
    stack.push(root)
    while (stack.length) {
        const cur = stack.pop() // 删除数组的最后一个元素并返回删除的元素。
        nodeList.push(cur.val)
        if (cur.right) {
            stack.push(cur.right)
        }
        if (cur.left) {
            stack.push(cur.left)
        }
    }
    return nodeList
}

/**给定一个二叉树的根节点root ，返回 它的中序遍历 左->根->右
 *
 * 输入：root = [1,null,2,3]
 * 输出：[1,3,2]
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
    if (root == null) return []
    let crossList = []
    getNode(root)
    function getNode(root) {
        console.log(root && root.val)
        if (root == null) return
        getNode(root.left, crossList)
        crossList.push(root.val)
        getNode(root.right, crossList)
    }
    return crossList
}
