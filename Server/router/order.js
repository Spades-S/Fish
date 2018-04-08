//Created by Spades<spades@gmail.com> on 18/04/07

const orderModel = require('../model/order')

const pageSize = 15


function getAllOrders(router, verify) {
    router.get('/orders/:filtered/:pagenum', verify, async (ctx) => {
        const filtered = ctx.params.filtered
        const pageNum = Number(ctx.params.pagenum)
        try {
            const results = await orderModel.getOrdersByPage(filtered, pageSize, pageNum)
            ctx.body = results
        } catch (err) {
            console.log(err)
            ctx.throw(500, 'failed when retrieve data')
        }
    })

}

function addOrder(router) {
    router.post('/order', async (ctx) => {
        const data = ctx.request.body.data
        try {
            await orderModel.addOrder(data)
            ctx.body = 'success'
        } catch (err) {
            ctx.throw(500, 'failed when storing')
        }
    })
}

function getTotal(router, verify) {
    router.get('/total/:filtered', verify, async ctx => {
        const filtered = ctx.params.filtered
        try {
            let total = await orderModel.getTotalNum(filtered)
            ctx.body = total
        } catch (err) {
            ctx.throw(500, 'failed when retrieve data')
        }
    })

}

function updateOrderStatus(router, verify) {
    router.put('/orders', verify, async ctx => {
        const toChange = ctx.request.body.data.idtochange
        console.log(toChange)
        try {
            await orderModel.updateOrderStatus(toChange)
            ctx.body = 'success'
        } catch (err) {
            console.log(err)
            ctx.throw(500, 'failed when updating data')
        }
    })
}

function initOrder(router, verify) {
    addOrder(router, verify)
    getAllOrders(router, verify)
    getTotal(router, verify)
    updateOrderStatus(router, verify)
}


module.exports = {
    initOrder
}