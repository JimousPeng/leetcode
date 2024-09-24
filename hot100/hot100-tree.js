/** hot100 - 二叉树 */

/**
 * 94. 二叉树的中序遍历 给定一个二叉树的根节点 root ，返回 它的 中序 遍历 。
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
    /** 中序遍历 - root 节点在中间 */

    /**
     *  假设有二叉树 [1,2,3,4,5]
     *      1
     *    2   3
     *  4  5
     *
     * 递归的深度遍历在于通过函数调用栈，将节点一层一层往下遍历
     * 要注意处理递归的结束条件 - 不然就会栈溢出
     *
     * 迭代法: 本质上是将root的节点处理保存到stack中，来模拟函数调用栈过程
     * <重点在于清楚何时入栈，何时取值>
     * stack = []  node = 1
     * stack = [1, 2, 4]
     *
     *
     */

    /** 递归深度遍历 */
    function dep() {
        const res = []
        function dfs(root) {
            if (root === null) return
            dfs(root.left)
            res.push(root.val)
            dfs(root.right)
        }
        dfs(root)
        return res
    }

    function useStack() {
        const res = []
        let node = root
        const stack = []
        while (stack.length || node) {
            if (node !== null) {
                stack.push(node) // 有效节点入栈，从root节点开始
            }
            let nodeLeft = node?.left
            while (nodeLeft) {
                // 将左子树全部入栈
                stack.push(nodeLeft)
                nodeLeft = nodeLeft.left
            }
            // 此时 stack 栈尾为最末端的左子节点，取出该节点
            node = stack.pop()
            res.push(node.val) // 因为左子树是最先入栈，所以依次将stack中的节点取出放入res数组中即可
            node = node.right // 指针指向右子树
        }
        return res
    }
}

/**
 * 104. 二叉树的最大深度 给定一个二叉树 root ，返回其最大深度
 * 二叉树的 最大深度 是指从根节点到最远叶子节点的最长路径上的节点数
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {}
