// Configuración de la invitación
// Número de Colombia en formato internacional, sin + ni espacios.
const NUMERO_WHATSAPP = "573147324674"; 
// Fecha local de la celebración: 28 de noviembre de 2026, 8:30 p. m.
const FECHA_EVENTO = new Date(2026, 10, 28, 20, 30, 0); // Meses en JS empiezan en 0 (noviembre = 10)

// Referencias a elementos del DOM
const botonAbrir = document.getElementById("botonAbrir");
const inicio = document.getElementById("inicio");
const invitacion = document.getElementById("invitacion");

// Función para abrir la invitación
function abrirInvitacion() {
  botonAbrir.textContent = "Abriendo tu invitación…"; // Cambia el texto del botón
  inicio.classList.add("fade-out"); // Aplica animación de salida
  window.setTimeout(() => { // Espera 600 ms antes de ejecutar
    inicio.classList.add("oculto"); // Oculta la pantalla inicial
    invitacion.classList.remove("oculto"); // Muestra la invitación
    window.scrollTo({ top: 0, behavior: "smooth" }); // Lleva al inicio de la página
    actualizarCuentaRegresiva(); // Inicia el contador
  }, 600);
}

// Evento para abrir la invitación al hacer clic
botonAbrir.addEventListener("click", abrirInvitacion);

// --- Música ---
const musica = document.getElementById("musica");
const botonMusica = document.getElementById("botonMusica");
const estadoMusica = document.getElementById("estadoMusica");

// Evento para reproducir/pausar música
botonMusica.addEventListener("click", async () => {
  if (musica.paused) { // Si está pausada
    try {
      await musica.play(); // Intenta reproducir
      botonMusica.classList.add("sonando"); // Cambia estilo del botón
      estadoMusica.textContent = "Reproduciendo música ♫";
    } catch {
      estadoMusica.textContent = "Agrega el archivo audio/musica.mp3 para activar la música.";
    }
  } else { // Si ya está sonando
    musica.pause(); // Pausa la música
    botonMusica.classList.remove("sonando");
    estadoMusica.textContent = "Música pausada. Toca el disco para continuar.";
  }
});

// --- Cuenta regresiva dinámica ---
function actualizarCuentaRegresiva() {
  const diferencia = FECHA_EVENTO.getTime() - Date.now(); // Diferencia en ms
  const ids = ["dias", "horas", "minutos", "segundos"];
  
  if (diferencia <= 0) { // Si ya pasó la fecha
    ids.forEach(id => document.getElementById(id).textContent = "0");
    document.querySelector(".contador-tarjeta h2").textContent = "¡Hoy es mi gran día!";
    return;
  }

  // Calcula días, horas, minutos y segundos restantes
  const valores = [
    Math.floor(diferencia / 86400000), // Días
    Math.floor((diferencia % 86400000) / 3600000), // Horas
    Math.floor((diferencia % 3600000) / 60000), // Minutos
    Math.floor((diferencia % 60000) / 1000) // Segundos
  ];

  // Actualiza los elementos en pantalla
  ids.forEach((id, i) => document.getElementById(id).textContent = String(valores[i]).padStart(2, "0"));
}

// Llama la función al cargar y cada segundo
actualizarCuentaRegresiva();
window.setInterval(actualizarCuentaRegresiva, 1000);

// --- Formulario RSVP ---
const mostrarFormulario = document.getElementById("mostrarFormulario");
const formulario = document.getElementById("formularioRSVP");
const mensajeGuardado = document.getElementById("mensajeGuardado");

// Mostrar formulario al hacer clic
mostrarFormulario.addEventListener("click", () => {
  formulario.classList.remove("oculto");
  mostrarFormulario.classList.add("oculto");
  document.getElementById("nombreInvitado").focus(); // Pone el cursor en el campo nombre
});

// Evento de envío del formulario
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault(); // Evita recargar la página
  const datos = new FormData(formulario);
  const nombre = String(datos.get("nombre") || "").trim();
  const asistencia = String(datos.get("asistencia") || "");
  if (!nombre || !asistencia) return; // Validación simple

  // Mensaje que se enviará por WhatsApp
  const mensaje = [
    "💗 Confirmación de asistencia — Mis 15 años de María Victoria",
    "",
    `Nombre: ${nombre}`,
    `Respuesta: ${asistencia}`,  
  ].join("\n");

  // Muestra mensaje de confirmación en pantalla
  mensajeGuardado.classList.remove("oculto");
  mensajeGuardado.textContent = "¡Gracias, " + nombre + "! Se preparó tu respuesta. En WhatsApp pulsa “Enviar” para que llegue a María Victoria.";

  // Abre WhatsApp con el mensaje prellenado
  const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});
