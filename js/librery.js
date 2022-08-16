function contarMayusculas(cadena) { //cuenta la cantidad de letras mayusculas en una cadena de texto
    let contar = 0;
    let mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < mayusculas.length; i++) {
        for (let x = 0; x < cadena.length; x++) {
            if (cadena[x] == mayusculas[i]) { contar += 1; }
        }
    }
    return contar;
}

function contarMinusculas(cadena) { //cuenta la cantidad de letras minusculas en una cadena de texto
    let contar = 0;
    let minusculas = "abcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < minusculas.length; i++) {
        for (let x = 0; x < cadena.length; x++) {
            if (cadena[x] == minusculas[i]) { contar += 1; }
        }
    }
    return contar;
}

function contarNumeros(cadena) { //cuanta la cantidad de caracteres numericos en una cedena de texto
    let contar = 0;
    let numeros = "0123456789";
    for (let i = 0; i < numeros.length; i++) {
        for (let x = 0; x < cadena.length; x++) {
            if (cadena[x] == numeros[i]) { contar += 1; }
        }
    }
    return contar;
}

function buscarNombreCliente(usuario) { //funcion para buscar el nombre de la persona o usuario, su nombre de pila ingresado durante el registro, que no tiene por que coincidir con su nombre de usuario
    let resultado = "";
    for (let i = 0; i < clientes.length; i++) {
        const usuarioPrueba = clientes[i];
        if (usuarioPrueba.usuario === usuario) {
            let nombre = usuarioPrueba.nombre;
            resultado = nombre;
            break;
        } else { resultado = "no" }
    }
    return resultado;
}

function buscarCuentaClientes(usuarioP, passwordP) { //busca al usuario y contraseña ingresados en el array de objetos clientes
    let resultado = "";
    for (let i = 0; i < clientes.length; i++) {
        const usuarioPrueba = clientes[i];
        if (usuarioPrueba.usuario === usuarioP && usuarioPrueba.password === passwordP) {
            resultado = "si"
            break;
        } else { resultado = "no" }
    }
    return resultado;
}

function buscarCuentaLocales(usuarioP, passwordP) { //busca al usuario y contraseña ingresados en el array de objetos locales
    let resultado = "";
    for (let i = 0; i < locales.length; i++) {
        const usuarioPrueba = locales[i];
        if (usuarioPrueba.usuario === usuarioP && usuarioPrueba.password === passwordP) {
            resultado = "si"
            break;
        } else { resultado = "no" }
    }
    return resultado;
}

function buscarNombreLocal(usuarioP) { //para ver el num de posicion del usuario local en el array de locales, asi se vera si el usuario local correspondiente pertenece a un restaurante, museo o teatro.
    let posicion = 0;
    for (let i = 0; i < locales.length; i++) {
        const usuarioPrueba = locales[i];
        posicion = posicion + 1;
        if (usuarioPrueba.usuario === usuarioP) { break; }
    }
    return posicion - 1; //la posicion en el array sera zerobased por lo que a esto le resto 1
}

function buscarUsuarios(usuarioP) { //busca la exitencia de un usuario en base al parametro recibido, esta funcion es llamada dentro de la funciion de iniciar sesion
    let resultado = "";
    for (let i = 0; i < totalUsuarios.length; i++) {
        const usuarioPrueba = totalUsuarios[i];
        if (usuarioPrueba.usuario === usuarioP) {
            resultado = "si"
            break;
        } else { resultado = "no" }
    }
    return resultado;
}

function cerrarSesion() {
    if (tipoUsuarioLogeado === "default") {
        alert("Debe iniciar sesion antes")
    } else {
        tipoUsuarioLogeado = "default";
        usuarioActual = "";
        nombreActual = "";
        verInicio();
        document.querySelector("#registrarse").style.display = "block";
        document.querySelector("#iniciarse").style.display = "block";
        document.querySelector("#cierrosesion").style.display = "none";
        alert("Sesion Cerrada");
    }
}

function cancelarReserva() { //permite a cancelar una reserva cambiado el estado de la misma de pendiente a cancelada
    let nombreReservaCancelar = this.getAttribute("data-reserva");
    let confirmacion = confirm(`¿Seguro que desea cancelar la reserva de ${nombreReservaCancelar}?`);
    if (confirmacion) {
        for (let i = 0; i < arrReservas.length; i++) {
            const reserva = arrReservas[i];
            if (reserva.nombre === nombreReservaCancelar && reserva.estado === "pendiente") {
                arrReservas[i].estado = "cancelada";
                mostrarMisReservas();
                actualizarCuposResCancel();
                break;
            }
        }
    }
}

