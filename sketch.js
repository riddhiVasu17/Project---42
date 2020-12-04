//store matter parts
const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

//create variables
var thun, thun1, thun2, thun3, thun4;
var textimg;
var thunder;

var engine, world;
var maxDrops = 150;
var drops = [];
var rand;
var thunderCreatedFrame = 0;

//Load Images Here
function preload(){
    back_img = loadImage("bg11.png");
    thun1 = loadImage("thunderbolt/1.png");
    thun2 = loadImage("thunderbolt/2.png");
    thun3 = loadImage("thunderbolt/3.png");
    thun4 = loadImage("thunderbolt/4.png");
    textimg = loadImage("text.png");

    thunder = loadSound("thunder.mp3");

}


function setup(){
    //create canvas
    var canvas = createCanvas(displayWidth, displayHeight-111);
    
    //create engine and world
    engine = Engine.create();
    world = engine.world;
    
    //new umbrella
    umbrella = new Umbrella(400,450);

    //to create drops
    if(frameCount % 150 === 0){

        for(var i=0; i<maxDrops; i++){
            drops.push(new Drop(random(10,1500), random(0,400)));
        }

    }

}


function draw(){

    //background image
    background(back_img);

    //update engine
    Engine.update(engine);

    //image for Animated BATMAN BEGINS
    image(textimg, 1100, 50);

    //button for sound on
    button = createButton("Sound On");
    button.style('border-radius', '10px');
    button.style('border', '10px')
    button.style('font-family', 'Verdana');
    button.style('font-size', '18px')
    button.size(150, 30);
    button.position(30, 700)

      //display thunderstorm
      rand = Math.round(random(1,4));
      if(frameCount%80===0){
          thunderCreatedFrame=frameCount;
          thun = createSprite(random(30,1000), random(10,30), 10, 10);

          thunder.play();
          switch(rand){
              case 1: thun.addImage(thun1);
              break;
              case 2: thun.addImage(thun2);
              break; 
              case 3: thun.addImage(thun3);
              break;
              case 4: thun.addImage(thun4);
              break;
              default: break;
          }
          thun.scale = random(0.3,0.6)
      }
  
      //destroy it
      if(thunderCreatedFrame + 10 ===frameCount && thun){
          thun.destroy();
      }

      //display umbrella
      umbrella.display();

      //displaying rain drops
      for(var i = 0; i<maxDrops; i++){

          drops[i].showDrop();
          drops[i].updateY();
          
      }

      //to display created sprites
      drawSprites();
}   



