let userId;
let orders = [];
let products = [];
let quantities = [];
/**
 * Establece el aspecto inicial de la interfaz
 */
function estadoInicial() {
  $("#alerta").hide();
  $("#procesarOrden").hide();
  $("#pedido").hide();
  $("#pedido").html("");
  $("#listado").hide();

  let user = sessionStorage.getItem("user");

  if (user == null) location.href = "index.html";
  else {
    let userJS = JSON.parse(user);
    userId = userJS.id;
    let typeUser;

    if (userJS.type == "ASE") typeUser = "ASESOR";
    else location.href = "index.html";

    $("#nameUser").html(userJS.name);
    $("#emailUser").html(userJS.email);
    $("#typeUser").html(typeUser);
  }
}

/**
 * Invoca servicio Web que se encarga de recuperar las ordenes x estado y asesor
 */
function listar() {
  let monthBirthDay = $("#monthBirthDay").val();

  $.ajax({
    // la URL para la petición (url: "url al recurso o endpoint")
    url: `http://155.248.195.17:8080/api/user/birthday/${monthBirthDay}`,

    // especifica el tipo de petición http: POST, GET, PUT, DELETE
    type: "GET",

    // el tipo de información que se espera de respuesta
    dataType: "json",

    // código a ejecutar si la petición es satisfactoria;
    // la respuesta es pasada como argumento a la función
    success: function (respuesta) {
      //recibe el arreglo 'items' de la respuesta a la petición
      console.log(respuesta);
      listarUsuarios(respuesta);
    },

    // código a ejecutar si la petición falla;
    // son pasados como argumentos a la función
    // el objeto de la petición en crudo y código de estatus de la petición
    error: function (xhr, status) {
      $("#alerta").html(
        "Ocurrio un problema al ejecutar la petición..." + status
      );
    },
  });
}

function listarUsuarios(items) {
  $("#listado").html("");
  $("#listado").show(500);

  let tabla = `<table class="table table-dark table-hover mt-5">
              <thead>
                <tr>
                  <th>Identification</th>
                  <th>Nombre</th>
                  <th>Dirección</th>
                  <th>Telefono</th>
                  <th>Email</th>
                  <th>Zona</th>
                  <th>Tipo</th>
                  <th>Cumpleaños</th>
                </tr>`;
  //escribe en la consola del desarrollador para efectos de depuración
  console.log(items);

  //recorrer el arreglo de items de producto para pintarlos en la tabla
  for (let index = 0; index < items.length; index++) {

      let texto = `<strong>Identificación:</strong> ${items[index].identification}</br><strong>Nombre:</strong> ${items[index].name}</br><strong>Email:</strong> ${items[index].email}`;
      let typeUser;
      let birthtDay = items[index].birthtDay;
      birthtDay = birthtDay.substring(0, birthtDay.indexOf("T", birthtDay));

      if (items[index].type=="ADM")
          typeUser="ADMINISTRADOR";
      else if(items[index].type=="ASE")
          typeUser="ASESOR";
      else if(items[index].type=="COORD")
          typeUser="COORDINADOR";
      

      tabla += `<tr>
                <td>${items[index].identification}</td>
                 <td>${items[index].name}</td>
                 <td>${items[index].address}</td>
                 <td>${items[index].cellPhone}</td>
                 <td>${items[index].email}</td>
                 <td>${items[index].zone}</td>
                 <td>${typeUser}</td>
                 <td>${birthtDay}</td>
                  </td>
                 </tr>`;
  }

  //cierra tabla agregando el tag adecuado
  tabla += `</thead></table>`;

  //accede al elemento con id 'listado' y adiciona la tabla de datos a su html
  $("#listado").html(tabla);

}

//$(document).ready(function () {
//carga la librería javascript de jquery cuando se carga la página barcos.html por completo
//cuando carga la página html se ejecuta la función: listar()
$(document).ready(function () {
  //ejecuta función para enviar petición al ws
  estadoInicial();

  //si hizo clic en el enlace de cerrar sesion
  $("#cerrarSession").click(function () {
    sessionStorage.removeItem("user");
    location.href = "index.html";
  });

  $("#consultarMes").click(function () {
    listar();
  });
});
