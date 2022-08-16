verInicio();//se muestra la pagina de inicio como primer paso al abrir el index.html en un navegador
document.querySelector("#cierrosesion").style.display = "none";
mostrarCalificaciones();
actualizarCuposResPend();

let numIdActual = 100;

function registrarUsuario() {//creara un nuevo objeto de usuario cliente y lo agrega al array de clientes y el array de totalUsuarios.
    document.querySelector("#avisoRegistro").innerHTML = "";
    let nombreCampo = document.querySelector("#txtRegistroNombre").value;
    let nombreUsuarioCampo = document.querySelector("#txtNombreUsuarioR").value;
    nombreCampo = nombreCampo.toLowerCase();
    nombreUsuarioCampo = nombreUsuarioCampo.toLowerCase();
    let passwordCampo = document.querySelector("#txtRegistroPass").value;
    valMinusInic = contarMinusculas(nombreUsuarioCampo);
    valMinusInic2 = contarMinusculas(nombreCampo);
    if (nombreCampo === "" || nombreUsuarioCampo === "" || valMinusInic < 1 || valMinusInic2 < 1) {
        alert("Debes llenar correctamente todos los campos, nombre y nombre de usuario deben tener al menos una letra");
    } else {
        for (let i = 0; i < totalUsuarios.length; i++) {
            const cliente = totalUsuarios[i];
            if (cliente.usuario === nombreUsuarioCampo) {
                return document.querySelector("#avisoRegistro").innerHTML = "ya existe una cuenta con ese nombre de usuario, por favor escribir otro";
            }
        }
        numIdActual++;
        valMayus = contarMayusculas(passwordCampo);
        valMinus = contarMinusculas(passwordCampo);
        valNums = contarNumeros(passwordCampo);
        if (valMayus >= 1 && valMinus >= 1 && valNums >= 1 && passwordCampo.length >= 6) {
            let nuevoUsuario = new UsuarioCliente(numIdActual, nombreCampo, nombreUsuarioCampo, passwordCampo);
            clientes.push(nuevoUsuario);
            totalUsuarios.push(nuevoUsuario);
            alert(`${nombreUsuarioCampo} se ha registrado exitosamente`);
            vaciarCamposReg();
            ocultarTodo();
            document.getElementById('secInic').style.display = 'block';
        } else {
            document.querySelector("#avisoRegistro").innerHTML = "Revisar la contraseña ingresada(debe contar con un mínimo de 6 caracteres, con al menos una mayúscula, una minúscula y un número.)";
        }
    }
}

function iniciarSesion() {
    let nombreLoginCampo = document.querySelector("#txtNombreUsuario").value;
    let passwordLoginCampo = document.querySelector("#txtPassUsuario").value;
    nombreLoginCampo = nombreLoginCampo.toLowerCase();
    let esCliente = buscarCuentaClientes(nombreLoginCampo, passwordLoginCampo); //buscamos el usuario y contraseña ingresados y al mismo tiempo verificamos pertenecen a un local o cliente
    let esLocal = buscarCuentaLocales(nombreLoginCampo, passwordLoginCampo);
    existencia = buscarUsuarios(nombreLoginCampo);
    if (nombreLoginCampo === "") {
        alert("Ingresa un nombre de usuario");
    } else {
        if (existencia === "si") {
            if (esCliente === "si") {
                tipoUsuarioLogeado = "Cliente"
                usuarioActual = nombreLoginCampo;
                nombreActual = buscarNombreCliente(nombreLoginCampo);
                vaciarCamposIni();
                verInicio();
                document.querySelector("#registrarse").style.display = "none";
                document.querySelector("#iniciarse").style.display = "none";
                document.querySelector("#cierrosesion").style.display = "block";
                alert(`${usuarioActual} ha iniciado sesion`);
            } else if (esLocal === "si") {
                let num = buscarNombreLocal(nombreLoginCampo);
                tipoUsuarioLogeado = locales[num].usuario;
                vaciarCamposIni();
                verInicio();
                document.querySelector("#registrarse").style.display = "none";
                document.querySelector("#iniciarse").style.display = "none";
                document.querySelector("#cierrosesion").style.display = "block";
                alert(`${tipoUsuarioLogeado} ha iniciado sesion`);
            } else {
                alert("el usuario y/o contraseña son incorrectos");
            }
        } else {
            alert("el usuario ingresado no existe");
        }
    }
}

