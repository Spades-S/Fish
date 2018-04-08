// Created by Spades<spadesge@gmail.com> on 18/04/08

const query = require('./utils')

async function saveVerifyCode(code) {
    const result = await query(`UPDATE T_USER SET verifycode='${code}' WHERE username='admin'`)
    return result
}

async function getVerifyCode() {
    const result = await query(`SELECT  verifycode FROM T_USER  WHERE username='admin'`)
    return result[0].verifycode
}

async function updatePassword(name, pw) {
    const result = await query(`UPDATE  T_USER  SET password='${pw}' WHERE username='${name}'`)
    return result
}

async function getPassword(name) {
    const result = await query(`SELECT  password FROM T_USER  WHERE username='admin'`)
    return result
}

module.exports = {
    getVerifyCode,
    saveVerifyCode,
    updatePassword,
    getPassword
}