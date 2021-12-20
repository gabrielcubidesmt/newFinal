//Definiciones globales al script
const errores = document.getElementsByClassName("err");
const mensaje = document.getElementById("mensaje");

let opcionConsultaSeleccionada;

/**
 * Este evento de JQuery se ejecuta cuando se termina de cargar la libreria
 */
$(document).ready(function () {
    estadoInicial();
    listar();

    //Evento clic del botón, ejecuta una petición al ws de autenticación si el usuario ingreso información
    $("#autenticate").click(function () {
        if (validar()) {
            autenticate();
        }
    });

    //eventos clic sobre los campos para ocultar los mensajes de error
    $("#inputEmail").click(function () {
        errores[0].style.display = "none";
    });

    $("#inputPassword").click(function () {
        errores[1].style.display = "none";
    });

    //selecciono una opci{on de consulta}
    $("#opcionConsulta").change(function(){
        activaCaja();
    })

    $("#consultarProducto").click(function () {
        opcionesConsulta()
    });
});

/**
 * Estado inicial de la pagina
 */
function estadoInicial() {
    $("#camposConsulta").hide();
    $("#byPrice").hide();
    $("#byDescription").hide();
    $("#alerta").hide();
    $("#listado").hide();
    $("#listadoxprecio").hide();
    $("#listadoxdescripcion").hide();
    errores[0].style.display = "none";
    errores[1].style.display = "none";
    $("#inputEmail").focus();
}

/**
 * Valida el correcto diligenciamiento de los campos del formulario
 * @returns true si pasa las validaciones del formulario, false en caso contrario
 */
function validar() {

    //obtiene valores
    let inputEmail = $("#inputEmail").val();
    let inputPassword = $("#inputPassword").val();

    //valida que los campos no sean vacios
    if (validaesVacio(inputEmail)) {
        errores[0].style.display = "block";
        $("#inputEmail").focus();
        return false;

    } else if (!ValidateEmail(inputEmail)) {
        errores[0].style.display = "block";
        $("#inputEmail").focus();
        return false;
    } else if (validaesVacio(inputPassword)) {
        errores[1].style.display = "block";
        $("#inputPassword").focus();
        return false;
    }

    return true;
}

/**
 * Procesa peticiòn de tipo GET para validar si la combinación email/contraseña corresponde a un usuario de la aplicación
 */
function autenticate() {
    let inputEmail = $("#inputEmail").val();
    let inputPassword = $("#inputPassword").val();

    $.ajax({
        // la URL para la petición (url: "url al recurso o endpoint")
        // localtest
        //url: `http://155.248.195.17:8080/api/user/${inputEmail}/${inputPassword}`,
        // prod test
        url: 'http://155.248.195.17:8080/api/user/'+inputEmail+'/'+inputPassword,

        // especifica el tipo de petición http: POST, GET, PUT, DELETE
        type: 'GET',

        // el tipo de información que se espera de respuesta
        dataType: 'json',

        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (respuesta) {
            console.table(respuesta);
            //recibe la respuesta a la petición, y valida si el usuario puede se valido correctamente en la aplicación
            gestionaResultado(respuesta);
        },

        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            $("#alerta").show();
            $("#mensaje").html("Ocurrio un problema al ejecutar la petición..." + status);
        }
    });
}

/**
 * Valida si el usuario se autentico correctamente en la aplicaciòn o no:
 * 
 * Si el id del usuario es null no fue posible la autenticacion, en caso contrario
 * obtiene informacion del usuario, crea objeto javascript, lo convierte a json y lo guarda en el 
 * sessionStorage para que esta informacion este accesible desde el menu de opciones
 * @param {*} respuesta el resultado de la peticion al ws de autenticacion
 */
function gestionaResultado(respuesta) {

    if (respuesta.id == null) {
        $("#alerta").show();
        $("#mensaje").html("Usuario no registrado, por favor valide credenciales de acceso...");
        $("#inputEmail").focus();
    } else {
        //crea objeto javascript que contiene la información del usuario
        let userJS = {
            id: respuesta.id,
            identification: respuesta.identification,
            name: respuesta.name,
            birthtDay: respuesta.birthtDay,
            monthBirthtDay: respuesta.monthBirthtDay,
            address: respuesta.address,
            cellPhone: respuesta.cellPhone,
            email: respuesta.email,
            password: respuesta.password,
            zone: respuesta.zone,
            type: respuesta.type
        };

        //transforma el objeto javascript a json antes de guardarlo en el sessionStorage
        let user = JSON.stringify(userJS);

        //almacena el usuario en el sessionStorage, para hacerlo disponible a las otras páginas
        sessionStorage.setItem("user", user);

        location.href = "menu.html";

        $("#alerta").show();
        $("#mensaje").html("Bienvenido(a) " + userJS.name);
        $("#inputEmail").focus();

    }
}

/**
 * Activa la caja para registrar precio o descripción según el caso
 */
function activaCaja(){
    opcionConsultaSeleccionada = $("#opcionConsulta").val();

    $("#camposConsulta").show();
    $("#byPrice").show();
    $("#byDescription").hide();

    if (opcionConsultaSeleccionada=="0") {
        $("#camposConsulta").hide();
        $("#byPrice").hide();
        $("#byDescription").hide();
        $("#byPrice").hide();    
    }else if (opcionConsultaSeleccionada=="1") {
        $("#camposConsulta").show();
        $("#byPrice").show();
        $("#byPrice").val("");
        $("#byDescription").hide();
        $("#byPrice").focus();
    }else if (opcionConsultaSeleccionada=="2"){
        $("#camposConsulta").show();
        $("#byPrice").hide();
        $("#byDescription").show();
        $("#byDescription").val("");
        $("#byDescription").focus();
    }else{
        Swal.fire('Debe seleccionar una opción de consulta');
        $("#opcionConsulta").focus();
    }
}

/**
 * valida cual de los WS de consulta ejecutar dependiendo de la opción de consutla seleccionada
 */
function opcionesConsulta(){
    if (opcionConsultaSeleccionada=="0") listar();
    else if (opcionConsultaSeleccionada=="1") listarxPrecio();
    else if (opcionConsultaSeleccionada=="2") listarxDescripcion()
}