btns = document.querySelectorAll(".btn");
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", MostrarFuncion);
}

function MostrarFuncion() {//ejecuta ciertas funciones cuando se hace click en ciertos botones
    idbtn = this.getAttribute("id");
    switch (idbtn) {
        case "btnRegistrar":
            registrarUsuario();
            break;
        case "btnIniciarSesion":
            iniciarSesion();
            break;
        case "registrarse":
            ocultarTodo();
            document.getElementById('secRegist').style.display = 'block';
            break;
        case "iniciarse":
            ocultarTodo();
            document.getElementById('secInic').style.display = 'block';
            break;
        case "inicio":
            verInicio();
            mostrarCalificaciones();
            break;
        case "info":
            document.querySelector("#information").style.display = "block";
            break;
        case "reservas":
            if (tipoUsuarioLogeado === "Cliente") {
                ocultarTodo();
                document.getElementById('resClientes').style.display = 'block';
                document.querySelector("#slcLocalParaReserva").value = "default";
                mostrarMisReservas();
                document.querySelector("#tblMisFinalizadas").innerHTML = "";
            } else if (tipoUsuarioLogeado === "default") {
                alert("Debe iniciar sesion para ver esta seccion")
            } else {
                ocultarTodo();
                mostrarCuposLocal();
                document.getElementById('resLocales').style.display = 'block';
                document.querySelector("#tblFinalizar").innerHTML = "";
            }
            break;
        case "btnVerFinalizadas":
            armarTablaFinalizadas();
            break;
        case "estadistica":
            if (tipoUsuarioLogeado === "Cliente") {
                ocultarTodo();
                mostrarMisEstadisticas();
                document.getElementById('estadisticaClientes').style.display = 'block';
            } else if (tipoUsuarioLogeado === "default") {
                alert("Debe iniciar sesion para ver esta seccion")
            } else {
                ocultarTodo();
                document.getElementById('estadisticaLocales').style.display = 'block';
                ocupacionDelLocal();
                verPromCalifLocal();
                listadoLocalesProm();
                reservasGenerales();
            }
            break;
        case "cierrosesion":
            cerrarSesion();
            break;
        case "btnModificar":
            CosasDelLocal();
            Disponibilidad();
            break;
        case "btnEstadoReserva":
            Disponibilidad()
            break;
        case "valorations":
            if (tipoUsuarioLogeado === "Cliente") {
                ocultarTodo();
                document.getElementById('estadProvis').style.display = 'block';
                document.querySelector("#slcLocal").value = "default";
                document.querySelector("#slcValor").value = "1";
            } else if (tipoUsuarioLogeado === "default") {
                alert("Debe iniciar sesion para ver esta seccion")
            } else {
                alert("Esta seccion es exclusiva para clientes");
                break;
            }
    }
}

document.querySelector("#slcLocalParaReserva").addEventListener("change", mostrarDisponibilidad);

function mostrarDisponibilidad() {//muestra la cantidad de cupos disponibles del local seleccionado
    document.querySelector("#pDisCupos").innerHTML = "";
    localSelec = document.querySelector("#slcLocalParaReserva").value;
    switch (localSelec) {
        case "rFrancis":
            document.querySelector("#pDisCupos").innerHTML = `Lugares disponibles: ` + locales[0].cupoMaximo;
            break;
        case "rGardenia":
            document.querySelector("#pDisCupos").innerHTML = `Lugares disponibles: ` + locales[1].cupoMaximo;
            break;
        case "rFusion":
            document.querySelector("#pDisCupos").innerHTML = `Lugares disponibles: ` + locales[2].cupoMaximo;
            break;
        case "tSolis":
            document.querySelector("#pDisCupos").innerHTML = `Lugares disponibles: ` + locales[4].cupoMaximo;
            break;
        case "tGalpon":
            document.querySelector("#pDisCupos").innerHTML = `Lugares disponibles: ` + locales[3].cupoMaximo;
            break;
        case "mBlanes":
            document.querySelector("#pDisCupos").innerHTML = `Lugares disponibles: ` + locales[5].cupoMaximo;
            break;
        case "mHisdelArte":
            document.querySelector("#pDisCupos").innerHTML = `Lugares disponibles: ` + locales[6].cupoMaximo;
            break;
        default:
            document.querySelector("#pDisCupos").innerHTML = "";
            break;
    }
}

