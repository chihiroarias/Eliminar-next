class UsuarioCliente {
    constructor(numeroid, nombre, usuario, password) {
        this.numeroid = numeroid;
        this.nombre = nombre;
        this.usuario = usuario;
        this.password = password;
    }
}

class Local {
    constructor(usuario, password, cupoMaximo, disponibilidad, foto) {
        this.usuario = usuario;
        this.password = password;
        this.cupoMaximo = cupoMaximo;
        this.disponibilidad = disponibilidad;
        this.foto = foto;
    }
}

class Reserva {
    constructor(nombre, usuario, local, fotoLocal, cupos, estado) {
        this.nombre = nombre;
        this.usuario = usuario;
        this.local = local;
        this.fotoLocal = fotoLocal;
        this.cupos = cupos;
        this.estado = estado;
    }
}

class Valoracion {
    constructor(usuario, local, puntos) {
        this.usuario = usuario;
        this.local = local;
        this.puntos = puntos;
    }
}

let lasValoraciones = [
    new Valoracion("robs", "restaurante francis", 3),
    new Valoracion("juancito", "restaurante fusion", 4),
    new Valoracion("aldito", "restaurante gardenia", 3),
    new Valoracion("juancito", "teatro solis", 4),
    new Valoracion("robs", "teatro galpon", 3),
    new Valoracion("chihi", "museo de historia del arte", 2),
    new Valoracion("robs", "museo blanes", 4),
];

let locales = [
    new Local("restaurante francis", "Francis123", 100, "habilitado", `<img src="minis/miniR1.jpg" width="168" height="66"/>`),
    new Local("restaurante gardenia", "Gardenia123", 100, "habilitado", `<img src="minis/miniR3.jpg" width="168" height="66"/>`),
    new Local("restaurante fusion", "Fusion123", 100, "habilitado", `<img src="minis/miniR2.jpg" width="168" height="66"/>`),
    new Local("teatro solis", "Solis123", 100, "habilitado", `<img src="minis/miniT1.jpg" width="168" height="66"/>`),
    new Local("teatro galpon", "Galpon123", 100, "habilitado", `<img src="minis/miniT2.jpg" width="168" height="66"/>`),
    new Local("museo blanes", "Blanes123", 100, "habilitado", `<img src="minis/miniM1.jpg" width="168" height="66"/>`),
    new Local("museo de historia del arte", "Mhistoria123", 100, "habilitado", `<img src="minis/miniM2.jpg" width="168" height="66"/>`),
];

let clientes = [
    new UsuarioCliente(90, "roberto", "robs", "Robs123"),
    new UsuarioCliente(91, "aldo", "aldito", "Aldo123"),
    new UsuarioCliente(92, "juan", "juancito", "Juan123"),
    new UsuarioCliente(93, "chihiro", "chihi", "Chihi123"),
    new UsuarioCliente(94, "santiago", "santi", "Santi123"),
    new UsuarioCliente(95, "carlos", "carlitos", "Carlos123"),
    new UsuarioCliente(96, "fernando", "cabeza", "Fernando123"),
];

let totalUsuarios = [
    new Local("restaurante francis", "Francis123", 100, "habilitado", `<img src="minis/miniR1.jpg" width="168" height="66"/>`),
    new Local("restaurante gardenia", "Gardenia123", 100, "habilitado", `<img src="minis/miniR3.jpg" width="168" height="66"/>`),
    new Local("restaurante fusion", "Fusion123", 100, "habilitado", `<img src="minis/miniR2.jpg" width="168" height="66"/>`),
    new Local("teatro solis", "Solis123", 100, "habilitado", `<img src="minis/miniT1.jpg" width="168" height="66"/>`),
    new Local("teatro galpon", "Galpon123", 100, "habilitado", `<img src="minis/miniT2.jpg" width="168" height="66"/>`),
    new Local("museo blanes", "Blanes123", 100, "habilitado", `<img src="minis/miniM1.jpg" width="168" height="66"/>`),
    new Local("museo de historia del arte", "Mhistoria123", 100, "habilitado", `<img src="minis/miniM2.jpg" width="168" height="66"/>`),
    new UsuarioCliente(90, "roberto", "robs", "Robs123"),
    new UsuarioCliente(91, "aldo", "aldito", "Aldo123"),
    new UsuarioCliente(92, "juan", "juancito", "Juan123"),
    new UsuarioCliente(93, "chihiro", "chihi", "Chihi123"),
    new UsuarioCliente(94, "santiago", "santi", "Santi123"),
    new UsuarioCliente(95, "carlos", "carlitos", "Carlos123"),
    new UsuarioCliente(96, "fernando", "cabeza", "Fernando123"),
];

let arrReservas = [
    new Reserva("chihiro", "chihi", "museo de historia del arte", `<img src="minis/miniM2.jpg" width="168" height="66"/>`, 4, "finalizada"),
    new Reserva("roberto", "robs", "restaurante francis", `<img src="minis/miniR1.jpg" width="168" height="66"/>`, 3, "finalizada"),
    new Reserva("roberto", "robs", "restaurante francis", `<img src="minis/miniR1.jpg" width="168" height="66"/>`, 4, "pendiente"),
    new Reserva("juan", "juancito", "restaurante fusion", `<img src="minis/miniR2.jpg" width="168" height="66"/>`, 5, "pendiente"),
    new Reserva("juan", "juancito", "restaurante francis", `<img src="minis/miniR1.jpg" width="168" height="66"/>`, 4, "pendiente"),
    new Reserva("aldo", "aldito", "restaurante gardenia", `<img src="minis/miniR3.jpg" width="168" height="66"/>`, 7, "finalizada"),
    new Reserva("aldo", "aldito", "restaurante gardenia", `<img src="minis/miniR3.jpg" width="168" height="66"/>`, 3, "pendiente"),
    new Reserva("juan", "juancito", "teatro solis", `<img src="minis/miniT1.jpg" width="168" height="66"/>`, 2, "finalizada"),
    new Reserva("chihiro", "chihi", "teatro galpon", `<img src="minis/miniT2.jpg" width="168" height="66"/>`, 10, "finalizada"),
    new Reserva("roberto", "robs", "teatro solis", `<img src="minis/miniT1.jpg" width="168" height="66"/>`, 2, "finalizada"),
    new Reserva("chihiro", "chihi", "teatro galpon", `<img src="minis/miniT2.jpg" width="168" height="66"/>`, 4, "finalizada"),
    new Reserva("chihiro", "chihi", "teatro solis", `<img src="minis/miniT1.jpg" width="168" height="66"/>`, 5, "pendiente"),
    new Reserva("santiago", "santi", "museo blanes", `<img src="minis/miniM1.jpg" width="168" height="66"/>`, 10, "finalizada"),
    new Reserva("santiago", "santi", "museo blanes", `<img src="minis/miniM1.jpg" width="168" height="66"/>`, 15, "pendiente"),
];

let arrResTemporal = [];

let tipoUsuarioLogeado = "default"; //(puede ser "Cliente" o "nombre del local"), default para quienes no inician sesion
let usuarioActual = "";
let nombreActual = "";