function francis() { //ejecuta las funcionalidades necesarias en la creacion de una reserva del un local especifico
    if (locales[0].disponibilidad === "habilitado") {
        if (ingresoCantidad <= locales[0].cupoMaximo) {
            reservitas(nombreActual, usuarioActual, locales[0].usuario, locales[0].foto, ingresoCantidad, "pendiente");
            resultComparar = compararReservas();
            if (resultComparar === true) {
                alert("Ya existe reserva pendiente");
            } else {
                arrReservas.push(arrResTemporal[0]);
                alert("Reserva solicitada")
                locales[0].cupoMaximo = locales[0].cupoMaximo - ingresoCantidad;
                mostrarMisReservas();
                if (locales[0].cupoMaximo === 0) {
                    locales[0].disponibilidad = "deshabilitado";
                }
            }
        } else { alert("No existen cupos disponibles suficientes"); }
    } else { alert("Las reservas en este local se encuentran deshabilitadas"); }
}

function gardenia() { //ejecuta las funcionalidades necesarias en la creacion de una reserva del un local especifico
    if (locales[1].disponibilidad === "habilitado") {
        if (ingresoCantidad <= locales[1].cupoMaximo) {
            reservitas(nombreActual, usuarioActual, locales[1].usuario, locales[1].foto, ingresoCantidad, "pendiente");
            resultComparar = compararReservas();
            if (resultComparar === true) {
                alert("Ya existe reserva pendiente");
            } else {
                arrReservas.push(arrResTemporal[0]);
                alert("Reserva solicitada")
                locales[1].cupoMaximo = locales[1].cupoMaximo - ingresoCantidad;
                mostrarMisReservas();
            }
        } else { alert("No existen cupos disponibles suficientes"); }
    } else { alert("Las reservas en este local se encuentran deshabilitadas"); }
}

function fusion() { //ejecuta las funcionalidades necesarias en la creacion de una reserva del un local especifico
    if (locales[2].disponibilidad === "habilitado") {
        if (ingresoCantidad <= locales[2].cupoMaximo) {
            reservitas(nombreActual, usuarioActual, locales[2].usuario, locales[2].foto, ingresoCantidad, "pendiente");
            resultComparar = compararReservas();
            if (resultComparar === true) {
                alert("Ya existe reserva pendiente");
            } else {
                arrReservas.push(arrResTemporal[0]);
                alert("Reserva solicitada")
                locales[2].cupoMaximo = locales[2].cupoMaximo - ingresoCantidad;
                mostrarMisReservas();
            }
        } else { alert("No existen cupos disponibles suficientes"); }
    } else { alert("Las reservas en este local se encuentran deshabilitadas"); }
}

function solis() { //ejecuta las funcionalidades necesarias en la creacion de una reserva del un local especifico
    if (locales[3].disponibilidad === "habilitado") {
        if (ingresoCantidad <= locales[3].cupoMaximo) {
            reservitas(nombreActual, usuarioActual, locales[3].usuario, locales[3].foto, ingresoCantidad, "pendiente");
            resultComparar = compararReservas();
            if (resultComparar === true) {
                alert("Ya existe reserva pendiente");
            } else {
                arrReservas.push(arrResTemporal[0]);
                alert("Reserva solicitada")
                locales[3].cupoMaximo = locales[3].cupoMaximo - ingresoCantidad;
                mostrarMisReservas();
            }
        } else { alert("No existen cupos disponibles suficientes"); }
    } else { alert("Las reservas en este local se encuentran deshabilitadas"); }
}

function tGalpon() { //ejecuta las funcionalidades necesarias en la creacion de una reserva del un local especifico
    if (locales[3].disponibilidad === "habilitado") {
        if (ingresoCantidad <= locales[4].cupoMaximo) {
            reservitas(nombreActual, usuarioActual, locales[4].usuario, locales[4].foto, ingresoCantidad, "pendiente");
            resultComparar = compararReservas();
            if (resultComparar === true) {
                alert("Ya existe reserva pendiente");
            } else {
                arrReservas.push(arrResTemporal[0]);
                alert("Reserva solicitada")
                locales[4].cupoMaximo = locales[4].cupoMaximo - ingresoCantidad;
                mostrarMisReservas();
            }
        } else { alert("No existen cupos disponibles suficientes"); }
    } else { alert("Las reservas en este local se encuentran deshabilitadas"); }
}

