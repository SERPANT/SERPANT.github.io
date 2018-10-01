
    var can=document.getElementsByClassName("canvas")[0];
    var ctx = can.getContext("2d");

    var bgFront=new Image();
    bgFront.src="images/background.jpg";
    var Running=0;



    document.addEventListener("keydown",checkEnter);

    function checkEnter(event)
    {
            if(event.code==="Enter" && Running === 0)
            {   
                Running=1;
                var game=new Game();
                game.init();
            }
    }
   
    function drawFront(){

        if(Running===0)
        {
        ctx.drawImage(bgFront,0,0,850,350);
        ctx.fillStyle="#FFFFFF";
        ctx.font = "30px Arial";
        ctx.fillText("MENU",380,400);
        
         ctx.fillText("PRESS ENTER TO START",250,500);
        requestAnimationFrame(drawFront);
        }
    }




drawFront();