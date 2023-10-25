class Game {
    constructor(container) {
        this.container = container;
        this.background = new Background(this.container);
        this.player = new Player(this.container);
        this.enemies = [];
        this.Bullet = [];
        console.log(container)

    }

    start() {
        // Inicia el juego al establecer un intervalo para actualizar el juego.
        setInterval(() => {

            this.update(); // Actualiza el estado del juego en cada intervalo.
        }, 1000 / 24); // Actualiza el juego aproximadamente 36 veces por segundo.
    }

    update() {
        this.player.move();
        this.Bullet.move();
        this.enemies.move();

    }
}