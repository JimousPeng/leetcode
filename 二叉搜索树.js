/** 二叉搜索树的定义
 * 二叉搜索树（BST）是二叉树的一种特殊表示形式，它满足如下特性
 * 1. 每个节点中的值必须大于（或等于）存储在其左侧子树中的任何值。
 * 2. 每个节点中的值必须小于（或等于）存储在其右子树中的任何值
 * 3. 所有左子树和右子树自身必须也是二叉搜索树
 */

function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

/** 二叉搜索树中的搜索
 * 给定二叉搜索树（BST）的根节点 root 和一个整数值 val
 * 你需要在 BST 中找到节点值等于 val 的节点。 返回以该节点为根的子树。 如果节点不存在，则返回 null
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function (root, val) {
    let target = null;
    function crossTree(root) {
        if (!root) return;
        if (root.val === val) {
            target = root;
        }
        crossTree(root.left);
        crossTree(root.right);
    }
    crossTree(root, val);
    return target;
};

/** 二叉搜索树迭代器
 * 实现一个二叉搜索树迭代器类BSTIterator ，表示一个按中序遍历二叉搜索树（BST）的迭代器
 * 1. BSTIterator(TreeNode root) 初始化 BSTIterator 类的一个对象。BST 的根节点 root 会作为构造函数的一部分给出。指针应初始化为一个不存在于 BST 中的数字，且该数字小于 BST 中的任何元素
 * 2. boolean hasNext() 如果向指针右侧遍历存在数字，则返回 true ；否则返回 false 。
 * 3. int next()将指针向右移动，然后返回指针处的数字
 * @param {TreeNode} root
 */
var BSTIterator = function (root) {
    // 生成中序遍历
    const midlist = [];
    function crossTree(root) {
        if (root === null) return;
        crossTree(root.left);
        midlist.push(root.val);
        crossTree(root.right);
    }
    crossTree(root);
    this.midlist = midlist;
    this.initIdx = 0;
};

/**
 * @return {number}
 */
BSTIterator.prototype.next = function () {
    return this.midlist[this.initIdx++];
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function () {
    return this.initIdx < this.midlist.length;
};

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */

/** 验证二叉搜索树;
 * 给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
    let isok = true;
    function crossTree(root, min, max) {
        if (root === null) return;
        if (root.val <= min || root.val >= max) {
            isok = false;
        }
        crossTree(root.left, min, root.val);
        crossTree(root.right, root.val, max);
    }
    crossTree(root.left, -Infinity, root.val);
    crossTree(root.right, root.val, Infinity);
    return isok;

    // 曲线救国，通过中序遍历，看能否得到一个递增的队列，如果不能，那么说明不是二叉搜索树
    // const treelist = [];
    // function crossTree(root) {
    //     if (root === null) return;
    //     crossTree(root.left);
    //     treelist.push(root.val);
    //     crossTree(root.right);
    // }
    // crossTree(root);
    // let left = 0;
    // let right = 1;
    // let showflag = true;
    // while (right < treelist.length && showflag) {
    //     if (treelist[left] >= treelist[right]) {
    //         showflag = false;
    //         break;
    //     }
    //     left++;
    //     right++;
    // }
    // return showflag;
};
