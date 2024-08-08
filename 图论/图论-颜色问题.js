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

/**
 * 733. 图像渲染
 * @param {number[][]} image  m == image.length n == image[i].length 1 <= m, n <= 50
 * @param {number} sr
 * @param {number} sc
 * @param {number} color  0 <= image[i][j], newColor < 2^16
 * @return {number[][]}
 */
var floodFill = function (image, sr, sc, color) {
    //     有一幅以 m x n 的二维整数数组表示的图画 image ，其中 image[i][j] 表示该图画的像素值大小
    //     你也被给予三个整数 sr ,  sc 和 newColor 。你应该从像素 image[sr][sc] 开始对图像进行 上色填充
    //     为了完成 上色工作 ，从初始像素开始，记录初始坐标的 上下左右四个方向上 像素值与初始坐标相同的相连像素点
    //     接着再记录这四个方向上符合条件的像素点与他们对应 四个方向上 像素值与初始坐标相同的相连像素点
    //     重复该过程。将所有有记录的像素点的颜色值改为 newColor
    //
    // 输入: image = [[1,1,1],[1,1,0],[1,0,1]]，sr = 1, sc = 1, newColor = 2
    // 输出: [[2,2,2],[2,2,0],[2,0,1]]
    //  1  1  1
    //  1  1  0
    //  1  0  1
    // 解析: 在图像的正中间，(坐标(sr,sc)=(1,1)),在路径上所有符合条件的像素点的颜色都被更改成2。
    // 注意，右下角的像素没有更改为2，因为它不是在上下左右四个方向上与初始点相连的像素点。
    //
    // 输入: image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, newColor = 2
    //  0  0  0
    //  0  0  0
    // 输出: [[2,2,2],[2,2,2]]

    /**
     * 1. 从像素 image[sr][sc] 开始对图像进行 上色填充
     * 2. 从初始像素开始，记录初始坐标的 上下左右四个方向上 像素值与初始坐标相同的相连像素点
     * 3. 接着再记录这四个方向上符合条件的像素点与他们对应 四个方向上 像素值与初始坐标相同的相连像素点
     *
     * 也就是说一个点能不能上色，要看是否跟初始坐标 image[sr][sc] 有相同的像素点相连
     */
    image[sr][sc] = color
    // 如果初始颜色跟现有颜色一样，那么就不需要处理了
    if (initColor === color) return image

    const rowLen = image.length
    const colLen = image[0].length

    const initColor = image[sr][sc]
    // 维护一个渲染栈waitStack 和一个渲染过的栈 hadRender
    let waitStack = []
    let hadRender = new Set()

    // 初始化渲染

    fillPos(sr, sc)

    // updatePos()
    // updatePos()
    // console.log(waitStack, hadRender)

    // function updatePos() {
    //     const updateList = waitStack.slice(0)
    //     waitStack = []
    //     updateList.forEach((pos) => fillPos(pos[0], pos[1]))
    // }

    while (waitStack.length) {
        console.log(waitStack)
        const updateList = waitStack.slice(0)
        waitStack = []
        updateList.forEach((pos) => fillPos(pos[0], pos[1]))
    }

    // 四个方向的填充函数
    function fillPos(sr, sc) {
        const key = sr + '_' + sc
        if (hadRender.has(key)) return
        hadRender.add(key)
        if (sr - 1 >= 0 && image[sr - 1][sc] === initColor) {
            // top
            image[sr - 1][sc] = color
            waitStack.push([sr - 1, sc])
        }
        // right
        if (sc + 1 < colLen && image[sr][sc + 1] === initColor) {
            image[sr][sc + 1] = color
            waitStack.push([sr, sc + 1])
        }
        // bottom
        if (sr + 1 < rowLen && image[sr + 1][sc] === initColor) {
            image[sr + 1][sc] = color
            waitStack.push([sr + 1, sc])
            hadRender.add([sr + 1, sc])
        }
        // left
        if (sc - 1 >= 0 && image[sr][sc - 1] === initColor) {
            image[sr][sc - 1] = color
            waitStack.push([sr, sc - 1])
        }
    }

    return image
}

// 超时
floodFill(
    [
        [0, 0, 0],
        [0, 0, 0],
    ],
    0,
    0,
    0
)

// floodFill(
//     [
//         [1, 1, 1],
//         [1, 1, 0],
//         [1, 0, 1],
//     ],
//     1,
//     1,
//     2
// )
