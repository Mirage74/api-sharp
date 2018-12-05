const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const logger = require('koa-logger')
//const body = require('koa-better-body')
//const convert = require('koa-convert')
const  asyncBusboy = require('async-busboy')


const app = new Koa();
const router = new Router();
app.use(serve('public'))
app.use(logger())
app.use(bodyParser())
//app.use(convert(body()))
app.use(router.routes())
app.listen(process.env.PORT || 4000)
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


async function Gewt (ctx, next) {
    const file = await asyncBusboy(ctx.req);

    // Make some validation on the fields before upload to S3

        return file

}

router.post('/convert', async(ctx, next) => {
    const fl = Gewt(ctx, next).then (
        res => {
            let y = 5
        }
    )
        .catch (err=>
            {
                let y = 5
            }
        )


})

