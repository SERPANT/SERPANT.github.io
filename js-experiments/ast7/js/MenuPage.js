let r=0;

setTimeout(()=>{r=1;   console.log(r)}, 3000);


function Menu()
{
    con = document.getElementsByClassName('canvas')[0];
    ctx = con.getContext('2d');


    let image = new Image();
    image.src = 'images/fontPage.jpg';
    
    ctx.drawImage( image, 0, 0);

    ctx.fillStyle = 'red';
    ctx.font = '30px Arial';
    ctx.fillText( 'Wait 3 Seconds Loading...', 10, con.height - 25);
   
    if (r === 0)
    {
        requestAnimationFrame(Menu);
    }
    else if (r === 1) {
     
        this.ctx.clearRect(0, 0, this.con.width, this.con.height);
        var game = new Game(con);
        game.init();
       
    }
}


Menu();