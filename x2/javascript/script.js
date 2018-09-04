'use strict';


/**

On load, subscribe main menu

**/

var PARTICIPANT_ID = "P01";
var CONDITION = "DELAY";

var position = 0;
//var CONDITION = "NO_DELAY"
// var ARRAY_TASKS= [IMG_1_1, IMG_1_2, IMG_1_3];
// var ARRAY

// var IMG = IMG_2_3;
// var IMG_ARRAY = IMG_2_3_ARR;
var menu2_first_cond = false;
var ARRAY_TASKS;
var IMG_TASKS_ARRAY;
var ITEM_COND;
var OPTIONS;

const delay = {
  minSelectionDist : 10,
  minMenuSelectionDist : 80,
  subMenuOpeningDelay : 10,
  movementsThreshold : 5,
  noviceDwellingTime : 1000/3,
  strokeColor : 'black',
  strokeWidth : 4,
  strokeStartPointRadius : 8,
  notifySteps : false
}
const no_delay = {
  minSelectionDist : 10,
  minMenuSelectionDist : 80,
  subMenuOpeningDelay : 10,
  movementsThreshold : 5,
  noviceDwellingTime : 0,
  strokeColor : 'black',
  strokeWidth : 4,
  strokeStartPointRadius : 8,
  notifySteps : false
}


if (menu2_first_cond) {
  var ITEM_COND = items2;
  ARRAY_TASKS = [IMG_2_1, IMG_2_2, IMG_2_3];
  IMG_TASKS_ARRAY = [IMG_2_1_ARR, IMG_2_2_ARR, IMG_2_3_ARR];
} else {
  var ITEM_COND = items;
  ARRAY_TASKS = [IMG_1_1, IMG_1_2, IMG_1_3];
  IMG_TASKS_ARRAY = [IMG_1_1_ARR, IMG_1_2_ARR, IMG_1_3_ARR];
}

if (CONDITION == "DELAY") {
  OPTIONS = delay;
} else {
  OPTIONS = no_delay;
}
var POSITION;
var start_date;
var end_date;
var right_mouse_down = false;
var left_mouse_down = false;
var is_dragging = false;
var movement_data = [];

$(document).ready(function() {

  POSITION = 0
  if (menu2_first_cond) {
    $('td').removeClass('sky');
    $('td').addClass('white');
    $('td').html('');
    subscribeMainMenu2();
  } else {
    subscribeMainMenu();
  }
 
  $('.tooltip').tooltipster({theme: 'tooltipster-noir'});
  parseData(ARRAY_TASKS[POSITION]);
  createParticipantFile(PARTICIPANT_ID);
});

var imgInfo = {}
const TEXT_CSS_PROPERTIES = ['text-align', 'text-decoration', 'font-weight', 'font-style', 'font-family'];
const SHAPE_CSS_PROPERTIES = ['background-color'];
const TRIANGLE_CSS_PROPERTIES = ['border-bottom'];
const ELEMENT_CSS_PROPERTIES = ['border-color'];
const SVG_CSS_PROPERTIES = ['fill'];
const ITEM_CSS_PROPERTIES = ['left', 'top'];
const ITEM_TRANSFORM_IMG_PROPERTIES = ['-webkit-transform', 'transform'];

const IMG_SIZE = 100;

//var ITEM_COND = items;
//var ITEM_COND = items2;


const mainMenu = MarkingMenu(items, document.getElementById('main'), OPTIONS);
const mainMenu2 = MarkingMenu(items2, document.getElementById('main'), OPTIONS);
const contextMenu = MarkingMenu(contextItems, document.getElementById('main'), OPTIONS);
const shapeContextMenu = MarkingMenu(shapeContextItems, document.getElementById('main'), OPTIONS);
const textContextMenu = MarkingMenu(textContextItems, document.getElementById('main'), OPTIONS);


var mainMenuSubscription;
var mainMenu2Subscription;
var contextMenuSubscription;
var shapeContextMenuSubscription;
var textContextMenuSubscription;

