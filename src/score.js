class Score {
  constructor(container, lifes) {
    this.container = container;
    this.lifes = 3;
    this.points = 0;

    this.width = 150;
    this.height = 100;
    this.x = 10;
    this.y = 400;

    this.element = document.createElement("div");
    this.element.id = "points";

    this.scoreTextEl = document.createElement("h2");
    this.scoreTextEl.id = "points-text";
    this.scoreTextEl.textContent = `Score: ${this.points}`;

    this.heartsContainer = document.createElement("div");
    this.heartsContainer.id = "lifes-container";

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
}