document.querySelector("#btnReservar").addEventListener("click", solicitudReserva);

function solicitudReserva() {//se crea una reserva en estado pendiente para el local seleccionado,validando la cantidad de cupos ingresada con la cantidad de cupos del local
    arrResTemporal = [];
    document.querySelector("#pMensajeReserva").innerHTML = "";
    document.querySelector("#pDisCupos").innerHTML = "";
    ingresoCantidad = Number(document.querySelector("#txtCantidadLugares").value);
    localSeleCupos = document.querySelector("#slcLocalParaReserva").value;
    if (ingresoCantidad < 1) {
        alert("Ingrese un numero valido de cupos");
    } else {
        if (tipoUsuarioLogeado === "Cliente") {
            switch (localSeleCupos) {
                case "rFrancis":
                    francis();
                    break;
                case "rGardenia":
                    gardenia();
                    break;
                case "rFusion":
                    fusion();
                    break;
                case "tSolis":
                    solis();
                    break;
                case "tGalpon":
                    tGalpon();
                    break;
                case "mBlanes":
                    blanes();
                    break;
                case "mHisdelArte":
                    museodearte();
                    break;
                case "default":
                    alert("Debe seleccionar un local para realizar la reserva");
            }
        } else {
            alert("como cliente debe iniciar sesion para realizar una reserva");
        }
    }
    document.querySelector("#slcLocalParaReserva").value = "default";
}

function compararReservas() { //comparamos la reserva temporal creada con las que se encuentran en el array para descartar que no exista una reserva pendiente del mismo usuario
    let aparece;
    for (let i = 0; i < arrReservas.length; i++) {
        const reserva = arrReservas[i];
        if (reserva.usuario === arrResTemporal[0].usuario && reserva.estado === arrResTemporal[0].estado && reserva.local === arrResTemporal[0].local) {
            aparece = true;
            break;
        } else {
            aparece = false;
        }
    }
    return aparece
}

function armarTablaFinalizadas() {//arma una tabla para mostrar todas las reservas finalizadas de un clientes
    document.querySelector("#tblMisFinalizadas").innerHTML = "";
    for (let i = 0; i < arrReservas.length; i++) {
        const reserva = arrReservas[i];
        if (reserva.usuario === usuarioActual && reserva.estado === "finalizada") {
            document.querySelector("#tblMisFinalizadas").innerHTML += `<tr>
            <td>${reserva.fotoLocal}</td>
            <td>${reserva.local}</td>
            <td>${reserva.cupos}</td>
            <td>${reserva.estado}</td>
            </tr>`;
        }
    }
}

document.querySelector("#btnDispon").addEventListener("click", cambiarDisponibilidadLocal);
function cambiarDisponibilidadLocal() {//se cambia la disponibilidad de local, lo que incide en la solicitud de reservas del mismo
    for (let i = 0; i < locales.length; i++) {
        if (tipoUsuarioLogeado === locales[i].usuario)
            if (locales[i].disponibilidad === "habilitado") {
                locales[i].disponibilidad = "deshabilitado";
                alert("local deshabilitado");
                break;
            } else {
                locales[i].disponibilidad = "habilitado";
                alert("local habilitado");
                break;
            }
    }
    verReservas();
}

