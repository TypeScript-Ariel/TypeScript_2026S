# מטלה – TypeScript Server + MongoDB: ניהול משתמשים

## מטרת המטלה

במטלה זו תרחיבו את פרויקט ה־Server הקיים ותבנו זרימה מלאה של עבודה מול MongoDB באמצעות TypeScript.

המטרה היא לתרגל שלושה נושאים מרכזיים:

1. **שכבת Types** – הגדרת טיפוסים ברורה לכל המידע שעובר במערכת.
2. **שכבת Database** – חיבור ל־MongoDB וביצוע פעולות על אוסף משתמשים.
3. **שכבת Server** – יצירת API באמצעות Express שמאפשר רישום, הצגה ומחיקה של משתמשים.

> **הדגש המרכזי במטלה הוא TypeScript.** אין להשתמש ב־`any`, ואין להשאיר מידע, פרמטרים, ערכי חזרה, request bodies או database results ללא טיפוס מתאים.

---

## נקודת התחלה

המשיכו מהפרויקט שקיבלתם, שבו כבר קיימים בין היתר:

```text
Server/
├── app.ts
├── server/
│   └── index.ts
├── db/
│   ├── index.ts
│   └── actions.ts
├── type/
│   └── user.ts
├── package.json
└── tsconfig.json
```

בפרויקט כבר קיימים `Express`, חבילת `mongodb` וממשק בסיסי של `User`.

אין צורך להחליף את הטכנולוגיות הקיימות.

---

# חלק א' – Types

## 1. טיפוס User

השתמשו במבנה המשתמש הקיים כבסיס:

```ts
type EmailType = `${string}@${string}.com`;

export interface User {
  name: string;
  lastName: string;
  email: EmailType;
  password: string;
  userName: string;
}
```

מותר לשפר או לפצל את הטיפוסים, אך יש לשמור על השדות המרכזיים של המשתמש.

## 2. צרו טיפוסים נוספים לפי הצורך

לדוגמה, במערכת יכולים להיות טיפוסים שונים עבור:

- מידע שמתקבל בעת יצירת משתמש.
- משתמש כפי שהוא נשמר ב־MongoDB.
- משתמש שמוחזר ללקוח ללא `password`.
- פרמטרים שמתקבלים ב־URL.
- תשובה תקינה מהשרת.
- תשובת שגיאה.

מומלץ להשתמש ביכולות TypeScript כגון:

```ts
Omit<User, "password">
```

וכן ב־Generic עבור תשובות API, לדוגמה:

```ts
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}
```

אין חובה להשתמש בדיוק בשמות האלה, אך **כל מבנה מידע חייב להיות מיוצג באמצעות טיפוס מתאים**.

---

# חלק ב' – שכבת Database

## 3. חיבור ל־MongoDB

בקובץ:

```text
db/index.ts
```

צרו חיבור מסודר ל־MongoDB באמצעות `MongoClient`.

עליכם ליצור או להשתמש ב־Database ייעודי למטלה, ובתוכו Collection בשם:

```text
users
```

לדוגמה:

```text
Database: typescript_course
Collection: users
```

שם ה־Database יכול להיות שונה, אך שם ה־Collection צריך להיות ברור ומשמעותי.

### דרישות

- `MongoClient` חייב להיות מטופס.
- ה־`Db` חייב להיות מטופס.
- ה־`Collection` חייב להיות Collection של משתמשים ולא Collection כללי.
- אין לפתוח ולסגור חיבור חדש לכל פעולה ללא צורך.
- אין לשמור connection string הכולל סיסמה ישירות בקוד שמוגש. השתמשו במשתנה סביבה כגון `MONGODB_URI`.

דוגמה לרעיון של Collection מטופס:

```ts
Collection<User>
```

---

## 4. פעולות Database

בקובץ:

```text
db/actions.ts
```

ממשו לפחות את שלוש הפעולות הבאות:

```ts
createUser(...)
getUsers(...)
deleteUser(...)
```

לכל פונקציה חייבים להיות:

- טיפוסים לכל הפרמטרים.
- טיפוס חזרה מפורש.
- `Promise<...>` מתאים כאשר הפעולה אסינכרונית.
- טיפול במקרה שבו הפעולה נכשלה.

דוגמאות לחתימות אפשריות:

```ts
createUser(user: CreateUserInput): Promise<PublicUser>

getUsers(): Promise<PublicUser[]>

deleteUser(id: string): Promise<boolean>
```

החתימות הן דוגמה בלבד. ניתן לבחור מבנה אחר כל עוד הוא מטופס באופן מלא והגיוני.

> שכבת ה־Database אחראית לעבודה מול MongoDB בלבד. היא **לא** אמורה לעבוד עם `Request` או `Response` של Express.

---

# חלק ג' – שכבת Server

## 5. API לניהול משתמשים

בקובץ:

```text
server/index.ts
```

צרו API באמצעות Express.

השרת צריך להשתמש בפונקציות שנכתבו בשכבת ה־Database ולא לפנות ישירות ל־MongoDB מתוך ה־routes.

---

## POST `/users`

רישום משתמש חדש.

### Request Body

```json
{
  "name": "Daniel",
  "lastName": "Cohen",
  "email": "daniel@example.com",
  "password": "123456",
  "userName": "danielc"
}
```

### דרישות

