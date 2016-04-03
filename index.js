/**
 * index.js
 * Created by dcorns on 4/1/16
 * Copyright © 2016 Dale Corns
 */
'use strict';
var fs = require('fs');
//Svg passed in first and is [2], attribute is second and [3], the value is third and is [4]
var svg = fs.readFileSync(process.argv[2], 'utf8');
var atr = process.argv[3], val = process.argv[4];
var svgAry = svg.split(' ');
var identifier = getIdentifier(atr);
if(!identifier) throw new Error('Attribute ' + atr + ' not supported');
addAttribute(svgAry, identifier, atr);
//var newArray = setAttribute(atr, svgAry, val);
//svg = newArray.join(' ');
//fs.writeFileSync(process.argv[2], svg);

//Changes the values if the attribute exists in the svg array and returns the modified array
function setAttribute(attr, svgArray, val){
  var i = 0, len = svgArray.length, attrLength = attr.length, idx=-1, valueStart = 0;
  for(i; i < len; i++){
    idx = svgArray[i].indexOf(attr);
    if(idx > -1){
      valueStart = attrLength + 2;
      svgArray[i] = changeValue(svgArray[i], valueStart, val);
    }
    idx = -1;
  }
  return svgArray;
}
//Changes value of an attribute and returns it
function changeValue(item, valStart, val){
  var deleteCount = (item.indexOf('"', valStart) - valStart);
  var itemArray = item.split('');
  itemArray.splice(valStart, deleteCount, val);
  return itemArray.join('');
}
function removeAttribute(){

}
//Used to retrieve the string use as a key to determine where to place the attribute if it does not exist
function getIdentifier(attr){
  switch (attr){
    case 'opacity-value':
      return 'fill';
    break;
    default:
      return '';
    break;
  }
}

function addAttribute(svgArray, ident, attr){
  var i = 0, len = svgArray.length, attrLength = attr.length, idx=-1, valueStart = 0;
  for(i; i < len; i++){
    idx = svgArray[i].indexOf(ident);
    if(idx > -1){
      console.log(svgArray[i]);
    }
    idx = -1;
  }
}