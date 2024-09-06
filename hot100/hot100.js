/**
 * 总结：
 * 1. 字符类型题目，一般可以优先考虑用hash表处理，既可以存下标，也可以存值的映射
 * 2. 空间换时间的思路运营，对于有时间复杂度限制的题目，可通过使用额外的对象来存储当前的遍历信息，减少遍历
 *  · 灵活运用数组，既可以记录位置信息，也可以处理前缀和，将数组当栈使用，依次存入数据
 *    比如在 [128. 最长连续序列 ] 中，利用hash表存当前序列的三个坐标，[左点位，当前点位， 右点位]
 * 3. 合理列用Set数据结构对数组遍历结果去重
 *
 * 滑动窗口：
 * 算法开始时，两个指针通常都指向数据结构的起始位置；然后，右指针right不断向右移动，扩大窗口，直到满足某个特定条件。
 * 一旦满足条件，左指针left可能会移动，缩小窗口，直到再次满足另一条件或窗口达到合适的大小。
 * 这个过程会一直重复，直到右指针right达到数据结构的末尾
 *
 * 细节处理：
 * 1. 不确定类型时，判断用 if(hash[key] !== undefined) 代替 if(hash[key]); 值可能为0, 或者空字符串''
 * 2. 哈希表可以用来做循环遍历中的剪枝操作，对于操作过的数如果需要跳过，可通过hash处理
 * 3. while循环记得更新终止条件，否则容易提交超时
 * 4. 将数组类型的值存入对象中时，通过Object.keys拿到的key是string类型，如果后续要进行计算操作，一定要做类型转换
 * 5. 数组边界处理时，要小心数字类型存在0时会隐式转换为false, 所以用 !== undefined 替换
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

/**
 * 15. 三数之和
 * @param {number[]} nums  3 <= nums.length <= 3000
 * @return {number[][]}
 */
var threeSum = function (nums) {
    /**
     * 整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0
     * 返回所有和为 0 且不重复的三元组
     *
     * 输入：nums = [-1,0,1,2,-1,-4] 输出：[[-1,-1,2],[-1,0,1]]
     * 注意，输出的顺序和三元组的顺序并不重要。
     *
     * 输入：nums = [0,0,0] 输出：[[0,0,0]]
     */

    /** 思路
     * 三数之和的需求是从数组中找出不重复的三数之和为目标值的集合
     * 三数之和的底层逻辑可以转化为两数之和
     * 要注意的是处理去重，一个是外层对target的去重，一个是对两数之和求值的去重
     * 当然，判断边界的是要注意0会隐式转换为false，所以需要用undefined处理
     */
    nums.sort((a, b) => a - b)
    const len = nums.length
    const res = []
    for (let i = 0; i < len; i++) {
        // targe也需要去重
        if (i > 0 && nums[i] === nums[i - 1]) continue
        // 两数之和的target为 -nums[i]，则保证 target + nums[i] = 0
        const target = -nums[i]
        let left = i + 1,
            right = len - 1
        while (left < right) {
            const sum = nums[left] + nums[right]
            if (sum > target) {
                right--
            } else if (sum === target) {
                res.push([nums[i], nums[left], nums[right]])
                // 要处理去重
                while (nums[left + 1] !== undefined && nums[left + 1] === nums[left]) {
                    left++
                }
                while (nums[right - 1] !== undefined && nums[right - 1] === nums[right]) {
                    right--
                }
                left++
                right--
            } else {
                left++
            }
        }
    }
    return res
}

/**
 * 3. 无重复字符的最长子串
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长 子串 的长度
 * @param {string} s  0 <= s.length <= 5 * 10^4
 * @return {number}  s 由英文字母、数字、符号和空格组成
 */
