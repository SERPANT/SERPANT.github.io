function loopy() {
    /* 
     Edit this function such that it returns {id, title, boxart} for every video in the movieLists. 
     Only boxart with dimensions of 150x200px should be selected.
     
    Solve this problem with map(), reduce(), and filter(). 
    */
   
     
      var movieLists = [{
          name: 'Instant Queue',
          videos: [{
              'id': 70111470,
              'title': 'Die Hard',
              'boxarts': [{
                  width: 150,
                  height: 200,
                  url: 'http://cdn-0.nflximg.com/images/2891/DieHard150.jpg'
                },
                {
                  width: 200,
                  height: 200,
                  url: 'http://cdn-0.nflximg.com/images/2891/DieHard200.jpg'
                }
              ],
              'url': 'http://api.netflix.com/catalog/titles/movies/70111470',
              'rating': 4.0,
              'bookmark': []
            },
            {
              'id': 654356453,
              'title': 'Bad Boys',
              'boxarts': [{
                  width: 200,
                  height: 200,
                  url: 'http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg'
                },
                {
                  width: 150,
                  height: 200,
                  url: 'http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg'
                }
    
              ],
              'url': 'http://api.netflix.com/catalog/titles/movies/70111470',
              'rating': 5.0,
              'bookmark': [{
                id: 432534,
                time: 65876586
              }]
            }
          ]
        },
        {
          name: 'New Releases',
          videos: [{
              'id': 65432445,
              'title': 'The Chamber',
              'boxarts': [{
                  width: 150,
                  height: 200,
                  url: 'http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg'
                },
                {
                  width: 200,
                  height: 200,
                  url: 'http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg'
                }
              ],
              'url': 'http://api.netflix.com/catalog/titles/movies/70111470',
              'rating': 4.0,
              'bookmark': []
            },
            {
              'id': 675465,
              'title': 'Fracture',
              'boxarts': [{
                  width: 200,
                  height: 200,
                  url: 'http://cdn-0.nflximg.com/images/2891/Fracture200.jpg'
                },
                {
                  width: 150,
                  height: 200,
                  url: 'http://cdn-0.nflximg.com/images/2891/Fracture150.jpg'
                },
                {
                  width: 300,
                  height: 200,
                  url: 'http://cdn-0.nflximg.com/images/2891/Fracture300.jpg'
                }
              ],
              'ur': 'http://api.netflix.com/catalog/titles/movies/70111470',
              'rating': 5.0,
              'bookmark': [{
                id: 432534,
                time: 65876586
              }]
            }
          ]
        }
      ];
    
    
      // Use one or more map, reduce, and filter calls to create an array with the following items
    /* [{
          "id": 675465,
          "title": "Fracture",
          "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg"
        },
        {
          "id": 65432445,
          "title": "The Chamber",
          "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg"
        },
        {
          "id": 654356453,
          "title": "Bad Boys",
          "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg"
        },
        {
          "id": 70111470,
          "title": "Die Hard",
          "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg"
        }
      ]; */
    
      
      var newList = [];

      //loop for movieList array
      for(var type = 0 ; type < movieLists.length ; type++)
      {
          //loop for video arry
          for(var video = 0 ; video < movieLists[type].videos.length ; video++)
          {
            
              //loop for boxart arry
              for(var boxart = 0; boxart<movieLists[type].videos[video].boxarts.length;boxart++)
              {
                    var boxartobj = movieLists[type].videos[video].boxarts[boxart];

                    if(boxartobj.width === 150 && boxartobj.height === 200)
                    {
                            //creating a new object
                              newobject = {
                                  id:movieLists[type].videos[video].id,
                                  title:movieLists[type].videos[video].title,
                                  boxart:boxartobj.url
                              }

                              //pushing the new object
                              newList.push(newobject);

                              //if found no need to look further so break
                              break;
                    }
              }
          }
      }
     return newList;
    
    }

    
