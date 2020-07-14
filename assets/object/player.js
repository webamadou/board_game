export const Player = (id, name, position, nbr_points, weapon) => {
  this.id = "player" + id; // player + id -> player1 ou player2
  this.name = name; // Nom du joueur
  this.position = position;
  this.nbr_points = nbr_points; // Santé du joueur
  this.weapon = weapon; // Objet contenant les armes
};
//let player1 = new Player(1, "Player1", 100),
//    player2 = new Player(2, "Player2", 100);
