class Combustibles {
    constructor(id, nome, precioC, precioV) {
        this.id = id;
        this.nome = nome;
        this.precioC = precioC;
        this.precioV = precioV;
    }
}
let combustibles = [
    new Combustibles(01, "premium", 200, 400),
    new Combustibles(02, "Gasoil", 100, 200),
    new Combustibles(03, "nafta", 150, 300),
];
class Cliente {
    constructor(id, nome, adress, tel) {
        this.id = id;
        this.nome = nome;
        this.adress = adress;
        this.tel = tel;
    }
}
let clientes = [
    new Cliente(1, "bruno", "quintela", 095373053),
    new Cliente(1, "arias", "quintela", 095373053),
    new Cliente(1, "cuña", "quintela", 095373053),
];
class Venta {
    constructor(id, precio) {
        this.id = id;
        this.precio = precio;
    }
}
let ventas = [];

document.querySelector("#btn").addEventListener("click", rellenar, registrarVenta);

function rellenar() {
    for (let i = 0; i < combustibles.length; i++) {
        document.querySelector("slCo").innerHTML += `<option value="${combustibles[i].id}">${combustibles[i].nome}</option>`;
    }
}

function ObtenerPrecioVenta(id) {
    valor = 0;
    for (let i = 0; combustibles.length; i++) {
        if (id === combustibles[i].id) {
            valor = combustibles[i].precioV;
        }
    }
    return valor;
}
let cont;

function registrarVenta() {
    cont = cont++;
    lit = Number(document.querySelector("#lit").value);
    if (lit > 0) {

    }

    slcl = document.querySelector("#slCl").value;
    slco = document.querySelector("#slCo").value;
}