var lengthOfLongestSubstring = function (s) {
    // 示例 1:
    // 输入: s = "abcabcbb"
    // 输出: 3
    // 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
    // 示例 2:
    // 输入: s = "bbbbb"
    // 输出: 1
    // 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
    // 示例 3:
    // 输入: s = "pwwkew"
    // 输出: 3
    // 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
    //      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

    // 思路：遍历字符的每一个单位，往两边构建新的无重复字符，并统计新字符长度，然后更新构建后的最大字符长度
    function generateStr() {
        const len = s.length
        if (!s) return 0
        let max = 0
        for (let i = 0; i < len; i++) {
            const str = s[i]
            let prev = i - 1
            let next = i + 1
            let count = 1
            let strSet = new Set()
            strSet.add(str)
            // 往前构建
            while (prev >= 0 && !strSet.has(s[prev])) {
                strSet.add(s[prev])
                count++
                prev--
            }
            // 向后构建
            while (next < len && !strSet.has(s[next])) {
                strSet.add(s[next])
                count++
                next++
            }
            if (count > max) {
                max = count
            }
        }
        return max
    }

    // 滑动窗口
    function slideWindow() {
        let res = 0
        const len = s.length
        const strSet = new Set()
        if (!s) return 0
        for (let left = 0, right = 0; right < len; right++) {
            // 每轮右端点往右加
            const str = s[right]
            while (strSet.has(str)) {
                // 缩小左窗口，直达当前右节点无重复字符
                strSet.delete(s[left])
                left++
            }
            strSet.add(str)
            res = Math.max(res, right - left + 1)
        }
        return res
    }

    return generateStr()
}

/**
 * 438. 找到字符串中所有字母异位词
 * @param {string} s  1 <= s.length, p.length <= 3 * 10^4
 * @param {string} p  s 和 p 仅包含小写字母
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
    //     给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序
    //     异位词 指由相同字母重排列形成的字符串（包括相同的字符串）
    // 示例 1:
    // 输入: s = "cbaebabacd", p = "abc"
    // 输出: [0,6]
    // 解释:
    // 起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
    // 起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。
    //  示例 2:
    // 输入: s = "abab", p = "ab"
    // 输出: [0,1,2]
    // 解释:
    // 起始索引等于 0 的子串是 "ab", 它是 "ab" 的异位词。
    // 起始索引等于 1 的子串是 "ba", 它是 "ab" 的异位词。
    // 起始索引等于 2 的子串是 "ab", 它是 "ab" 的异位词。

    // 滑动窗口实现 - 会超时
    // 当p和s的字符长度很大，如果避免超时呢
    function slideWindow() {
        let res = []
        const strlen = p.length
        const baseStr = p.split('').sort().join('')
        const len = s.length
        let strStack = []
        for (let left = 0, right = 0; right < len; right++) {
            strStack.push(s[right])
            if (strStack.length === strlen) {
                // 这里的排序会影响后面的 shift
                const sortList = strStack.slice(0)
                const curStr = sortList.sort().join('')
                if (curStr === baseStr) {
                    res.push(left)
                }
                strStack.shift()
                left++
            }
        }
        return res
    }

    /** 使用asii码的码点来处理字母对应的位置
     * 'a'.charCodeAt() -> 97
     * 'b'.charCodeAt() -> 98
     * ...
     * 'z'.charCodeAt() -> 122
     */
    function slideWindowUseAsii() {
        const sLen = s.length,
            pLen = p.length

        if (sLen < pLen) {
            return []
        }

        const ans = []
        const sCount = new Array(26).fill(0)
        const pCount = new Array(26).fill(0)
        for (let i = 0; i < pLen; ++i) {
            ++sCount[s[i].charCodeAt() - 'a'.charCodeAt()]
            ++pCount[p[i].charCodeAt() - 'a'.charCodeAt()]
        }

        if (sCount.toString() === pCount.toString()) {
            ans.push(0)
        }

        // 找到 s 中所有 p 的 异位词 的子串
        for (let i = 0; i < sLen - pLen; ++i) {
            // 移动 sCount, 保持长度在 pLen 的范围内，最大移位距离为 sLen - pLen
            --sCount[s[i].charCodeAt() - 'a'.charCodeAt()]
            ++sCount[s[i + pLen].charCodeAt() - 'a'.charCodeAt()]

            if (sCount.toString() === pCount.toString()) {
                ans.push(i + 1)
            }
        }

        return ans
    }

    /** hash表处理，也是利用消消乐的方式 */
    function useHash() {
        let res = []

        /** 先处理字符p */
        const pLen = p.length
        const pMap = {} // 字符p的hash表
        for (let str of p) {
            if (pMap[str] !== undefined) {
                pMap[str]++
            } else {
                pMap[str] = 1
            }
        }

        // 接着处理字符s
        let sMap = {} // 字符s的hash表
        const sLen = s.length

        // 对比两个hash数据
        function compareMap() {
            for (const str in pMap) {
                if (sMap[str] != pMap[str]) {
                    return false
                }
            }
            return true
        }

        function updateNum(str) {
            if (sMap[str]) {
                sMap[str]++
            } else {
                sMap[str] = 1
            }
        }

        function delNum(str) {
            sMap[str]--
            if (sMap[str] === 0) {
                delete sMap[str]
            }
        }

        for (let left = 0, right = 0; right < sLen; right++) {
            /**
             * 需要重置的场景：
             * 1. 遇到不在 pStr 中的字符
             */
            const str = s[right]
            if (pMap[str] === undefined) {
                left = right + 1
                sMap = {}
                continue
            }
            updateNum(str)
            if (right - left + 1 < pLen) continue
            if (compareMap()) {
                res.push(left)
            }
            delNum(s[left])
            left++
        }
        return res
    }
    return useHash()
}