function blanes() { //ejecuta las funcionalidades necesarias en la creacion de una reserva del un local especifico
    if (locales[5].disponibilidad === "habilitado") {
        if (ingresoCantidad <= locales[5].cupoMaximo) {
            reservitas(nombreActual, usuarioActual, locales[5].usuario, locales[5].foto, ingresoCantidad, "pendiente");
            resultComparar = compararReservas();
            if (resultComparar === true) {
                alert("Ya existe reserva pendiente");
            } else {
                arrReservas.push(arrResTemporal[0]);
                alert("Reserva solicitada")
                locales[5].cupoMaximo = locales[5].cupoMaximo - ingresoCantidad;
                mostrarMisReservas();
            }
        } else { alert("No existen cupos disponibles suficientes"); }
    } else { alert("Las reservas en este local se encuentran deshabilitadas"); }
}

function museodearte() { //ejecuta las funcionalidades necesarias en la creacion de una reserva del un local especifico
    if (locales[6].disponibilidad === "habilitado") {
        if (ingresoCantidad <= locales[6].cupoMaximo) {
            reservitas(nombreActual, usuarioActual, locales[6].usuario, locales[6].foto, ingresoCantidad, "pendiente");
            resultComparar = compararReservas();
            if (resultComparar === true) {
                alert("Ya existe reserva pendiente");
            } else {
                arrReservas.push(arrResTemporal[0]);
                alert("Reserva solicitada")
                locales[6].cupoMaximo = locales[6].cupoMaximo - ingresoCantidad;
                mostrarMisReservas();
            }
        } else { alert("No existen cupos disponibles suficientes"); }
    } else { alert("Las reservas en este local se encuentran deshabilitadas"); }
}

function finalizarReserva() { //premite que el local cambie una reserva pendiente de un cliente para que la misma pase a un  estado de finalizada
    let nombreReservaFinalizar = this.getAttribute("data-res");
    let confirmacion = confirm(`¿Seguro que desea cambiar la reserva de ${nombreReservaFinalizar} a estado finalizada?`);
    if (confirmacion) {
        for (let i = 0; i < arrReservas.length; i++) {
            const reserva = arrReservas[i];
            if (reserva.nombre === nombreReservaFinalizar && reserva.estado === "pendiente" && reserva.local === tipoUsuarioLogeado) {
                reserva.estado = "finalizada";
                break;
            }
        }
        document.querySelector("#tblFinalizar2").innerHTML = "";
        verReservas();
    }
}

function ocultarTodo() { //oculta todo el contenido de las distintas secciones
    document.getElementById('secRegist').style.display = 'none';
    document.getElementById('secInic').style.display = 'none';
    document.getElementById('resLocales').style.display = 'none';
    document.getElementById('resClientes').style.display = 'none';
    document.getElementById('estadisticaClientes').style.display = 'none';
    document.getElementById('estadisticaLocales').style.display = 'none';
    document.getElementById('secTodos').style.display = 'none';
    document.getElementById('estadProvis').style.display = 'none';
    document.getElementById('infoGeneral').style.display = 'none';
}

function verInicio() { //oculta todos los contenidos de las secciones para solo mostrar lo que compete a la pagiina de inicio
    ocultarTodo();
    document.getElementById('secTodos').style.display = 'block';
    document.getElementById('infoGeneral').style.display = 'block';
    document.querySelector("#interior").style.display = "block";
}

function reservitas(nombrePersona, usuario, nombreLocal, miniFoto, cuposIngresados, estado) {
    let nuevaReserva = new Reserva(nombrePersona, usuario, nombreLocal, miniFoto, cuposIngresados, estado);
    arrResTemporal.push(nuevaReserva); //guardamos la reserva en un arrTemporal para buscar si existe otra reserva pendiente del mismo usuario en el mismo local
}

function vaciarCamposIni() { //vaciar campos de texto del iniciar sesion
    document.querySelector("#txtNombreUsuario").value = "";
    document.querySelector("#txtPassUsuario").value = "";
}

function vaciarCamposReg() { //vaciar campos de texto del registro de usuarios
    document.querySelector("#txtRegistroNombre").value = "";
    document.querySelector("#txtNombreUsuarioR").value = "";
    document.querySelector("#txtRegistroPass").value = "";
}

function estrellitaFr() { //muestra la calificacion de un local en forma de estrellitas
    estrellasTodas("restaurante francis", "#pFrancis");
}

function estrellitaFu() {
    estrellasTodas("restaurante fusion", "#pFusion");
}

function estrellitaSo() {
    estrellasTodas("teatro solis", "#pSolis");
}

function estrellitaAr() {
    estrellasTodas("museo de historia del arte", "#pArte");
}

