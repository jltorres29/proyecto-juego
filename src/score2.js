class Score2 {
    constructor(container, score = 0, lifes = 3) {
        this.container = container;
        this.lifes = lifes || 3;
        this.score = score;
        this.width = 300;
        this.height = 100;
        this.x = 600;
        this.y = 400;

        this.element = document.createElement("div");
        this.element.id = "points2";

        this.scoreTextEl = document.createElement("h2");
        this.scoreTextEl.id = "points2-text";
        this.scoreTextEl.style.marginLeft = "65px";
        this.scoreTextEl.textContent = `Score: ${this.score}`;

        this.heartsContainer = document.createElement("div");
        this.heartsContainer.id = "lifes-container";
        this.heartsContainer.style.marginLeft = "65px";

        this.imgjorge = document.createElement("div");
        this.imgjorge.id = "img-jorge";
        this.imgjorge.style.backgroundImage = "url('./assets/jorge-vidas.jfif')";

        this.element.appendChild(this.imgjorge);

        new Array(this.lifes).fill("").forEach((_) => {
            const heart = document.createElement("img");
            heart.src = "./assets/caca.png";
            heart.style.width = "30px";
            heart.style.height = "30px";


            this.heartsContainer.appendChild(heart);
        });

        this.element.appendChild(this.scoreTextEl);
        this.element.appendChild(this.heartsContainer);

        this.element.style.position = "absolute";

        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;

        this.container.appendChild(this.element);
    }

    removeLife() {
        console.log('entra')
        this.lifes--;

        const hearts = this.heartsContainer.children
        hearts[hearts.length - 1].remove()
    }

    addScore() {
        this.score++;

        this.scoreTextEl.textContent = `Score: ${this.score}`;
    }
}
