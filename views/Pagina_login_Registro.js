//variables globales //
    const ocultarConfirmacion= document.getElementById("confirmacion")
    const ocultarValidacion= document.getElementById("validacion")
    const botonInicio = document.getElementById("resistrarse")
    const btnSignIn = document.getElementById("sign-in");
    const btnSignUp = document.getElementById("sign-up");
    const formRegister = document.querySelector(".register");
    const formLogin = document.querySelector(".login");

    btnSignIn.addEventListener("click", e =>{
    formRegister.classList.add("hide")
    formLogin.classList.remove("hide")
    })

    btnSignUp.addEventListener("click", e =>{
    formLogin.classList.add("hide")
    formRegister.classList.remove("hide")
    })
    //conexion a la base de datos//
    
    //funcion de iniciacion del formulario//
    function iniciarformulario(){
        ocultarConfirmacion.style.display = "none"
        ocultarValidacion.style.display ="none"
        botonInicio.addEventListener("click", diligenciarFormulario)
    }
    //funcion de validacion de que todos los campos fueron llenados correctamente //
    function diligenciarFormulario(){
        let nombreApellido = document.getElementById("nombres").value;
        let email = document.getElementById("email").value;
        let confirmeEmail = document.getElementById("confirmemail").value;
        let celular = document.getElementById("celular").value;
        let contraseña = document.getElementById("password").value;
        let confiemeContraseña= document.getElementById("confirmepassword").value;
            if (!nombreApellido || !email || !confirmeEmail || !celular || !contraseña ||  !confiemeContraseña){
            Validacion("por favor verifique que todos los campos fueron diligenciados correctamente");
            ocultarConfirmacion.style.display = "none"
            }
            else{
                confirmarCorreos()
                ocultarValidacion.style.display = "none"
            }   
    }
    //funcion de validacion de que los campos correo,su confirmacion la contaseña y su confirmacion son los mismos //
    function confirmarCorreos(){
        let email = document.getElementById("email").value;
        let confirmeEmail = document.getElementById("confirmemail").value;
        let contraseña = document.getElementById("password").value;
        let confiemeContraseña= document.getElementById("confirmepassword").value;
            if ( email===confirmeEmail && contraseña===confiemeContraseña){
            Confirmacion("el usuario fue registrado con exito");
            }
            else{
            Confirmacion("por favor verifique que su correo y contraseña coincidan");
            } 
    }
    function confirmarUsuario(){
        let email = document.getElementById("email").value;
        let contraseña = document.getElementById("contraseña").value;
        let confirmarCorreo = document.getElementById("correo-inicio").value;
        let confirmarContraseña = document.getElementById("contraseña-inicio").value;
        if(email===confirmarCorreo && contraseña===confirmarContraseña){

        }
        else{
            Denegada("el usuario no se encuentra registrado")
        }
    }
    //funciones para generar mensajes de alerta//
    function Confirmacion(mensaje){
        ocultarConfirmacion.style.display = "block"
        let mensajeConfirmacion=document.getElementById("confirmacion");
        mensajeConfirmacion.innerHTML=mensaje
    }
    function Validacion(mensaje){
        ocultarValidacion.style.display = "block"
        let mensajeValidacion=document.getElementById("validacion");
        mensajeValidacion.innerHTML=mensaje
    }

    function confirmarinicio(event) {
        const email = document.getElementById('correo-inicio').value;
        const password = document.getElementById('contraseña-inicio').value;
    
        if (!email || !password) {
            alert('Por favor, complete ambos campos.');
            return;
        }
    
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = 'Pagina_Agenda_Citas.ejs';  // Redirige al usuario si el login es exitoso
            } else {
                alert('Correo o contraseña incorrectos. Si aún no tienes cuenta, por favor regístrate primero.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error al intentar iniciar sesión. Por favor, intente de nuevo más tarde.');
        });
    }

    // Añadimos el event listener al botón después de cargar el DOM
    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('iniciarSesion').addEventListener('click', confirmarinicio);
    });
    
    window.addEventListener("load", iniciarformulario)
