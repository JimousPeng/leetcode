/** 图论-岛屿问题 https://leetcode.cn/problems/number-of-islands/solutions/211211/dao-yu-lei-wen-ti-de-tong-yong-jie-fa-dfs-bian-li-/ */
// 遍历模板：
const rowLen = grid.length
const columnLen = grid[0].length
/**
 * grid[i][j] = 1 表示陆地， grid[i][j] = 0 表示水域
 * 为了减少重复遍历，可以将 grid[r][c] = 2 编辑为遍历过的节点
 */
function dfs(grid, r, c) {
    if (!inArea(grid, r, c)) return
    // 如果这个格子不是岛屿，直接返回
    if (grid[r][c] != 1) {
        return
    }
    grid[r][c] = 2
    // 当前遍历坐标是 (r, c), 递归遍历它的上下左右节点
    dfs(grid, r - 1, c)
    dfs(grid, r + 1, c)
    dfs(grid, r, c - 1)
    dfs(grid, r, c + 1)
}
function inArea(grid, r, c) {
    // 校验当前点位是否在图内
    return 0 <= r && r < rowLen && 0 <= c && c < columnLen
}

/** 463. 岛屿的周长
 *
 * 给定一个 row x col 的二维网格地图 grid ，其中：grid[i][j] = 1 表示陆地， grid[i][j] = 0 表示水域
 * 网格中的格子 水平和垂直 方向相连（对角线方向不相连）。整个网格被水完全包围，但其中恰好有一个岛屿（或者说，一个或多个表示陆地的格子相连组成的岛屿）
 *
 * 输入：grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]
 * 输出：16
 * 0 1 0 0
 * 1 1 1 0
 * 0 1 0 0
 * 1 1 0 0
 * @param {number[][]} grid
 * @return {number}
 */
var islandPerimeter = function (grid) {
    /**
     * grid[i][j] = 1 表示陆地， grid[i][j] = 0 表示水域
     * 为了减少重复遍历，可以将 grid[r][c] = 2 编辑为遍历过的节点
     */
    function dfs(r, c) {
        if (!inArea(r, c)) return 1
        if (grid[r][c] === 0) return 1 // 当前是海洋，那么与该陆地有一个边距
        if (grid[r][c] === 2) return 0 // 当前是已经遍历过的节点，直接跳过
        grid[r][c] = 2
        // 当前遍历坐标是 (r, c), 递归遍历它的上下左右节点
        return dfs(r - 1, c) + dfs(r + 1, c) + dfs(r, c - 1) + dfs(r, c + 1)
    }
    function inArea(r, c) {
        // 校验当前点位是否在图内
        return 0 <= r && r < rowLen && 0 <= c && c < columnLen
    }
    const rowLen = grid.length
    const columnLen = grid[0].length
    for (let r = 0; r < rowLen; r++) {
        for (let c = 0; c < columnLen; c++) {
            if (grid[r][c] === 1) {
                // 岛屿计算,y由于只存在一个岛屿，计算一个即可
                return dfs(r, c)
            }
        }
    }
    return 0
}

/** 
 * 200. 岛屿数量
 * 给你一个由 '1'（陆地）和 '0'（水）组成的二维网格，请你计算网格中岛屿的数量
 * 输入：grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
输出：1

输入：grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
输出：3
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
    const rowLen = grid.length
    const columnLen = grid[0].length
    let res = 0
    for (let r = 0; r < rowLen; r++) {
        for (let c = 0; c < columnLen; c++) {
            if (grid[r][c] === '1') {
                dfs(r, c)
                res += 1
            }
        }
    }
    function dfs(r, c) {
        const inArea = r >= 0 && r < rowLen && c >= 0 && c < columnLen
        if (!inArea) return 0
        if (grid[r][c] === '0') return 0
        if (grid[r][c] === '2') return 0
        /**
         * grid[r][c] = 1 陆地
         * grid[r][c] = 0 海洋
         * grid[r][c] = 2 已标记
         */
        grid[r][c] = '2'
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
    }
    return res
}
