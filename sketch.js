//GameStates
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var ground, groundImage;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime;
var score;
var back, backImg;

function preload(){
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
 bananaImage = loadImage("banana.png");
 obstacleImage = loadImage("obstacle.png");
 backImg = loadImage("jungle.jpg") 

}
function setup() {
createCanvas(600,400)
    //the background
  back = createSprite(300,200,600,400);
  back.scale = 3;
  back.addImage("background", backImg);
  
  //creatig the monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;

  //the ground
  ground = createSprite(400,350,900,10);
  ground.x = ground.width/2;
  ground.velocityX = -4;
  console.log(ground.x);
  ground.visible = false;

  
    //Groups
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  //Score
  survivalTime = 0;
  score = 0;
}


function draw() {
  
  background("skyblue");
  
//Monkey
  monkey.collide(ground);
  
//gameState
  if(gameState === PLAY){
    monkey.changeAnimation("running", monkey_running);
    
    //jump when the space key is pressed
    if(keyDown("space")) {
        monkey.velocityY = -12;
    }
   
   //Gravity
   monkey.velocityY = monkey.velocityY + 0.8;
    
   //Adding the score    
    if(FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score = score+2;
    }
   
   //the infinite effect
    if (ground.x < 0){
      ground.x = ground.width/2;
    }  
  //Adding Functions
   food();
   obstacles();
  
  if(obstacleGroup.collide(monkey)){
       monkey.scale = 0.1;
       gameState = END;
    }
     
  }
    //END
   if (gameState === END) {
    FoodGroup.destroyEach();
    survivalTime.visible = false;
    obstacleGroup.setVelocityXEach = -0;
    obstacleGroup.setLifetimeEach = -1;
    ground.velocityX = 0;
    monkey.scale = 0.1;
     


     //GAMEOVER
     stroke("red");
     fill("red");
     textSize(30);
     text("Game Over", 110, 200);


     //MONKEY DEAD     
     stroke("black");
     fill("black");
     textSize(30);
     text("Monkey is dead", 100, 240);
   }
  drawSprites();
  
  //displaying survivaltime
  stroke("white");
  fill("white");
  textSize(20);
  text("Survival Time:"+  survivalTime, 200, 50);
  survivalTime = Math.ceil(frameCount/frameRate())
  
//displaying score
  stroke("white");
  fill("white");
  textSize(20);
  text("Score:"+  score, 500, 50);  
  switch(score){
   case 10: monkey.scale = 0.12
            break;
   case 20: monkey.scale = 0.14
            break; 
   case 30: monkey.scale = 0.16
            break;  
   case 40: monkey.scale = 0.18
            break;  
   default: break;         
  }

  
}  
function food(){
   if (frameCount % 80 === 0) {
    banana = createSprite(400,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    banana.velocityX = -4;
    banana.lifetime = 200;
    
    FoodGroup.add(banana); 
   }
}  

function obstacles(){
   if (frameCount % 300 === 0){
    obstacle = createSprite(250,325,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -5;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1 ;
    obstacleGroup.add(obstacle);
  }
}
  
  



