function ExecFunc(num :number,func1:(msg:string)=>void,func2:(msg:string)=>void):void{
    (num>0)?func1("num is greater than 0"):func2("num is not greater than 0");
}

ExecFunc(3,
    x=>console.log("call 1 : first param got " +x),
    y=>console.log("call 1 : second param got " +y)
);


ExecFunc(-2,
    x=>console.log("call 2 : first param got " +x),
    y=>console.log("call 2 : second param got " +y) 
);