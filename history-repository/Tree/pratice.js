/** 序列化与反序列化
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
    return rserialize(root, '')
}

var deserialize = function (data) {
    const dataArray = data.split(',')
    return rdeserialize(dataArray)
}

const rserialize = (root, str) => {
    if (root === null) {
        str += 'None,'
    } else {
        str += root.val + '' + ','
        str = rserialize(root.left, str)
        str = rserialize(root.right, str)
    }
    return str
}

const rdeserialize = (dataList) => {
    if (dataList[0] === 'None') {
        dataList.shift()
        return null
    }

    const root = new TreeNode(parseInt(dataList[0]))
    dataList.shift()
    root.left = rdeserialize(dataList)
    root.right = rdeserialize(dataList)

    return root
}

// 前序遍历
function crossFront(root) {
    if (root == null) {
        return []
    }
    const valList = []
    function crossOneByOne(root) {
        if (root == null) return
        valList.push(root.val)
        crossOneByOne(root.left)
        crossOneByOne(root.right)
    }
    crossOneByOne(root)
    return valList
}
