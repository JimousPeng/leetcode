/**
 * vue3-快速diff算法,性能稍优于双端diff
 * 不同于简单diff算法和双端diff算法，快速diff算法包含预处理步骤(借鉴纯文本diff算法的思路)
 *
 * 扩展：纯文本diff算法中，存在对两段文本进行预处理的过程，
 * 例如，diff之前先进行全等比较；如果全等，那么就不需要后续的diff处理了；
 * 对于内容相同的问题，经过预处理去掉两端文本相同的前缀内容和后缀内容，再进行diff
 * 
 * 快速diff算法在实测中性能最优，借鉴了文本diff的预处理思路，先处理新旧两组子节点中相同的前置节点和相同的后置节点。
 * 当前置节点和后置节点全部处理完毕后，如果无法简单地通过挂载新节点或者卸载已经不存在的节点来完成更新，则需要根据节点的索引关系，构造出一个最长递增子序列。
 * 最长递增子序列所指向的节点即为不需要移动的节点。
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
        { type: 'p', children: '1', key: 1 },
        { type: 'p', children: '4', key: 4 },
        { type: 'p', children: '2', key: 2 },
        { type: 'p', children: '3', key: 3 },
    ],
};

/**
 * 观察上面一组新旧节点，可以看到两组子节点具有相同的前置节点p-1,以及相同的后置节点p-2, p-3
 */

function patchKeyedChildren(n1, n2, container) {
    const newChildren = n2.children;
    const oldChildren = n1.children;

    /** 处理相同的前置节点，索引j指向新旧两组子节点的开头 */
    let j = 0;
    let oldVNode = oldChildren[j];
    let newVNode = newChildren[j];
    // while 循环向后遍历，直到遇到拥有不同key的值的节点位置
    while (oldVNode.key === newVNode.key) {
        patch(oldVNode, newVNode, container);
        j++;
        oldVNode = oldChildren[j];
        newVNode = newChildren[j];
    }

    /** 处理相同的后置节点 */
    let oldEnd = oldChildren.length - 1;
    let newEnd = newChildren.length - 1;
    oldVNode = oldChildren[oldEnd];
    newVNode = newChildren[newEnd];
    while (oldVNode.key === newVNode.key) {
        patch(oldVNode, newVNode, container);
        oldEnd--;
        newEnd--;
        oldVNode = oldChildren[oldEnd];
        newVNode = newChildren[newEnd];
    }

    /** 根据j, newEnd, oldEnd的关系：
     * oldEnd < j ： 说明在预处理过程中，所有旧子节点都已经处理完毕；
     * newEnd >= j : 说明在预处理后，新的一组子节点中，仍然有未被处理的节点，这些节点即新增节点;
     * 介于j和oldEnd之间的任何节点都应该被卸载。
     */
    if (j > oldEnd && j <= newEnd) {
        const anchorIndex = newEnd + 1;
        const anchor = anchorIndex < newChildren.length ? newChildren[anchorIndex].el : null;
        while (j <= newEnd) {
            patch(null, newChildren[j++], container, anchor);
        }
    } else if (j > newEnd && j <= oldEnd) {
        // 这部分节点应该被卸载
        while (j <= oldEnd) {
            unmount(oldChildren[j++]);
        }
    } else {
        // 当处理完相同的前置节点或者后置节点后，新旧两组子节点中不一定所有子节点都被处理完毕。<处理非理想情况，即经过预处理后，新旧两组节点均存在部分节点未经处理。>
        //
        /** 处理规则：
         * 1. 判断是否有节点需要移动，以及应该如何移动；
         * 2. 找出那些需要被添加或移除的节点。
         */
        // count：剩余节点未处理数
        // 构造 source 数组, 保留新的一组子节点中剩余未处理节点的数量
        // source数组将用来存储新的一组子节点中节点在旧的一组子节点中的位置索引，后面将会使用它计算出一个最长递增子序列，并用于辅助完成DOM移动的操作。
        const count = newEnd - j + 1;
        const source = new Array(count).fill(-1);

        const oldStart = j;
        const newStart = j;
        // 遍历旧的一组子节点, 嵌套遍历存在性能问题，时间复杂度太大，O(n^2)，优化为后面两个独立的for循环
        // for (let i = oldStart; i <= oldEnd; i++) {
        //     const oldVNode = oldChildren[i];
        //     for (let k = newStart; k <= newEnd; k++) {
        //         const newVNode = newChildren[k];
        //         if (oldVNode.key === newVNode.key) {
        //             patch(oldVNode, newVNode, container);
        //             // 数组的下标从0开始，但是未处理节点的索引未必是从0开始，用 k - newStart的值作为数组的索引值
        //             source[k - newStart] = i;
        //         }
        //     }
        // }

        let moved = false; // 是否需要移动节点，当moved变量为true,说明需要进行DOM移动操作。
        let pos = 0; // 代表遍历旧的一组子节点的过程中遇到的最大索引值k
        let patched = 0; // 代表更新过的节点数量

        const keyIndex = {};
        for (let i = newStart; i <= newEnd; i++) {
            keyIndex[newChildren[i].key] = i;
        }
        for (let i = oldStart; i <= oldEnd; i++) {
            oldVNode = oldChildren[i];
            // 已更新过的节点数量小于等于需要更新的节点数量，则执行更新
            if (patched <= count) {
                const k = keyIndex[oldVNode.key];
                // 如果能从keyIndex对象中获取到旧分组节点的key，说明该节点可复用，因为keyIndex保存的是新分组节点的{ key: index }对象
                if (typeof k !== 'undefined') {
                    newVNode = newChildren[k];
                    patch(oldVNode, newVNode, container);
                    patched++; // 每次更新一个节点，都将patched ++
                    source[k - newStart] = i; // 未处理的节点下标不一定是从 0开始，所以使用k-newstart作为下标
                    if (k < pos) {
                        moved = true;
                    } else {
                        pos = k;
                    }
                } else {
                    // 没找到
                    unmount(oldVNode);
                }
            } else {
                // 更新过的节点数量大于需要更新的节点数量，则执行卸载多余的节点
                unmount(oldVNode);
            }
        }

        if (moved) {
            // 进行DOM移动操作, 从source数组中找到最长递增子序列
            const seq = lis(source); // lis函数得到source数组的最长递增子序列

            /** 引入s,i； 完成节点的移动 */
            let s = seq.length - 1; // s指向最长递增序列的最后一个元素
            let i = count - 1; // i 新的一组子节点的最后一个元素
            for (i; i >= 0; i--) {
                if (source[i] === -1) {
                    // 说明是新节点，应该将其挂载
                    const pos = i + newStart;
                    const newVNode = newChildren[pos];

                    const nextPos = pos + 1;

                    const anchor = nextPos < newChildren.length ? newChildren[nextPos].el : null;
                    // 挂载
                    patch(null, newVNode, container, anchor);
                }
                if (i !== seq[s]) {
                    // 如果节点的索引i不等于seq[s]的值，说明该节点需要移动
                    const pos = i + newStart;
                    const newVNode = newChildren[pos];
                    const nextPos = pos + 1;

                    const anchor = nextPos < newChildren.length ? newChildren[nextPos].el : null;
                    // 移动
                    insert(null, newVNode, container, anchor);
                } else {
                    // i === seq[s]时，说明该位置的节点不需要移动
                    s--;
                }
            }
        }
    }
}
