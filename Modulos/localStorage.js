import{lista_recordatorios} from "./elementos.js"

export function agregarRecordatorioLS(recordatorio, fecha, hora) {
    let recordatorios = leerLocalStorage();
  
    let recordatorioCompleto = `${recordatorio}!#${fecha} ${hora}`;
    let arregoRecordatorio = recordatorioCompleto.split("!#");
  
    recordatorios.push(arregoRecordatorio);
  
    localStorage.setItem("recordatorios", JSON.stringify(recordatorios));
  }
  
  export function leerLocalStorage() {
    let recordatorios;
    if (localStorage.getItem("recordatorios") == null) {
      recordatorios = [];
    } else {
      recordatorios = JSON.parse(localStorage.getItem("recordatorios"));
    }
    return recordatorios;
  }
  
  export function recuperarDatos() {
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
  
  export function eliminarRecordatoriLS(recordatorioParametro) {
    let recordatorios = leerLocalStorage();
  
    recordatorios.forEach((recordatorio, index) => {
      if (recordatorio.includes(recordatorioParametro)) {
        recordatorios.splice(index, 1);
      }
    });
  
    localStorage.setItem("recordatorios", JSON.stringify(recordatorios));
  }
  