- ה־request body חייב להיות מטופס.
- יש ליצור את המשתמש דרך `createUser` בשכבת ה־Database.
- במקרה של הצלחה יש להחזיר status מתאים, לדוגמה `201`.
- אין להחזיר את הסיסמה בתשובת השרת.

---

## GET `/users`

החזרת כל המשתמשים מה־Collection.

### דרישות

- יש להשתמש בפונקציה `getUsers`.
- התוצאה חייבת להיות מערך מטופס.
- אין להחזיר סיסמאות של משתמשים.
- במקרה של הצלחה יש להחזיר status `200`.

---

## DELETE `/users/:id`

מחיקת משתמש לפי ה־`id` שלו ב־MongoDB.

לדוגמה:

```http
DELETE /users/66a1234567890abcdef1234
```

### דרישות

- גם `req.params` חייב להיות מטופס.
- יש לבדוק שה־id תקין לפני ניסיון המחיקה.
- יש להשתמש בפונקציה `deleteUser` משכבת ה־Database.
- אם המשתמש לא נמצא, יש להחזיר תשובה מתאימה, לדוגמה `404`.
- במקרה של הצלחה יש להחזיר תשובה ברורה שהמשתמש נמחק.

---

# חלק ד' – דרישות TypeScript

זהו החלק החשוב ביותר במטלה.

## אסור

```ts
let user: any;
const data: any = req.body;
function createUser(user) {}
function getUsers() {}
```

אסור להשתמש גם ב:

```ts
as any
```

כדי לעקוף שגיאות TypeScript.

## חובה

יש להגדיר טיפוסים עבור:

- משתנים משמעותיים.
- פרמטרים של פונקציות.
- ערכי חזרה של פונקציות.
- פונקציות `async`.
- `Request Body`.
- `Request Params`.
- תשובות API.
- משתמשים המוחזרים מה־Database.
- Collection של MongoDB.
- תוצאות של פעולות Database.

יש להשאיר את:

```json
"strict": true
```

ב־TypeScript configuration.

> אם TypeScript אינו יודע מהו הטיפוס של ערך מסוים, עליכם לפתור זאת בעזרת טיפוס מתאים ולא בעזרת `any`.

---

# חלק ה' – הפרדת אחריות בין השכבות

הקוד צריך להיות מחולק בצורה הבאה:

```text
Request
   ↓
Express Route
   ↓
Database Action
   ↓
MongoDB
```

ובחזרה:

```text
MongoDB
   ↓
Database Action
   ↓
Express Route
   ↓
Response
```

### `type/`

אחראי על הגדרת הטיפוסים.

### `db/index.ts`

אחראי על החיבור ל־MongoDB וקבלת ה־Database / Collection.

### `db/actions.ts`

אחראי על הפעולות מול Collection המשתמשים.

### `server/index.ts`

אחראי על routes, request ו־response.

> Route לא אמור להכיל `MongoClient`, ופעולת Database לא אמורה להכיל `res.status(...)`.

---

# חלק ו' – טיפול בשגיאות

יש לטפל לפחות במקרים הבאים:

- חסר מידע ביצירת משתמש.
- `id` לא תקין במחיקה
- משתמש למחיקה לא נמצא.
- שגיאה בחיבור או בפעולה מול MongoDB.
- שגיאה לא צפויה בשרת.

גם מבנה השגיאה שמוחזר ללקוח צריך להיות מטופס.

לדוגמה:

```ts
export interface ApiError {
  success: false;
  message: string;
}
```

---

# חלק ז' – בדיקת המטלה

לאחר סיום המימוש, בדקו את ה־API באמצעות Postman, Thunder Client או כלי דומה.

יש לבדוק לפחות את הזרימה הבאה:

1. יצירת משתמש ראשון באמצעות `POST /users`.
2. יצירת משתמש נוסף.
3. קבלת המשתמשים באמצעות `GET /users`.
4. וידוא שהסיסמאות אינן מופיעות בתשובה.
5. מחיקת אחד המשתמשים באמצעות `DELETE /users/:id`.
6. קריאה נוספת ל־`GET /users` וידוא שהמשתמש אכן נמחק.
7. ניסיון למחוק `id` שאינו קיים ובדיקת תשובת השגיאה.

---

# מבנה מומלץ בסיום

```text
Server/
├── server/
│   └── index.ts
├── db/
│   ├── index.ts
│   └── actions.ts
├── type/
│   ├── user.ts
│   └── api.ts
├── package.json
└── tsconfig.json
```

ניתן ליצור קבצי Types נוספים אם הדבר משפר את סדר הקוד.


---



# בונוס

למי שמסיים מוקדם:

- מניעת יצירת שני משתמשים עם אותו `email`.
- מניעת יצירת שני משתמשים עם אותו `userName`.
- שימוש ב־Type Guard לקבלת מידע שמגיע מבחוץ כ־`unknown`.
- יצירת Generic אחיד לכל תשובות ה־API.
- הוספת endpoint לקבלת משתמש יחיד לפי `id`.

---

## דגש אחרון

המטרה אינה רק לגרום לשרת לעבוד.

המטרה היא לגרום לשרת לעבוד **כאשר TypeScript מתאר בצורה ברורה את כל המידע שעובר בין השכבות**:

```text
Client → Server → Database → Server → Client
```

אם יש מקום בקוד שבו לא ברור מהו הטיפוס של המידע שעובר בו — זה המקום שאתם צריכים לתקן.
