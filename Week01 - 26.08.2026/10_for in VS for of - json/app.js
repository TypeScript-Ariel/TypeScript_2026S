var obj = {
    "name": "Bob",
    "age": 4
};
console.log("---------------for-in loop--------------");
for (var i3 in obj) {
    console.log("Key ".concat(i3));
    console.log("Value ".concat(obj[i3]));
}
console.log("---------------for-of loop--------------");
var obj2 = {
    "name": "Bob",
    "age": 4
};
for (var _i = 0, obj2_1 = obj2; _i < obj2_1.length; _i++) {
    var i4 = obj2_1[_i];
    console.log("Value ".concat(i4));
}
/*
OUTPUT:
__________________________________

---------------for-in loop--------------
index name
index age
---------------for-of loop--------------

*/ 
