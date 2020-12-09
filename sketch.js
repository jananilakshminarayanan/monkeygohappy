
var monkey , monkey_running, monkey_stop;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score,ground1,ground2;
var sur =0;
var START = 1;
var STOP =0;
var gameState = START;
var score = 0;
var restart;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_stop = loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,500);
  
  
  ground1 = createSprite(600,450,600,10);
  ground1.x = ground1.width /2;
  ground2 = createSprite(1200,450,600,10);
  ground2.x = ground2.width /2;
  
  monkey = createSprite(100,400,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("stop",monkey_stop);
  monkey.scale = 0.2;
  
  obstacleGroup = new Group();
  FoodGroup = new Group();
  
  restart = createSprite(300,300,25,25);
  restart.shapeColor = "brown";
  restart.visible = false;
   

  
}


function draw() {
  background("lightgreen");
  
  fill("brown");
  textStyle(BOLD);
  textSize(15);
  text("score: "+score+" bananas",50,50);
  text("survival time: "+sur+" s",50,75);
  
  if(gameState === START){
  
  ground1.velocityX = -4;
  ground2.velocityX = -4;
  if (ground1.x < 0){
      ground1.x = ground1.width/2;
    }
  if (ground2.x < 600){
      ground2.x = ground2.width/2;
    }
  
  sur = sur + Math.round(getFrameRate()/30);
  monkey.velocityY = monkey.velocityY + 0.8
  
  
  if(keyDown("space")&& monkey.y >= 250) {
        monkey.velocityY = -12;
        
    }
  
  spawnobstacles();
  
  spawnbanana();
    
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score = score + 1;
  }
  
  if(obstacleGroup.isTouching(monkey)){
    
    gameState = STOP;
    
  }
  }
  else if(gameState === STOP){
    
    fill("brown");
    textStyle(BOLD);
    textSize(30);
    text("GAME OVER!!!",200,200);
    textSize(20);
    text("Press button to restart", 200, 250);
    restart.visible = true;
    
    monkey.changeAnimation("stop",monkey_stop);
      ground1.velocityX = 0;
    ground2.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.destroyEach();
    
    obstacleGroup.setLifetimeEach(-1);
    
    monkey.velocityY = 0;
    
    if(mousePressedOver(restart)){
        reset();
      }
    
    }
  
   monkey.collide(ground1); 
   monkey.collide(ground2);
  
  
  drawSprites();
  
}
function spawnobstacles(){
  if(frameCount%150 === 0){
    obstacle = createSprite(600,425,10,10);
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.2;
    
    
    obstacle.velocityX = -4;
    
    obstacle.lifetime = 150;
    
    obstacleGroup.add(obstacle);
    
    
  }
}
function spawnbanana(){
  if(frameCount%100 === 0){
    banana = createSprite(600,200,10,10);
    banana.y = Math.round(random(100,300));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
  
    banana.velocityX = -4;
    
    banana.lifetime = 150;
    
    FoodGroup.add(banana);
  }
    
  
}
function reset(){
  
  gameState = START;
  restart.visible = false;
  
  monkey.changeAnimation("running",monkey_running);
  
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  
  score = 0;
  sur = 0;
}




