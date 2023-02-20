/**
 * vue2 双端diff算法：一种同时对新旧两组子节点的两个端点进行比较的算法
 * 需要四个索引值，分别指向新旧两组子节点的端点
 * oldStartIdx: 旧节点起始节点坐标
 * oldEndIdx:   旧节点末尾节点坐标
 * newStartIdx: 新节点起始节点坐标
 * newEndIdx:   新节点末尾节点坐标
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
 * 1. 比较新旧的子节点中的第一个子节点，oldStartIdx <-> newStartIdx;
 * 2. 比较新旧的子节点中的最后一个子节点，oldEndIdx <-> newEndIdx;
 * 3. 比较旧虚拟节点数组的第一个子节点与新虚拟节点数组的最后一个子节点， oldStartIdx <-> newEndIdx;
 * 4. 比较旧虚拟节点数组的最后一个子节点与新虚拟节点数组的第一个子节点， oldEndIdx <-> newStartIdx;
 */

function patchKeyedChildren(n1, n2, container) {
    const oldChildren = n1.children;
    const newChildren = n2.children;
    // 定义四个索引值
    let oldStartIdx = 0,
        newStartIdx = 0,
        oldEndIdx = n1.lenth,
        newEndIdx = n1.length;
}
