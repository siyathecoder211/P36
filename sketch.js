var dog, sitDog, happyDog;
var food, foodStock;
var database;

function preload() {
  
  sitDog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  
  dog = createSprite(250,250,50,50);
  dog.addImage(sitDog);
  dog.scale = 0.25;

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);
  
  if (keyWentDown(UP_ARROW)) {

    writeStock(food);
    dog.addImage(happyDog);
  }
  
  drawSprites();

  fill(255);
  stroke(255);
  text("Note: Press Up Arrow to Feed Drago Milk", 140, 50);
}

function readStock(data) {

  food = data.val();
}

function writeStock(x) {

  if (x<=0) {
    x=0;
  } else {
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}