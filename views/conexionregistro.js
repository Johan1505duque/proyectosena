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

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    console.log(`Intentando iniciar sesión con el correo: ${email}`);
    
    const query = "SELECT * FROM usuarios WHERE email = ? AND password = ?";
    conexion.query(query, [email, password], (error, results) => {
        if (error) {
            console.error('Error en la consulta de login:', error);
            res.status(500).send('Error en la consulta de login');
        } else {
            if (results.length > 0) {
                // Si el login es exitoso, redirigir a la página de agenda
                res.redirect("/agenda"); // O redirige a otra página de tu elección
            } else {
                // Si no se encuentra el usuario, podrías mostrar un mensaje o redirigir a una página de error
                res.json({ success: false, message: 'Usuario no encontrado, por favor regístrese.' });
            }
        }
    });
});

app.listen(3000,function(){
    console.log("servidor creado http://localhost:3000")
})