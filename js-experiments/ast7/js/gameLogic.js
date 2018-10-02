
// startGame=()=>{
//     con=document.getElementsByClassName("canvas")[0];
//     var game=new Game(con);
//     game.init();
// }

class Game
{
    constructor(canvas)
    {
        this.canvas=canvas;
        this.context=this.canvas.getContext('2d');

        this.score=0;
        this.dist=400;
        this.pipes=[];
        this.gravity=4;
        this.running=1;
        this.gameSpeed=2;
        this.pipeNorthWidth=52;
        this.pipeSouthWIdth=52;
        this.pipeNorthHeight=242;
        this.pipeSouthHeight=378;
        
        //creating objects
        this.ground=new Ground("images/flappyfg.jpg",this.canvas.height);
        this.player=new Player("images/Birdsprite.png");
        //this.player=new Player("images/player2.png");


        //audio tack setup
        this.die=new Audio();
        this.die.src="audio/die.ogg";
        this.wing=new Audio();
        this.wing.src="audio/wing.ogg";
        this.point=new Audio();
        this.point.src="audio/point.ogg";

        //loading pipes 
        this.pipeNorth=new Image();
        this.pipeNorth.src="images/pipeNorth.png";
        this.pipeSouth=new Image();
        this.pipeSouth.src="images/pipeSouth.png";
        this.gameOver=new Image();
        this.gameOver.src="images/gameover.png";

        //setting up lishner and obstacle
        this.pipes.push(new Pipe(600,0));
        document.addEventListener("keydown",this.moveup.bind(this));
        document.addEventListener("click",this.moveup.bind(this));

    }

   moveup(){
        this.player.moveUp();
        this.wing.play();
   }

  

    
    decrementy(){
        console.log("pring");
    }

    
   
   init(){
       this.background=new Image();
       this.background.src="images/flappyBackground.png";
       this.gameloop()
    };


    gameloop() {
        if(this.running===1)
        {
            this.update();
            this.render();

        }
        else{
            this.clearCanvas();
            this.drawBackground();
            this.context.drawImage(this.gameOver,350,200,300,100);
        }   
        requestAnimationFrame(this.gameloop.bind(this));
    }

    update(){
       this.player.y=this.player.y+this.gravity;
       this.updatePipes();
        this.player.incrementIndex();
    }

    collisionCheck(pipe){
        
            if(this.player.x+this.player.width>pipe.x
                && this.player.x<=pipe.x+this.pipeNorthWidth
                && ( this.player.y<=pipe.y+this.pipeNorthHeight || this.player.y+this.player.height>=pipe.y+this.dist)||
                (this.player.y+this.player.height>=this.canvas.height-this.ground.height)
                )
            {
                this.die.play();
                //location.reload();
                this.running=0;
            }
        
    }

    updatePipes()
    {
        for(let pipe of this.pipes)
        {
            pipe.x=pipe.x-this.gameSpeed;

            if(pipe.x===550)
            {
                this.pipes.push(new Pipe(this.canvas.width,Math.floor(Math.random()*242)-242));
               // this.pipes.push(new Pipe("images/pipeSouth.png"));
                //console.log(this.pipes);
            }

            if(pipe.x===-55)
            {
                this.pipes.shift();
            }
            this.collisionCheck(pipe);
            
            if(pipe.x===100)
            {
                this.point.play();
                this.increaseScore();
            }
            
        }
    }


    increaseScore(){
        this.score++;

    }

    render(){
       this.clearCanvas();

       //draw background
       this.drawBackground();

       //draw Player 
       this.drawPlayer();

       this.drawObstacle();

    //   this.drawForeGround();

       this.drawScore();
      
    }


    drawScore()
    {
        this.context.fillStyle="#000000";
        this.context.font="20px Verdana";
        this.context.fillText(`Score : ${this.score}`,20,30);
    }

    drawForeGround(){
        this.context.drawImage(this.ground.element,this.ground.x,this.ground.y);
    }

    drawObstacle()
    {
        for(let pipe of this.pipes)
        {
            this.context.drawImage(this.pipeNorth,pipe.x,pipe.y);
            this.context.drawImage(this.pipeSouth,pipe.x,pipe.y+this.dist);
        }
        
    }

    drawBackground()
    {
        this.context.drawImage(this.background,0,0);
    }

    drawPlayer()
    {
       // console.log()
       // this.context.drawImage(this.player.element,0,0,768*this.player.index,550,this.player.x,this.player.y,80,80);
       this.context.drawImage(this.player.element,768*this.player.index,0,768,550,this.player.x,this.player.y,this.player.width,this.player.height);
    }

    clearCanvas()
    {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


}


//Player Class
class Player
{
    /**
     * 
     * @param {*} image :the image of the bird to be displayed
     */
    constructor(image)
    {
        this.index=0;
        this.y=0;
        this.x=100;
        this.width=50;
        this.height=50;
        this.jumpVelocity=60;
        this.element=new Image();
        this.element.src=image;  
    }

    moveUp(){ this.y-=this.jumpVelocity; }

    incrementIndex(){ this.index= (this.index+1)%4 }

}


class Pipe{

    /**
     * 
     * @param {*} x the x coordinate of the pipe
     * @param {*} y the y coordinate of the pipe
     */
    constructor(x,y)
    {
        this.x=x;
        this.y=y;
        this.height=242;

    } 
}


//Ground Class
class Ground{
    /**
     * 
     * @param {*} image :the image of the ground to be drawn
     * @param {*} canvasHeight :the hight of the canvas
     */
    constructor(image,canvasHeight)
    {
        this.element=new Image();
        this.element.src=image;
        this.height=218;
        this.x=0;
        this.y=canvasHeight-this.height;
        
    }
}


//startGame();