/**
 * 560. 和为 K 的子数组
 * @param {number[]} nums  1 <= nums.length <= 2 * 10^4  -1000 <= nums[i] <= 1000
 * @param {number} k    -10^7 <= k <= 10^7
 * @return {number}
 */
var subarraySum = function (nums, k) {
    //     给你一个整数数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的子数组的个数
    //     子数组是数组中元素的连续非空序列
    // 示例 1：
    // 输入：nums = [1,1,1], k = 2
    // 输出：2
    // 示例 2：
    // 输入：nums = [1,2,3], k = 3
    // 输出：2

    /** 计算和为target的子数组个数： 子数组是数组中元素的*连续非空*序列，数组是无序的 */

    /** 滑动窗口：会丢失结果，因为是无序的，窗口的移动路径不可预测 */
    function slideWindow() {
        const len = nums.length
        // 因为1 <= nums.length
        if (len === 1) return Number(nums[0] == k)
        let res = 0
        let sum = nums[0]
        for (let left = 0, right = 1; right < len; right++) {
            sum += nums[right]
            /** 这样会丢掉负数， 如： nums = [-1,-1,1]   k = 0, 一致累加到 -1+-1+1 = -1, 始终不会等于0
             * 而且数组是乱序，滑动窗口其实不太适合
             */
            while (sum > k) {
                sum -= nums[left]
                left++
            }
            if (sum === k) {
                res++
            }
        }
        return res
    }

    /** 双指针：指针如何移动确保子数组不会算漏 */
    function twoPointer() {
        const len = nums.length
        let total = nums.reduce((total, item) => {
            total += item
            return total
        }, 0)
        let res = 0
        if (total === k) {
            res++
        }
        let left = 0,
            right = len - 1
        while (left < right) {
            if (total > k) {
            }
        }
        return res
    }

    /** 嵌套遍历 - 会超时 */
    function crossTwo() {
        const len = nums.length
        let res = 0
        for (let i = 0; i < len; i++) {
            const num = nums[i]
            if (num === k) {
                res++
            }
            let count = num
            let move = i + 1
            while (move < len) {
                count += nums[move]
                if (count === k) {
                    res++
                }
            }
        }
        return res
    }

    /** 深度遍历 + dp 多维数组 */
    function dfs() {
        const dp = []
        const len = nums.length
        let res = []

        for (let i = 0; i < len; i++) {
            const num = nums[i]
            if (num === k) res++
            if (dp.length) {
                for (let j = 0; j < dp.length; j++) {
                    dp[j] += num
                    if (dp[j] === k) res++
                }
            }
            dp.push(num)
        }

        return res
    }

    /** 前缀和：
     * 对于连续区间[i,j]内的子数组，满足nums[i, j] = k
     * 则满足：nums[0, j] - nums[0, i] = k
     */
    function prefixSum() {
        let res = 0
        const sum = []
        sum[0] = nums[0]
        const len = nums.length
        for (let i = 1; i < len; i++) {
            sum[i] = sum[i - 1] + nums[i]
        }
        // [1,2,3] k = 3    [1,2,3] -> [1,3,6]
        // 有了前缀和列表，就变成了求两数之差
        const numMap = new Map()
        for (let i = 0; i < len; i++) {
            if (sum[i] === k) {
                res++
                continue
            }
            if (numMap.has(sum[i])) {
                res += numMap.get(sum[i])
            }
            const count = numMap.get(sum[i] + k)
            if (count) {
                numMap.set(sum[i] + k, count + 1)
            } else {
                numMap.set(sum[i] + k, 1)
            }
        }
        return res
    }

    /** 前缀和优化 - 合并遍历 */
    function prefixSumOpt() {
        let res = 0
        let sum = 0
        const numMap = new Map()

        numMap.set(0, 1) // 来标识 sum - k = 0, 即 sum = k 时的计数

        const len = nums.length
        for (let i = 0; i < len; i++) {
            sum += nums[i]
            if (numMap.has(sum - k)) {
                res += numMap.get(sum - k)
            }
            if (numMap.has(sum)) {
                numMap.set(sum, numMap.get(sum) + 1)
            } else {
                numMap.set(sum, 1)
            }
        }
        return res
    }

    /** 枚举遍历：会超时 */
    function useEnum() {
        let count = 0
        for (let start = 0; start < nums.length; ++start) {
            let sum = 0
            for (let end = start; end >= 0; --end) {
                sum += nums[end]
                if (sum == k) {
                    count++
                }
            }
        }
        return count
    }

    return slideWindow()
}

