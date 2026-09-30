// ============================================================
// FIREBASE
// ============================================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
    getFirestore,
    collection,
    doc,
    query,
    orderBy,
    onSnapshot,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


// ============================================================
// CONFIGURACIÓN FIREBASE
// ============================================================

const firebaseConfig = {

    apiKey:
        "AIzaSyBQ36n5plJP9iVykmbXsvkx1Y_TouFLo-I",

    authDomain:
        "chat-robles.firebaseapp.com",

    projectId:
        "chat-robles",

    storageBucket:
        "chat-robles.firebasestorage.app",

    messagingSenderId:
        "264293774647",

    appId:
        "1:264293774647:web:193fe11c11326ea20e16b2",

    measurementId:
        "G-DVDG0M8PHS"

};


// ============================================================
// INICIALIZAR FIREBASE
// ============================================================

const firebaseApp =
    initializeApp(firebaseConfig);

const db =
    getFirestore(firebaseApp);


// ============================================================
// BACKEND
// ============================================================

const BACKEND_URL =
    "https://us-central1-chat-robles.cloudfunctions.net/whatsappWebhook";


// ============================================================
// ESTADO GENERAL
// ============================================================

let conversaciones = [];

let conversacionSeleccionada = null;

let filtroActual = "todas";

let unsubscribeConversaciones = null;

let unsubscribeMensajes = null;

let accionConfirmacion = null;

let archivoSeleccionado = null;

let tipoArchivoSeleccionado = null;

let contactosMasivosSeleccionados =
    new Set();

let configuracionChatbot = {

    bienvenida: {
        texto: ""
    },

    flujo: [],

    despedida: {
        texto: ""
    }

};


// ============================================================
// ELEMENTOS DOM
// ============================================================

// ------------------------------------------------------------
// CONVERSACIONES
// ------------------------------------------------------------

const listaConversaciones =
    document.getElementById(
        "listaConversaciones"
    );

const estadoConversaciones =
    document.getElementById(
        "estadoConversaciones"
    );

const buscarConversacion =
    document.getElementById(
        "buscarConversacion"
    );

const btnActualizarConversaciones =
    document.getElementById(
        "btnActualizarConversaciones"
    );

const botonesFiltro =
    document.querySelectorAll(
        ".filtro-conversacion"
    );


// ------------------------------------------------------------
// CHAT
// ------------------------------------------------------------

const chatVacio =
    document.getElementById(
        "chatVacio"
    );

const chatActivo =
    document.getElementById(
        "chatActivo"
    );

const chatNombre =
    document.getElementById(
        "chatNombre"
    );

const chatTelefono =
    document.getElementById(
        "chatTelefono"
    );

const chatAvatar =
    document.getElementById(
        "chatAvatar"
    );

const contenedorMensajes =
    document.getElementById(
        "contenedorMensajes"
    );

const estadoMensajes =
    document.getElementById(
        "estadoMensajes"
    );

const estadoAtencionActual =
    document.getElementById(
        "estadoAtencionActual"
    );

const estadoConversacionActual =
    document.getElementById(
        "estadoConversacionActual"
    );


// ------------------------------------------------------------
// CONTROLES CHAT
// ------------------------------------------------------------

const btnActivarBot =
    document.getElementById(
        "btnActivarBot"
    );

const btnAtencionHumana =
    document.getElementById(
        "btnAtencionHumana"
    );

const btnCerrarConversacion =
    document.getElementById(
        "btnCerrarConversacion"
    );


// ------------------------------------------------------------
// MENSAJE MANUAL
// ------------------------------------------------------------

const mensajeManual =
    document.getElementById(
        "mensajeManual"
    );

const btnEnviarMensaje =
    document.getElementById(
        "btnEnviarMensaje"
    );


// ------------------------------------------------------------
// ARCHIVOS
// ------------------------------------------------------------

const btnCamara =
    document.getElementById(
        "btnCamara"
    );

const btnImagen =
    document.getElementById(
        "btnImagen"
    );

const btnArchivo =
    document.getElementById(
        "btnArchivo"
    );

const inputCamara =
    document.getElementById(
        "inputCamara"
    );

const inputImagen =
    document.getElementById(
        "inputImagen"
    );

const inputArchivo =
    document.getElementById(
        "inputArchivo"
    );

const previewAdjunto =
    document.getElementById(
        "previewAdjunto"
    );

const previewAdjuntoContenido =
    document.getElementById(
        "previewAdjuntoContenido"
    );

const btnQuitarAdjunto =
    document.getElementById(
        "btnQuitarAdjunto"
    );


// ------------------------------------------------------------
// PROSPECTO
// ------------------------------------------------------------

const prospectoVacio =
    document.getElementById(
        "prospectoVacio"
    );

const prospectoDatos =
    document.getElementById(
        "prospectoDatos"
    );

const prospectNombre =
    document.getElementById(
        "prospectNombre"
    );

const prospectTelefono =
    document.getElementById(
        "prospectTelefono"
    );

const contenedorDatosDinamicos =
    document.getElementById(
        "contenedorDatosDinamicos"
    );

const estadoDatosDinamicosVacio =
    document.getElementById(
        "estadoDatosDinamicosVacio"
    );

const prospectEstadoFlujo =
    document.getElementById(
        "prospectEstadoFlujo"
    );

const prospectEstadoAtencion =
    document.getElementById(
        "prospectEstadoAtencion"
    );

const prospectEstadoConversacion =
    document.getElementById(
        "prospectEstadoConversacion"
    );

const prospectUltimoContacto =
    document.getElementById(
        "prospectUltimoContacto"
    );


// ------------------------------------------------------------
// MENSAJES MASIVOS
// ------------------------------------------------------------

const btnMensajeMasivo =
    document.getElementById(
        "btnMensajeMasivo"
    );

const modalMensajeMasivo =
    document.getElementById(
        "modalMensajeMasivo"
    );

const selectorDestinatariosMasivo =
    document.getElementById(
        "selectorDestinatariosMasivo"
    );

const contenedorSeleccionContactos =
    document.getElementById(
        "contenedorSeleccionContactos"
    );

const buscarContactoMasivo =
    document.getElementById(
        "buscarContactoMasivo"
    );

const listaContactosMasivo =
    document.getElementById(
        "listaContactosMasivo"
    );

const textoMensajeMasivo =
    document.getElementById(
        "textoMensajeMasivo"
    );

const cantidadDestinatariosMasivo =
    document.getElementById(
        "cantidadDestinatariosMasivo"
    );

