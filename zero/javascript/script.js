'use strict';


/**

On load, subscribe main menu

**/

var PARTICIPANT_ID = "P01";
var CONDITION = "DELAY";
//var CONDITION = "NO_DELAY"
var JOKE = JOKE_1;
var JOKE_ARRAY = JOKE_1_ARR;


var start_date;
var end_date;
var right_mouse_down = false;
var left_mouse_down = false;
var is_dragging = false;
var movement_data = [];

$(document).ready(function() {
  subscribeMainMenu();
  $('.tooltip').tooltipster({theme: 'tooltipster-noir'});
  parseData(JOKE);
});

var imgInfo = {}
const TEXT_CSS_PROPERTIES = ['text-align', 'text-decoration', 'font-weight', 'font-style', 'font-family'];
const SHAPE_CSS_PROPERTIES = ['background-color'];
const TRIANGLE_CSS_PROPERTIES = ['border-bottom'];
const ITEM_CSS_PROPERTIES = ['left', 'top'];

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
    //  end_date = new Date():
      end_date = new Date();

    //   var is_in_joke;
    //   if (JOKE_ARRAY.includes(selection.name)) {
    //     is_in_joke = true;
    //   } else {
    //     is_in_joke = false;
    //   }

    // // ms_appear_to_end = (end_date.getTime() - item_appear_date.getTime());
    //   ms_to_select = (end_date.getTime() - start_date.getTime());



      var new_img = $("#"+selection.name).clone(true); 
      if (new_img.hasClass("textpanel")) {
        new_img.find('textarea').val("");
      }

      //new_img.attr('value','1');
      selectItem(new_img);

      new_img.insertBefore( $('#end') );
      moveObj(); 
      new_img.show();
      
      //getElementInfo();
      //parseData();
      
      //doSelection(selection.name, "Main");

      //getContextMenu(new_img);
        
       
        
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
      end_date = Date();
      //doSelection(selection.name, "Shape");
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
      end_date = Date();
      //doSelection(selection.name, "Text");
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

Time data functions

**/

$("#main").on('contextmenu', function(event) {
  start_date = new Date();
  left_mouse_down = false;
  right_mouse_down = true;
});
// $("#main").onmousemove = function(event) {
//   alert("made it");
//   var time = new Date();
//   if (right_mouse_down) {
//     movement_data.push([event.clientX, event.clientY, time]);
//   }
// };
$("#main").on('mouseup', function(event) {
  right_mouse_down = false;
  left_mouse_down = false;
});

$("#main").on('click', function(e) {
    if (!checkMoveables()) {
      var elem = $('[value=1]');
      deselectItem(elem);
    }
});    //showTrash();

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

$(".moveable").on('click', function(e){
  e.stopPropagation();
  if ($(this).attr('value') == '1' && (!is_dragging)) {

    deselectItem($(this));
    //hideTrash();
  } else {
    if (!checkMoveables()) {

      var elem = $('[value=1]');
      deselectItem(elem);
      //showTrash();
    }
    selectItem($(this));
  }
});


$(".moveable").on('mousedown', function(e) {
  if (right_mouse_down) {
    left_mouse_down = false;
  } else {
    left_mouse_down = true;
  }
  
  // if (checkMoveables()) {
  //   selectItem($(this));
  //     //showTrash();
  // }
});

