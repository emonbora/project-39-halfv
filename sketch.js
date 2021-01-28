var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score, jungleImage
var bg, gameState = 0, start, startImage


function preload(){
  
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  jungleImage = loadImage("jungle.jpg")
 
}



function setup() {
  
  
  createCanvas(800, 400);
   bg = createSprite(0,0,800,400)
  bg.addImage(jungleImage)
  bg.scale = 1.5
  bg.x = bg.width/2
  bg.velocityX = -4
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1
  
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible = false
  console.log(ground.x)
  score = 0
  bananaGroup = new Group()
  obstacleGroup = new Group()
  
 
  
}


function draw() {



  background("white");
 // console.log(monkey.y)

  if(gameState === 0){
    background("blue")
    textSize(13)
    stroke("black")
    text ("Pacman in Adventure", 100,20)
    text("controls : move left, right, up, down using arrow keys", 50, 50)
    start = createSprite(200,200)
    start.addImage(startImage)
    start.scale = 0.5

    if(mousePressedOver (start)){
        gameState = 1
        console.log("hello")

    }
 }
 else if (gameState ===1 ){
  if(keyDown("space")&&monkey.y>=235){
    monkey.velocityY = -12;
  }
  
  monkey.velocityY = monkey.velocityY+ 0.8
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  if(bg.x<100){
    bg.x = bg.width/2
  }
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    score = score+2
  }
  spawnBanana();
  spawnObstacle()
 
  
  monkey.collide(ground);
  drawSprites();
   if(obstacleGroup.isTouching(monkey)){
    ground.velocityX = 0
    monkey.velocityY = 0
    bg.velocityX = 0
    obstacleGroup.setVelocityXEach(0)
    bananaGroup.setVelocityXEach(0)
    console.log(banana.velocityX)
    obstacleGroup.setLifetimeEach(-1)
    bananaGroup.setLifetimeEach(-1)
  }
  //score = Math.ceil(frameCount/frameRate())
  text("score : "+score,100,50)
  function spawnBanana(){
    if(frameCount % 80 === 0){
      banana = createSprite(600,250,40,10);
      banana.y = Math.round(random(120, 200));
      banana.addImage(bananaImage);
      banana.scale = 0.1;
      banana.velocityX = -3;
      bananaGroup.add(banana)
      banana.lifetime = 300
    } 
   }
   function spawnObstacle(){
     if(frameCount % 300 ===0){
       obstacle = createSprite(800,320,10,40);
       obstacle.addImage(obstacleImage);
       obstacle.scale = 0.2;
       obstacle.velocityX=-3;
       obstacleGroup.add(obstacle)
       obstacle.lifetime = 300
     }
   }

  }
 }
 