const btnCancelarMasivo =
    document.getElementById(
        "btnCancelarMasivo"
    );

const btnEnviarMasivo =
    document.getElementById(
        "btnEnviarMasivo"
    );


// ------------------------------------------------------------
// NOTIFICACIÓN
// ------------------------------------------------------------

const notificacion =
    document.getElementById(
        "notificacion"
    );

const notificacionIcono =
    document.getElementById(
        "notificacionIcono"
    );

const notificacionTexto =
    document.getElementById(
        "notificacionTexto"
    );


// ------------------------------------------------------------
// MODAL CONFIRMACIÓN
// ------------------------------------------------------------

const modalConfirmacion =
    document.getElementById(
        "modalConfirmacion"
    );

const modalTitulo =
    document.getElementById(
        "modalTitulo"
    );

const modalMensaje =
    document.getElementById(
        "modalMensaje"
    );

const btnCancelarModal =
    document.getElementById(
        "btnCancelarModal"
    );

const btnConfirmarModal =
    document.getElementById(
        "btnConfirmarModal"
    );


// ============================================================
// CARGAR CONFIGURACIÓN CHATBOT
// ============================================================

async function cargarConfiguracionChatbot() {

    try {

        const referencia =
            doc(
                db,
                "configuracion_chatbot",
                "mensajes"
            );


        const snapshot =
            await getDoc(
                referencia
            );


        if (!snapshot.exists()) {

            configuracionChatbot = {
                bienvenida: {
                    texto: ""
                },
                flujo: [],
                despedida: {
                    texto: ""
                }
            };

            return;

        }


        const datos =
            snapshot.data() || {};


        configuracionChatbot = {

            bienvenida:
                datos.bienvenida || {
                    texto: ""
                },

            flujo:
                Array.isArray(
                    datos.flujo
                )
                    ? [...datos.flujo]
                        .filter(Boolean)
                        .sort(
                            (a, b) =>
                                Number(a.orden || 0) -
                                Number(b.orden || 0)
                        )
                    : [],

            despedida:
                datos.despedida || {
                    texto: ""
                }

        };


        if (conversacionSeleccionada) {

            actualizarProspecto();

        }

    }

    catch (error) {

        console.error(
            "Error cargando configuración:",
            error
        );

    }

}


// ============================================================
// CONVERSACIONES EN TIEMPO REAL
// ============================================================

function iniciarConversaciones() {

    if (unsubscribeConversaciones) {

        unsubscribeConversaciones();

    }


    mostrarEstadoConversaciones(
        "Cargando conversaciones..."
    );


    const referencia =
        collection(
            db,
            "conversaciones"
        );


    const consulta =
        query(
            referencia,
            orderBy(
                "ultimoContacto",
                "desc"
            )
        );


    unsubscribeConversaciones =
        onSnapshot(

            consulta,

            (snapshot) => {

                conversaciones =
                    snapshot.docs.map(
                        (documento) => ({

                            id:
                                documento.id,

                            ...documento.data()

                        })
                    );


                ocultarEstadoConversaciones();

                renderizarConversaciones();

                actualizarCantidadMasiva();


                if (
                    conversacionSeleccionada
                ) {

                    const actualizada =
                        conversaciones.find(
                            (item) =>
                                item.id ===
                                conversacionSeleccionada.id
                        );


                    if (actualizada) {

                        conversacionSeleccionada =
                            actualizada;

                        actualizarCabeceraChat();

                        actualizarProspecto();

                    }

                }

            },

            (error) => {

                console.error(
                    "Error leyendo conversaciones:",
                    error
                );


                mostrarEstadoConversaciones(
                    "No se pudieron cargar las conversaciones."
                );

            }

        );

}


// ============================================================
// RENDERIZAR CONVERSACIONES
// ============================================================

function renderizarConversaciones() {

    const busqueda =
        normalizarTexto(
            buscarConversacion.value
        );


    const filtradas =
        conversaciones.filter(
            (conversacion) => {

                const nombre =
                    normalizarTexto(
                        conversacion.nombre ||
                        ""
                    );


                const telefono =
                    normalizarTexto(
                        conversacion.telefono ||
                        conversacion.id
                    );


                const coincideBusqueda =
                    !busqueda ||
                    nombre.includes(busqueda) ||
                    telefono.includes(busqueda);


                if (!coincideBusqueda) {

                    return false;

                }


                switch (filtroActual) {

                    case "noLeidas":

                        return Number(
                            conversacion.noLeidos ||
                            0
                        ) > 0;


                    case "bot":

                        return (
                            conversacion.estadoAtencion ===
                            "bot"
                        );


                    case "humano":

                        return (
                            conversacion.estadoAtencion ===
                            "humano"
                        );


                    default:

                        return true;

                }

            }
        );


    listaConversaciones.innerHTML =
        "";


    if (!filtradas.length) {

        listaConversaciones.innerHTML = `
            <div class="lista-vacia">

                <i class="fa-regular fa-comments"></i>

                <p>
                    No hay conversaciones.
                </p>

            </div>
        `;

        return;

    }


    filtradas.forEach(
        (conversacion) => {

            listaConversaciones.appendChild(
                crearElementoConversacion(
                    conversacion
                )
            );

        }
    );

}


// ============================================================
// CREAR ELEMENTO CONVERSACIÓN
// ============================================================

function crearElementoConversacion(
    conversacion
) {

    const item =
        document.createElement(
            "button"
        );


    item.type =
        "button";

    item.className =
        "conversacion-item";


    if (
        conversacionSeleccionada &&
        conversacionSeleccionada.id ===
        conversacion.id
    ) {

        item.classList.add(
            "activa"
        );

    }


    const nombre =
        obtenerNombreConversacion(
            conversacion
        );


    const inicial =
        obtenerInicial(
            nombre
        );


    const ultimoMensaje =
        conversacion.ultimoMensaje ||
        "Sin mensajes";


    const noLeidos =
        Number(
            conversacion.noLeidos ||
            0
        );


    const hora =
        formatearHoraLista(
            conversacion.ultimoContacto
        );


    const origen =
        conversacion.ultimoMensajeOrigen ||
        "";


    let prefijo =
        "";


    if (origen === "bot") {

        prefijo =
            '<i class="fa-solid fa-robot"></i> ';

    }


    if (origen === "asesor") {

        prefijo =
            '<i class="fa-solid fa-check"></i> ';

    }


    item.innerHTML = `

        <div class="conversacion-avatar">
            ${escaparHTML(inicial)}
        </div>

        <div class="conversacion-contenido">

            <div class="conversacion-superior">

                <strong class="conversacion-nombre">
                    ${escaparHTML(nombre)}
                </strong>

                <span class="conversacion-hora">
                    ${escaparHTML(hora)}
                </span>

            </div>

            <div class="conversacion-inferior">

                <span class="conversacion-preview">

                    ${prefijo}

                    ${escaparHTML(
                        ultimoMensaje
                    )}

                </span>

                ${
                    noLeidos > 0

                        ? `
                            <span class="contador-no-leidos">
                                ${
                                    noLeidos > 99
                                        ? "99+"
                                        : noLeidos
                                }
                            </span>
                        `

                        : ""
                }

            </div>

        </div>
    `;


    item.addEventListener(
        "click",
        () => {

            seleccionarConversacion(
                conversacion.id
            );

        }
    );


    return item;

}


