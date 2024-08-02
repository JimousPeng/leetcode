/**
 * 心得：
 * 1. 字符类型题目，一般可以优先考虑用hash表处理，既可以存下标，也可以存值的映射
 * 2. 灵活运用数组，既可以记录位置信息，也可以处理前缀和，将数组当栈使用，依次存入数据
 *    比如在 [128. 最长连续序列 ] 中，利用hash表存当前序列的三个坐标，[左点位，当前点位， 右点位] 用 0 和 1 来识别点位是否存在
 *
 * 细节处理：
 * 1. 哈希表判断用 if(hash[key] !== undefined) 代替 if(hash[key]); 值可能为0, 或者空字符串''
 * 2. 哈希表可以用来做循环遍历中的剪枝操作，对于操作过的数如果需要跳过，可通过hash处理
 * 3. while循环记得更新终止条件，否则容易提交超时
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

/** 128. 最长连续序列
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
var longestConsecutive = function (nums) {}
