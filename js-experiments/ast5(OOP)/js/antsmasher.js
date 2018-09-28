function game()
{
    var container = document.getElementsByClassName("container")[0];
    this.start=function()
    {
        var div=document.createElement("div");
        div.className="ant";
        console.log(container)
        container.appendChild(div);
    }
}

var game=new game();

game.start();