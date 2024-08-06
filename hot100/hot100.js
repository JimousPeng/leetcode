/**
 * 总结：
 * 1. 字符类型题目，一般可以优先考虑用hash表处理，既可以存下标，也可以存值的映射
 * 2. 空间换时间的思路运营，对于有时间复杂度限制的题目，可通过使用额外的对象来存储当前的遍历信息，减少遍历
 *  · 灵活运用数组，既可以记录位置信息，也可以处理前缀和，将数组当栈使用，依次存入数据
 *    比如在 [128. 最长连续序列 ] 中，利用hash表存当前序列的三个坐标，[左点位，当前点位， 右点位]
 * 3. 合理列用Set数据结构对数组遍历结果去重
 *
 * 细节处理：
 * 1. 不确定类型时，判断用 if(hash[key] !== undefined) 代替 if(hash[key]); 值可能为0, 或者空字符串''
 * 2. 哈希表可以用来做循环遍历中的剪枝操作，对于操作过的数如果需要跳过，可通过hash处理
 * 3. while循环记得更新终止条件，否则容易提交超时
 * 4. 将数组类型的值存入对象中时，通过Object.keys拿到的key是string类型，如果后续要进行计算操作，一定要做类型转换
 *
 */

/**
 * 1. 两数之和
 * 给定一个整数数组 nums 和一个整数目标值 target
 * 请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标
 * 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现
 * 你可以按任意顺序返回答案。
 * 输入：nums = [2,7,11,15], target = 9
 * 输出：[0,1]  因为 nums[0] + nums[1] == 9 ，返回 [0, 1]
 * @param {number[]} nums  2 <= nums.length <= 10^4
 * @param {number} target
 * @return {number[]}  只会存在一个有效答案
 */
var twoSum = function (nums, target) {
    const targetMap = {}
    const len = nums.length
    for (let i = 0; i < len; i++) {
        const num = nums[i]
        if (targetMap[num] !== undefined) {
            return [i, targetMap[num]]
        }
        targetMap[target - num] = i
    }
}

/**
 * 49. 字母异位词分组
 * 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表
 * 字母异位词 是由重新排列源单词的所有字母得到的一个新单词
 * 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
 * 输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
 *
 * 输入: strs = [""]  输出: [[""]]
 *
 * 输入: strs = ["a"] 输出: [["a"]]
 *
 * @param {string[]} strs  1 <= strs.length <= 10^4   0 <= strs[i].length <= 100
 * @return {string[][]}  strs[i] 仅包含小写字母
 */
var groupAnagrams = function (strs) {
    /**
     * 总结：
     * 需要解决的关键是如何在遍历的过程中，高效对比两次字母是否是异位词，并将相同的异位词存入同一个数组内
     * 有两种方式：
     * 1. 在遍历匹配字符串的过程中，构造一个hash对象，将compareS1:s1的字符串的每一项作为key保存，即hashMap[s1[i]] = s1[i]的数量
     *    之后遍历compareS2:s2过程中，遇到同名的key则计数--，最后统计是否所以的key的累计都被抵消了,即为0
     *    遍历过程中只要遇到一个不同的key，则说明非异位词。
     * 性能消耗：每次对于s1,s2都要进行遍历，非常费时
     *
     * 2. 将字符拆分成数组，在遍历匹配的过程中，将字符串拆分成数组，如'abc' -> ['a', 'b', 'c']; 'acb' -> ['a', 'c', 'b'];
     *    之后跟数组进行排序，那么['a', 'c', 'b']会被排序为['a', 'b', 'c'], 将整个数组作为hash表的key，并缓存对应原始数组在strs里
     *    的下标，所以第一次遍历，只记录字母异位词的下标，之后通过下标获取真实的str
     * 性能消耗：跳过了对s1,s2的遍历匹配，当时sort排序底层也是遍历，只不过减少了手动遍历的代码量，性能上有些许提升
     */
    // 方式1实现: compareStr 为字符串比较函数，最大时间复杂度是 O(n1:s1.length + n2:s2.length)
    function traverseMatch() {
        const len = strs.length
        if (len === 1) return [strs]
        const res = []
        const resMap = {} // 已归纳的字符处理
        function compareStr(s1, s2) {
            if (s1.length !== s2.length) return false
            // 构造当前字符的hash校验器
            const strLen = s1.length
            const strMap = {}
            for (let i = 0; i < strLen; i++) {
                const key = s1[i]
                if (strMap[key] !== undefined) {
                    strMap[key]++
                } else {
                    strMap[key] = 1
                }
            }
            for (let i = 0; i < strLen; i++) {
                const key = s2[i]
                if (strMap[key] === undefined) {
                    // 存在不一致的字符，直接return
                    return false
                } else {
                    strMap[key]--
                }
            }
            for (const key in strMap) {
                if (strMap[key] !== 0) return false
            }
            return true
        }
        for (let i = 0; i < len; i++) {
            const str = strs[i]
            if (resMap[str] !== undefined) continue // 剪枝
            let ret = [str]
            let dif = i + 1
            resMap[str] = true
            while (dif < len) {
                // 遍历后续字符进行hash验证
                const difStr = strs[dif]
                if (compareStr(str, difStr)) {
                    ret.push(difStr)
                    resMap[difStr] = true
                }
                dif++
            }
            res.push(ret)
        }
        return res
    }

    // 方式2实现：遍历存下标
    function useIndexKey() {
        const len = strs.length
        if (len === 1) return [strs]
        const resMap = {} // 已归纳的字符处理
        for (let i = 0; i < len; i++) {
            const str = strs[i].split('')
            str.sort()
            if (resMap[str] !== undefined) {
                resMap[str].push(i)
            } else {
                resMap[str] = [i]
            }
        }
        // 得到的 indexList 是一个下标集合列表，eg: [ [ 0, 1, 3 ], [ 2, 4 ], [ 5 ] ]
        const indexList = Object.keys(resMap).map((str) => resMap[str])
        return indexList.map((item) => {
            return item.map((i) => strs[i])
        })
    }

    // 方式2优化
    function useIndexKey() {
        const len = strs.length
        if (len === 1) return [strs]
        const strMap = new Map() // 已归纳的字符处理
        for (let str of strs) {
            const strList = Array.from(str)
            strList.sort()
            const key = strList.toString()
            const list = strMap.get(key) ? strMap.get(key) : []
            list.push(str)
            strMap.set(key, list)
        }
        // 得到的 indexList 是一个下标集合列表，eg: [ [ 0, 1, 3 ], [ 2, 4 ], [ 5 ] ]
        return Array.from(strMap.values())
    }
    return useIndexKey()
}

