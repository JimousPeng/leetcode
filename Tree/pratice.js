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
