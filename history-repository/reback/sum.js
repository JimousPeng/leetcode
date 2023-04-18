/** 四数之和
 * 给你一个由 n 个整数组成的数组 nums ，和一个目标值 target 。
 * 请你找出并返回满足下述全部条件且不重复的四元组 [nums[a], nums[b], nums[c], nums[d]] （若两个四元组元素一一对应，则认为两个四元组重复）
 *
 * 输入：nums = [1,0,-1,0,-2,2], target = 0
 * 输出：[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
 */
var fourSum = function (nums, target) {
    nums.sort((a, b) => a - b); // 排序方便后面移除大数
    console.log(nums);
    const collectList = [];
    for (let i = 0; i < nums.length - 3; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        if (nums[i] > target) break;
        if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) break;
        if (nums[i] + nums[nums.length - 1] + nums[nums.length - 2] + nums[nums.length - 3] < target) continue;
        for (let j = i + 1; j < nums.length - 2; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) {
                continue;
            }
            if (nums[i] + nums[j] + nums[j + 1] + nums[j + 2] > target) break;
            if (nums[i] + nums[j] + nums[nums.length - 1] + nums[nums.length - 2] < target) continue;
            let left = j + 1;
            let right = nums.length - 1;
            console.log(nums[i], nums[j], nums[left], nums[right]);
            while (left < right) {
                const curtarget = nums[i] + nums[j] + nums[left] + nums[right];
                console.log(curtarget);
                if (curtarget === target) {
                    console.log('满足条件---');
                    collectList.push([nums[i], nums[j], nums[left], nums[right]]);
                    // 两个while循环缩小窗口
                    while (left < right && nums[left] === nums[left + 1]) {
                        left++;
                    }
                    while (left < right && nums[right] === nums[right - 1]) {
                        right--;
                    }
                    left++;
                    right--;
                } else if (curtarget > target) {
                    right--;
                } else {
                    left++;
                }
            }
        }
    }
    console.log(collectList);
    return collectList;
};

fourSum([2, 1, 0, -1], 2);

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    nums.sort((a, b) => a - b);
    const collectList = [];
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 0) break;
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        let left = i + 1;
        let right = nums.length - 1;
        while (left < right) {
            const curtarget = nums[i] + nums[left] + nums[right];
            if (curtarget === 0) {
                collectList.push([nums[i], nums[left], nums[right]]);
                // 两个while循环缩小窗口
                while (left < right && nums[left] === nums[left + 1]) {
                    left++;
                }
                while (left < right && nums[right] === nums[right - 1]) {
                    right--;
                }
                left++;
                right--;
            } else if (curtarget > 0) {
                right--;
            } else {
                left++;
            }
        }
    }
    return collectList;
};
