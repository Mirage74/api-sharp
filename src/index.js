const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const logger = require('koa-logger')
//const body = require('koa-better-body')
//const convert = require('koa-convert')
//const  asyncBusboy = require('async-busboy')
const fs = require("fs")
const koaBody = require('koa-body')
//const AWS = require('aws-sdk');
const AWS = require('aws-sdk/global');
const S3 = require('aws-sdk/clients/s3')
const sharp = require('sharp')
const request = require('request')
const http = require('http');
const tmp = require('tmp');
const typeIs = require('type-is');
const util = require("util");
const path = require('path');
const url = require('url');
const UTF8 = require('UTF-8')



sharp('input.jpg')
    .rotate(180)
    .resize(400)
    .toBuffer()
    .then( data =>  {
        const fdLog = fs.openSync("out.jpg", "w")
        fs.appendFileSync(fdLog, data)
        fs.closeSync(fdLog)
        console.log("OK")
    } )
    .catch( err => err );


const app = new Koa();
const router = new Router();
app.use(serve('public'))
app.use(logger())
app.use(bodyParser())
//app.use(convert(body()))
app.use(router.routes())
//app.listen(process.env.PORT || 4000)
app.use(async (ctx, next) => {
    const origin = ctx.get('Origin');
    console.log(ctx.method)
    if (ctx.method !== 'OPTIONS') {
        ctx.set('Access-Control-Allow-Origin', origin);
        ctx.set('Access-Control-Allow-Credentials', 'true');
    } else if (ctx.get('Access-Control-Request-Method')) {
        ctx.set('Access-Control-Allow-Origin', origin);
        ctx.set('Access-Control-Allow-Methods', ['POST', 'OPTIONS']);
        ctx.set('Access-Control-Allow-Headers', 'Content-Type');
        ctx.set('Access-Control-Max-Age', '60');
        ctx.set('Access-Control-Allow-Credentials', 'true');
        ctx.response.status = 200
        console.log('ctx.response.status', ctx.response.status)
    }
    await next()
})




const server = http.createServer(function(req, res) {
  let body = Buffer.alloc(0)
  req.on('data', (chunk) => {
    let nextBuffer = Buffer.alloc(chunk.length, chunk)
    let arrBuf = [body, nextBuffer]
    body = Buffer.concat(arrBuf)
    //console.log("chunk.length : ", chunk.length)
    //console.log("body.length : ", body.length)
  })


  req.on('end', () => {
    //console.log('END')
    const path = 'public/output.jpg'
    fs.open(path, 'w', function(err, fd) {
      if (err) {
        throw 'error opening file: ' + err;
      }
      fs.write(fd, body, 0, body.length, null, function(err) {
        if (err) throw 'error writing file: ' + err
        fs.close(fd, function() {
//          console.log('file written')
        })
      })
    })
    res.end(body.length.toString())
    })
})


server.listen((process.env.PORT || 4000));



