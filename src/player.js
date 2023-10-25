class Player {
    constructor(container) {
        this.container = container;
        this.width = 100;
        this.height = 100;
        this.x = 10;
        this.floor = 340;
        this.y = 340;
        this.vx = 0;
        this.bullets = [];
        this.vy = 0;
        this.hits = 30;
        this.canShoot = true;
        console.log(container);

        this.canShoot = true;


        this.element = document.createElement("div");
        this.element.style.position = "absolute";

        this.element.style.background = `url(./assets/player1.png)`;
        this.element.style.backgroundSize = "cover";
        this.element.style.backgroundPosition = "bottom";

        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;

        this.container.appendChild(this.element);

        //revisar
        this.setListeners();
    }
    shoot() {
        this.bullets.push(
            new Bullet(
                this.container,
                this.x + this.width / 2,
                this.y + this.height / 2,


            )
        );

        this.canShoot = false;

        setTimeout(() => {
            this.canShoot = true;
        }, 300);
    }

    move() {
        this.x += this.vx;

        if (this.x <= 0) {
            this.x = 0;
        }

        if (this.x + this.width >= this.container.offsetWidth) {
            this.x = this.container.offsetWidth - this.width;
        }

        this.element.style.left = `${this.x}px`;

        this.bullets.forEach((bullet) => {
            bullet.move();
        });

        this.cleanup();
    }


    cleanup() {
        const filteredBullets = this.bullets.filter((bullet) => {
            return bullet.x < this.container.offsetWidth;
        });

        this.bullets = filteredBullets;
    }


    setListeners() {
        window.addEventListener("keydown", (e) => {
            switch (e.code) {
                case "ArrowRight":
                    this.vx = 10;
                    break;
                case "ArrowLeft":
                    this.vx = -10;
                    break;
                case "ArrowUp":
                    if (this.canShoot) {
                        this.shoot();
                    }
                    break;

            }
        });
        window.addEventListener("keyup", (e) => {
            switch (e.code) {
                case "ArrowRight":
                case "ArrowLeft":
                    this.vx = 0;
                    break;
                default:
                    console.log("estas parado");
            }
        });
    }

}





