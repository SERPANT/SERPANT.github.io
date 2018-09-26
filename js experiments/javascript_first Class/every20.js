
var counter=0;

var rel=setInterval(
                function(){

            console.log(counter);
            counter++;
            if(counter>20){
                clearInterval(rel);
            }
        }
,1000);