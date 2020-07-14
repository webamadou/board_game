import { Player } from "./player.js";
const horizontal = 10;
const vertical = 9;
let cpt = 0;
let currentPlayer = {};
let player1 = {
  coord: null,
  id: null,
  name: null,
};
let player2 = player1;

const $board = $("#board"); // contient le html
const board = []; // contient les données du plateau

const EMPTY_BOX = 0; // Case vide
const PLAYER1_BOX = 1; // gere le joueur 1
const PLAYER2_BOX = 2; // gere le joueur 2
const WALL_BOX = 3; // gere les mur
const WEAPON1_BOX = 5; // gere les armes
const WEAPON2_BOX = 6;
const WEAPON3_BOX = 7;
const WEAPON4_BOX = 8;

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
          //$box.append("<title>Player1</title>");

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
          //let elt4 = document.getElementById('weapon4');
          //elt4.innerHTML = "<div id= 'strengh'>let strengh = 100 </div> <div id=name>weapon4</div>";
          //let elt4 = document.getElementByClassName('weapon4');
          //elt4.innerHTML = "<title>Weapon4</title>";
          //$box.innerHTML = "<title>Weapon4</title>";

          //let titre = document.getElementsByClassName('weapon4');
          //titre4.setAttribute("class","weapon4");

          //$box.innerHTML = titre.setAttribute("class","weapon4");

          //let newElt = document.createElement("title");

          //let elt = document.getElementsByClassName('weapon4');

          //elt.appendChild(newElt);

          //const title = document.getElementsByTagName('title');

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
  player1.coord = [x1, y1];

  do {
    x2 = getRandom(0, horizontal - 1);
    y2 = getRandom(0, vertical - 1);
  } while (
    board[y2][x2] !== EMPTY_BOX ||
    Math.abs(x2 - x1) <= 3 ||
    Math.abs(y2 - y1) <= 3
  );

  board[y2][x2] = PLAYER2_BOX;
  //player2 = { coord: `${x2}-${y2}` };
  player2.coord = [x2, y2];
}

