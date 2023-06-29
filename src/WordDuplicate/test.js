var str = "adfa1、example\n2、test\n3、demo\n";
var regex = /\d+、(.*\n|$)/gm;
var matches = str.match(regex);

console.log(matches); // 输出 ["1、example\n", "2、test\n", "3、demo"]
