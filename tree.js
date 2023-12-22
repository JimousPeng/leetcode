/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/** 96. 不同的二叉搜索树
 *  给你一个整数 n ，求恰由 n 个节点组成且节点值从 1 到 n 互不相同的 二叉搜索树 有多少种？返回满足题意的二叉搜索树的种数
 * node.val <= node.right;
 * node.val => node.left
 * @param {number} n 1 <= n <= 8
 * @return {number}
 */
var numTrees = function (n) {
    let val = 1
    while (val < n + 1) {}
}

/** 114. 二叉树展开为链表 ListNode
 *  给你二叉树的根结点 root ，请你将它展开为一个单链表
 *  展开后的单链表应该同样使用 TreeNode ，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null
 *  展开后的单链表应该与二叉树 先序遍历 顺序相同
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function (root) {
    if (root === null) return []
    let nodeList = []
    function Dep(root) {
        if (root === null) return
        nodeList.push(root)
        Dep(root.left)
        Dep(root.right)
    }
    Dep(root)

    for (let i = 1; i < nodeList.length; i++) {
        const prev = i - 1
        nodeList[prev].right = nodeList[i]
        nodeList[prev].left = null
    }
    return nodeList
}

/** LCR 174. 寻找二叉搜索树中的目标节点
 *  某公司组织架构以二叉搜索树形式记录，节点值为处于该职位的员工编号。请返回第 cnt 大的员工编号
 *  root = [7, 3, 9, 1, 5], cnt = 2  输出：7
 * @param {TreeNode} root
 * @param {number} cnt
 * @return {number}
 */
var findTargetNode = function (root, cnt) {
    let count = []
    function Dep(root) {
        if (root === null) return
        Dep(root.left)
        count.push(root.val)
        Dep(root.right)
    }
    Dep(root)
    // 二叉搜索树的中序遍历是单电递增
    return count[count.length - cnt]
}

/** LCR 150. 彩灯装饰记录 II
 *  一棵圣诞树记作根节点为 root 的二叉树，节点值为该位置装饰彩灯的颜色编号。请按照从左到右的顺序返回每一层彩灯编号，每一层的结果记录于一行
 * 输入：root = [8,17,21,18,null,null,6]  输出：[[8],[17,21],[18,6]]
 * @param {TreeNode} root
 * @return {number[][]}
 */
var decorateRecord = function (root) {
    const totalCount = []
    function Dep(root, dep) {
        if (root === null) return
        let depCount = totalCount[dep]
        if (depCount) {
            depCount.push(root.val)
        } else {
            totalCount[dep] = [root.val]
        }
        Dep(root.left, dep + 1)
        Dep(root.right, dep + 1)
    }
    Dep(root, 0)
    return totalCount
}

/** LCR 145. 判断对称二叉树
 *  请设计一个函数判断一棵二叉树是否 轴对称
 * @param {TreeNode} root
 * @return {boolean}
 */
var checkSymmetricTree = function (root) {
    if (root === null) return false
    function checkTree(left, right) {
        if (left === null && right !== null) return false
        if (left !== null && right === null) return false
        if (left === null && right === null) return true
        return left.val === right.val && checkTree(left.left, right.right) && checkTree(left.right, right.left)
    }
    return checkTree(root.left, root.right)
}

/** LCR 144. 翻转二叉树
 *  给定一棵二叉树的根节点 root，请左右翻转这棵二叉树，并返回其根节点
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var mirrorTree = function (root) {
    function Dep(root) {
        if (root === null) return
        // 翻转单颗
        let tempRoot = root.left
        root.left = root.right
        root.right = tempRoot
        Dep(root.left)
        Dep(root.right)
    }
    Dep(root)
    return root

    // 官方解法：感觉还不如用临时变量交换有效率
    if (root === null) return root
    let left = mirrorTree(root.left)
    let right = mirrorTree(root.right)
    root.right = left
    root.left = right
    return root
}

/** LCR 052. 递增顺序搜索树
 *  给你一棵二叉搜索树，请 按中序遍历 将其重新排列为一棵递增顺序搜索树，使树中最左边的节点成为树的根节点，并且每个节点没有左子节点，只有一个右子节点。
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var increasingBST = function (root) {
    let newRoot = null
    let curNode = null
    function Dep(root) {
        if (root == null) return
        Dep(root.left)
        if (!newRoot) {
            newRoot = new TreeNode(root.val)
            curNode = newRoot
        } else {
            curNode.right = new TreeNode(root.val)
            curNode = curNode.right
        }
        Dep(root.right)
        return newRoot
    }
    return Dep(root)
}

/** LCP 44. 开幕式焰火
 *  输入：root = [1,3,2,1,null,2] 输出：3
 *  其实就是去重
 * @param {TreeNode} root
 * @return {number}
 */
var numColor = function (root) {
    // const colorSet = new Set()
    // function Dep(root) {
    //     if (root === null) return
    //     colorSet.add(root.val)
    //     Dep(root.left)
    //     Dep(root.right)
    // }
    // Dep(root)
    // return Array.from(colorSet).length

    const colorMap = {}
    let count = 0
    function Dep(root) {
        if (root === null) return
        if (!colorMap[root.val]) {
            count++
            colorMap[root.val] = true
        }
        Dep(root.left)
        Dep(root.right)
    }
    Dep(root)
    return count
}

