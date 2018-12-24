const http = require('http')
const sharp = require('sharp')


// const app = new Koa();
// const router = new Router();
// app.use(serve('public'))
// app.use(logger())
// app.use(bodyParser())
// //app.use(convert(body()))
// app.use(router.routes())
// //app.listen(process.env.PORT || 4000)
// app.use(async (ctx, next) => {
//     const origin = ctx.get('Origin');
//     console.log(ctx.method)
//     if (ctx.method !== 'OPTIONS') {
//         ctx.set('Access-Control-Allow-Origin', origin);
//         ctx.set('Access-Control-Allow-Credentials', 'true');
//     } else if (ctx.get('Access-Control-Request-Method')) {
//         ctx.set('Access-Control-Allow-Origin', origin);
//         ctx.set('Access-Control-Allow-Methods', ['POST', 'OPTIONS']);
//         ctx.set('Access-Control-Allow-Headers', 'Content-Type');
//         ctx.set('Access-Control-Max-Age', '60');
//         ctx.set('Access-Control-Allow-Credentials', 'true');
//         ctx.response.status = 200
//         console.log('ctx.response.status', ctx.response.status)
//     }
//     await next()
// })




const server = http.createServer(function(req, res) {
  let body = Buffer.alloc(0)
  const headers =  JSON.parse(JSON.stringify(req.headers))
  const widthOrHeight = headers['width-or-height'].toLowerCase()
  const rotate = parseInt(headers['rotate'])
  let resize = parseInt(headers['resize'])
  if (widthOrHeight === 'h') {
      saveResize = resize
      resize = {}
      resize.height = saveResize
  }


  req.on('data', (chunk) => {
    console.log("chunk")
    let nextBuffer = Buffer.alloc(chunk.length, chunk)
    let arrBuf = [body, nextBuffer]
    body = Buffer.concat(arrBuf)
  })



  req.on('end', () => {
      sharp(body)
          .rotate(rotate)
          .resize(resize, 200)
          
          .toBuffer()
          .then( data =>  {
              res.end(data)
              // const fdLog = fs.openSync("out2.jpg", "w")
              // fs.appendFileSync(fdLog, data)
              // fs.closeSync(fdLog)
              // console.log("OK")
          } )
          .catch( err => {
             console.log("Error sharp : ", err)
          })


    })
})


server.listen((process.env.PORT || 4000));



