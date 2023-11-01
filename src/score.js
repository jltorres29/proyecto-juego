class Score {
  constructor(container, isPlayerOne, score = 0, lifes = 3) {
    this.container = container;
    this.lifes = lifes || 3;
    this.score = score;
    this.width = 150;
    this.height = 100;
    this.x = 10;
    this.y = 400;

    this.element = document.createElement("div");
    this.element.id = "points";


    this.scoreTextEl = document.createElement("h2");
    this.scoreTextEl.id = "points-text";
    this.scoreTextEl.textContent = `Score: ${this.score}`;
    this.scoreTextEl.style.marginLeft = "30px";

    this.heartsContainer = document.createElement("div");
    this.heartsContainer.id = "lifes-container";
    this.heartsContainer.style.marginLeft = "30px";

    this.imgjose = document.createElement("div");
    this.imgjose.id = "img-jose";
    this.imgjose.style.backgroundImage = "url('./assets/jose-vidas.jfif')";


    this.element.appendChild(this.imgjose);

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
    this.lifes--;

    const hearts = this.heartsContainer.children
    hearts[hearts.length - 1].remove();
    document.getElementById("hurt-sound").play();
  }

  addScore() {
    this.score++;
    this.scoreTextEl.textContent = `Score: ${this.score}`;
    document.getElementById("boom-sound").play();
  }
}
