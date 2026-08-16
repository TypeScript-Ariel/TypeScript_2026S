# מטלת Full Stack – מערכת לניהול משתמשים

## Vite + React + TypeScript + TailwindCSS + Radix UI + Express + MongoDB

## מטרת המטלה

במטלה זו תבנו מערכת Full Stack מלאה לניהול משתמשים.

המערכת תכלול:

- Frontend באמצעות **Vite + React + TypeScript**
- עיצוב באמצעות **TailwindCSS**
- רכיבי UI באמצעות **Radix UI**
- Server באמצעות **Express + TypeScript**
- Database באמצעות **MongoDB**

המערכת תאפשר:

1. הוספת משתמש חדש.
2. הצגת כל המשתמשים.
3. הצגת משתמש בודד.
4. מחיקת משתמש.

---

# הדגש המרכזי במטלה – TypeScript

המטרה אינה רק לגרום למערכת לעבוד.

המטרה היא שכל המידע שעובר במערכת יהיה **מטופס בצורה ברורה**.

```text
Form
  ↓
React State
  ↓
API Function
  ↓
HTTP Request
  ↓
Express Server
  ↓
Database Action
  ↓
MongoDB
  ↓
Response
  ↓
React State
  ↓
Component Props
  ↓
UI
```

בכל שלב אנחנו צריכים לדעת:

> איזה טיפוס של מידע עובר כאן?

---

# חוק מרכזי

## אין להשתמש ב־`any`

אסור:

```ts
const user: any = ...
```

אסור:

```ts
const data: any = await response.json();
```

אסור:

```ts
function UserCard(props: any) {
}
```

אסור:

```ts
const handleSubmit = (event: any) => {
}
```

ואסור לעקוף את TypeScript באמצעות:

```ts
as any
```

---

# מבנה הפרויקט

מבנה מומלץ:

```text
users-project/
│
├── server/
│   ├── server/
│   │   └── index.ts
│   │
│   ├── db/
│   │   ├── index.ts
│   │   └── actions.ts
│   │
│   ├── type/
│   │   ├── user.ts
│   │   └── api.ts
│   │
│   ├── package.json
│   └── tsconfig.json
│
└── client/
    ├── src/
    │   ├── components/
    │   ├── services/
    │   ├── types/
    │   ├── App.tsx
    │   └── main.tsx
    │
    ├── package.json
    └── tsconfig.json
```

---

# חלק א' – Backend

המשיכו את המטלה הקודמת.

השרת צריך לעבוד באמצעות:

```text
Express
TypeScript
MongoDB
```

---

# 1. User Types

הגדירו טיפוסים ברורים עבור המידע במערכת.

לדוגמה:

```ts
export interface CreateUserInput {
  name: string;
  lastName: string;
  email: string;
  password: string;
  userName: string;
}
```

המשתמש שמוחזר ל־Frontend **לא יכיל password**.

לדוגמה:

```ts
export interface PublicUser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  userName: string;
}
```

שימו לב להבדל:

```text
CreateUserInput
```

מייצג מידע שהלקוח שולח בזמן יצירת משתמש.

לעומת:

```text
PublicUser
```

שמייצג משתמש שאפשר להחזיר ללקוח.

---

# 2. Database Layer

בקובץ:

```text
db/index.ts
```

צרו חיבור ל־MongoDB.

צרו Database ובתוכו Collection:

```text
users
```

ה־Collection חייב להיות מטופס.

אין לעבוד עם:

```ts
Collection<any>
```

---

# 3. Database Actions

בקובץ:

```text
db/actions.ts
```

ממשו:

```ts
createUser(...)
getUsers(...)
getUserById(...)
deleteUser(...)
```

לכל פונקציה חייבים להיות:

- טיפוסים לפרמטרים.
- טיפוס חזרה.
- `Promise` מתאים.
- טיפול במצב שבו הפעולה נכשלת.

לדוגמה:

```ts
createUser(user: CreateUserInput): Promise<PublicUser>

getUsers(): Promise<PublicUser[]>

getUserById(id: string): Promise<PublicUser | null>

deleteUser(id: string): Promise<boolean>
```

החתימות הן דוגמה.

ניתן לבחור מימוש מעט שונה כל עוד הוא מטופס וברור.

---

# 4. API

השרת צריך לספק את ה־endpoints הבאים.

---

## יצירת משתמש

```http
POST /users
```

Request Body:

```json
{
  "name": "Daniel",
  "lastName": "Cohen",
  "email": "daniel@example.com",
  "password": "123456",
  "userName": "danielc"
}
```

