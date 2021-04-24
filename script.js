const lista_recordatorios = document.getElementById("lista-recordatorios"),
  formulario = document.getElementById("formulario"),
  boton = document.querySelector("#boton"),
  contenido_Recordatorio = document.getElementById("nota");

function verificarTextArea() {
  //console.log(contenido_Recordatorio.value);
  let recordatorio = contenido_Recordatorio.value.trim()
  if (recordatorio != "") {
    boton.removeAttribute("disabled");
  } else {
    boton.setAttribute("disabled", "true");
  }
}

formulario.addEventListener("submit", agregarRecordatorio);
lista_recordatorios.addEventListener("click", eliminarRecordatorio);
document.addEventListener("DOMContentLoaded", recuperarDatos);

formulario.addEventListener("keyup", function (e) {
  if (e.key === 'Enter') {
    agregarRecordatorio(e);
    let modalSimple= document.querySelector("#formModal");
    let referencia = M.Modal.getInstance(modalSimple)
    //console.log(referencia)
    referencia.close()
  }
});

function agregarRecordatorio(event) {
  event.preventDefault();

  let fecha = new Date();
  let fechaCompleta = `${fecha.getDate()}/${
    fecha.getMonth() + 1
  }/${fecha.getFullYear()}`;
  let hora = `${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;

  //console.log(fechaCompleta, hora);

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

  //localStorage.setItem('recordatorio',contenido_Recordatorio.value);

  agregarRecordatorioLS(contenido_Recordatorio.value.trim(), fechaCompleta, hora);

  boton.setAttribute("disabled", "true");
  formulario.reset();
}

function eliminarRecordatorio(e) {
  //console.log(e.target.id)
  if (e.target.id === "cerrar") {
    //console.log('boton de cerrar')
    //console.log(e.target.nextElementSibling)
    //console.log(e.target.parentElement.parentElement)
    if (confirm("Decea eliminar esta nota?")) {
      eliminarRecordatoriLS(e.target.nextElementSibling.innerText);
      e.target.parentElement.parentElement.remove();
      alert("Nota eliminada corectamente");
    }
  }
}

function agregarRecordatorioLS(recordatorio, fecha, hora) {
  let recordatorios = leerLocalStorage();

  let recordatorioCompleto = `${recordatorio}!#${fecha} ${hora}`;
  let arregoRecordatorio = recordatorioCompleto.split("!#");

  recordatorios.push(arregoRecordatorio);

  localStorage.setItem("recordatorios", JSON.stringify(recordatorios));
}

function leerLocalStorage() {
  let recordatorios;
  if (localStorage.getItem("recordatorios") == null) {
    recordatorios = [];
  } else {
    recordatorios = JSON.parse(localStorage.getItem("recordatorios"));
  }
  return recordatorios;
}

function recuperarDatos() {
  let recordatorios = leerLocalStorage();
  recordatorios.forEach((recordatorio) => {
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
    parrafo.innerText = recordatorio[0];

    const divisor = document.createElement("div");
    divisor.classList.add("divider");

    const footer = document.createElement("div");
    footer.classList.add("footer", "grey-text", "blue-grey", "lighten-5");
    // footer.innerText = `fecha Aqui`;
    footer.innerText = `Publicado el: ${recordatorio[1]}`;

    contenedor.appendChild(card);
    card.appendChild(span);
    card.appendChild(content);
    content.appendChild(parrafo);
    card.appendChild(divisor);
    card.appendChild(footer);

    lista_recordatorios.appendChild(contenedor);
  });
}

function eliminarRecordatoriLS(recordatorioParametro) {
  let recordatorios = leerLocalStorage();

  recordatorios.forEach((recordatorio, index) => {
    if (recordatorio.includes(recordatorioParametro)) {
      recordatorios.splice(index, 1);
    }
  });

  localStorage.setItem("recordatorios", JSON.stringify(recordatorios));
}
