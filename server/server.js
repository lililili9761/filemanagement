const express = require('express')
const router = require('./router/routerMap')
const bodyParser = require('body-parser')
const app = new express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use('/',router)

app.listen(3000,()=>{
    console.log('listen to port 3000...')
})
