/** 560. 和为 K 的子数组
 *
 * 给你一个整数数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的连续子数组的个数
 * 输入：nums = [1,1,1], k = 2  输出：2
 *
 * 输入：nums = [1,2,3], k = 3  输出：2
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
    // const countList = new Array(nums.length + 1).fill(0)
    // for (let i = 0; i < nums.length; i++) {
    //     countList[i + 1] = countList[i] + nums[i]
    // }
    // let ans = 0
    // for (let i = 1; i < nums.length; i++) {
    //     for (let j = 0; j < i; j++) {
    //         if (countList[i] - countList[j] === k) {
    //             ans++
    //         }
    //     }
    // }
    // return ans

    const countMap = new Map() // 记录前缀和以及该前缀和出现的次数
    countMap.set(0, 1)
    let ans = 0,
        sum_cur = 0
    for (let i = 0; i < nums.length; i++) {
        sum_cur += nums[i]
        const sum_k = sum_cur - k
        const getTarget = countMap.get(sum_k)
        if (getTarget) {
            console.log(getTarget, 'getTarget', sum_k, i)
            ans += getTarget
        }
        countMap.set(sum_cur, (countMap.get(sum_cur) || 0) + 1)
    }
    console.log(countMap)
    return ans
}
subarraySum([1, 1, 1], 2)

/** 1419. 数青蛙
 * 给你一个字符串 croakOfFrogs，它表示不同青蛙发出的蛙鸣声（字符串 "croak" ）的组合。由于同一时间可以有多只青蛙呱呱作响，所以 croakOfFrogs 中会混合多个 “croak”
 * 请你返回模拟字符串中所有蛙鸣所需不同青蛙的最少数目
 * 如果没有输出全部五个字母，那么它就不会发出声音。如果字符串 croakOfFrogs 不是由若干有效的 "croak" 字符混合而成，请返回 -1
 * @param {string} croakOfFrogs
 * @return {number}
 */
var minNumberOfFrogs = function (croakOfFrogs) {
    let frogC = 0,
        frogR = 0,
        frogO = 0,
        frogA = 0,
        frogK = 0,
        res = 0
    for (let i = 0; i < croakOfFrogs.length; i++) {
        let curWord = croakOfFrogs[i]
        if (curWord === 'c') {
            if (frogK > 0) {
                frogK--
            } else {
                res++
            }
            frogC++
        } else if (curWord === 'r') {
            frogC--
            frogR++
        } else if (curWord === 'o') {
            frogR--
            frogO++
        } else if (curWord === 'a') {
            frogO--
            frogA++
        } else if (curWord === 'k') {
            frogA--
            frogK++
        }
        if (frogC < 0 || frogR < 0 || frogO < 0 || frogA < 0) {
            break
        }
    }
    if (frogC !== 0 || frogR !== 0 || frogO !== 0 || frogA !== 0) {
        return -1
    }
    return res
}
// console.log('====================================')
// console.log(minNumberOfFrogs('aoocrrackk'))
// console.log('====================================')
