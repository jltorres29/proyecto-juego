class Player {
    constructor(container) {
        this.container = container;
        this.width = 100;
        this.height = 100;
        this.x = 10;
        this.floor = 340; // Altura del suelo
        this.y = 340; // Posición vertical inicial
        this.vx = 0; // Velocidad horizontal
        this.bullets = []; // Almacenamiento de balas disparadas
        this.hits = 30; // Vidas o puntos de salud
        this.canShoot = true; // Control para permitir disparos

        // Crear un elemento HTML para representar al jugador
        this.element = document.createElement("div");
        this.element.style.position = "absolute";
        this.element.style.background = `url(./assets/player1.png)`;
        this.element.style.backgroundSize = "cover";
        this.element.style.backgroundPosition = "bottom";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;

        // Agregar el elemento del jugador al contenedor especificado
        this.container.appendChild(this.element);

        // Establecer escuchadores de eventos de teclado
        this.setListeners();
    }

    // Método para disparar una bala
    shoot() {
        this.bullets.push(
            new Bullet(
                this.container,
                this.x + this.width / 2, // Posición inicial de la bala en el centro del jugador en el eje horizontal
                this.y + this.height / 2 // Posición inicial de la bala en el centro del jugador en el eje vertical
            )
        );

        this.canShoot = false; // Evitar disparar demasiado rápido

        setTimeout(() => {
            this.canShoot = true;
        }, 300); // Restablecer la posibilidad de disparar después de un tiempo
    }

    // Método para mover al jugador
    move() {
        this.x += this.vx; // Mover al jugador horizontalmente

        // Limitar la posición del jugador dentro de los límites del contenedor
        if (this.x <= 0) {
            this.x = 0;
        }
        if (this.x + this.width >= this.container.offsetWidth) {
            this.x = this.container.offsetWidth - this.width;
        }

        this.element.style.left = `${this.x}px`; // Actualizar la posición del elemento del jugador

        // Mover todas las balas disparadas por el jugador
        this.bullets.forEach((bullet) => {
            bullet.move();
        });

        this.cleanup(); // Eliminar las balas que salieron de la pantalla
    }

    // Método para limpiar balas que están fuera de la pantalla
    cleanup() {
        const filteredBullets = this.bullets.filter((bullet) => {
            return bullet.x < this.container.offsetWidth;
        });

        this.bullets = filteredBullets; // Actualizar la lista de balas
    }

    // Establecer escuchadores de eventos de teclado para controlar al jugador
    setListeners() {
        window.addEventListener("keydown", (e) => {
            switch (e.code) {
                case "ArrowRight":
                    this.vx = 10; // Mover hacia la derecha
                    break;
                case "ArrowLeft":
                    this.vx = -10; // Mover hacia la izquierda
                    break;
                case "ArrowUp":
                    if (this.canShoot) {
                        this.shoot(); // Disparar
                    }
                    break;
            }
        });

        window.addEventListener("keyup", (e) => {
            switch (e.code) {
                case "ArrowRight":
                case "ArrowLeft":
                    this.vx = 0; // Detener el movimiento horizontal
                    break;
                default:
                    console.log("estás parado");
            }
        });
    }
}

