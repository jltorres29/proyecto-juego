class Enemy {
    constructor(container, x, y) {
        this.container = container; // El contenedor en el que se crea el enemigo.
        this.x = x; // Posición inicial en el eje X.
        this.y = y; // Posición inicial en el eje Y.
        this.width = 100; // Ancho del enemigo.
        this.height = 100; // Alto del enemigo.
        this.vy = 10; // Velocidad vertical del enemigo.
        this.vx = 10; // Velocidad horizontal del enemigo.

        this.element = document.createElement("div"); // Crea un nuevo elemento div para representar al enemigo.
        this.element.style.position = "relative"; // Establece la posición del elemento como relativa.

        this.element.style.width = `${this.width}px`; // Establece el ancho del elemento.
        this.element.style.height = `${this.height}px`; // Establece el alto del elemento.
        this.element.style.left = `${this.x}px`; // Establece la posición izquierda inicial.
        this.element.style.top = `${this.y}px`; // Establece la posición superior inicial.
        this.element.style.backgroundColor = "blue"; // Establece el color de fondo del elemento.
        this.element.style.borderRadius = "100px"; // Establece un borde redondeado.

        this.container.appendChild(this.element); // Agrega el elemento al contenedor.
    }

    move() {
        this.y += this.vy; // Actualiza la posición vertical del enemigo.
        this.element.style.top = `${this.y}px`; // Aplica la nueva posición en el eje Y.
        this.x += this.vx; // Actualiza la posición horizontal del enemigo.
        this.element.style.right = `${this.x}px`; // Aplica la nueva posición en el eje X.
    }
}