// ============================================================
// SELECCIONAR CONVERSACIÓN
// ============================================================

async function seleccionarConversacion(
    id
) {

    const conversacion =
        conversaciones.find(
            (item) =>
                item.id === id
        );


    if (!conversacion) {

        return;

    }


    conversacionSeleccionada =
        conversacion;


    limpiarAdjunto();

    renderizarConversaciones();

    mostrarChat();

    actualizarCabeceraChat();

    actualizarProspecto();

    escucharMensajes(
        conversacion.id
    );


    if (
        Number(
            conversacion.noLeidos ||
            0
        ) > 0
    ) {

        await marcarConversacionLeida(
            conversacion.id
        );

    }

}


// ============================================================
// MOSTRAR CHAT
// ============================================================

function mostrarChat() {

    chatVacio.classList.add(
        "oculto"
    );

    chatActivo.classList.remove(
        "oculto"
    );

    prospectoVacio.classList.add(
        "oculto"
    );

    prospectoDatos.classList.remove(
        "oculto"
    );

}


// ============================================================
// CABECERA CHAT
// ============================================================

function actualizarCabeceraChat() {

    if (!conversacionSeleccionada) {

        return;

    }


    const c =
        conversacionSeleccionada;


    const nombre =
        obtenerNombreConversacion(
            c
        );


    chatNombre.textContent =
        nombre;


    chatTelefono.textContent =
        formatearTelefono(
            c.telefono ||
            c.id
        );


    chatAvatar.textContent =
        obtenerInicial(
            nombre
        );


    const estadoAtencion =
        c.estadoAtencion ||
        "bot";


    const estadoConversacion =
        c.estadoConversacion ||
        "abierta";


    estadoAtencionActual.textContent =
        estadoAtencion === "humano"
            ? "Atención humana"
            : "Chatbot";


    estadoConversacionActual.textContent =
        capitalizar(
            estadoConversacion
        );


    btnActivarBot.classList.toggle(
        "activo",
        estadoAtencion === "bot"
    );


    btnAtencionHumana.classList.toggle(
        "activo",
        estadoAtencion === "humano"
    );


    const cerrada =
        estadoConversacion ===
        "cerrada";


    mensajeManual.disabled =
        cerrada;

    btnEnviarMensaje.disabled =
        cerrada;

    btnCamara.disabled =
        cerrada;

    btnImagen.disabled =
        cerrada;

    btnArchivo.disabled =
        cerrada;


    if (cerrada) {

        mensajeManual.placeholder =
            "La conversación está cerrada";

    }

    else if (
        estadoAtencion ===
        "bot"
    ) {

        mensajeManual.placeholder =
            "Escribe para responder como asesor";

    }

    else {

        mensajeManual.placeholder =
            "Escribe un mensaje";

    }

}


// ============================================================
// PROSPECTO
// ============================================================

function actualizarProspecto() {

    if (!conversacionSeleccionada) {

        return;

    }


    const c =
        conversacionSeleccionada;


    colocarDato(
        prospectNombre,
        c.nombre
    );


    colocarDato(
        prospectTelefono,
        formatearTelefono(
            c.telefono ||
            c.id
        )
    );


    renderizarDatosDinamicos(
        c
    );


    colocarDato(
        prospectEstadoFlujo,
        obtenerNombreEstadoFlujo(
            c.estadoFlujo
        )
    );


    colocarDato(
        prospectEstadoAtencion,
        c.estadoAtencion === "humano"
            ? "Humano"
            : c.estadoAtencion === "bot"
                ? "Bot"
                : ""
    );


    colocarDato(
        prospectEstadoConversacion,
        c.estadoConversacion
            ? capitalizar(
                c.estadoConversacion
            )
            : ""
    );


    colocarDato(
        prospectUltimoContacto,
        formatearFechaCompleta(
            c.ultimoContacto
        )
    );

}


// ============================================================
// DATOS DINÁMICOS
// ============================================================

function renderizarDatosDinamicos(
    conversacion
) {

    contenedorDatosDinamicos.innerHTML =
        "";


    const flujo =
        Array.isArray(
            configuracionChatbot.flujo
        )
            ? configuracionChatbot.flujo
            : [];


    const camposProcesados =
        new Set();


    let cantidad =
        0;


    flujo.forEach(
        (bloque) => {

            if (
                bloque?.tipo !== "texto" &&
                bloque?.tipo !== "opciones"
            ) {

                return;

            }


            const campo =
                String(
                    bloque.campo ||
                    ""
                ).trim();


            if (!campo) {

                return;

            }


            if (
                camposProcesados.has(
                    campo
                )
            ) {

                return;

            }


            camposProcesados.add(
                campo
            );


            const elemento =
                document.createElement(
                    "div"
                );


            elemento.className =
                "dato-prospecto";


            elemento.innerHTML = `

                <span class="dato-label">
                    ${escaparHTML(
                        convertirCampoALabel(
                            campo
                        )
                    )}
                </span>

                <strong>
                    ${escaparHTML(
                        formatearValorDinamico(
                            conversacion[campo]
                        )
                    )}
                </strong>
            `;


            contenedorDatosDinamicos.appendChild(
                elemento
            );


            cantidad++;

        }
    );


    estadoDatosDinamicosVacio.classList.toggle(
        "oculto",
        cantidad > 0
    );

}


// ============================================================
// CAMPO FIREBASE → ETIQUETA
// ============================================================

function convertirCampoALabel(
    campo
) {

    const valor =
        String(
            campo ||
            ""
        )
            .replace(
                /([a-z])([A-Z])/g,
                "$1 $2"
            )
            .replace(
                /[_-]+/g,
                " "
            )
            .trim();


    if (!valor) {

        return "Dato";

    }


    return valor
        .split(/\s+/)
        .map(
            (palabra) =>
                palabra.charAt(0).toUpperCase() +
                palabra.slice(1)
        )
        .join(" ");

}


