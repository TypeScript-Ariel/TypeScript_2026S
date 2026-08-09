
let families:string[][]=[];


//Yaron (has 4 children)
families[0]=["Elyshiv", "Yehuda", "Isca", "Emuna"];


//Gabi (has 2 children)
families[1]=["Shalev", "Liad"];


//Talia (has 1 child)
families[2]=["Rachel"];


console.log(families);


for (let i: number = 0; i < families.length; i++) {
    let str:string=`${families[i].length} children: `;
    for (let j: number = 0; j < families[i].length; j++) {
        str +=` ${families[i][j]},`;
    }
    console.log(str.substring(0,str.length-1));
}


/*
OUTPUT:
____________________________


[ [ 'Elyshiv', 'Yehuda', 'Isca', 'Emuna' ],
  [ 'Shalev', 'Liad' ],
  [ 'Rachel' ] ]

4 children:  Elyshiv, Yehuda, Isca, Emuna
2 children:  Shalev, Liad
1 children:  Rachel

*/