//Create variables here
var dogImg,happyDog
var foodS,foodStock
var database

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database()
  console.log(database)

  dog = createSprite(250,250,20,20)
  dog.addImage(dogImg)
  dog.scale = 0.1
   textSize(20)
  foodStock = database.ref('Food')
  foodStock.on("value",readStock)
  
  
}


function draw() {  
  background(118, 255, 0)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(happyDog)
  }

  drawSprites();
  //add styles here

textSize(13);
fill(138, 21, 234);
noStroke()
text("Note: Press UP_ARROW Key To Feed Drago Milk!", 90,90,300,20);
text("Food remaining to feed dog : "+foodS,160,400);

}

function readStock(data){
  foodS = data.val();
  }
  function writeStock(x){
    if (x <= 0){
      x = 0;
     } else{
      x=x-1;
    }
   
   database.ref('/').update({
    Food:x
  })
  }