// ============================================================
// FORMATEAR VALOR DINÁMICO
// ============================================================

function formatearValorDinamico(
    valor
) {

    if (
        valor === undefined ||
        valor === null ||
        valor === ""
    ) {

        return "—";

    }


    if (
        typeof valor ===
        "boolean"
    ) {

        return valor
            ? "Sí"
            : "No";

    }


    if (
        Array.isArray(valor)
    ) {

        return valor.join(
            ", "
        );

    }


    if (
        typeof valor ===
        "object"
    ) {

        return "—";

    }


    return String(
        valor
    );

}


// ============================================================
// ESTADO DEL FLUJO
// ============================================================

function obtenerNombreEstadoFlujo(
    estado
) {

    if (!estado) {

        return "Sin iniciar";

    }


    if (
        estado ===
        "finalizado"
    ) {

        return "Finalizado";

    }


    const flujo =
        configuracionChatbot.flujo ||
        [];


    const bloque =
        flujo.find(
            (item) =>
                item.id === estado
        );


    if (!bloque) {

        return String(
            estado
        );

    }


    const orden =
        Number(
            bloque.orden ||
            flujo.indexOf(
                bloque
            ) + 1
        );


    return `Paso ${orden}`;

}


// ============================================================
// ESCUCHAR MENSAJES
// ============================================================

function escucharMensajes(
    telefono
) {

    if (unsubscribeMensajes) {

        unsubscribeMensajes();

        unsubscribeMensajes =
            null;

    }


    contenedorMensajes.innerHTML =
        "";


    estadoMensajes.classList.remove(
        "oculto"
    );


    const referencia =
        collection(
            db,
            "conversaciones",
            telefono,
            "mensajes"
        );


    const consulta =
        query(
            referencia,
            orderBy(
                "fecha",
                "asc"
            )
        );


    unsubscribeMensajes =
        onSnapshot(

            consulta,

            (snapshot) => {

                estadoMensajes.classList.add(
                    "oculto"
                );


                const mensajes =
                    snapshot.docs.map(
                        (documento) => ({

                            id:
                                documento.id,

                            ...documento.data()

                        })
                    );


                renderizarMensajes(
                    mensajes
                );

            },

            (error) => {

                console.error(
                    "Error cargando mensajes:",
                    error
                );


                estadoMensajes.classList.add(
                    "oculto"
                );


                mostrarNotificacion(
                    "No se pudieron cargar los mensajes.",
                    "error"
                );

            }

        );

}


// ============================================================
// RENDERIZAR MENSAJES
// ============================================================

function renderizarMensajes(
    mensajes
) {

    contenedorMensajes.innerHTML =
        "";


    if (!mensajes.length) {

        contenedorMensajes.innerHTML = `
            <div class="mensajes-vacios">
                No hay mensajes registrados.
            </div>
        `;

        return;

    }


    mensajes.forEach(
        (mensaje) => {

            contenedorMensajes.appendChild(
                crearElementoMensaje(
                    mensaje
                )
            );

        }
    );


    requestAnimationFrame(
        () => {

            contenedorMensajes.scrollTop =
                contenedorMensajes.scrollHeight;

        }
    );

}


// ============================================================
// CREAR MENSAJE
// ============================================================

function crearElementoMensaje(
    mensaje
) {

    const fila =
        document.createElement(
            "div"
        );


    const saliente =
        mensaje.tipo ===
        "saliente";


    fila.className =
        saliente
            ? "mensaje-fila saliente"
            : "mensaje-fila entrante";


    const burbuja =
        document.createElement(
            "div"
        );


    burbuja.className =
        saliente
            ? "mensaje-burbuja mensaje-saliente"
            : "mensaje-burbuja mensaje-entrante";


    let origenHTML =
        "";


    if (
        mensaje.origen ===
        "bot"
    ) {

        origenHTML = `
            <div class="mensaje-origen">
                <i class="fa-solid fa-robot"></i>
                Bot
            </div>
        `;

    }


    if (
        mensaje.origen ===
        "asesor"
    ) {

        origenHTML = `
            <div class="mensaje-origen">
                <i class="fa-solid fa-headset"></i>
                Asesor
            </div>
        `;

    }


    const estadoHTML =
        saliente
            ? obtenerIconoEstado(
                mensaje.estado
            )
            : "";


    burbuja.innerHTML = `

        ${origenHTML}

        <div class="mensaje-texto">
            ${formatearTextoMensaje(
                mensaje.texto ||
                ""
            )}
        </div>

        <div class="mensaje-meta">

            <span>
                ${escaparHTML(
                    formatearHoraMensaje(
                        mensaje.fecha
                    )
                )}
            </span>

            ${estadoHTML}

        </div>
    `;


    fila.appendChild(
        burbuja
    );


    return fila;

}


// ============================================================
// ICONOS DE ESTADO
// ============================================================

function obtenerIconoEstado(
    estado
) {

    switch (
        String(
            estado ||
            ""
        ).toLowerCase()
    ) {

        case "read":

            return `
                <span
                    class="mensaje-estado leido"
                    title="Leído"
                >
                    <i class="fa-solid fa-check-double"></i>
                </span>
            `;


        case "delivered":

            return `
                <span
                    class="mensaje-estado"
                    title="Entregado"
                >
                    <i class="fa-solid fa-check-double"></i>
                </span>
            `;


        case "sent":

        case "enviado":

            return `
                <span
                    class="mensaje-estado"
                    title="Enviado"
                >
                    <i class="fa-solid fa-check"></i>
                </span>
            `;


        case "failed":

            return `
                <span
                    class="mensaje-estado error"
                    title="Error"
                >
                    <i class="fa-solid fa-circle-exclamation"></i>
                </span>
            `;


        default:

            return "";

    }

}


// ============================================================
// SELECCIONAR ARCHIVO
// ============================================================

function seleccionarArchivo(
    archivo,
    tipo
) {

    if (!archivo) {

        return;

    }


    const limite =
        16 * 1024 * 1024;


    if (
        archivo.size >
        limite
    ) {

        mostrarNotificacion(
            "El archivo es demasiado grande.",
            "error"
        );

        return;

    }


    archivoSeleccionado =
        archivo;


    tipoArchivoSeleccionado =
        tipo;


    mostrarPreviewAdjunto();

}


