const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const ports = require("./package.json").ports
const index = require('./routes/index')
const history = require('./middleware/koa2-connect-history-api-fallback')


app.use(history({
verbose: true//打出转发日志
}));
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public/dist'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

app.use(async (ctx, next) => {
  // console.log(ctx.header)
  // let origin = ctx.url
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
  );
  ctx.set("Content-Type", "application/json;charset=utf-8");
  ctx.set("Access-Control-Max-Age", "300");
  ctx.set("Access-Control-Allow-Credentials", true);
  if (ctx.method === "OPTIONS") {
    ctx.body = {};
    ctx.status = 200;
  } else {
    await next();
  }
  //  await next()
});
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())

// app.listen(ports.port)
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
