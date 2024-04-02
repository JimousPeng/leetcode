var iceBreakingGame = function (num, target) {
    // 数学 + 递归

    // function lastDelete(num, target) {
    // 当序列长度为 1 时，一定会留下唯一的那个元素，它的编号为 0
    //     if (num === 1) return 0
    //     let x = dfs(num - 1, target)
    //     // x 为新一轮的开始下标，每次删除的数默认都是 target % num
    //     // 由于要接着上一次删除的数往下删，所以需要 target + x
    //     return (target + x) % num
    // }

    // return lastDelete(num, target)

    let res = 0
    // i从1开始计数
    for (let i = 2; i !== num + 1; ++i) {
        console.error('---------- aiden --------------', target, res, i)
        res = (target + res) % i
        // console.error('---------- aiden --------------', res)
    }
    return res

    // const target = target % num

    /** 链表能解，但是会超时 */
    function LinkNode(val) {
        this.val = val
        this.next = undefined
    }
    let start = 0
    let head = new LinkNode(0)
    let curNode = head
    while (start < num - 1) {
        curNode.next = new LinkNode(++start)
        curNode = curNode.next
    }
    // 成环
    curNode.next = head

    /** 环形链表遍历 */

    // head -> 0  1
    //      5       2
    //         4  3

    if (target == 1) return curNode.val // 如果target=1,直接return最后一位即可
    let step = 1
    let node = head
    let prev
    //    0          0
    //  3   1            1
    //    2          2
    while (node.next && node.next.val !== node.val) {
        if (step === target) {
            prev.next = node.next
            node = node.next
            // 重置step
            step = 1
        }
        prev = node
        node = node.next
        step++
    }
    // console.log('最终', node)
    return node.val
}

console.log(iceBreakingGame(4, 7))