Response לדוגמה:

```json
{
  "success": true,
  "data": {
    "id": "...",
    "name": "Daniel",
    "lastName": "Cohen",
    "email": "daniel@example.com",
    "userName": "danielc"
  }
}
```

ה־password לא יוחזר ל־Frontend.

---

## הצגת כל המשתמשים

```http
GET /users
```

השרת יחזיר:

```ts
PublicUser[]
```

---

## הצגת משתמש בודד

```http
GET /users/:id
```

לדוגמה:

```http
GET /users/66a1234567890abcdef1234
```

אם המשתמש קיים:

```text
200 OK
```

אם המשתמש אינו קיים:

```text
404 Not Found
```

---

## מחיקת משתמש

```http
DELETE /users/:id
```

אם המשתמש נמחק:

```text
200 OK
```

או:

```text
204 No Content
```

אם המשתמש אינו קיים:

```text
404 Not Found
```

---

# חלק ב' – יצירת ה־Frontend

צרו אפליקציית React חדשה באמצעות:

```bash
npm create vite@latest
```

בחרו:

```text
React
TypeScript
```

האפליקציה חייבת להשתמש ב:

- React
- TypeScript
- TailwindCSS
- Radix UI

---

# חלק ג' – Types ב־Frontend

צרו תיקייה:

```text
src/types/
```

בתוכה הגדירו את הטיפוסים שה־Frontend צריך.

לדוגמה:

```ts
export interface PublicUser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  userName: string;
}
```

וטיפוס עבור יצירת משתמש:

```ts
export interface CreateUserInput {
  name: string;
  lastName: string;
  email: string;
  password: string;
  userName: string;
}
```

---

# חשוב – Database User ו־Frontend User אינם בהכרח אותו דבר

ה־Frontend לא צריך לדעת על:

```text
ObjectId
```

והוא לא צריך לקבל:

```text
password
```

לכן חשוב להבדיל בין הטיפוסים השונים במערכת.

לדוגמה:

```text
UserDocument
CreateUserInput
PublicUser
```

כל אחד מהם מייצג משהו אחר.

---

# חלק ד' – שכבת API ב־Frontend

אין לבצע `fetch` בכל קומפוננטה.

צרו תיקייה:

```text
src/services/
```

ובתוכה לדוגמה:

```text
usersApi.ts
```

הקובץ יהיה אחראי על התקשורת עם השרת.

---

## פונקציות חובה

צרו לפחות:

```ts
getUsers()
```

```ts
getUserById(id)
```

```ts
createUser(user)
```

```ts
deleteUser(id)
```

כל הפונקציות חייבות להיות מטופסות.

לדוגמה:

```ts
export async function getUsers(): Promise<PublicUser[]> {
  // ...
}
```

```ts
export async function getUserById(
  id: string
): Promise<PublicUser> {
  // ...
}
```

```ts
export async function createUser(
  user: CreateUserInput
): Promise<PublicUser> {
  // ...
}
```

```ts
export async function deleteUser(
  id: string
): Promise<void> {
  // ...
}
```

---

# אין Fetch ישירות בתוך כל הקומפוננטות

לא מומלץ:

```ts
function UserCard() {
  fetch("http://localhost:3000/users");
}
```

הקומפוננטות משתמשות בשכבת ה־API:

```ts
getUsers()
```

```ts
createUser(...)
```

```ts
deleteUser(...)
```

---

# חלק ה' – קומפוננטות React

יש לפרק את האפליקציה לקומפוננטות.

מבנה אפשרי:

```text
src/
├── components/
│   ├── UserForm.tsx
│   ├── UserList.tsx
│   ├── UserCard.tsx
│   ├── UserDetailsDialog.tsx
│   ├── DeleteUserDialog.tsx
│   ├── Loading.tsx
│   └── ErrorMessage.tsx
│
├── services/
│   └── usersApi.ts
│
├── types/
│   ├── user.ts
│   └── api.ts
│
└── App.tsx
```

אין חובה להשתמש בדיוק בשמות האלה.

הדגש הוא על חלוקה הגיונית של הקוד.

---

# חלק ו' – Props חייבים להיות מטופסים

כל קומפוננטה שמקבלת Props חייבת להגדיר את הטיפוס שלהם.

אסור:

```tsx
function UserCard(props: any) {
  return <div>{props.user.name}</div>;
}
```

יש להגדיר טיפוס.

לדוגמה:

```ts
interface UserCardProps {
  user: PublicUser;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
}
```

ואז:

