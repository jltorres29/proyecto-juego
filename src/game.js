class Game {
  constructor(container) {
    this.container = container;
    this.background = new Background(this.container); // Crea un fondo en el contenedor del juego.
    this.player = new Player(this.container); // Crea un jugador en el contenedor del juego.
    this.enemy = new Enemy(this.container); // Inicializa un arreglo para enemigos.
    this.score = new Score(this.container, this.player.hits);
    this.enemies = [];
   
   // NUEVO
    this.score = 0;
    this.lives = 3;
    this.gameIsOver = false;

    console.log(container);
  }

  // Método para iniciar el juego.
  start() {
    // Inicia el juego al establecer un intervalo para actualizar el juego.
    setInterval(() => {
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
    this.enemy.move(); // Mueve al enemigo


    // NUEVO
    // Verifica si hay colisión y si todavía hay un enemigo en la pantalla
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];
      enemy.move();

      // si el jugador choca con un enemigo
      if (this.player.didCollide(enemy)) {
        // Elimina el enemigo del DOM
        enemy.element.remove();
        // Elimina el enemigo del array
        this.enemies.splice(i, 1);
        // Reduce 1 vida del jugador
        this.lives--;
        // Actualiza la variable del contador para tener en cuenta el enemigo eliminado
        i--;
      } // Si el enemigo está fuera de la pantalla (en la parte inferior)
      else if (enemy.top > this.height) {
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
    if (this.lives === 0) {
      this.endGame();
    }

    // Crea un nuevo enemigo basado en una probabilidad aleatoria
    // cuando no hay otros objetos en la pantalla
    if (Math.random() > 0.98 && this.enemies.length < 1) {
      this.enemies.push(new Enemy(this.container));
    }

    // DA FALLO ESTE METODO
  /*  endGame() {
      this.player.element.remove();
      this.enemies.forEach(function (enemy) {
        enemy.element.remove();
      });
  
      this.gameIsOver = true;
      // Ocultar pantalla del juego
      this.container.style.display = "none";
      // Mostrar pantalla final
      this.container.style.display = "block";
    }
*/

   }
  






  /* checkCollisions() {
        // Enemy - player collision
    
        const collidedEnemy = this.enemies.find((enemy) => {
          return enemy.didCollide(this.player);
        });
    
        if (collidedEnemy) {
          this.enemies = this.enemies.filter((enemy) => {
            return enemy !== collidedEnemy;
          });
    
          collidedEnemy.element.style.display = "none";
          this.player.hits--;
    
          this.score.update(this.player.hits, "enemy");
    
          if (this.player.hits <= 0) {
            this.gameOver();
          }
        } */

  /* this.player.bullets.find((bullet) => {
    return this.enemies.find((enemy) => {
      if (enemy.didCollide(bullet)) {
        enemy.element.remove();

        this.enemies = this.enemies.filter((en) => {
          return en !== enemy;
        });

        bullet.element.remove();

        this.player.bullets = this.player.bullets.filter((bul) => {
          return bul !== bullet;
        });
      }
    });
  });    */
}
