//Create playground with canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set a background
document.getElementById("start-btn").onclick = () => startGame();
const battleBackground = new Image();
battleBackground.src = "/images/battle-background.jpg";

function setBackground() {
  ctx.drawImage(battleBackground, 0, 0, canvas.width, canvas.height);
}

// Create a Player
class Player {
  constructor() {
    this.x = 20;
    this.y = 400;
    const img = new Image();
    img.addEventListener("load", () => {
      this.img = img;
      // this.draw()
    });
    img.src = "/images/player-stop.png";
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, 80, 80);
  }

  moveRight() {
    this.x += 20;
  }

  moveLeft(){
    this.x -= 20;
  }

  moveUp(){
    this.y -=20;
  }

  moveDown(){
    this.y +=20;
  }
}

const luke = new Player();

// Create obstacles
class Enemie {
  constructor(x){
    this.x = x
    this.y = 20
    this.bulletX=this.x+20
    this.bulletY=this.y
    const imgDroid = new Image();
    imgDroid.addEventListener('load', () => {
      this.imgDroid = imgDroid
      // this.draw()
    });
    imgDroid.src = '/images/droid.png'
  }

  draw() {
    console.log("enemy Drawns")
    ctx.drawImage(this.imgDroid,this.x,this.y,100,100)
  }

  shoot(){
    let bullet = new Image()
    bullet.addEventListener('load', () => {
      this.bullet = bullet
      //this.draw()
    });
    bullet.src = '/images/red-shoot.png'
    ctx.drawImage(this.bullet,this.bulletX,this.bulletY,30,100)

    

  }
}

let droidsArmy = []
let frame = 0

// Enemies shooting
class Shoot {
  constructor(x,y) {
    this.x = x
    this.y = y
    let bullet = new Image()
    bullet.addEventListener('load', () => {
      this.bullet = bullet
    });
    bullet.src = '/images/red-shoot.png'
  }

  draw(){
    ctx.drawImage(this.bullet,this.x,this.y,30,100)
    // console.log("In Draw Shoot")
  }

  update() {
    this.draw()
    this.y += 0.03
  }

}

//  const bulletone = new Shoot(100,100)



// Draw random droids and shoots
function createDroid() {
  //Moving enemies 
  // console.log(" in Create Droid")

  for (let i = 0; i < droidsArmy.length; i++){
    droidsArmy[i].y += 1; // Droids speed
    droidsArmy[i].draw()
    // console.log("In for loop in Create Droid")
    
    //Change this condition to decide which droids get bullets

      if(droidsArmy[i].y > 40) {
         console.log('in shoot conditional')
        droidsArmy[i].shoot()
         droidsArmy[i].bulletY+=5
         
      }
    
  }

  //Creating with timer
  frame += 1
  // console.log(frame)
  if(frame % 250 === 0) { //Here you set how many droids
     droidsArmy.push(new Enemie(Math.floor(Math.random() * canvas.width)))
  }
}

//Add movement to the player
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowRight":
      luke.moveRight();
      break;
    case 'ArrowLeft':
      luke.moveLeft();
      break;
    case 'ArrowUp':
      luke.moveUp();
      break;
    case 'ArrowDown':
      luke.moveDown();
      break;
  }
  updateCanvas();
});

// Start the game
function startGame() {
  const interval = setInterval(updateCanvas,20) // Interval for createDroid()
}

// Update the game
function updateCanvas() {
  ctx.clearRect(0, 0, 500, 500);
  setBackground();
  luke.draw();
  createDroid();


  //startGame();
//  const bulletone = new Shoot(100,100)
//  bulletone.draw()

}

