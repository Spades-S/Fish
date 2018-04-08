const fs = require('fs')
const cpatcha = require('trek-captcha')
const userModel = require('../model/user')

function initVerifyCode(router) {
    router.get(`/verifycode`, async ctx => {
        const {token, buffer} = await cpatcha()
        await userModel.saveVerifyCode(token)
        ctx.body = `data:image/png;base64,${Buffer.from(buffer).toString('base64')}`
    })
}


module.exports = {
    initVerifyCode
}