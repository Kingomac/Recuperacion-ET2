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
    const tr = crearTR(
      prueba[0],
      prueba[1].valores.controlador,
      prueba[1].valores.action,
      getAtributos(prueba[1].valores)
    );

    try {
      const resultado = await peticionBack(
        new URLSearchParams(prueba[1].valores)
      );
      const correcta = resultado == prueba[1].condicion.valor;
      tr.append(
        ...crearTR(resultado, prueba[1].condicion.valor, correcta ? "SI" : "NO")
          .children
      );
      tr.style.backgroundColor = correcta ? "#56e359" : "#ff4747";
    } catch (err) {
      tr.append(...crearTR(resultado, prueba[1].condicion.valor, err).children);
      tr.style.backgroundColor = "#ff70f1";
    } finally {
      tbody.append(tr);
      barraCarga.value++;
    }
  }

  trBarraCarga.remove();
}

/**
 * Crea una lista desordenada con los atributos
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
      /*if (atrib == "contrasena") {
        const el2 = document.createElement("li");
        el2.append(`contrasenaEncriptada : ${hex_md5(valor)}`);
        lista.append(el2);
      }*/
      lista.append(el);
    });
  return lista;
}

/**
 * Hace una petición POST al back
 * @param {*} datos body de la petición
 * @returns código de respuesta del back
 */
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
 * Crea un `<tr>` de una lista de nodos
 * @param  {...Node|string|{id: string}} nodos
 * @returns
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
