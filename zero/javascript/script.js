'use strict';


/**

On load, subscribe main menu

**/

$(document).ready(function() {
  subscribeMainMenu();
  $('.tooltip').tooltipster({theme: 'tooltipster-noir'});
        
});

const IMG_SIZE = 100;


const mainMenu = MarkingMenu(items, document.getElementById('main'));
const contextMenu = MarkingMenu(contextItems, document.getElementById('main'));
const shapeContextMenu = MarkingMenu(shapeContextItems, document.getElementById('main'));
const textContextMenu = MarkingMenu(textContextItems, document.getElementById('main'));


var mainMenuSubscription;
var contextMenuSubscription;
var shapeContextMenuSubscription;
var textContextMenuSubscription;

function subscribeMainMenu() {

  mainMenuSubscription = mainMenu.subscribe({
    next(selection) {
        if (selection.name != 'Help') {
          var new_img = $("#"+selection.name).clone(true); 
          if (new_img.hasClass("textpanel")) {
            new_img.find('textarea').val("");
          }

          //new_img.attr('value','1');
          selectItem(new_img);

          new_img.insertBefore( $('#end') );
          moveObj(); 
          new_img.show();

          getContextMenu(new_img);
          
        }
          
         
        
      },
    error(error) {
      console.error(error);
    }
  });
}


function subscribeContextMenu() {
  contextMenuSubscription = contextMenu.subscribe({
    next(selection) {
      doContextMenu(selection.name);
    },
    error(error) {
      console.error(error);
    }
  });
}

function subscribeShapeContextMenu() {
  shapeContextMenuSubscription = shapeContextMenu.subscribe({
    next(selection) {
      doContextMenu(selection.name);
    },
    error(error) {
      console.error(error);
    }
  });
}

function subscribeTextContextMenu() {
  textContextMenuSubscription = textContextMenu.subscribe({
    next(selection) {
      doTextContextMenu(selection.name);
    },
    error(error) {
      console.error(error);
    }
  });
}


function checkMoveables() {
    var valid = true;
    $('.moveable').each (function() {
      if ($(this).attr("value") == '1') {
        valid = false;
      }
    });
    status = valid;
    return valid;
}




/**

Drawing functions

**/

$("#main").on('mousemove', function(e){
    if (!checkMoveables()) {
      moveObj();
    } 
});

$(".moveable").on('click', function(e){
  if ($(this).attr('value') == '1') {

    deselectItem($(this));
    //hideTrash();
  } else {
    if (checkMoveables()) {
      selectItem($(this));
      //showTrash();
    }
  }
});

// $("#trash").on('click', function (e) {
//   var elem = $('[value=1]');
//   elem.attr("value", '0');
//   elem.hide();
//   hideTrash();
// });


function moveObj() {

  var w = $('[value=1]').width();
  var h = $('[value=1]').height();
  var x = event.clientX;
  var y = event.clientY;
  var width = window.innerWidth;
  var height = window.innerHeight;
  if (x > (width-w/2)) {
    x = width-(w/2);
  } 
  if (y > (height-h/2)) {
    y = height-(h/2);
  }
  $('[value=1]').css({
    left:  x - w/2,
    top:   y - h/2
  });
}


// function showTrash() {
//   $("#trash").show();
// }


// function hideTrash() {
//   $("#trash").hide();
// }

function del() {
  var elem = $('[value=1]');
  elem.attr("value", '0');
  elem.hide();
}

function toFront() {
  var elem = $('[value=1]');
  elem.attr("value", '0');
  elem.hide();
  var new_img = elem.clone(true); 
  new_img.insertBefore( $('#end') );
  selectItem(new_img);
  moveObj();
  new_img.show();
}

function toBack() {
  var elem = $('[value=1]');
  elem.attr("value", '0');
  elem.hide();
  var new_img = elem.clone(true); 
  new_img.insertAfter( $('#begin') );
  selectItem(new_img);
  moveObj();
  new_img.show();

}


function unsubscribeMenu() {
  if (contextMenuSubscription != null) {
    contextMenuSubscription.unsubscribe();
  } 
  if (mainMenuSubscription != null) {
    mainMenuSubscription.unsubscribe();
  }
  if (shapeContextMenuSubscription != null) {
    shapeContextMenuSubscription.unsubscribe();
  }
  if (textContextMenuSubscription != null) {
    textContextMenuSubscription.unsubscribe();
  }

}

function switchToMainMenu() {
  unsubscribeMenu();
  subscribeMainMenu();
}

function switchToContextMenu() {
  unsubscribeMenu();
  subscribeContextMenu();
}

function switchToShapeContextMenu() {
  unsubscribeMenu();
  subscribeShapeContextMenu();
}

function switchToTextContextMenu() {
  unsubscribeMenu();
  subscribeTextContextMenu();
}

function selectItem(item) {
  item.attr('value','1');
  getContextMenu(item);
}

function deselectItem(item) {
  item.attr('value', 0);
  switchToMainMenu();
}

function doContextMenu(string) {
  switch (string) {
    case "Delete":
      del();
      switchToMainMenu();
      break;
    case "To Front":
      toFront();
      break;
    case "To Back":
      toBack();
      break;
    default:
      changeColour(string);
      break;
  }
}

function doTextContextMenu(string) {

  if (string == "Left" || string == "Right" || string == "Center") {
    changeAlignment(string);
  } else if (string == "Bold"  || string == "Italic" || string == "Underline" || string == "Normal") {
    changeStyle(string);
  } else if (string == "Delete") {
    del();
    switchToMainMenu();
  } else if (string == "Helvetica" || "Comic Sans MS" || "Impact" || "Courier") {
    changeFont(string);
  }
}


function getContextMenu(item) {
  if (item.hasClass('shape')) {
    switchToShapeContextMenu();
  } else if (item.hasClass('textpanel')) {
    //wait
    switchToTextContextMenu();
  } else {
    switchToContextMenu();
  }
}



function changeColour(arg) {
  var colour = "#000000";
  switch (arg) {
    case "Blue":
      colour = "#80d4ff";
      break;
    case "Green":
      colour = "#009900";
      break;
    case "Yellow":
      colour = "#ffff66";
      break;
    case "Light Grey":
      colour = "#e6e6e6";
      break;
    case "White":
      colour = "#FFFFFF";
      break;
    case "Dark Grey":
      colour = "#666666";
      break;
    case "Brown":
      colour = "#802b00";
      break;
    default: 
      colour = "#000000";
      break;
  }

  //var colour = arg.toLowerCase();
  var elem = $('[value=1]');
  if (elem.attr('id') == "Triangle") {
    elem.find( ".tri" ).css( "border-bottom", "100px solid " + colour );
  } else {
    elem.css( "background-color", colour );
  }
}

function changeAlignment(arg) {
  var alignment = arg.toLowerCase();
  var elem = $('[value=1]').find('textarea');
  elem.css( "text-align", alignment);
}

function changeStyle(arg) {
  var style = arg.toLowerCase();
  var elem = $('[value=1]').find('textarea');
  if (style == "underline") {
    elem.css( "text-decoration", style);
  } else if (style == "bold") {
    elem.css("font-weight", style);
  } else if (style == "italic") {
    elem.css("font-style", style);
  } else if (style == "normal") {
    elem.css("font-style", style);
    elem.css("font-weight", style);
    elem.css("text-decoration", "none");
  }
}

function changeFont(arg) {
  var elem = $('[value=1]').find('textarea');
  if (arg == "Comic Sans") {
    elem.css('font-family', "Comic Sans MS");
  } else {
    elem.css('font-family', arg);
  }

}