// ============================================================
// PREVIEW ADJUNTO
// ============================================================

function mostrarPreviewAdjunto() {

    if (!archivoSeleccionado) {

        limpiarAdjunto();

        return;

    }


    previewAdjunto.classList.remove(
        "oculto"
    );


    const nombre =
        escaparHTML(
            archivoSeleccionado.name
        );


    const tamaño =
        formatearTamanoArchivo(
            archivoSeleccionado.size
        );


    if (
        archivoSeleccionado.type.startsWith(
            "image/"
        )
    ) {

        const url =
            URL.createObjectURL(
                archivoSeleccionado
            );


        previewAdjuntoContenido.innerHTML = `

            <img
                src="${url}"
                alt="Vista previa"
                class="preview-imagen"
            >

            <div class="preview-adjunto-info">

                <strong>
                    ${nombre}
                </strong>

                <span>
                    ${tamaño}
                </span>

            </div>
        `;

    }

    else {

        previewAdjuntoContenido.innerHTML = `

            <div class="preview-archivo-icono">
                <i class="fa-solid fa-file"></i>
            </div>

            <div class="preview-adjunto-info">

                <strong>
                    ${nombre}
                </strong>

                <span>
                    ${tamaño}
                </span>

            </div>
        `;

    }

}


// ============================================================
// LIMPIAR ADJUNTO
// ============================================================

function limpiarAdjunto() {

    archivoSeleccionado =
        null;


    tipoArchivoSeleccionado =
        null;


    previewAdjuntoContenido.innerHTML =
        "";


    previewAdjunto.classList.add(
        "oculto"
    );


    inputCamara.value =
        "";

    inputImagen.value =
        "";

    inputArchivo.value =
        "";

}


// ============================================================
// ENVIAR MENSAJE
// ============================================================

async function enviarMensajeManual() {

    if (!conversacionSeleccionada) {

        mostrarNotificacion(
            "Selecciona una conversación.",
            "error"
        );

        return;

    }


    const texto =
        mensajeManual.value.trim();


    if (
        !texto &&
        !archivoSeleccionado
    ) {

        return;

    }


    if (
        archivoSeleccionado
    ) {

        await enviarAdjuntoManual();

        return;

    }


    await enviarTextoManual(
        texto
    );

}


// ============================================================
// ENVIAR TEXTO
// ============================================================

async function enviarTextoManual(
    texto
) {

    const telefono =
        conversacionSeleccionada.telefono ||
        conversacionSeleccionada.id;


    bloquearEnvio(
        true
    );


    try {

        const respuesta =
            await fetch(
                `${BACKEND_URL}/enviarMensajeManual`,
                {

                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

                            telefono,

                            texto

                        })

                }
            );


        const datos =
            await leerRespuestaJSON(
                respuesta
            );


        if (!respuesta.ok) {

            throw new Error(
                datos?.error ||
                "No se pudo enviar el mensaje."
            );

        }


        mensajeManual.value =
            "";


        ajustarTextarea();


        mostrarNotificacion(
            "Mensaje enviado.",
            "exito"
        );

    }

    catch (error) {

        console.error(
            error
        );


        mostrarNotificacion(
            error.message ||
            "No se pudo enviar el mensaje.",
            "error"
        );

    }

    finally {

        bloquearEnvio(
            false
        );

    }

}


// ============================================================
// ENVIAR ARCHIVO / IMAGEN
// ============================================================

async function enviarAdjuntoManual() {

    if (
        !archivoSeleccionado ||
        !conversacionSeleccionada
    ) {

        return;

    }


    const telefono =
        conversacionSeleccionada.telefono ||
        conversacionSeleccionada.id;


    const formulario =
        new FormData();


    formulario.append(
        "telefono",
        telefono
    );


    formulario.append(
        "archivo",
        archivoSeleccionado
    );


    formulario.append(
        "tipo",
        tipoArchivoSeleccionado ||
        "documento"
    );


    formulario.append(
        "texto",
        mensajeManual.value.trim()
    );


    bloquearEnvio(
        true
    );


    try {

        const respuesta =
            await fetch(
                `${BACKEND_URL}/enviarArchivoManual`,
                {

                    method:
                        "POST",

                    body:
                        formulario

                }
            );


        const datos =
            await leerRespuestaJSON(
                respuesta
            );


        if (!respuesta.ok) {

            throw new Error(
                datos?.error ||
                "No se pudo enviar el archivo."
            );

        }


        mensajeManual.value =
            "";


        limpiarAdjunto();

        ajustarTextarea();


        mostrarNotificacion(
            "Archivo enviado.",
            "exito"
        );

    }

    catch (error) {

        console.error(
            "Error enviando archivo:",
            error
        );


        mostrarNotificacion(
            "El backend todavía debe habilitar el envío de archivos.",
            "error"
        );

    }

    finally {

        bloquearEnvio(
            false
        );

    }

}


// ============================================================
// CAMBIAR MODO ATENCIÓN
// ============================================================

async function cambiarModoAtencion(
    modo
) {

    if (!conversacionSeleccionada) {

        return;

    }


    try {

        const respuesta =
            await fetch(
                `${BACKEND_URL}/cambiarModoAtencion`,
                {

                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

                            telefono:
                                conversacionSeleccionada.telefono ||
                                conversacionSeleccionada.id,

                            modo

                        })

                }
            );


        const datos =
            await leerRespuestaJSON(
                respuesta
            );


        if (!respuesta.ok) {

            throw new Error(
                datos?.error ||
                "No se pudo cambiar el modo."
            );

        }


        mostrarNotificacion(

            modo === "bot"
                ? "Chatbot activado."
                : "Atención humana activada.",

            "exito"

        );

    }

    catch (error) {

        console.error(
            error
        );


        mostrarNotificacion(
            error.message ||
            "No se pudo cambiar el modo.",
            "error"
        );

    }

}


// ============================================================
// CERRAR CONVERSACIÓN
// ============================================================

async function cerrarConversacion() {

    if (!conversacionSeleccionada) {

        return;

    }


    try {

        const respuesta =
            await fetch(
                `${BACKEND_URL}/cerrarConversacion`,
                {

                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

                            telefono:
                                conversacionSeleccionada.telefono ||
                                conversacionSeleccionada.id

                        })

                }
            );


        const datos =
            await leerRespuestaJSON(
                respuesta
            );


        if (!respuesta.ok) {

            throw new Error(
                datos?.error ||
                "No se pudo cerrar la conversación."
            );

        }


        mostrarNotificacion(
            "Conversación cerrada.",
            "exito"
        );

    }

    catch (error) {

        console.error(
            error
        );


        mostrarNotificacion(
            error.message ||
            "No se pudo cerrar la conversación.",
            "error"
        );

    }

}


