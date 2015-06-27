function set_body_height() {
  var wh = $(window).height();
  $('div').attr('style', 'height:' + wh + 'px;');
}

function setup_canvas(clickablesArray) {
  if(this.paper) {
    for(var i = 0; i<clickablesArray.length; i++) {
      clickablesArray[i].remove();
    }

    delete this.paper;
    $('svg').remove();
  }
  this.paper = new Raphael( (($(window).width()/2)-($("img").width())/2), 0, $("img").width(), $("img").height());
  
  // To grab points from console
  this.paper.rect(0,0,$("img").width(),$("img").height())
    .attr({"fill": "clear", "fill-opacity": 0})
    .node.onclick = function (e) {
      console.log('hello');
      var offset = $(this).offset();
      console.log((e.pageX - offset.left)/$("img").width());
      console.log((e.pageY - offset.top)/$("img").height());
    };
}

function draw_clickables(clickablesDataArray) {
  var clickablesArray = [];
  for(var i = 0; i<clickablesDataArray.length; i++) {  
    var path = getPath(clickablesDataArray[i]);
    var temp = this.paper.path(path).attr({"stroke-opacity": 0, "stroke-width": 1});
    clickablesArray.push(temp);
  }
  for(var i = 0; i<clickablesArray.length; i++) {
    clickablesArray[i].shimmer = function (temp) {
        clickablesArray[temp].animate({stroke: clickablesDataArray[temp].color, "stroke-opacity": 1}, 250, clickablesArray[temp].shammer);
    }.bind(this,i);
    clickablesArray[i].shammer = function (temp) {
        clickablesArray[temp].animate({stroke: '#FFFFFF', "stroke-opacity": 0}, 1250, clickablesArray[temp].shimmer);
    }.bind(this,i)
    clickablesArray[i].shimmer();
  }
  return clickablesArray;
} 

function getPath(thisClickable) {
  var stuff = {x: 0, y: 0, path: 'M '};
  for(var i = 0; i < thisClickable.points.length; i++) {
    if (i != 0) { stuff.path += 'l ';}
    stuff = concatonator(thisClickable.points[i].x, thisClickable.points[i].y, stuff); 
  }
  stuff.path += "z"
  return stuff.path;
}

function concatonator(x, y, stuff) {
  var calculated;
  var temp;
  calculated = $("img").width() * x;
  temp = Math.round(calculated);
  calculated = temp - stuff.x;
  stuff.x = temp;
  stuff.path += calculated + ' ';
  calculated = $("img").height() * y;
  temp = Math.round(calculated);
  calculated = temp - stuff.y;
  stuff.y = temp;
  stuff.path += calculated + ' ';
  return stuff
}