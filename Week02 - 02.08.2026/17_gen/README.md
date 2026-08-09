# Arrow functions in ts - Homework


* Create a new ts file named `app.ts`
* Craete in this file a function named `ExecFunc` that returns void, and gets 3 paraneters:
    * num - type `number`
    * func1 - type `(msg:string)=>void`
    * func2 - type `(msg:string)=>void`
the function will check if the `num` parameter is bigger than 0:
    * if `num` parameter is bigger than 0 - we will call `func1` - with the message `"num is greater than 0"`
    * if `num` parameter is not bigger than 0 - we will call `func2` - with the message `"num is not greater than 0"`

* Create 2 calls to the `ExecFunc` function:
    * a call with this parameters:
        * 3
        * `x=>console.log("call 1 : first param got " +x)`
        * `y=>console.log("call 1 : second param got " +y)`
    * a call with this parameters:
        * -2
        * `x=>console.log("call 2 : first param got " +x)`
        * `y=>console.log("call 2 : second param got " +y)`
* Create from `app.ts` a js file (wuth `tsc` command), and run the js file with node
### Good luck