// ============================================================
// MARCAR LEÍDA
// ============================================================

async function marcarConversacionLeida(
    telefono
) {

    try {

        await fetch(
            `${BACKEND_URL}/marcarLeida`,
            {

                method:
                    "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body:
                    JSON.stringify({
                        telefono
                    })

            }
        );

    }

    catch (error) {

        console.error(
            error
        );

    }

}


// ============================================================
// MENSAJE MASIVO
// ============================================================

function abrirModalMasivo() {

    contactosMasivosSeleccionados.clear();


    selectorDestinatariosMasivo.value =
        "todos";


    textoMensajeMasivo.value =
        "";


    buscarContactoMasivo.value =
        "";


    contenedorSeleccionContactos.classList.add(
        "oculto"
    );


    modalMensajeMasivo.classList.remove(
        "oculto"
    );


    renderizarContactosMasivo();

    actualizarCantidadMasiva();

}


// ============================================================
// CERRAR MENSAJE MASIVO
// ============================================================

function cerrarModalMasivo() {

    modalMensajeMasivo.classList.add(
        "oculto"
    );

}


// ============================================================
// OBTENER DESTINATARIOS
// ============================================================

function obtenerDestinatariosMasivo() {

    const tipo =
        selectorDestinatariosMasivo.value;


    switch (tipo) {

        case "bot":

            return conversaciones.filter(
                (c) =>
                    c.estadoAtencion ===
                    "bot"
            );


        case "humano":

            return conversaciones.filter(
                (c) =>
                    c.estadoAtencion ===
                    "humano"
            );


        case "seleccionar":

            return conversaciones.filter(
                (c) =>
                    contactosMasivosSeleccionados.has(
                        c.id
                    )
            );


        case "todos":

        default:

            return conversaciones;

    }

}


// ============================================================
// RENDER CONTACTOS MASIVOS
// ============================================================

function renderizarContactosMasivo() {

    listaContactosMasivo.innerHTML =
        "";


    const busqueda =
        normalizarTexto(
            buscarContactoMasivo.value
        );


    const resultados =
        conversaciones.filter(
            (c) => {

                const nombre =
                    normalizarTexto(
                        obtenerNombreConversacion(
                            c
                        )
                    );


                const telefono =
                    normalizarTexto(
                        c.telefono ||
                        c.id
                    );


                return (
                    !busqueda ||
                    nombre.includes(
                        busqueda
                    ) ||
                    telefono.includes(
                        busqueda
                    )
                );

            }
        );


    resultados.forEach(
        (c) => {

            const item =
                document.createElement(
                    "label"
                );


            item.className =
                "contacto-masivo-item";


            const marcado =
                contactosMasivosSeleccionados.has(
                    c.id
                );


            item.innerHTML = `

                <input
                    type="checkbox"
                    ${marcado ? "checked" : ""}
                >

                <div>

                    <strong>
                        ${escaparHTML(
                            obtenerNombreConversacion(
                                c
                            )
                        )}
                    </strong>

                    <span>
                        ${escaparHTML(
                            formatearTelefono(
                                c.telefono ||
                                c.id
                            )
                        )}
                    </span>

                </div>
            `;


            const checkbox =
                item.querySelector(
                    "input"
                );


            checkbox.addEventListener(
                "change",
                () => {

                    if (
                        checkbox.checked
                    ) {

                        contactosMasivosSeleccionados.add(
                            c.id
                        );

                    }

                    else {

                        contactosMasivosSeleccionados.delete(
                            c.id
                        );

                    }


                    actualizarCantidadMasiva();

                }
            );


            listaContactosMasivo.appendChild(
                item
            );

        }
    );

}


// ============================================================
// CANTIDAD DESTINATARIOS
// ============================================================

function actualizarCantidadMasiva() {

    if (
        !cantidadDestinatariosMasivo
    ) {

        return;

    }


    cantidadDestinatariosMasivo.textContent =
        String(
            obtenerDestinatariosMasivo()
                .length
        );

}


// ============================================================
// ENVIAR MENSAJE MASIVO
// ============================================================

async function enviarMensajeMasivo() {

    const texto =
        textoMensajeMasivo.value.trim();


    if (!texto) {

        mostrarNotificacion(
            "Escribe un mensaje.",
            "error"
        );

        return;

    }


    const destinatarios =
        obtenerDestinatariosMasivo();


    if (!destinatarios.length) {

        mostrarNotificacion(
            "No hay destinatarios seleccionados.",
            "error"
        );

        return;

    }


    const telefonos =
        destinatarios.map(
            (c) =>
                c.telefono ||
                c.id
        );


    btnEnviarMasivo.disabled =
        true;


    btnEnviarMasivo.innerHTML =
        '<i class="fa-solid fa-circle-notch fa-spin"></i> Enviando...';


    try {

        const respuesta =
            await fetch(
                `${BACKEND_URL}/enviarMensajeMasivo`,
                {

                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

                            telefonos,

                            texto

                        })

                }
            );


        const datos =
            await leerRespuestaJSON(
                respuesta
            );


        if (!respuesta.ok) {

            throw new Error(
                datos?.error ||
                "No se pudo realizar el envío masivo."
            );

        }


        cerrarModalMasivo();


        mostrarNotificacion(
            "Mensaje masivo enviado.",
            "exito"
        );

    }

    catch (error) {

        console.error(
            error
        );


        mostrarNotificacion(
            "El backend todavía debe habilitar los mensajes masivos.",
            "error"
        );

    }

    finally {

        btnEnviarMasivo.disabled =
            false;


        btnEnviarMasivo.innerHTML =
            '<i class="fa-solid fa-paper-plane"></i> Enviar';

    }

}


// ============================================================
// MODAL CONFIRMACIÓN
// ============================================================

function abrirConfirmacion(
    titulo,
    mensaje,
    accion
) {

    accionConfirmacion =
        accion;


    modalTitulo.textContent =
        titulo;


    modalMensaje.textContent =
        mensaje;


    modalConfirmacion.classList.remove(
        "oculto"
    );

}


function cerrarModal() {

    modalConfirmacion.classList.add(
        "oculto"
    );


    accionConfirmacion =
        null;

}


// ============================================================
// NOTIFICACIÓN
// ============================================================

