"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
//TypeScript_2025\Server\public\public
app.use(express_1.default.json());
app.get("/", function (req, res) {
    res.send("Hello World");
});
app.listen(3000, function () {
    console.log("Server is running on http://localhost:3000");
});
