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
      'Criminal',
      'Chef',
      'Dentist',
      'Man',
      'Police'
    ]
  },
  {
    name: 'Food',
    children: [
      //'Soda',
      //'Mango',
      'Cheese',
      //'Jalapeno',
      'Apple',
      //'Burger',
      'Fries',
      'Pizza'
    ]
  },
  {
    name: 'Objects',
    children: [
      'Table',
      'Bicycle',
      'Cone',
      'Streetlight',
      'Dumbbell',
      'Sign',
      'Barrier',
      'Camera'
    ]
  },
  'Speech',
  // {
  //   name: 'Bubbles',
  //   children: [
  //     'Speech',
  //     'Thought',
  //     'Whisper'
  //     //,'Alert'
  //   ]
  // },
  {
    name: 'Nature',
    children: [
      'Grass',
      'Lightening',
      'Tree',
      'Flowers'
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
      'Divider',
      'Triangle',
      'Rectangle'

    ]
  }
];

// context menu creation
const contextItems = [
  'To Back',
  'Delete',
  'To Front',
  {
    name: 'Rotate',
    children: [
      '90',
      '180',
      '270'
    ]
  }
  
];

// context menu creation
const shapeContextItems = [
  'To Back',
  'Delete',
  'To Front',
  {
    name: 'Colours',
    children: [
      'Blue',
      'Green',
      'Yellow',
      'Red',
      'White',
      'Dark Grey',
      'Brown',
      'Black'
    ]
  }
];

// context menu creation
const textContextItems = [
  {
    name: 'Alignment',
    children: [
      'Left',
      'Center',
      'Right'
    ]
  },
  'Delete',
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