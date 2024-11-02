/** 图论 */

/**
 * 200. 岛屿数量
 * @param {character[][]} grid  grid[i][j] 的值为 '0' 或 '1'
 * @return {number}
 */
var numIslands = function (grid) {
  /**
   * 前提条件：
   * 1. 岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成
   * 2. 可以假设该网格的四条边均被水包围
   * 
   * 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量
   * 输入：grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
输出：1
   */
  const rowLen = grid.length;
  const colLen = grid[0].length;
  let count = 0;
  for (let r = 0; r < rowLen; r++) {
    for (let c = 0; c < colLen; c++) {
      if (grid[r][c] === "1") {
        markIsland(r, c);
        count++;
      }
    }
  }
  // 标记岛屿，将标记过的陆地记为'2'
  function markIsland(r, c) {
    const inRow = r >= 0 && r < rowLen;
    const inCol = c >= 0 && c < colLen;
    if (inRow && inCol && grid[r][c] === "1") {
      grid[r][c] = "2";
    } else {
      return;
    }
    markIsland(r + 1, c);
    markIsland(r - 1, c);
    markIsland(r, c + 1);
    markIsland(r, c - 1);
  }
  return count;
};

/**
 * 207. 课程表
 * @param {number} numCourses
 * @param {number[][]} prerequisites 0 <= prerequisites.length <= 5000  prerequisites[i] 中的所有课程对 互不相同
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  /** 你这个学期必须选修 numCourses 门课程，记为 0 到 numCourses - 1
   * 在选修某些课程之前需要一些先修课程
   * 先修课程按数组 prerequisites 给出，其中 prerequisites[i] = [ai, bi] ，表示如果要学习课程 ai 则 必须 先学习课程  bi
   * 例如，先修课程对 [0, 1] 表示：想要学习课程 0 ，你需要先完成课程 1
   * 请你判断是否可能完成所有课程的学习？如果可以，返回 true ；否则，返回 false
   *
   * 输入：numCourses = 2, prerequisites = [[1,0]] 输出：true
   * 解释：总共有 2 门课程。学习课程 1 之前，你需要完成课程 0 。这是可能的。
   *
   * 输入：numCourses = 2, prerequisites = [[1,0],[0,1]] 输出：false
   * 解释：总共有 2 门课程。学习课程 1 之前，你需要先完成​课程 0 ；并且学习课程 0 之前，你还应先完成课程 1 。这是不可能的。
   *
   * [[1,0],[0,2],[2,1]]  false  就是要记录[下标]? 判断会不会存在嵌套成环？
   * 1 0   0.next = 1
   * 0 2   2.next = 0
   * 2 1   1.next = 2
   */

  function cross() {
    const rowLen = prerequisites.length;
    if (rowLen === 0) return true;
    function CreateLinkNode(val) {
      this.val = val;
      this.next = undefined;
      return this
    }
    const courseMap = new Map()
    for(let i = 0 ; i<rowLen; i++) {
      const next = prerequisites[i][0]
      const pre = prerequisites[i][1]



      const nextNode = courseMap.get(next) ? courseMap.get(next) : new CreateLinkNode(next)
      const preNode = courseMap.get(pre) ? courseMap.get(pre) : new CreateLinkNode(pre)
      
      preNode.next = nextNode


      courseMap.set(next, nextNode)
      courseMap.set(pre, preNode)



    }
    
};
