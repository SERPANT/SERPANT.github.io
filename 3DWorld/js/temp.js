function draw() {
  ctx.clearRect(0, 0, 2 * canvasWidth, 2 * canvasHeight);

  for (var cubeObject of objects) {
    cube = cubeObject.verti;

    var vertexList = [];
    var screen_coords = [];

    for (var i of cube) {
      var [q, w, e] = i;
      [q, w, e] = TransformAndRotate(q, w, e);
      vertexList.push([q, w, e]);
      [q, w] = project(q, w, e);
      screen_coords.push([q + dx, w + dy]);
    }

    facesList = [];
    //  facColor=[];
    //depth=[];
    var onscreen;
    // mindist=[];
    //var counter=0;

    for (face of cubeObject.cubeFace) {
      onscreen = false;
      for (vertex of face) {
        x, (y = screen_coords[i]);
        if (vertexList[vertex][2] > 0) {
          onscreen = true;
        } else {
          onscreen = false;
          break;
        }
      }

      // var min=500000;
      // for ( vertex of face)
      // {
      //   var [x1,y1,z1]=vertex;

      //   xp=Math.pow((x2 - x1),2);
      //   yp=Math.pow((y2 - y1),2);
      //   zp=Math.pow((z2 - z1),2);
      //   d = Math.pow((xp+yp+zp),1/2);

      //   if(min<d)
      //   {
      //     min=d;
      //   }
      // }

      // mindist.push(min);

      if (onscreen) {
        var coords = [];
        for (var i of face) {
          coords.push(screen_coords[i]);
          //put code here............................................
        }

        facesList.push(coords);

        // var total=0;
        // for(var i=0;i<3;i++)
        // {
        //   var sum=0;
        //   for(j of face)
        //   {
        //     sum+=vertexList[j][i]/4;
        //    // console.log(j,vertexList[j][i]);
        //   }

        //  sum=sum*sum;
        //   total+=sum;

        // }
        // total=total*total;
        // depth.push(total);
      }
    }

    //   //sorting
    //   //console.log(mindist);
    //   temp=Object.assign([],depth);

    //   depth.sort();
    //  // console.log(depth);

    //   var index=[];
    //   for(var i=0;i<depth.length;i++)
    //   {

    //     test=temp.indexOf(depth[i]);
    //     temp[test]=-100;
    //     index.push(test);
    //   }

    // for (var j=index.length-1;j>=0;j--) {

    for (j in facesList) {
      var face = facesList[j]; //remember to use index
      ctx.beginPath();

      ctx.moveTo(face[0][0], face[0][1]);

      // Draw the vector2 vertices
      for (var k = 1, n_vertices = face.length; k < n_vertices; ++k) {
        ctx.lineTo(face[k][0], face[k][1]);
      }

      // Close the path and draw the face
      ctx.closePath();
      //ctx.stroke();
      ctx.fillStyle = cubeObject.color;
      ctx.fill();
    }
  }

  requestAnimationFrame(draw);
}

function makeWall() {
  for (vertex of map) {
    var [x, y, z, wallW, wallH, color] = vertex;
    // cubeOb = new CubeObject();
    // cubeOb.init([x, y, z], color);
    // objects.push(cubeOb);
    for (var i = x; i < x + wallW; i = i + 20) {
      for (var j = y; j < y + wallH; j = j + 20) {
        cubeOb = new CubeObject();
        cubeOb.init([i, -j, z], color);
        objects.push(cubeOb);

        // cubeOb = new CubeObject();
        // cubeOb.init([i, -j, z], color);
        // objects.push(cubeOb);
      }
    }
  }
}

function drawGround() {
  var points = [
    [-500, 0, 2], //left first
    [500, 0, 2],
    [500, 0, 100],
    [-500, 0, 100]
  ];

  var [a, b, c] = points[0];
  var [x1, y1] = project(a, b, c);
  ctx.beginPath();

  ctx.moveTo(x1 + dx, y1 + dy);

  for (var i = 1; i < points.length; i++) {
    var [q, w, e] = points[i];
    var [x, y] = project(q, w, e);
    // console.log(q, w, e);
    // console.log(x + dx, y + dy);
    ctx.lineTo(x + dx, y + dy);
  }
  ctx.lineTo(x1 + dx, y1 + dy);
  ctx.closePath();
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.stroke();

  colorGround();
}

function makeRoad(y) {
  arr = [];

  for (var j = 20; j < 300; j = j + 20) {
    cubeOb = new CubeObject();
    cubeOb.init([0, y, j], "white", 1);
    arr.push(cubeOb);
  }

  for (var i = 20; i < 200; i = i + 20) {
    for (var j = 20; j < 300; j = j + 20) {
      cubeOb = new CubeObject();
      cubeOb.init([-i, y, j], "gray", 1);
      arr.push(cubeOb);

      cubeOb = new CubeObject();
      cubeOb.init([i, y, j], "gray", 1);
      arr.push(cubeOb);
    }
  }
  return arr;
}
