//var player1 = {},
//   player2 = {},
//  currentPlayer = {};

// Récupère le nom des joueurs dans les input, teste si le champ est bien rempli et affiche les players
$(function () {
  $("#buttonname1").on("click", function () {
    if ($("#name1").val().length !== 0) {
      // verification de saisie de valeur

      $("#title-player1").replaceWith(
        "<span id='title-player1'>" + $("#name1").val() + "</span>"
      ); // Remplace player 1 par le nom du joueur entrée
      $("#divname-player1").hide("3000"); // Efface les input
      $("#name1").val(""); // Remets l'input à "zéro"
      quiCommence();
    } else {
      $("#name1").css("border", "1px solid blue");
      $("#pname1").text("Entrez votre nom !").css({
        color: "blue",
        "font-weight": "bold",
      });
    }
  });

  $("#buttonname2").on("click", function () {
    if (
      $("#name2").val().length === 0 ||
      $("#title-player1").text() === $("#name2").val()
    ) {
      // Si le joueur 2 n'a pas entré son pseudo ou si c'est le même que le joueur 1
      $("#name2").css("border", "1px solid red");
      $("#pname2").text("Entrez votre nom !").css({
        color: "red",
        "font-weight": "bold",
      });
    } else {
      $("#title-player2").replaceWith(
        "<span id='title-player2'>" + $("#name2").val() + "</span>"
      );
      $("#divname-player2").fadeOut("3000");
      $("#name2").val("");
      quiCommence();
      $("#instructions").html(
        'Qui commence? <button class="pf" id="pile">Pile</button> ou <button class="pf" id="face">Face</button>'
      );
    }
  });
  $("#instructions").on("click", ".pf", function () {
    var choix = $(this).attr("id"); // Récupère le texte du bouton cliqué : soit pile soit face
    quiCommence(choix); // choix : pour Pile OU Face
    $("#instructions").hide("2000"); // Efface les instructions en 2 secondes
    $("#instructions").text(""); // Supprime le code html
    //$("#instructions").fadeIn("2000"); // Supprime le display: none
    $("#instructions").html(
      "Utilisez les flèches du clavier pour déplacer les players</br><u>3 déplacements possibles</u>"
    );
  });
});

/*function quiCommence(pf) {
  // fonction de choix pile ou face
  if (pf === "pile") {
    $("#div-player2").css("opacity", "0.2");
    //currentPlayer = "player" + $('#name2').val();
  } else if (pf === "face") {
    $("#div-player1").css("opacity", "0.2");
    //currentPlayer = "player" + $('#name2').val();
  }
}*/