/** 2331. 计算布尔二叉树的值
 *  叶子节点 要么值为 0 要么值为 1 ，其中 0 表示 False ，1 表示 True；
 *  非叶子节点 要么值为 2 要么值为 3 ，其中 2 表示逻辑或 OR ，3 表示逻辑与 AND
 *  如果节点是个叶子节点，那么节点的 值 为它本身，即 True 或者 False，否则，计算 两个孩子的节点值，然后将该节点的运算符对两个孩子值进行 运算
 *  返回根节点 root 的布尔运算值
 *  [叶子节点 是没有孩子的节点]
 *  @param {TreeNode} root
 *  @return {boolean}
 */
var evaluateTree = function (root) {
    function Dep(root) {
        if (root == null) return true
        if (root.val === 2) {
            return Dep(root.left) || Dep(root.right)
        } else if (root.val === 3) {
            return Dep(root.left) && Dep(root.right)
        }
        return !!root.val
    }
    return Dep(root)
}

/** 2236. 判断根结点是否等于子结点之和
 *  给你一个 二叉树 的根结点 root，该二叉树由恰好 3 个结点组成：根结点、左子结点和右子结点
 *  如果根结点值等于两个子结点值之和，返回 true ，否则返回 false
 * @param {TreeNode} root
 * @return {boolean}
 */
var checkTree = function (root) {
    return root.val === root.left.val + root.right.val
}

/** 1379. 找出克隆二叉树中的相同节点
 *  给你两棵二叉树，原始树 original 和克隆树 cloned，以及一个位于原始树 original 中的目标节点 target
 *  其中，克隆树 cloned 是原始树 original 的一个 副本
 *  请找出在树 cloned 中，与 target 相同 的节点，并返回对该节点的引用（在 C/C++ 等有指针的语言中返回 节点指针，其他语言返回节点本身）
 *  注意：你 不能 对两棵二叉树，以及 target 节点进行更改。只能 返回对克隆树 cloned 中已有的节点的引用
 *  输入: tree = [7,4,3,null,null,6,19], target = 3
 * @param {TreeNode} original
 * @param {TreeNode} cloned
 * @param {TreeNode} target
 * @return {TreeNode}
 */

var getTargetCopy = function (original, cloned, target) {
    let getTarget = null
    function crossTree(root) {
        if (root === null || getTarget) return
        if (root.val === target.val) {
            getTarget = root
        }
        crossTree(root.left)
        crossTree(root.right)
    }
    crossTree(cloned)
    return getTarget
}

/** 1022. 从根到叶的二进制数之和
 *  给出一棵二叉树，其上每个结点的值都是 0 或 1 。每一条从根到叶的路径都代表一个从最高有效位开始的二进制数
 *  例如，如果路径为 0 -> 1 -> 1 -> 0 -> 1，那么它表示二进制数 01101，也就是 13
 *  对树上的每一片叶子，我们都要找出从根到该叶子的路径所表示的数字
 *  返回这些数字之和。题目数据保证答案是一个 32 位 整数
 *  输入：root = [1,0,1,0,1,0,1] 输出：22
 *  解释：(100) + (101) + (110) + (111) = 4 + 5 + 6 + 7 = 22
 * @param {TreeNode} root
 * @return {number}
 */
var sumRootToLeaf = function (root) {
    const pathList = []
    // 1. 先遍历拿到所有的路径组合
    function Dep(root, path) {
        if (root === null) {
            // 可以将对path计算的方法抽成函数，在这里计算，减少后续多一次遍历
            pathList.push(path)
            return
        }
        path.unshift(root.val)
        if (root.left === null) {
            return Dep(root.right, [...path])
        }
        if (root.right === null) {
            return Dep(root.left, [...path])
        }
        Dep(root.left, [...path])
        Dep(root.right, [...path])
    }
    Dep(root, [])
    // 2. 路径组合求和
    let res = 0
    for (let i = 0; i < pathList.length; i++) {
        const curPath = pathList[i]
        const calcPath = curPath.reduce((total, item, index) => {
            total += Math.pow(2, index) * item
            return total
        }, 0)
        res += calcPath
    }
    return res

    /** 优化，能不能每一步计算拿到结果，然后往下传值呢 => 其实就是每一层的值，乘以 2^(层数-1)
     *  其实比较难，因为不确定每个路径的深度，所以拿不到层数，倒是可以考虑将层数记录下来，那样处理起来又有另外的麻烦，因为所处层数与当前节点的计算值并不一致。
     *  比如最底层，层数最大，但是在2进制的计算中，反而要从0开始
     */
}

