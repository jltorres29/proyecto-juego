class Game {
    constructor(container) {
        this.container = container;
        this.background = new Background(this.container); // Crea un fondo en el contenedor del juego.
        this.player = new Player(this.container); // Crea un jugador en el contenedor del juego.
        this.enemy = new Enemy(this.container); // Inicializa un arreglo para enemigos.
        this.score = new Score(this.container, this.player.hits);


        console.log(container);
    }

    // Método para iniciar el juego.
    start() {
        // Inicia el juego al establecer un intervalo para actualizar el juego.
        setInterval(() => {

            this.update(); // Actualiza el estado del juego en cada intervalo.
        }, 1000 / 24); // Actualiza el juego aproximadamente 36 veces por segundo.
    }

    // Método para actualizar el estado del juego.
    update() {
        this.player.move(); // Mueve al jugador.
        this.enemy.move();


    }
}
