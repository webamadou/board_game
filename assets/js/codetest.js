var map = {

    // Fonction avec 2 boucles de création du tableau de 10 lignes x 10 colonnes
    createTab: function () {

        for (var i = 0; i < nbRow; i++) {
            cellule[i] = [];
            var divRowElt = document.createElement("div");
            carte.appendChild(divRowElt);
            divRowElt.classList.add("divTableRow");
            for (var j = 0; j < nbCol; j++) {
                var divColElt = document.createElement("div");
                divRowElt.appendChild(divColElt);
                divColElt.classList.add("divTableCell");
                cellule[i][j] = new Cell(String(i) + "-" + String(j), "vide", i, j, null, null, null, false); // Chaque cellule est un objet
                $('.divTableCell').attr('id', cellule[i][j].id); // Ajoute l'attribut id avec numéro ligne - numéro colonne
                $('.divTableCell').attr('class', cellule[i][j].classe); // Ajoute l'attribut class avec la valeur "vide"
                if (cellule[i][j].isAccess === false) { // Colorie les cases obstacles du plateau
                    ((cellule[i][j]).classe) = "obstacle"; // Modifie l'objet cellule
                    $('#' + cellule[i][j].id).attr('class', cellule[i][j].classe); // Modifie le DOM 
                }
            }
        }
        this.placeWeapon(); //Place les armes sur le tableau
        return cellule;
    },
 
    // Place les joueurs aléatoirement sur la grille
    placePlayer1: function() {
        scanCell();
        cellule[x][y].isAccess = false;
        cellule[x][y].isPlayer = true;
        player1 = new Player(1, cellule[x][y].x, cellule[x][y].y, $('#title-player1').text(), 100, fourchette);
        console.log("le nom du joueur 1 est : " + player1.name);
        $('#' + cellule[x][y].id).append("<img src='assets/img/player1-fourchette.png' alt='player1-fourchette'/>"); // Insère l'image dans le DOM
        $('#arme-' + player1.imgName).text('ARME : ' + player1.weapon.name );
        $('#forcearme-' + player1.imgName).text('FORCE ARME : ' + player1.weapon.force );
        $('#vie-' + player1.imgName).text('VIE : ' + player1.health + ' points' );
    },

    placePlayer2: function () {
        scanCell();
        cellule[x][y].isAccess = false;
        cellule[x][y].isPlayer = true;
        player2 = new Player(2, cellule[x][y].x, cellule[x][y].y, $('#title-player2').text(), 100, fourchette);
        console.log("le nom du joueur 2 est : " + player2.name);
        $('#' + cellule[x][y].id).append("<img src='assets/img/player2-fourchette.png' alt='player2-fourchette'/>"); // Insère l'image dans le DOM
        $('#arme-' + player2.imgName).text('ARME : ' + player2.weapon.name);
        $('#forcearme-' + player2.imgName).text('FORCE ARME : ' + player2.weapon.force );
        $('#vie-' + player2.imgName).text('VIE : ' + player2.health + ' points' );
    },

    // Place les armes alétoirement sur la grille
    placeWeapon: function () {
        scanCell();
        cellule[x][y].isAccess = true;
        cellule[x][y].isPlayer = false;
        cellule[x][y].isWeapon = true;
        cellule[x][y].weapon = couteau;
        $('#' + cellule[x][y].id).append("<img src='assets/img/couteau.png' alt='couteau'/>"); // Insère l'image dans le DOM
        scanCell();
        cellule[x][y].isAccess = true;
        cellule[x][y].isPlayer = false;
        cellule[x][y].isWeapon = true;
        cellule[x][y].weapon = pistolet;
        $('#' + cellule[x][y].id).append("<img src='assets/img/pistolet.png' alt='pistolet'/>"); // Insère l'image dans le DOM
        scanCell();
        cellule[x][y].isAccess = true;
        cellule[x][y].isPlayer = false;
        cellule[x][y].isWeapon = true;
        cellule[x][y].weapon = bazooka;
        $('#' + cellule[x][y].id).append("<img src='assets/img/bazooka.png' alt='bazooka'/>"); // Insère l'image dans le DOM
    },

    quiCommence: function (pf) {
        var lancer = getRandomIntInclusive(0, 10);
        if (pf === "pile" && lancer <= 5) {
            $('#div-player2').css('opacity', '0.2');
            currentPlayer = player1;
            $('#quijoue-' + currentPlayer.imgName).html('À vous de jouer !<br>Il reste 3 coup·s à jouer.');
        } else if (pf === "pile" && lancer > 5) {
            $('#div-player1').css('opacity', '0.2');
            currentPlayer = player2;
            $('#quijoue-' + currentPlayer.imgName).html('À vous de jouer !<br>Il reste 3 coup·s à jouer.');
        } else if (pf === "face" && lancer <= 5) {
            $('#div-player1').css('opacity', '0.2');
            currentPlayer = player2;
            $('#quijoue-' + currentPlayer.imgName).html('À vous de jouer !<br>Il reste 3 coup·s à jouer.');
        } else if (pf === "face" && lancer > 5) {
            $('#div-player2').css('opacity', '0.2');
            currentPlayer = player1;
            $('#quijoue-' + currentPlayer.imgName).html('À vous de jouer !<br>Il reste 3 coup·s à jouer.');
        }
        move.appui(currentPlayer.x, currentPlayer.y, currentPlayer); 
    }
}

// Récupère le nom des joueurs dans les input, teste si le champ est bien rempli et affiche les players
$(function () {
    $('#buttonname1').on("click", function () {
        if ($('#name1').val().length === 0) { // Si le joueur 1 n'a pas entré son pseudo
            $('#name1').css('border', '1px solid red');
            $('#pname1').text('Entrez votre nom !').css({
                'color': 'red',
                'font-weight': 'bold'
            });
        } else {
            $('#title-player1').replaceWith("<span id='title-player1'>" + $('#name1').val() + "</span>"); // Remplace player 1 par le nom du joueur
            $('#divname-player1').fadeOut("3000"); // Efface les input
            $('#name1').val(''); // Remets l'input à "zéro"
            map.placePlayer1();
        }
    });
    $('#buttonname2').on("click", function () {
        if (($('#name2').val().length === 0) || ($('#title-player1').text() === $('#name2').val())) { // Si le joueur 2 n'a pas entré son pseudo ou si c'est le même que le joueur 1
            $('#name2').css('border', '1px solid red');
            $('#pname2').text('Entrez votre nom !').css({
                'color': 'red',
                'font-weight': 'bold'
            });
        } else {
            $('#title-player2').replaceWith("<span id='title-player2'>" + $('#name2').val() + "</span>");
            $('#divname-player2').fadeOut("3000");
            $('#name2').val('');
            map.placePlayer2();
            $('#instructions').html('Qui commence ? <button class="pf" id="pile">Pile</button> ou <button class="pf" id="face">Face</button>');
        }
    });
    $('#instructions').on("click", ".pf", function () {
        var pouf = $(this).attr('id'); // Récupère le texte du bouton cliqué : soit pile soit face
        map.quiCommence(pouf); // pouf : pour Pile OU Face 
        $('#instructions').fadeOut('2000'); // Efface les instructions en 2 secondes
        $('#instructions').text(''); // Supprime le code html
        $('#instructions').fadeIn('2000'); // Supprime le display: none
        $('#instructions').html('Utilisez les flèches du clavier pour déplacer les players</br><u>3 déplacements possibles</u>');
    });    
});

map.createTab();