function subscribeMainMenu() {

  mainMenuSubscription = mainMenu.subscribe({
    next(selection) {
    //  end_date = new Date():
      end_date = new Date();

    //   var is_in_joke;
    //   if (IMG_ARRAY.includes(selection.name)) {
    //     is_in_joke = true;
    //   } else {
    //     is_in_joke = false;
    //   }

    // // ms_appear_to_end = (end_date.getTime() - item_appear_date.getTime());
    //   ms_to_select = (end_date.getTime() - start_date.getTime());



      var new_img = $("#"+selection.name).clone(true); 
      if (new_img.hasClass("textbox")) {
        new_img.find('textarea').val("");
      }

      //new_img.attr('value','1');
      selectItem(new_img);

      new_img.insertBefore( $('#end') );
      moveObj(); 
      new_img.show();
      
      //getElementInfo();
      //parseData();
      
      doSelection(selection.name, "Main");

      //getContextMenu(new_img);
      deselectItem(new_img);  
       
        
    },
    error(error) {
      console.error(error);
    }
  });
}

function subscribeMainMenu2() {

  mainMenu2Subscription = mainMenu2.subscribe({
    next(selection) {
    //  end_date = new Date():
      end_date = new Date();

    //   var is_in_joke;
    //   if (IMG_ARRAY.includes(selection.name)) {
    //     is_in_joke = true;
    //   } else {
    //     is_in_joke = false;
    //   }

    // // ms_appear_to_end = (end_date.getTime() - item_appear_date.getTime());
    //   ms_to_select = (end_date.getTime() - start_date.getTime());



      var new_img = $("#"+selection.name).clone(true); 
      if (new_img.hasClass("textbox")) {
        new_img.find('textarea').val("");
      }

      //new_img.attr('value','1');
      selectItem(new_img);

      new_img.insertBefore( $('#end') );
      moveObj(); 
      new_img.show();
      
      //getElementInfo();
      //parseData();
      
      doSelection(selection.name, "Main");

      //getContextMenu(new_img);
      deselectItem(new_img);  
       
        
    },
    error(error) {
      console.error(error);
    }
  });
}

function subscribeContextMenu() {
  contextMenuSubscription = contextMenu.subscribe({
    next(selection) {
      end_date = Date();
      //doSelection(selection.name, "Context");
      var elem = $('[value=1]');
      doContextMenu(selection.name, elem);

      deselectItem(elem);
    },
    error(error) {
      console.error(error);
    }
  });
}

function subscribeShapeContextMenu() {
  shapeContextMenuSubscription = shapeContextMenu.subscribe({
    next(selection) {
      end_date = Date();
      //doSelection(selection.name, "Shape");
      var elem = $('[value=1]');
      doContextMenu(selection.name, elem);

      deselectItem(elem);
    },
    error(error) {
      console.error(error);
    }
  });
}

