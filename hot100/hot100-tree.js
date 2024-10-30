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
var maxDepth = function (root) {
    /** 最大深度，那就用递归处理 */
    function useDfs() {
        if (root === null) return 0
        let max = 1
        function dep(root, deep) {
            if (root.left === null && root.right === null) {
                max = Math.max(max, deep)
                return
            }
            if (root.left == null) {
                return dep(root.right, deep + 1)
            }
            if (root.right === null) {
                return dep(root.left, deep + 1)
            }
            dep(root.left, deep + 1)
            dep(root.right, deep + 1)
        }
        dep(root, 1)
        return max
    }

    /** 递归优化
     * 如果我们知道了左子树和右子树的最大深度 l 和 r，那么该二叉树的最大深度即为
     * max(l, r)+1
     * 而左子树和右子树的最大深度又可以以同样的方式进行计算
     */
    function useDfsOptimize() {
        function dep(root) {
            if (root === null) return 0
            return Math.max(dep(root.left), dep(root.right)) + 1
        }
        return dep(root)
    }

    /** 广度遍历, 也就是层序遍历 */
    function bfs() {
        if (root === null) return 0
        let stack = []
        stack.push(root)
        let res = 0
        while (stack.length) {
            let nextStack = []
            for (let i = 0; i < stack.length; i++) {
                const node = stack[i]
                if (node.left) nextStack.push(node.left)
                if (node.right) nextStack.push(node.right)
            }
            stack = nextStack
            res++
        }
        return res
    }
}

/**
 * 226. 翻转二叉树
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {

    // 翻转的场景适合用中序遍历
    function dep(root) {
        if(root == null) return

        const tempNode = root.left

        root.left = root.right
        root.right = tempNode

        dep(root.left)
        dep(root.right)
    }
    dep(root)

    return root
};

/**
 * 101. 对称二叉树
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
    
};