function estrellitaGa() {
    estrellasTodas("teatro galpon", "#pGalpon");
}

function estrellitaGar() {
    estrellasTodas("restaurante gardenia", "#pGardenia");
}

function estrellitaB() {
    estrellasTodas("museo blanes", "#pBlanes");
}

function estrellasTodas(elLocal, parrafo) { //esta funcion resive como parametros un nombre de local y un parrafo para calcular y mostrar el promedio del local en el parrafo
    prom = promedioCalificLocal(elLocal); //debajo del local con estrellitas
    if (Math.round(prom) == 1) {
        document.querySelector(parrafo).innerHTML = "Calificación: " + "🌟";
    } else if (Math.round(prom) == 2) {
        document.querySelector(parrafo).innerHTML = "Calificación: " + "🌟🌟";
    } else if (Math.round(prom) == 3) {
        document.querySelector(parrafo).innerHTML = "Calificación: " + "🌟🌟🌟";
    } else if (Math.round(prom) == 4) {
        document.querySelector(parrafo).innerHTML = "Calificación: " + "🌟🌟🌟🌟";
    } else { document.querySelector(parrafo).innerHTML = "Calificación: " + "🌟🌟🌟🌟🌟"; }
}

document.querySelector("#btnCupoMax").addEventListener("click", editarCupos);

function editarCupos() { //modifica la cantidad de cupos maximos del local
    editable = hayReservasPendientes();
    nuevoCupo = Number(document.querySelector("#txtNuevoCupoMax").value);
    if (nuevoCupo <= 1) {
        alert("ingresar un numero mayor a 1");
    } else {
        if (editable === true) {
            alert("Existen reservas pendientes");
        } else {
            for (let i = 0; i < locales.length; i++) {
                if (tipoUsuarioLogeado === locales[i].usuario) {
                    locales[i].cupoMaximo = nuevoCupo;
                    mostrarCuposLocal();
                    document.querySelector("#txtNuevoCupoMax").value = "";
                    alert("Cupo maximo modificado");
                    break;
                }
            }
        }
    }
}

function mostrarCuposLocal() { //muestra la cantidad de cupos maxmimos diponible actualmente en el local
    for (let i = 0; i < locales.length; i++) {
        const unLocal = locales[i];
        if (unLocal.usuario === tipoUsuarioLogeado) {
            document.querySelector("#pCuposLocal").innerHTML = `La cantidad de cupos actualmente es de ${unLocal.cupoMaximo}`;
            break;
        }
    }
}

function hayReservasPendientes() { //comprobamos la existencia de reservas pendientes en un local para luego modificar el cupo maximo
    let hayPendientes;
    for (let i = 0; i < arrReservas.length; i++) {
        const reserva = arrReservas[i];
        if (reserva.local === tipoUsuarioLogeado && reserva.estado === "pendiente") {
            hayPendientes = true;
            break;
        } else { hayPendientes = false; }
    }
    return hayPendientes;
}

function mostrarMisEstadisticas() { //al cliente le muestra en una tabla las estadisticas de los distintos locales de acuerdo a sus cantidades de reservas
    document.querySelector("#tblEstadisticas1").innerHTML = "";
    for (let i = 0; i < locales.length; i++) {
        const local = locales[i];
        let cantidad = contarMisReservas(usuarioActual, local.usuario);
        let cantidadTotal = contarReservasTodas(local.usuario);
        if (cantidad > 0) {
            let coso = Math.round((100 / cantidadTotal) * cantidad);
            document.querySelector("#tblEstadisticas1").innerHTML += `<tr>
                <td>${local.usuario}</td> 
                <td>${cantidad}</td> 
                <td>${cantidadTotal}</td> 
                <td>${coso}%</td>
                </tr>`;
        }
    }
    MostrarMisEstadMay();
}

function buscarMayorCantResFin() { //buscar la o las mayores cantidades de reservas finalizadas de entre todos los locales
    document.querySelector("#tblEstadisticas2").innerHTML = "";
    let cantidades = [];
    let numMayor = 0;
    for (let i = 0; i < locales.length; i++) {
        cantidades.push(contarMisReservasFin(usuarioActual, locales[i].usuario));
    }
    for (let i = 0; i < cantidades.length; i++) {
        if (cantidades[i] > numMayor) {
            numMayor = cantidades[i];
        }
    }
    return numMayor;
}

