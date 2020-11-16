const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');


const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/login', (req,res) => {
    res.render('login.ejs')  
});





// Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongo:27017/docker-node-mongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
  


const Item = require('./models/Item');


app.get('/', (req, res) => {
  Item.find()
    .then(items => res.render('login', { items }))
    .catch(err => res.status(404).json({ msg: 'No items found' }));
});
app.post('/login', (req,res) => {
  
  const name=req.body.email;
  const pwd= req.body.password;
  if(name == "guest" && pwd == "guest"){
    Item.find()
    .then(items => res.render('index2.ejs',{items}))
    .catch(err=> res.status(404).json({msg : 'Login Unsuccessful'}));
  }
  else if(name=="root" && pwd == "root"){
    Item.find()
    .then(items => res.render('index.ejs',{items}))
    .catch(err=> res.status(404).json({msg : 'Login Unsuccessful'}));
  }
  else
  res.status(404).json({msg : 'Login Unsuccessful'}); 
});


//app.get('/item/search', (req,res)=>{

//})

app.post('/item/add', (req, res) => {
  const newItem = new Item({
    format: req.body.format,
    imgSize : req.body.imgSize,
    orientation: req.body.orientation,
    focalLength  : req.body.focalLength,
    exposure: req.body.exposure,
    location: req.body.location,
    date : req.body.date,
    date1 : req.body.date1

  });

  newItem.save().then(item => res.redirect('/'));
});
app.get('/item/searcha', (req,res)=>{ 
  Item.find({$text: {$search : req.query.search1}}, function (err,documents) {
        if(err)
          console.log(err);
        else{
          res.render('index3.ejs', {documents});
        }  
  });

});
const port = 3000;

app.listen(port, () => console.log('Server running...'));
