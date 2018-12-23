const dbconfig = require('../sql/dbconfig')
const mysql = require('mysql')

const conn = mysql.createConnection(dbconfig.mydb)

conn.connect()

module.exports = {
    sqlQuery: function (sql_sentence, data) {
        return new Promise((resolve, reject) => {
            conn.query(sql_sentence, data, (er, result) => {
                if (er) console.log(er)
                resolve(result)
            })
        })
    }
}