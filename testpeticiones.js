/*

	funcion principal para iniciar la tabla e invocar la llamada a la funcion que lanza los test a la promesa
*/

function realizarTestPeticiones() {
  $("#tituloresultados").html("");
  titulotabla =
    "<tr><th>Num. Prueba</th><th>Controlador</th><th>Accion</th><th>Atributos</th><th>Obtenido</th><th>Esperado</th><th>Correcta</th></tr>";
  $("#tituloresultados").append(titulotabla);

  const tbody = document.getElementById("datosresultados");
  let promesas = [];
  for (const prueba of Object.entries(test)) {
    tbody.append(
      crearTR(
        prueba[0],
        prueba[1].valores.controlador,
        prueba[1].valores.action,
        getAtributos(prueba[1].valores),
        document.createElement("progress"),
        prueba[1].condicion.valor,
        document.createElement("progress")
      )
    );
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
 * @param  {...Node|string} nodos
 */
function crearTR(...nodos) {
  const tr = document.createElement("tr");
  for (const n of nodos) {
    const td = document.createElement("td");
    td.append(n);
    tr.append(td);
  }
  return tr;
}