/**
 * 128. 最长连续序列
 * 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度
 *
 * 请你设计并实现时间复杂度为 O(n) 的算法解决此问题
 *
 * 输入：nums = [100,4,200,1,3,2]  输出：4 解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
 *
 * 输入：nums = [0,3,7,2,5,8,4,6,0,1]  输出：9
 * @param {number[]} nums  0 <= nums.length <= 10^5
 * @return {number}  -10^9 <= nums[i] <= 10^9  *存在负数
 */
var longestConsecutive = function (nums) {
    /**
     * 这题的关键是时间复杂度需要在 O(n)，也就是一次遍历找出最长序列的长度
     * 方法1：
     * 首先无法使用sort排序，这样时间复杂度一定大于 O(n)，那么转换问题就是：
     * 1. 需要在只用一次排序的前提下，找到当前下标所处序列的长度
     * · 每次遍历，都要记住当前值的位置信息，包括是否有前后节点
     * · 如果记住当前值的位置信息，转换思路 -> 空间换时间
     * 2. 与最长序列的锚点进行对比，更新最长的序列锚点
     *
     * 方法2：
     * 1. 利用Set去重，保存每一个数据
     * 2. set遍历过程中，只从每个序列段的开头进行遍历，计算每一个序列段的长度
     *
     */
    // 方法1：记录位置，然后前后累加
    function keepPosition() {
        const len = nums.length
        // 先剪枝
        if (len <= 1) return len
        // 空间换时间，额外的对象存储节点信息
        const posMap = {}
        // 更新节点位置信息，posMap[num][0]-前置节点，posMap[num][1]-当前节点，posMap[num][2]-后置节点
        // 每一个节点的值为0-不存在 1-存在
        const updatePos = (num) => {
            // num 为当前遍历节点
            if (posMap[num]) {
                posMap[num][1] = 1
            } else {
                posMap[num] = [0, 1, 0]
            }
            if (posMap[num - 1]) {
                // 更新前置节点的后置节点信息
                posMap[num - 1][2] = 1
            } else {
                // 前置节点初始化
                posMap[num - 1] = [0, 0, 1]
            }
            if (posMap[num + 1]) {
                posMap[num + 1][0] = 1
            } else {
                // 后置节点初始化
                posMap[num + 1] = [1, 0, 0]
            }
        }
        for (let i = 0; i < len; i++) {
            const num = nums[i]
            updatePos(num)
        }
        // 最长连续序列锚点 res
        let res = 1
        // 过滤已经遍历过的对象
        const useNum = {}
        // 遍历节点对象，计算每个值所处的连续序列长度 - for···in 循环无法跳出，所以不使用for···in
        const numList = Object.keys(posMap)
        const numLen = numList.length

        for (let i = 0; i < numLen; i++) {
            // numList[i]是字符类型-posMap的key，不做类型转换，后面 num + 1 会有类型转换影响'1' + 1 = '11'
            const num = Number(numList[i])
            // 已经遍历过或者在原始nums列表中不存在的数 - 跳过
            if (useNum[num] || !posMap[num][1]) continue
            useNum[num] = true
            let count = 1
            // 统计前置节点
            let prevNum = num - 1
            while (posMap[prevNum] && posMap[prevNum][1]) {
                count++
                useNum[prevNum] = true
                if (!posMap[prevNum][0]) break
                prevNum--
            }
            // 统计后置节点
            let nextNum = num + 1
            while (posMap[nextNum] && posMap[nextNum][1]) {
                count++
                useNum[nextNum] = true
                if (!posMap[nextNum][2]) break
                nextNum++
            }
            res = Math.max(res, count)
        }
        return res
    }

    // 方法2：利用Set数据结构去重，然后从每一个序列段的开头开始类型
    function keepStart() {
        const len = nums.length
        // 先剪枝
        if (len <= 1) return len
        const numSet = new Set()
        for (const num of nums) {
            numSet.add(num)
        }
        let res = 1
        for (const num of numSet) {
            if (!numSet.has(num - 1)) {
                // 没有num-1,说明当前序列段是以 num 开头
                let count = 1
                let nextNum = num + 1
                while (numSet.has(nextNum)) {
                    count++
                    nextNum++
                }
                res = Math.max(res, count)
            }
        }
        return res
    }
    return keepStart()
}