/** 993. 二叉树的堂兄弟节点
 *  在二叉树中，根节点位于深度 0 处，每个深度为 k 的节点的子节点位于深度 k+1 处 如果二叉树的两个节点深度相同，但 父节点不同 ，则它们是一对堂兄弟节点
 *  每个节点的值都是唯一的、范围为 1 到 100 的整数
 *  只有与值 x 和 y 对应的节点是堂兄弟节点时，才返回 true 。否则，返回 false
 *
 * 【深度】计算原则：根节点位于深度 0 处，那么深度就是从root节点开始算
 * 满足两个条件：1.不同的父节点； 2.相同的节点深度
 * @param {TreeNode} root
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
var isCousins = function (root, x, y) {
    const nodeList = []
    function Dep(root, dep, father) {
        if (root === null) return 0
        if (nodeList.length === 2) return
        if (root.val === x) {
            nodeList.push({ node: root, dep, father })
        } else if (root.val === y) {
            nodeList.push({ node: root, dep, father })
        }
        Dep(root.left, dep + 1, root)
        Dep(root.right, dep + 1, root)
    }
    // 考虑x,y可能为root的情况，所以初始值father参数为root
    Dep(root, 0, root)
    const nodeLeft = nodeList[0]
    const nodeRight = nodeList[1]
    if (nodeLeft.father.val === nodeRight.father.val || nodeLeft.dep !== nodeRight.dep) return false
    return true

    /** 错误思路：深度计算规则不对 */
    // const nodeList = []
    // function Dep(root, father) {
    //     if (root === null) return 0
    //     if (nodeList.length === 2) return
    //     if (root.val === x) {
    //         nodeList.push({ node: root, father })
    //     } else if (root.val === y) {
    //         nodeList.push({ node: root, father })
    //     }
    //     Dep(root.left, root)
    //     Dep(root.right, root)
    // }
    // // 第一步：先拿到两个节点，判断父节点是否相同
    // Dep(root, null)
    // if (nodeList[0].father.val === nodeList[1].father.val) return false
    // // 第二步：计算深度(从下往上算了，应该从上往下算)
    // function calcDep(root) {
    //     if (root === null) return 0
    //     return Math.max(1 + calcDep(root.left), 1 + calcDep(root.right))
    // }
    // const leftDep = calcDep(nodeList[0].node)
    // const rightDep = calcDep(nodeList[1].node)
    // return leftDep === rightDep
}

/** 965. 单值二叉树
 *  如果二叉树每个节点都具有相同的值，那么该二叉树就是单值二叉树 只有给定的树是单值二叉树时，才返回 true；否则返回 false
 * @param {TreeNode} root
 * @return {boolean}
 */
var isUnivalTree = function (root) {
    const baseVal = root.val
    let flag = true
    function Dep(root) {
        if (root === null) return baseVal
        flag = flag && baseVal === root.val
        Dep(root.left)
        Dep(root.right)
    }
    Dep(root)
    return flag
}

/** 938. 二叉搜索树的范围和
 *  给定二叉搜索树的根结点 root，返回值位于范围 [low, high] 之间的所有结点的值的和
 *  输入：root = [10,5,15,3,7,null,18], low = 7, high = 15
 *  输出：32
 * @param {TreeNode} root
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var rangeSumBST = function (root, low, high) {
    // let res = 0
    // function Dep(root) {
    //     if (root === null) return 0
    //     Dep(root.left)
    //     if (root.val >= low && root.val <= high) {
    //         res += root.val
    //     }
    //     Dep(root.right)
    // }
    // Dep(root)
    // return res

    // 因为是二叉搜索树，利用其特性
    function Dep(root) {
        if (root === null) return 0
        if (root.val < low) return Dep(root.right)
        if (root.val > high) return Dep(root.left)
        return root.val + Dep(root.left) + Dep(root.right)
    }
    return Dep(root)
}

/** 897. 递增顺序搜索树
 *  给你一棵二叉搜索树的 root ，请你 按中序遍历 将其重新排列为一棵递增顺序搜索树，
 * 使树中最左边的节点成为树的根节点，并且每个节点没有左子节点，只有一个右子节点
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var increasingBST = function (root) {
    let newRoot = null
    let curNode = null
    function Dep(root) {
        if (root === null) return
        Dep(root.left)
        if (!newRoot) {
            newRoot = new TreeNode(root.val)
            curNode = newRoot
        } else {
            curNode.right = new TreeNode(root.val)
            curNode = curNode.right
        }
        Dep(root.right)
    }
    Dep(root)
    return newRoot

    // let nodeList = []
    // function Dep(root) {
    //     if (root === null) return
    //     Dep(root.left)
    //     nodeList.push(root.val)
    //     Dep(root.right)
    // }
    // Dep(root)
    // let newRoot = new TreeNode(nodeList[0])
    // let curNode = newRoot
    // for (let i = 1; i < nodeList.length; i++) {
    //     curNode.left = null
    //     curNode.right = new TreeNode(nodeList[i])
    //     curNode = curNode.right
    // }
    // return newRoot
}

/** 783. 二叉搜索树节点最小距离
 *  给你一个二叉搜索树的根节点 root ，返回 树中任意两不同节点值之间的最小差值  差值是一个正数，其数值等于两值之差的绝对值。
 *  输入：root = [4,2,6,1,3] 输出：1
 * @param {TreeNode} root
 * @return {number}
 */
var minDiffInBST = function (root) {
    /** 能否利用二叉搜索树特性：对于每一个子树，
     * node.val <= node.right;
     * node.val => node.left
     * 由于是任意两不同节点值之间的最小差值，二叉搜索树的优势在哪里呢: 答案是有序性
     * 既然是一个递增序列，那么最小的差值，肯定是在递增节点的前后节点中出现 [1,3,5,6,8] -> [5,6]，不存在非相连节点的差值会大于两个相连节点差值
     */
    let preVal = undefined
    let curDiff = Infinity
    function Dep(root) {
        if (root === null) return
        Dep(root.left)
        if (preVal === undefined) {
            preVal = root.val
        } else {
            const diff = Math.abs(preVal - root.val)
            curDiff = Math.min(curDiff, diff)
            preVal = root.val
        }
        Dep(root.right)
    }
    Dep(root)
    return curDiff

    /** 暴力解法：将问题转换为找到数组中最小差值 */
    let nodeList = []
    function crossTree(root) {
        if (root == null) return
        nodeList.push(root.val)
        crossTree(root.left)
        crossTree(root.right)
    }
    crossTree(root)
    let min = Infinity
    for (let i = 0; i < nodeList.length - 1; i++) {
        let right = i + 1
        while (right < nodeList.length) {
            min = Math.min(min, Math.abs(nodeList[right] - nodeList[i]))
            right++
        }
    }
    return min
}

