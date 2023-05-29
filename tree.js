/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**  572. 另一棵树的子树
 *   给你两棵二叉树 root 和 subRoot 。
 *   检验 root 中是否包含和 subRoot 具有相同结构和节点值的子树。如果存在，返回 true ；否则，返回 false
 *   二叉树 tree 的一棵子树包括 tree 的某个节点和这个节点的所有后代节点。tree 也可以看做它自身的一棵子树
 * 输入：root = [3,4,5,1,2], subRoot = [4,1,2] 输出：true
 * 
 *   思路： 递归遍历两棵树，先假设是子树；如果有不同的部分，则说明非子树，否则是子树
 */
let isSub = true
var isSubtree = function (root, subRoot) {

    function testSub() {

    }



    if (root === null) {
        return true
    }
    let rootLeft = root.left && root.left.val
    let subLeft = subRoot.left && subRoot.left.val
    let subRight = subRoot.right && subRoot.right.val
    let rootRight = root.right && root.right.val
    if (root.val !== subRoot.val || rootLeft !== subLeft || rootRight !== subRight) {
        return false
    }
    
}

/** 111. 二叉树的最小深度
 * 给定一个二叉树，找出其最小深度
 */
var minDepth = function (root) {
    if (root === null) return 0
    function findMin(root, deep) {
        if (root === null) return deep
        /** 子树为空需要过滤 */
        if (root.left === null && root.right !== null) {
            return findMin(root.right, deep + 1)
        }
        if (root.right === null && root.left !== null) {
            return findMin(root.left, deep + 1)
        }
        const leftDeep = findMin(root.left, deep + 1)
        const rightDeep = findMin(root.right, deep + 1)
        return Math.min(leftDeep, rightDeep)
    }
    return findMin(root, 0)
}

/** 110. 平衡二叉树
 * 给定一个二叉树，判断它是否是高度平衡的二叉树
 * 一棵高度平衡二叉树定义为 一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1 -> 深度差最大为1
 */
var isBalanced = function (root) {
    if (root === null) return true
    let flag = true
    // 构建递归函数
    function getDeep(root, deep) {
        if (root === null) return deep
        const leftDeep = getDeep(root.left, deep + 1)
        const rightDeep = getDeep(root.right, deep + 1)
        if (Math.abs(leftDeep - rightDeep) > 1 && flag) {
            flag = false
        }
        return Math.max(leftDeep, rightDeep)
    }
    return getDeep(root, 0) && flag
}

/** 108. 将有序数组转换为二叉搜索树
 * 给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 高度平衡 二叉搜索树
 * 高度平衡 二叉树是一棵满足「每个节点的左右两个子树的高度差的绝对值不超过 1 」的二叉树
 * 输入：nums = [-10,-3,0,5,9] 输出：[0,-3,9,-10,null,5]
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
    function createTree(nums, left, right) {
        if (left > right) return null
        const mid = left + Math.floor((right - left) / 2)
        let root = new TreeNode(nums[mid])
        root.left = createTree(nums, left, mid - 1)
        root.right = createTree(nums, mid + 1, right)
        return root
    }
    return createTree(nums, 0, nums.length - 1)
}

/** 面试题 17.12. BiNode
 * 二叉树数据结构TreeNode可用来表示单向链表（其中left置空，right为下一个链表节点）
 * 实现一个方法，把二叉搜索树转换为单向链表，要求依然符合二叉搜索树的性质，转换操作应是原址的，也就是在原始的二叉搜索树上直接修改。
 * 返回转换后的单向链表的头节点。
 * 输入： [4,2,5,1,3,null,6,0]
 * 输出： [0,null,1,null,2,null,3,null,4,null,5,null,6]
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var convertBiNode = function (root) {
    if (root === null) return root
    let headNode = (head = new TreeNode(0))
    function crossTree(root) {
        if (root === null) {
            head.left = null
            return
        }
        crossTree(root.left)
        head.left = new TreeNode(root.val)
        head = head.left
        crossTree(root.right)
    }
    crossTree(root)
    return headNode.left
}
