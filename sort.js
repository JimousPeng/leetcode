/** js Array sort排序
 * 当数组长度小于等于10的时候，采用插入排序，大于10的时候，采用快排
 */

// 插入排序： a表示数组，from表示数组开始排序的位置下标，to表示数组长度
function InsertionSort(a, from, to) {
    for (var i = from + 1; i < to; i++) {
        var element = a[i]
        for (var j = i - 1; j >= from; j--) {
            var tmp = a[j]
            var order = comparefn(tmp, element)
            if (order > 0) {
                a[j + 1] = tmp
            } else {
                break
            }
        }
        a[j + 1] = element
    }
}

// 插入算法，就是将当前遍历的项，插入到之前的数组里面；将插入项跟之前的每一项通过compare函数比较，然后交换
function insert(array) {
    for (let i = 1; i < array.length; i++) {
        let insertItem = array[i]
        // 通过从i-1项遍历，j对应的就是要插入的坐标；
        // 首先如果order > 0，说明就是当前项插入，命中插入条件；此时array[j+1] = array[j]，即将之前j所在的项的下标，右依一位，接着继续j--
        // 如果下一轮满足条件，执行break；那么重置j的下标，即用j+1抵消上一轮for循环的j--，该下标就是要插入的坐标，将insertItem插入
        for (var j = i - 1; j >= 0; j--) {
            let tmp = array[j]
            let order = comparefn(tmp, insertItem)
            if (order > 0) {
                array[j + 1] = tmp
            } else {
                // 这里的break是跳出内层循环
                break
            }
        }
        array[j + 1] = insertItem
    }
}

let array = [2, 5, 2, 1, 3, 6]
// array.sort((a, b) => a - b)

function comparefn(a, b) {
    return b - a
}

insert(array)
console.log('====================================')
console.log(array)
console.log('====================================')
// console.log(array)

/**
 * 快速排序
 * 基本思想是:通过一趟排序将要排序的数据分割成独立的两部分，
 * 其中一部分的所有数据都比另外一部分的所有数据都要小，然后再按此方法对这两部分数据分别进行快速排序，
 * 整个排序过程可以递归进行，以此达到整个数据变成有序序列。
 */
function quickSort(arr) {
    if (arr.length < 1) return arr
    const pivotIndex = Math.floor(arr.length / 2)
    const pivot = arr.splice(pivotIndex, 1)[0]
    const left = []
    const right = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat([pivot], quickSort(right))
}

console.log(quickSort([1, 5, 9, 4, 3, 6]), 'quickSort([1, 5, 9, 4, 3, 6]), 快排')
