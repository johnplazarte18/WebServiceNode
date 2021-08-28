//arrancar servidor
const express=require('express');
const app=express();

//middlewares
app.use(express.json());//trabaja con formato json y lo entienda el jvscript
app.use(express.urlencoded({extended:false}));//datos simples de un formulario
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
//routes
app.use(require('../routes/index'));

app.listen(4000);
console.log('servidor en puerto 4000');