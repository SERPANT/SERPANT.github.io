var fruits=[
    {id:1,name:'apple', color:'red'},
    {id:2,name:'banana', color:'yellow'},
    {id:3,name:'apple', color:'green'},
];


console.log(searchByID(fruits,'name', 'apple'));

function searchByID(fruit, id)
{
    var arr=[];

    for(var i=0; i<fruit.length;i++)
    {
        if(fruit[i].id===id)
        {
            arr.push(fruit[i]);

        }
    }
    return arr;

}


function searchByID(fruit,prop,id){

    var arr=[];
    for(var i=0;i<fruit.length;i++){

        if(fruit[i][prop]===id){
            arr.push(fruit[i])
        }
    }

    return arr;
}