var dog, dogIMG;
var happyDog, happyDogIMG;
var database;
var foodS;
var foodStock;

function preload() {
  dogIMG = loadImage("Dog.png");
  happyDogIMG = loadImage("happydog.png");
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();

  dog = createSprite(250, 250, 20, 20);
  dog.addImage(dogIMG);
  dog.scale = 0.5;

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
}

function draw() {
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)) {
    foodS = foodS + 1;
    writeStock(foodS);
    dog.addImage(happyDogIMG);
  }

  drawSprites();

  textSize(30);
  fill(255);
  stroke(0);
  text(" Press UP_ARROW Key to Feed Drago Milk!", 100, 300);
}

function readStock(data) {
  foodS = data.val();
  console.log(foodS.x);
}

function writeStock(x) {
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }

  database.ref("/").update({
    Food: x,
  });
}
