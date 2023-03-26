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
console.log('====================================')
console.log(minNumberOfFrogs('aoocrrackk'))
console.log('====================================')
