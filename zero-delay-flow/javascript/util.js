'use strict';


/* A utility function to calculate area of triangle formed by (x1, y1), 
   (x2, y2) and (x3, y3) */
function area(x1, y1, x2, y2, x3, y3)
{
   return Math.abs((x1*(y2-y3) + x2*(y3-y1)+ x3*(y1-y2))/2.0);
}

/* A function to check whether point P(x, y) lies inside the triangle formed 
   by A(x1, y1), B(x2, y2) and C(x3, y3) */
function isInside(x1, y1, x2, y2, x3, y3, x, y)
{   
   /* Calculate area of triangle ABC */
  var A = area (x1, y1, x2, y2, x3, y3);

   /* Calculate area of triangle PBC */  
  var A1 = area (x, y, x2, y2, x3, y3);

   /* Calculate area of triangle PAC */  
  var A2 = area (x1, y1, x, y, x3, y3);

   /* Calculate area of triangle PAB */   
  var A3 = area (x1, y1, x2, y2, x, y);

   /* Check if sum of A1, A2 and A3 is same as A */
   return (A == A1 + A2 + A3);
}

function getInnerPosition(e, element) {
  var pos = element.position();
  return [e.clientX - pos.left, e.clientY - pos.top];
}

function getAllElementsFromPoint(x, y) {
    var elements = [];
    var display = [];
    var item = document.elementFromPoint(x, y);
    while (item && item !== document.body && item !== window && item !== document && item !== document.documentElement) {
        elements.push(item);
        display.push(item.style.display);
        item.style.display = "none";
        item = document.elementFromPoint(x, y);
    }
    // restore display property
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = display[i];
    }
    return elements;
}


function rotatePoint(cx, cy, angle, px, py) {
  var s = Math.sin(angle*(Math.PI/180));
  var c = Math.cos(angle*(Math.PI/180));

  // translate point back to origin:
  px -= cx;
  py -= cy;

  // rotate point
  var xnew = px * c - py * s;
  var ynew = px * s + py * c;

  // translate point back:
  px = xnew + cx;
  py = ynew + cy;

  return [px, py];
}

function getRotation(element) {

  return element.val();

}


