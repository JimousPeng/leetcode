/*
 * @Author: jimouspeng
 * @LastEditTime: 2022-07-11 15:07:40
 * @Description: 设计问题
 * @FilePath: \leetcode\src\design.js
 * 可以输入预定的版权声明、个性签名、空行等
 */

/** 打乱数组
 * 给你一个整数数组 nums ，设计算法来打乱一个没有重复元素的数组。打乱后，数组的所有排列应该是 等可能 的
 * 实现 Solution class:

Solution(int[] nums) 使用整数数组 nums 初始化对象
int[] reset() 重设数组到它的初始状态并返回
int[] shuffle() 返回数组随机打乱后的结果

输入
["Solution", "shuffle", "reset", "shuffle"]
[[[1, 2, 3]], [], [], []]
输出
[null, [3, 1, 2], [1, 2, 3], [1, 3, 2]]

解释
Solution solution = new Solution([1, 2, 3]);
solution.shuffle();    // 打乱数组 [1,2,3] 并返回结果。任何 [1,2,3]的排列返回的概率应该相同。例如，返回 [3, 1, 2]
solution.reset();      // 重设数组到它的初始状态 [1, 2, 3] 。返回 [1, 2, 3]
solution.shuffle();    // 随机返回数组 [1, 2, 3] 打乱后的结果。例如，返回 [1, 3, 2]
 */

/**
 * @param {number[]} nums
 */
var Solution = function (nums) {
    this.orignList = nums;
};

/**
 * @return {number[]}
 */
Solution.prototype.reset = function () {
    return this.orignList;
};

/**
 * @return {number[]}
 */
Solution.prototype.shuffle = function () {
    const newList = JSON.parse(JSON.stringify(this.orignList));

    for (let i = 1; i < newList.length; i++) {
        let randomIdx = Math.floor(Math.random() * (i + 1));
        resetItem(newList, i, randomIdx);
    }

    return newList;
};

function resetItem(list, i, j) {
    console.log(list, i, j);
    let temp = list[i];
    list[i] = list[j];
    list[j] = temp;
}

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.reset()
 * var param_2 = obj.shuffle()
 */

/** 最小栈
 * 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈
 * 实现 MinStack 类:

MinStack() 初始化堆栈对象。
void push(int val) 将元素val推入堆栈。
void pop() 删除堆栈顶部的元素。
int top() 获取堆栈顶部的元素。
int getMin() 获取堆栈中的最小元素。


MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin();   --> 返回 -3.
minStack.pop();
minStack.top();      --> 返回 0.
minStack.getMin();   --> 返回 -2.
 */
var MinStack = function () {
    this.list = [];
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
    this.list.unshift(val);
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
    this.list.shift();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
    return this.list[0];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
    if (this.list.length === 0) {
        return 0;
    }
    let min = Infinity;
    for (let i = 0; i < this.list.length; i++) {
        if (this.list[i] < min) {
            min = this.list[i];
        }
    }
    return min;
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
