const mysql = require('mysql')
const chirld_process = require('child_process')
const dbconfig = {
    host: 'localhost',
    user: 'root',
    port: '3306',
    database: 'movie'
}

const app = mysql.createConnection(dbconfig)
const sqlsen = "create table  if not exists account ( account_id int unsigned auto_increment,account varchar(20) not null,account_psw varchar(20) not null,primary key (`account_id`) )ENGINE=InnoDB DEFAULT CHARSET=utf8; "

app.connect()

app.query(sqlsen, (er, result) => {
    if (er) console.log(er)
    console.log(result)
})

app.query("desc user;",(er,res)=>{
    console.log(res)
})

// chirld_process.exec('typora')