/**
 * 53. 最大子数组和
 * @param {number[]} nums 1 <= nums.length <= 10^5
 * @return {number}  -10^4 <= nums[i] <= 10^4
 */
var maxSubArray = function (nums) {
    // 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和
    // 子数组是数组中的一个连续部分
    //     示例 1：
    // 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
    // 输出：6
    // 解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
    // 示例 2：
    // 输入：nums = [1]
    // 输出：1
    // 示例 3：
    // 输入：nums = [5,4,-1,7,8]
    // 输出：23

    function cross() {
        const len = nums.length
        if (len === 1) return nums[0]

        let sum = nums[0],
            max = -Infinity
        for (let i = 1; i < len; i++) {
            /** 每当sum往小变更时，更新一下max */
            if (sum + num < sum) {
                max = Math.max(sum, max)
            }
            const num = nums[i]
            if (num > sum + num) {
                sum = num
            } else {
                sum += num
            }
        }
        return Math.max(sum, max)
    }

    /** 动态规划 */
    function useDynamic() {
        // dp[i] 表示 i 时的最大子数组和
        const dp = []
        dp[0] = nums[0]
        let max = nums[0]
        const len = nums.length
        for (let i = 1; i < len; i++) {
            dp[i] = Math.max(dp[i - 1] + nums[i], nums[i])
            max = Math.max(max, dp[i])
        }
        return max
    }

    /** 动态规划 */
    function useDynamicOptimize() {
        let pre = 0
        let max = nums[0]
        for (let num of nums) {
            pre = Math.max(pre + num, num)
            max = Math.max(max, pre)
        }
        return max
    }
}

/**
 * 合并区间
 * @param {number[][]} intervals 1 <= intervals.length <= 10^4  intervals[i].length == 2
 * @return {number[][]}  0 <= starti <= endi <= 10^4
 */
var merge = function (intervals) {
    // 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi]
    // 请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。
    //     示例 1：
    // 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
    // 输出：[[1,6],[8,10],[15,18]]
    // 解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
    // 示例 2：
    // 输入：intervals = [[1,4],[4,5]]
    // 输出：[[1,5]]
    // 解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。

    /**
     * 对于区间 int[0, 1] 与 int2[0, 1], 满足 int[1] >= int2[0]， 则存在合并区间
     *
     * [[1,4],[0,4]]
     */
    function cross() {
        intervals.sort((a, b) => a[0] - b[0])
        const len = intervals.length
        if (len === 1) return intervals
        let acGap = intervals[0]
        const res = []
        for (let i = 1; i < len; i++) {
            if (acGap[1] >= intervals[i][0]) {
                acGap[0] = Math.min(acGap[0], intervals[i][0])
                acGap[1] = Math.max(acGap[1], intervals[i][1])
            } else {
                // 说明不存在并集
                res.push([...acGap])
                acGap = intervals[i]
            }
        }
        res.push([...acGap])
        return res
    }
}

