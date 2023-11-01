class Game {
  constructor(container, isMultiPlayer = false) {
    this.container = container;
    this.isMultiPlayer = isMultiPlayer;

    this.background = new Background(this.container); // Crea un fondo en el contenedor del juego.
    //this.element.id = "allgame";
    this.player = new Player(this.container); // Crea un jugador en el contenedor del juego.
    this.lifes = new Score(this.container, true);

    if (isMultiPlayer) {
      this.player2 = new Player(this.container, true); // Crea un jugador en el contenedor del juego.
      this.lifes2 = new Score2(this.container);
    }

    // this.enemy = new Enemy(this.container); // Inicializa un arreglo para enemigos.
    //this.imgjose = new Score(this.container)
    // this.score = new Score(this.container, this.score, this.player.hits);
    this.enemies = [];
    this.gameIsOver = false;

    this.intervalId = [];
  }

  // Método para iniciar el juego.
  start() {
    // Inicia el juego al establecer un intervalo para actualizar el juego.
    this.intervalId = setInterval(() => {
      this.update(); // Actualiza el estado del juego en cada intervalo.
    }, 1000 / 24); // Actualiza el juego aproximadamente 24 veces por segundo.
  }

  // nuevo metodo gameLoop
  gameLoop() {
    if (this.gameIsOver) {
      return;
    }
    this.update();

    window.requestAnimationFrame(() => this.gameLoop());
  }

  // Método para actualizar el estado del juego.
  update() {
    this.player.move(); // Mueve al jugador.
    if (this.isMultiPlayer === true) { this.player2.move(); }

    // Verifica si hay colisión y si todavía hay un enemigo en la pantalla

    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];
      enemy.move();
      // si el jugador choca con un enemigo
      if (this.player.didCollide(enemy) || (this.player2 && this.player2.didCollide(enemy))) {
        if (this.player.didCollide(enemy) && this.lifes.lifes > 0) {
          console.log('player1');
          this.lifes.removeLife()
        } else if (this.player2.didCollide(enemy) && this.lifes2.lifes > 0) {
          this.lifes2.removeLife()
        }
        // Elimina el enemigo del DOM
        enemy.element.remove();
        // Elimina el enemigo del array
        this.enemies.splice(i, 1);

        // Comprobar si hay que eliminar jugador
        this.checkPlayers();

        // Actualiza la variable del contador para tener en cuenta el enemigo eliminado
        i--;
      } // Si el enemigo está fuera de la pantalla (en la parte inferior)

      if (enemy.top > this.height) {
        // Aumenta la puntuación en 1
        this.score++;
        // Elimina el enemigo del DOM
        enemy.element.remove();
        // Elimina el enemigo del array
        this.enemies.splice(i, 1);
        // Actualiza la variable del contador para tener en cuenta el enemigo eliminado
        i--;
      }
    }

    // Si las vidas son 0, game over
    if (!this.isMultiPlayer) {
      if (this.lifes.lifes <= 0) {
        this.endGame();
      }
    }
    else if (this.lifes.lifes <= 0 && this.lifes2.lifes <= 0) {
      this.endGame();
    }

    // Crea un nuevo enemigo basado en una probabilidad aleatoria
    // cuando no hay otros objetos en la pantalla
    let numenemy = 5 //SI SE PUEDE, AÑADIR DIFICULTAD MODIFICANDO NUMERO ENEMI
    if (Math.random() > 0.98 && this.enemies.length < numenemy) {
      this.enemies.push(new Enemy(this.container));
    }
    // Este código parece ser parte de una iteración a través de las balas del jugador
    // para detectar colisiones con enemigos.

    this.player.bullets.find((bullet) => {
      // Iteramos a través de las balas del jugador.
      console.log(bullet);
      return this.enemies.find((enemy) => {
        // Para cada bala, comprobamos si colisiona con algún enemigo.
        console.log(enemy);
        if (bullet.didCollide(enemy)) {
          this.lifes.addScore();
          // Si hay una colisión entre el enemigo y la bala:

          // Eliminamos el elemento del enemigo del DOM.
          enemy.element.remove();

          // Actualizamos la lista de enemigos eliminando el enemigo actual.
          this.enemies = this.enemies.filter((en) => {
            return en !== enemy;
          });

          // Eliminamos el elemento de la bala del jugador del DOM.
          bullet.element.remove();

          // Actualizamos la lista de balas del jugador eliminando la bala actual.
          this.player.bullets = this.player.bullets.filter((bul) => {
            return bul !== bullet;
          });
        }
      });
    });

    if (this.player2) {
      this.player2.bullets.find((bullet) => {
        // Iteramos a través de las balas del jugador.
        console.log(bullet);
        return this.enemies.find((enemy) => {
          // Para cada bala, comprobamos si colisiona con algún enemigo.
          console.log(enemy);
          if (bullet.didCollide(enemy)) {
            this.lifes2.addScore();
            // Si hay una colisión entre el enemigo y la bala:

            // Eliminamos el elemento del enemigo del DOM.
            enemy.element.remove();

            // Actualizamos la lista de enemigos eliminando el enemigo actual.
            this.enemies = this.enemies.filter((en) => {
              return en !== enemy;
            });

            // Eliminamos el elemento de la bala del jugador del DOM.
            bullet.element.remove();

            // Actualizamos la lista de balas del jugador eliminando la bala actual.
            this.player2.bullets = this.player2.bullets.filter((bul) => {
              return bul !== bullet;
            });
          }
        });
      });
    }

  }

  checkPlayers() {
    if (this.lifes.lifes <= 0) {
      const elem = document.getElementById("first-player");
      elem.classList.add("hidden-div");
    }
    if (this.player2 && this.lifes2.lifes <= 0) {
      const elem = document.getElementById("second-player");
      elem.classList.add("hidden-div");
    }
  }

  endGame() {
    document.getElementById("background").classList.add("hidden-div");
    document.getElementById("end-game").classList.remove("hidden-div");
    document.getElementById("playing-sound").pause();
    document.getElementById("end-sounds").play();
    document.getElementById("points").classList.add("hidden-div");
    if (this.player2) {
      document.getElementById("points2").classList.add("hidden-div");
    }

    clearInterval(this.intervalId);


    document.getElementById("end-game-score1").innerText = `SCORE PLAYER 1: ${this.lifes.score} `;
    if (this.player2) {
      document.getElementById("end-game-score2").innerText = `SCORE PLAYER 2: ${this.lifes2.score} `;
    }
  }
}
