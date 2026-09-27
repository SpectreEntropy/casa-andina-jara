/* =====================================
   CASA ANDINA JARA
   MAIN JAVASCRIPT
===================================== */

// =====================================
// CONFIGURACIÓN WHATSAPP
// =====================================
const numeroHotel = "51935139031";

// =====================================
// VALIDAR PROMOCIÓN AGOSTO
// =====================================

function validarPromocionAgosto(fechaEntrada, fechaSalida) {

    const entrada = new Date(fechaEntrada);
    const salida = new Date(fechaSalida);

    const inicioAgosto = new Date(entrada.getFullYear(), 7, 1);
    const finAgosto = new Date(entrada.getFullYear(), 7, 31);

    if (
        entrada >= inicioAgosto &&
        salida <= finAgosto
    ) {
        return "15% descuento - Promoción especial agosto";
    }

    return "No aplica";

}

// =====================================
// MENÚ MÓVIL
// =====================================
const menuButton = document.querySelector(".menu-mobile");
const navigation = document.querySelector(".navigation");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        navigation.classList.toggle("active");
    });
}

// =====================================
// CERRAR MENÚ
// =====================================
document.querySelectorAll(".navigation a").forEach(link => {
    link.addEventListener("click", () => {
        if (navigation) {
            navigation.classList.remove("active");
        }
    });
});

// =====================================
// ACTIVAR PROMOCIÓN DESDE BOTÓN
// =====================================

const botonPromocion = document.querySelector("#btnPromocion");
const avisoPromocion = document.querySelector("#avisoPromocion");


if (botonPromocion && avisoPromocion) {

    botonPromocion.addEventListener("click", () => {

        avisoPromocion.style.display = "block";

    });

}

// =====================================
// HEADER SCROLL
// =====================================
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// =====================================
// SCROLL SUAVE
// =====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});


// =====================================
// FORMULARIO DE RESERVA
// ENVÍO A WHATSAPP
// =====================================

const form = document.querySelector(".reservation-box form");

const inputEntrada = document.querySelector("#fechaEntrada");
const inputSalida = document.querySelector("#fechaSalida");

const hoy = new Date();
const fechaMinima =
    hoy.getFullYear() + "-" +
    String(hoy.getMonth() + 1).padStart(2, "0") + "-" +
    String(hoy.getDate()).padStart(2, "0");

if (inputEntrada && inputSalida) {
    inputEntrada.min = fechaMinima;
    inputSalida.min = fechaMinima;

    inputEntrada.addEventListener("change", () => {
        inputSalida.min = inputEntrada.value;

        if (
            inputSalida.value &&
            inputSalida.value <= inputEntrada.value
        ) {
            inputSalida.value = "";
        }
    });
}

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // =====================================
        // SELECCIONAR HABITACIÓN DESDE TARJETA
        // =====================================

        const botonesHabitacion = document.querySelectorAll(
            ".btn-reservar-habitacion"
        );

        const selectHabitacion = document.querySelector("#habitacion");

        botonesHabitacion.forEach(boton => {
            boton.addEventListener("click", () => {
                const habitacion = boton.dataset.habitacion;

                if (selectHabitacion) {
                    selectHabitacion.value = habitacion;
                }
            });
        });

        const nombre = document.querySelector("#nombre").value;
        const correo = document.querySelector("#correo").value;
        const telefono = document.querySelector("#telefono").value;
        const fechaEntrada = document.querySelector("#fechaEntrada").value;
        const fechaSalida = document.querySelector("#fechaSalida").value;
        const huespedes = document.querySelector("#huespedes").value;
        const habitacion = document.querySelector("#habitacion").value;
        const mensajeCliente = document.querySelector("#mensaje").value;
        const promocion = validarPromocionAgosto(
            fechaEntrada,
            fechaSalida
        );


        if (!nombre || !correo || !telefono || !fechaEntrada || !fechaSalida) {
            alert("Completa todos los campos obligatorios.");
            return;
        }

        if (fechaSalida <= fechaEntrada) {
            alert("La fecha de salida debe ser posterior a la fecha de llegada.");
            return;
        }

        const mensaje = `Hola Casa Andina Jara 👋

Deseo realizar una solicitud de reserva.

👤 Nombre:
${nombre}

📧 Correo:
${correo}

📱 Teléfono:
${telefono}

📅 Fecha de llegada:
${fechaEntrada}

📅 Fecha de salida:
${fechaSalida}

👥 Huéspedes:
${huespedes}

🏠 Habitación:
${habitacion}

🎁 Promoción:
${promocion}

💬 Mensaje:
${mensajeCliente || "Sin mensaje adicional"}

Quedo atento a su confirmación.`;

        const url = "https://wa.me/" + numeroHotel + "?text=" + encodeURIComponent(mensaje);

        window.open(url, "_blank");

        form.reset();
    });
}

// =====================================
// ANIMACIONES
// =====================================
const elements = document.querySelectorAll(
    ".room-card, .experience-grid div, .promotion-box, .reservation-box"
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.15
    }
);

elements.forEach(element => {
    element.classList.add("hidden");
    observer.observe(element);
});