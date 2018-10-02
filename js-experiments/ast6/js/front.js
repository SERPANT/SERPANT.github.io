    var Running=0;
    var bgFront=new Image();
    var backgroundSound=new Audio();
    var can=document.getElementsByClassName('canvas')[0];
    var ctx = can.getContext('2d');

    //var can2=document.getElementById("canvas2");
    //var ctx2 = can2.getContext('2d');
   

    //initalizes the necessary varibles that are required for the front menu including the background audio on the game
    function frontInit()
    {
        //importing audio for game play sound
        backgroundSound.src='audio/backgroundMusic.mp3';

        //importing image background banner
        bgFront.src='images/background.jpg';
        
        //adding lishner to dom for enter
        document.addEventListener('keydown',checkEnter);
    }

    /**
     * this function is called whenever an event in Front page is executed
     * @param {*} event : an event object produced by DOM on an even 
     */
    function checkEnter(event)
    {
            if(event.code==='Enter' && Running === 0)
            {   
                Running=1;
                var game=new Game(can);
                game.init();

           //     var game=new Game(can2);
             //   game.init();
            }
    }

   
    function drawFrontPage()
    {
        if(Running===0)
        {
            //drawing image banner 
            ctx.drawImage(bgFront,0,0,850,350);

            //draw Menu Text
            drawMenuText();
            
            //this is the press start text
            ctx.fillText('PRESS ENTER TO START',250,500);

            //drawing instruction
            drawInstruction();

            //used to loop for displaying images
            requestAnimationFrame(drawFrontPage);
        }
    }

    function drawInstruction()
    {
        ctx.font="20px Arial";
        ctx.fillText('Space -- attack',250,550);
        ctx.fillText('A -- Dash',250,580);
        ctx.fillText('ESC -- exit',250,610);
    }

    //drawing Text Menu
    function drawMenuText()
    {
      ctx.fillStyle='#FFFFFF';
      ctx.font = '30px Arial';
      ctx.fillText('MENU',380,400);
    }


//inial function calls for game menu display and game start
frontInit();
drawFrontPage();