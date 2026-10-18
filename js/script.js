// Configuración de la invitación
// Número de Colombia en formato internacional, sin + ni espacios.
const NUMERO_WHATSAPP = "573147324674";
// Fecha local de la celebración: 28 de noviembre de 2026, 8:30 p. m.
const FECHA_EVENTO = new Date(2026, 10, 28, 20, 30, 0);

const botonAbrir = document.getElementById("botonAbrir");
const inicio = document.getElementById("inicio");
const invitacion = document.getElementById("invitacion");

function abrirInvitacion() {
  botonAbrir.textContent = "Abriendo tu invitación…";
  inicio.classList.add("fade-out");
  window.setTimeout(() => {
    inicio.classList.add("oculto");
    invitacion.classList.remove("oculto");
    window.scrollTo({ top: 0, behavior: "smooth" });
    actualizarCuentaRegresiva();
  }, 600);
}

botonAbrir.addEventListener("click", abrirInvitacion);

// Música: agrega tu archivo propio en audio/musica.mp3.
const musica = document.getElementById("musica");
const botonMusica = document.getElementById("botonMusica");
const estadoMusica = document.getElementById("estadoMusica");
botonMusica.addEventListener("click", async () => {
  if (musica.paused) {
    try {
      await musica.play();
      botonMusica.classList.add("sonando");
      estadoMusica.textContent = "Reproduciendo música ♫";
    } catch {
      estadoMusica.textContent = "Agrega el archivo audio/musica.mp3 para activar la música.";
    }
  } else {
    musica.pause();
    botonMusica.classList.remove("sonando");
    estadoMusica.textContent = "Música pausada. Toca el disco para continuar.";
  }
});

// Cuenta regresiva dinámica.
function actualizarCuentaRegresiva() {
  const diferencia = FECHA_EVENTO.getTime() - Date.now();
  const ids = ["dias", "horas", "minutos", "segundos"];
  if (diferencia <= 0) {
    ids.forEach(id => document.getElementById(id).textContent = "0");
    document.querySelector(".contador-tarjeta h2").textContent = "¡Hoy es mi gran día!";
    return;
  }
  const valores = [
    Math.floor(diferencia / 86400000),
    Math.floor((diferencia % 86400000) / 3600000),
    Math.floor((diferencia % 3600000) / 60000),
    Math.floor((diferencia % 60000) / 1000)
  ];
  ids.forEach((id, i) => document.getElementById(id).textContent = String(valores[i]).padStart(2, "0"));
}
actualizarCuentaRegresiva();
window.setInterval(actualizarCuentaRegresiva, 1000);

// Formulario RSVP: prepara un mensaje y abre WhatsApp para que el invitado lo envíe.
const mostrarFormulario = document.getElementById("mostrarFormulario");
const formulario = document.getElementById("formularioRSVP");
const mensajeGuardado = document.getElementById("mensajeGuardado");

mostrarFormulario.addEventListener("click", () => {
  formulario.classList.remove("oculto");
  mostrarFormulario.classList.add("oculto");
  document.getElementById("nombreInvitado").focus();
});

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const datos = new FormData(formulario);
  const nombre = String(datos.get("nombre") || "").trim();
  const asistencia = String(datos.get("asistencia") || "");
  if (!nombre || !asistencia) return;

  const mensaje = [
    "💗 Confirmación de asistencia — Mis 15 años de María Victoria",
    "",
    `Nombre: ${nombre}`,
    `Respuesta: ${asistencia}`,  
  ].join("\n");

  mensajeGuardado.classList.remove("oculto");
  mensajeGuardado.textContent = "¡Gracias, " + nombre + "! Se preparó tu respuesta. En WhatsApp pulsa “Enviar” para que llegue a María Victoria.";
  const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});