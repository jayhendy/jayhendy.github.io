'use strict';

const NUM_SELECTIONS = 1;
const BLOCKS_PER_COND = 10;

var mm_item_array = [];
var menu_cond = [];

var array_index = 0;


var count = 0;
var participant = "";
var condition = "";

var attempt = 1;

var option = [];

var item_to_select;
var prev_item_to_select;
var correct;
var mouse_down;


var item_appear_date;
var start_date;
var end_date;
var ms_appear_to_end;
var ms_to_select;
var movement_data = [];

var block_num = 0;

// where you started
// get the coordinates and store them to show the main menu there 
// where you are now
// get the item your stroke indicated
// open submenu
// mouseup remove the submenu

$( function() {
  $( "#dialog-confirm" ).dialog({
    resizable: false,
    height: "auto",
    width: 400,
    modal: true,
    buttons: {
      "Begin": function() {
        $( this ).dialog( "close" );
        upload_experiment();
      },
    }
  });
});

function openDialog() {
  if (array_index < mm_item_array.length) {
    $( function() {
      $( "#dialog-message" ).dialog({
        title: "Continue?",
        modal: true,
        buttons: {
          Ok: function() {
            $( this ).dialog( "close" );
          }
        }
      });
    });
  } else {
    $( function() {
      $( "#dialog-message" ).dialog({
        title: "Finished",
        modal: true,
        buttons: {
          Ok: function() {
            $( this ).dialog( "close" );
          }
        }
      });
    });
  }
}

function upload_experiment() {
  participant = document.querySelector('[name="participant"]').value;
  condition = document.querySelector('[name="condition"]').value;
  createParticipantFile(participant);
  setup(condition)
}

var main = document.getElementById('main');
main.onmousedown = function(event) {
  start_date = new Date();
  mouse_down = true;
  var time = new Date();
  movement_data.push(['MOUSE_DOWN', event.clientX, event.clientY, time, attempt]);
};
main.onmousemove = function(event) {
  var time = new Date();
  if (mouse_down) {
    movement_data.push(['MOUSE_DRAG', event.clientX, event.clientY, time, attempt]);
  }
};
main.onmouseup = function(event) {
  mouse_down = false;
  var time = new Date();
  movement_data.push(['MOUSE_UP', event.clientX, event.clientY, time, attempt]);
  attempt = attempt + 1;
};



function createArray(item_dict, num) {
  var array;
  if (item_dict == MENU_1_4x4) {
    array = MENU_1_4x4_ARRAY;
  } else if (item_dict == MENU_2_4x4) {
    array = MENU_2_4x4_ARRAY;
  } else if (item_dict == MENU_1_8x8) {
    array = MENU_1_8x8_ARRAY;
  } else if (item_dict == MENU_2_8x8) {
    array = MENU_2_8x8_ARRAY;
  } else {
    array = item_dict;
  }



  var final_array = [];
  for (var i = 0; i < array.length; i++) {
      for (var k = 0; k < num; k++) {
        final_array.push(array[i]);
      }
  }
  return final_array;
} 




