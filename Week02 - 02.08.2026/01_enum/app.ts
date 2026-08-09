enum Color{
    Black=3,
    Green,
    Blue
}

console.log(Color[0]);  //--> Black
console.log(Color[1]);  //--> Green
console.log(Color[2]);  //--> Blue


console.log(Color.Black);  //--> 0
console.log(Color.Green);  //--> 1
console.log(Color.Blue);   //--> 2


let c1:Color=Color.Blue;

console.log(c1);        //--> 2
console.log(Color[c1]); //--> Blue

