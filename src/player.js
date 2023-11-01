class Player {
  constructor(container, isSecondPlayer = false) {
    this.container = container;
    this.width = 100;
    this.height = 100;
    this.x = isSecondPlayer ? 700 : 10;
    this.floor = 340; // Altura del suelo
    this.y = 300; // Posición vertical inicial
    this.vx = 0; // Velocidad horizontal
    this.bullets = isSecondPlayer ? [] : []; // Almacenamiento de balas disparadas
    this.hits = 30; // Vidas o puntos de salud
    this.canShoot = true; // Control para permitir disparos
    this.xdirection = 1;

    // Crear un elemento HTML para representar al jugador
    this.element = document.createElement("div");
    this.element.id = isSecondPlayer
      ? "second-player"
      : "first-player";
    this.element.style.position = "absolute";
    this.element.style.backgroundImage = isSecondPlayer
      ? "url('./assets/player2-left.png')"
      : "url('./assets/player1-right.png')";
    this.element.style.backgroundSize = "cover";
    this.element.style.backgroundPosition = "bottom";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;

    // Agregar el elemento del jugador al contenedor especificado
    this.container.appendChild(this.element);

    // Establecer escuchadores de eventos de teclado
    this.isSecondPlayer = isSecondPlayer; // Agrega una propiedad para identificar al segundo jugador
    // ...

    // Establecer escuchadores de eventos de teclado específicos para cada jugador
    if (isSecondPlayer) {
      this.setListenersPlayer2();
    } else {
      this.setListenersPlayer1();
    }
  }

  // Método para disparar una bala
  shoot() {
    // document.getElementById("bullets-div")
    this.bullets.push(
      new Bullet(
        this.container,
        this.x + (this.width / 2 - 7), // Posición inicial de la bala en el centro del jugador en el eje horizontal
        this.y + (this.height / 2 - 60) // Posición inicial de la bala en el centro del jugador en el eje vertical
      )
    );

    this.canShoot = false; // Evitar disparar demasiado rápido
    document.getElementById("shoot-sound").play();

    setTimeout(() => {
      this.canShoot = true;
    }, 400); // Restablecer la posibilidad de disparar después de un tiempo
  }

  // Método para mover al jugador
  move() {
    this.x += this.vx; // Mover al jugador horizontalmente

    // Limitar la posición del jugador dentro de los límites del contenedor
    if (this.x <= -20) {
      this.x = -20;
    }
    if (this.x + this.width >= this.container.offsetWidth + 20) {
      this.x = this.container.offsetWidth - this.width + 20;
    }

    this.element.style.left = `${this.x}px`; // Actualizar la posición del elemento del jugador

    // Mover todas las balas disparadas por el jugador
    this.bullets.forEach((bullet) => {
      bullet.move();
    });

    this.cleanup(); // Eliminar las balas que salieron de la pantalla
  }

  didCollide(enemy) {
    const playerRect = this.element.getBoundingClientRect();
    const enemyRect = enemy.element.getBoundingClientRect();
    const xPadding = 20;
    const yPadding = 40;
    if (
      playerRect.left + yPadding < enemyRect.right &&
      playerRect.right - yPadding > enemyRect.left &&
      playerRect.top + xPadding < enemyRect.bottom &&
      playerRect.bottom - xPadding > enemyRect.top
    ) {
      console.log("Crash!");

      return true;
    } else {
      return false;
    }
  }

  // Método para limpiar balas que están fuera de la pantalla
  cleanup() {
    const filteredBullets = this.bullets.filter((bullet) => {
      if (bullet.y + bullet.height > 0) return true;
      else {
        bullet.element.remove();
        return false;
      }
    });

    this.bullets = filteredBullets; // Actualizar la lista de balas
  }

  // Establecer escuchadores de eventos de teclado para controlar al jugador 1
  setListenersPlayer1() {
    if (this.isSecondPlayer) {
      return; // No asigna eventos de teclado para el segundo jugador
    }

    window.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "ArrowRight":
          this.vx = 10; // Mover hacia la derecha
          if ("ArrowRight") {
            this.element.style.backgroundImage =
              "url('./assets/player1-right.png')";
            return (this.xdirection = 1);
          }
          break;
        case "ArrowLeft":
          this.vx = -10; // Mover hacia la izquierda
          if ("ArrowLeft") {
            this.element.style.backgroundImage = `url(./assets/player1-left.png)`;
            return (this.xdirection = -1);
          }
          break;
        case "ArrowUp":
          if (this.canShoot) {
            this.shoot(); // Disparar

            if (this.xdirection === 1) {
              this.element.style.backgroundImage = `url(./assets/player1-disparo-vertical.png)`;
            }

            if (this.xdirection === -1) {
              this.element.style.backgroundImage = `url(./assets/player1-disparo-vertical-left.png)`;
            }
          }
          break;
      }
    });

    window.addEventListener("keyup", (e) => {
      if (this.isSecondPlayer) {
        return; // No asigna eventos de teclado para el segundo jugador
      }

      switch (e.code) {
        case "ArrowRight":
        case "ArrowLeft":
          this.vx = 0; // Detener el movimiento horizontal
          break;
        default:
      }
    });
  }

  // Establecer escuchadores de eventos de teclado para controlar al jugador 2
  setListenersPlayer2() {
    if (!this.isSecondPlayer) {
      return; // No asigna eventos de teclado para el primer jugador
    }

    window.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "KeyD":
          this.vx = 10; // Mover hacia la derecha
          if ("KeyD") {
            this.element.style.backgroundImage =
              "url('./assets/player2-right.png')";
            return (this.xdirection = 1);
          }
          break;
        case "KeyA":
          this.vx = -10; // Mover hacia la izquierda
          if ("KeyA") {
            this.element.style.backgroundImage = `url(./assets/player2-left.png)`;
            return (this.xdirection = -1);
          }
          break;
        case "KeyW":
          if (this.canShoot) {
            this.shoot(); // Disparar

            if (this.xdirection === 1) {
              this.element.style.backgroundImage = `url(./assets/player2-disparo-vertical-rigth.png)`;
            }

            if (this.xdirection === -1) {
              this.element.style.backgroundImage = `url(./assets/player2-disparo-vertical-left.png)`;
            }
            break;
          }
      }
    });

    window.addEventListener("keyup", (e) => {
      if (!this.isSecondPlayer) {
        return; // No asigna eventos de teclado para el primer jugador
      }

      switch (e.code) {
        case "KeyD":
        case "KeyA":
          this.vx = 0; // Detener el movimiento horizontal
          break;
        default:
      }
    });
  }

}