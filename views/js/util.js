function set_body_height() {
  var wh = $(window).height();
  var ww = $(window).width();
  $('#pic-container').attr('style', 'height:' + wh + 'px;');
  $('#pic-container').attr('style', 'width:' + ww + 'px;');
  // get $img height and width
  var imgWidth = $('img').get(0).naturalWidth; 
  var imgHeight = $('img').get(0).naturalHeight;
  // image is portrait ratio
  if(imgHeight>imgWidth) {
    var multiplier = wh/imgHeight;
  } 
  // image is landscape ratio
  else {
    var multiplier = ww/imgWidth;
  }
  var newHeight = imgHeight*multiplier;
  var newWidth  = imgWidth*multiplier;
  if(newHeight <= wh && newWidth <= ww) {
    $('img').height(newHeight);
    $('img').width(newWidth);
  }
  if(newWidth > ww) {
    multiplier = ww/imgWidth;
    newWidth = ww;
    newHeight =imgHeight*multiplier;
    $('img').height(newHeight);
    $('img').width(newWidth);
  }
  if(newHeight > wh) {
    multiplier = wh/imgHeight;
    newHeight = wh;
    newWidth  = imgWidth*multiplier;
    $('img').height(newHeight);
    $('img').width(newWidth);
  }
}

function setup_canvas(clickablesArray) {
  if(this.paper) {
    for(var i = 0; i<clickablesArray.length; i++) {
      clickablesArray[i].remove();
    }

    delete this.paper;
    $('svg').remove();
  }
  this.paper = new Raphael( (($(window).width()/2)-($("img").width())/2), (($(window).height()/2)-($("img").height())/2), $("img").width(), $("img").height());
  /*
  // To grab points from console
  this.paper.rect(0,0,$("img").width(),$("img").height())
    .attr({"fill": "clear", "fill-opacity": 0})
    .node.onclick = function (e) {
      console.log('hello');
      var offset = $(this).offset();
      console.log((e.pageX - offset.left)/$("img").width());
      console.log((e.pageY - offset.top)/$("img").height());
    };
    */
}

function draw_clickables(clickablesDataArray) {
  var clickablesArray = [];
  for(var i = 0; i<clickablesDataArray.length; i++) {  
    var path = getPath(clickablesDataArray[i]);
    var temp = this.paper.path(path)
      .attr({ "stroke-opacity": 0, 
              "stroke-width": 1,
              fill: "clear",
              "fill-opacity": 0});
    temp.node.onclick = function(url) {
        window.location.href = '/' + url;
      }.bind(clickablesDataArray[i], clickablesDataArray[i].url);
    temp.glow({color: clickablesDataArray[i].color, width: 1.5, opacity: .25})  
    clickablesArray.push(temp);
  }
  for(var i = 0; i<clickablesArray.length; i++) {
    clickablesArray[i].shimmer = function (temp) {
        clickablesArray[temp].animate({stroke: clickablesDataArray[temp].color, "stroke-opacity": 5}, 250, clickablesArray[temp].shammer);
    }.bind(this,i);
    clickablesArray[i].shammer = function (temp) {
        clickablesArray[temp].animate({stroke: '#FFFFFF', "stroke-opacity": 0}, 1000, clickablesArray[temp].shimmer);
    }.bind(this,i)
    clickablesArray[i].shimmer();
  }
  // Menu Icon
  var iconDimension = getSizeOfMenuIcon();
  var iconCoordinates = getLocationOfMenuIcon(iconDimension);
  var menuIcon = this.paper.image('http://pics.pic4ward.com/menu3.png', iconCoordinates.x, iconCoordinates.y, iconDimension, iconDimension)
  menuIcon.attr({
    'opacity': .75
  });
  menuIcon.node.onclick = function() {
    if(!isGray) {
      $('#pic-container').attr('class', 'gray');
      $('html').css('background-color', '#000000');
      isGray = true;
    } else {
      $('#pic-container').attr('class', '');
      $('html').css('background-color', bColor);
      isGray = false;
    }
  };
  clickablesArray.push(menuIcon);
  return clickablesArray;
} 

function getLocationOfMenuIcon(dimensions) {
  var coordinates = {};
  var difference = 2 * dimensions;
  coordinates.x = $("img").width() - dimensions;
  coordinates.y = $("img").height() - dimensions;
  return coordinates;
}

function getSizeOfMenuIcon() {
  var unit;
  if($("img").height() >= $("img").height()) {
    unit = .12 * $("img").height();
  } else {
    unit = .12 * $("img").width();
  }
  return unit;
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