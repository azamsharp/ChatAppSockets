const express = require('express')
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')
// using express session
var session = require('express-session')

const app = express()

// setup your session

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

let users =[
  {username: "johndoe", password: "password"},
  {username: "marydoe", password: "password"}
]

// tell express to use mustache templating engine
app.engine('mustache',mustacheExpress())
// the pages are located in views directory
app.set('views','./views')
// extension will be .mustache
app.set('view engine','mustache')

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/home',(req,res) => {
  res.render('home',{username: req.session.username})
})

app.get('/orders',(req,res) => {

  //
    //res.render('orders',{username: req.session.user.username, age: req.session.user.age})
    res.render('orders',{username: req.session.username})
})

app.post('/login',(req,res) => {

  let username = req.body.username
  let password = req.body.password

  let persistedUser = users.find((user) => {
    return user.username == username && user.password == password
  })

  if(persistedUser) {
    // save username to the session
    if(req.session){
        req.session.username = persistedUser.username
        //req.session.age = 12
        //req.session.user = { username: persistedUser.username, age: 45}
        res.redirect('/home')
    }

  } else {
    //res.redirect('/login')
    res.render('login',{message: 'Invalid Credentials!!'})
  }

})

app.get('/login',(req,res) => {
  res.render('login')
})

app.get('/',(req,res) => {
  res.render('index')
})

app.listen(3000,() => {
  console.log("Server is running...")
})
