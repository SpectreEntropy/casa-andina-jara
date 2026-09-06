/* =====================================
   CASA ANDINA JARA
   MAIN JAVASCRIPT
===================================== */

// =====================================
// CONFIGURACIÓN WHATSAPP
// =====================================
const numeroHotel = "51927374378";

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
    anchor.addEventListener("click", function(e) {
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
// CONSULTAR DISPONIBILIDAD
// BOTÓN DEL BUSCADOR SUPERIOR
// =====================================
const botonBuscar = document.querySelector(".booking-card button");

if (botonBuscar) {
    botonBuscar.addEventListener("click", () => {
        const fechas = document.querySelectorAll(".booking-card input");
        const entrada = fechas[0].value;
        const salida = fechas[1].value;
        const huespedes = document.querySelector(".booking-card select").value;

        if (!entrada || !salida) {
            alert("Selecciona la fecha de llegada y salida.");
            return;
        }

        const mensaje = `Hola Casa Andina Jara 👋\n\nDeseo consultar disponibilidad.\n\n📅 Llegada:\n${entrada}\n\n📅 Salida:\n${salida}\n\n👥 Huéspedes:\n${huespedes}\n\n¿Podrían indicarme disponibilidad y tarifas?\n\nGracias.`;

        const url = "https://wa.me/" + numeroHotel + "?text=" + encodeURIComponent(mensaje);

        window.open(url, "_blank");
    });
}

// =====================================
// FORMULARIO DE RESERVA
// ENVÍO A WHATSAPP
// =====================================

const form = document.querySelector(".reservation-box form");

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.querySelector("#nombre").value;
        const correo = document.querySelector("#correo").value;
        const telefono = document.querySelector("#telefono").value;
        const fechaEntrada = document.querySelector("#fechaEntrada").value;
        const fechaSalida = document.querySelector("#fechaSalida").value;
        const huespedes = document.querySelector("#huespedes").value;
        const habitacion = document.querySelector("#habitacion").value;
        const mensajeCliente = document.querySelector("#mensaje").value;

        if (!nombre || !correo || !telefono || !fechaEntrada || !fechaSalida) {
            alert("Completa todos los campos obligatorios.");
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