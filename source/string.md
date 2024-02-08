#### 字符拼接

字符的相关处理往往可以转换为 array 或者 hash 的形式类处理

-   482. 密钥格式化

字符拼接以从最后一项往前遍历的形式处理，之后再反转数组拼接回字符的思路还是很巧妙的，就是引入数组增加了额外的空间成本和时间成本(反转本身的额外消耗)

从自己的思路出发，处理好第一项要保留的位数，后续的就是常规递归处理了，性能反而更好

```javascript
/** 482. 密钥格式化
 *  给定一个许可密钥字符串 s，仅由字母、数字字符和破折号组成。字符串由 n 个破折号分成 n + 1 组。你也会得到一个整数 k
 *
 * 输入：S = "5F3Z-2e-9-w", k = 4 输出："5F3Z-2E9W" 字符串 S 被分成了两个部分，每部分 4 个字符；注意，两个额外的破折号需要删掉。
 * 输入：S = "2-5g-3-J", k = 2  输出："2-5G-3J" 字符串 S 被分成了 3 个部分，按照前面的规则描述，第一部分的字符可以少于给定的数量，其余部分皆为 2 个字符
 *
 * 重新格式化字符串 s，使每一组包含 k 个字符，除了第一组，它可以比 k 短，但仍然必须包含至少一个字符。此外，两组之间必须插入破折号，并且应该将所有小写字母转换为大写字母。
 * @param {string} s 1 <= s.length <= 105 只包含字母、数字和破折号 '-'.
 * @param {number} k 1 <= k <= 104
 * @return {string}
 */
var licenseKeyFormatting = function (s, k) {
    /**
     * 1. 每一组包含 k 个字符(除了第一组)；
     * 2. 除了第一组，它可以比 k 短，但仍然必须包含至少一个字符
     */
    // 以下思路只保证了第一组外，剩下的各组依次平分剩下的字符，但是无法保证第一组之外的每一个组包含 k 个字符
    // s = s.toUpperCase()
    // if (s.length === 1) return s
    // const str = s.split('-')
    // const strLen = str.length
    // let flowStr = '' // 上一节处理溢出的字符
    // let res = ''
    // for (let i = 0; i < strLen; i++) {
    //     const item = flowStr + str[i]
    //     let count = item
    //     if (item.length > k) {
    //         count = item.slice(0, k)
    //         flowStr = item.slice(k, item.length)
    //     } else if (i > 0 && item.length < k) {
    //         // 小于k ，更新溢出的字符
    //         flowStr = item
    //         continue
    //     } else {
    //         flowStr = ''
    //     }
    //     if (res === '') {
    //         res += count
    //     } else {
    //         res = res + '-' + count
    //     }
    // }
    // return flowStr ? res + '-' + flowStr : res

    /** 思路如下：
     * 1. 确定第一段数据，需要保留几个，以确保后续每一段的字符长度都是 k
     * 2. 统一小写转换为大写
     * 3. 去掉'-'
     *
     * 官方题解思路：
     * 1. 从后往前遍历，将每一个字符存入数组中，用一个变量计算当前字符长度，每 k 长度, 数组推入 '-'
     * 2. 最后一项去掉'-'
     * 3. 反转数组并合并所有项
     */
    s = s.toUpperCase()
    if (s.length === 1) return s.replace(/-/g, '') // 首字符如果包含'-'，还需要考虑到
    let getFirst = s.replace(/-/g, '')
    const firstLen = getFirst.length % k || k
    const str = s.split('')
    const strLen = str.length
    let flowStr = '' // 上一节处理溢出的字符
    let res = ''
    for (let i = 0; i < strLen; i++) {
        if (str[i] === '-') continue
        const item = flowStr + str[i]
        let count = item

        // 第一行特殊处理-或者说第一段数据
        if (i === 0 || res === '') {
            if (item.length < firstLen) {
                flowStr = count
                continue
            } else {
                count = item.slice(0, firstLen)
                flowStr = item.slice(firstLen, item.length)
            }
        } else if (item.length > k) {
            count = item.slice(0, k)
            flowStr = item.slice(k, item.length)
        } else if (item.length < k) {
            // 小于k ，更新溢出的字符
            flowStr = item
            continue
        } else {
            flowStr = ''
        }
        if (res === '') {
            res += count
        } else {
            res = res + '-' + count
        }
    }
    return flowStr ? res + '-' + flowStr : res

    // 以下是官方思路：
    // const ans = [];
    // let cnt = 0;

    // for (let i = s.length - 1; i >= 0; i--) {
    //     if (s[i] !== '-') {
    //         cnt++;
    //         ans.push(s[i].toUpperCase());
    //         if (cnt % k === 0) {
    //             ans.push("-");
    //         }
    //     }
    // }
    // if (ans.length > 0 && ans[ans.length - 1] === '-') {
    //     ans.pop();
    // }

    // return ans.reverse().join('');
}
```
