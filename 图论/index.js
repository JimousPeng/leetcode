/**
 * 94. 腐烂的橘子
 * 在给定的 m x n 网格 grid 中，每个单元格可以有以下三个值之一
 * 值 0 代表空单元格；
 * 值 1 代表新鲜橘子；
 * 值 2 代表腐烂的橘子
 *
 * [[2,1,1],[1,1,1],[0,1,2]] -》 2
 * 2 1 1    2 2 1    2 2 2
 * 1 1 1    2 1 2    2 2 2
 * 0 1 2    0 2 2    0 2 2
 *
 * 每分钟，腐烂的橘子 周围 4 个方向上相邻 的新鲜橘子都会腐烂
 * 返回 直到单元格中没有新鲜橘子为止所必须经过的最小分钟数。如果不可能，返回 -1
 *
 * 2 1 1    2 2 1    2 2 2    2 2 2    2 2 2
 * 1 1 0    2 1 0    2 2 0    2 2 0    2 2 0
 * 0 1 1    0 1 1    0 1 1    0 2 1    0 2 2
 * 输入：grid = [[2,1,1],[1,1,0],[0,1,1]] 输出：4
 *
 * 2 1 1
 * 0 1 1
 * 1 0 1
 * 输入：grid = [[2,1,1],[0,1,1],[1,0,1]] 输出：-1
 * 解释：左下角的橘子（第 2 行， 第 0 列）永远不会腐烂，因为腐烂只会发生在 4 个方向上
 *
 * 输入：grid = [[0,2]] 输出：0
 * 解释：因为 0 分钟时已经没有新鲜橘子了，所以答案就是 0
 *
 * [2,0,1,1,1,1,1,1,1,1],
 * [1,0,1,0,0,0,0,0,0,1],
 * [1,0,1,0,1,1,1,1,0,1],
 * [1,0,1,0,1,0,0,1,0,1],
 * [1,0,1,0,1,0,0,1,0,1],
 * [1,0,1,0,1,1,0,1,0,1],
 * [1,0,1,0,0,0,0,1,0,1],
 * [1,0,1,1,1,1,1,1,0,1],
 * [1,0,0,0,0,0,0,0,0,1],
 * [1,1,1,1,1,1,1,1,1,1]]
 *
 * [ 2, 0, 1, 1, 1, 1, 1, 1, 1, 1 ],
 * [ 2, 0, 1, 0, 0, 0, 0, 0, 0, 1 ],
 * [ 2, 0, 1, 0, 1, 1, 1, 1, 0, 1 ],
 * [ 2, 0, 1, 0, 1, 0, 0, 1, 0, 1 ],
 * [ 2, 0, 1, 0, 1, 0, 0, 1, 0, 1 ],
 * [ 2, 0, 1, 0, 1, 1, 0, 1, 0, 1 ],
 * [ 2, 0, 1, 0, 0, 0, 0, 1, 0, 1 ],
 * [ 2, 0, 1, 1, 1, 1, 1, 1, 0, 1 ],
 * [ 2, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],
 * [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ]
 *
 * 出现两个腐烂的橘子场景：正确结果应该是2
 * [2, 1, 1],
 * [1, 1, 1],
 * [0, 1, 2]
 *
 *
 * 只有单列，此时要返回 -1
 * [[2],[2],[1],[0],[1],[1]]
 * 2
 * 2
 * 1
 * 0
 * 1
 * 1
 *
 * [[1,0,2,1,2,1,2],[1,0,0,2,1,0,1]]
 *
 * 1 0 2 1 2 1 2
 * 1 0 0 2 1 0 1
 *
 *
 * m == grid.length
 * n == grid[i].length
 * 1 <= m, n <= 10
 * grid[i][j] 仅为 0、1 或 2
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
    /** 思路总结：
     * 1. 在遍历中，统计好橘子的个数，更新腐败橘子周边橘子时，计算污染的个数
     *    最后对比个数差，来判断是否有永远不会污染的橘子
     * 2. 由于腐烂的橘子存在多个，所以要用数组保存被污染的橘子，然后通过轮数
     *    污染周边新鲜橘子，并将新鲜橘子的坐标存入到当前腐烂橘子的数组中，每次
     *    污染都清空当前轮数下的腐烂橘子坐标数，知道没有新橘子被污染
     * 3. 统计最终的被污染的橘子数和新鲜橘子树，如果有新橘子未被污染，则返回-1
     *
     *
     */

    // 行数列数都在 [1, 10] 区间内
    const rowLen = grid.length
    const colLen = grid[0].length

    // let lastNever = false
    // if (colLen === 1) {
    //     // 针对单列情况特殊处理
    //     for (let i = 0; i < rowLen; i++) {
    //         const row = grid[i]
    //         if (row[0] == 0) {
    //             lastNever = true
    //         } else if (row[0] === 2) {
    //             lastNever = false
    //         } else {
    //             if (lastNever && i === rowLen - 1) return -1
    //         }
    //     }
    // }

    let count = 0,
        existNerver = false,
        goodsCount = 0,
        goodsToBad = 0
    badPos = [] // 烂橘子坐标

    // 1. 找出当前轮烂橘子
    // 2. 同步变更烂橘子状态

    findOrange(rowLen, colLen)
    if (existNerver) return -1
    if (!badPos.length && goodsCount) return -1

    while (badPos.length) {
        const updateList = badPos.slice(0)
        badPos = []
        let hasOrange = false
        updateList.forEach((pos) => {
            const flag = updateStatus(pos[0], pos[1])
            hasOrange = hasOrange || flag
        })
        if (hasOrange) count++
    }

    /** 最后再校验下是否有永远不会腐烂的橘子 */

    if (goodsCount - goodsToBad > 0) return -1

    return count

    function findOrange(rl, cl) {
        for (let i = 0; i < rl; i++) {
            for (let j = 0; j < cl; j++) {
                if (grid[i][j] === 1) {
                    findNever(i, j) // 这里算是剪枝，方便遇到直接退出程序
                    goodsCount++
                } else if (grid[i][j] === 2) {
                    // 腐烂的橘子往四周影响
                    badPos.push([i, j])
                }
            }
        }
        return count
    }

    function findNever(row, col) {
        const top = (grid[row - 1] && grid[row - 1][col]) || 0
        const left = grid[row][col - 1] || 0
        const bottom = (grid[row + 1] && grid[row + 1][col]) || 0
        const right = grid[row][col + 1] || 0
        if (top == 0 && left == 0 && bottom == 0 && right == 0) {
            existNerver = true
        }
    }

    function updateStatus(row, col) {
        let hasOrange = false
        if (grid[row - 1] && grid[row - 1][col] === 1) {
            // top
            grid[row - 1][col] = 2
            badPos.push([row - 1, col])
            hasOrange = true
            goodsToBad++
        }
        if (grid[row][col - 1] && grid[row][col - 1] === 1) {
            // left
            grid[row][col - 1] = 2
            badPos.push([row, col - 1])
            hasOrange = true
            goodsToBad++
        }
        if (grid[row + 1] && grid[row + 1][col] === 1) {
            // bottom
            grid[row + 1][col] = 2
            badPos.push([row + 1, col])
            hasOrange = true
            goodsToBad++
        }
        if (grid[row][col + 1] && grid[row][col + 1] === 1) {
            // right
            grid[row][col + 1] = 2
            badPos.push([row, col + 1])
            hasOrange = true
            goodsToBad++
        }
        return hasOrange
    }

    // 存在坏的，不存在好的，返回0;  一定要存在好的，才会返回 -1 ，所以 [[0,0,0,0]] 返回 0
    // 特殊用例： [[1]] -> -1  [[0,1]]->-1   [[0,2]] -> 0    [[0,0,0,0]] -> 0
    // [[1],[2]] -> 1

    /**
     * 以下代码只能解决单个橘子的污染
     * 思路
     * 当一个橘子腐烂之后，有可能往上污染，之前遍历的可能需要重新处理
     */

    // 行数列数都在 [1, 10] 区间内
    // const rowLen = grid.length
    // const colLen = grid[0].length

    // let count = 0,
    //     existNerver = false

    // function findOrange(rl, cl) {
    //     console.log('---------- findOrange, r1, cl --------------', rl, cl)
    //     for (let i = 0; i < rl; i++) {
    //         for (let j = 0; j < cl; j++) {
    //             if (grid[i][j] === 1) {
    //                 findNever(i, j)
    //             } else if (grid[i][j] === 2) {
    //                 // 腐烂的橘子往四周影响
    //                 updateStatus(i, j)
    //             }
    //             if (existNerver) return -1
    //         }
    //     }
    //     return count
    // }

    // function findNever(row, col) {
    //     const top = (grid[row - 1] && grid[row - 1][col]) || 0
    //     const left = grid[row][col - 1] || 0
    //     const bottom = (grid[row + 1] && grid[row + 1][col]) || 0
    //     const right = grid[row][col + 1] || 0
    //     if (top == 0 && left == 0 && bottom == 0 && right == 0) {
    //         existNerver = true
    //     }
    // }

    // function updateStatus(row, col) {
    //     let trackBack = false,
    //         hasOrange = false
    //     if (grid[row - 1] && grid[row - 1][col] === 1) {
    //         // top
    //         grid[row - 1][col] = 2
    //         trackBack = true
    //         hasOrange = true
    //     }
    //     if (grid[row][col - 1] && grid[row][col - 1] === 1) {
    //         // left
    //         grid[row][col - 1] = 2
    //         trackBack = true
    //         hasOrange = true
    //     }
    //     if (grid[row + 1] && grid[row + 1][col] === 1) {
    //         // bottom
    //         grid[row + 1][col] = 2
    //         hasOrange = true
    //     }
    //     if (grid[row][col + 1] && grid[row][col + 1] === 1) {
    //         // right
    //         grid[row][col + 1] = 2
    //         hasOrange = true
    //     }
    //     if (hasOrange) {
    //         // 本轮有橘子被感染，历时一分钟，count++
    //         count++
    //     }
    //     if (trackBack) {
    //         // 当top和left被影响，要回溯重新遍历
    //         // *遍历要+1, 因为for循环里面是 < *
    //         findOrange(row + 1, col + 1)
    //     }
    // }
    // return findOrange(rowLen, colLen)
}
