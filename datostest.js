// Por cada prueba
// valores : conjunto de campos de formulario y valores de campos
// condicion : valor de respuesta esperado en el campo ['code']
//
const test = {
  0: {
    valores: {
      controlador: "AUTH",
      action: "LOGIN",
      usuario: "ejemplo",
      contrasena: "ejemplo",
    },
    condicion: { valor: "LOGIN_OK" },
  },
  1: {
    valores: {
      controlador: "AUTH",
      action: "LOGIN",
      usuario: "ejemplo",
      contrasena: "ejemplo1",
    },
    condicion: { valor: "USUARIO_PASS_KO" },
  },
  2: {
    valores: {
      controlador: "AUTH",
      action: "LOGIN",
      usuario: "ejemplo1",
      contrasena: "ejemplo",
    },
    condicion: { valor: "USUARIO_LOGIN_KO" },
  },
  ///////////////////////////////////////////////////////////////////////////////
  /// AÑADIDOS
  ///////////////////////////////////////////////////////////////////////////////
  3: {
    valores: {
      controlador: "usuario",
      action: "ADD",
      dni: "",
      usuario: "",
      id_rol: 0,
    },
    condicion: { valor: "dni_es_nulo_KO" },
  },
  4: {
    valores: {
      controlador: "usuario",
      action: "DELETE",
      dni: "11111111H",
      usuario: "root",
    },
    condicion: { valor: "admin_no_se_puede_borrar_KO" },
  },
  5: {
    valores: {
      controlador: "AUTH",
      action: "LOGIN",
      usuario: "root",
      contrasena: "63a9f0ea7bb98050796b649e85481845",
    },
    condicion: { valor: "LOGIN_OK" },
  },
};
