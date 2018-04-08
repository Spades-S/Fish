// Created by Spades<spadesge@gmail.com> on 18/04/07

const KOA = require('koa')
const Router = require('koa-router')
const KoaNunjucks = require('koa-nunjucks-2')
const Path = require('path')

const config = require('../config')
const setRouter = require('../router/index')

const app = new KOA()
const router = new Router()

setRouter(router)

app.use(require('koa-body')({
    multipart: 'true'
}))

app.use(require('koa-logger')())

app.use(require('koa-static')(Path.resolve(__dirname, '../static'), {
    maxAge: 60 * 60 * 24 * 7,
    gzip: true
}))
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080')
    ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE')
    ctx.set('Access-Control-Allow-Headers', 'x-requested-with, accept, origin, content-type')
    ctx.set('Access-Control-Allow-Credentials', 'true')
    await next()
})
app.use(KoaNunjucks({
    ext: 'html',
    path: Path.resolve(__dirname, '../static'),
    nunjucksConfig: {
        autoescape: true,
        watch: true
    }
}))

app.use(router.routes())
    .use(router.allowedMethods())


app.listen(config.port, () => {
    console.log(`[Service]   Service starts at port: ${config.port}`)
})
