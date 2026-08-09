var arr = ["A", "B", "C"];
console.log("---------------while loop--------------");
var i1 = 0;
while (i1 < arr.length) {
    console.log("index ".concat(i1, " contains: ").concat(arr[i1]));
    i1++;
}
console.log("---------------for loop--------------");
for (var i2 = 0; i2 < arr.length; i2++) {
    console.log("index ".concat(i2, " contains: ").concat(arr[i2]));
}
console.log("---------------for-in loop--------------");
for (var i3 in arr) {
    console.log("Index ".concat(i3));
}
console.log("---------------for-of loop--------------");
for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
    var val = arr_1[_i];
    console.log("Value ".concat(val));
}
/*
OUTPUT:
__________________________________

---------------while loop--------------
index 0 contains: A
index 1 contains: B
index 2 contains: C
---------------for loop--------------
index 0 contains: A
index 1 contains: B
index 2 contains: C
---------------for-in loop--------------
index 0
index 1
index 2
---------------for-of loop--------------
index A
index B
index C



*/ 