/**
 * 189. 轮转数组
 * @param {number[]} nums  1 <= nums.length <= 10^5  -2^31 <= nums[i] <= 2^31 - 1
 * @param {number} k  0 <= k <= 10^5
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
    // 给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负数
    //     示例 1:
    // 输入: nums = [1,2,3,4,5,6,7], k = 3
    // 输出: [5,6,7,1,2,3,4]
    // 解释:
    // 向右轮转 1 步: [7,1,2,3,4,5,6]
    // 向右轮转 2 步: [6,7,1,2,3,4,5]
    // 向右轮转 3 步: [5,6,7,1,2,3,4]
    // 示例 2:
    // 输入：nums = [-1,-100,3,99], k = 2
    // 输出：[3,99,-1,-100]
    // 解释:
    // 向右轮转 1 步: [99,-1,-100,3]
    // 向右轮转 2 步: [3,99,-1,-100]

    // 你可以使用空间复杂度为 O(1) 的 原地 算法解决这个问题吗？
    function cross() {
        /** 在经过轮转之后的新下标为 (i + k) % nums.length */
        const len = nums.length
        // 用一个额外空间储存新下标的值 O(n)
        const res = []
        for (let i = 0; i < len; i++) {
            // [1,2,3,4,5,6,7] -> [1,2,3,1,2,3,1]
            const newPos = (i + k) % len
            res[newPos] = nums[i]
        }
        for (let i = 0; i < len; i++) {
            nums[i] = res[i]
        }
    }

    // 空间复杂度为 O(1)
    function crossOptimize() {
        // gcd 求最大公约数函数 gcd(3,7) = 1
        const gcd = (x, y) => (y ? gcd(y, x % y) : x)
        const n = nums.length
        k = k % n
        let count = gcd(k, n)
        for (let start = 0; start < count; ++start) {
            let current = start
            let prev = nums[start]
            // [1,2,3,4,5,6,7]  k = 3
            /**
             * current: 当前移动的节点下标  prev:当前节点对应的原始节点的值
             * current = 0, start = 0, prev=1
             * 第1轮:  next = (0+3) % 7 = 3
             * nums[next] -> nums[3] = prev <- prev = 1
             * nums -> [1,2,3,1,5,6,7]
             * prev = 4;  current = 3
             *
             * 第2轮：移动之前节点nums[current]到新节点： next=(3+3) % 7 = 6
             * nums[next] -> nums[6] = prev <- prev = 4
             * nums -> [1,2,3,1,5,6,4]
             * prev = 7;  current = 6
             *
             * 第3轮：移动之前节点nums[current]到新节点： next=(6+3) % 7 = 2
             * nums[next] -> nums[2] = prev <- prev = 7
             * nums -> [1,2,7,1,5,6,4]
             * prev = 3;  current = 2
             *
             * 第4轮：移动之前节点nums[current]到新节点： next=(2+3) % 7 = 5
             * nums[next] -> nums[5] = prev <- prev = 3
             * nums -> [1,2,7,1,5,3,4]
             * prev = 6;  current = 5
             *
             * 第5轮：移动之前节点nums[current]到新节点： next=(5+3) % 7 = 1
             * nums[next] -> nums[1] = prev <- prev = 6
             * nums -> [1,6,7,1,5,3,4]
             * prev = 2;  current = 1
             *
             * 第6轮：移动之前节点nums[current]到新节点： next=(1+3) % 7 = 4
             * nums[next] -> nums[4] = prev <- prev = 2
             * nums -> [1,6,7,1,2,3,4]
             * prev = 5;  current = 4
             *
             * 第6轮：移动之前节点nums[current]到新节点： next=(4+3) % 7 = 0
             * nums[next] -> nums[0] = prev <- prev = 5
             * nums -> [5,6,7,1,2,3,4]
             * prev = 1;  current = 0
             *
             * current === start 跳出循环
             *
             */
            do {
                // next：移动到的新位置
                const next = (current + k) % n
                const temp = nums[next]
                nums[next] = prev
                prev = temp
                current = next
            } while (start !== current)
        }
    }

    // 空间复杂度为 O(1)
    // 最大公约数的数学推导不好理解
    // 使用单独的变量 count 跟踪当前已经访问的元素数量，当 count=n 时，结束遍历过程
    function crossOptimize() {
        // gcd 求最大公约数函数 gcd(3,7) = 1
        const n = nums.length
        k = k % n
        let start = 0
        let count = 0 // 统计已经访问过的num
        while (count !== n) {
            let current = start
            let prev = nums[start]
            do {
                // next：移动到的新位置
                const next = (current + k) % n
                const temp = nums[next]
                nums[next] = prev
                prev = temp
                current = next
                count++
            } while (start !== current)
            start++
        }
    }

    /** 数组翻转
     * nums = [1,2,3,4,5,6,7], k = 3  ->   [5,6,7,1,2,3,4]
     */
    function reverseArray() {
        // start和end是左闭右闭区间
        const reverseFn = (start, end) => {
            while (start < end) {
                const temp = nums[start]
                nums[start] = nums[end]
                nums[end] = temp
                start++
                end--
            }
        }
        const len = nums.length
        const useK = k % len
        // 第一轮翻转 [1,2,3,4,5,6,7] -> [7,6,5,4,3,2,1]
        reverseFn(0, len - 1)
        // 第二轮翻转: k=3 [7,6,5,4,3,2,1] -> [5,6,7,4,3,2,1]
        reverseFn(0, useK - 1)
        // 第三轮翻转  [5,6,7,4,3,2,1] -> [5,6,7,1,2,3,4]
        reverseFn(useK, len - 1)
    }

    reverseArray()
}

