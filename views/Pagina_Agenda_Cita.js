// variables costantes globales 
const Calendario = document.getElementById("calendario");
const portada= document.getElementById("logo");
const formulario= document.getElementById("formulario");
const inputdia = document.getElementById("fecha")
const inputhora =document.getElementById("hora")
const cita =document.getElementById("citaAgendada");
const botonagendar = document.getElementById("AgendarCita");
const botonhoras1 = document.getElementById("bloques");
const botonhoras2 = document.getElementById("bloques2");
const botoniconos= document.getElementById("redes")
const mensaje1 = document.getElementById("mensaje1");
const mensaje2 = document.getElementById("mensaje2");
const menconfirme =document.getElementById("confirmar");
const tipoServi = document.getElementById("tipoServicio");
const manicurista = document.getElementById("manicurista");
//variables de llamado a calses 
let botonesdia = document.querySelectorAll(".Dia");
let botonHora = document.querySelectorAll(".Hora");
let diaok = document.querySelector('.diaselec');
let horaacti = document.querySelector('.selec');
//variables vacias
let Dia="";
let Hora="";
let texhora = "";
let texdia ="";
let texservicio ="";
//desactivactivacion de secciones 
menconfirme.style.display ="none";
cita.style.display ="none";
mensaje1.style.display = "none";
mensaje2.style.display = "none";
Calendario.style.display = "none";
botonhoras1.style.display = "none";
botonhoras2.style.display = "none";
botonagendar.style.display = "none";
function selecdia(dia){
    Dia = dia
    //busca el elemento seleccionado con esta clase en css y le quita sus propiedades 
    if (diaok) {
        diaok.classList.remove("diaselec");
    }
    //funcion retorna sus caracteristicas al boton anteriormente seleccionado iterando por medio de forEACH
    botonesdia.forEach(function(boton) {
        boton.classList.remove("diaselec");
    });
    //le cambia el color al boton seleccionada 
    let diaactual = document.getElementById(`Dia${dia}`);
    diaactual.classList.add("diaselec");
    // se selecciona servicio para activar el horario
    if(servicio ==="Manicure básico"|| servicio ==="Pedicure básico"||servicio ==="Esmaltado permanente"||servicio ==="Uñas de gel"||servicio ==="Pedicure spa"){
        botonhoras1.style.display = "block";
        botonhoras2.style.display = "none";
    }
    else {
        botonhoras2.style.display = "block";
        botonhoras1.style.display = "none";
    }
}
//se crea un areglo de los botones dia 
botonesdia.forEach(function(boton) {
    //escuchamos el ecento de clic de los botones del horario y trae el texto de cada boton seleccionado
    boton.addEventListener('click', function() {
        Dia= document.getElementById("dias").value
         texdia = this.textContent;
         confirmarfechas()
         formulario.style.display = "none";
         inputdia.value = texdia;
         console.log(texdia)
        });
    });
    // esta funcion activa el horario que se habilito el servicio
    function selechora(hora){
    Hora = hora;
    if (horaacti) {
        horaacti.classList.remove("selec");
    }
    botonHora.forEach(function(boton) {
        //escuchamos el ecento de clic de los botones del horario y trae el texto de cada boton seleccionado
        boton.addEventListener('click', function() {
            Hora= document.getElementById("bloques").value
            texhora = this.textContent; 
            confirmarfechas()
            inputhora.value = texhora;
            console.log(texhora)
            //quita todas las propiedades que tenga el boton seleccionado 
            botonHora.forEach(function(boton) {
                boton.classList.remove("selec");
            });
            //le establece las propiedaades de la clase (selec)de css al boton seleccionado 
            this.classList.add('selec');
        });
    });
    
    // funcion que cambia el color del boton selecionada //
    let horaselec = document.getElementById(`hora${hora}`);
    horaselec.classList.add("selec");
    mensaje2.style.display = "block";
    botonagendar.style.display = "block";
}



// funcion que escucha el manucurisata seleccionado
function maniSelec() {
    return manicurista.options[manicurista.selectedIndex].text;
}
// fuincion que escucha el tipo de servicio  seleccionado 
function serviSelec() {
    return tipoServi.options[tipoServi.selectedIndex].text;
}
//por medio de esta funcion se verifica que los campos sean seleccionados correctamente 
function camposSelec(){
    profesional =maniSelec();
    servicio = serviSelec() 
    
    if (profesional && servicio  ){
        Calendario.style.display = "block"
        portada.style.display = "none"
    }
}
//almacena la  manicurista seleccionada 
document.addEventListener("DOMContentLoaded", function() {
        profecional= document.getElementById("manicurista").value
        document.getElementById("manicurista").addEventListener("change", function() {
            camposSelec()
        }); 
        // se activan los horarios disponibles 
        document.getElementById("tipoServicio").addEventListener("change", function() {
            servicio= document.getElementById("tipoServicio").value
             texservicio= this.textContent
                camposSelec()
        });      
});

function confirmarfechas(){
    mensaje1.style.display = "block"
    mensaje2.style.display = "block"
    let iyemensaje1=document.getElementById("mensaje1");
    let iyemensaje2=document.getElementById("mensaje2");
    iyemensaje1.innerHTML= "tu cita será agendada para el día"+" " + texdia + " "+ " de MARZO con la profesional "+ " " +" "+profesional+" "+"el servicio a realizar es"+ " "+servicio + " "
    iyemensaje2.innerHTML="la hora de tu cita sera a las "+ " "+ texhora +" " + "recuerda llegar con 5 minutos de anticipacion" 
}
function confirmardatos(){
    mensaje1.style.display = "none"
    mensaje2.style.display = "none"
    menconfirme.style.display = "block"
    let iyeconfirmacion=document.getElementById("confirmar");
      if(texdia !=="" && profesional !==""  && servicio !==""  && texhora !=="" ){
        iyeconfirmacion.innerHTML= "tu cita fue agendada con exito"
      }else{
        iyeconfirmacion.innerHTML="tu cita se a podigo agendar"
      }
}