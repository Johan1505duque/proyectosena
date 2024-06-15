// Constantes globales
const formulario = document.getElementById("formulario");
const botonhoras1 = document.getElementById("bloques");
const modificarCita = document.getElementById("lista-citas");
const mensaje1 = document.getElementById("mensaje1");
const mensaje2 = document.getElementById("mensaje2");
const mensaje3 = document.getElementById("confirmar");
const agendarcita = document.getElementById("AgendarCita");
const Calendario = document.getElementById("Calendario");
const bienvenida = document.getElementById("logo");
const redesSociales = document.getElementById("redes");
const botonRetornar = document.getElementById("retornar");
const portada = document.getElementById("encabezadoAgenda");
const encabezado = document.getElementById("gracias");
const inicio = document.getElementById("inicio");
const botonReagendar = document.createElement("button");

let texdia = "";
let texhora = "";
let Manicurista = "";
let Servicio = "";
let fechaseleccionada = "";

let citaAgendada = true;
// Arreglos globales que almacenan los horarios de los servicios
let horario = ['7Am', '8Am', '9Am', '10Am', '11Am', '12Am', '2Pm', '3Pm', '4Pm', '5Pm', '6Pm', '7Pm'];
let horario2 = ['7Am', '9Am', '11Am', '2Pm', '4Pm', '6Pm'];

encabezado.style.display = "none";
botonRetornar.style.display = "none";
agendarcita.style.display = "none";
mensaje2.style.display = "none";
mensaje3.style.display = "none";
Calendario.style.display = "none";
formulario.style.display = "none";
modificarCita.style.display = "none";

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("manicurista").addEventListener("change", function () {
        Manicurista = manicurista.value;
        camposSelect();
    });
    document.getElementById("servicio").addEventListener("change", function () {
        Servicio = servicio.value;
        camposSelect();
    });
});

// Función que verifica que los campos manicurista y servicio fueron seleccionados correctamente
function camposSelect() {
    if (Manicurista && Servicio) {
        confirmarfechas();
        formulario.style.display = "none";
        Calendario.style.display = "block";
        bienvenida.style.display = "none";
        redesSociales.style.display = "none";
    }
}
function agendadisponible(){
    formulario.style.display = "block";
    inicio.style.display = "none";
}
function ActualizarCita(){
    modificarCita.style.display = "block";
    inicio.style.display = "none";
    redesSociales.style.display = "none";
    portada.style.display = "none";
    bienvenida.style.display = "none";
}

// Calendario
const calendario = document.getElementById('Calendario');
let mesActual;
let anioActual;

// Función para mostrar el calendario de un mes específico de un año
function mostrarMes(mes, anio) {
    mesActual = mes;
    anioActual = anio;

    const encabezadoMesAnio = document.createElement('div');
    const contenedorBotones = document.createElement('div');
    contenedorBotones.classList.add('button-container');

    const botonAnterior = document.createElement('button');
    const botonSiguiente = document.createElement('button');
    botonAnterior.textContent = '<';

    encabezadoMesAnio.textContent = `${obtenerNombreMes(mes)} ${anio} `;
    calendario.innerHTML = '';
    encabezadoMesAnio.classList.add('month-year');
    calendario.appendChild(contenedorBotones);
    botonAnterior.addEventListener('click', mesAnterior);

    botonSiguiente.textContent = '>';
    botonSiguiente.addEventListener('click', mesSiguiente);

    contenedorBotones.appendChild(botonAnterior);
    contenedorBotones.appendChild(encabezadoMesAnio);
    contenedorBotones.appendChild(botonSiguiente);

    const tabla = document.createElement('table');
    tabla.classList.add('month-table');

    const diasDeLaSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const filaEncabezado = document.createElement('tr');
    diasDeLaSemana.forEach(dia => {
        const th = document.createElement('th');
        th.textContent = dia;
        filaEncabezado.appendChild(th);
    });
    tabla.appendChild(filaEncabezado);

    const primerDiaDelMes = new Date(anio, mes, 1);
    const ultimoDiaDelMes = new Date(anio, mes + 1, 0);
    const diaDeInicio = primerDiaDelMes.getDay();
    const totalDias = ultimoDiaDelMes.getDate();

    let fecha = 1;
    for (let i = 0; i < 6; i++) {
        const fila = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            const td = document.createElement('td');
            if (i === 0 && j < diaDeInicio) {
                td.textContent = '';
                td.classList.add('past-day');
            } else if (fecha > totalDias) {
                td.textContent = "";
                td.classList.add('past-day');
            } else {
                td.textContent = fecha;
                if (anio < new Date().getFullYear() || (anio === new Date().getFullYear() && mes < new Date().getMonth()) || (anio === new Date().getFullYear() && mes === new Date().getMonth() && fecha < new Date().getDate())) {
                    td.classList.add('past-day');
                } else {
                    td.textContent = fecha;
                    td.addEventListener('click', (function (fechaActual) {
                        return function () {
                            fechaseleccionada = `${anio}/${mes + 1}/${fechaActual}`;
                            texdia = fechaseleccionada;
                            selecdia();
                        }
                    })(fecha));
                }
                fecha++;
            }
            fila.appendChild(td);
        }
        tabla.appendChild(fila);
    }

    calendario.appendChild(tabla);
}

