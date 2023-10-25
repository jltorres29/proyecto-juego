class Bullet {
    constructor(container, x, y) {
        this.container = container;
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
        this.vy = 10;

        this.element = document.createElement("div");
        this.element.style.position = "relative";

        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.backgroundColor = "blue";
        this.element.style.borderRadius = "100px";

        this.container.appendChild(this.element);
    }
    //Aqui se establece el movimiento de la vala
    move() {
        this.y -= this.vy;
        this.element.style.top = `${this.y}px`;
    }
}
