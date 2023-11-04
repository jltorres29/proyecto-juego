const speeds = {
  EASY: { vx: 2, vy: 10 },
  MEDIUM: { vx: 4, vy: 12 },
  HEAVY: { vx: 6, vy: 14 },
}

class Enemy {
  constructor(container, difficulty, x, y) {
    this.container = container; // El contenedor en el que se crea el enemigo.
    this.x = x; // Posición inicial en el eje X.
    this.y = y; // Posición inicial en el eje Y.
    this.width = 100; // Ancho del enemigo.
    this.height = 100; // Alto del enemigo.
    this.vy = speeds[difficulty].vy; // Velocidad vertical del enemigo.
    this.vx = speeds[difficulty].vx; // Velocidad horizontal del enemigo.
    this.ydirection = 1;
    this.xdirection = 1;

    this.element = document.createElement("div"); // Crea un nuevo elemento div para representar al enemigo.
    this.element.style.position = "absolute"; // Establece la posición del elemento como relativa.
    this.element.id = "enemy";
    this.element.style.width = `${this.width}px`; // Establece el ancho del elemento.
    this.element.style.height = `${this.height}px`; // Establece el alto del elemento.
    const ramdomx = Math.floor(Math.random() * 720);//Establece un valor ramdom para el valor de la x entre 0 y 800
    this.element.style.left = `${(this.x = ramdomx)}px`; // Establece la posición izquierda inicial.
    this.element.style.top = `${(this.y = 20)}px`; // Establece la posición superior inicial.
    this.element.style.backgroundImage = `url(./assets/bomba2-recortada.png)`;
    // this.element.style.alignItems = "center";
    this.element.style.backgroundPosition = "center";
    this.element.style.backgroundSize = "contain";
    this.element.style.backgroundRepeat = "no-repeat";
    // this.element.style.backgroundColor = "red"; // Establece el color de fondo del elemento.
    // this.element.style.borderRadius = "100px"; // Establece un borde redondeado.

    this.container.appendChild(this.element); // Agrega el elemento al contenedor.
    /* this.element1 = this.element;
    this.element2 = this.element;
    this.element1.height = this.element.height / 2
    this.element2.width = this.element.width / 2
    this.container.appendChild(this.element1);
    this.container.appendChild(this.element2); */
  }

  move() {
    if (this.xdirection === 1) {
      this.x += this.vx; // Actualiza la posición horizontal del enemigo.
      this.element.style.left = `${this.x}px`; // Aplica la nueva posición en el eje X.
      if (this.x >= 700) {
        this.xdirection = -1; // Cambia la dirección a -1 (bajando) cuando alcanza 320.
      }
    } else if (this.xdirection === -1) {
      // Si la dirección es -1 (bajando), disminuye this.y.
      this.x -= this.vx;
      this.element.style.left = `${this.x}px`; // Aplica la nueva posición en el eje Y.

      if (this.x <= 0) {
        this.xdirection = 1; // Cambia la dirección a 1 (subiendo) cuando llega a 0.
      }
    }

    if (this.ydirection === 1) {
      // Si la dirección es 1 (subiendo), aumenta this.y.
      this.y += this.vy;
      this.element.style.top = `${this.y}px`; // Aplica la nueva posición en el eje Y.

      if (this.y >= 290) {
        this.ydirection = -1; // Cambia la dirección a -1 (bajando) cuando alcanza 290.
      }
    } else if (this.ydirection === -1) {
      // Si la dirección es -1 (bajando), disminuye this.y.
      this.y -= this.vy;
      this.element.style.top = `${this.y}px`; // Aplica la nueva posición en el eje Y.

      if (this.y <= 0) {
        this.ydirection = 1; // Cambia la dirección a 1 (subiendo) cuando llega a 0.
      }
    }
  }
}