function mostrarMisReservas() {//se listan todas las reservas pendientes de un cliente logeado
    document.querySelector("#tblMisReservas").innerHTML = "";
    for (let i = 0; i < arrReservas.length; i++) {
        const reserva = arrReservas[i];
        if (reserva.estado === "pendiente" && reserva.usuario === usuarioActual) {
            document.querySelector("#tblMisReservas").innerHTML += `<tr>
            <td>${reserva.local}</td>
            <td>${reserva.fotoLocal}</td>
            <td>${reserva.estado}</td>
            <td><input type="button" value="X" data-reserva="${reserva.nombre}" class="btnCancelar"></td>
            </tr>`;
        }
    }
    let botonesCancelar = document.querySelectorAll(".btnCancelar");
    for (let i = 0; i < botonesCancelar.length; i++) {
        const btnCancelar = botonesCancelar[i];
        btnCancelar.addEventListener("click", cancelarReserva);
    }
}

document.querySelector("#btnVerTodas").addEventListener("click", verReservas);

function verReservas() {//se listan todas las reservas pendientes de un local, especificamente del local que se encuentra logeado.
    document.querySelector("#tblFinalizar").innerHTML = "";
    for (let i = 0; i < arrReservas.length; i++) {
        const reserva = arrReservas[i];
        if (reserva.estado === "pendiente" && reserva.local === tipoUsuarioLogeado) {
            document.querySelector("#tblFinalizar").innerHTML += `<tr>
            <td>${reserva.nombre}</td>
            <td>${reserva.local}</td>
            <td>${reserva.cupos}</td>
            <td>${reserva.estado}</td>
            <td><input type="button" value="Fin" data-res="${reserva.nombre}" class="btnFinRes"></td>
            </tr>`;
        }
    }
    let botonesFin = document.querySelectorAll(".btnFinRes");
    for (let i = 0; i < botonesFin.length; i++) {
        const btnFinRes = botonesFin[i];
        btnFinRes.addEventListener("click", finalizarReserva);
    }
}

document.querySelector("#btnBuscar").addEventListener("click", verReservaBuscada);

function verReservaBuscada() {//se busca una reserva en base a una coincidencia parcial en el nombre de la misma y se muestran los resultado en una tabla
    let coinciden = 0;
    let index;
    let busqueda = document.querySelector("#reservasBusca").value;
    busqueda = busqueda.toLowerCase();
    document.querySelector("#tblFinalizar2").innerHTML = "";
    for (let i = 0; i < arrReservas.length; i++) {
        const reserva = arrReservas[i];
        let nombre = reserva.nombre
        index = nombre.indexOf(busqueda);
        if (reserva.estado === "pendiente" && reserva.local === tipoUsuarioLogeado && index >= 0) {
            coinciden++;
            document.querySelector("#tblFinalizar2").innerHTML += `<tr>
            <td>${reserva.nombre}</td>
            <td>${reserva.local}</td>
            <td>${reserva.cupos}</td>
            <td>${reserva.estado}</td>
            <td><input type="button" value="Fin" data-res="${reserva.nombre}" class="btnFinRes"></td>
            </tr>`;
        }
    }
    if (coinciden === 0) {
        alert("No existe un usuario con ese nombre que tenga reservas pendientes en este local");
        document.querySelector("#reservasBusca").value = "";
    }
    let botonesFin = document.querySelectorAll(".btnFinRes");
    for (let i = 0; i < botonesFin.length; i++) {
        const btnFinRes = botonesFin[i];
        btnFinRes.addEventListener("click", finalizarReserva);
    }
}

document.querySelector("#btnPuntaje").addEventListener("click", valoraciones);