/** 671. 二叉树中第二小的节点
 * 给定一个非空特殊的二叉树，每个节点都是正数，并且每个节点的子节点数量只能为 2 或 0。
 * 如果一个节点有两个子节点的话，那么该节点的值等于两个子节点中较小的一个
 * 更正式地说，即 root.val = min(root.left.val, root.right.val) 总成立
 * 给出这样的一个二叉树，你需要输出所有节点中的 第二小的值   如果第二小的值不存在的话，输出 -1
 * 输入：root = [2,2,5,null,null,5,7]  输出：5
 * 解释：最小的值是 2 ，第二小的值是 5 。
 * @param {TreeNode} root
 * @return {number}
 */
var findSecondMinimumValue = function (root) {
    let minest = []
    function crossTree(root) {
        if (root === null) return
        if (!minest[0]) {
            minest[0] = root.val
        } else if (!minest[1]) {
            let init = root.val
            if (init < minest[0]) {
                init = minest[0]
                minest[0] = root.val
            }
            minest[1] = init
        } else if (minest[0] === minest[1]) {
            minest[1] = root.val
        } else if (root.val > minest[0] && root.val < minest[1]) {
            minest[1] = root.val
        } else if (root.val < minest[0]) {
            minest[1] = minest[0]
            minest[0] = root.val
        }
        crossTree(root.left)
        crossTree(root.right)
    }
    crossTree(root)
    console.log(minest)
    return minest[0] < minest[1] ? minest[1] : -1
}

/** 653. 两数之和 IV - 输入二叉搜索树
 *  给定一个二叉搜索树 root 和一个目标结果 k，如果二叉搜索树中存在两个元素且它们的和等于给定的目标结果，则返回 true
 *  输入: root = [5,3,6,2,4,null,7], k = 9  输出: true
 * @param {TreeNode} root
 * @param {number} k
 * @return {boolean}
 */
var findTarget = function (root, k) {
    // 构建数组解决：二叉搜索树的中序遍历是递增序列
    if (root === null) return false
    const numList = []
    function Dep(root) {
        if (root === null) return
        Dep(root.left)
        numList.push(root.val)
        Dep(root.right)
    }
    Dep(root)
    let left = 0,
        right = numList.length - 1
    while (left < right) {
        const findVal = k - numList[left]
        /** 边界处理 */
        if (numList[right] > findVal) {
            right--
        } else if (numList[right] === findVal) {
            return true
        } else {
            left++
            right = numList.length - 1 // 重置right锚点
        }
    }
    return false

    /** 优化:有什么可能不使用数组，直接遍历的时候查找呢: 利用Map，空间换时间 */
    const needMap = new Set()
    function Dep(root) {
        if (root === null) return false
        if (needMap.has(root.val)) {
            return true
        }
        needMap.add(k - root.val)
        return Dep(root.left) || Dep(root.right)
    }
    return Dep(root)
}

/** 637. 二叉树的层平均值
 *  给定一个非空二叉树的根节点 root , 以数组的形式返回每一层节点的平均值。与实际答案相差 10-5 以内的答案可以被接受
 *
 * 输入：root = [3,9,20,null,null,15,7]
 * 输出：[3.00000,14.50000,11.00000]
 * 解释：第 0 层的平均值为 3,第 1 层的平均值为 14.5 ( 9+20  / 2), 第 2 层的平均值为 11 ( 15+7  / 2)。因此返回 [3, 14.5, 11]
 *
 *  @param {TreeNode} root
 *  @return {number[]}
 */
var averageOfLevels = function (root) {
    // 解法1：构建 resCount对象，数据格式为：{ '0': [ 3 ], '1': [ 9, 20 ], '2': [ 15, 7 ] }
    let resCount = {}
    function crossTree(root, dep) {
        if (root === null) return
        if (resCount[dep]) {
            resCount[dep].push(root.val)
        } else {
            resCount[dep] = [root.val]
        }
        crossTree(root.left, dep + 1)
        crossTree(root.right, dep + 1)
    }
    crossTree(root, 0)
    const depList = Object.keys(resCount) // 拿到层级数组：[ '0', '1', '2' ]
    // depList.sort((a,b) => a-b)
    const result = []
    depList.forEach((dep) => {
        const depNums = resCount[dep].reduce((total, item) => (total += item), 0)
        result.push(depNums / resCount[dep].length)
    })
    return result

    // 优化一下：构建 resCount对象，数据格式为：{ '0': [ 3 ], '1': [ 9, 20 ], '2': [ 15, 7 ] }
    // let resCount = {}
    // function crossTree(root, dep) {
    //     if(root === null) return
    //     if(resCount[dep]) {
    //         const curDep = resCount[dep]
    //         curDep.val += root.val
    //         curDep.count++
    //         curDep.avarage = curDep.val / curDep.count
    //     } else {
    //         resCount[dep] = {
    //             val: root.val,
    //             count: 1,
    //             avarage: root.val
    //         }
    //     }
    //     crossTree(root.left, dep+1)
    //     crossTree(root.right, dep+1)
    // }
    // crossTree(root, 0)
    // console.log(resCount)
    // return Object.keys(resCount).map(dep => resCount[dep].avarage)
}

