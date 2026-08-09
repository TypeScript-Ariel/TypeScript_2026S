interface IRun{
    startRun(speed:number):string;
}

interface IRun{
    startRun(speed:number):string;
}

interface ISleep{
    startSleep(time:number):string;
}


class Child implements IRun,ISleep{

    startRun(speed:number):string{
        return `I am starting to run at speed ${speed}`;
    }

    startSleep(time:number):string{
        return `I am going to sleep for ${time} hours`;
    }
}


let c:Child=new Child();
console.log(c.startRun(17));    //--> I am starting to run at speed 17
console.log(c.startSleep(10));  //--> I am going to sleep for 10 hours


let run:IRun=c;
let sleep:ISleep=c;

