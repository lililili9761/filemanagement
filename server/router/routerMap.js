const express = require('express')
const router = express.Router()
const sqlMap = require('../sql/sqlMap')
const api = require('./api')
const sentence = sqlMap.sql_sentence
const child_process = require('child_process')

router.get('/api/show_files', (req, res) => {
    api.sqlQuery(sentence.show_all, null)
        .then((ans) => {
            res.json(ans)
        })
        .catch((er) => {
            console.log(er)
        })
})

router.post('/api/search', (req, res) => {
    api.sqlQuery(sentence.find_file, req.body.filename)
        .then((ans) => {
            res.json(ans)
        })
        .catch((er) => {
            console.log(er)
        })
})

router.post('/api/login', (req, res) => {
    let user = req.body
    // console.log(user)

    // console.log(user.account)
    api.sqlQuery(sentence.user_verify, user.account)
        .then((result) => {
            // console.log(result)
            let send_json = {}
            // if (result == []) {
            //     console.log('no data')
            //     res.send(send_json)
            //     return
            // }
            if (result[0]) {
                if (result[0].user_psw == user.password) {
                    console.log('password content')
                    send_json = result[0]
                    send_json.existuser = true
                    // console.log(send_json.isadmin)

                    res.send(send_json)
                    return
                }
            }
            send_json.existuser = false
            // console.log(send_json)
            res.send(send_json)
        })
})

router.post('/api/play', (req, res) => {
    //wait yxt
    let file_info = req.body
    //file_info.byway
    const openby = {
        aqy: 'open -a by tencent-vedio ',
        bf: 'open -a by baofeng-vedio',
        qt: 'open -a by quicktime-player '
    }

    if (file_info.byway == 'aqy') {
        let playfile = openby.aqy + file_info.file_path
        child_process.exec(playfile)
        res.end()
    }
    else if (file_info.byway == 'bf') {
        let playfile = openby.bf + file_info.file_path
        child_process.exec(playfile)
        res.end()
    }
    else {
        let playfile = openby.qt + file_info.file_path
        child_process.exec(playfile)
        res.end()
    }
})

router.post('/api/upload_file', (req, res) => {
    //wait yxt
    // console.log( req.body)
    let send_info = []
    const file_infoes = req.body
    // console.log(file_infoes)
    for (let key in file_infoes) {
        send_info.push(file_infoes[key])

    }
    console.log(send_info)
    if(send_info.length !== 0){
        api.sqlQuery(sentence.add_file,send_info)
        .then((ans)=>{
            console.log("innserted!")
        })
        .catch((er)=>{
            console.log(er)
        })
    }
})

router.post('/api/register', (req, res) => {
    const new_user = req.body
    // console.log(new_user)
    let new_info = []
    new_info.push(new_user.account, new_user.password)
    new_info.push(0)
    let send_info = {
        registersuccess: false
    }

    // console.log(new_info)
    api.sqlQuery(sentence.register, new_info)
        .then((ans) => {

            if (ans) {
                // console.log(ans)
                send_info.registersuccess = true
                // console.log(send_info)
                res.send(send_info)
                res.end();
            }
        })
        .catch((er) => {
            console.log(er)
            res.send(send_info)

        })
})
module.exports = router