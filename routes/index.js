var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var db_handle = require('../config/db_handle');  /*引入出来数据模块*/


/* GET home page. */
router.get('/', function(req, res, next) {
    /*res.render表示调用index模板文件，并把参数title传到模板文件中
      在app.js文件中设置了模板为ejs 所以这个找的是view下的index.ejs
    */
    res.render('home', { title: 'Express' });
});

router.get('/system', function(req, res, next) {
    /*res.render表示调用index模板文件，并把参数title传到模板文件中
      在app.js文件中设置了模板为ejs 所以这个找的是view下的index.ejs
    */
    res.render('system', { title: 'Express' });
});

router.get('/system/login', function(req, res, next) {
    /*res.render表示调用index模板文件，并把参数title传到模板文件中
      在app.js文件中设置了模板为ejs 所以这个找的是view下的index.ejs
    */
    res.render('systemlogin', { title: 'Express' });
});

router.get('/index', function(req, res, next) {
    /*res.render表示调用index模板文件，并把参数title传到模板文件中
      在app.js文件中设置了模板为ejs 所以这个找的是view下的index.ejs
    */
    res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
    /*res.render表示调用index模板文件，并把参数title传到模板文件中
      在app.js文件中设置了模板为ejs 所以这个找的是view下的index.ejs
    */
    res.render('test', null);
});

/*设置进入登陆界面的路由*/
router.get('/login', function(req, res, next) {
    /*res.render表示调用index模板文件，并把参数title传到模板文件中
      在app.js文件中设置了模板为ejs 所以这个找的是view下的index.ejs
    */
    res.render('login', { title: 'login' });
});

/*设置进入注册界面的路由*/
router.get('/register', function(req, res, next) {
    /*res.render表示调用index模板文件，并把参数title传到模板文件中
      在app.js文件中设置了模板为ejs 所以这个找的是view下的index.ejs
    */
    res.render('register', { title: 'register' });
});

/*设置进入注册界面的路由*/
router.post('/register', db_handle.addUser);

/*设置进入用户界面的路由，并设置title变量值为用户名*/
router.get('/login_state/:id', function(req, res){
    res.render('login_state', { title: req.params.id });
});

/*设置查找已注册账号的路由*/
router.get('/User/:id', db_handle.searchUserByID);


/*设置登陆接口的路由*/
/*登陆接口*/
router.post('/signin',db_handle.signIn);
/*管理员登陆接口*/
router.post('/systemlogin',db_handle.systemLogIN);

/*添加留言接口*/
router.post('/note',db_handle.postNote);

/*添加匿名留言接口*/
router.post('/nim_note',db_handle.postnimingNote);

/*获取笔记接口*/
router.get('/notes/:id',db_handle.getNoteByID);

/*获取未通过审核的留言接口*/
router.get('/systemget',db_handle.getNoteUnpass);

/*更改审核状态接口*/
router.put('/systemupdate/:id/:date',db_handle.updatePass);

/*获取个人历史留言接口*/
router.get('/history/:id', function(req, res){
    res.render('history', { title: req.params.id });
});

/*获取所有留言接口*/
router.get('/allnotes',db_handle.getAllNote);

/*删除留言接口*/
router.delete('/notes/:id/:date',db_handle.deleteNoteByDate);

module.exports = router;
