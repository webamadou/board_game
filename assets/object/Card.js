import { Player } from "./player.js";

const board_element = $("#board"); // contient le html
const horizontal = 10; //nbr de cel horizontal
const vertical = 9; //nbr cels vertical
const board = []; // contient les données du plateau
const players_data = []; //Contient les donnees des players
const NBR_SECONDS = 5; //nbr de secondes de chaque tours

const EMPTY_BOX = 0;
const PLAYER_BOX = 1;
const WEAPON_BOX = 2;
const WALL_BOX = 3;
const NBR_PLAYERS = 2; //Le nbr de joueurs

let seconds = NBR_SECONDS; //Cette variable est utiliser pour afficher le timer
let NBR_MOVEMENTS = 3; //Nbr qu'un joureur peut faire
let switcher = null; //Vas contenir l'ID de la fonction setInterval

export const Card = function () {
  //constructor(horizontal, vertical, board) {
  this.horizontal = horizontal;
  this.vertical = vertical;
  this.board = board;
  this.nbr_players = NBR_PLAYERS;
  this.players_data = players_data;
  this.current_player = null;
  /**
   * display_board: utiliser pour afficher le plateau de jeux avec les cellules et leur contenu
   * */
  this.display_board = () => {
    console.log(board_element.html(""));

    //Nous allons utiliser les valeurs de horizontal et vertical pour creer des boucles qui vous definir les cellules du plateau
    for (let y = 0; y < vertical; y++) {
      board[y] = []; //On initialise les collonnes
      //Pour chaque collonne
      for (let x = 0; x < horizontal; x++) {
        board[y][x] = EMPTY_BOX; //Toute les cellules sont vide initialement

        //Pour chaque ligne on contruit une div qui va avoir un id y-x et une class box
        let box = $("<div>");
        box.attr("id", x + "-" + y);
        box.addClass("box");
        //On ajoute la box dans le plateau
        board_element.append(box);
      }
    }
    //Maintenant nous allons placer les murs
    init_walls();
    //Nous placons ensuite les armes
    init_weapons();
    //Et enfin on place les joueurs
    init_players();
    console.log(this.players_data);
  }; //End method display_board

  /**
   * get_random: retourne une valeur aleatoire inclus dans une intervale
   * @param {integer} min plus petit valeur de l'interval
   * @param {integer} max plus grand valeur de l'interval
   * @returns integer
   */
  let get_random = (min, max) => {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  };

  /**
   * La fonction permet de decider qui va commencer le jeu.
   * @param {string} pf pile ou face
   * @returns {integer} gagnant du pile ou face
   */
  this.qui_commence = (pf) => {
    let lancer = get_random(0, 10);
    let player = 0;
    if (pf === "pile" && lancer <= 5) {
      player = 2;
    } else if (pf === "pile" && lancer > 5) {
      player = 1;
    } else if (pf === "face" && lancer <= 5) {
      player = 2;
    } else if (pf === "face" && lancer > 5) {
      player = 1;
    }
    return player;
  };
  /**
   * Switch_player permet de changer de player apre nbr_seonds
   * La variable seconds permet d'afficher le nbr de secondes qui restent
   */
  let switch_player = () => {
    $("#instructions").html(`${seconds} s`);
    --seconds;
    if (seconds < 0) {
      NBR_MOVEMENTS = 3;
      let activate_player =
        "player1" === this.current_player.id
          ? this.players_data.player2
          : this.players_data.player1;

      this.current_player = activate_player;

      $(".player_tour").each(function () {
        $(this).toggleClass("disable_tour");
      });
      seconds = NBR_SECONDS;
    } //*/
  };
  /**
   * cette fonction va utiliser setInteval pour appele la fonction switch_player chaue seconde
   * interval_switcher()
   */
  let interval_switcher = () => {
    switcher = setInterval(function () {
      switch_player();
    }, 1000);
  };
  /**
   * cette fonction va remettre le timer a zero
   * reset_switcher permet de remet le timer a zero
   */
  let reset_switcher = () => {
    clearInterval(switcher);
    seconds = 0;
    interval_switcher();
  };

  /**
   * play: cette fonction lance le jeu une fois que les players et tous les infos sont en place
   */
  this.play = () => {
    interval_switcher();
    pressed();
  };
  /**
   * cette fonction s'execute quand on appui sur une des touches fleche
   */
  let pressed = () => {
    $(document).on("keydown", function (e) {
      if ([37, 38, 39, 40].includes(e.which)) {
        //si le l'id de la touche fait partie des touches fleches
        move(e.which);
      }
    }); //End on keydown
  };
  /**
   * On verifie si la case est libre
   * @param {*} x
   * @param {*} y
   */
  let is_box_accessible = (x, y) => {
    //Si les coordonne ne sont pas dans les donne tu plateau on retourne false
    if (undefined === this.board[y][x]) {
      return false;
    }
    if (this.board[y][x] === WALL_BOX) {
      //S'il ya un mur dans la cellule
      return false;
    }
    if (this.board[y][x] === PLAYER_BOX) {
      //Sil y a un joueur dans le box
      return false;
    }
    //Si aucun des cas n'est verifie on retour true la case est accesible
    return true;
  };

  /**
   *
   * move gere dans quel direction le joueur va se deplacer
   * @param {*} direction
   */
  let move = (direction) => {
    let [x, y] = this.current_player.position; //on recupere les coordonnees du joueur qui a la main
    //On copie ces corrdonnees dans deux autre variable
    //En fonction de la direction nous allons updater la new_x et new_y puis passer cela vers a la fonction move_current_player qui va faire se deplacer le joueur
    let new_x = x;
    let new_y = y;
    switch (direction) {
      case 37: //on bouge a gauche
        new_x = x - 1; //On fait moins un a x pour allez ves la gauche
        if (is_box_accessible(new_x, y)) {
          move_current_player(new_x, y);
        }
        break;
      case 39: //on bouge a droite
        new_x = x + 1; //On fait + 1 pour bouger a droite
        if (is_box_accessible(new_x, y)) {
          move_current_player(new_x, y);
        }
        break;
      case 38: //on bouge en haut
        new_y = y - 1; //On fait -1 a u pour aller vers le haut
        if (is_box_accessible(x, new_y)) {
          move_current_player(x, new_y);
        }
        break;
      case 40: //on bouge en haut
        new_y = y + 1; //On fait +1 sur y pour aller vers le bas
        if (is_box_accessible(x, new_y)) {
          move_current_player(x, new_y);
        }
        break;
      default:
        break;
    }
  };
  /**
   *Cette fonction gere le deplacement des joueurs
   * @param {integer} x coordonnee x
   * @param {integer} y coordonne y
   */
  let move_current_player = (x, y) => {
    NBR_MOVEMENTS--; //Ondecremente le nbr de movement
    if (NBR_MOVEMENTS < 0) return false;

    let class_name = this.current_player.id;
    let [current_x, current_y] = this.current_player.position;

    $(`#${current_x}-${current_y}`).removeClass(class_name);
    $(`#${x}-${y}`).addClass(class_name);

    this.board[current_y][current_x] = EMPTY_BOX;
    //Si la cellule ou le joueur veut se deplacer contien une arme il prend l'arme
    if ($(`#${x}-${y}`).hasClass("weapon")) {
      let power = take_weapon(x, y);
    }
    this.board[y][x] = PLAYER_BOX;

    this.current_player.position = [x, y];

    //on appelle la fonction qui va verifie si on peut debuter le combat
    if (start_fight()) {
      $(`#choix-player1,#choix-player2`).addClass("active");
      display_players_choix(this.current_player); //On fait appel a la fonction qui va afficher les boutons attaque/defense
    } else {
      $(`#choix-player1,#choix-player2`).removeClass("active");
    }
  };
  /**
   * permet au player de prendre l'arme dans la cellule et d'y deposer son arme
   * @param {*} x
   * @param {*} y
   */
  let take_weapon = (x, y) => {
    //On recupere l'attribut data-power de la cellule ou se trouve l'arme
    let new_power = $(`#${x}-${y}`).attr("data-power");
    //console.log(new_power, x, y, this.current_player.weapon_power);
    //On recupere le pouvoir de l'arme actuel du player
    if (new_power === undefined) return false;

    //L'arme actuel du player sera deposer sur la cellulle
    let player_current_power = this.current_player.weapon_power;
    let player_class_name = this.current_player.id;
    //En fonction de la valeur de la classe on aura 1 ou 2
    let player_integer = player_class_name === "player1" ? 1 : 2;

    //On depose l'arme actuel du player dans la case
    $(`#${x}-${y}`).attr("data-power", player_current_power);
    $(`#${x}-${y}`).attr(
      "class",
      `box weapon weapon${player_current_power} ${player_class_name}`
    );
    //On met a jour l'image de l'arme du player
    $(`#arme-player${player_integer}`).html(
      `<img src="assets/icons/${new_power}.png" > ${new_power}`
    );
    //on change l'arme du player
    this.current_player.weapon_power = new_power;
    console.log(this.current_player.weapon_power);
  };

  let can_start_fight = () => {
    console.log("Hello baby");
    let xs = [],
      ys = []; //Nous creons deux array ou nous allons enregistrer les coordonnees x et y de chaque joueurs
    let players = this.players_data;
    for (let i = 1; i <= 2; i++) {
      if (xs.includes(players[`player${i}`].position[0])) {
        console.log("I get x");
      } else {
        xs.push(players[`player${i}`].position[0]);
      }

      if (ys.includes(players[`player${i}`].position[1])) {
        console.log("I get y");
      } else {
        ys.push(players[`player${i}`].position[1]);
      }
    }
  };

  /**
   * permet de verifier si les joueurs sont sur la meme ligne ou collonne pour afficher les boutton attaque et defense
   */
  let start_fight = () => {
    let player1 = this.players_data[`player1`]["position"];
    let player2 = this.players_data[`player2`]["position"];
    console.log("players position", player1, player2);
    if (player1[0] === player2[0] || player1[1] === player2[1]) {
      return true;
    }
    return false;
  };
  /**
   * affiche les bouttons attaque et defense
   */
  let display_players_choix = () => {
    $(`#choix-player1,#choix-player2`).addClass("active");
  };
  /**
   * permet de lancer une attaque
   * @param {*} attacker
   * @param {*} target
   */
  this.attack = (attacker, target) => {
    //On recupere les data du player qui attaque
    let attacker_data = this.players_data[`player${attacker}`];
    //On recupere les data du player cible
    let target_data = this.players_data[`player${target}`];
    //On multipli l'arme actuel du player par 10 sauf pour l'arme par defaut
    let weapon_power =
      attacker_data.weapon_power <= 0 ? 1 : attacker_data.weapon_power * 10;
    //avant d'attaquer on verifie si la cible n'a pas activer sa defense
    let power_attack = target_data.defense ? weapon_power - 5 : weapon_power;

    //On diminue le nbr point si le pouvoir d'attaque n'est pas inferieur a zero
    target_data.nbr_points =
      power_attack < 0
        ? target_data.nbr_points
        : target_data.nbr_points - power_attack;
    //On appelle la fonction qui va mettre a jour le text nbr points
    update_player_nbrpoints(target, target_data.nbr_points);
    if (target_data.nbr_points <= 0) end_game(attacker_data);
    else reset_switcher();
  };

  /**
   *On met fin a la partie
   * @param {Object} player the data of the player who win the game
   */
  let end_game = (player) => {
    clearInterval(switcher); //On arrete le timer
    let player_id = player.id;
    let player_name = $(`#title-${player_id}`).html();
    $(`#instructions`).html(`${player_name} vous avez gagné!!!`);
  };
  /**
   * Permet d'activer la defense du player
   * @param {*} player
   */
  this.defense = (player) => {
    this.players_data[`player${player}`].defense = true;
  };
  /**
   * permet de mettre a jour le point du joueur
   * @param {*} player
   * @param {*} points
   */
  let update_player_nbrpoints = (player, points) => {
    $(`#vie-player${player}`).html(`Nbr Points: ${points}`);
  };

  /**
   * init_walls: va placer alleatoirement les murs
   */
  let init_walls = () => {
    const nbrWalls = get_random(10, 20);

    for (let i = 0; i < nbrWalls; i++) {
      let x, y;
      do {
        x = get_random(0, horizontal - 1);
        y = get_random(0, vertical - 1);
      } while (board[y][x] !== EMPTY_BOX);
      board[y][x] = WALL_BOX;
      $(`#${x}-${y}`).addClass("wall");
    }
  };

  /**
   * init_walls: va placer alleatoirement les armes
   */
  let init_weapons = () => {
    const nbr_weapons = get_random(3, 4);
    //nbr_weapons = 4;
    for (let i = 1; i <= 4; i++) {
      let x, y;
      do {
        x = get_random(0, horizontal - 1);
        y = get_random(0, vertical - 1);
      } while (board[y][x] !== EMPTY_BOX);
      board[y][x] = WEAPON_BOX;
      $(`#${x}-${y}`).addClass("weapon weapon" + i);
      $(`#${x}-${y}`).attr("data-power", i);
    }
  };

  /**
   * init_walls: va initialiser les joueurs
   */
  let init_players = () => {
    for (let i = 1; i <= NBR_PLAYERS; i++) {
      //On parcour le nbr de joueurs
      let x, y;
      do {
        x = get_random(0, horizontal - 1);
        y = get_random(0, vertical - 1);
      } while (board[y][x] !== EMPTY_BOX);
      board[y][x] = PLAYER_BOX;
      $(`#${x}-${y}`).addClass("player" + i);
      //On enregistre les data du player  dans l'objet players_data
      players_data["player" + i] = {
        id: `player${i}`,
        name: "",
        position: [x, y],
        weapon_power: 0,
        nbr_points: 100,
        defense: false,
      };
    } //End for loop
  };
};
