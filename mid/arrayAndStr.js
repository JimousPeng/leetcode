/**

 * 
输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]
解释：
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
不同的三元组是 [-1,0,1] 和 [-1,-1,2] 
注意，输出的顺序和三元组的顺序并不重要


输入：nums = [0,1,1]
输出：[]
解释：唯一可能的三元组和不为 0 

 * @param {number[]} nums
 * @return {number[][]}。
 */
var threeSum = function (nums) {
    nums.sort((a, b) => a - b); // 先排序
    const listLen = nums.length;
    const targetList = [];
    /** 因为存在双指针操作，所以遍历到倒数第二位即可 */
    for (let i = 0; i < listLen - 2; i++) {
        /** 已经对数组排序的前提下，所以当前遍历项大于0，那么肯定无法找到累加为0的数 */
        if (nums[i] > 0) break;
        let left = i + 1; // 左指针
        let right = listLen - 1; // 右指针
        const targetNum = -nums[i]; // num[i] + (-num[i]) = 0
        while (left < right) {
            const sum = nums[left] + nums[right];
            if (sum === targetNum) {
                // 命中
                targetList.push([nums[i], nums[left], nums[right]]);
                /** 通过两个while，过滤掉重复的值 */
                while (left < right && nums[left] === nums[left + 1]) {
                    left++;
                }
                while (left < right && nums[right] === nums[right - 1]) {
                    right--;
                }
            } else if (sum < targetNum) {
                // 即sum + nums[i] < 0; 左指针前移
                left++;
            } else {
                // 即sum + nums[i] > 0; 右指针前移
                right--;
            }
        }
    }
    return targetList;
};

console.log(threeSum([-1, 0, 1, 2, -1, -4]));