/**
 * 238. 除自身以外数组的乘积
 * @param {number[]} nums  2 <= nums.length <= 10^5  -30 <= nums[i] <= 30
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
    // 给你一个整数数组 nums，返回 数组 answer
    // 其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积
    // 请 不要使用除法，且在 O(n) 时间复杂度内完成此题。
    //     示例 1:
    // 输入: nums = [1,2,3,4]
    // 输出: [24,12,8,6]
    // 示例 2:
    // 输入: nums = [-1,1,0,-3,3]
    // 输出: [0,0,9,0,0]
    // 进阶：你可以在 O(1) 的额外空间复杂度内完成这个题目吗？
    // （ 出于对空间复杂度分析的目的，输出数组 不被视为 额外空间。）

    /** 不能使用除法，嵌套遍历估计会超时
     * 有一个笨方法，记录每一个节点的左乘积和右乘积，即 nums[i].left = nums[0] * ··· * nums[i - 1]  nums[i].right = nums[len-1] * ··· * nums[i+1]
     * 那么对于 nums[i], res[i] = nums[i].left * nums[i].right
     * 结合前缀和的思想，构造左右前缀乘积
     *
     * 由于使用了两个数组保存两个乘积列表，所以空间复杂度并不为常数
     */
    function prefixProduct() {
        const len = nums.length
        // prefixLeft 左节点的前缀乘积和
        const prefixLeft = [1]
        // prefixRight 右节点的前缀乘积和, 并初始化最末端节点
        const prefixRight = []
        prefixRight[len - 1] = 1
        for (let i = 1; i < len; i++) {
            // [1,2,3] -> [1, 1, 2]
            prefixLeft[i] = prefixLeft[i - 1] * nums[i - 1]
        }
        for (let i = len - 2; i >= 0; i--) {
            // [1,2,3] -> []
            prefixRight[i] = prefixRight[i + 1] * nums[i + 1]
        }
        const res = []
        for (let i = 0; i < len; i++) {
            res[i] = prefixLeft[i] * prefixRight[i]
        }
        return res
    }

    // 空间复杂优化  输出数组 res 不被视为 额外空间
    function prefixProductOptimize() {
        const len = nums.length
        const res = [1]
        /** 先计算左前缀乘积和 */
        for (let i = 1; i < len; i++) {
            res[i] = res[i - 1] * nums[i - 1]
        }
        let count = 1 // O(1)的常量空间
        for (let i = len - 1; i >= 0; i--) {
            res[i] = res[i] * count
            count = count * nums[i + 1]
        }
        return res
    }

    prefixProduct()
}

