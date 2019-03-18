
'use strict';


var ctx = document.createElement("canvas").getContext("2d");

var count;


$('.triangle').on("mousedown", function(event) {
  var innerPos = getInnerPosition(event, $(this));

  if (triangleHitTest(event, innerPos)) {
    moveableClick(event, $(this), innerPos[0], innerPos[1]);
  } else {
    checkElements(event);
  }
});

$('.moveableSvg').on("mousedown", function(event) {


  var innerPos = getInnerPosition(event, $(this).parent());

  moveableClick(event, $(this).parent().parent(), innerPos[0], innerPos[1]);

});


$('.svgElement, .svgRectangularElement').on("mousedown", function(event) {

  checkElements(event);

});

$('.moveablePng').on("mousedown", function(event) {
  
  testAlpha(event, this);

});

$('.moveableParentCSS').on("mousedown", function(event) {

  var pos = $(this).position();
  var x = event.clientX - pos.left;
  var y = event.clientY - pos.top;
  moveableClick(event, $(this), x, y);

});

$('.moveableCSS').on("mousedown", function(event) {

  var pos = $(this).parent().position();
  var x = event.clientX - pos.left;
  var y = event.clientY - pos.top;
  moveableClick(event, $(this).parent(), x, y);


});

$('textarea').on("mousedown", function(event) {

  var pos = $(this).parent().position();
  var x = event.clientX - pos.left;
  var y = event.clientY - pos.top;
  moveableClick(event, $(this).parent(), x, y);

});

$('.menuTwoText').on("mousedown", function(event) {

  var pos = $(this).position();
  var x = event.clientX - pos.left;
  var y = event.clientY - pos.top;
  moveableClick(event, $(this), x, y);
});

$('.moveablePngFull').on("mousedown", function(event) {

  var innerPos = getInnerPosition(event, $(this).parent());

  moveableClick(event, $(this).parent(), innerPos[0], innerPos[1]);

});

function testAlpha(event, domImg) {
   domImg.crossOrigin = "Anonymous";
  var img = $(domImg)

  console.log(domImg, count);


  var innerPos = getInnerPosition(event, img.parent());

  var w = img.width();
  var h = img.height();
  ctx.canvas.width = w;
  ctx.canvas.height = h;
  var alpha;

  ctx.drawImage(domImg, 0, 0, w, h);

  var rotation = getRotation(img);

  if (rotation == "") {

      alpha = ctx.getImageData(innerPos[0], innerPos[1], 1, 1).data[3]; // [0]R [1]G [2]B [3]A

      
    } else {
      var newPos = rotatePoint(img.width()/2, img.height()/2, rotation, innerPos[0], innerPos[1]);
      alpha = ctx.getImageData(newPos[0], newPos[1], 1, 1).data[3]; // [0]R [1]G [2]B [3]A
    }

    
    if( alpha===0 ) {


      img.hide();
      checkElements(event);
      img.show();

      

    } else {
      moveableClick(event, img.parent(), innerPos[0], innerPos[1]);
    }
  }


function checkElements(event) {

  var listOfElements = getAllElementsFromPoint(event.clientX,event.clientY);
  var innerPos;

  var i;
  for (i = 0; i < listOfElements.length; i++) {

    
    if(listOfElements[i].classList.contains("moveablePng")) {
      count = 2;
      testAlpha(event, listOfElements[i]);
      break;

    } else if(listOfElements[i].classList.contains("moveableSvg")) {

      innerPos = getInnerPosition(event, $(listOfElements[i]).parent());
      moveableClick(event, $(listOfElements[i]).parent().parent(), innerPos[0], innerPos[1]);

      break;

    } else if (  (listOfElements[i].classList.contains("moveablePngFull")) ||
      (listOfElements[i].classList.contains("moveableCSS")) ||
      (listOfElements[i].classList.contains("textarea"))  ) {

      innerPos = getInnerPosition(event, $(listOfElements[i]).parent());
      moveableClick(event, $(listOfElements[i]).parent(), innerPos[0], innerPos[1]);

      break;

    } else if ( (listOfElements[i].classList.contains("moveableParentCSS")) 
      || (listOfElements[i].classList.contains("menuTwoText")) ) {
      innerPos = getInnerPosition(event, $(listOfElements[i]));
      moveableClick(event, $(listOfElements[i]), innerPos[0], innerPos[1]);

      break;

    } else if (listOfElements[i].classList.contains("triangle")) {

      innerPos = getInnerPosition(event, $(listOfElements[i]));
      if (triangleHitTest(event, innerPos)) {
        moveableClick(event, $(listOfElements[i]), innerPos[0], innerPos[1]);
        break;
      }
      
    }
  }
}


function triangleHitTest(event, innerPos) {

  if (isInside(0, 100, 50, 0, 100, 100, innerPos[0], innerPos[1])) {
    return true;
  } 
  return false;
}

