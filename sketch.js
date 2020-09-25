//Create variables here
var dog,happyDog,database;
var foodS,foodStock;
var dogimg,hdogimg;


function preload()
{
  //load images here
  dogimg=loadImage("dogImg.png")
  happydogimg=loadImage("dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  dog=createSprite(250,250,10,10);
  dog.addImage(dogimg,0,0,1,1);
  dogimg.resize(width/3,height/3)

  database=firebase.database();
  foodStock=database.ref('food');
  foodStock.on("value",readstock);
 
  
}


function draw() {
  background(46,139,87)  


  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happydogimg)
    happydogimg.resize(width/3,height/3)
  }

  drawSprites();
  //add styles here
  textSize(20);
  fill("white");
  stroke(3);
  text("Note:Press UP_ARROW Key To Feed Drago Milk!",40,50);
  
  text ("Food Remaning:"+foodS,150,450)
}

function readstock(data){
  foodS=data.val();
}

function writeStock(x){
   
   if(x<=0){
     x=0;
   }
   else{
     x=x-1;
   }


  database.ref('/').update({
    food:x
  })
}

