/** 面试题 08.10. 颜色填充
 * 编写函数，实现许多图片编辑软件都支持的「颜色填充」功能
 * 待填充的图像用二维数组 image 表示，元素为初始颜色值。
 * 初始坐标点的行坐标为 sr 列坐标为 sc 需要填充的新颜色为 newColor
 *
 * 「周围区域」是指颜色相同且在上、下、左、右四个方向上存在相连情况的若干元素
 *
 * 请用新颜色填充初始坐标点的周围区域，并返回填充后的图像
 *
 * 输入： image = [[1,1,1],[1,1,0],[1,0,1]]   sr = 1, sc = 1, newColor = 2
 * 1  1  1
 * 1  1  0
 * 1  0  1
 * 输出：[[2,2,2],[2,2,0],[2,0,1]]
 * 2  2  2
 * 2  2  0
 * 2  0  1
 * 解释：
 * 初始坐标点位于图像的正中间，坐标 (sr,sc)=(1,1) 。
 * 初始坐标点周围区域上所有符合条件的像素点的颜色都被更改成 2
 * 注意，右下角的像素没有更改为 2 ，因为它不属于初始坐标点的周围区域。
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
var floodFill = function (image, sr, sc, newColor) {
    const rowLen = image.length
    const columnLen = image[0].length
    const initColor = image[sr][sc]
    function dfs(sr, sc) {
        const inArea = sr >= 0 && sr < rowLen && sc >= 0 && sc < columnLen
        if (!inArea) return
        /** 对比是不是 initColor，来决定需不需要填充 */
        if (image[sr][sc] !== initColor) return
        // 递归过的要跳过
        if (image[sr][sc] === newColor) return
        image[sr][sc] = newColor
        /** 确定四个点的遍历递归方向 */
        dfs(sr + 1, sc)
        dfs(sr - 1, sc)
        dfs(sr, sc + 1)
        dfs(sr, sc - 1)
    }
    dfs(sr, sc)
    return image
}
