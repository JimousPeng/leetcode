/**
 * 用于比较的算法，就叫做diff算法。
 *
 * 简单diff算法:
 * 通过两层循环，遍历新旧两组节点；
 * 外层遍历新的那组节点，对于每一个子节点，尝试在旧组节点中找到可复用的节点，先更新节点信息，然后进行移动DOM，如果找不到可复用的节点，意味着需要新增节点，
 * 首先找到新增节点，然后将其挂载到正确的位置上；
 * 对于节点插入位置，先判断在它之前是否已有新增的新节点，如果有，那么直接插入到该新增的前一个节点的下一个兄弟节点之前，如果没有，说明是第一个节点，那么直接使用容器的第一个子节点作为锚点，插入。
 * 
 * 当所有可复用的DOM已经移动并且新增节点也已经插入，此时还需要遍历旧节点组，对于那些在新节点组中找不到的节点项卸载处理。
 *
 */

const oldVnode = {
    type: 'div',
    children: [
        { type: 'p', children: '1', key: 1 },
        { type: 'p', children: '2', key: 2 },
        { type: 'p', children: '3', key: 3 },
        { type: 'p', children: '4', key: 4 },
    ],
};

const newVnode = {
    type: 'div',
    children: [
        { type: 'p', children: '6', key: 6 },
        { type: 'p', children: '3', key: 3 },
        { type: 'p', children: '2', key: 2 },
        { type: 'p', children: '1', key: 1 },
    ],
};

function pathChildren(n1, n2, container) {
    // ...只表现核心diff逻辑,patch函数用于渲染虚拟节点
    const oldChildren = n1.children;
    const newChildren = n2.children;
    const oldLen = oldChildren.length;
    const newLen = newChildren.length;

    /** 通过遍历每一项子节点，将新vnode替换旧vnode
     *  存在的问题：新旧两组子节点的数量不一定相同，无法直接等量替换。
     */
    for (let i = 0; i < oldChildren.length; i++) {
        patch(oldChildren[i], newChildren[i]);
    }

    /**
     * 优化：
     * 对比新旧子节点的长度，遍历其中更短的那组子节点
     * 如果新的更长，那么说明需要挂载新的节点;
     * 如果旧的更长，说明需要卸载旧子节点
     *
     * 优化空间：新旧两组子节点可能存在可复用的节点，可通过移动DOM来完成子节点的更新
     */
    const useLength = Math.min(oldLen, newLen);
    for (let i = 0; i < useLength; i++) {
        patch(oldChildren[i], newChildren[i]);
    }
    if (newLen > oldLen) {
        for (let i = useLength; i < newLen; i++) {
            patch(null, newChildren[i], container);
        }
    } else if (oldLen > newLen) {
        for (let i = useLength; i < oldLen; i++) {
            unmount(oldChildren[i]);
        }
    }

    /**
     * 之前的操作，基于示例，都需要进行6次DOM操作，如果能匹配到可复用的节点，那么可以有效减少DOM操作次数
     * 优化++：DOM复用与key的作用
     * 如果要做到移动vnode，那么需要额外的key来标识vnode
     *
     * 额外key的作用: 只要两个虚拟节点的type属性值和key属性值都相同，那么对于这两个虚拟节点，我们就认为它们是相同的，可以进行DOM复用
     * 复用不代表不需要更新，DOM的文本内容已经改变，需要打补丁操作，但依然减少了创建开销，只需要移动DOM来完成更新
     *
     * a. 移动DOM
     * 1. 找到可复用的节点
     * 2. 移动节点来完成真实DOM顺序的更新
     *
     * b. 添加新元素
     * 1. 找到新增节点
     * 2. 将新增节点挂载到正确位置
     *
     * c. 删除不需要的元素
     * 1. 找到需要删除的节点;
     * 2. 删除节点
     */
    let lastIndex = 0; // 用来存储寻找过程中遇到的最新索引值
    for (let i = 0; i < newLen; i++) {
        const newVNode = newChildren[i];
        let find = false; // 代表是否在旧的一组子节点中找到可复用的节点
        for (let j = 0; j < oldLen; j++) {
            const oldVNode = oldChildren[j];
            /** a. 移动DOM */
            if (newVNode.key === oldVNode.key) {
                // 1. 找到key值相同的节点，调用patch函数更新
                patch(oldVNode, newVNode, container);
                find = true;
                // 2. 更新顺序
                if (j < lastIndex) {
                    // 如果当前找到的节点在旧children中的索引小于最新索引值lastIndex(即对比旧children，节点变动了);
                    // 说明该节点对应的真实DOM需要移动，不是移动虚拟节点本身，直接移动旧虚拟节点对应的真实DOM节点

                    const prevVNode = newChildren[i - 1]; // 先找到前一个元素
                    if (prevVNode) {
                        // anchor-找到移动的锚点坐标元素
                        const anchor = prevVNode.el.nextSiBling;
                        insert(newVNode.el, container, anchor); // 封装原生insertBefore函数
                    }
                } else {
                    // 如果当前找到的节点在旧children中的索引不小于最新索引值lastIndex,更新lastIndex的值
                    lastIndex = j;
                }
                break;
            }
            /** b. 添加新元素 */
            if (!find) {
                // oldchildren内部循环没有找到可复用的节点，说明是新增节点，需要挂载。
                const prevVNode = newChildren[i - 1];
                let anchor = null;
                if (prevVNode) {
                    // 如果有前一个节点，则使用它的下一个兄弟节点作为锚点插入元素
                    anchor = prevVNode.el.nextSiBling;
                } else {
                    // 如果没有前一个节点，说明是第一个子节点，直接使用容器元素的第一个子节点作为锚点插入
                    anchor = container.firstChild;
                }
                patch(null, newVNode, container, anchor);
            }
            /** c. 删除不需要的元素 */
            for (let k = 0; k < oldLen; k++) {
                const oldVNode = oldChildren[k];
                const exitNode = newChildren.find((vnode) => vnode.key === oldVNode.key);
                if (!exitNode) {
                    // 无法从新节点数组中找到该元素，说明是需要删除的节点，卸载它
                    unmount(oldVNode);
                }
            }
        }
    }
}