function MostrarMisEstadMay() { //muestra el o los locales con mayor numero de reservas finalizadas por el usuario actual
    document.querySelector("#tblEstadisticas2").innerHTML = "";
    let mayor = buscarTodasMisRes();
    for (let i = 0; i < locales.length; i++) {
        let cantidad = contarMisReservas(usuarioActual, locales[i].usuario);
        if (cantidad === mayor && cantidad > 0) {
            document.querySelector("#tblEstadisticas2").innerHTML += `<tr>
            <td>${locales[i].usuario}</td> 
            <td>${cantidad}</td> 
            </tr>`;
        }
    }
}

function buscarTodasMisRes() { //busca la cantidad de reservas mayores de todos los estados
    let cantidades = [];
    let numMayor = 0;
    for (let i = 0; i < locales.length; i++) {
        cantidades.push(contarMisReservas(usuarioActual, locales[i].usuario));
    }
    for (let i = 0; i < cantidades.length; i++) {
        if (cantidades[i] > numMayor) {
            numMayor = cantidades[i];
        }
    }
    return numMayor;
}

function contarMisReservas(nombreUser, local) { //cuenta todas las reservas de un cliente en un local, sin importar el estado de la reserva
    let cantidad = 0;
    for (let i = 0; i < arrReservas.length; i++) {
        const reserva = arrReservas[i];
        if (reserva.usuario === nombreUser && reserva.local === local) {
            cantidad++;
        }
    }
    return cantidad;
}

function contarMisReservasFin(nombreUser, local) { //cuenta la cantidad de reservas finalizadas de un cliente logeado
    let resFin = 0;
    for (let i = 0; i < arrReservas.length; i++) {
        const reserva = arrReservas[i];
        if (reserva.usuario === nombreUser && reserva.local === local && reserva.estado === "finalizada") {
            resFin++;
        }
    }
    return resFin;
}

function contarReservasTodas(nombreLocal) { //cuenta todas las reservas de un local
    let resTotal = 0;
    for (i = 0; i < arrReservas.length; i++) {
        const reserva = arrReservas[i];
        if (reserva.local === nombreLocal) {
            resTotal++;
        }
    }
    return resTotal;
}

function contarCuposReservados(nombreLocal) { //cuenta los cupos reservados de un local
    let cuposRes = 0;
    for (i = 0; i < arrReservas.length; i++) {
        const reserva = arrReservas[i];
        if (reserva.local === nombreLocal && reserva.estado === "pendiente") {
            cuposRes = cuposRes + reserva.cupos;
        }
    }
    return cuposRes;
}

function contarVal(usuario, local) { //cuanta las valoraciones del usuario en un local determinado
    let cantidad = 0
    for (let i = 0; i < lasValoraciones.length; i++) {
        const val = lasValoraciones[i];
        if (val.usuario === usuario && val.local === local) {
            cantidad++;
        }
    }
    return cantidad;
}

function promedioCalificLocal(local) { //calcula el promedio de puntaje de un local, numero que luego se mostrara en cantidad de estrellas
    let conteoVals = 0;
    let sumaPuntos = 0;
    let resultado;
    for (let i = 0; i < lasValoraciones.length; i++) {
        const val = lasValoraciones[i];
        if (val.local === local) {
            conteoVals++;
            sumaPuntos = sumaPuntos + val.puntos;
        }
    }
    resultado = sumaPuntos / conteoVals;
    return resultado;
}

function mostrarCalificaciones() { //llama a las funciones encargadas de cargar las calificaciones en los parrafos debajo de cada local en la pagina de inicio
    estrellitaFr();
    estrellitaFu();
    estrellitaSo();
    estrellitaAr();
    estrellitaGa();
    estrellitaGar();
    estrellitaB();
}

function contarCuposCancelados(nombreLocal) { //cuenta los cupos reservados de un local
    let cuposRes = 0;
    for (i = 0; i < arrReservas.length; i++) {
        const reserva = arrReservas[i];
        if (reserva.local === nombreLocal && reserva.estado === "cancelada") {
            cuposRes = cuposRes + reserva.cupos;
        }
    }
    return cuposRes;
}

function actualizarCuposResPend() { //actualiza la cantidad de cupos cada vez que se clickea la seccion de reservas
    for (let i = 0; i < locales.length; i++) {
        let cupos = contarCuposReservados(locales[i].usuario);
        locales[i].cupoMaximo = locales[i].cupoMaximo - cupos;
    }
}

function actualizarCuposResCancel() { //actualiza la cantidad de cuposMaximos del local cuando se cancela una reserva para que el valor del mismo recupere esos cupos previamente perdidos
    for (let i = 0; i < locales.length; i++) {
        let cupos = contarCuposCancelados(locales[i].usuario);
        locales[i].cupoMaximo = locales[i].cupoMaximo + cupos;
    }
}