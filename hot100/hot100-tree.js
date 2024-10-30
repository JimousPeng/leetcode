/** hot100 - 二叉树 */

/**
 * 94. 二叉树的中序遍历 给定一个二叉树的根节点 root ，返回 它的 中序 遍历 。
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
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
    const res = [];
    function dfs(root) {
      if (root === null) return;
      dfs(root.left);
      res.push(root.val);
      dfs(root.right);
    }
    dfs(root);
    return res;
  }

  function useStack() {
    const res = [];
    let node = root;
    const stack = [];
    while (stack.length || node) {
      if (node !== null) {
        stack.push(node); // 有效节点入栈，从root节点开始
      }
      let nodeLeft = node?.left;
      while (nodeLeft) {
        // 将左子树全部入栈
        stack.push(nodeLeft);
        nodeLeft = nodeLeft.left;
      }
      // 此时 stack 栈尾为最末端的左子节点，取出该节点
      node = stack.pop();
      res.push(node.val); // 因为左子树是最先入栈，所以依次将stack中的节点取出放入res数组中即可
      node = node.right; // 指针指向右子树
    }
    return res;
  }
};

/**
 * 104. 二叉树的最大深度 给定一个二叉树 root ，返回其最大深度
 * 二叉树的 最大深度 是指从根节点到最远叶子节点的最长路径上的节点数
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
  /** 最大深度，那就用递归处理 */
  function useDfs() {
    if (root === null) return 0;
    let max = 1;
    function dep(root, deep) {
      if (root.left === null && root.right === null) {
        max = Math.max(max, deep);
        return;
      }
      if (root.left == null) {
        return dep(root.right, deep + 1);
      }
      if (root.right === null) {
        return dep(root.left, deep + 1);
      }
      dep(root.left, deep + 1);
      dep(root.right, deep + 1);
    }
    dep(root, 1);
    return max;
  }

  /** 递归优化
   * 如果我们知道了左子树和右子树的最大深度 l 和 r，那么该二叉树的最大深度即为
   * max(l, r)+1
   * 而左子树和右子树的最大深度又可以以同样的方式进行计算
   */
  function useDfsOptimize() {
    function dep(root) {
      if (root === null) return 0;
      return Math.max(dep(root.left), dep(root.right)) + 1;
    }
    return dep(root);
  }

  /** 广度遍历, 也就是层序遍历 */
  function bfs() {
    if (root === null) return 0;
    let stack = [];
    stack.push(root);
    let res = 0;
    while (stack.length) {
      let nextStack = [];
      for (let i = 0; i < stack.length; i++) {
        const node = stack[i];
        if (node.left) nextStack.push(node.left);
        if (node.right) nextStack.push(node.right);
      }
      stack = nextStack;
      res++;
    }
    return res;
  }
};

/**
 * 226. 翻转二叉树
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
  // 翻转的场景适合用中序遍历
  function dep(root) {
    if (root == null) return;

    const tempNode = root.left;

    root.left = root.right;
    root.right = tempNode;

    dep(root.left);
    dep(root.right);
  }
  dep(root);

  return root;
};

/**
 * 101. 对称二叉树
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
  // 轴对称是左子树的左节点 === 右子树的右节点
  // 左子树的右节点 === 右子树的左节点

  // 递归做法
  function useDep() {
    if (root === null) return true;

    function dif(left, right) {
      // 递归的结束条件是左子树或者右子树到了边界节点。
      if (left === null || right === null) {
        return left === right;
      }

      // 递归之前，先比较left和right是否相等
      return (
        left.val === right.val &&
        dif(left.left, right.right) &&
        dif(left.right, right.left)
      );
    }

    return dif(root.left, root.right);
  }

  // 迭代法, 定义好入栈顺序：左-左 -> 右-右 -> 左-右 -> 右-左
  // 其实入栈的顺序只需要保证是两两匹配入栈即可。
  function useCross() {
    if (root == null) return true;
    let nodeStack = [];
    nodeStack.push(root);
    nodeStack.push(root);
    while (nodeStack.length) {
      const left = nodeStack.shift();
      const right = nodeStack.shift();

      // 当前节点都是null，直接跳过
      if (left === null && right === null) continue;

      // 左右节点值不一致，返回false
      if (!left || !right || left.val !== right.val) return false;

      // 子节点入栈
      nodeStack.push(left.left);
      nodeStack.push(right.right);
      nodeStack.push(left.right);
      nodeStack.push(right.left);
    }
    return true;
  }
};

/**
 * 543. 二叉树的直径
 * @param {TreeNode} root  树中节点数目在范围 [1, 104] 内
 * @return {number}
 */
var diameterOfBinaryTree = function(root) {
  // 给你一棵二叉树的根节点，返回该树的 直径
  // 二叉树的 直径 是指树中任意两个节点之间最长路径的 长度 。这条路径可能经过也可能不经过根节点 root
  //   两节点之间路径的 长度 由它们之间边数表示

  /**
   * 思路：取最大直径，那么就是 max(left) + max(right) 即可
   */
  function useDep(root) {
    // 一个节点的最大直径肯定是左右两个节点相加，但是不一定会经过根节点
    // max:ROOT = ROO.left + ROOT.right
    let result = 0;
    function dep(node) {
      if (node === null) return -1;
      // 单个节点下的最大距离
      let leftDeep = dep(node.left) + 1;
      let rightDeep = dep(node.right) + 1;
      result = Math.max(result, leftDeep + rightDeep);
      // 返回单边最大距离
      return Math.max(leftDeep, rightDeep);
    }

    dep(root);
    return result;
  }
};

