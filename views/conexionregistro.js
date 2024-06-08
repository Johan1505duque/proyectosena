const express = require("express");
const mysql = require("mysql");
const app = express();
const PORT = 3000;

const conexion = mysql.createConnection({
    host: "localhost",
    database: "unasspayj",
    user: "root",
    password: ""
});

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static('views'));
app.use(express.urlencoded({extended:false}))

app.set("view engine", "ejs");
app.get("/", function(req, res) {
    res.render("Pagina_login_Registro");
});


app.post("/validar", function(req, res) {
    const datos = req.body;
    console.log(datos);
    let nombre = datos.nombres;
    let emails=datos.email;
    let numero= datos.celular;
    let contrasenia = datos.password;

    const registrar = "INSERT INTO usuarios (nombres, email, celular, password) VALUES ('"+nombre+"','"+emails+"','"+numero+"','"+contrasenia+"')";
        conexion.query(registrar,function(error){
            if(error){
                throw error;
                }else{
                console.log("Datos almacenados correctamente");
                }
        });
});

app.listen(3000,function(){
    console.log("servidor creado http://localhost:3000")
})