function testWhile() {
    let left = 0;
    let right = 9;
    while (left < right) {
        console.log(left, right);
        left++;
        right--;
        if (left > 2) {
            return 999;
        }
    }
}

let a = testWhile();

console.log(a, '打印a');

let left = 0;
let right = 9;
while (left < right) {
    console.log(left, right);
    left++;
    right--;
    if (left > 2) {
        console.log('跳出循环');
        // return; // 这里return, 浏览器环境会报错，node下后续代码 不执行
        break; // break可以跳出循环
    }
}
console.log('end---------');

for (let i = 0; i < 9; i++) {
    if (i == 2) {
        console.log(i, 'haha');
        return; // 这里return, 浏览器环境会报错，node下后续代码 不执行
    }
}
