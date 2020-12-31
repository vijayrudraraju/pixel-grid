/* eslint-env es6 */
/* eslint-disable no-console */

const util = require('util')
//var css = require('dom-css')
const grid = require('./index')
const Atoms = require('./util/atoms')
//const parse = require('parse-color')
//const position = require('mouse-position')
const Array2D = require('array2d')
require('lodash.multipermutations')
const _ = require('lodash')

document.body.style.transition = '0.3s all'

//var rows = Math.floor(window.innerHeight * 0.97 / 16) - 2
//var columns = Math.floor(window.innerWidth * 0.97 / 16) - 1

const initData = Array2D.build(64, 1024, 0.5)
console.log({ initData })

let data = Array2D.clone(initData)
for (let i = 0; i < Atoms.length; i++) {
  data = Array2D.paste(data, Atoms[i], 0, i*3)
}

const pixels = grid(data, {
  root: document.body,
  //rows: 128,
  //columns: 64,
  size: 10,
  padding: 1,
  //background: [0, 0, 0],
  formatted: false
})
pixels.canvas.style.marginLeft = (window.innerWidth * 0.03) / 2 + 'px'
pixels.canvas.style.marginTop = (window.innerHeight * 0.04) / 2 + 'px'

const initData4by4 = Array2D.build(4, 4, 0.5)
const multipermutations = _.multipermutations(Atoms, 4)
console.log(multipermutations)
for (let i = 0; i < 3000; i++) {
  let pasteData = Array2D.paste(initData4by4, multipermutations[i][0], 0, 0)
  pasteData = Array2D.paste(pasteData, multipermutations[i][1], 0, 2)
  pasteData = Array2D.paste(pasteData, multipermutations[i][2], 2, 0)
  pasteData = Array2D.paste(pasteData, multipermutations[i][3], 2, 2)

  data = Array2D.paste(data, pasteData, 3 + (5*Math.floor(5*i/60)), (5*i) % 60)
}
console.log({ data })
setTimeout(() => pixels.update(data), 100)

//var testPixels = grid([[0, 1], [1, 0]], {root: document.body})
//setTimeout(() => testPixels.update([[1, 0], [0, 1]]), 100)
/*
testPixels.update([[1, 0], [0, 1]])
const tick = testPixels.frame(function () {
  testPixels.update([[Math.random(), Math.random()], [Math.random(), Math.random()]])
})
*/

/*
var mouse = position(pixels.canvas)

var row, column, rand, color
var hue = 0
var started = false

mouse.on('move', function () {
  if (!started) started = true
  row = Math.floor(mouse[1] / 16)
  column = Math.floor(mouse[0] / 16)
  if (row < rows && column < columns) {
    hue = (hue + 1) % 360
    color = parse('hsl(' + hue + ',50, 50)').rgb
    document.body.style.background = util.format('rgb(%s,%s,%s)', color[0], color[1], color[2])
    color = color.map(function (d) { return d / 50 })

    data[Math.min((row) * columns + (column), data.length)] = color
  }
})

pixels.frame(function () {
 for (var i = 0; i < data.length; i++) {
    rand = Math.random() * 0.01
    data[i] = [
      (data[i][0] * 0.7) + rand,
      (data[i][1] * 0.7) + rand,
      (data[i][2] * 0.7) + rand
    ]
  }
  pixels.update(data)
})
*/
