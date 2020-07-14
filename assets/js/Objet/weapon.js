//class Weapon {

    //constructor(title, strength, pages) {
       // this.title = title;
      //  this.strength = strength;
      //  this.pages = pages;
   // }
//}


// Constructeur de l'objet arme 
//function Weapon (id, name, force){
   // this.id = id;       // id de l'arme
   // this.name = name;   // nom de l'arme
	//this.force = force; // Force de l'arme
//}
// Instances d'arme
//let fourchette = new Weapon(0, "fourchette", 10),
 //   couteau = new Weapon(1, "couteau", 20),
 //   pistolet = new Weapon(2, "pistolet", 30),
 //   bazooka = new Weapon(3, "bazooka", 40);


initWeapon() {
    const nbWeapon = getRandom(1, 4);

    for (let i = 0; i < nbWeapon; i++) {
        let x, y;

        do {
            x = getRandom(0, this.horizontal - 1, );
            y = getRandom(0, this.vertical - 1);
        } while (Board[y][x] !== Box.EMPTY);
		
        const idWeapon = getRandom(1, 4);
   switch (idWeapon){
	   case 1:
		   Board[y][x] = Box.WEAPON1;
		   break;
	   case 2:
		   Board[y][x] = Box.WEAPON2;
		   break;
	   case 3:
		   Board[y][x] = Box.WEAPON3;
		   break;
	   case 4:
		   Board[y][x] = Box.WEAPON4;
		   break;
	  
	   default:
                    console.error('This value doesn\'t exist');
                    break;
				 }
    }
		
}
