window.addEventListener("load", () => {
    const container = document.getElementById("game-board");
    // Obtiene una referencia al botón de inicio del juego con el id "intro-game-btn"
    const btnStart = document.getElementById("intro-game-btn");
    // Obtiene una referencia al elemento con el id "intro-game"
    const introBoard = document.getElementById("intro-game");



    btnStart.addEventListener("click", () => {
        introBoard.remove()
        // Crea una nueva instancia del juego y lo inicia en el contenedor especificado
        const game = new Game(container);
        game.start();
    });

});