function initBoard() {
  //console.log(board);
  for (let y = 0; y < vertical; y++) {
    board[y] = [];
    //console.log(board);
    for (let x = 0; x < horizontal; x++) {
      board[y][x] = EMPTY_BOX;
      //console.log(board);
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

// Récupère le nom des joueurs dans les input, teste si le champ est bien rempli et affiche les players
$(function () {
  $("#buttonname1").on("click", function () {
    if ($("#name1").val().length === 0) {
      // Si le joueur 1 n'a pas entré son pseudo
      $("#name1").css({ border: "1px solid red" });
      $("#pname1").text("Entrez votre nom !").css({
        color: "red",
        "font-weight": "bold",
      });
    } else {
      $("#pname1").hide();
      $("#titlePlayer1").replaceWith(
        "<span id='titlePlayer1'>" + $("#name1").val() + "</span>"
      ); // Remplace player 1 par le nom du joueur

      $("#name1").hide("slow"); // Efface les input
      $("#book").hide("slow", function () {
        // Animation complete.
      });
      $("#name1").val(""); // Remets l'input à "zéro"
      displayBoard();
    }
  });
  $("#buttonname2").on("click", function () {
    if (
      $("#name2").val().length === 0 ||
      $("#titlePlayer1").text() === $("#name2").val()
    ) {
      // Si le joueur 2 n'a pas entré son pseudo ou si c'est le même que le joueur 1
      $("#name2").css("border", "1px solid red");
      $("#pname2").text("Entrez votre nom !").css({
        color: "red",
        "font-weight": "bold",
      });
    } else {
      $("#pname2").hide();
      $("#titlePlayer2").replaceWith(
        "<span id='titlePlayer2'>" + $("#name2").val() + "</span>"
      );
      //$("#divnamePlayer2").fadeOut("3000");
      $("#name2").hide("3000");
      $("#name2").val("");
      displayBoard();
      $("#instructions").html(
        'Qui commence ? <button class="pf" id="pile">Pile</button> ou <button class="pf" id="face">Face</button>'
      );
    }
  });
  $("#instructions").on("click", ".pf", function () {
    var pouf = $(this).attr("id"); // Récupère le texte du bouton cliqué : soit pile soit face
    quiCommence(pouf); // pouf : pour Pile OU Face

    //$('#instructions').fadeOut('2000'); // Efface les instructions en 2 secondes
    //$('#instructions').text(''); // Supprime le code html
    //$('#instructions').fadeIn('2000'); // Supprime le display: none
    $("#instructions").html(
      "Utilisez les flèches du clavier pour déplacer les players</br><u>3 déplacements possibles</u>"
    );
  });
});

function quiCommence(pf) {
  // fonction de choix pile ou face
  if (pf === "pile") {
    $("#div-player2").css("opacity", "0.2");
    //currentPlayer = "player" + $("#name2").val();
    currentPlayer = player1;
  } else if (pf === "face") {
    $("#div-player1").css("opacity", "0.2");
    currentPlayer = player2;
  }
  console.log("====current player=====", currentPlayer);
}

function qui_Commence(pf) {
  alert("je suis la");
  var lancer = getRandomIntInclusive(0, 10);
  if (pf === "pile" && lancer <= 5) {
    $("#divPlayer2").css("opacity", "0.2");
    currentPlayer = PLAYER1_BOX;
    $("#playPlayer-" + currentPlayer.className).html(
      "À vous de jouer !<br>Il reste 3 coup·s à jouer."
    );
  } else if (pf === "pile" && lancer > 5) {
    $("#divPlayer1").css("opacity", "0.2");
    currentPlayer = PLAYER2_BOX;
    $("#playPlayer-" + currentPlayer.className).html(
      "À vous de jouer !<br>Il reste 3 coup·s à jouer."
    );
  } else if (pf === "face" && lancer <= 5) {
    $("#divPlayer1").css("opacity", "0.2");
    currentPlayer = PLAYER2_BOX;
    $("#playPlayer-" + currentPlayer.className).html(
      "À vous de jouer !<br>Il reste 3 coup·s à jouer."
    );
  } else if (pf === "face" && lancer > 5) {
    $("#divPlayer2").css("opacity", "0.2");
    currentPlayer = PLAYER1_BOX;
    $("#playPlayer-" + currentPlayer.className).html(
      "À vous de jouer !<br>Il reste 3 coup·s à jouer."
    );
  }
  console.log(PLAYER1_BOX, PLAYER2_BOX);
  //move.appui(currentPlayer.x, currentPlayer.y, currentPlayer);
}

function move() {
  cpt++;
  var cptmov = 3 - cpt;

  if (cpt < 3) {
    $("#playPlayer-" + joueurActuel.className).html(
      "À vous de jouer !<br> vous pouvez faire " + cptmov + " coup(s) à jouer."
    );
    appui();
  } else if (cpt >= 3) {
    $("#playPlayer-" + joueurActuel.className).html(
      "À vous de jouer !<br>Il reste 0 coup à jouer."
    );
    cpt = 0;
    $("#section-" + joueurActuel.className)
      .delay(300)
      .animate({ opacity: 0.2 }, "slow");
    if (joueurActuel === player1) {
      joueurActuel = player2;
      $("#playPlayer-" + joueurActuel.className).html(
        "À vous de jouer !<br>vous aviez 3 coups à jouer."
      );

      move.appui();
    } else if (joueurActuel === player2) {
      joueurActuel = player1;
      $("#playPlayer-" + joueurActuel.className).html(
        "À vous de jouer !<br> vous avez 3 coups à jouer."
      );
      move.appui();
    }
    $("#section-" + joueurActuel.className)
      .delay(300)
      .animate({ opacity: 1 }, "slow");
  }
}

//La fonction appui qui va permettre de deplacer les joueurs.
const appui = () => {
  $(document).on("keydown", function (e) {
    if (e.which === 37) {
      cord_player1 = player1.coord[0] + "-" + player1.coord[1];
      let x = player1.coord[0] - 1;
      let y = player1.coord[1];
      from = document.getElementById(cord_player1);
      to = document.getElementById(`${x}-${y}`);
      from.classList.remove("player1");
      to.classList.add("player1");
      console.log("gauche");
    }
    if (e.which === 39) {
      from = document.getElementById("7-1");
      to = document.getElementById("4-1");
      from.classList.add("player2");
      to.classList.remove("player2");
      console.log("droite");
    }
  });
};

appui();
function appui_aerty() {
  board[y][x].isPlayer = false; // Actualise l'objet cellule
  $(document).on("keydown", function (e) {
    if (e.which === 37) {
      // Vers la gauche
      /*let x, y;
      x = x;
      y = y - 1;
      if (y >= 0) {
        if (board[y][x].isAccess === true) {
          $(document).off("keydown");
          board[y][x + 1].isAccess = true;
          board[y][x].isAccess = false;
          board[y][x].isPlayer = true;
          deplacePlayer();
        } else if (board[y][x].isAccess === false) {
          $(document).off("keydown");
          $("#obstacle-" + joueurActuel.className).text(
            "Obstacle infranchissable."
          );
          cpt -= 1;
          move();
        }
      } else if (y < 0) {
        $(document).off("keydown");
        $("#obstacle-" + joueurActuel.className).text(
          "Déplacement impossible."
        );
        cpt -= 1;
        move();
      }//*/
    } else if (e.which === 38) {
      // Vers le haut
      x = x - 1;
      y = y;
      if (x >= 0) {
        if (board[y][x].isAccess === true) {
          $(document).off("keydown");
          board[y + 1][x].isAccess = true;
          board[y][x].isAccess = false;
          board[y][x].isPlayer = true;
          deplacePlayer();
        } else if (board[y][x].isAccess === false) {
          $(document).off("keydown");
          $("#obstacle-" + joueurActuel.className).text(
            "Obstacle infranchissable."
          );
          cpt -= 1;
          move();
        }
      } else if (x < 0) {
        $(document).off("keydown");
        $("#obstacle-" + joueurActuel.className).text(
          "Déplacement impossible."
        );
        cpt -= 1;
        move();
      }
    } else if (e.which === 39) {
      // Vers la droite
      posX = posX;
      posY = posY + 1;
      if (posY <= 9) {
        if (board[y][x].isAccess === true) {
          $(document).off("keydown");
          board[y][x - 1].isAccess = true;
          board[y][x].isAccess = false;
          board[y][x].isPlayer = true;
          deplacePlayer();
        } else if (board[y][x].isAccess === false) {
          $(document).off("keydown");
          $("#obstacle-" + joueurActuel.className).text(
            "Obstacle infranchissable."
          );
          cpt -= 1;
          move();
        }
      } else if (y > 9) {
        $(document).off("keydown");
        $("#obstacle-" + joueurActuel.className).text(
          "Déplacement impossible."
        );
        cpt -= 1;
        move();
      }
    } else if (e.which === 40) {
      // Vers le bas
      x = x + 1;
      y = y;
      if (x <= 9) {
        if (board[y][x].isAccess === true) {
          $(document).off("keydown");
          board[y - 1][x].isAccess = true;
          board[y][x].isAccess = false;
          board[y][x].isPlayer = true;
          deplacePlayer();
        } else if (board[y][x].isAccess === false) {
          $(document).off("keydown");
          $("#obstacle-" + joueurActuel.className).text(
            "Obstacle infranchissable."
          );
          cpt -= 1;
          move();
        }
      } else if (x > 9) {
        $(document).off("keydown");
        $("#obstacle-" + joueurActuel.className).text(
          "Déplacement impossible."
        );
        cpt -= 1;
        move();
      }
    }
  });
}

function deplacePlayer() {
  $(
    "[alt=" + joueurActuel.className + "-" + joueurActuel.weapon.name + "]"
  ).remove(); // Supprime la balise qui contient l'attribut alt="player1-arme"
  if (board[y][x].isWeapon === true) {
    $("[alt=" + board[y][x].weapon.name + "]").remove(); // Supprime l'arme
    oldWeapon = joueurActuel.weapon; // Met l'arme du joueur en tampon
    joueurActuel.weapon = board[y][x].weapon; // L'arme du joueur est l'arme de la cellule
    board[y][x].weapon = oldWeapon; // L'objet cellule reprend l'ancienne arme du joueur
    $("#" + board[y][x].id).append(
      "<img src='assets/img/" +
        board[y][x].weapon.name +
        ".png' alt='" +
        board[y][x].weapon.name +
        "'/>"
    );
    $("#" + board[y][x].id).append(
      "<img src='assets/img/" +
        joueurActuel.className +
        "-" +
        joueurActuel.weapon.name +
        ".png' alt='" +
        joueurActuel.className +
        "-" +
        joueurActuel.weapon.name +
        "'/>"
    ); // Ajoute l'image
    $("#arme-" + joueurActuel.className).text(
      "ARME : " + joueurActuel.weapon.name
    );
    $("#forcearme-" + joueurActuel.className).text(
      "FORCE ARME : " + joueurActuel.weapon.force
    );
  } else {
    $("#" + board[y][x].id).append(
      "<img src='assets/img/" +
        joueurActuel.className +
        "-" +
        joueurActuel.weapon.name +
        ".png' alt='" +
        joueurActuel.className +
        "-" +
        joueurActuel.weapon.name +
        "'/>"
    ); // Ajoute l'image
  }

  joueurActuel.x = x; // Actualise les coordonnées du joueur
  joueurActuel.y = y;

  // if (posX-1 > 0 && board[y - 1][x].isPlayer === true) { // Conditions pour lancer le combat entre les joueurs
  //  $(document).off();fight.init(joueurActuel);
  //  } else if (posX+1 < 9 && board[y + 1][x].isPlayer === true) {
  //    $(document).off();fight.init(joueurActuel);
  // } else if (posY-1 > 0 && cellule[posX][posY-1].isPlayer === true) {
  //   $(document).off();fight.init(joueurActuel);
  // } else if (posY+1 < 9 && cellule[posX][posY+1].isPlayer === true) {
  //    $(document).off();fight.init(joueurActuel);
  //} else {
  //  move.turn(posX, posY, joueurActuel);
  //}
}
