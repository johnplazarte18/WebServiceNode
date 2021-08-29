//arrancar servidor
const express = require("express");
const app = express();

//middlewares
app.use(express.json()); //trabaja con formato json y lo entienda el jvscript
app.use(express.urlencoded({ extended: false })); //datos simples de un formulario
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});
//routes
app.use(require("./routers/index.js"));

app.listen(4000, "192.168.56.1"); // Cambiar la ip por la ip de despliegue o URL
console.log("Su servidor esta ejecutando en: http://192.168.56.1:4000");
