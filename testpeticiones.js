const URL_BACK = "http://193.147.87.202/Back/index.php";

/*

	funcion principal para iniciar la tabla e invocar la llamada a la funcion que lanza los test a la promesa
*/

async function realizarTestPeticiones() {
  const tbody = document.getElementById("datosresultados");
  const arrPruebas = Object.entries(test);

  const trBarraCarga = document.getElementById("tr-barra-carga");
  const barraCarga = trBarraCarga.querySelector("progress");
  barraCarga.max = arrPruebas.length;
  barraCarga.value = 0;

  for (const prueba of arrPruebas) {
    let tr;
    try {
      const resultado = await peticionBack(
        new URLSearchParams(prueba[1].valores)
      );
      const correcta = resultado == prueba[1].condicion.valor;
      tr = crearTR(
        prueba[0],
        prueba[1].valores.controlador,
        prueba[1].valores.action,
        getAtributos(prueba[1].valores),
        resultado,
        prueba[1].condicion.valor,
        correcta ? "SI" : "NO"
      );
      tr.style.backgroundColor = correcta ? "#56e359" : "#ff3838";
    } catch (err) {
      tr = crearTR(
        prueba[0],
        prueba[1].valores.controlador,
        prueba[1].valores.action,
        getAtributos(prueba[1].valores),
        err,
        prueba[1].condicion.valor,
        "NO"
      );
      tr.style.backgroundColor = "#ff70f1";
    } finally {
      tbody.append(tr);
      barraCarga.value++;
    }
  }

  trBarraCarga.remove();
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
    const td = document.createElement("td");
    td.append(n);
    tr.append(td);
  }
  return tr;
}
