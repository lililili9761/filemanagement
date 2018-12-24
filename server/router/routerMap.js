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
    console.log(user)

    console.log(user.account)
    api.sqlQuery(sentence.user_verify, user.account)
        .then((result) => {
            let send_json = {}
            if (result == []) {
                send_json.existuser = false
                res.end(send_json)
            }
            else if(result[0].user_psw !== user.password){
                send_json.existuser = false
                res.end(send_json)
            }
            send_json = result[0]
            send_json.existuser = true
            res.send(send_json)
            console.log(send_json.isadmin)
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
    const file_infoes = req.body
    let info_array = []
    for (let key in file_infoes) {
        info_array.push(file_infoes[key])
    }

    api.sqlQuery(sentence.add_file, info_array, (er, result) => {
        if (er) {
            res.end(false)
            console.log(er)
        }
        res.end(true)
    })
})

router.post('/api/register', (req, res) => {
    const new_user = req.body
    let new_info = []
    for (let key in new_user) {
        new_info.push(new_user[key])
    }

    api.sqlQuery(sentence.register, new_info, (er, result) => {
        if (er) {
            console.log(er)
            res.end(false)
        }

        res.end(true)
    })
})
module.exports = router