class Background {
    constructor(container) {
        this.container = container; // El contenedor del fondo.

        this.width = this.container.offsetWidth; // Ancho del fondo igual al ancho del contenedor.
        this.height = this.container.offsetHeight; // Alto del fondo igual al alto del contenedor.
        this.x = 0; // Posición inicial en el eje X.
        this.y = 0; // Posición inicial en el eje Y.

        this.element = document.createElement("div"); // Crea un nuevo elemento div para representar el fondo.
        this.element.style.position = "absolute"; // Establece la posición del elemento como absoluta.

        this.element.style.background = `url(./assets/ironhack-clase.jpg)`; // Establece la imagen de fondo.
        this.element.style.backgroundSize = "contain"; // Ajusta el tamaño de la imagen de fondo para cubrir el elemento.
        this.element.style.backgroundPosition = "bottom"; // Alinea la imagen de fondo en la parte inferior.
        this.element.style.width = `${this.width}px`; // Establece el ancho del elemento igual al ancho del contenedor.
        this.element.style.height = `${this.height}px`; // Establece el alto del elemento igual al alto del contenedor.
        this.element.style.left = `${this.x}px`; // Establece la posición izquierda inicial.
        this.element.style.top = `${this.y}px`; // Establece la posición superior inicial.

        this.container.appendChild(this.element); // Agrega el elemento de fondo al contenedor.
    }
}