function subscribeTextContextMenu() {
  textContextMenuSubscription = textContextMenu.subscribe({
    next(selection) {
      end_date = Date();
      //doSelection(selection.name, "Text");
      var elem = $('[value=1]');
      
      doTextContextMenu(selection.name, elem);
      deselectItem(elem);
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

Time data functions

**/

$("#main").on('contextmenu', function(event) {
  start_date = new Date();
  left_mouse_down = false;
  right_mouse_down = true;
});


$("#main").on('mouseup', function(event) {
  setTimeout(function(){
    if (!checkMoveables()) {
      var elem = $('[value=1]');
      deselectItem(elem);
  }
  right_mouse_down = false;
  left_mouse_down = false;
}, 100);
  
 
});

/**

Drawing functions

**/

$("#main").on('mousemove', function(e){
    var time = new Date();
    e.preventDefault();
    if (right_mouse_down) {
      movement_data.push([e.clientX, e.clientY, time]);
    } else if (!checkMoveables() && left_mouse_down) {
      is_dragging = true;
      moveObj();
    } else {
      is_dragging = false;
    }
});

$(".moveable").on('mousedown', function(e){
  e.stopPropagation();
  if (right_mouse_down) {
    left_mouse_down = false;
  } else {
    left_mouse_down = true;
  }
 
  selectItem($(this));
 
});




$("#done").on('click', function (e) {
  getElementInfo();
})

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

function del(elem) {
  //var elem = $('[value=1]');
  elem.attr("value", '0');
  elem.hide();
}

function toFront(elem) {
  //var elem = $('[value=1]');
  elem.attr("value", '0');
  elem.hide();
  var new_img = elem.clone(true); 
  new_img.insertBefore( $('#end') );
  deselectItem(new_img);
  //selectItem(new_img);
  //moveObj();
  new_img.show();
}

function toBack(elem) {
 // var elem = $('[value=1]');
  elem.attr("value", '0');
  elem.hide();
  var new_img = elem.clone(true); 
  new_img.insertAfter( $('#begin') );
  deselectItem(new_img);
  //selectItem(new_img);
  //moveObj();
  new_img.show();

}


function unsubscribeMenu() {
  if (contextMenuSubscription != null) {
    contextMenuSubscription.unsubscribe();
  } 
  if (mainMenuSubscription != null) {
    mainMenuSubscription.unsubscribe();
  }
  if (mainMenu2Subscription != null) {
    mainMenu2Subscription.unsubscribe();
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
  if (menu2_first_cond) {
    subscribeMainMenu2();
  } else {
    subscribeMainMenu();
  }
  
  
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
  
  if (item.hasClass('textbox')) {
    item.addClass('selectedText');
  } else if (item.hasClass('shape')) {
    item.addClass('selectedShape');
  } else {
    item.addClass('selectedItem');
  }
  getContextMenu(item);
}

function deselectItem(item) {
  item.attr('value', 0);
  if (item.hasClass('textbox')) {
    item.removeClass('selectedText');
  } else if (item.hasClass('shape')) {
    item.removeClass('selectedShape');
  } else {
    item.removeClass('selectedItem');
  }
  switchToMainMenu();
}

function doContextMenu(string, elem) {
  switch (string) {
    case "Delete":
      del(elem);
      switchToMainMenu();
      break;
    case "To Front":
      toFront(elem);
      break;
    case "To Back":
      toBack(elem);
      break;
    case "90":
      rotate(90, elem);
      break;
    case "180":
      rotate(180, elem);
      break;
    case "270":
      rotate(270, elem);
      break;
    default:
      changeColour(string, elem);
      break;
  }
}

function doTextContextMenu(string, elem) {

  if (string == "Left" || string == "Right" || string == "Center") {
    changeAlignment(string, elem);
  } else if (string == "Bold"  || string == "Italic" || string == "Underline" || string == "Normal") {
    changeStyle(string, elem);
  } else if (string == "Delete") {
    del(elem);
    switchToMainMenu();
  } else if (string == "Helvetica" || "Comic Sans" || "Impact" || "Courier") {
    changeFont(string, elem);
  }
}


function getContextMenu(item) {
  if (item.hasClass('shape') || item.hasClass('elements') || item.hasClass('svgElement')) {
    switchToShapeContextMenu();
  } else if (item.hasClass('textbox')) {
    switchToTextContextMenu();
  } else {
    switchToContextMenu();
  }
}



function changeColour(arg, elem) {
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
    case "Red":
      colour = "#FF0000";
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
  //var elem = $('[value=1]');
  if (elem.attr('id') == "Triangle") {
    elem.find( ".tri" ).css( "border-bottom", "100px solid " + colour );
  } else if (elem.hasClass('svgElement')) {
    elem.find('svg').css("fill",colour);
  } else if (elem.hasClass('elements')) {
    elem.children().css("border-color", colour);
  } else {
    elem.css( "background-color", colour );
  }
}

function changeAlignment(arg, item) {
  var alignment = arg.toLowerCase();
  var elem = item.find('textarea');
  elem.css( "text-align", alignment);
}

function changeStyle(arg, item) {
  var style = arg.toLowerCase();
  var elem = item.find('textarea');
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

function changeFont(arg, item) {
  var elem = item.find('textarea');
  if (arg == "Comic Sans") {
    elem.css('font-family', 'Comic Sans MS');
  } else {
    elem.css('font-family', arg);
  }
}

function rotate(degrees, item) {
  var matrix = item.find('img').css('transform');
  var angle = 0;
  var m = []
  if ((matrix != "none")) {
    degrees = degrees + getAngle(matrix);
  }
  //console.log(getAngle(item.find('img').css('transform')));
  item.find('img').css({
  '-webkit-transform' : 'rotate('+degrees+'deg)',
     '-moz-transform' : 'rotate('+degrees+'deg)',  
      '-ms-transform' : 'rotate('+degrees+'deg)',  
       '-o-transform' : 'rotate('+degrees+'deg)',  
          'transform' : 'rotate('+degrees+'deg)',  
               
    });
  item.find('img').val(degrees);
}

// function transform(item, degrees, x, y) {
//   var matrix = item.find('img').css('transform');
//   var m = [1,1];
//   if (matrix != "none") {
//     var info = getMatrixInfo(matrix);
//     m[1] = parseInt(info[1]);
//     m[0] = parseInt(info[2]);
//     degrees = info[0] + degrees;
//   }

  
//   // if( $("#test").css('transform').toLowerCase() == 'block') {

//   // } else {
//   x = parseInt(x);
//   y = parseInt(y);
//   var scaleX = parseInt(x)*parseInt(m[0]);
//   var scaleY = parseInt(y)*parseInt(m[1]);
//   // }
//   item.find('img').css({
//     'transform': 'scale(' + scaleX + ',' + scaleY + ') '+'rotate('+degrees+'deg)',
//     '-moz-transform': 'scale(' + scaleX + ',' + scaleY + ') '+'rotate('+degrees+'deg)',
//     '-webkit-transform': 'scale(' + scaleX + ',' + scaleY + ') '+'rotate('+degrees+'deg)',
//     '-o-transform': 'scale(' + scaleX + ',' + scaleY + ') '+'rotate('+degrees+'deg)',
//     '-khtml-transform': 'scale(' + scaleX + ',' + scaleY + ') '+'rotate('+degrees+'deg)',
//     '-ms-transform': 'scale(' + scaleX + ',' + scaleY + ') '+'rotate('+degrees+'deg)'
//   });
// }


function getAngle(matrix) {
  var values = matrix.split('(')[1].split(')')[0].split(',');
  var a = values[0];
  var b = values[1];
  var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
  return angle;
}

function getMatrixInfo(matrix) {
  var values = matrix.split('(')[1].split(')')[0].split(',');
  var a = values[0];
  var b = values[1];
  var c = values[2];
  var d = values[3];
  var m = []
  if (Math.abs(values[0]) == 1) {
    m[0] = values[0];
  } else {
    m[0] = values[1];
  }
  if (Math.abs(values[2]) == 1) {
    m[1] = values[2];
  } else {
    m[1] = values[3];
  }

  //var scale = Math.sqrt(a*a + b*b);
  var scale = [a, b, c, d];
  var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));

  return [angle, m[0], m[1]];
}

function switchExperiment() {
  // test which condition
  // change menu based on menu there
  if (ITEM_COND[0].name == "Animals") {
    $('td').removeClass('sky');
    $('td').addClass('white');
    $('td').html('');
    ITEM_COND = items2;
  } else {
    $('td').removeClass('white');
    $('td').addClass('sky');
    $('td').html('<div class="grass"></div>');
    ITEM_COND = items;
  }

}


function getElementInfo() {

  var dict = [];
  $( ".moveable" ).each(function() {
    //if ($(this).hasClass())
    if ($(this).is(':visible')) {

      $(this).hide();
      var obj = {}
      obj["id"] = $(this).attr('id');
      obj["css_item"] = $(this).css(ITEM_CSS_PROPERTIES);
      obj["rotation"] = $(this).find('img').val();
      //console.log($(this).find('img').val());
     // console.log($(this).attr('id'));
      //console.log(JSON.stringify($(this).css(ITEM_CSS_PROPERTIES)));
      
      if ($(this).hasClass('textbox')) {  

        obj["css_textarea"] = $(this).find('textarea').css(TEXT_CSS_PROPERTIES);
        if (obj["css_textarea"]['font-family'] == "\"Comic Sans MS\"") {
          obj["css_textarea"]['font-family'] = "Comic Sans MS";
        }
        obj["text_textarea"] = $(this).find('textarea').val();
        //console.log(JSON.stringify($(this).find('textarea').css(TEXT_CSS_PROPERTIES)));

      } else if ($(this).hasClass('triangle')) {

         obj["css_tri"] = $(this).find('.tri').css(TRIANGLE_CSS_PROPERTIES);
        //console.log(JSON.stringify($(this).find('.tri').css(TRIANGLE_CSS_PROPERTIES)));

      } else if ($(this).hasClass('shape')) {

        obj["css_shape"] = $(this).css(SHAPE_CSS_PROPERTIES);
        //console.log(JSON.stringify($(this).css(SHAPE_CSS_PROPERTIES)));

      } else if ($(this).hasClass('elements')) {
        obj["css_element"] = $(this).children().css(ELEMENT_CSS_PROPERTIES);
      } else if ($(this).hasClass('svgElement')) {
        obj["css_svg"] = $(this).find('svg').css(SVG_CSS_PROPERTIES);
      } 


      //console.log(JSON.stringify(obj));
      dict.push(obj);
     
    }
  });

  sendItemData(JSON.stringify(dict));

  // IMG = JOKE_2;
  // IMG_ARRAY = JOKE_2_ARR;
  // if (POSITION == )
  // menu2_first_cond = !menu2_first_cond;
  // switchToMainMenu();
  // switchExperiment();

  
  // console.log(JSON.stringify(dict.slice(0, 15)));
  // console.log(JSON.stringify(dict.slice(15, dict.length)));
  console.log(JSON.stringify(dict));
  POSITION = POSITION + 1;
  if (POSITION < 4) {
    parseData(ARRAY_TASKS[POSITION]);
  }
  //parseData(JSON.stringify(dict));
}

function parseData(data) {
  //console.log("do we enter");
  //var data = '[{"id":"Square","css_item":{"left":"182px","top":"5px"},"css_shape":{"background-color":"rgb(128, 212, 255)"}}]';
  //var data = '[{"id":"Square","css_item":{"left":"182px","top":"5px"},"css_shape":{"background-color":"rgb(128, 212, 255)"}},{"id":"Rectangle","css_item":{"left":"182px","top":"205px"},"css_shape":{"background-color":"rgb(0, 153, 0)"}},{"id":"Square","css_item":{"left":"490px","top":"5px"},"css_shape":{"background-color":"rgb(128, 212, 255)"}},{"id":"Rectangle","css_item":{"left":"490px","top":"205px"},"css_shape":{"background-color":"rgb(0, 153, 0)"}},{"id":"Square","css_item":{"left":"798px","top":"5px"},"css_shape":{"background-color":"rgb(128, 212, 255)"}},{"id":"Rectangle","css_item":{"left":"798px","top":"205px"},"css_shape":{"background-color":"rgb(0, 153, 0)"}},{"id":"Rectangle","css_item":{"left":"182px","top":"140px"},"css_shape":{"background-color":"rgb(102, 102, 102)"}},{"id":"Man","css_item":{"left":"198px","top":"207.5px"}},{"id":"Rectangle","css_item":{"left":"490px","top":"139px"},"css_shape":{"background-color":"rgb(102, 102, 102)"}},{"id":"Rectangle","css_item":{"left":"798px","top":"139px"},"css_shape":{"background-color":"rgb(102, 102, 102)"}},{"id":"Man","css_item":{"left":"508px","top":"207.5px"}},{"id":"Man","css_item":{"left":"808px","top":"207.5px"}}]';
  
  var parsedData = JSON.parse(data);
  //console.log(data);
  for (var i = 0; i < parsedData.length; i++) {
    var css_item = parsedData[i]['css_item'];
    //console.log(JSON.stringify(css_item));

    var new_img = $("#"+parsedData[i]['id']).clone(true); 
    new_img.css({
      left:  css_item['left'],
      top:   css_item['top']
    });
    var degrees = parsedData[i]["rotation"];
    new_img.find('img').css({
  '-webkit-transform' : 'rotate('+degrees+'deg)',
     '-moz-transform' : 'rotate('+degrees+'deg)',  
      '-ms-transform' : 'rotate('+degrees+'deg)',  
       '-o-transform' : 'rotate('+degrees+'deg)',  
          'transform' : 'rotate('+degrees+'deg)',  
               
    });
    new_img.find('img').val(degrees);

    if (parsedData[i]["css_textarea"] != null) {
      var css_textarea = parsedData[i]["css_textarea"];
      var text_textarea = parsedData[i]["text_textarea"];
      //console.log(JSON.stringify(css_textarea));
      new_img.find('textarea').css({
        'text-align': css_textarea['text-align'],
        'text-decoration':   css_textarea['text-decoration'],
        'font-family':    css_textarea['font-family'],
        'font-style':   css_textarea['font-style'],
        'font-weight':  css_textarea['font-weight']
      });
      new_img.find('textarea').val(text_textarea);

    } else if (parsedData[i]["css_tri"] != null) {
      var css_tri = parsedData[i]["css_tri"];
      //console.log(JSON.stringify(css_tri));

      new_img.find('.tri').css({
        'border-bottom': css_tri['border-bottom']
      });

    } else if (parsedData[i]["css_shape"] != null) {
      var css_shape = parsedData[i]["css_shape"];
      //console.log(JSON.stringify(css_shape));
      new_img.css({
        'background-color': css_shape['background-color']
      });

    } else if (parsedData[i]["css_element"] != null) {
      var css_element = parsedData[i]["css_element"];

      new_img.children().css({
        'border-color': css_element['border-color']
      });
    } else if (parsedData[i]["css_svg"] != null) {
      var css_svg = parsedData[i]["css_svg"];
      new_img.find('svg').css({
        'fill' : css_svg['fill']
      });
    }

    new_img.insertBefore( $('#end'));
    new_img.show();
  }
}


function doSelection(item, menu) {

  var is_in_joke;
  if (IMG_TASKS_ARRAY[POSITION].includes(item)) {
    is_in_joke = true;
  } else {
    is_in_joke = false;
  }

  var ms_to_select = (end_date.getTime() - start_date.getTime());

  sendData(createData(menu, ms_to_select, item, is_in_joke, movement_data));
  movement_data = [];
}


function createData(which_menu, time_down_to_select, item_selected, is_in_joke, movement_data) {

  var json_data = 
  {
    delay_cond: CONDITION,
    which_joke: IMG_TASKS_ARRAY[POSITION][0],
    which_menu: which_menu,
    time_down_to_select: time_down_to_select,
    item_selected: item_selected,
    is_in_joke: is_in_joke,
    movement_data: movement_data

    // exp_cond: condition,
    // mm_array_first_item: mm_array_first_item,
    // block_num: block_num,
    // delay_cond: delay_cond.noviceDwellingTime,
    // time_appear_to_select: time_appear_select,
    // time_to_select: time_select,
    // correct_select: correct_bool,
    // movement_data: movement
  };

  return JSON.stringify(json_data);
}


function sendData(data) {
    $.ajax({
    type: "POST",
    url: "/append_data",
    data: {data: data},
    success: function(data) {
    },
    error: function(jqXHR, textStatus, err) {
    //   console.log('text status '+textStatus+', err '+err)
    }
  });
}

function sendItemData(data) {
    $.ajax({
    type: "POST",
    url: "/complete",
    data: {data: data},
    success: function(data) {
    },
    error: function(jqXHR, textStatus, err) {
    //   console.log('text status '+textStatus+', err '+err)
    }
  });
}

function createParticipantFile(p_id) {
  $.ajax({
    type: "POST",
    url: "/create",
    data: {p_id: p_id},
    success: function(data) {
    },
    error: function(jqXHR, textStatus, err) {
    //  console.log('text status '+textStatus+', err '+err)
    }
  });
  $.ajax({
    type: "POST",
    url: "/create_item_data",
    data: {p_id: p_id},
    success: function(data) {
    },
    error: function(jqXHR, textStatus, err) {
    //  console.log('text status '+textStatus+', err '+err)
    }
  });
}

