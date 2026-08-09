let arr:string[]=["A","B","C"];

console.log("---------------while loop--------------");
let i1:number=0;
while(i1<arr.length){
    console.log(`index ${i1} contains: ${arr[i1]}`);
    i1++;
}


console.log("---------------for loop--------------");

for(let i2:number=0;i2<arr.length;i2++){
    console.log(`index ${i2} contains: ${arr[i2]}`);
}


console.log("---------------for-in loop--------------");

for(let i3 in arr){
    console.log(`Index ${i3}`);
}


console.log("---------------for-of loop--------------");

for(let val of arr){
    console.log(`Value ${val}`);
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