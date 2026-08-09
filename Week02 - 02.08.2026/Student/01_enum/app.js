var Color;
(function (Color) {
    Color[Color["Black"] = 0] = "Black";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
console.log(Color[0]); //--> Black
console.log(Color[1]); //--> Green
console.log(Color[2]); //--> Blue
console.log(Color.Black); //--> Black
console.log(Color.Green); //--> Green
console.log(Color.Blue); //--> Blue
var c1 = Color.Blue;
console.log(c1); //--> 2
console.log(Color[c1]); //--> Blue
