var tnnPixelator = require('./tnnPixelator');

var refName = process.env.FILE_PATH || 'references/image.jpg';
var saveName = process.env.SAVE_AS || 'outcomes/image.jpg';
var divisions = process.env.DIVS || 8;

tnnPixelator(refName, saveName, divisions);