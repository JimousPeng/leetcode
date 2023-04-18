/**
 * vue2 双端diff算法：一种同时对新旧两组子节点的两个端点进行比较的算法
 * 需要四个索引值，分别指向新旧两组子节点的端点
 * oldStartIdx: 旧节点起始节点坐标
 * oldEndIdx:   旧节点末尾节点坐标
 * newStartIdx: 新节点起始节点坐标
 * newEndIdx:   新节点末尾节点坐标
 *
 * 优势：减少DOM操作开销
 *
 */

 const oldVnode = {
    type: 'div',
    children: [
        { type: 'p', children: '1', key: 1 },
        { type: 'p', children: '2', key: 2 },
        { type: 'p', children: '3', key: 3 },
    ],
};

const newVnode = {
    type: 'div',
    children: [
        { type: 'p', children: '3', key: 3 },
        { type: 'p', children: '1', key: 1 },
        { type: 'p', children: '2', key: 2 },
    ],
};

/** 对于上述两个新旧虚拟节点，简单diff算法下，需要进行两次DOM移动操作，即将key-1,key-2移动到key-3后面
 * 而实际上通过移动一次key-3即可完成更新，简单diff算法下无法实现，而双端diff算法可以做到。
 *
 * 在双端比较中，每一轮比较都分为四个步骤：
 * 1. 比较新旧的子节点中的第一个子节点，oldStartIdx <-> newStartIdx;如果命中匹配，则更新节点信息，并更新新旧子节点的起始坐标++;
 * 2. 比较新旧的子节点中的最后一个子节点，oldEndIdx <-> newEndIdx;如果命中匹配，则更新节点信息，并更新新旧子节点的终点坐标--;
 * 3. 比较旧虚拟节点数组的第一个子节点与新虚拟节点数组的最后一个子节点， oldStartIdx <-> newEndIdx;如果命中匹配，则更新节点信息，头部节点坐标++，终点坐标--;
 * 4. 比较旧虚拟节点数组的最后一个子节点与新虚拟节点数组的第一个子节点， oldEndIdx <-> newStartIdx;如果命中匹配，则更新节点信息，头部节点坐标++，终点坐标--;
 *
 * 如果上述四个步骤都无法找到可复用的节点，怎么处理：
 * 尝试看看非头部，非尾部的节点能否复用：
 * 具体做法是拿新的那一组子节点中的头部节点去旧的一组子节点中去寻找可复用的节点。
 *
 * 如果找到可复用的节点，将该节点移动到旧头部节点之前，原该节点的值置为undefined，
 * 基于这种情况，在前面的每轮双端匹配步骤中，需要额外考虑对旧的那组子节点可能存在undefined的头尾节点进行跳过处理；
 *
 * 如果找不到可复用的节点，说明是新增节点，那么直接将节点插入到旧的那组的头部节点所在元素之前。
 *
 * 最后是特殊情况分析，当双端循环比较之后，对于四个索引值的异常结束情况处理，如果旧节点已经遍历完(头部坐标>终点左边)，新节点的头部节点坐标仍然小于终点坐标，说明存在新增元素，那么将这个区间部分节点一一挂载到当前就的那组的头部节点坐标
 * 所处的节点之前；同理，如果新节点已经遍历完(头部坐标>终点左边)，旧节点的头部节点坐标仍然小于终点坐标，说明有旧节点需要卸载，那么就这个区间部分的节点一一卸载即可。
 */

function patchKeyedChildren(n1, n2, container) {
    const oldChildren = n1.children;
    const newChildren = n2.children;
    // 定义四个索引值
    let oldStartIdx = 0,
        oldEndIdx = n1.lenth - 1,
        newStartIdx = 0,
        newEndIdx = n1.length - 1;
    // 四个索引值指向的 vnode 节点
    let oldStartVNode = oldChildren[oldStartIdx],
        oldEndVNode = oldChildren[oldEndIdx],
        newStartVNode = newChildren[newStartIdx],
        newEndVNode = newChildren[newEndIdx];

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (!oldStartVNode) {
            oldStartVNode = oldChildren[++oldStartIdx];
        } else if (!oldEndVNode) {
            oldEndVNode = oldChildren[--oldEndIdx];
        } else if (oldStartVNode.key === newStartVNode.key) {
            // 1. 比较新旧的子节点中的第一个子节点
            patch(oldStartVNode, newStartVNode, container);
            oldStartVNode = oldChildren[++oldStartIdx];
            newStartIdx = newChildren[++newStartIdx];
        } else if (oldEndVNode.key === newEndVNode.key) {
            // 2. 比较新旧的子节点中的最后一个子节点
            patch(oldEndVNode, newEndVNode, container);
            oldEndVNode = oldChildren[--oldEndIdx];
            newEndIdx = newChildren[--newEndIdx];
        } else if (oldStartVNode.key === newEndVNode.key) {
            // 3. 比较旧虚拟节点数组的第一个子节点与新虚拟节点数组的最后一个子节点
            patch(oldStartVNode, newEndVNode, container);
            insert(oldStartVNode.el, container, oldEndVNode.el.nextsibling);
            oldStartVNode = oldChildren[++oldStartIdx];
            newEndVNode = newChildren[--newEndIdx];
        } else if (oldEndVNode.key === newStartVNode.key) {
            // 4. 比较旧虚拟节点数组的最后一个子节点与新虚拟节点数组的第一个子节点
            // 示例满足这一条比较

            // a. 更新节点信息
            patch(oldEndVNode, newStartVNode, container);
            // b. 移动真实DOM, oldEndVNode.el 移动到 oldStartVNode.el 前面
            insert(oldEndVNode.el, container, oldStartVNode.el);
            // c. 更新索引值
            oldEndVNode = oldChildren[--oldEndIdx];
            newStartVNode = newChildren[++newStartIdx];
        } else {
            // 前四组匹配均未命中
            const idxInOld = oldChildren.findIndex((node) => node.key === newStartVNode.key);
            if (idxInOld > 0) {
                // 说明找到了可复用的节点，根据需要将其对应真实的DOM移动到头部
                const vnodeToMove = oldChildren[idxInOld];
                patch(vnodeToMove, newStartVNode, container);
                // 移动该DOM到旧的头部oldstartvnode节点之前，成为新的头部节点
                insert(vnodeToMove.el, container, oldStartVNode.el);
                // 坐标idinold处的节点对应的真实DOM已经移到了别处，因此将其设置为undefined
                oldChildren[idxInOld] = undefined;
                // 更新位置
            } else {
                // 说明是新增节点
                patch(null, newStartVNode, container, oldStartVNode.el);
            }
            newStartVNode = newChildren[++newStartIdx];
        }
    }

    // 循环结束后检查索引值的情况
    if (oldEndIdx < oldStartIdx && newStartIdx <= newEndIdx) {
        // 分析： old那组的循环已经全部走完，满足 endidx < startidx， 而新的那一组的循环还有空间，这部分空间内的节点，则都是新增节点
        // 如果满足条件，说明有新的节点遗留，需要挂载它们。
        for (let i = newStartIdx; i <= newEndIdx; i++) {
            // 挂载的锚点仍然使用当前的头部节点oldstartvnode.el
            patch(null, newChildren[i], container, oldStartVNode.el);
        }
    } else if (newEndIdx < newStartIdx && oldStartIdx <= oldEndIdx) {
        // 旧节点未循环完，空余节点均需被卸载。
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
            unmount(oldChildren[i]);
        }
    }
}