// Función para obtener el nombre del mes
function obtenerNombreMes(mes) {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return meses[mes];
}

// Función para ir al mes anterior
function mesAnterior() {
    mesActual--;
    if (mesActual < 0) {
        mesActual = 11;
        anioActual--;
    }
    mostrarMes(mesActual, anioActual);
}

// Función para ir al mes siguiente
function mesSiguiente() {
    mesActual++;
    if (mesActual > 11) {
        mesActual = 0;
        anioActual++;
    }
    mostrarMes(mesActual, anioActual);
}

// Mostrar el calendario del mes actual al cargar la página
const hoy = new Date();
mostrarMes(hoy.getMonth(), hoy.getFullYear());

// Función que al seleccionar el día despliega el horario de servicio
function selecdia() {
    texdia = fechaseleccionada;
    confirmarfechas();

    fetch("/consulta", {
        method: "POST",
        body: JSON.stringify({
            manicurista: Manicurista,
            servicio: Servicio,
            fecha: texdia
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }
        return response.json();
    })
    .then(cita => {
        console.log(cita);

        let horasconsultas = [];

        cita.forEach(consulta => {
            const horaConsulta = consulta.hora.trim();  // Asegurarse de que coincida con el campo de la base de datos
            horasconsultas.push(horaConsulta);
        });

        // Remover la clase 'selected-day' de todos los elementos td (días) del calendario
        const allDays = document.querySelectorAll('#Calendario td');
        allDays.forEach(day => {
            day.classList.remove('selected-day');
        });

        // Agregar la clase 'selected-day' al día seleccionado
        const selectedDay = document.querySelector(`#Calendario td[data-date="${fechaseleccionada}"]`);
        if (selectedDay) {
            selectedDay.classList.add('selected-day');
        }

        // Filtrar las horas disponibles
        const horasDisponibles = horario.filter(hora => !horasconsultas.includes(hora));
        const horasDisponiblesFiltradas = filtrarHorasPasadas(horasDisponibles, texdia);  // Filtrar horas pasadas aquí

        // Limpiar el contenido anterior
        botonhoras1.innerHTML = ''; // Limpiar el contenido antes de agregar los nuevos botones
        const tituloHorasDisponibles = document.createElement('h3');
        tituloHorasDisponibles.textContent = 'Horas disponibles';
        botonhoras1.appendChild(tituloHorasDisponibles);

        // Crear botones para cada hora disponible
        horasDisponiblesFiltradas.forEach(hora => {
            const botonHora = document.createElement('button');
            botonHora.textContent = hora;
            botonHora.classList.add('botonH'); // Clase actualizada para coincidir con la clase en el CSS
            // Event listener para el clic en una hora disponible
            botonHora.addEventListener('click', function () {
                console.log(`Hora seleccionada: ${hora}`);
                texhora = hora;
                mensaje2.innerHTML = `Tu cita se llevará a cabo el día ${texdia}. A las ${texhora}.`;
                mensaje2.style.display = "block";
                agendarcita.style.display = "block";
            });
            botonhoras1.appendChild(botonHora);
        });

        console.log(horasDisponiblesFiltradas);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // Mostrar u ocultar el contenedor de botones de horas según el tipo de servicio seleccionado
    if (Servicio === "manicure Básico" || Servicio === "pedicure Básico" || Servicio === "esmaltado Permanente" || Servicio === "uñas Acrílicas" || Servicio === "uñas De Gel") {
        botonhoras1.style.display = "none"; // Ocultar el contenedor si no se requieren horas
    } else {
        botonhoras1.style.display = "block"; // Mostrar el contenedor si se requieren horas
    }
}


// Función que almacena mensajes informativos 
function confirmarfechas() {
    mensaje1.innerHTML = `Tu cita será atendida por ${manicurista.options[manicurista.selectedIndex].text}. El servicio a realizar es ${servicio.options[servicio.selectedIndex].text}.`;
    mensaje2.innerHTML = `Tu cita se llevará a cabo el día ${texdia}. A las ${texhora}.`;
    mensaje3.innerHTML = 'Tu cita fue agendada con éxito. Recuerda llegar con 5 minutos de anterioridad.';
}

function filtrarHorasPasadas(horas, fechaSeleccionada) {
    const ahora = new Date();
    const diaActual = ahora.getDate();
    const mesActual = ahora.getMonth();
    const anioActual = ahora.getFullYear();
    
    const fechaEntrada = new Date(fechaSeleccionada);
    const diaEntrada = fechaEntrada.getDate();
    const mesEntrada = fechaEntrada.getMonth();
    const anioEntrada = fechaEntrada.getFullYear();

    // Verifica si la fecha seleccionada es el día actual
    if (diaEntrada !== diaActual || mesEntrada !== mesActual || anioEntrada !== anioActual) {
        // Si no es el día actual, no se ejecuta el filtrado
        return horas;
    }

    const horaActual = ahora.getHours();
    const minutosActuales = ahora.getMinutes();

    return horas.filter(hora => {
        const [horaNum, periodo] = hora.match(/\d+|\D+/g); // Separar número y AM/PM
        let hora24 = parseInt(horaNum);

        if (periodo.toLowerCase() === 'pm' && hora24 !== 12) {
            hora24 += 12;
        } else if (periodo.toLowerCase() === 'am' && hora24 === 12) {
            hora24 = 0;
        }

        // Si la hora del bloque es menor o igual que la hora actual, o si son iguales y los minutos actuales son mayores o iguales, no se muestra
        if (hora24 < horaActual || (hora24 === horaActual && minutosActuales >= 0)) {
            return false;
        }

        return true;
    });
}


// Función que envía datos a la base de datos
function confirmardatos() {
    let datos = {
        manicurista: Manicurista,
        servicio: Servicio,
        fecha: texdia,
        hora: texhora
    };

    fetch('/cita', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud de agendar cita');
        }
        return response.text(); // Obtener la respuesta como texto sin procesar
    })
    .then(data => {
        console.log('Respuesta recibida:', data); // Imprimir la respuesta recibida
        if (data.includes('Datos insertados correctamente')) {
            console.log('Cita registrada correctamente');
            retornar();
        } else {
            throw new Error('Error al agendar la cita: ' + data); // Lanzar un error con la respuesta recibida
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Mostrar un mensaje de error al usuario
        alert('Error al agendar la cita. Por favor, inténtalo de nuevo más tarde.');
    });
}
document.addEventListener("DOMContentLoaded", function () {
    // Al cargar la página, obtener y mostrar las citas
    obtenerCitas();
});

function obtenerCitas() {
    fetch("/citas", {
        method: "GET"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al obtener las citas");
        }
        return response.json();
    })
    .then(citas => {
        // Una vez que se obtengan las citas, mostrarlas en la página
        mostrarCitas(citas);
    })
    .catch(error => {
        console.error("Error:", error);
        // Manejar el error si no se pueden obtener las citas
    });
}

function mostrarCitas(citas) {
    const listaCitas = document.getElementById("lista-citas");

    // Limpiar cualquier contenido anterior en la lista de citas
    listaCitas.innerHTML = "";

    // Limpiar cualquier contenido anterior en la lista de citas
    listaCitas.innerHTML = "";

    // Crear la tabla y sus encabezados
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    thead.innerHTML = `
        <tr>
            <th>Manicurista</th>
            <th>Servicio</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Acciones</th>
        </tr>
    `;

    // Iterar sobre las citas y agregarlas a la tabla
    citas.forEach(cita => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${cita.manicurista}</td>
            <td>${cita.servicio}</td>
            <td>${cita.fecha}</td>
            <td>${cita.hora}</td>
            <td>
                <button class="eliminar" onclick="eliminarCita(${cita.id})">Eliminar</button>
                <button id="boton-reagendar" class="reagendar" onclick="mostrarFormularioReagendar(${cita.id}, '${cita.manicurista}', '${cita.fecha}', '${cita.hora}', '${cita.servicio}')">Reagendar</button>
            </td>
        `;

        tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    listaCitas.appendChild(table);

    // Iterar sobre las citas y agregarlas al elemento en la página
    citas.forEach(cita => {
        const citaElemento = document.createElement("div");
        citaElemento.style.display = "none";
        citaElemento.textContent = `ID: ${cita.id}, Manicurista: ${cita.manicurista}, Servicio: ${cita.servicio}, Fecha: ${cita.fecha}, Hora: ${cita.hora}`;

        // Crear botones para eliminar y reagendar
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.addEventListener("click", function() {
            // Lógica para eliminar la cita
            eliminarCita(cita.id);
        });
        botonReagendar.textContent = "Reagendar";
        botonReagendar.addEventListener("click", function() {
            // Lógica para reagendar la cita
            actualizarCita(cita.id);
        });
        

        // Agregar botones a la cita
        citaElemento.appendChild(botonEliminar);
        citaElemento.appendChild(botonReagendar);

        listaCitas.appendChild(citaElemento);
    });
}

// JavaScript para manejar eventos de clic en los botones de acción en las citas
document.addEventListener("DOMContentLoaded", function () {
    const citas = document.querySelectorAll(".cita"); // Obtener todas las citas

    citas.forEach(cita => {
        const botonEliminar = cita.querySelector(".eliminar");
        const botonReagendar = cita.querySelector(".reagendar");
        botonEliminar.addEventListener("click", function() {
            const confirmacion = confirm("¿Estás seguro que deseas eliminar esta cita?");
            if (confirmacion) {
                const idCita = cita.dataset.id; // Obtener el ID de la cita desde el atributo data
                eliminarCita(idCita);
            }
        });

        botonReagendar.addEventListener("click", function() {
            const idCita = cita.dataset.id; // Obtener el ID de la cita desde el atributo data
            mostrarFormularioReagendar(idCita);
        });
    });
});

function eliminarCita(id) {
    // Confirmar si el usuario realmente desea eliminar la cita
    if (confirm("¿Estás seguro de que quieres eliminar esta cita?")) {
        // Enviar una solicitud al servidor para eliminar la cita con el ID proporcionado
        fetch(`/eliminar-cita/${id}`, {
            method: "DELETE"
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo eliminar la cita. Error del servidor: " + response.statusText);
            }
            // Si la solicitud se procesa correctamente, actualizar la lista de citas en la página
            obtenerCitas(); // Vuelve a cargar las citas después de eliminar una
        })
        .catch(error => {
            console.error("Error:", error);
            // Manejar el error si no se puede eliminar la cita
            alert("Error al eliminar la cita. Detalles del error: " + error.message);
        });
    }
}
// Event listener para el botón "Reagendar" en cada cita
botonReagendar.addEventListener("click", function() {
    const idCita = cita.dataset.id; // Obtener el ID de la cita desde el atributo data
    mostrarFormularioReagendar(idCita);
});

let idCitaAReagendar = null;

function mostrarFormularioReagendar(idCita, manicuristaActual, fechaActual, horaActual, servicioActual) {
    idCitaAReagendar = idCita;

    // Mostrar el formulario de reagendar
    const formularioReagendar = document.getElementById("formulario-reagendar");
    formularioReagendar.style.display = "block";
   
    // Rellenar los campos del formulario con los datos actuales de la cita
    document.getElementById("manicurista-reagendar").value = manicuristaActual;
    document.getElementById("servicio-reagendar").value = servicioActual;
    document.getElementById("fecha-reagendar").value = fechaActual.split(" ")[0]; // Ajustar formato de fecha si es necesario
    document.getElementById("hora-reagendar").value = horaActual;

    // Event listener para el botón Guardar
    document.getElementById("guardar-reagendar").addEventListener("click", function() {
        const nuevaManicurista = document.getElementById("manicurista-reagendar").value;
        const nuevoServicio = document.getElementById("servicio-reagendar").value;
        const nuevaFecha = document.getElementById("fecha-reagendar").value;
        const nuevaHora = document.getElementById("hora-reagendar").value;

        actualizarCita(idCitaAReagendar, nuevaManicurista, nuevoServicio, nuevaFecha, nuevaHora);
    });

    // Event listener para el botón CancelarSñ
    document.getElementById("cancelar-reagendar").addEventListener("click", function() {
        formularioReagendar.style.display = "none";
    });
}

function actualizarCita(idCita, nuevaManicurista, nuevoServicio, nuevaFecha, nuevaHora) {
    fetch(`/actualizar-cita/${idCita}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            manicurista: nuevaManicurista,
            servicio: nuevoServicio,
            fecha: nuevaFecha,
            hora: nuevaHora
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al actualizar la cita");
        }
        return response.json(); // Suponiendo que la respuesta sea JSON
    })
    .then(data => {
        if (data.success) {
            alert("Cita actualizada exitosamente");
            // Ocultar el formulario de reagendar
            document.getElementById("formulario-reagendar").style.display = "none";
            // Recargar las citas
            obtenerCitas();
        } else {
            alert("Error al actualizar la cita: " + data.message);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error al actualizar la cita. Por favor, inténtalo de nuevo más tarde.");
    });
}
// Asegúrate de tener los manicuristas, servicios y horarios llenados dinámicamente o estáticamente.
// A continuación se muestra un ejemplo estático para simplicidad.
document.addEventListener("DOMContentLoaded", function() {
    const manicuristas = ["Aura lopez", "Leidy Camargo","Adrina Perez","Camila Martinez"];
    const servicios = ["manicureBásico", "pedicureBásico", "esmaltadoPermanente","esmaltadoPermanente","manicureFrancés","pedicureFrancés","uñasAcrílicas","uñasDeGel","decoraciónDeUñas","manicureSpa","pedicureSpa"];
    const horas = ['7Am', '8Am', '9Am', '10Am', '11Am', '12Am', '2Pm', '3Pm', '4Pm', '5Pm', '6Pm', '7Pm'];

    const selectManicurista = document.getElementById("manicurista-reagendar");
    manicuristas.forEach(manicurista => {
        const option = document.createElement("option");
        option.value = manicurista;
        option.textContent = manicurista;
        selectManicurista.appendChild(option);
    });

    const selectServicio = document.getElementById("servicio-reagendar");
    servicios.forEach(servicio => {
        const option = document.createElement("option");
        option.value = servicio;
        option.textContent = servicio;
        selectServicio.appendChild(option);
    });

    const selectHora = document.getElementById("hora-reagendar");
    horas.forEach(hora => {
        const option = document.createElement("option");
        option.value = hora;
        option.textContent = hora;
        selectHora.appendChild(option);
    });

    let idCitaAReagendar = null;

    window.mostrarFormularioReagendar = function(idCita, manicuristaActual, fechaActual, horaActual, servicioActual) {
        idCitaAReagendar = idCita;

        // Mostrar el formulario de reagendar
        const formularioReagendar = document.getElementById("formulario-reagendar");
        formularioReagendar.style.display = "block";
        modificarCita.style.display = "none";

        // Rellenar los campos del formulario con los datos actuales de la cita
        document.getElementById("manicurista-reagendar").value = manicuristaActual;
        document.getElementById("servicio-reagendar").value = servicioActual;
        document.getElementById("fecha-reagendar").value = fechaActual.split(" ")[0]; // Ajustar formato de fecha si es necesario
        document.getElementById("hora-reagendar").value = horaActual;

        // Event listener para el botón Guardar
        document.getElementById("guardar-reagendar").onclick = function() {
            const nuevaManicurista = document.getElementById("manicurista-reagendar").value;
            const nuevoServicio = document.getElementById("servicio-reagendar").value;
            const nuevaFecha = document.getElementById("fecha-reagendar").value;
            const nuevaHora = document.getElementById("hora-reagendar").value;

            actualizarCita(idCitaAReagendar, nuevaManicurista, nuevoServicio, nuevaFecha, nuevaHora);
            botonRetornar.style.display = "block";
            modificarCita.style.display = "block";
        };

        // Event listener para el botón Cancelar
        document.getElementById("cancelar-reagendar").onclick = function() {
            formularioReagendar.style.display = "none";
            modificarCita.style.display = "none";
            retornar() 
        };
    }
});



// Función que recarga la página para agendar una nueva cita
function retornar() {
    if (citaAgendada) {
        portada.style.display = "none";
        agendarcita.style.display = "none";
        mensaje1.style.display = "none";
        mensaje2.style.display = "none";
        botonhoras1.style.display= "none";
        Calendario.style.display = "none";
        encabezado.style.display = "block";
        botonRetornar.style.display = "block";
        mensaje3.style.display = "block";
        citaAgendada = false;
    } else {
        window.location.href = "/";
    }
}