/**
 * 102. 二叉树的层序遍历
 * @param {TreeNode} root 树中节点数目在范围 [0, 2000] 内
 * @return {number[][]}
 */
var levelOrder = function(root) {
  // 深度遍历
  function useDfs() {
    const result = [];
    function dfs(root, dep) {
      if (root === null) return;

      // 先构造当前层级的数组

      if (result[dep] === undefined) {
        result[dep] = [root.val];
      } else {
        result[dep].push(root.val);
      }

      dfs(root.left, dep + 1);
      dfs(root.right, dep + 1);
    }

    dfs(root, 0);

    return result;
  }

  // 迭代法
  function useBfs() {
    if (root === null) return [];
    let result = [];
    result.push([root.val]);
    let stack = [];
    stack.push(root.left);
    stack.push(root.right);
    while (stack.length) {
      const len = stack.length;
      let res = [];
      let next = [];
      for (let i = 0; i < len; i++) {
        let node = stack[i];
        if (node.val !== null) {
          res.push(node.val);
          next.push(node.left);
          next.push(node.right);
        }
      }
      if (res.length) {
        result.push(res);
      }
      stack = next;
    }
    return result;
  }
};

/**
 * 108. 将有序数组转换为二叉搜索树
 * @param {number[]} nums  1 <= nums.length <= 10^4  nums 按 严格递增 顺序排列
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
  // 给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 平衡 二叉搜索树
  // 二叉搜索树：
  //   1. 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值
  //   2. 若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值
  //   3. 它的左、右子树也分别为二叉排序树
  // 平衡二叉树 是指该树所有节点的左右子树的深度相差不超过 1

  // 二叉树的中序遍历就是递增序列
  function createTree() {
    function cross(left, right) {
      if (left > right) return null;

      const mid = Math.floor((left + right) / 2);

      const root = new TreeNode(nums[mid]);

      root.left = cross(left, mid - 1);
      root.right = cross(mid + 1, right);

      return root;
    }
    return cross(0, nums.length);
  }
};

/**
 * 98. 验证二叉搜索树
 * 思路：可以利用二叉搜索树的中序遍历是递增序列
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
  /**
有效 二叉搜索树定义如下：
节点的左 子树 只包含 小于 当前节点的数。
节点的右子树只包含 大于 当前节点的数。
所有左子树和右子树自身必须也是二叉搜索树。
    */

  // 递归
  function useDfs() {
    function checkTree(root, max, min) {
      if (root === null) return true;

      if (root.val >= max || root.val <= min) {
        return false;
      }

      return (
        checkTree(root.left, root.val, min) &&
        checkTree(root.right, max, root.val)
      );
    }

    return checkTree(root, Infinity, -Infinity);
  }

  // 迭代
  function checkRoot() {
    let stack = [];
    let node = root;

    let prev = -Infinity;

    while (stack.length || node) {
      if (node !== null) {
        stack.push(node);
      }
      let leftNode = node?.left;
      while (leftNode) {
        stack.push(leftNode);
        leftNode = leftNode.left;
      }

      let cur = stack.pop();

      if (cur.val < prev) {
        return false;
      }

      prev = cur.val;

      node = cur.right;
    }

    return true;
  }
};

/**
 * 230. 二叉搜索树中第 K 小的元素
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
  // 给定一个二叉搜索树的根节点 root ，和一个整数 k
  // 请你设计一个算法查找其中第 k 小的元素（从 1 开始计数）

  /**
   * 利用二叉搜索树的特性，中序遍历是递增序列
   * 那么倒数第k小的数，就是中序遍历后的第K个节点
   */
  function dfs() {
    let count = 0;
    let res;
    function cross(root) {
      if (root === null || res !== undefined) return;
      cross(root.left);

      count++;

      if (count == k) {
        res = root.val;
      }

      cross(root.right);
    }

    cross(root);

    return res;
  }
};

/**
 * 199. 二叉树的右视图
 * 结合层序遍历后，然后取对应的节点即可，右视图就是层序遍历的尾节点
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function(root) {
  // 给定一个二叉树的 根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值

  function useDfs() {
    let deeps = [];
    function dfs(root, deep) {
      if (root === null) return;

      if (deeps[deep] === undefined) {
        deeps[deep] = [root.val];
      } else {
        deeps[deep].push(root.val);
      }

      dfs(root.left, deep + 1);
      dfs(root.right, deep + 1);
    }

    dfs(root, 0);

    let res = [];
    const depLen = deeps.length;
    for (let i = 0; i < depLen; i++) {
      const deepList = deeps[i];
      const last = deepList.length - 1;
      res.push(deepList[last]);
    }
    return res;
  }
};
