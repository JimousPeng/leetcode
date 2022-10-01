/**给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积
 * 请不要使用除法，且在 O(n) 时间复杂度内完成此题
 *
 * 输入: nums = [1,2,3,4]
 * 输出: [24,12,8,6]
 *
 * 输入: nums = [-1,1,0,-3,3]
 * 输出: [0,0,9,0,0]
 *
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
    // 超时了
    // let numsLen = nums.length;
    // const resultList = [];
    // for (let i = 0; i < numsLen; i++) {
    //     const sum = nums.reduce((total, item, idx) => {
    //         if (idx === i) {
    //             return total;
    //         }
    //         total = total * item;
    //         return total;
    //     }, 1);
    //     resultList.push(sum);
    // }
    // return resultList;

    let numsLen = nums.length;
    const resultList = [];
    let baseNum = nums[0];
    let curNum = nums[0];
    for (let i = 1; i < numsLen; i++) {
        curNum = nums[i];
        baseNum = nums[0];
    }
    return resultList;
};
console.log(productExceptSelf([-1, 1, 0, -3, 3]));

