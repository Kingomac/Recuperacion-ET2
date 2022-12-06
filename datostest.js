// Por cada prueba
// valores : conjunto de campos de formulario y valores de campos
// condicion : valor de respuesta esperado en el campo ['code']
//
const test= {
		0:{
			valores : {'controlador':'AUTH','action':'LOGIN','usuario':'ejemplo','contrasena':'ejemplo'},
			condicion : {'valor':'LOGIN_OK'}
		},
		1:{
			valores : {'controlador':'AUTH','action':'LOGIN','usuario':'ejemplo','contrasena':'ejemplo1'},
			condicion : {'valor':'USUARIO_PASS_KO'}
		},
		2:{
			valores : {'controlador':'AUTH','action':'LOGIN','usuario':'ejemplo1','contrasena':'ejemplo'},
			condicion : {'valor':'USUARIO_LOGIN_KO'}
		}
	}