```tsx
function UserCard({
  user,
  onDelete,
  onSelect
}: UserCardProps) {
  // ...
}
```

---

# שימו לב

קומפוננטה שלא מקבלת Props אינה צריכה ליצור בכוח:

```ts
interface Props {}
```

המטרה היא לא לכתוב טיפוסים מיותרים.

המטרה היא שטיפוס יהיה קיים במקום שבו הוא באמת מתאר מידע שעובר במערכת.

---

# חלק ז' – User Form

צרו טופס להוספת משתמש.

הטופס יכלול:

```text
Name
Last Name
Email
Username
Password
```

---

## State מטופס

המידע של הטופס חייב להיות מטופס.

לדוגמה:

```ts
const [form, setForm] = useState<CreateUserInput>({
  name: "",
  lastName: "",
  email: "",
  password: "",
  userName: ""
});
```

---

# Event Types

גם Events של React צריכים להיות מטופסים.

אסור:

```ts
const handleChange = (event: any) => {
}
```

השתמשו בטיפוס המתאים.

לדוגמה:

```ts
const handleChange = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  // ...
};
```

Submit:

```ts
const handleSubmit = (
  event: React.FormEvent<HTMLFormElement>
) => {
  event.preventDefault();
};
```

---

# Form Flow

כאשר המשתמש לוחץ Submit:

```text
UserForm
   ↓
CreateUserInput
   ↓
createUser(...)
   ↓
POST /users
   ↓
Server
   ↓
MongoDB
   ↓
PublicUser
   ↓
React
   ↓
Update UI
```

לאחר יצירה מוצלחת:

- המשתמש החדש צריך להופיע ברשימה.
- אין צורך לרענן ידנית את הדפדפן.
- הטופס צריך להתאפס.

---

# חלק ח' – הצגת כל המשתמשים

צרו קומפוננטה:

```text
UserList
```

הקומפוננטה תקבל מערך:

```ts
PublicUser[]
```

לדוגמה:

```ts
interface UserListProps {
  users: PublicUser[];
}
```

כל משתמש יוצג באמצעות:

```text
UserCard
```

---

# UserCard

כל כרטיס משתמש יציג לפחות:

```text
Name + Last Name
Username
Email
```

לדוגמה:

```text
Daniel Cohen
@danielc
daniel@example.com
```

לכל משתמש יהיו אפשרויות:

```text
View
Delete
```

---

# חלק ט' – הצגת משתמש בודד

כאשר לוחצים על:

```text
View
```

יש לבצע בקשה:

```http
GET /users/:id
```

ולהציג את המשתמש שנבחר.

אין להסתפק רק במידע שכבר קיים ב־UserCard.

המטרה היא לתרגל גם:

```ts
getUserById(id: string)
```

---

# שימוש ב־Radix UI

הציגו את פרטי המשתמש באמצעות רכיב של Radix UI.

לדוגמה:

```text
Dialog
```

בתוך ה־Dialog יוצגו פרטי המשתמש.

לדוגמה:

```text
Daniel Cohen

Username:
danielc

Email:
daniel@example.com
```

---

# חלק י' – מחיקת משתמש

לכל משתמש יהיה כפתור:

```text
Delete
```

לפני המחיקה יש לבקש אישור מהמשתמש.

מומלץ להשתמש ב־Radix UI:

```text
AlertDialog
```

לדוגמה:

```text
Are you sure you want to delete Daniel Cohen?

Cancel
Delete
```

רק לאחר אישור יש לבצע:

```http
DELETE /users/:id
```

---

# לאחר מחיקה

המשתמש צריך להיעלם מה־UI ללא Refresh ידני של הדפדפן.

כלומר יש לעדכן את ה־state.

לדוגמה מבחינה רעיונית:

```ts
users.filter(...)
```

שימו לב:

התוצאה עדיין צריכה להיות:

```ts
PublicUser[]
```

---

# חלק י"א – State Types

כל State משמעותי צריך לקבל טיפוס מתאים.

לדוגמה:

```ts
const [users, setUsers] = useState<PublicUser[]>([]);
```

משתמש נבחר:

```ts
const [selectedUser, setSelectedUser] =
  useState<PublicUser | null>(null);
```

Loading:

```ts
const [isLoading, setIsLoading] =
  useState<boolean>(false);
```

Error:

```ts
const [error, setError] =
  useState<string | null>(null);
```

---

# חלק י"ב – Loading ו־Errors

האפליקציה חייבת לטפל במצבים הבאים.

## Loading

כאשר המידע נטען:

```text
Loading users...
```

או הצגת Loader מתאים.

---

## Empty State

אם אין משתמשים:

```text
No users found
```

---

## Error

אם הבקשה נכשלה:

```text
Failed to load users
```

או הודעה מתאימה אחרת.

אין להתעלם משגיאות.

---

# חלק י"ג – TailwindCSS

העיצוב של האפליקציה יתבצע באמצעות TailwindCSS.

יש לעצב לפחות:

- Layout ראשי.
- Form.
- Inputs.
- Buttons.
- User Cards.
- Users Grid/List.
- Error state.
- Loading state.
- Dialog.
- Delete confirmation.

---

# דרישות UI בסיסיות

האפליקציה צריכה להיות:

- ברורה.
- קריאה.
- מסודרת.
- נוחה לשימוש.
- Responsive ברמה בסיסית.

לדוגמה:

במסך גדול ניתן להציג:

```text
3 User Cards בשורה
```

ובמסך קטן:

```text
User Card אחד בשורה
```

---

# חלק י"ד – Radix UI

יש להשתמש בלפחות **שני רכיבים / Primitives של Radix UI**.

שימוש מומלץ:

```text
Dialog
```

להצגת משתמש בודד.

ו:

```text
AlertDialog
```

לאישור מחיקה.

ניתן להשתמש ברכיבים נוספים לפי הצורך.

---

# חלק ט"ו – Environment Variables

אין לכתוב כתובות שרת מפוזרות בכל הפרויקט.

לא:

```ts
fetch("http://localhost:3000/users")
```

בעשרה קבצים שונים.

השתמשו במשתנה סביבה של Vite.

לדוגמה:

```env
VITE_API_URL=http://localhost:3000
```

ובקוד:

```ts
import.meta.env.VITE_API_URL
```

---

# חלק ט"ז – CORS

מכיוון שה־Frontend וה־Backend רצים על שרתים מקומיים שונים, יש לאפשר ל־Frontend לבצע בקשות אל ה־Backend.

לדוגמה:

```text
Frontend
localhost:5173
```

```text
Backend
localhost:3000
```

הגדירו CORS מתאים בצד השרת.

---

# חלק י"ז – API Types

מומלץ ליצור טיפוס משותף למבנה התשובות.

לדוגמה:

```ts
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}
```

ואז ניתן לקבל:

```ts
ApiResponse<PublicUser>
```

או:

```ts
ApiResponse<PublicUser[]>
```

זהו Generic Type.

לדוגמה:

```text
GET /users
```

יכול להחזיר:

```ts
ApiResponse<PublicUser[]>
```

ו:

```text
POST /users
```

יכול להחזיר:

```ts
ApiResponse<PublicUser>
```

---

# חלק י"ח – פונקציות Callback

גם פונקציות שעוברות בין קומפוננטות צריכות להיות מטופסות.

לדוגמה:

```ts
interface UserCardProps {
  user: PublicUser;
  onDelete: (id: string) => void;
}
```

או:

```ts
interface UserFormProps {
  onUserCreated: (user: PublicUser) => void;
}
```

כלומר גם פונקציה היא מידע שעובר דרך Props ולכן גם לה יש טיפוס.

---

# חלק י"ט – TypeScript Checklist

לפני ההגשה עברו על הקוד.

אסור למצוא בפרויקט:

```ts
any
```

```ts
as any
```

או פונקציות כמו:

```ts
function doSomething(data) {
}
```

בלי טיפוס.

---

## ודאו שיש טיפוסים עבור

- User.
- Public User.
- Create User Input.
- API Responses.
- Component Props.
- Callback Props.
- React State.
- Form State.
- Form Events.
- Input Events.
- API Function Parameters.
- API Function Return Values.
- Database Functions.
- Express Request Body.
- Express Params.
- MongoDB Collection.

---

# חלק כ' – הפרדת אחריות ב־Frontend

גם ב־Frontend אנחנו רוצים שכבות ברורות.

```text
Component
   ↓
Service / API
   ↓
Server
```

לא:

```text
UserCard
 ↓
MongoDB
```

וגם לא:

```text
כל Component
 ↓
fetch()
```

---

# Components

אחראים על:

```text
UI
Props
State
Events
```

---

# Services

אחראים על:

```text
HTTP Requests
API
```

---

# Types

אחראים על:

```text
מבנה המידע
```

---

# Backend

אחראי על:

```text
Business Logic
Database
MongoDB
```

---

# זרימת המערכת המלאה

## יצירת משתמש