/**
 * 73. 矩阵置零
 * @param {number[][]} matrix
 * m == matrix.length  n == matrix[0].length 1 <= m, n <= 200
 *  -2^31 <= matrix[i][j] <= 2^31 - 1
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
    // 给定一个 m x n 的矩阵，如果一个元素为 0 ，则将其所在行和列的所有元素都设为 0 。请使用 原地 算法
    //     输入：matrix = [[1,1,1],[1,0,1],[1,1,1]]
    // 1  1  1      1 0 1
    // 1  0  1  =>  0 0 0
    // 1  1  1      1 0 1
    // 输出：[[1,0,1],[0,0,0],[1,0,1]]

    //     输入：matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
    //  0 1 2 0
    //  3 4 5 2
    //  1 3 1 5
    // 输出：[[0,0,0,0],[0,4,5,0],[0,3,1,0]]

    /** 遍历思路：
     * 1. 一次遍历找出所有含0的元素对应的 row 和 column
     * 2. 遍历所有的row 和 col，并更新对应元素的值
     */
    function cross() {
        // 找到所有的0
        const rowSet = new Set()
        const colSet = new Set()
        const rowLen = matrix.length
        const colLen = matrix[0].length
        for (let i = 0; i < rowLen; i++) {
            for (let j = 0; j < colLen; j++) {
                if (matrix[i][j] === 0) {
                    rowSet.add(i)
                    colSet.add(j)
                }
            }
        }
        for (const row of rowSet) {
            let start = 0
            while (start < colLen) {
                matrix[row][start] = 0
                start++
            }
        }
        for (const col of colSet) {
            let start = 0
            while (start < rowLen) {
                matrix[start][col] = 0
                start++
            }
        }
    }

    /**
     * 进阶：
     * 一个直观的解决方案是使用  O(mn) 的额外空间，但这并不是一个好的解决方案。
     * 一个简单的改进方案是使用 O(m + n) 的额外空间，但这仍然不是最好的解决方案。
     * 你能想出一个仅使用常量空间的解决方案吗？
     */

    /** 空间优化： 时间换空间 */
    function crossOptimize() {
        const rowLen = matrix.length
        const colLen = matrix[0].length
        for (let i = 0; i < rowLen; i++) {
            for (let j = 0; j < colLen; j++) {
                if (matrix[i][j] === 0) {
                    let start = 0
                    while (start < rowLen) {
                        if (matrix[start][j] !== 0) {
                            matrix[start][j] = 'x'
                        }
                        start++
                    }
                    start = 0
                    while (start < colLen) {
                        if (matrix[i][start] !== 0) {
                            matrix[i][start] = 'x'
                        }
                        start++
                    }
                }
            }
        }
        for (let i = 0; i < rowLen; i++) {
            for (let j = 0; j < colLen; j++) {
                if (matrix[i][j] === 'x') {
                    matrix[i][j] = 0
                }
            }
        }
    }

    function guanfang() {
        // 首先预处理出两个标记变量，接着使用其他行与列去处理第一行与第一列，
        // 然后反过来使用第一行与第一列去更新其他行与列，
        // 最后使用两个标记变量更新第一行与第一列即可。
        const m = matrix.length,
            n = matrix[0].length
        let flagCol0 = false,
            flagRow0 = false
        for (let i = 0; i < m; i++) {
            if (matrix[i][0] === 0) {
                flagCol0 = true
            }
        }
        for (let j = 0; j < n; j++) {
            if (matrix[0][j] === 0) {
                flagRow0 = true
            }
        }
        for (let i = 1; i < m; i++) {
            for (let j = 1; j < n; j++) {
                if (matrix[i][j] === 0) {
                    matrix[i][0] = matrix[0][j] = 0
                }
            }
        }
        for (let i = 1; i < m; i++) {
            for (let j = 1; j < n; j++) {
                if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                    matrix[i][j] = 0
                }
            }
        }
        if (flagCol0) {
            for (let i = 0; i < m; i++) {
                matrix[i][0] = 0
            }
        }
        if (flagRow0) {
            for (let j = 0; j < n; j++) {
                matrix[0][j] = 0
            }
        }
    }
}

/**
 * 54. 螺旋矩阵
 * @param {number[][]} matrix  m == matrix.length   n == matrix[i].length
 * @return {number[]}          1 <= m, n <= 10    -100 <= matrix[i][j] <= 100
 */
