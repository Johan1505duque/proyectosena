// Constantes globales
const formulario = document.getElementById("formulario");
const botonhoras1 = document.getElementById("bloques");
const botonhoras2 = document.getElementById("bloques2");
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

let texdia = "";
let texhora = "";
let Manicurista = "";
let Servicio = "";
let fechaseleccionada = "";

let citaAgendada = true;
// Arreglos globales que almacenan los horarios de los servicios
let horario = [];
let horario2 = [];

encabezado.style.display = "none";
botonRetornar.style.display = "none";
agendarcita.style.display = "none";
mensaje2.style.display = "none";
mensaje3.style.display = "none";
Calendario.style.display = "none";

// Horario tipo 1
horario.push('7Am', '8Am', '9Am', '10Am', '11Am', '12Am', '2Pm', '3Pm', '4Pm', '5Pm', '6Pm', '7Pm');

// Horario tipo 2
horario2.push('7Am', '9Am', '11Am', '2Pm', '4Pm', '6Pm');

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("manicurista").addEventListener("change", function() {
        Manicurista = manicurista.value;
        camposSelect();
    });
    document.getElementById("servicio").addEventListener("change", function() {
        Servicio = servicio.value;
        camposSelect();
    });
});

// Función que verifica que los campos manicurista y servicio fueron seleccionados correctamente
function camposSelect() {
    if (Manicurista && Servicio) {
        confirmarfechas();
        Calendario.style.display = "block";
        formulario.style.display = "none";
        bienvenida.style.display = "none";
        redesSociales.style.display = "none";
    }
}

// Calendario
const calendar = document.getElementById('Calendario');
let currentMonth;
let currentYear;

// Función para mostrar el calendario de un mes específico de un año
function showMonth(month, year) {
    currentMonth = month;
    currentYear = year;

    const monthYearHeader = document.createElement('div');
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const previousButton = document.createElement('button');
    const nextButton = document.createElement('button');
    previousButton.textContent = '<';

    monthYearHeader.textContent = `${getMonthName(month)} ${year} `;
    calendar.innerHTML = '';
    monthYearHeader.classList.add('month-year');
    calendar.appendChild(buttonContainer);
    previousButton.addEventListener('click', previousMonth);

    nextButton.textContent = '>';
    nextButton.addEventListener('click', nextMonth);

    buttonContainer.appendChild(previousButton);
    buttonContainer.appendChild(monthYearHeader);
    buttonContainer.appendChild(nextButton);

    const table = document.createElement('table');
    table.classList.add('month-table');

    const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const headerRow = document.createElement('tr');
    daysOfWeek.forEach(day => {
        const th = document.createElement('th');
        th.textContent = day;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startingDay = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();

    let date = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            const td = document.createElement('td');
            if (i === 0 && j < startingDay) {
                td.textContent = '';
                td.classList.add('past-day');
            } else if (date > totalDays) {
                td.textContent = "";
                td.classList.add('past-day');
            } else {
                td.textContent = date;
                if (year < new Date().getFullYear() || (year === new Date().getFullYear() && month < new Date().getMonth()) || (year === new Date().getFullYear() && month === new Date().getMonth() && date < new Date().getDate())) {
                    td.classList.add('past-day');
                } else {
                    td.textContent = date;
                    td.addEventListener('click', (function(currentDate) {
                        return function() {
                            fechaseleccionada = `${year}/${month + 1}/${currentDate}`;
                            texdia = fechaseleccionada;
                            selecdia(fechaseleccionada);
                        }
                    })(date));
                }
                date++;
            }
            row.appendChild(td);
        }
        table.appendChild(row);
    }

    calendar.appendChild(table);
}

// Función para obtener el nombre del mes
function getMonthName(month) {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return months[month];
}

// Función para ir al mes anterior
function previousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    showMonth(currentMonth, currentYear);
}

// Función para ir al mes siguiente
function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    showMonth(currentMonth, currentYear);
}

// Mostrar el calendario del mes actual al cargar la página
const today = new Date();
showMonth(today.getMonth(), today.getFullYear());

// Función que al seleccionar el día despliega el horario de servicio
function selecdia(fechaseleccionada) {
    texdia = fechaseleccionada;
    console.log(fechaseleccionada)
    confirmarfechas();
    const url = `http://localhost:3000/consulta/${Manicurista}/${Servicio}/${texdia}`;
    console.log(url)
    fetch(url)
        .then(response => response.json())
        .then(cita => {
            console.log(cita);

            let horasconsultas = [];

            cita.forEach(consulta => {
                const horaConsulta = consulta.Hora.trim();
                horasconsultas.push(horaConsulta);
            });

            const horasDisponibles = horario.filter(hora => ! horasconsultas.includes(hora));

            botonhoras1.innerHTML = '';
            const encabesadohoras = document.createElement('h4');
            encabesadohoras.textContent = 'Horas Disponibles';
            botonhoras1.appendChild(encabesadohoras);

            horasDisponibles.forEach(hora => {
                const botonHora = document.createElement('button');
                botonHora.textContent = hora;
                botonHora.classList.add('botonH', 'botonH-success');
                botonHora.addEventListener('click', function() {
                    console.log(`Hora seleccionada: ${hora}`);
                    texhora = hora;
                    mensaje2.style.display = "block";
                    agendarcita.style.display = "block";
                });
                botonhoras1.appendChild(botonHora);
            });

            console.log(horario)

        })

        .catch(error => {
            console.error('Error:', error);
        });

    if (servicio.value === "manicureBásico" || servicio.value === "pedicureBásico" || servicio.value === "esmaltadoPermanente" || servicio.value === "uñasAcrílicas" || servicio.value === "uñasDeGel") {
        botonhoras1.style.display = "none"; 
    } else {
        botonhoras1.style.display = "block"; 
    }
}

// Función que almacena mensajes informativos 
function confirmarfechas() {
    mensaje1.innerHTML = `Tu cita será atendida por ${manicurista.options[manicurista.selectedIndex].text}. El servicio a realizar es ${servicio.options[servicio.selectedIndex].text}.`;
    mensaje2.innerHTML = `Tu cita se llevará a cabo el día ${texdia} de Abril. A las ${texhora}.`;
    mensaje3.innerHTML = 'Tu cita fue agendada con éxito. Recuerda llegar con 5 minutos de anterioridad.';
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
            throw new Error('Error al enviar los datos al servidor');
        }
        return response.json();
    })
    .then(data => {
        console.log('Cita registrada:', data);
        retornar();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Función que recarga la página para agendar una nueva cita
function retornar() {
    if (citaAgendada) {
        portada.style.display = "none";
        agendarcita.style.display = "none";
        mensaje1.style.display = "none";
        mensaje2.style.display = "none";
        Calendario.style.display = "none";
        encabezado.style.display = "block";
        botonRetornar.style.display = "block";
        mensaje3.style.display = "block";
        citaAgendada = false;
    } else {
        window.location.href = "/";
    }
}