/**
 * 283. 移动零
 * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序
 * 请注意 ，必须在不复制数组的情况下原地对数组进行操作
 * 输入: nums = [0,1,0,3,12] 输出: [1,3,12,0,0]
 * @param {number[]} nums  1 <= nums.length <= 10^4
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
    // 必须在不复制数组的情况下原地对数组进行操作
    // 保持非零元素的相对顺序

    // 移位法, 在遍历过程中，把非0的数往前填充，填充到最后一个非0的节点，那么后续的节点开始知道最后一个元素填充0
    function setPos() {
        const len = nums.length
        let index = 0
        let setNum = 0
        while (index < len) {
            if (nums[index] !== 0) {
                nums[setNum] = nums[index]
                setNum++
            }
            index++
        }
        while (setNum < len) {
            nums[setNum] = 0
            setNum++
        }
    }

    // 一次遍历
    function setPosOptimize() {
        const len = nums.length
        let setNum = 0
        for (let i = 0; i < len; i++) {
            if (nums[i] !== 0) {
                const temp = nums[i]
                nums[i] = nums[setNum]
                nums[setNum++] = temp
            }
        }
    }

    // 试试双指针
    function twoPoint() {
        const len = nums.length
        if (len < 2) return
        let zeroPos = 0
        // 找到第一个0的下标
        while (nums[zeroPos] !== 0 && zeroPos < len) {
            zeroPos++
        }
        if (zeroPos === len) return // 说明没有0存在
        // 避免 zeroPos 为 0
        let left = zeroPos,
            right = zeroPos + 1
        while (right < len) {
            if (nums[right] !== 0) {
                nums[left] = nums[right]
                nums[right] = 0
                left++
            }
            right++
        }
    }
    return setPos()
}

/**
 * 11. 盛最多水的容器
 * 给定一个长度为 n 的整数数组 height,有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i])
 * 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水
 * 返回容器可以储存的最大水量; 说明：你不能倾斜容器
 *
 * 输入：[1,8,6,2,5,4,8,3,7]  输出：49; 容纳的最大宽高为 7 x 7 = 49 参考 './question_11.jpg'
 *
 * 输入：height = [1,1] 输出：1
 * @param {number[]} height  2 <= height.length <= 10^5    0 <= height[i] <= 10^4
 * @return {number}
 */
var maxArea = function (height) {
    /**
     * 容器的水量 = 容器的h * 容器的w
     * Math.min(height[left], height[right]) * (right - left)
     */
    const len = height.length
    if (len === 2) return Math.min(height[0], height[1])

    let left = 0,
        right = len - 1,
        res = 0
    while (left < right) {
        const volumn = Math.min(height[left], height[right]) * (right - left)
        res = Math.max(res, volumn)
        // 每次移动短边
        // 因为每次移动意味着width减少，那么用高度来弥补移动带来的损失，
        // 才有可能找到比当前更大的容量的可能性
        if (height[left] > height[right]) {
            right--
        } else {
            left++
        }
    }
    return res
}