function valoraciones() {//en base al local seleccionado, se realiza la accion de enviar una calificacion si se cumplen las condiciones
    localSel = document.querySelector("#slcLocal").value;
    puntoSelect = Number(document.querySelector("#slcValor").value);
    switch (localSel) {
        case "rFrancis":
            cantidadResFinActual = contarMisReservasFin(usuarioActual, "restaurante francis");
            if (cantidadResFinActual === 0) {
                alert("no puede calificar sin reservas finalizadas");
            } else {
                cantidadValsActual = contarVal(usuarioActual, "restaurante francis");
                if (cantidadValsActual >= cantidadResFinActual) {
                    alert("ya no puedes realizar valoraciones");//cantidad de valoraciones === cantidad de reservas finalizadas en este local
                } else {
                    nuevaVal = new Valoracion(usuarioActual, "restaurante francis", puntoSelect);
                    lasValoraciones.push(nuevaVal);
                    alert("Gracias por dejar su valoración");
                }
            }
            break;
        case "rGardenia":
            cantidadResFinActual = contarMisReservasFin(usuarioActual, "restaurante gardenia");
            if (cantidadResFinActual === 0) {
                alert("no puede calificar sin reservas finalizadas");
            } else {
                cantidadValsActual = contarVal(usuarioActual, "restaurante gardenia");
                if (cantidadValsActual >= cantidadResFinActual) {
                    alert("ya no puedes realizar valoraciones");
                } else {
                    nuevaVal = new Valoracion(usuarioActual, "restaurante gardenia", puntoSelect);
                    lasValoraciones.push(nuevaVal);
                    alert("Gracias por dejar su valoración");
                }
            }
            break;
        case "rFusion":
            cantidadResFinActual = contarMisReservasFin(usuarioActual, "restaurante fusion");
            if (cantidadResFinActual === 0) {
                alert("no puede calificar sin reservas finalizadas");
            } else {
                cantidadValsActual = contarVal(usuarioActual, "restaurante fusion");
                if (cantidadValsActual >= cantidadResFinActual) {
                    alert("ya no puedes realizar valoraciones");
                } else {
                    nuevaVal = new Valoracion(usuarioActual, "restaurante fusion", puntoSelect);
                    lasValoraciones.push(nuevaVal);
                    alert("Gracias por dejar su valoración");
                }
            }
            break;
        case "tSolis":
            cantidadResFinActual = contarMisReservasFin(usuarioActual, "teatro solis");
            if (cantidadResFinActual === 0) {
                alert("no puede calificar sin reservas finalizadas");
            } else {
                cantidadValsActual = contarVal(usuarioActual, "teatro solis");
                if (cantidadValsActual >= cantidadResFinActual) {
                    alert("ya no puedes realizar valoraciones");
                } else {
                    nuevaVal = new Valoracion(usuarioActual, "teatro solis", puntoSelect);
                    lasValoraciones.push(nuevaVal);
                    alert("Gracias por dejar su valoración");
                }
            }
            break;
        case "tGalpon":
            cantidadResFinActual = contarMisReservasFin(usuarioActual, "teatro galpon");
            if (cantidadResFinActual === 0) {
                alert("no puede calificar sin reservas finalizadas");
            } else {
                cantidadValsActual = contarVal(usuarioActual, "teatro galpon");
                if (cantidadValsActual >= cantidadResFinActual) {
                    alert("ya no puedes realizar valoraciones");
                } else {
                    nuevaVal = new Valoracion(usuarioActual, "teatro galpon", puntoSelect);
                    lasValoraciones.push(nuevaVal);
                    alert("Gracias por dejar su valoración");
                }
            }
            break;
        case "mBlanes":
            cantidadResFinActual = contarMisReservasFin(usuarioActual, "museo blanes");
            if (cantidadResFinActual === 0) {
                alert("no puede calificar sin reservas finalizadas");
            } else {
                cantidadValsActual = contarVal(usuarioActual, "museo blanes");
                if (cantidadValsActual >= cantidadResFinActual) {
                    alert("ya no puedes realizar valoraciones");
                } else {
                    nuevaVal = new Valoracion(usuarioActual, "museo blanes", puntoSelect);
                    lasValoraciones.push(nuevaVal);
                    alert("Gracias por dejar su valoración");
                }
            }
            break;
        case "mHisdelArte":
            cantidadResFinActual = contarMisReservasFin(usuarioActual, "museo de historia del arte");
            if (cantidadResFinActual === 0) {
                alert("no puede calificar sin reservas finalizadas");
            } else {
                cantidadValsActual = contarVal(usuarioActual, "museo de historia del arte");
                if (cantidadValsActual >= cantidadResFinActual) {
                    alert("ya no puedes realizar valoraciones");
                } else {
                    nuevaVal = new Valoracion(usuarioActual, "museo de historia del arte", puntoSelect);
                    lasValoraciones.push(nuevaVal);
                    alert("Gracias por dejar su valoración");
                }
            }
            break;
        case "default":
            alert("Debe seleccionar un local para realizar una valoracion");
            break;
    }
    document.querySelector("#slcLocal").value = "default";
    document.querySelector("#slcValor").value = "1";
}

