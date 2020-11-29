    //gamestates 
    var PLAY = 1;
    var END = 0;
    var gameState = 1;

    var sword , swordImg, swordSound;
    var gameoverImg , gameoverSound ;
    var monster, fruit1, fruit2, fruit3, fruit4 ;
    var enemy1 , fruits1, choosefruit , fruitGroup;
    var alien, enemyGroup , fruit, cutfruitSound;
    var score,position;
    var background





function preload(){
     swordImg = loadImage("might.png");

      //loading pictures of fruits
     fruit1 = loadImage("fruit1.png");
     fruit2 = loadImage("fruit2.png");
     fruit3 = loadImage("fruit3.png"); 
     fruit4 = loadImage("fruit4.png");
     cutfruitSound = loadSound("knifeSwooshSound.mp3");

      //loading image and sound for game over
     gameoverImg = loadImage("gameover.png");
     gameoverSound = loadSound("gameover.mp3");

      //loading animation for monster
     alien = loadAnimation("alien1.png","alien2.png");            backgroundImage = loadImage("fire.png")                           
}
function setup() {
  createCanvas(500,500);
  
   backGround = createSprite(250,250,500,500);
   backGround.addImage(backgroundImage)
  
    //creating sprite for sword
    sword = createSprite(250,250,10,10);
    sword.addImage(swordImg);
    sword.scale = 0.7;
  
  
  
  
    //set collider for sword
    sword.setCollider("rectangle",0,0,40,40);

    //creating sprite for game over
    gameOver = createSprite(300,100,10,10);
    gameOver.addImage(gameoverImg);
    gameOver.scale = 0.5;
    gameOver.visible = false;

    score = 0;
  
    enemyGroup = createGroup();
    fruitGroup = createGroup();
  }

  function draw(){
    

    
    

    if(gameState === PLAY){

    //moving sword with the mouse  
    sword.y = World.mouseY ; 
    sword.x = World.mouseX ; 

      textSize (30);
    text("Score: "+ score, 230,50);
      
      textSize (30);
    text("king: "+ score, 230,50);
      
     // callind function of fruits and enemy
    fruits1();
    enemy1();

     //increment the score when sword is touching fruits 
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score = score +2;
      
      //playing sound when fruits are cut
      cutfruitSound.play();
    }  

      if(enemyGroup.isTouching(sword)){
      gameState = END ;
      gameoverSound.play();  
    }  


    } else if (gameState === END){
      //destroying the sprites when gamestate is end
      fruitGroup.destroyEach();
      enemyGroup.destroyEach();
      
      //setting velocity to zero when gamestate is end
      fruitGroup.setVelocityXEach(0);
      enemyGroup.setVelocityXEach(0);

      //change the image of sword to game over
      sword.addImage(gameoverImg);
      sword.x = 250;
      sword.y = 250;
    }

     drawSprites();
 
    text("Score: "+ score, 230,50);
    
  
  }
function fruits1(){
    
    if(World.frameCount % 80 === 0){
     position = Math.round(random(1,2));
      console.log(position);
     fruit = createSprite(400,200,20,20);
     fruit.scale = 0.2;
      if(position ==1){
        fruit.x = 370;
        fruit.velocityX = -(7+(score/4));
        
      }else if (position == 2){
        
      fruit.x = 30;
      fruit.velocityX = (7+(score/4)); 
      }
      
      //fruit.debug = true
      choosefruit = Math.round(random(1,4));
      if(choosefruit ==1){
        fruit.addImage(fruit1);
      } else if (choosefruit == 2){
        fruit.addImage(fruit2);
      } else if (choosefruit == 3){
        fruit.addImage(fruit3);
      } else if (choosefruit == 4){
      fruit.addImage(fruit4);
    }
      
      fruit.y = Math.round(random(50,340));
      fruit.setLifetime=100;
      fruitGroup.add(fruit); 
  }
}


function enemy1(){
   if (frameCount % 100 === 0){
     monster = createSprite(400,200,20,20);
     monster.addAnimation("monsterImg",alien);
     monster.y = Math.round(random(100,300));
     monster.velocityX = -(8+(score/10));
     monster.setLifetime = 50;
     enemyGroup.add(monster);
   } 
       
}