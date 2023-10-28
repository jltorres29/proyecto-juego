class Bullet {
  constructor(container, x, y) {
    this.container = container; // El contenedor en el que se crea la bala.
    this.x = x; // Posición inicial en el eje X.
    this.y = y; // Posición inicial en el eje Y.
    this.width = 15; // Ancho de la bala.
    this.height = 15; // Alto de la bala.
    this.vy = 10; // Velocidad vertical de la bala.

    this.element = document.createElement("div"); // Crea un nuevo elemento div para representar la bala.
    this.element.style.position = "absolute"; // Establece la posición del elemento como relativa.

    this.element.style.width = `${this.width}px`; // Establece el ancho del elemento.
    this.element.style.height = `${this.height}px`; // Establece el alto del elemento.
    this.element.style.left = `${this.x}px`; // Establece la posición izquierda inicial.
    this.element.style.top = `${this.y}px`; // Establece la posición superior inicial.

    this.element.style.backgroundImage = `url(./assets/bala.png)`;
    this.element.style.backgroundSize = "cover";

    // this.element.style.backgroundColor = "gray"; // Establece el color de fondo del elemento.
    // this.element.style.borderRadius = "100px"; // Establece un borde redondeado.

    this.container.appendChild(this.element); // Agrega el elemento al contenedor.
  }

  // Este método se utiliza para actualizar la posición de la bala en el eje vertical.
  move() {
    this.y -= this.vy; // Actualiza la posición vertical de la bala.
    this.element.style.top = `${this.y}px`; // Aplica la nueva posición en el eje Y.
  }

  didCollide(enemy) {
    const bulletRect = this.element.getBoundingClientRect();
    const enemyRect = enemy.element.getBoundingClientRect();

    if (
      bulletRect.left < enemyRect.right &&
      bulletRect.right > enemyRect.left &&
      bulletRect.top < enemyRect.bottom &&
      bulletRect.bottom > enemyRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
