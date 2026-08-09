# פונקציות חץ ב-TypeScript - מטלה

* צרו קובץ חדש בשם `app.ts`.  
* בקובץ זה, צרו פונקציה בשם `ExecFunc` שמחזירה `void` ומקבלת 3 פרמטרים:  
  * `num` - מסוג `number`  
  * `func1` - מסוג `(msg:string)=>void`  
  * `func2` - מסוג `(msg:string)=>void`  

הפונקציה תבדוק אם הפרמטר `num` גדול מ-0:  
  * אם הפרמטר `num` גדול מ-0, נשתמש ב-`func1` ונעביר לה את ההודעה `"num is greater than 0"`.  
  * אם הפרמטר `num` אינו גדול מ-0, נשתמש ב-`func2` ונעביר לה את ההודעה `"num is not greater than 0"`.  

* צרו שני קריאות לפונקציה `ExecFunc`:  
  * קריאה עם הפרמטרים הבאים:  
    * 3  
    * `x=>console.log("call 1 : first param got " +x)`  
    * `y=>console.log("call 1 : second param got " +y)`  
  * קריאה עם הפרמטרים הבאים:  
    * -2  
    * `x=>console.log("call 2 : first param got " +x)`  
    * `y=>console.log("call 2 : second param got " +y)`  

* בצעו הידור של הקובץ `app.ts` לקובץ `js` (באמצעות הפקודה `tsc`), והריצו את הקובץ `js` עם Node.js.  

### בהצלחה!