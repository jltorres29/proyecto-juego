const options = {
  EASY: { difficulty: 5, difficultScore: 25 },
  MEDIUM: { difficulty: 15, difficultScore: 35 },
  HEAVY: { difficulty: 30, difficultScore: 50 },
};

class Game {
  constructor(container, isMultiPlayer = false, difficultyName) {
    this.container = container;
    this.isMultiPlayer = isMultiPlayer;

    this.numEnemy = options[difficultyName].difficulty;

    this.difficultScore = options[difficultyName].difficultScore;
    this.difficultyName = difficultyName;
    this.background = new Background(this.container); // Crea un fondo en el contenedor del juego.
    this.player = new Player(this.container); // Crea un jugador en el contenedor del juego.
    this.lifes = new Score(this.container, true);

    if (isMultiPlayer) {
      this.player2 = new Player(this.container, true); // Crea un jugador en el contenedor del juego.
      this.lifes2 = new Score2(this.container);
    }

    this.enemies = [];
    this.gameIsOver = false;

    this.intervalId = null;
  }

  // Método para iniciar el juego.
  start() {
    // Inicia el juego al establecer un intervalo para actualizar el juego.
    this.intervalId = setInterval(() => {
      this.update(); // Actualiza el estado del juego en cada intervalo.
    }, 1000 / 24); // Actualiza el juego aproximadamente 24 veces por segundo.
  }

  // Método para actualizar el estado del juego.
  update() {
    this.player.move(); // Mueve al jugador.
    if (this.isMultiPlayer === true) {
      this.player2.move();
    }

    // Verifica si hay colisión y si todavía hay un enemigo en la pantalla

    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];
      enemy.move();
      // si el jugador choca con un enemigo
      if (
        this.player.didCollide(enemy) ||
        (this.player2 && this.player2.didCollide(enemy))
      ) {
        if (this.player.didCollide(enemy) && this.lifes.lifes > 0) {
          console.log("player1");
          this.lifes.removeLife();
          console.log(this.lifes);
        } else if (this.player2.didCollide(enemy) && this.lifes2.lifes > 0) {
          this.lifes2.removeLife();
          console.log(this.lifes2);
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
    } else if (this.lifes.lifes <= 0 && this.lifes2.lifes <= 0) {
      this.endGame();
    }

    // Crea un nuevo enemigo basado en una probabilidad aleatoria
    // cuando no hay otros objetos en la pantalla

    if (Math.random() > 0.95 && this.enemies.length < this.numEnemy) {
      this.enemies.push(new Enemy(this.container, this.difficultyName));
    }
    // Este código parece ser parte de una iteración a través de las balas del jugador
    // para detectar colisiones con enemigos.

    this.player.bullets.find((bullet) => {
      // Iteramos a través de las balas del jugador.
      console.log(bullet);
      this.enemies.find((enemy) => {
        // Para cada bala, comprobamos si colisiona con algún enemigo.
        console.log(enemy);
        if (bullet.didCollide(enemy)) {
          enemy.element.style.backgroundImage = `url(./assets/explosion.gif)`;
          console.log("boom");
          setInterval(() => {
            enemy.element.remove(); // Actualiza el estado del juego en cada intervalo.
          }, 1000 / 5);
          this.lifes.addScore();
          // Si hay una colisión entre el enemigo y la bala:

          // Eliminamos el elemento del enemigo del DOM.

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

      if (this.lifes.score === this.difficultScore) {
        this.youWin();
      }
    });

    if (this.player2) {
      this.player2.bullets.find((bullet) => {
        // Iteramos a través de las balas del jugador.
        console.log(bullet);
        this.enemies.find((enemy) => {
          // Para cada bala, comprobamos si colisiona con algún enemigo.
          console.log(enemy);
          if (bullet.didCollide(enemy)) {
            enemy.element.style.backgroundImage = `url(./assets/explosion.gif)`;
            console.log("boom");
            setInterval(() => {
              enemy.element.remove(); // Actualiza el estado del juego en cada intervalo.
            }, 1000 / 5);
            this.lifes2.addScore();

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
        if (this.lifes2.score === this.difficultScore) {
          this.youWin();
        }
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

  youWin() {
    this.removeListener("keyup");
    this.removeListener("keydown");
    document.getElementById("background").classList.add("hidden-div");
    this.isMultiPlayer &&
      document.getElementById("second-player").classList.add("hidden-div");
    document.getElementById("first-player").classList.add("hidden-div");
    document.getElementById("win-game").classList.remove("hidden-div");
    document.getElementById("playing-sound").pause();
    document.getElementById("win-sounds").play();
    document.getElementById("points").classList.add("hidden-div");

    if (this.player2) {
      document.getElementById("points2").classList.add("hidden-div");
    }

    this.enemies.forEach((enemy1) => enemy1.element.remove());
    this.enemies = [];

    this.player.bullets.forEach((bullet) => bullet.element.remove());
    this.player.bullets = [];
    this.player.element.remove();
    this.player2 && this.player2.element.remove();

    clearInterval(this.intervalId);

    document.getElementById(
      "win-game-score1"
    ).innerText = `PLAYER 1 HAVE ${this.lifes.score} POINTS`;
    if (this.player2) {
      document.getElementById(
        "win-game-score2"
      ).innerText = `PLAYER 2 HAVE ${this.lifes2.score} POINTS`;
    }
  }

  removeListener(type) {
    window.addEventListener(
      type,
      function (event) {
        event.stopImmediatePropagation();
      },
      true
    );
  }

  endGame() {
    this.removeListener("keyup");
    this.removeListener("keydown");
    document.getElementById("background").classList.add("hidden-div");
    document.getElementById("end-game").classList.remove("hidden-div");
    document.getElementById("playing-sound").pause();
    document.getElementById("end-sounds").play();
    document.getElementById("points").classList.add("hidden-div");

    if (this.player2) {
      document.getElementById("points2").classList.add("hidden-div");
    }

    this.enemies.forEach((enemy) => enemy.element.remove());
    this.enemies = [];

    this.player.bullets.forEach((bullet) => bullet.element.remove());
    this.player.bullets = [];

    clearInterval(this.intervalId);

    document.getElementById(
      "end-game-score1"
    ).innerText = `PLAYER 1: ${this.lifes.score} POINTS`;
    if (this.player2) {
      document.getElementById(
        "end-game-score2"
      ).innerText = `PLAYER 2: ${this.lifes2.score} POINTS`;
    }
  }

  removeListener(type) {
    window.addEventListener(
      type,
      function (event) {
        event.stopImmediatePropagation();
      },
      true
    );
  }
}