$(".moveable").on('mouseup', function(e) {
  left_mouse_down = false;
//   if ($(this).attr('value') == '1') {

//     deselectItem($(this));
//     //hideTrash();
//   }
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
  
  if (item.hasClass('textpanel')) {
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
  if (item.hasClass('textpanel')) {
    item.removeClass('selectedText');
  } else if (item.hasClass('shape')) {
    item.removeClass('selectedShape');
  } else {
    item.removeClass('selectedItem');
  }
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
  } else if (string == "Helvetica" || "Comic Sans" || "Impact" || "Courier") {
    changeFont(string);
  }
}


function getContextMenu(item) {
  if (item.hasClass('shape')) {
    switchToShapeContextMenu();
  } else if (item.hasClass('textpanel')) {
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
    elem.css('font-family', 'Comic Sans MS');
  } else {
    elem.css('font-family', arg);
  }
}

function getElementInfo() {

  var dict = [];
  $( ".moveable" ).each(function() {
    //if ($(this).hasClass())
    if ($(this).is(':visible')) {

      var obj = {}
      obj["id"] = $(this).attr('id');
      obj["css_item"] = $(this).css(ITEM_CSS_PROPERTIES);
     // alert($(this).attr('id'));
      //alert(JSON.stringify($(this).css(ITEM_CSS_PROPERTIES)));
      
      if ($(this).hasClass('textpanel')) {  

        obj["css_textarea"] = $(this).find('textarea').css(TEXT_CSS_PROPERTIES);
        obj["text_textarea"] = $(this).find('textarea').val();
        //alert(JSON.stringify($(this).find('textarea').css(TEXT_CSS_PROPERTIES)));

      } else if ($(this).hasClass('triangle')) {

         obj["css_tri"] = $(this).find('.tri').css(TRIANGLE_CSS_PROPERTIES);
        //alert(JSON.stringify($(this).find('.tri').css(TRIANGLE_CSS_PROPERTIES)));

      } else if ($(this).hasClass('shape')) {

        obj["css_shape"] = $(this).css(SHAPE_CSS_PROPERTIES);
        //alert(JSON.stringify($(this).css(SHAPE_CSS_PROPERTIES)));

      }

      //alert(JSON.stringify(obj));
      dict.push(obj);
     
    }
  });

  alert(JSON.stringify(dict.slice(0, 15)));
  alert(JSON.stringify(dict.slice(15, dict.length)));

  //parseData(JSON.stringify(dict));
}

function parseData(data) {
  //alert("do we enter");
  //var data = '[{"id":"Square","css_item":{"left":"182px","top":"5px"},"css_shape":{"background-color":"rgb(128, 212, 255)"}}]';
  //var data = '[{"id":"Square","css_item":{"left":"182px","top":"5px"},"css_shape":{"background-color":"rgb(128, 212, 255)"}},{"id":"Rectangle","css_item":{"left":"182px","top":"205px"},"css_shape":{"background-color":"rgb(0, 153, 0)"}},{"id":"Square","css_item":{"left":"490px","top":"5px"},"css_shape":{"background-color":"rgb(128, 212, 255)"}},{"id":"Rectangle","css_item":{"left":"490px","top":"205px"},"css_shape":{"background-color":"rgb(0, 153, 0)"}},{"id":"Square","css_item":{"left":"798px","top":"5px"},"css_shape":{"background-color":"rgb(128, 212, 255)"}},{"id":"Rectangle","css_item":{"left":"798px","top":"205px"},"css_shape":{"background-color":"rgb(0, 153, 0)"}},{"id":"Rectangle","css_item":{"left":"182px","top":"140px"},"css_shape":{"background-color":"rgb(102, 102, 102)"}},{"id":"Man","css_item":{"left":"198px","top":"207.5px"}},{"id":"Rectangle","css_item":{"left":"490px","top":"139px"},"css_shape":{"background-color":"rgb(102, 102, 102)"}},{"id":"Rectangle","css_item":{"left":"798px","top":"139px"},"css_shape":{"background-color":"rgb(102, 102, 102)"}},{"id":"Man","css_item":{"left":"508px","top":"207.5px"}},{"id":"Man","css_item":{"left":"808px","top":"207.5px"}}]';
  
  var parsedData = JSON.parse(data);
  //alert(data);
  for (var i = 0; i < parsedData.length; i++) {
    var css_item = parsedData[i]['css_item'];
    //alert(JSON.stringify(css_item));

    var new_img = $("#"+parsedData[i]['id']).clone(true); 
    new_img.css({
      left:  css_item['left'],
      top:   css_item['top']
    });

    if (parsedData[i]["css_textarea"] != null) {
      var css_textarea = parsedData[i]["css_textarea"];
      var text_textarea = parsedData[i]["text_textarea"];
      //alert(JSON.stringify(css_textarea));
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
      //alert(JSON.stringify(css_tri));

      new_img.find('.tri').css({
        'border-bottom': css_tri['border-bottom']
      });

    } else if (parsedData[i]["css_shape"] != null) {
      var css_shape = parsedData[i]["css_shape"];
      //alert(JSON.stringify(css_shape));
      new_img.css({
        'background-color': css_shape['background-color']
      });

    }

    new_img.insertBefore( $('#end'));
    new_img.show();
  }
}



function doSelection(item, menu) {

  var is_in_joke;
  if (JOKE_ARRAY.includes(item)) {
    is_in_joke = true;
  } else {
    is_in_joke = false;
  }

  var ms_to_select = (end_date.getTime() - start_date.getTime());

  alert(createData(menu, ms_to_select, item, is_in_joke, movement_data));
  movement_data = [];
}


function createData(which_menu, time_down_to_select, item_selected, is_in_joke, movement_data) {

  var json_data = 
  {
    delay_cond: CONDITION,
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
    //   alert('text status '+textStatus+', err '+err)
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
    //  alert('text status '+textStatus+', err '+err)
    }
  });
}

