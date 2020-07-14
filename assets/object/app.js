import { Player } from "./player.js";
import { Card } from "./Card.js";

let card1 = new Card(); //On initialise la class Card

//On appele la method display_board qui se charge d'afficher le plateeau et ses elements
let card = card1.display_board();
//On recupere le nombre de joueurs definit dans la class Card
let nbr_players = card1.nbr_players;
let names = [];

//Nous allons maintenant parcourir le nbr_player. Et pour chaque player nous allons avoir une action qui va se declanche quand quand le joueur entre un nom
for (let i = 1; i <= nbr_players; i++) {
  $("#buttonname" + i).on("click", function () {
    let name_field = $("#name" + i);
    if (name_field.val().length === 0) {
      // Si le joueur n'a pas entré son pseudo
      name_field.css({ border: "1px solid red" });
      $("#pname" + i)
        .text("Entrez votre nom !")
        .css({
          color: "red",
          "font-weight": "bold",
        });
    } else {
      names.push(name_field.val());
      $("#pname" + i).hide();
      $("#title-player" + i).replaceWith(
        "<span id='title-player" + i + "'>" + name_field.val() + "</span>"
      ); // Remplace player 1 par le nom du joueur

      $("#arme-player" + i).html('Arme: <img src="assets/icons/0.png" >');
      $("#vie-player" + i).html("Nbr Points: 100");

      name_field.hide("slow"); // Efface les input
      name_field.val(""); // Remets l'input à "zéro"
    }

    //Si tous les joueurs ont choisi un nom on affiche le pile ou face
    if (names.length == nbr_players) {
      $("#instructions").html(
        'Qui commence ? <button class="pf" id="pile">Pile</button> ou <button class="pf" id="face">Face</button>'
      );
    }
  });
}

//On definit les actions qui vont suivre quand on choisit pile ou face
$("#instructions").on("click", ".pf", function () {
  let pouf = $(this).attr("id"); // Récupère le texte du bouton cliqué : soit pile soit face
  let gagnant_pile_face = card1.qui_commence(pouf);
  console.log(gagnant_pile_face);
  $(".player_tour").each(function () {
    if ($(this).attr("id") !== "div-player" + gagnant_pile_face) {
      $(this).addClass("disable_tour");
    }
  });
  //currentPlayer = "player" + $("#name2").val();
  card1.current_player = card1.players_data["player" + gagnant_pile_face];
  $("#instructions").html(
    "Utilisez les flèches du clavier pour déplacer les players</br><u>3 déplacements possibles</u>"
  );
  card1.play(); //On appel la fonction play qui va gerer les actions du joueur
});

//Quand un joueur lance une attaque
$(".attaquer").click(function () {
  let get_player = parseInt($(this).data("player"));
  let target_player = get_player === 1 ? 2 : 1;

  card1.attack(get_player, target_player);
});

//L'action qui va activer la defense du player
$(".defense").click(function () {
  let get_player = parseInt($(this).data("player"));

  card1.defense(get_player);
});
