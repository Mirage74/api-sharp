const http = require('http')
const fs = require('fs')
const path = require('path')
const {InputDir, OutputDir, rotate, resizeX, resizeY, useBothXY, width_Or_Height, urlRest} = require('./config')
const convOneImg = require("./sharp-one")

if ( !fs.existsSync(OutputDir) ) {
  fs.mkdirSync(OutputDir)
}

const headersMy = {
  "content-type"    : "image/jpeg",
  "width-or-height" : width_Or_Height,
  "use-both-xy"     : useBothXY,
  "resize-x"        : resizeX,
  "resize-y"        : resizeY,
  "rotate"          : rotate
}


let options = {
  method: 'POST',
  headers: headersMy
}


const dirents = fs.readdirSync(InputDir, { withFileTypes: true });
const listInputFiles = dirents
  .filter(dirent => !dirent.isDirectory())
  .map(dirent => dirent.name);


let fileOutName
for (let i = 0; i < listInputFiles.length; i++) {
  options.body = fs.createReadStream(path.resolve(InputDir, listInputFiles[i]))
  fileOutName = path.resolve(OutputDir, listInputFiles[i])
  convOneImg(urlRest, options, fileOutName)
}