let temporizadorNotificacion =
    null;


function mostrarNotificacion(
    texto,
    tipo = "exito"
) {

    if (
        temporizadorNotificacion
    ) {

        clearTimeout(
            temporizadorNotificacion
        );

    }


    notificacionTexto.textContent =
        texto;


    notificacion.classList.remove(
        "oculto",
        "exito",
        "error"
    );


    notificacion.classList.add(
        tipo
    );


    notificacionIcono.className =
        tipo === "error"
            ? "fa-solid fa-circle-exclamation"
            : "fa-solid fa-circle-check";


    temporizadorNotificacion =
        setTimeout(
            () => {

                notificacion.classList.add(
                    "oculto"
                );

            },
            3000
        );

}


// ============================================================
// ESTADO CONVERSACIONES
// ============================================================

function mostrarEstadoConversaciones(
    texto
) {

    estadoConversaciones.innerHTML = `

        <i class="fa-solid fa-circle-notch fa-spin"></i>

        <span>
            ${escaparHTML(texto)}
        </span>
    `;


    estadoConversaciones.classList.remove(
        "oculto"
    );

}


function ocultarEstadoConversaciones() {

    estadoConversaciones.classList.add(
        "oculto"
    );

}


// ============================================================
// TELÉFONO
// ============================================================

function formatearTelefono(
    telefono
) {

    const limpio =
        String(
            telefono ||
            ""
        ).replace(
            /\D/g,
            ""
        );


    if (
        limpio.startsWith("51") &&
        limpio.length === 11
    ) {

        return (
            "+51 " +
            limpio.substring(2, 5) +
            " " +
            limpio.substring(5, 8) +
            " " +
            limpio.substring(8)
        );

    }


    if (!limpio) {

        return "—";

    }


    return `+${limpio}`;

}


// ============================================================
// NOMBRE
// ============================================================

function obtenerNombreConversacion(
    conversacion
) {

    const nombre =
        String(
            conversacion.nombre ||
            ""
        ).trim();


    if (nombre) {

        return nombre;

    }


    return formatearTelefono(
        conversacion.telefono ||
        conversacion.id
    );

}


// ============================================================
// INICIAL
// ============================================================

function obtenerInicial(
    texto
) {

    const valor =
        String(
            texto ||
            ""
        ).trim();


    if (!valor) {

        return "?";

    }


    if (
        valor.startsWith("+")
    ) {

        return "#";

    }


    return valor
        .charAt(0)
        .toUpperCase();

}


// ============================================================
// COLOCAR DATO
// ============================================================

function colocarDato(
    elemento,
    valor
) {

    if (!elemento) {

        return;

    }


    if (
        valor === undefined ||
        valor === null ||
        String(valor).trim() === ""
    ) {

        elemento.textContent =
            "—";

        return;

    }


    elemento.textContent =
        String(valor);

}


// ============================================================
// FECHA
// ============================================================

function convertirFecha(
    valor
) {

    if (!valor) {

        return null;

    }


    if (
        typeof valor.toDate ===
        "function"
    ) {

        return valor.toDate();

    }


    if (
        valor.seconds !== undefined
    ) {

        return new Date(
            Number(valor.seconds) *
            1000
        );

    }


    if (
        valor instanceof Date
    ) {

        return valor;

    }


    const fecha =
        new Date(valor);


    if (
        Number.isNaN(
            fecha.getTime()
        )
    ) {

        return null;

    }


    return fecha;

}


// ============================================================
// HORA LISTA
// ============================================================

function formatearHoraLista(
    valor
) {

    const fecha =
        convertirFecha(
            valor
        );


    if (!fecha) {

        return "";

    }


    const ahora =
        new Date();


    const mismoDia =
        fecha.toDateString() ===
        ahora.toDateString();


    if (mismoDia) {

        return fecha.toLocaleTimeString(
            "es-PE",
            {
                hour:
                    "2-digit",
                minute:
                    "2-digit"
            }
        );

    }


    return fecha.toLocaleDateString(
        "es-PE",
        {
            day:
                "2-digit",
            month:
                "2-digit"
        }
    );

}


// ============================================================
// HORA MENSAJE
// ============================================================

function formatearHoraMensaje(
    valor
) {

    const fecha =
        convertirFecha(
            valor
        );


    if (!fecha) {

        return "";

    }


    return fecha.toLocaleTimeString(
        "es-PE",
        {
            hour:
                "2-digit",
            minute:
                "2-digit"
        }
    );

}


// ============================================================
// FECHA COMPLETA
// ============================================================

function formatearFechaCompleta(
    valor
) {

    const fecha =
        convertirFecha(
            valor
        );


    if (!fecha) {

        return "";

    }


    return fecha.toLocaleString(
        "es-PE",
        {
            day:
                "2-digit",
            month:
                "2-digit",
            year:
                "numeric",
            hour:
                "2-digit",
            minute:
                "2-digit"
        }
    );

}


// ============================================================
// TAMAÑO ARCHIVO
// ============================================================

function formatearTamanoArchivo(
    bytes
) {

    if (
        bytes < 1024
    ) {

        return `${bytes} B`;

    }


    if (
        bytes <
        1024 * 1024
    ) {

        return (
            bytes /
            1024
        ).toFixed(1) + " KB";

    }


    return (
        bytes /
        (1024 * 1024)
    ).toFixed(1) + " MB";

}


// ============================================================
// NORMALIZAR
// ============================================================

function normalizarTexto(
    texto
) {

    return String(
        texto ||
        ""
    )
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .toLowerCase()
        .trim();

}


// ============================================================
// CAPITALIZAR
// ============================================================

function capitalizar(
    texto
) {

    const valor =
        String(
            texto ||
            ""
        ).trim();


    if (!valor) {

        return "—";

    }


    return (
        valor.charAt(0).toUpperCase() +
        valor.slice(1)
    );

}


// ============================================================
// SEGURIDAD
// ============================================================

function escaparHTML(
    valor
) {

    return String(
        valor ?? ""
    )
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );

}


// ============================================================
// TEXTO MENSAJE
// ============================================================

function formatearTextoMensaje(
    texto
) {

    return escaparHTML(
        texto
    ).replace(
        /\n/g,
        "<br>"
    );

}


// ============================================================
// JSON
// ============================================================

async function leerRespuestaJSON(
    respuesta
) {

    try {

        return await respuesta.json();

    }

    catch {

        return null;

    }

}


// ============================================================
// BLOQUEAR ENVÍO
// ============================================================

