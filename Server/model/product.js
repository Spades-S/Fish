// Created by Spades<spadesge@gmail.com> on 18/04/07

const query = require('./utils')

async function getAllProducts() {
    const results = await query('SELECT * FROM T_PRODUCT')
    return results
}

module.exports = {
    getAllProducts
}