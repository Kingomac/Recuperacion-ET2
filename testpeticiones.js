const URL_BACK = "http://193.147.87.202/Back/index.php";

/*

	funcion principal para iniciar la tabla e invocar la llamada a la funcion que lanza los test a la promesa
*/

function realizarTestPeticiones() {
  $("#tituloresultados").html("");
  titulotabla =
    "<tr><th>Num. Prueba</th><th>Controlador</th><th>Accion</th><th>Atributos</th><th>Obtenido</th><th>Esperado</th><th>Correcta</th></tr>";
  $("#tituloresultados").append(titulotabla);

  const tbody = document.getElementById("datosresultados");
  for (const prueba of Object.entries(test)) {
    const tdObtenido = document.createElement("td");
    tdObtenido.append(document.createElement("progress"));
    const tdOK = document.createElement("td");
    tdOK.append(document.createElement("progress"));
    const tr = crearTR(
      prueba[0],
      prueba[1].valores.controlador,
      prueba[1].valores.action,
      getAtributos(prueba[1].valores),
      tdObtenido,
      prueba[1].condicion.valor,
      tdOK
    );
    tbody.append(tr);
    peticionBack(new URLSearchParams(prueba[1].valores))
      .then((resultado) => {
        tdObtenido.textContent = resultado;
        if (resultado == prueba[1].condicion.valor) {
          tdOK.textContent = "OK";
          tr.style.backgroundColor = "#56e359";
        } else {
          tdOK.textContent = "FALLO";
          tr.style.backgroundColor = "#ff3838";
        }
      })
      .catch((err) => {
        tdObtenido.textContent = err;
        tdOK.textContent = "FALLO";
        tr.style.backgroundColor = "#ff70f1";
      });
  }
}

/**
 *
 * @param {Record<string, string>} valores
 * @returns
 */
function getAtributos(valores) {
  const lista = document.createElement("ul");
  Object.entries(valores)
    .filter(([atrib, _]) => atrib != "controlador" && atrib != "action")
    .forEach(([atrib, valor]) => {
      const el = document.createElement("li");
      el.append(`${atrib} : ${valor}`);
      lista.append(el);
    });
  return lista;
}

function peticionBack(datos) {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: URL_BACK,
      data: datos,
      processData: false,
      contentType: false,
    })
      .done((res) => {
        resolve(res.code);
      })
      .fail((res) => {
        reject(`http_status_${res.status}`);
      });
  });
}

/**
 * @param  {...Node|string|{id: string}} nodos
 */
function crearTR(...nodos) {
  const tr = document.createElement("tr");
  for (const n of nodos) {
    if (n instanceof HTMLTableCellElement) {
      tr.append(n);
    } else {
      const td = document.createElement("td");
      td.append(n);
      tr.append(td);
    }
  }
  return tr;
}
