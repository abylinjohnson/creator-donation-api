// @ts-nocheck
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const userRouter = require('./routes/userRoutes')
const donateRouter = require('./routes/donateRoutes')

JWT_SECRET = "ojdfbvpwurbb*(^%&B089y(&*T(#47"
const DB="mongodb://localhost:27017/duckcart"
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log('DB Connection Successfull!!!');
  })
  .catch((e)=>{
    console.log(e)
  });
const app = express()
app.use(bodyParser.json())


app.use('/api/user/',userRouter)
app.use('/api/donate/',donateRouter)


app.listen(8081, () => {
    console.log("server up at 8080....")
})

