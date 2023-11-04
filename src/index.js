let difficulty = 5;
let difficultScore = 25;
let difficultyName = 'EASY'

window.addEventListener("load", () => {
  const container = document.getElementById("game-board");

  // Obtiene una referencia al botón de inicio del juego con el id "intro-game-btn"
  const btnStart = document.getElementById("intro-game-btn");
  // Obtiene una referencia al elemento con el id "intro-game"
  const introGame = document.getElementById("intro-game");

  const gameBoardPlayer = document.getElementById("game-board-player");

  const selectPlayer1 = document.getElementById("intro-game-player1-btn");

  const selectPlayer2 = document.getElementById("intro-game-player2-btn");

  const endGame = document.getElementById("end-game");

  const btnsRestart = document.getElementsByClassName("restart-btn");

  const mediumDifficulty = document.getElementById("difficulty-less-button");

  const difficultyText = document.getElementById("difficulty-text");

  const moreDifficulty = document.getElementById("difficulty-more-button");

  const easyDifficulty = document.getElementById("return-easy-button");



  //AQUI SE AÑADE DESDE LA PANTALLA INICIO BOTON STAR A SELECCIONAR JUGADORES
  btnStart.addEventListener("click", () => {
    introGame.classList.add("hidden-div");
    // Crea una nueva instancia del juego y lo inicia en el contenedor especificado
    gameBoardPlayer.classList.remove("hidden-div");

    document.getElementById("playing-sound").play();
  });

  //AQUI DESDE LA PANTALLA DE SELECCIONAR JUGADORES SE REDIRIGE A LA PANTALLA DEL JUEGO
  easyDifficulty.addEventListener("click", () => {
    console.log('less')
    difficultyText.innerText = 'EASY';
    difficulty = 5;
    difficultScore = 1;
    difficultyName = 'EASY'
  });

  mediumDifficulty.addEventListener("click", () => {
    console.log('less')
    difficultyText.innerText = 'MEDIUM'
    difficulty = 15
    difficultScore = 2
    difficultyName = 'MEDIUM'
  });

  moreDifficulty.addEventListener("click", () => {
    console.log('more')
    difficultyText.innerText = 'HEAVY'
    difficulty = 30
    difficultScore = 3
    difficultyName = 'HEAVY'
  });

  selectPlayer1.addEventListener("click", () => {
    gameBoardPlayer.classList.add("hidden-div");
    // Crea una nueva instancia del juego y lo inicia en el contenedor especificado
    const game = new Game(container, false, difficultyName);
    game.start();
  });

  selectPlayer2.addEventListener("click", () => {
    gameBoardPlayer.classList.add("hidden-div");
    // Crea una nueva instancia del juego y lo inicia en el contenedor especificado
    const game = new Game(container, true, difficultyName);
    game.start();
  });

  Array.from(btnsRestart).forEach((btnRestart) => {
    btnRestart.addEventListener("click", () => {
      window.location.reload()
      /*endGame.classList.add("hidden-div");
      // Crea una nueva instancia del juego y lo inicia en el contenedor especificado
      gameBoardPlayer.classList.remove("hidden-div");
      document.getElementById("end-sounds").pause();
      document.getElementById("playing-sound").play();
      document.getElementById("end-game-score1").innerText = "";
      document.getElementById("end-game-score2").innerText = "";*/
    });
  })
});