const delay = {
  minSelectionDist : 10,
  minMenuSelectionDist : 80,
  subMenuOpeningDelay : 200,
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

function setup(cond) {
  mouse_down = false;
  // test condition
  if (cond.substring(0,1) == "D") {
    option[0] = delay;
    option[1] = no_delay;
  } else if (cond.substring(0,1) == "Z") {
    option[0] = no_delay;
    option[1] = delay;
    
  } else {
    alert("Please restart. Arguments were not correctly entered");

  }
    
  if (cond.substring(1) == "1") {

    mm_item_array.push(MENU_1_4);
    mm_item_array.push(MENU_1_8);
    mm_item_array.push(MENU_1_4x4);
    mm_item_array.push(MENU_1_8x8);

    mm_item_array.push(MENU_2_4);
    mm_item_array.push(MENU_2_8);
    mm_item_array.push(MENU_2_4x4);
    mm_item_array.push(MENU_2_8x8);

    menu_cond.push('MENU_1_4');
    menu_cond.push('MENU_1_8');
    menu_cond.push('MENU_1_4x4');
    menu_cond.push('MENU_1_8x8');

    menu_cond.push('MENU_2_4');
    menu_cond.push('MENU_2_8');
    menu_cond.push('MENU_2_4x4');
    menu_cond.push('MENU_2_8x8');

  } else if (cond.substring(1) == "2") {
    
    mm_item_array.push(MENU_1_8);
    mm_item_array.push(MENU_1_4x4);
    mm_item_array.push(MENU_1_8x8);
    mm_item_array.push(MENU_1_4);

    mm_item_array.push(MENU_2_8);
    mm_item_array.push(MENU_2_4x4);
    mm_item_array.push(MENU_2_8x8);
    mm_item_array.push(MENU_2_4);

    menu_cond.push('MENU_1_8');
    menu_cond.push('MENU_1_4x4');
    menu_cond.push('MENU_1_8x8');
    menu_cond.push('MENU_1_4');

    menu_cond.push('MENU_2_8');
    menu_cond.push('MENU_2_4x4');
    menu_cond.push('MENU_2_8x8');
    menu_cond.push('MENU_2_4');

  } else if (cond.substring(1) == "3") {

    mm_item_array.push(MENU_1_4x4);
    mm_item_array.push(MENU_1_8x8);
    mm_item_array.push(MENU_1_4);
    mm_item_array.push(MENU_1_8);

    mm_item_array.push(MENU_2_4x4);
    mm_item_array.push(MENU_2_8x8);
    mm_item_array.push(MENU_2_4);
    mm_item_array.push(MENU_2_8);

    menu_cond.push('MENU_1_4x4');
    menu_cond.push('MENU_1_8x8');
    menu_cond.push('MENU_1_4');
    menu_cond.push('MENU_1_8');

    menu_cond.push('MENU_2_4x4');
    menu_cond.push('MENU_2_8x8');
    menu_cond.push('MENU_2_4');
    menu_cond.push('MENU_2_8');
    
  } else if (cond.substring(1) == "4") {
    
    mm_item_array.push(MENU_1_8x8);
    mm_item_array.push(MENU_1_4);
    mm_item_array.push(MENU_1_8);
    mm_item_array.push(MENU_1_4x4);
   
    mm_item_array.push(MENU_2_8x8);
    mm_item_array.push(MENU_2_4);
    mm_item_array.push(MENU_2_8);
    mm_item_array.push(MENU_2_4x4);

    menu_cond.push('MENU_1_8x8');
    menu_cond.push('MENU_1_4');
    menu_cond.push('MENU_1_8');
    menu_cond.push('MENU_1_4x4');
   
    menu_cond.push('MENU_2_8x8');
    menu_cond.push('MENU_2_4');
    menu_cond.push('MENU_2_8');
    menu_cond.push('MENU_2_4x4');

  } else if (cond.substring(1) == "5") {

    mm_item_array.push(MENU_2_4);
    mm_item_array.push(MENU_2_8);
    mm_item_array.push(MENU_2_4x4);
    mm_item_array.push(MENU_2_8x8);

    mm_item_array.push(MENU_1_4);
    mm_item_array.push(MENU_1_8);
    mm_item_array.push(MENU_1_4x4);
    mm_item_array.push(MENU_1_8x8);

    menu_cond.push('MENU_2_4');
    menu_cond.push('MENU_2_8');
    menu_cond.push('MENU_2_4x4');
    menu_cond.push('MENU_2_8x8');

    menu_cond.push('MENU_1_4');
    menu_cond.push('MENU_1_8');
    menu_cond.push('MENU_1_4x4');
    menu_cond.push('MENU_1_8x8');

  } else if (cond.substring(1) == "6") {

    mm_item_array.push(MENU_2_8);
    mm_item_array.push(MENU_2_4x4);
    mm_item_array.push(MENU_2_8x8);
    mm_item_array.push(MENU_2_4);
    
    mm_item_array.push(MENU_1_8);
    mm_item_array.push(MENU_1_4x4);
    mm_item_array.push(MENU_1_8x8);
    mm_item_array.push(MENU_1_4);

    menu_cond.push('MENU_2_8');
    menu_cond.push('MENU_2_4x4');
    menu_cond.push('MENU_2_8x8');
    menu_cond.push('MENU_2_4');
    
    menu_cond.push('MENU_1_8');
    menu_cond.push('MENU_1_4x4');
    menu_cond.push('MENU_1_8x8');
    menu_cond.push('MENU_1_4');

  } else if (cond.substring(1) == "7") {

    mm_item_array.push(MENU_2_4x4);
    mm_item_array.push(MENU_2_8x8);
    mm_item_array.push(MENU_2_4);
    mm_item_array.push(MENU_2_8);
    
    mm_item_array.push(MENU_1_4x4);
    mm_item_array.push(MENU_1_8x8);
    mm_item_array.push(MENU_1_4);
    mm_item_array.push(MENU_1_8);

    menu_cond.push('MENU_2_4x4');
    menu_cond.push('MENU_2_8x8');
    menu_cond.push('MENU_2_4');
    menu_cond.push('MENU_2_8');
    
    menu_cond.push('MENU_1_4x4');
    menu_cond.push('MENU_1_8x8');
    menu_cond.push('MENU_1_4');
    menu_cond.push('MENU_1_8');

  } else if (cond.substring(1) == "8") {

    mm_item_array.push(MENU_2_8x8);
    mm_item_array.push(MENU_2_4);
    mm_item_array.push(MENU_2_8);
    mm_item_array.push(MENU_2_4x4);
   
    mm_item_array.push(MENU_1_8x8);
    mm_item_array.push(MENU_1_4);
    mm_item_array.push(MENU_1_8);
    mm_item_array.push(MENU_1_4x4);
   
    menu_cond.push('MENU_2_8x8');
    menu_cond.push('MENU_2_4');
    menu_cond.push('MENU_2_8');
    menu_cond.push('MENU_2_4x4');
   
    menu_cond.push('MENU_1_8x8');
    menu_cond.push('MENU_1_4');
    menu_cond.push('MENU_1_8');
    menu_cond.push('MENU_1_4x4');

  } else {
    alert("Please restart. Arguments were not correctly entered");

  }

  subscribeMenu(MarkingMenu(mm_item_array[array_index], document.getElementById('main'), option[0]), createArray(mm_item_array[array_index], NUM_SELECTIONS));
  
  
}




function getItemToSelect(item_array) {
  var item = prev_item_to_select;
  while (item == prev_item_to_select) {
    var index = Math.floor((Math.random() * item_array.length));
    item = item_array[index];
  }
  
  item_array.splice(index, 1);
  prev_item_to_select = item;

  return item;
}

// Create the toast to display selections.
var toSelectMessage = (function(dom) {
  return function(item_array) {
    item_to_select = getItemToSelect(item_array);
    dom.innerHTML = "Select: " + item_to_select;
    dom.classList.add('shown');
    item_appear_date = new Date();
  };
})(document.getElementById('to-select'));

//toSelectMessage

// Create the toast to display selections.
var toastMessage = (function(dom) {
  var timeoutId = null;
  return function(message, correct) {
    clearTimeout(timeoutId);
    
    if (correct == 1) {
      dom.style.backgroundColor = "#33FF33";
      dom.innerHTML = "&#10004; " + message;
    } else {
      dom.style.backgroundColor = "Red";
      dom.innerHTML = "X " + message;
    }
    //dom.innerHTML = message;
    dom.classList.add('shown');
    timeoutId = setTimeout(function() {
      dom.classList.remove('shown');
    }, 1000);
    count = count + 1;
  };
})(document.getElementById('toast'));




/**
*
* Recursive method to subscribe the menu
*
**/
function subscribeMenu(mm, mm_array) {

  toSelectMessage(mm_array);
  
  // Toast the marking menu's selections.
  mm.subscribe({
    next(selection) {
      end_date = new Date();

      
      if (selection.name == item_to_select) {
        correct = 1;
      } else {
        correct = 0;
      }
      toastMessage(selection.name, correct);
      ms_appear_to_end = (end_date.getTime() - item_appear_date.getTime());
      ms_to_select = (end_date.getTime() - start_date.getTime());
      if (array_index < 4) {
        sendData(createData(option[0], menu_cond[array_index], ms_appear_to_end,ms_to_select,correct, movement_data));
      } else {
        sendData(createData(option[1], menu_cond[array_index], ms_appear_to_end,ms_to_select,correct, movement_data));
      }
      movement_data = [];
      attempt = 1;
      if (mm_array.length == 0) {
        
        this.unsubscribe();
        block_num = block_num + 1;

  
        if ((block_num % BLOCKS_PER_COND) != 0) {
          if (array_index < 4) {
            subscribeMenu(MarkingMenu(mm_item_array[array_index], document.getElementById('main'), option[0]), 
              createArray(mm_item_array[array_index], NUM_SELECTIONS));
          } else {
            subscribeMenu(MarkingMenu(mm_item_array[array_index], document.getElementById('main'), option[1]), 
              createArray(mm_item_array[array_index], NUM_SELECTIONS));
          }
        } else {
        
          array_index = array_index + 1;
          
          if (array_index < mm_item_array.length) {
            
            openDialog();

            if (array_index < 4) {
              subscribeMenu(MarkingMenu(mm_item_array[array_index], document.getElementById('main'), option[0]), 
                createArray(mm_item_array[array_index], NUM_SELECTIONS));
            } else {
              subscribeMenu(MarkingMenu(mm_item_array[array_index], document.getElementById('main'), option[1]), 
                createArray(mm_item_array[array_index], NUM_SELECTIONS));
            }
            
          } else {
            openDialog();
          }
        } 
      } else {
        toSelectMessage(mm_array);
      }
      
    },
    error(error) {
      console.error(error);
    },
    complete() {
      console.log("Complete");
    }
  });
}




function createData(delay_cond, mm_array_first_item, time_appear_select, time_select, correct_bool, movement) {


  var json_data = 
  {
    exp_cond: condition,
    mm_array_first_item: mm_array_first_item,
    block_num: block_num,
    delay_cond: delay_cond.noviceDwellingTime,
    time_appear_to_select: time_appear_select,
    time_to_select: time_select,
    correct_select: correct_bool,
    movement_data: movement
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




/*
*
* Get time difference between item to select appears 
*
*/


// default
// var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
//       _ref$minSelectionDist = _ref.minSelectionDist,
//       minSelectionDist = _ref$minSelectionDist === undefined ? 40 : _ref$minSelectionDist,
//       _ref$minMenuSelection = _ref.minMenuSelectionDist,
//       minMenuSelectionDist = _ref$minMenuSelection === undefined ? 80 : _ref$minMenuSelection,
//       _ref$subMenuOpeningDe = _ref.subMenuOpeningDelay,
//       subMenuOpeningDelay = _ref$subMenuOpeningDe === undefined ? 25 : _ref$subMenuOpeningDe,
//       _ref$movementsThresho = _ref.movementsThreshold,
//       movementsThreshold = _ref$movementsThresho === undefined ? 5 : _ref$movementsThresho,
//       _ref$noviceDwellingTi = _ref.noviceDwellingTime,
//       noviceDwellingTime = _ref$noviceDwellingTi === undefined ? 1000 / 3 : _ref$noviceDwellingTi,
//       _ref$strokeColor = _ref.strokeColor,
//       strokeColor = _ref$strokeColor === undefined ? 'black' : _ref$strokeColor,
//       _ref$strokeWidth = _ref.strokeWidth,
//       strokeWidth = _ref$strokeWidth === undefined ? 4 : _ref$strokeWidth,
//       _ref$strokeStartPoint = _ref.strokeStartPointRadius,
//       strokeStartPointRadius = _ref$strokeStartPoint === undefined ? 8 : _ref$strokeStartPoint,
//       _ref$notifySteps = _ref.notifySteps,
//       notifySteps = _ref$notifySteps === undefined ? false : _ref$notifySteps;

