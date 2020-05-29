var express = require('express');
var multer = require('multer');
var path = require('path');
var usrmdl = require('../datamodules/userdata');
var router = express.Router();
var userdata = usrmdl.find({});

router.use(express.static(__dirname+"./public/"));

// var strg = multer.diskStorage({
//   destination:function (req, file, cb) {
//   cb (null, "./public/uploads/")},
//   filename: (req,file,cb)=>{
//     cb(null,file.fieldname+path.extname(file.originalname));
//   }
// });

// var upload = multer({
//   storage: strg
// })

router.get('/', function (req , res , next)
{
  userdata.exec(function(err , data){
    if(err) throw err;
    res.render('myweb',{records:data});
  });
});
router.get('/myweb', function (req , res)
{
  userdata.exec(function(err , data){
    if(err) throw err;
    res.render('myweb',{});
  });
});
router.get('/login', function (req , res)
{
    res.render('login',{success:''} )
});
router.get('/signup', function (req , res)
{
    res.render('signup',{})
});
router.get('/lrslt', function (req , res)
{
    res.render('lrslt',{})
});
router.get('/obj', function (req , res)
{
    res.render('obj',{})
});
router.get('/mot', function (req , res)
{
    res.render('mot',{})
});
router.get('/ins', function (req , res)
{
    res.render('ins',{})
});
router.get('/rol', function (req , res)
{
    res.render('rol',{})
});
router.get('/cntrb', function (req , res)
{
    res.render('cntrb',{})
});
router.get('/profile', function (req , res)
{
    res.render('profile',{})
});
router.post('/signup', function(req,res,next) {
var userdetails = new usrmdl({
  name: req.body.name,
  email: req.body.email,
  cno: req.body.cno,
  dob: req.body.dob,
  password: req.body.password,
  cpassword: req.body.cpassword,
});
userdetails.save(function(err , res1){
  console.log(req.body)
    if(err) throw err;
    res.render('login',{success:'SIGNED IN SUCCESSFULLY...PLEASE LOGIN TO CONTINUE'});
});
});
router.post('/login', function(req,res) {
  console.log(req.body);
var fltrEmail = req.body.email;
var fltrPass = req.body.password;
if(fltrEmail != '' && fltrPass != '' ){
  var fltrParam = { $and:[{ email:fltrEmail },{ password:fltrPass }]};
}
else{
  var fltrParam ={};
}
var userfilter = usrmdl.findOne( fltrParam );
    userfilter.exec((err , data )=>{
      if(err) throw err;
      res.render('lrslt',{records:data});
    });
});
router.post('/lrslt', function(req,res) {
  userdata.exec(function(err , data){
    if(err) throw err;
  res.render('cntrb',{records:data});
});
});
router.post('/cntrb', function(req,res) {
  res.render('myweb',{records:''});
});
router.post('/profile' ,function(req , res, next){
  console.log("uploaded");
  // var success = req.file.filename + "uploaded successfully";
  res.render('profile', { });
})
module.exports = router;
