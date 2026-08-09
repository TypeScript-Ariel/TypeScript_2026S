# תרגיל: יצירת שרת פשוט עם Express ו-TypeScript

## תיאור התרגיל
בתרגיל זה, תלמדו כיצד ליצור שרת פשוט באמצעות Node.js, Express ו-TypeScript. המטרה היא להבין כיצד TypeScript משתלב עם פרויקטים מבוססי Node.js, כולל טיפול בבקשות HTTP, שימוש בממשקים (Interfaces), ובדיקות סוגים.



## שלבים לביצוע

### 1. יצירת פרויקט
בצעו את הפקודות הבאות:

```bash
mkdir express-ts-server
cd express-ts-server
npm init -y
npm install express
npm install -D typescript ts-node @types/express @types/node
npx tsc --init
```

### 2. הגדרת TypeScript
עדכנו את הקובץ `tsconfig.json` כך שיראה כך:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

---



#### `src/index.ts`
```typescript
import express, { Request, Response } from 'express';

// ממשק למשתמש


// משתנה לאחסון משתמשים


// יצירת אפליקציית Express
const app = express();
app.use(express.json());

// נתיב לקבלת כל המשתמשים
app.get('/users', (req, res) => {
  res.json(users);
});

// נתיב להוספת משתמש חדש
app.post('/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// נתיב לקבלת משתמש לפי מזהה
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  res.json(user);
});

// הפעלת השרת
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

---

### 4. הרצת השרת
להרצת השרת השתמשו בפקודה הבאה:
```bash
npx ts-node src/index.ts
```

---

### 5. בדיקות
השתמשו ב-Postman, CURL או דפדפן כדי לבדוק את השרת:
- **GET `/users`**: מחזיר את רשימת המשתמשים.
- **POST `/users`**: יוצר משתמש חדש עם גוף בקשה JSON לדוגמה:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```
- **GET `/users/:id`**: מחזיר משתמש לפי מזהה.

---

## משימות

1. הגדירו ממשק משתמש כמו בשיעור שעבר
2. הגדירו מבנה נתונים מתאים לאחסון משתמשים
3. הגדירו טיפוסים בתוכנית, לכל משתנה חייב להיות טיפוס
4. הוסיפו נתיב למחיקת משתמש לפי מזהה (`DELETE /users/:id`).
5. הוסיפו בדיקה לפורמט תקין של דואר אלקטרוני בעת יצירת משתמש חדש.
6. בצעו הידור של הקוד ל-JavaScript באמצעות `tsc` והריצו את הקובץ שנוצר עם Node.js:
   ```bash
   npx tsc
   node dist/index.js
   ```
---
