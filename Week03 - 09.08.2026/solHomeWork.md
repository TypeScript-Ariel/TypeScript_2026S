### פיתרון לתרגיל

#### קובץ `src/index.ts` 
```typescript
import express, { Request, Response } from 'express';

// ממשק למשתמש
interface User {
  id: number;
  name: string;
  email: string;
}

// משתנה לאחסון משתמשים
const users: User[] = [];

// יצירת אפליקציית Express
const app = express();
app.use(express.json());

// נתיב לקבלת כל המשתמשים
app.get('/users', (req: Request, res: Response) => {
  res.json(users);
});

// נתיב להוספת משתמש חדש
app.post('/users', (req: Request, res: Response) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  const newUser: User = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// נתיב לקבלת משתמש לפי מזהה
app.get('/users/:id', (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  res.json(user);
});

// נתיב למחיקת משתמש לפי מזהה
app.delete('/users/:id', (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found.' });
  }

  users.splice(userIndex, 1);
  res.status(200).json({ message: `User with id ${userId} was deleted.` });
});

// הפעלת השרת
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

---

### בדיקות
#### GET `/users`
- בדקו את רשימת המשתמשים (אמור להיות ריק בהתחלה).

#### POST `/users`
- הוסיפו משתמש חדש עם גוף בקשה:
  ```json
  {
    "name": "Alice",
    "email": "alice@example.com"
  }
  ```
- נסו לשלוח בקשה עם דוא"ל לא תקין:  
  ```json
  {
    "name": "Alice",
    "email": "not-an-email"
  }
  ```

#### GET `/users/:id`
- בדקו משתמש לפי מזהה קיים.  
- נסו לקבל משתמש שלא קיים.

#### DELETE `/users/:id`
- מחקו משתמש לפי מזהה קיים.  
- נסו למחוק משתמש שלא קיים.

---

### הרצת הקוד
1. הפעלת השרת:
   ```bash
   npx ts-node src/index.ts
   ```
2. הידור והפעלה לאחר הידור:
   ```bash
   npx tsc
   node dist/index.js
   ```