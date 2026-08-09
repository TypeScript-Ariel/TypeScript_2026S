import express from "express";

let app = express();
//TypeScript_2025\Server\public\public
app.use(express.json());
app.use((res, req, next) => {
  console.log("res " + res);
  next();
});
app.get("/", (req, res) => {
  res.status(200).send("Sorry, we cannot find that!");
});
app.get("/login", (req, res) => {
  res.send("Hello login");
});
app.get("/dashboard", (req, res) => {
  res.send("Hello dashboard");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