/** 606. 根据二叉树创建字符串
 * 给你二叉树的根节点 root ，请你采用前序遍历的方式，将二叉树转化为一个由括号和整数组成的字符串，返回构造出的字符串
 * 空节点使用一对空括号对 "()" 表示，转化后需要省略所有不影响字符串与原始二叉树之间的一对一映射关系的空括号对
 * 输入：root = [1,2,3,4]        输出："1(2(4))(3)"       初步转化后得到 "1(2(4)())(3()())" ，但省略所有不必要的空括号对后，字符串应该是"1(2(4))(3)"
 * 输入：root = [1,2,3,null,4]   输出："1(2()(4))(3)"     只允许左子树为空时用()代替节点,右子树为空或者左右子树为空就都不处理
 * root(root.left)(root.right)
 * @param {TreeNode} root
 * @return {string}
 */
var tree2str = function (root) {
    /** 迭代法 */
    let res = ''
    let stack = [root]
    let crossNode = new Set()
    while (stack.length) {
        const node = stack[stack.length - 1]
        if (crossNode.has(node)) {
            /** 通过声明 crossNode, 保存遍历过的节点,在后续遍历中，补上节点的')' */
            if (node !== root) {
                /** 这里也需要边界检测，非root节点，不需要补上 ')'  */
                res += ')'
            }
            stack.pop()
        } else {
            crossNode.add(node)
            if (node !== root) {
                /** 当前不是root根节点,先拼上'(' */
                res += '('
            }
            res += '' + node.val
            if (!node.left && node.right) {
                /** 针对有左节点，没有右节点，补上'()' */
                res += '()'
            }
            if (node.right) {
                stack.push(node.right)
            }
            if (node.left) {
                stack.push(node.left)
            }
        }
    }
    return res

    /** 递归解法 */
    // function crossTree(root) {
    //     if (root === null) return ''
    //     if (!root.left && !root.right) {
    //         return '' + root.val
    //     }
    //     if (!root.right) {
    //         return root.val + '(' + tree2str(root.left) + ')'
    //     }
    //     const leftNode = tree2str(root.left)
    //     const rightNode = tree2str(root.right)
    //     return root.val + '(' + leftNode + ')(' + rightNode + ')'
    // }
    // return crossTree(root)
}

/** 563. 二叉树的坡度
 * 给你一个二叉树的根节点 root ，计算并返回 整个树 的坡度
 * 一个树的 节点的坡度 定义即为，【该节点左子树的节点之和和右子树节点之和的 差的绝对值 。】
 * 如果没有左子树的话，左子树的节点之和为 0 ；没有右子树的话也是一样。空结点的坡度是 0
 * 整个树 的坡度就是其所有节点的坡度之和
 *
 * 输入：root = [4,2,9,3,5,null,7]
 * 输出：15
 *
 * 思路： 前序遍历处理
 *
 * @param {TreeNode} root
 * @return {number}
 */
var findTilt = function (root) {
    let count = 0
    function Dep(root) {
        if (root === null) return 0
        const leftCount = Dep(root.left)
        const rightCount = Dep(root.right)
        /** 收集当前节点的坡度 */
        count += Math.abs(leftCount - rightCount)
        /** 每个节点返回节点当前值以及左右节点的计算值 */
        return root.val + leftCount + rightCount
    }
    Dep(root)
    return count
}

/** 543. 二叉树的直径
 * 给你一棵二叉树的根节点，返回该树的 直径
 * 二叉树的 直径 是指树中任意两个节点之间最长路径的 长度 。这条路径可能经过也可能不经过根节点 root
 * 【两节点之间路径的 长度 由它们之间边数表示】
 * 输入：root = [1,2,3,4,5]
 * 输出：3 取路径 [4,2,1,3] 或 [5,2,1,3] 的长度。
 *
 * 就是找到这条路径所在节点的最优解，每个节点的所有可能的选择中，找到最长的那个
 *
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {
    let res = 0
    function crossTree(root) {
        if (root === null) return 0
        const leftCount = crossTree(root.left) + 1
        const rightCount = crossTree(root.right) + 1
        res = Math.max(res, leftCount + rightCount)

        return Math.max(leftCount, rightCount)
    }
    crossTree(root)
    return res
}

/** 530. 二叉搜索树的最小绝对差
 * 给你一个二叉搜索树的根节点 root ，返回 树中任意两不同节点值之间的最小差值
 * 差值是一个正数，其数值等于两值之差的绝对值
 * 输入：root = [4,2,6,1,3]
 * 输出：1
 * @param {TreeNode} root
 * @return {number}
 */
