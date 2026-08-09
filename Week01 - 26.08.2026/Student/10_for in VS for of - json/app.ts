let obj: any = {
    "name": "Bob",
    "age": 4
};


console.log("---------------for-in loop--------------");

for (let i3 in obj) {
    console.log(`Key ${i3}`);
    console.log(`Value ${obj[i3]}`);
}


console.log("---------------for-of loop--------------");
let obj2: any = {
    "name": "Bob",
    "age": 4
};
for (let i4 of obj2) {

    console.log(`Value ${i4}`);
}


/*
OUTPUT:
__________________________________

---------------for-in loop--------------
index name
index age
---------------for-of loop--------------

*/