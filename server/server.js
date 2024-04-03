const express=require('express')
const dotenv=require('dotenv').config()
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const allUsers=require('./routes/users')
const userByID=require('./routes/usersByID')
const newUser=require('./routes/createUser')
const updateUser=require('./routes/updateUser')
const cors=require('cors')

const app=express()

app.use(cors())

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/',allUsers)
app.use('/',userByID)
app.use('/',newUser)
app.use('/',updateUser)

app.listen(process.env.PORT,()=>{
    mongoose.connect(process.env.DB_LINK)
    .then(()=>console.log('connected to DB'))
    .catch((error)=>console.log(error))
    console.log(`server running at http://localhost${process.env.PORT}`)
})