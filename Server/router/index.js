// Created by Spades<spades@gamil.com> on 18/04/07

const { getAllProducts } = require('../model/product')
const { initOrder } = require('./order')
const { initVerifyCode } = require('./verifycode')
const { initUser } = require('./user')
const verify = require('../middlewares/verify')


function setRouter(router) {
    router.get('/products', async (ctx) => {
        const products = await getAllProducts()
        ctx.body = products
    })
    initOrder(router, verify)
    initVerifyCode(router)
    initUser(router, verify)
    router.get('/admin', async (ctx) => {
        return ctx.render('admin')
    })
    router.get('/', async (ctx) => {
        return ctx.render('client')
    })
}

module.exports = setRouter