var spiralOrder = function (matrix) {
    /**
     * 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素
     * 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
     * 1  2  3        1 -> 2 -> 3
     *                          ↓
     * 4  5  6 ---->  4 -> 5 -> 6
     *                ↑         ↓
     * 7  8  9        7 <- 8 <- 9
     *
     * 10 11 12
     * 输出：[1,2,3,6,9,8,7,4,5]
     *
     * 输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
     * 1    2    3    4
     *
     * 5    6    7    8
     *
     * 9   10   11   12
     *
     * 13  14   15    16
     * 17  18   19    20
     * 21  22   23    14
     * 输出：[1,2,3,4,8,12,11,10,9,5,6,7]
     *
     *
     * 2  3  4
     * 5  6  7
     * 8  9  10
     * 11 12 13
     */

    /** 被卡住过的用例 - 最后只剩单列的时候，直接遍历单列即可
     * 2  3  4
     * 5  6  7
     * 8  9  10
     * 11 12 13
     * 14 15 16
     *
     * 多输出了一个9
     * [2,3,4,7,10,13,16,15,14,11,8,5,6,9,12]
     * [2,3,4,7,10,13,16,15,14,11,8,5,6,9,12,9]
     */
    /** 遍历的顺象为从第一行到找到边界，找到右边界往下，找到下边界往左，找到左边界往上，找到上边界往右 */
    function cross() {
        let rowLen = matrix.length
        let colLen = matrix[0].length

        if (rowLen === 1) return matrix[0]

        if (colLen == 1)
            return matrix.map((item) => {
                return item[0]
            })

        const res = []
        // 可用边界 [上, 下] [左, 右]
        const confinesRow = [0, rowLen - 1]
        const confinesCol = [0, colLen - 1]

        while (confinesRow[0] <= confinesRow[1] && confinesCol[0] <= confinesCol[1]) {
            let startRow = confinesRow[0],
                startCol = confinesCol[0]

            // 只剩单行
            if (confinesRow[0] === confinesRow[1]) {
                // 填充最后一行
                while (startCol <= confinesCol[1]) {
                    res.push(matrix[startRow][startCol])
                    startCol++
                }
                return res
            }

            // 只剩单列
            if (confinesCol[0] === confinesCol[1]) {
                while (startRow <= confinesRow[1]) {
                    res.push(matrix[startRow][startCol])
                    startRow++
                }
                return res
            }

            // 从左往右
            while (startCol < confinesCol[1]) {
                res.push(matrix[startRow][startCol])
                startCol++
            }

            // 从右往下
            while (startRow < confinesRow[1]) {
                res.push(matrix[startRow][startCol])
                startRow++
            }

            //从下往左
            while (startCol > confinesCol[0]) {
                res.push(matrix[startRow][startCol])
                startCol--
            }

            // 从左往上
            while (startRow > confinesRow[0]) {
                res.push(matrix[startRow][startCol])
                startRow--
            }

            // 更新边界
            confinesRow[0]++
            confinesRow[1]--
            confinesCol[0]++
            confinesCol[1]--
        }

        return res
    }
}

/**
 * 48. 旋转图像 给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度
 * 你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像
示例 1：
输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]

1  2  3      7  4  1
4  5  6  ->  8  5  2
7  8  9      9  6  3

如果要原地修改 -> 先上下(水平)翻转，再对角线

1  2  3     7  8  9     7  4  1
4  5  6  -> 4  5  6  -> 8  5  2
7  8  9     1  2  3     9  6  3

输出：[[7,4,1],[8,5,2],[9,6,3]]

示例 2：
输入：matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
5  1  9  11
2  4  8  10
13 3  6  7
15 14 12 16
输出：[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
 * @param {number[][]} matrix  n == matrix.length == matrix[i].length  1 <= n <= 20
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
    /**
     * 顺时针旋转90度，也就是意味着横的变竖的
     * 先试试不原地旋转怎么解决
     */
    function useAnother() {
        const newMatrix = []
        // n x n 其实 rowLen === colLen
        const rowLen = matrix.length
        const colLen = matrix[0].length
        let c = 0
        while (c < colLen) {
            const rowArr = []
            let r = rowLen - 1
            while (r >= 0) {
                rowArr.push(matrix[r][c])
                r--
            }
            newMatrix.push(rowArr)
            c++
        }
        for (let i = 0; i < rowLen; i++) {
            for (let j = 0; j < colLen; j++) {
                matrix[i][j] = newMatrix[i][j]
            }
        }
    }

    /** 翻转两次 */
    function reverse() {
        const rowLen = matrix.length
        const colLen = matrix[0].length

        // 第一次水平翻转
        for (let i = 0; i < Math.floor(rowLen / 2); i++) {
            for (let j = 0; j < colLen; j++) {
                const temp = matrix[i][j]
                matrix[i][j] = matrix[rowLen - 1 - i][j]
                matrix[rowLen - 1 - i][j] = temp
            }
        }

        // 第二次对角线翻转
        for (let i = 0; i < colLen; i++) {
            for (let j = i + 1; j < rowLen; j++) {
                const temp = matrix[i][j]
                matrix[i][j] = matrix[j][i]
                matrix[j][i] = temp
            }
        }

        // 官方题解
        // var rotate = function (matrix) {
        //     const n = matrix.length
        //     // 水平翻转
        //     for (let i = 0; i < Math.floor(n / 2); i++) {
        //         for (let j = 0; j < n; j++) {
        //             ;[matrix[i][j], matrix[n - i - 1][j]] = [matrix[n - i - 1][j], matrix[i][j]]
        //         }
        //     }
        //     // 主对角线翻转
        //     for (let i = 0; i < n; i++) {
        //         for (let j = 0; j < i; j++) {
        //             ;[matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
        //         }
        //     }
        // }
    }
}