function bloquearEnvio(
    bloquear
) {

    btnEnviarMensaje.disabled =
        bloquear;


    mensajeManual.disabled =
        bloquear;


    btnCamara.disabled =
        bloquear;


    btnImagen.disabled =
        bloquear;


    btnArchivo.disabled =
        bloquear;


    if (bloquear) {

        btnEnviarMensaje.innerHTML =
            '<i class="fa-solid fa-circle-notch fa-spin"></i>';

    }

    else {

        btnEnviarMensaje.innerHTML =
            '<i class="fa-solid fa-paper-plane"></i>';


        const cerrada =
            conversacionSeleccionada
                ?.estadoConversacion ===
            "cerrada";


        btnEnviarMensaje.disabled =
            cerrada;

        mensajeManual.disabled =
            cerrada;

        btnCamara.disabled =
            cerrada;

        btnImagen.disabled =
            cerrada;

        btnArchivo.disabled =
            cerrada;

    }

}


// ============================================================
// TEXTAREA
// ============================================================

function ajustarTextarea() {

    mensajeManual.style.height =
        "auto";


    mensajeManual.style.height =
        Math.min(
            mensajeManual.scrollHeight,
            140
        ) + "px";

}


// ============================================================
// EVENTOS CONVERSACIONES
// ============================================================

buscarConversacion.addEventListener(
    "input",
    renderizarConversaciones
);


botonesFiltro.forEach(
    (boton) => {

        boton.addEventListener(
            "click",
            () => {

                filtroActual =
                    boton.dataset.filtro ||
                    "todas";


                botonesFiltro.forEach(
                    (item) =>
                        item.classList.remove(
                            "activo"
                        )
                );


                boton.classList.add(
                    "activo"
                );


                renderizarConversaciones();

            }
        );

    }
);


// ============================================================
// ACTUALIZAR
// ============================================================

btnActualizarConversaciones.addEventListener(
    "click",
    async () => {

        await cargarConfiguracionChatbot();

        iniciarConversaciones();


        mostrarNotificacion(
            "Conversaciones actualizadas.",
            "exito"
        );

    }
);


// ============================================================
// BOT / HUMANO
// ============================================================

btnActivarBot.addEventListener(
    "click",
    () => {

        if (!conversacionSeleccionada) {

            return;

        }


        abrirConfirmacion(

            "Activar chatbot",

            "El chatbot volverá a responder automáticamente a esta conversación.",

            () =>
                cambiarModoAtencion(
                    "bot"
                )

        );

    }
);


btnAtencionHumana.addEventListener(
    "click",
    () => {

        if (!conversacionSeleccionada) {

            return;

        }


        abrirConfirmacion(

            "Atención humana",

            "El chatbot dejará de responder automáticamente.",

            () =>
                cambiarModoAtencion(
                    "humano"
                )

        );

    }
);


// ============================================================
// CERRAR
// ============================================================

btnCerrarConversacion.addEventListener(
    "click",
    () => {

        if (!conversacionSeleccionada) {

            return;

        }


        abrirConfirmacion(

            "Cerrar conversación",

            "¿Deseas cerrar esta conversación?",

            cerrarConversacion

        );

    }
);


// ============================================================
// ARCHIVOS
// ============================================================

btnCamara.addEventListener(
    "click",
    () =>
        inputCamara.click()
);


btnImagen.addEventListener(
    "click",
    () =>
        inputImagen.click()
);


btnArchivo.addEventListener(
    "click",
    () =>
        inputArchivo.click()
);


inputCamara.addEventListener(
    "change",
    () => {

        seleccionarArchivo(
            inputCamara.files[0],
            "imagen"
        );

    }
);


inputImagen.addEventListener(
    "change",
    () => {

        seleccionarArchivo(
            inputImagen.files[0],
            "imagen"
        );

    }
);


inputArchivo.addEventListener(
    "change",
    () => {

        seleccionarArchivo(
            inputArchivo.files[0],
            "documento"
        );

    }
);


btnQuitarAdjunto.addEventListener(
    "click",
    limpiarAdjunto
);


// ============================================================
// ENVIAR MENSAJE
// ============================================================

btnEnviarMensaje.addEventListener(
    "click",
    enviarMensajeManual
);


mensajeManual.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key ===
                "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            enviarMensajeManual();

        }

    }
);


mensajeManual.addEventListener(
    "input",
    ajustarTextarea
);


// ============================================================
// MENSAJES MASIVOS
// ============================================================

btnMensajeMasivo.addEventListener(
    "click",
    abrirModalMasivo
);


btnCancelarMasivo.addEventListener(
    "click",
    cerrarModalMasivo
);


selectorDestinatariosMasivo.addEventListener(
    "change",
    () => {

        const manual =
            selectorDestinatariosMasivo.value ===
            "seleccionar";


        contenedorSeleccionContactos.classList.toggle(
            "oculto",
            !manual
        );


        if (manual) {

            renderizarContactosMasivo();

        }


        actualizarCantidadMasiva();

    }
);


buscarContactoMasivo.addEventListener(
    "input",
    renderizarContactosMasivo
);


btnEnviarMasivo.addEventListener(
    "click",
    () => {

        const cantidad =
            obtenerDestinatariosMasivo()
                .length;


        abrirConfirmacion(

            "Enviar mensaje masivo",

            `El mensaje será enviado a ${cantidad} contacto(s). ¿Deseas continuar?`,

            enviarMensajeMasivo

        );

    }
);


// ============================================================
// MODAL CONFIRMACIÓN
// ============================================================

btnCancelarModal.addEventListener(
    "click",
    cerrarModal
);


btnConfirmarModal.addEventListener(
    "click",
    async () => {

        if (!accionConfirmacion) {

            cerrarModal();

            return;

        }


        const accion =
            accionConfirmacion;


        cerrarModal();


        try {

            await accion();

        }

        catch (error) {

            console.error(
                error
            );

        }

    }
);


const overlayConfirmacion =
    modalConfirmacion.querySelector(
        ".modal-overlay"
    );


if (overlayConfirmacion) {

    overlayConfirmacion.addEventListener(
        "click",
        cerrarModal
    );

}


const overlayMasivo =
    modalMensajeMasivo.querySelector(
        ".modal-overlay"
    );


if (overlayMasivo) {

    overlayMasivo.addEventListener(
        "click",
        cerrarModalMasivo
    );

}


// ============================================================
// INICIAR
// ============================================================

async function iniciarSistema() {

    await cargarConfiguracionChatbot();

    iniciarConversaciones();

}


iniciarSistema();