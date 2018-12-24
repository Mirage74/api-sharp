const http = require('http')
const sharp = require('sharp')

const server = http.createServer(function(req, res) {
  let body = Buffer.alloc(0)
  const headers =  JSON.parse(JSON.stringify(req.headers))
  const widthOrHeight = headers['width-or-height'].toLowerCase()
  const rotate = parseInt(headers['rotate'])
  const resizeX = parseInt(headers['resizeX'])
  const resizeY = parseInt(headers['resizeY'])
  const useBothXY = headers['useBothXY'].toLowerCase()

   let resize = resizeX
  if ( (useBothXY !== 'y') && (widthOrHeight !== "x") ){
      resize = {}
      resize.height = resizeY
  }


  req.on('data', (chunk) => {
    //console.log("chunk")
    let nextBuffer = Buffer.alloc(chunk.length, chunk)
    let arrBuf = [body, nextBuffer]
    body = Buffer.concat(arrBuf)
  })



  req.on('end', () => {
    if (useBothXY === "y") {
      sharp(body)
        .rotate(rotate)
        .resize(resizeX, resizeY)
        .toBuffer()
        .then( data =>  {
          res.end(data)
        })
        .catch( err => {
          console.log("Error sharp : ", err)
        })
    } else {
      sharp(body)
        .rotate(rotate)
        .resize(resize)
        .toBuffer()
        .then( data =>  {
          res.end(data)
        })
        .catch( err => {
          console.log("Error sharp : ", err)
        })}
  })
})


server.listen((process.env.PORT || 4000));