var getMinimumDifference = function (root) {
    // // 既然是二叉搜索树，那么利用二叉搜索树的中序遍历是一个递增的序列
    // const queueNode = []
    // function cross(root) {
    //     if (root === null) return
    //     cross(root.left)
    //     queueNode.push(root.val)
    //     cross(root.right)
    // }
    // cross(root)
    // // 从递增序列 queueNode 中找到最小差值 - 利用滑动窗口
    // let left = 0
    // let right = left + 1
    // let minDis = Infinity
    // while (left < queueNode.length - 1) {
    //     let curDis = queueNode[right] - queueNode[left]
    //     minDis = Math.min(minDis, curDis)
    //     left++
    //     right++
    // }
    // return Math.abs(minDis)

    // 优化：在中序遍历期间进行比较计算
    const queueNode = []
    let pre = undefined
    let minDis = Infinity
    function cross(root) {
        if (root === null) return
        cross(root.left)
        if (pre === undefined) {
            pre = root.val
        } else {
            minDis = Math.min(minDis, root.val - pre)
            pre = root.val
        }
        queueNode.push(root.val)
        cross(root.right)
    }
    cross(root)
    return minDis
}

/** 222. 完全二叉树的节点个数
 * 给你一棵 完全二叉树 的根节点 root ，求出该树的节点个数
 * 完全二叉树 的定义如下：
 * 在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的 若干位置（不一定意味左子树是满编）
 * 若最底层为第 h 层，则该层包含 1~ 2h 个节点
 *
 * 进阶：遍历树来统计节点是一种时间复杂度为 O(n) 的简单解决方案。你可以设计一个更快的算法吗？
 * @param {TreeNode} root
 * @return {number}
 */
var countNodes = function (root) {
    // let count = 0
    // // 其实本质还是求节点数量
    // function crossTree(root) {
    //     if (root === null) return
    //     crossTree(root.left)
    //     count++
    //     crossTree(root.right)
    // }
    // crossTree(root)
    // return count

    function count(root) {
        if (root === null) return 0
        // 将问题转换为求左右子树的高度，在求左右子树高度的时，判断左右子树是否为满二叉树，如果是满二叉树，则利用二叉树特性，直接用公式计算
        let leftH = 0,
            rightH = 0,
            node = root
        while (node !== null) {
            leftH++
            node = node.left
        }
        while (node !== null) {
            rightH++
            node = node.right
        }
        if (leftH === rightH) {
            // 左右子树相等，说明是满二叉树，-1是为了
            return Math.pow(2, leftH + 1) - 1
        }
        return count(root.left) + count(root.right) + 1
    }
    return count(root)
}

/**
 * 501. 二叉搜索树中的众数
 * 给你一个含重复值的二叉搜索树（BST）的根节点 root ，
 * 找出并返回 BST 中的所有 众数（即，出现频率最高的元素）
 * 如果树中有不止一个众数，可以按 任意顺序 返回
 * 输入：root = [1,null,2,2] 输出：[2]
 * @param {TreeNode} root
 * @return {number[]}
 */
var findMode = function (root) {
    // const nodeCount = {}
    // function crossTree(root) {
    //     if (root === null) return
    //     const countKey = root.val
    //     const curCount = nodeCount[countKey]
    //     if (curCount) {
    //         nodeCount[countKey]++
    //     } else {
    //         nodeCount[countKey] = 1
    //     }
    //     crossTree(root.left)
    //     crossTree(root.right)
    // }
    // crossTree(root)
    // let maxList = []
    // let maxNum = -Infinity
    // Object.keys(nodeCount).forEach((key) => {
    //     const val = nodeCount[key] // 取到对应num的数量
    //     if (val > maxNum) {
    //         maxNum = val
    //         maxList = [key]
    //     } else if (val === maxNum) {
    //         maxList.push(key)
    //     }
    // })
    // return Array.from(new Set(maxList))

    // const rootList = []
    // function crossTree(root) {
    //     if (root === null) return
    //     crossTree(root.left)
    //     rootList.push(root.val)
    //     crossTree(root.right)
    // }
    // crossTree(root)
    // // 问题转换为：从一个有序数组中找出所有的众数，并且通过base,count来缓存结果，减少了map对象的开销
    // let base = rootList[0]
    // let count = 0
    // let maxCount = 0
    // let maxList = [base]
    // for (let i = 0; i < rootList.length; i++) {
    //     const val = rootList[i]
    //     if (val === base) {
    //         count++
    //     } else {
    //         count = 1 // 重置单独某个数的计算初始值
    //         base = val
    //     }
    //     if (count > maxCount) {
    //         maxList = [base]
    //         maxCount = count // 更新最大值
    //     } else if (count === maxCount) {
    //         maxList.push(base)
    //     }
    // }
    // return maxList

    let base = null
    let count = 0
    let maxCount = 0
    let maxList = []
    function updateCount(val) {
        if (val === base) {
            count++
        } else {
            count = 1 // 重置单独某个数的计算初始值
            base = val
        }
        if (count > maxCount) {
            maxList = [base]
            maxCount = count // 更新最大值
        } else if (count === maxCount) {
            maxList.push(base)
        }
    }
    function crossTree(root) {
        if (root === null) return
        crossTree(root.left)
        updateCount(root.val)
        crossTree(root.right)
    }
    crossTree(root)
    return maxList

    /** morris 遍历 */
    let cur = root // 记录当前遍历的节点指针
    let prev = null // 记录当前节点的左子节点的最右侧根节点
    while (cur !== null) {
        if (cur.left === null) {
            // 到达左子树的根节点，可取值
            console.log(cur.val)
            cur = cur.right
            continue
        }
        pre = cur.left
        while (pre.right !== null && pre.right !== cur) {
            // 遍历到当前节点的左子树的最右侧节点
            pre = pre.right
        }
        // 处理最右侧节点
        if (pre.right === null) {
            // 第一次遍历的时候，右节点肯定是有终点的
            // 如果为空，则说明是当前节点延伸的最左边节点，且是第一次遍历；将当前节点的左子树的最右侧节点指向当前节点
            pre.right = cur
            cur = cur.left // 处理下一个左子节点
        } else {
            // 如果最右侧节点不为空，那么这里置空处理，并将指针指向当前节点的右子树
            pre.right = null
            console.log(cur.val)
            cur = cur.right // 这里是当前根节点左子树末位节点，那么将指针指回右节点，再pre.right === null 的逻辑中，cur.right指向的是当前节点的上级根节点
        }
    }

    let cur = root,
        pre = null
    while (cur !== null) {
        if (cur.left === null) {
            update(cur.val)
            cur = cur.right
            continue
        }
        pre = cur.left
        while (pre.right !== null && pre.right !== cur) {
            pre = pre.right
        }
        if (pre.right === null) {
            pre.right = cur
            cur = cur.left
        } else {
            pre.right = null
            update(cur.val)
            cur = cur.right
        }
    }
}

