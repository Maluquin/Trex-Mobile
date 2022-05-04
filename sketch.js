var trex, trexCorredor, trexMorreu;
var edges;
var chao, chaoImagem, chaoInvisivel;
var nuvem, nuvemImagem;
var obstaculo;
var obstaculoImg1, obstaculoImg2, obstaculoImg3, obstaculoImg4, obstaculoImg5, obstaculoImg6;
var gameOver, restart;
var gameOverImg, restartImg
var somPonto, somMorte, somPulo; 
var pontos = 0;
var grupoObstaculos 
var grupoNuvens;
var jogar = 1;
var fim = 0;
var estadoJogo = jogar;



function preload(){  
 trexCorredor = loadAnimation("img/trex1.png","img/trex2.png","img/trex3.png");
 trexMorreu = loadAnimation("img/trex_collided.png");
 chaoImagem = loadImage("img/ground2.png");
 nuvemImagem = loadImage("img/cloud.png"); 
 obstaculoImg1 = loadImage("img/obstacle1.png");
 obstaculoImg2 = loadImage("img/obstacle2.png");
 obstaculoImg3 = loadImage("img/obstacle3.png");
 obstaculoImg4 = loadImage("img/obstacle4.png");
 obstaculoImg5 = loadImage("img/obstacle5.png");
 obstaculoImg6 = loadImage("img/obstacle6.png");
 gameOverImg = loadImage("img/gameOver.png");
 restartImg = loadImage("img/restart.png");
 somPonto = loadSound("som/checkPoint.mp3");
 somMorte = loadSound("som/die.mp3");
 somPulo = loadSound("som/jump.mp3");
}

function setup(){
  createCanvas(windowWidth,windowHeight);

  trex = createSprite(50,175,40,50);
  trex.addAnimation("trexMexendo",trexCorredor);
  trex.addAnimation("trexMorrendo",trexMorreu);

  trex.scale = 0.5;
  
  chao = createSprite(300,height - 15,600,10);
  chao.addImage(chaoImagem);
  chaoInvisivel = createSprite(300,height - 13,600,5);
  chaoInvisivel.visible = false;

  gameOver = createSprite(width/2, height/4);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  restart = createSprite(width/2, height/4 + 50);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;

  grupoObstaculos = new Group();
  grupoNuvens = new Group();

  trex.debug = false;
  //trex.setCollider("rectangle", 0, 0, 150, 80);
  trex.setCollider("circle", 0, 0, 30);

}

function draw(){
  background("white")
  text ("Pontuação:" + pontos, width - 100, 30);

  

  if (estadoJogo === jogar){
    if (touches.lenght > 0 && trex.y > height - 50){
      trex.velocityY = -10;
      somPulo.play();
      touches = [];
    }

    if(pontos % 100 === 0 && pontos > 0){
      somPonto.play();
    }

  
    chao.velocityX = -(5 + 3* pontos/100);

    grupoObstaculos.setVelocityXEach (-(5 + 3* pontos/100));

    if (chao.x <0){
      chao.x = chao.width/2;
    }

    if (trex.isTouching (grupoObstaculos)){
      somMorte.play();
      //trex.velocityY = -10;
      //somPulo.play();
      estadoJogo = fim;
      
      
    }
    pontos += Math.round (frameRate()/ 60);
    
    criarNuvem();

    criarCactos();
  
  
  }
  else if (estadoJogo === fim){
    chao.velocityX = 0;

    trex.changeAnimation("trexMorrendo")

    grupoObstaculos.setVelocityXEach (0);
    grupoNuvens.setVelocityXEach (0);

    grupoObstaculos.setLifetimeEach (-1);
    grupoNuvens.setLifetimeEach(-1);

    gameOver.visible = true;
    restart.visible = true;

    if(touches.lenght > 0){
      console.log("Batata");
      reset();
      touches = [];
    }
  }

  trex.velocityY += 0.5;

  trex.collide(chaoInvisivel);


  drawSprites();

}

function criarNuvem(){
  if (frameCount % 80 ===0){
   nuvem = createSprite(width, 30,40,10);
   nuvem.velocityX = -5;
   nuvem.addImage(nuvemImagem)
   nuvem.scale = 0.9
   nuvem.y = Math.round (random(height - 150, height - 100));

  trex.depth = nuvem.depth;
  trex.depth += 1;

  restart.depth = nuvem.depth;
  restart.depth += 1;

  gameOver.depth = nuvem.depth;
  gameOver.depth += 1;
  
  nuvem.lifetime = width/5;
  grupoNuvens.add(nuvem);
  }
  
}

function criarCactos(){
  if (frameCount % 70 === 0){
   obstaculo = createSprite(width,height - 30,40,60);
   obstaculo.scale = 0.6;
   grupoObstaculos.add(obstaculo);
   var aleatoria = Math.round (random(1,6));
   switch (aleatoria) {
     case 1:
       obstaculo.addImage (obstaculoImg1);
       break;
     case 2:
      obstaculo.addImage (obstaculoImg2);
       break;
     case 3:
        obstaculo.addImage (obstaculoImg3);
       break;
      case 4:
        obstaculo.addImage (obstaculoImg4);
       break;
      case 5:
        obstaculo.addImage (obstaculoImg5);
       break;
      case 6:
        obstaculo.addImage (obstaculoImg6);
       break;

       default:
         break;
     
   }
   obstaculo.lifetime = width/5;
  }
}

function reset(){

  estadoJogo = jogar; 

  restart.visible = false;
  gameOver.visible = false;

  trex.changeAnimation("trexMexendo")

  pontos = 0;

  grupoObstaculos.destroyEach();
  grupoNuvens.destroyEach();

}