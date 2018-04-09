// Created by Spades<spadesge@gmail.com> on 18/04/07

const query = require('./utils')

async function addOrder(data) {
    const {
        product: {
            id: productID, num: productNum
        },
        user: {
            name: name,
            tel: tel,
            province: province,
            address: address,
            message: message
        }
    } = data
    const date = new Date()
    const time = `${date.getFullYear()}/${date.getMonth() + 1}/${new Date().getDate()}   ${new Date().getHours()}:${new Date().getMinutes()}`
    const result = await query(`INSERT INTO T_ORDER (productID, productNum, name, tel, province, address, message, time) VALUES (${productID}, ${productNum},'${name}','${tel}','${province}','${address}','${message}','${time}')`)
    return result
}

async function getOrdersByPage(filtered, pageSize, pageNum) {
    const offset = (pageNum - 1) * pageSize
    let queryString = `SELECT Product.name as productName,
                         o.id, o.productNum, o.name, o.tel, o.province,o.address,o.message,o.status,o.time
                         FROM T_PRODUCT Product  JOIN T_ORDER o ON Product.id = o.productID `
    if (filtered === 'true') {
        queryString += ` WHERE status = 0  ORDER BY id DESC LIMIT ${pageSize} OFFSET ${offset}  `
    } else {
        queryString += ` ORDER BY id DESC LIMIT ${pageSize} OFFSET ${offset} `

    }
    const result = await query(queryString)
    return result
}

async function getTotalNum(filtered) {
    let num = 0
    if (filtered === 'false') {
        num = (await query(`SELECT * FROM T_ORDER`)).length
    } else {
        num = (await query(`SELECT * FROM T_ORDER WHERE status = 0`)).length
    }
    return num

}

async function updateOrderStatus(tochange) {
    const queryStr = `(${tochange.join(',')})`
    const result = await query(`UPDATE T_ORDER SET status=1 WHERE id IN ${queryStr}`)
    return result
}

module.exports = {
    addOrder,
    getOrdersByPage,
    getTotalNum,
    updateOrderStatus
}