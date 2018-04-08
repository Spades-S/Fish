const jwt = require('jsonwebtoken')
const secretKey = 'Fish'

module.exports = async function (ctx, next) {
    try {
        let res = await jwt.verify(ctx.cookies.get('TOKEN'), secretKey)
    } catch (err) {
        ctx.throw(401, '登录过期')
    }
    await next()
}