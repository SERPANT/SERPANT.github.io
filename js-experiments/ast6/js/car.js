(
    function(){
        canvas=document.getElementById("canvas");
        var context = canvas.getContext("2d");
    

        var car=new Image();
        var car2=new Image();
        var bg=new Image();

        car.src="images/car.jpg";
        car2.src="images/car2.jpg";
        bg.src="images/background.png"


        var jump=75;

        var bx=110;
        var by=500;
        var playerWidth=50;
        var playerHeight=106;

        var enemyWidth=50;
        var enemyHeight=109;

        document.addEventListener("keydown",shiftCar)

        function shiftCar(event){
           
            console.log(event);
            if(event.code==="ArrowRight")
            {
                if(bx<265)
                {
                bx=bx+jump;
                }
            }
            else if (event.code==="ArrowLeft")
            {
                if(bx>110)
                {
                      bx=bx-jump;
                }
            }
            
        }


        var enemy=[];
        var velocity=2;
        var screenCount=1;
        enemy[0]={
            x:265,
            y:50,
            dead:0
        }
        var pos=[110,190,265,340];

        function draw(){
           context.drawImage(bg,0,0)
            context.drawImage(bg,0,386)
            context.drawImage(car,bx,by);  //110  190   265  340


            checkCollision();
          
            for(var i=0;i<enemy.length;i++)
            {
                if(enemy[i].dead===0)
                {
                    context.drawImage(car2,enemy[i].x,enemy[i].y);
                    enemy[i].y=velocity+enemy[i].y;

                    if(enemy[i].y==150 && enemy[i].dead===0)
                    {
                       // screenCount++;
                     //  createCount=(Math.floor(Math.random()*3)+1)
                      // console.log(createCount);
                       //for(var temp=0;temp<createCount;temp++)
                      // {
                            enemy.push({
                                x:pos[Math.floor(Math.random()*4)+0],
                                y:-200,
                                dead:0
                            })
                      // }
                     
                    }
    
                    if(enemy[i].y>750)
                    {
                      //  screenCount--;
                        enemy[i].dead=1;
                    }
                }  
            }
        
            requestAnimationFrame(draw);
        }


        function checkCollision(){

                for (var i=0;i<enemy.length;i++)
                {
                    if(enemy[i].dead===0)
                    {
                        if (enemy[i].x < bx + playerWidth &&
                            enemy[i].x + enemyWidth > bx &&
                            enemy[i].y < by+ playerHeight &&
                            enemyHeight+ enemy[i].y > by) {
                             location.reload();
                         }
                    }
                }
        }
        draw();
    }
)()