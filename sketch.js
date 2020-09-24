var player,computer,ball;
var hitsounnd,wallhitsound,scoresound;
var edges,ps,cs,gamestate;

function preload()
{
  hitsound=loadSound("hit.mp3");
  wallhitsound=loadSound("wall_hit.mp3");
  scoresound=loadSound("score.mp3");  
  
}


function setup()
{
  createCanvas(400,400);
  player=createSprite(390,200,10,80);
  computer=createSprite(10,200,10,80);
  ball=createSprite(200,200,10,10);
  edges=createEdgeSprites();
  ps=0;
  cs=0;
  gamestate="serve";
  
  
  
}

function draw()
{
  background("white");
  player.y=mouseY;
  computer.y=ball.y;
  
  for(var i=0;i<400;i=i+20)
  {
    line(200,i,200,i+10);
  }
  textSize(20);
  text(ps,280,50);
  text(cs,80,50);
  if(gamestate==="serve")
  {
   text("press space to serve",130,190);
       
  }
  if(gamestate==="over")
  {
   text("Game Over",180,80);
    text("Press 'r' to restart the Game",80,160);
      
  }
  if(keyDown("r"))
  {
   gamestate="serve";
    ps=0;
    cs=0;   
    
  }
  if(keyDown("space") && gamestate==="serve")
  {
    ball.velocityX=5;
    ball.velocityY=6;
    gamestate="play";
  }
    
  if(ball.x<0 || ball.x>400)
  {
    if(ball.x>400)
    {
     cs=cs+1;    
      
    }
    if(ball.x<0)
    {
      ps=ps+1;
    }
    scoresound.play();
    ball.x=200;
    ball.y=200;
    ball.velocityX=0;
    ball.velocityY=0;
    gamestate="serve";
       
  }
  
 if(ball.isTouching(edges[2]) || ball.isTouching(edges[3]))
  {
   
   ball.bounceOff(edges[2]);
    ball.bounceOff(edges[3]);
     wallhitsound.play();
    
  }
  if(ball.isTouching(player))
  {
    ball.x=ball.x - 6;
    ball.velocityX=-ball.velocityX;
    hitsound.play();
    
    
  }
   if(ball.isTouching(computer))
  {
    ball.x=ball.x + 6;
    ball.velocityX=-ball.velocityX;
    hitsound.play();
    
    
  }
  
  if(ps===5 || cs===5)
  {
    gamestate="over";
   
  }
  drawSprites();
}