function ocupacionDelLocal() {//funcion para que los locales vean el oprcentaje de ocupacion del local
    document.querySelector("#pOcupacionLocal").innerHTML = "";
    let cantidadTotalCupos;
    for (let i = 0; i < locales.length; i++) {
        if (tipoUsuarioLogeado === locales[i].usuario) {
            cantidadTotalCupos = locales[i].cupoMaximo;
            break;
        }
    }
    let cantidadCuposReserv = contarCuposReservados(tipoUsuarioLogeado);
    let ocupacion = Math.round((100 / cantidadTotalCupos) * cantidadCuposReserv);
    document.querySelector("#pOcupacionLocal").innerHTML = `La ocupación del local ${tipoUsuarioLogeado} es de ${ocupacion}% .`;
}

function verPromCalifLocal() {//funcion para mostrar el promedio de calificaciones del local en la seccion de estadisticas de local
    document.querySelector("#pPromCalifLocal").innerHTML = "";
    prom = Math.round(promedioCalificLocal(tipoUsuarioLogeado));
    if (prom == 1) {
        document.querySelector("#pPromCalifLocal").innerHTML = `La calificación promedio del ${tipoUsuarioLogeado} es de  ${prom} ` + "(🌟)";
    } else if (prom == 2) {
        document.querySelector("#pPromCalifLocal").innerHTML = `La calificación promedio del ${tipoUsuarioLogeado} es de  ${prom} ` + "(🌟🌟)";
    } else if (prom == 3) {
        document.querySelector("#pPromCalifLocal").innerHTML = `La calificación promedio del ${tipoUsuarioLogeado} es de  ${prom} ` + "(🌟🌟🌟)";
    } else if (prom == 4) {
        document.querySelector("#pPromCalifLocal").innerHTML = `La calificación promedio del ${tipoUsuarioLogeado} es de  ${prom} ` + "(🌟🌟🌟🌟)";
    } else { document.querySelector("#pPromCalifLocal").innerHTML = `La calificación promedio del ${tipoUsuarioLogeado} es de  ${prom} ` + "(🌟🌟🌟🌟🌟)"; }
}

function listadoLocalesProm() {//listado de locales con sus promedios de calificaciones
    document.querySelector("#tblEstadisticasLocales").innerHTML = "";
    for (let i = 0; i < locales.length; i++) {
        const local = locales[i];
        let nombre = local.usuario;
        let foto = local.foto;
        let prom = Math.round(promedioCalificLocal(local.usuario));
        document.querySelector("#tblEstadisticasLocales").innerHTML += `<tr>
                <td>${nombre}</td> 
                <td>${foto}</td> 
                <td>${prom}</td> 
                </tr>`;
    }
}

function reservasGenerales() {//muestra cantidades de reservas pendientes y finalizadas de un local en la seccion de estadisticas de local
    document.querySelector("#pReservaGeneral").innerHTML = "";
    let final = 0;
    let pend = 0;
    for (let i = 0; i < arrReservas.length; i++) {
        const arry = arrReservas[i];
        if (arry.local === tipoUsuarioLogeado) {
            if (arry.estado === "finalizada") {
                final++;
            } else if (arry.estado === "pendiente") {
                pend++;
            }
        }
    }
    document.querySelector("#pReservaGeneral").innerHTML = `La cantidad de resevas pendientes del
    ${tipoUsuarioLogeado} es de ${pend} <br> Y la cantidad de reservas en estado finalizado es de ${final}`;
}