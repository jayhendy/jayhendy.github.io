'use strict';


// Create the menu with a sub-menu at the bottom.
const items = [
  {
    name: 'Animals',
    children: [
      'Chicken',
      'Dog',
      'Lion',
      'Monkey',
      'Cat',
      'Frog',
      'Pig',
      'Elephant'
    ]
  },
  {
    name: 'Avatars',
    children: [
      'Taxi-Driver',
      'Athlete',
      'Worker',
      'Theif',
      'Chef',
      'Dentist',
      'Dad',
      'Police'
    ]
  },
  {
    name: 'Food',
    children: [
      'Soda',
      'Mango',
      'Cheese',
      'Jalapeno',
      'Apple',
      'Burger',
      'Fries',
      'Pizza'
    ]
  },
  {
    name: 'Objects',
    children: [
      'Table',
      'Bed',
      'Clock',
      'Scarecrow',
      'Dumbbell',
      'Smartphone',
      'Medal',
      'Camera'
    ]
  },
  {
    name: 'Bubbles',
    children: [
      'Speech',
      'Thought',
      'Whisper',
      'Alert'
    ]
  },
  {
    name: 'Scenes',
    children: [
      'Barbershop',
      'Dentist',
      'Trees',
      'Jail',
      'Gym',
      'Mall',
      'Kitchen',
      'Factory'
    ]
  },
  {
    name: 'Vehicles',
    children: [
      'Taxi',
      'Car',
      'Police-Car',
      'Airplane',
      'Tractor'
    ]
  },
  {
    name: 'Shapes',
    children: [
      'Circle',
      'Square',
      'Triangle',
      'Rectangle'

    ]
  }
];

// context menu creation
const contextItems = [
  'Delete',
  'To Back',
  'To Front'
];

// context menu creation
const shapeContextItems = [
  'Delete',
  'To Back',
  'To Front',
  {
    name: 'Colours',
    children: [
      'Blue',
      'Green',
      'Yellow',
      'Light Grey',
      'White',
      'Dark Grey',
      'Brown',
      'Black'
    ]
  }
];

// context menu creation
const textContextItems = [
  'Delete',
  {
    name: 'Alignment',
    children: [
      'Left',
      'Center',
      'Right'
    ]
  },
  {
    name: 'Font',
    children: [
      'Helvetica',
      'Comic Sans',
      'Impact',
      'Courier'
    ]
  },
  {
    name: 'Style',
    children: [
      'Bold',
      'Italic',
      'Normal',
      'Underline'
    ]
  }
];