```text
UserForm
   ↓
CreateUserInput
   ↓
usersApi.createUser()
   ↓
POST /users
   ↓
Express
   ↓
createUser()
   ↓
MongoDB
   ↓
PublicUser
   ↓
React State
   ↓
UserList
   ↓
UserCard
```

---

## הצגת משתמש

```text
UserCard
   ↓
View
   ↓
getUserById(id)
   ↓
GET /users/:id
   ↓
PublicUser
   ↓
UserDetailsDialog
```

---

## מחיקת משתמש

```text
UserCard
   ↓
Delete
   ↓
AlertDialog
   ↓
Confirm
   ↓
deleteUser(id)
   ↓
DELETE /users/:id
   ↓
MongoDB
   ↓
Update React State
```

---

# דרישות חובה להגשה

המערכת חייבת לכלול:

- [ ] Vite
- [ ] React
- [ ] TypeScript
- [ ] TailwindCSS
- [ ] Radix UI
- [ ] Express
- [ ] MongoDB
- [ ] MongoDB Collection בשם `users`
- [ ] טופס להוספת משתמש
- [ ] הצגת כל המשתמשים
- [ ] הצגת משתמש בודד
- [ ] מחיקת משתמש
- [ ] אישור לפני מחיקה
- [ ] לפחות שני רכיבי Radix UI
- [ ] Loading state
- [ ] Error state
- [ ] Empty state
- [ ] API Service נפרד
- [ ] Components נפרדים
- [ ] Props מטופסים
- [ ] State מטופס
- [ ] Events מטופסים
- [ ] API Functions מטופסות
- [ ] Database Functions מטופסות
- [ ] אין `any`
- [ ] אין `as any`
- [ ] אין password בתשובות מהשרת
- [ ] אין Refresh ידני לאחר יצירה או מחיקה

---

# בונוס

## Bonus 1 – Search

הוסיפו שדה חיפוש שמאפשר לחפש לפי:

```text
name
userName
email
```

גם ערך החיפוש צריך להיות מטופס.

---

## Bonus 2 – Custom Hook

צרו:

```ts
useUsers()
```

שיהיה אחראי על:

```text
users
loading
error
createUser
deleteUser
getUser
```

---

## Bonus 3 – Type Guard

המידע שמגיע מהשרת הוא מידע חיצוני.

לכן ניתן לקבל אותו בתור:

```ts
unknown
```

ולכתוב Type Guard שבודק האם הוא באמת:

```ts
PublicUser
```

לדוגמה מבחינה רעיונית:

```ts
function isPublicUser(data: unknown): data is PublicUser
```

---

## Bonus 4 – Shared Types

במקום ליצור טיפוסים זהים בנפרד ב־Frontend וב־Backend, צרו מקום משותף לטיפוסים שמשמשים את שני הצדדים.

לדוגמה:

```text
shared/
└── types/
    └── user.ts
```

כך גם ה־Server וגם ה־Client משתמשים באותו API Contract.

---

## Bonus 5 – Edit User

הוסיפו אפשרות לעריכת משתמש.

Backend:

```http
PUT /users/:id
```

Frontend:

```text
Edit User Dialog
```

צרו טיפוס מתאים:

```ts
UpdateUserInput
```

---

# שאלות שאתם צריכים לשאול את עצמכם בזמן העבודה

כאשר אתם כותבים קוד, שאלו:

```text
מה נכנס לפונקציה הזאת?
```

```text
מה היא מחזירה?
```

```text
מה הקומפוננטה הזאת מקבלת?
```

```text
איזה State היא מחזיקה?
```

```text
איזה מידע מגיע מהשרת?
```

```text
איזה מידע מותר להחזיר ללקוח?
```

```text
מה יכול להיות null?
```

```text
מה יכול להיכשל?
```

אם התשובה לשאלה היא:

> "לא יודע, TypeScript כבר יבין"

בדקו שוב את הקוד.

---

# מטרת הסיום

בסיום המטלה צריכה להיות לכם אפליקציית Full Stack עובדת:

```text
React + TypeScript
        ↓
Tailwind + Radix UI
        ↓
Typed API Service
        ↓
Express + TypeScript
        ↓
Typed Database Layer
        ↓
MongoDB
```

והעיקר:

> הטיפוסים צריכים לעבור יחד עם המידע לאורך כל האפליקציה.

המטרה היא לא רק לבנות ממשק שעובד.

המטרה היא לבנות מערכת שבה ברור בכל רגע **איזה מידע עובר בין ה־Frontend, ה־Server וה־Database**.