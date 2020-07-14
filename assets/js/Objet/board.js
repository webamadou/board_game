const horizontal = 10;
const vertical = 9;

const $board = $("#board"); // contient le html
const board = []; // contient les données du plateau

class Card {
  constructor(horizontal, vertical, board) {
    this.horizontal = horizontal;
    this.vertical = vertical;
    this.board = board;
  }
}

let card1 = new Card(10, 9);

function displayBoard() {
  $board.html(""); // recuperer la varaible board dans le html

  for (let y = 0; y < vertical; y++) {
    for (let x = 0; x < horizontal; x++) {
      const $box = $("<div>");
      $board.append($box);

      $box.attr("id", x + "-" + y);
      $box.addClass("box");

      switch (board[y][x]) {
        case EMPTY_BOX:
          break;

        case WALL_BOX:
          $box.addClass("wall");
          break;
        case PLAYER1_BOX:
          $box.addClass("player1");
          //$box.append("<img src='assets/img/icons8-pokéball-2-48.png' alt='player1'/>");

          break;
        case PLAYER2_BOX:
          $box.addClass("player2");
          break;
        case WEAPON1_BOX:
          $box.addClass("weapon1");
          break;
        case WEAPON2_BOX:
          $box.addClass("weapon2");
          break;
        case WEAPON3_BOX:
          $box.addClass("weapon3");
          break;
        case WEAPON4_BOX:
          $box.addClass("weapon4");
          break;

        default:
          console.error("This value doesn't exist");
          break;
      }
    }
  }
}

function initWalls() {
  const nbWalls = getRandom(10, 20);

  for (let i = 0; i < nbWalls; i++) {
    let x, y;
    do {
      x = getRandom(0, horizontal - 1);
      y = getRandom(0, vertical - 1);
    } while (board[y][x] !== EMPTY_BOX);

    board[y][x] = WALL_BOX;
  }
}

function initWeapon() {
  const nbWeapon = getRandom(1, 4);

  for (let i = 0; i < nbWeapon; i++) {
    let x, y;

    do {
      x = getRandom(0, horizontal - 1);
      y = getRandom(0, vertical - 1);
    } while (board[y][x] !== EMPTY_BOX);

    const idWeapon = getRandom(1, 4);
    switch (idWeapon) {
      case 1:
        board[y][x] = WEAPON1_BOX;
        break;
      case 2:
        board[y][x] = WEAPON2_BOX;
        break;
      case 3:
        board[y][x] = WEAPON3_BOX;
        break;
      case 4:
        board[y][x] = WEAPON4_BOX;
        break;

      default:
        console.error("This value doesn't exist");
        break;
    }
  }
}

function initPlayer() {
  let x1, y1, x2, y2;
  do {
    x1 = getRandom(0, horizontal - 1);
    y1 = getRandom(0, vertical - 1);
  } while (
    board[y1][x1] !== EMPTY_BOX ||
    Math.abs(x2 - x1) <= 3 ||
    Math.abs(y2 - y1) <= 3
  );

  board[y1][x1] = PLAYER1_BOX;

  do {
    x2 = getRandom(0, horizontal - 1);
    y2 = getRandom(0, vertical - 1);
  } while (
    board[y2][x2] !== EMPTY_BOX ||
    Math.abs(x2 - x1) <= 3 ||
    Math.abs(y2 - y1) <= 3
  );

  board[y2][x2] = PLAYER2_BOX;
}

function initBoard() {
  console.log(board);
  for (let y = 0; y < vertical; y++) {
    board[y] = [];
    console.log(board);
    for (let x = 0; x < horizontal; x++) {
      board[y][x] = EMPTY_BOX;
      console.log(board);
    }
  }

  initWalls();
  initWeapon();
  initPlayer();
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

initBoard();
displayBoard();
