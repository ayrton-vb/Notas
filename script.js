import {
  contenido_Recordatorio,
  formulario,
  lista_recordatorios,
} from "./Modulos/elementos.js";

import {
  agregarEnter,
  verificarTextArea,
  agregarRecordatorio,
  eliminarRecordatorio,
} from "./Modulos/funciones.js";

import {
  recuperarDatos,
} from "./Modulos/localStorage.js";


document.addEventListener("DOMContentLoaded", recuperarDatos);

formulario.addEventListener("submit", agregarRecordatorio);
lista_recordatorios.addEventListener("click", eliminarRecordatorio);
contenido_Recordatorio.addEventListener("keydown", verificarTextArea);
formulario.addEventListener("keyup", agregarEnter);