/**
 * 404. 左叶子之和
 * 给定二叉树的根节点 root ，返回所有左叶子之和
 * root = [3,9,20,null,null,15,7]  输出: 24
 * 在这个二叉树中，有两个左叶子，分别是 9 和 15，所以返回 24
 * @param {TreeNode} root
 * @return {number}
 */
var sumOfLeftLeaves = function (root) {
    /** 递归解题思路
     *  找到所有左叶子，当前节点没有子节点，并且当前节点是左节点
     */
    // let nums = 0
    // function crossTree(root, isLeft) {
    //     if (root === null) return
    //     crossTree(root.left, true)
    //     // 判断当前节点是叶子节点，怎么在这个基础上找到左叶子呢, 做法是传入一个表示，只有左子树遍历的时候才带上标识
    //     if (root.left === null && root.right === null && isLeft) {
    //         nums += root.val
    //     }
    //     crossTree(root.right, false)
    // }
    // crossTree(root, false)
    // return nums

    // 迭代解题思路，运用堆栈处理数据
    let nums = 0
    let nodeQueue = [root]
    while (nodeQueue.length) {
        const node = nodeQueue.shift()
        const leftNode = node.left
        if (leftNode !== null && leftNode.left === null && leftNode.right === null) {
            nums += leftNode.val
        }
        if (leftNode !== null) {
            nodeQueue.push(leftNode)
        }
        if (node.right !== null) {
            nodeQueue.push(node.right)
        }
    }
    return nums
}

/** 257. 二叉树的所有路径
 * 给你一个二叉树的根节点 root ，按 任意顺序 ，返回所有从根节点到叶子节点的路径 >  叶子节点 是指没有子节点的节点
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function (root) {
    while (root.left || root.right) {}

    /** 递归解法，数组透传 */
    // const pathTotal = []
    // function crossTree(root, pathArray) {
    //     if (root === null) return
    //     pathArray.push(root.val)
    //     if (root.left === null && root.right === null) {
    //         pathTotal.push(pathArray)
    //         // 这里提前return 减少递归次数
    //         return
    //     }
    //     // 左右子树递归，由于每次递归都需要执行 [...pathArray]，无疑增加了耗时和内存的占用
    //     crossTree(root.left, [...pathArray])
    //     crossTree(root.right, [...pathArray])
    // }
    // crossTree(root, [])
    // return pathTotal.map((path) => {
    //     pathString = path.join('->')
    //     return pathString
    // })

    /** 递归解法，对象占位法，每次路径向下查找的时候，都对当前路径节点重新赋值，到最底路径时，将数据收集；要注意的时候，可以前一次路径比当前路径更长，所以要对column可用性判断 */
    // const pathTotal = []
    // const pathMap = {}
    // function crossTree(root, column) {
    //     if (root === null) return
    //     pathMap[column] = root.val + ''
    //     if (root.left === null && root.right === null) {
    //         let total = ''
    //         const columnList = Object.keys(pathMap)
    //         /**
    //          * 遍历二叉树的每一行，取出当前循环终点上每个节点的值
    //          * for循环效率更高，并且通过break及时跳出循环 */
    //         for (let i = 0; i < columnList.length; i++) {
    //             const columnItem = pathMap[columnList[i]]
    //             /** column可用性判断 */
    //             if (i > column) break
    //             total = total ? total + '->' + columnItem : columnItem
    //         }
    //         /** 下面这种循环由于无法使用break，多产生无效循环次数 */
    //         // const curColumn = Object.keys(pathMap).reduce((total, key, index) => {
    //         //     if(index > column) return;
    //         //     const columnNum = pathMap[key]
    //         //     // 直接拼接字符串，减少后续二次遍历循环成本
    //         //     return total ? total + '->' + columnNum : columnNum
    //         // }, '')
    //         pathTotal.push(total)
    //         // 这里提前return 减少递归次数
    //         return
    //     }
    //     crossTree(root.left, column + 1)
    //     crossTree(root.right, column + 1)
    // }
    // crossTree(root, 0)
    // return pathTotal

    /** 递归解法，对象占位法升级，在每次递归的时候，构建出对应路径的合并字符串 -> 接近官方最优解法 */
    // const pathTotal = []
    // const pathMap = {}
    // function crossTree(root, column) {
    //     if (root === null) return

    //     const prevColumn = pathMap[column - 1]
    //     if (prevColumn) {
    //         pathMap[column] = prevColumn + '->' + root.val
    //     } else {
    //         pathMap[column] = root.val + ''
    //     }

    //     if (root.left === null && root.right === null) {
    //         pathTotal.push(pathMap[column])
    //         // 这里提前return 减少递归次数
    //         return
    //     }
    //     crossTree(root.left, column + 1)
    //     crossTree(root.right, column + 1)
    // }
    // crossTree(root, 0)
    // return pathTotal

    /** 官方解法，直接传入path */
    const paths = []
    const construct_paths = (root, path) => {
        if (root) {
            path += root.val.toString()
            if (root.left === null && root.right === null) {
                // 当前节点是叶子节点
                paths.push(path) // 把路径加入到答案中
            } else {
                path += '->' // 当前节点不是叶子节点，继续递归遍历
                construct_paths(root.left, path)
                construct_paths(root.right, path)
            }
        }
    }
    construct_paths(root, '')
    return paths
}

