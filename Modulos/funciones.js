import {agregarRecordatorioLS, eliminarRecordatoriLS } from "./localStorage.js";

import {
  boton,
  contenido_Recordatorio,
  lista_recordatorios,
} from "./elementos.js";

export function agregarEnter(e) {
  if (e.key === "Enter") {
    agregarRecordatorio(e);
    let modalSimple = document.querySelector("#formModal");
    let referencia = M.Modal.getInstance(modalSimple);
    referencia.close();
  }
}

export function verificarTextArea() {
  let recordatorio = contenido_Recordatorio.value.trim();
  if (recordatorio != "") {
    boton.removeAttribute("disabled");
  } else {
    boton.setAttribute("disabled", "true");
  }
}

export function agregarRecordatorio(event) {
  event.preventDefault();
  let fecha = new Date();
  let fechaCompleta = `${fecha.getDate()}/${
    fecha.getMonth() + 1
  }/${fecha.getFullYear()}`;
  let hora = `${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;
  const contenedor = document.createElement("div");
  contenedor.classList.add("col");
  contenedor.classList.add("s12");
  contenedor.classList.add("m6");
  contenedor.classList.add("l4");
  contenedor.classList.add("collection-item");

  const card = document.createElement("div");
  card.classList.add("card", "z-depth-3");

  const span = document.createElement("span");
  span.classList.add("badge", "material-icons", "blue-text", "waves-effect");
  span.setAttribute("cursor", "pointer");
  span.setAttribute("id", "cerrar");
  span.innerText = "cancel";

  const content = document.createElement("div");
  content.classList.add("card-content");

  const parrafo = document.createElement("p");
  parrafo.innerText = contenido_Recordatorio.value.trim();

  const divisor = document.createElement("div");
  divisor.classList.add("divider");

  const footer = document.createElement("div");
  footer.classList.add("footer", "grey-text", "blue-grey", "lighten-5");
  footer.innerText = `Publicado el: ${fechaCompleta} ${hora}`;

  contenedor.appendChild(card);
  card.appendChild(span);
  card.appendChild(content);
  content.appendChild(parrafo);
  card.appendChild(divisor);
  card.appendChild(footer);

  lista_recordatorios.appendChild(contenedor);

  agregarRecordatorioLS(
    contenido_Recordatorio.value.trim(),
    fechaCompleta,
    hora
  );

  boton.setAttribute("disabled", "true");
  formulario.reset();
}

export function eliminarRecordatorio(e) {
  if (e.target.id === "cerrar") {
    if (confirm("Decea eliminar esta nota?")) {
      eliminarRecordatoriLS(e.target.nextElementSibling.innerText);
      e.target.parentElement.parentElement.remove();
      alert("Nota eliminada corectamente");
    }
  }
}
