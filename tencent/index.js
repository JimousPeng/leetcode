/**
 * 最长回文子串： 正读和反读都相同的字符序列为“回文”
 *
 * 输入：s = "babad"
 * 输出："bab" 或者 aba
 *
 * @param {string} s
 * 1 <= s.length <= 1000
 * s 仅由数字和英文字母组成
 * @return {string}
 */
var longestPalindrome = function (s) {
    // 怎么确定一个字符串是回文
    function isPalindrome(s) {
        let left = 0;
        let right = s.length - 1;
        while (left < right) {
            if (s[left] !== s[right]) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
    function compareLength(s1, s2) {
        if (s1.length > s2.length) {
            return s1;
        }
        return s2;
    }
    // 遍历字符串，找出所有的排列组合，并找到符合回文字符串的列表
    const strMap = {};
    for (let i = 0; i < s.length; i++) {
        if (Object.keys(strMap).length) {
            for (const key in strMap) {
                strMap[key] += s[i];
            }
        }
        strMap[i] = s[i];
    }
    let maxPd;
    // 找到最长的那个
    Object.keys(strMap).forEach((key) => {
        if (isPalindrome(strMap[key])) {
            maxPd = compareLength(maxPd, strMap[key]);
        }
    });
    return maxPd;
};

const palindrome = longestPalindrome('babad');
console.log(palindrome);