/** 226. 翻转二叉树
 * 给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点
 * 输入：root = [4,2,7,1,3,6,9]  输出：[4,7,2,9,6,3,1]
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function (root) {
    function crossTree(root) {
        if (root === null) return
        let newRoot = new TreeNode(root.val)
        newRoot.left = crossTree(root.right)
        newRoot.right = crossTree(root.left)
        return newRoot
    }
    return crossTree(root)

    /** 官方题解 */
    if (root === null) {
        return null
    }
    const left = invertTree(root.left)
    const right = invertTree(root.right)
    root.left = right
    root.right = left
    return root
}

/** 617. 合并二叉树
 * 给你两棵二叉树： root1 和 root2; 需要将这两棵树合并成一棵新二叉树。
 * 合并的规则是：如果两个节点重叠，那么将这两个节点的值相加作为合并后节点的新值；否则，不为 null 的节点将直接作为新二叉树的节点
 * 合并过程必须从两个树的根节点开始
 */
var mergeTrees = function (root1, root2) {
    function crossTree(root1, root2) {
        if (root1 === null || root2 === null) {
            return root1 || root2
        }
        let root = new TreeNode(root1.val + root2.val)
        root.left = crossTree(root1.left, root2.left)
        root.right = crossTree(root1.right, root2.right)
        return root
    }
    return crossTree(root1, root2)
}

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
    function isSameTrue(root, subRoot) {
        if (root === null && subRoot === null) return true
        if (root === null && subRoot !== null) return false
        if (root !== null && subRoot === null) return false
        if (root.val !== subRoot.val) return false
        return isSameTrue(root.left, subRoot.left) && isSameTrue(root.right, subRoot.right)
    }
    if (root === null && subRoot === null) return true
    if (root === null && subRoot !== null) return false
    /** 一棵树是另一棵树的子树，则满足以下条件之一：
     *  1. 这两棵树相等；
     *  2. 这个树是左数的子树；
     *  3. 这个树是右树的子树；
     */
    return isSameTrue(root, subRoot) || isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot)
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

/** 145. 二叉树的前序遍历 —— 迭代法
 *  核心原理：构建调用栈，模拟递归实现
 */
var postorderTraversal = function (root) {
    // if (root === null) return []
    // let res = []
    // function crossTree(root) {
    //     if (root === null) return
    //     crossTree(root.left)
    //     crossTree(root.right)
    //     res.push(root.val)
    // }
    // crossTree(root)
    // return res

    /** 前序遍历 */
    // if (root === null) return []
    // let res = []
    // let stack = []
    // let node = root
    // while (stack.length || node !== null) {
    //     // 当前根节点处理
    //     if (node !== null) {
    //         res.push(node.val) // 前序遍历，root节点保存
    //         stack.push(node)
    //     }
    //     // 左子树遍历到null
    //     while (node !== null && node.left) {
    //         node = node.left
    //         res.push(node.val)
    //         stack.push(node)
    //     }

    //     // 回退一步
    //     node = stack.pop()
    //     node = node.right
    // }
    // return res

    /** 中序遍历 */
    // if (root === null) return []
    // let res = []
    // let stack = []
    // let node = root
    // while (stack.length || node !== null) {
    //     // 当前根节点处理
    //     if (node !== null) {
    //         stack.push(node)
    //     }
    //     // 左子树遍历到null
    //     while (node !== null && node.left) {
    //         node = node.left
    //         stack.push(node)
    //     }
    //     // 回退一步
    //     node = stack.pop()
    //     res.push(node.val)
    //     node = node.right
    // }
    // return res

    /** 后序遍历 */
    if (root === null) return []
    let res = []
    let stack = []
    let node = root
    let prev = null
    while (stack.length || node !== null) {
        if (node !== null) stack.push(node)
        while (node !== null && node.left) {
            node = node.left
            stack.push(node)
        }
        // 回退一步
        node = stack.pop()
        if (node.right == null || node.right === prev) {
            /** 右节点为空或者为右节点出栈节点 */
            res.push(node.val)
            prev = node
            node = null // 重置node节点为空，跳过循环内if,while判断
        } else {
            stack.push(node) // 右节点不为空，将当前子节点压回入栈
            node = node.right
        }
    }
    return res
}
