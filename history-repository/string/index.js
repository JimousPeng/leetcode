/** 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
 *
 *  s = "abcabcbb" 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    if (!s) return 0;
    let max = 1;
    for (let i = 0; i < s.length; i++) {
        let count = 1;
        let strSet = new Set();
        let left = i - 1;
        let begin = i;
        strSet.add(s[i]);
        // 往后累计
        while (++begin < s.length && !strSet.has(s[begin])) {
            strSet.add(s[begin]);
            count++;
        }
        // 往前累计
        while (!strSet.has(s[left]) && left >= 0) {
            strSet.add(s[left]);
            left--;
            count++;
        }
        strSet = null;
        if (count > max) {
            max = count;
        }
    }
    return max;
};
console.log(lengthOfLongestSubstring('asjrgapa'));
