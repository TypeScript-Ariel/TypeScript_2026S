enum ElementPosition {
    up,
    down,
    main,
    sub,
    center
}


let size: number = 3;

let matrix: ElementPosition[][];
matrix = new Array<Array<ElementPosition>>(size);

for (let i: number = 0; i < matrix.length; i++) {
    matrix[i] = new Array<ElementPosition>(size);
}

for (let i: number = 0; i < matrix.length; i++) {
    for (let j: number = 0; j < matrix[i].length; j++) {
        if (j == i) {
            matrix[i][j] = (j + i == size - 1) ? ElementPosition.center : ElementPosition.main;
        }
        else if (j + i == size - 1) {
            matrix[i][j] = ElementPosition.sub;
        }
        else if (j < i) {
            matrix[i][j] = ElementPosition.down;
        }
        else {
            matrix[i][j] = ElementPosition.up;
        }
    }
}





for (let i: number = 0; i < matrix.length; i++) {
    let str:string="";
    for (let j: number = 0; j < matrix[i].length; j++) {
        str +=`${ElementPosition[matrix[i][j]]}\t|`;
    }
    console.log(str);
    console.log("__________________________");
}



/*
OUTPUT:
______________________________



main    |up     |sub    |
__________________________
down    |center |up     |
__________________________
sub     |down   |main   |
__________________________


*/