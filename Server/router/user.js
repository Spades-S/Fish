const userModel = require('../model/user')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

function initUser(router, verify) {
    router.get(`/users/check`, async (ctx) => {
        let ops = JSON.parse(ctx.query.ops)
        let verifyCode = await userModel.getVerifyCode()
        if (verifyCode != ops.verifyCode) {
            ctx.throw(401, '验证码错误')
        }
        let rowData = await userModel.getPassword(ops.userName)
        if (rowData.length > 0) {
            let password = rowData[0].password
            let hash = crypto.createHash('sha256')
            hash.update(ops.password)
            let hasAccess = hash.digest('hex') == password
            if (hasAccess) {
                let token = jwt.sign({
                        data: ops.userName
                    },
                    'Fish', {
                        expiresIn: '1 day'
                    }
                )
                ctx.cookies.set('TOKEN', token, {
                    httpOnly: false
                })
                ctx.body = '登录成功'
            } else {
                ctx.throw(401, '密码错误')

            }
        } else {
            ctx.throw(401, '用户名错误')
        }
    })
    router.put(`/users/changepsw`, verify, async (ctx) => {
        let ops = JSON.parse(ctx.request.body.data.ops)
        let verifyCode = await userModel.getVerifyCode()
        if (verifyCode != ops.verifyCode) {
            ctx.throw(401, '验证码错误')
        }
        let rowData = await userModel.getPassword(ops.userName)
        let password = rowData[0].password
        let hash = crypto.createHash('sha256')
        hash.update(ops.oldPSW)
        let hasAccess = hash.digest('hex') == password
        if (hasAccess) {
            let hash1 = crypto.createHash('sha256')
            hash1.update(ops.newPSW)
            let res = await userModel.updatePassword(ops.userName, hash1.digest('hex'))
            if (res.affectedRows > 0) {
                ctx.body = '密码修改成功'
            } else {
                ctx.throw(401, '不存在admin用户')
            }
        } else {
            ctx.throw(401, '密码错误')
        }
    })
}

module.exports = {
    initUser
}