//declaring variables
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var survivalTime;
var invisibleGround;

function preload(){
  //loading the images
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  //creating different sprites
  monkey=createSprite(80,315,20,20);
monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  invisibleGround=createSprite(200,350,400,10);
  invisibleGround.visible=false;
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();

  
  score=0;
  survivalTime=0;
}

function draw() {
  
background("white");  

  //jumping
  if(keyDown("space")){
  monkey.velocityY=-10;   
  }
  
  //gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  
stroke("black");
  textSize(20);
 fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time : " + survivalTime,100,50);
  
  if(obstacleGroup.isTouching(monkey)){
    monkey.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
     }
  
  if(ground.x<0){
    ground.x=ground.width/2;
     }
  
  spawnFood();
  spawnObstacle();
  
  //making monkey collide with invisibleground and drawing sprites
  monkey.collide(invisibleGround);
  drawSprites();
}
//different functions
function spawnFood() {
if(frameCount % 80 === 0){
banana = createSprite(600,250,40,10);
banana.y=Math.round(random(120,200));
banana.addImage("banana.png",bananaImage);
banana.scale=0.05; 
banana.velocityX=-4;
  
  banana.lifetime=100;

  foodGroup.add(banana);
}
}

function spawnObstacle() {
  if(frameCount % 300 === 0){
  obstacle = createSprite(800,320,10,40);
  obstacle.velocityX=-6;
  var rand=Math.round(random(1,6))
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.15;
  obstacle.lifetime=300;
  
  obstacleGroup.add(obstacle);
  }
}