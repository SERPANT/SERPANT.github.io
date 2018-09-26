

//new array to store the result
var newarr=[];


function normalize(){
    var people = [{
        id: 1,
        name: "Aegon Targaryen",
        children: [
          
          {
          id: 2,
          name: "Jaehaerys Targaryen",
          children: [{
            id: 4,
            name: "Daenerys Targaryen"
          },{
            id: 5,
            name: "Rhaegar Targaryen",
            children: [{
              id: 6,
              name: "Aegon Targaryen"
            }]
          }] 
        },
        {
          id: 3,
          name: "Rhaelle Targaryen"
        }],
      }];
  

     //looping throught the array people 
    for(var i=0;i<people.length;i++){

       //normalizing elach element of the array person
          normalize_element(people[i]);
    }

   //sorting the array newarr
    console.log(sort());
    }


 

    function normalize_element(people)
    {
          //if children exist
          if(people.children!=undefined)
          {
          
                  //temp array to store the children id
                  var arr=[];

                  for(var child=0;child<people.children.length;child++)
                  {  
                        //traversing the children 
                        normalize_element(people.children[child]);

                        //adding the children id to arr
                        arr.push(people.children[child].id);
                  }

                 
                  people.children=arr;      //assigning the id arr to children 

                  newarr.push(people);
          }
          
          else
          {      people.children=[];
                 newarr.push(people);
          }
      
    }


    function sort()
    {
        //new sorted array
        var arr=[];

      for(var id=1;id<=newarr.length;id++)
      {
            for(var per=0;per<=newarr.length-1;per++)
            {
              
                  if(newarr[per].id==id)
                  {
                    
                    arr.push(newarr[per]);
                  }
            }
      }


      return arr;
    }

