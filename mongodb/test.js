/**
 * Created by hong on 2018/6/8.
 */
var User = require("./user.js");

/**
 * 插入
 */
function insert(userObj) {
  var user = new User(userObj);
  user.save(function (err, res) {
    if (err) {
      console.log("Error:" + err);
    } /*else {
      console.log("Res:" + res);
    }*/
  });
}

function update(){
  var wherestr = {'username' : 'hong ggg', 'userpwd' : '23'};
  var updatestr = {'userpwd': '999'};

  User.update(wherestr, updatestr, function(err, res){
    if (err) {
      console.log("Error:" + err);
    }
    else {
      console.log("Res:" + JSON.stringify(res));
    }
  })
}

function findByIdAndUpdate(){
  var id = '56f2558b2dd74855a345edb2';
  var updatestr = {'userpwd': 'abcd'};
  User.findByIdAndUpdate(id, updatestr, function(err, res){
    if (err) {
      console.log("Error:" + err);
    }
    else {
      console.log("Res:" + res);
    }
  })
}


function del(){
  var wherestr = {'username' : 'hong1'};
  User.remove(wherestr, function(err, res){
    if (err) {
      console.log("Error:" + err);
    }
    else {
      console.log("Res:" + JSON.stringify(res));
    }
  })
}


function getByConditions(){
  var wherestr = {'username' : 'hong2'};
  var opt = {"username": 1 ,"_id": 0};
  User.find(wherestr, opt, function(err, res){
    if (err) {
      console.log("Error:" + err);
    }else {
      console.log("Res:" + JSON.stringify(res));
    }
  })
}

function getCountByConditions(){
  var wherestr = {};

  User.count(wherestr, function(err, res){
    if (err) {
      console.log("Error:" + err);
    }
    else {
      console.log("count Res:" + res);
    }
  })
}

function getById(){
  var id = '56f261fb448779caa359cb73';

  User.findById(id, function(err, res){
    if (err) {
      console.log("Error:" + err);
    }
    else {
      console.log("Res:" + res);
    }
  })
}

function getByRegex(){
  var whereStr = {'username':{$regex:/hong/i}};
  User.find(whereStr, function(err, res){
    if (err) {
      console.log("Error:" + err);
    }
    else {
      console.log("Res:" + JSON.stringify(res));
    }
  })
}

function getByPager(){
  var pageSize = 5;                   //一页多少条
  var currentPage = 1;                //当前第几页
  var sort = {'logindate':-1};        //排序（按登录时间倒序）
  var condition = {};                 //条件
  var skipnum = (currentPage - 1) * pageSize;   //跳过数
  User.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, res) {
    if (err) {
      console.log("Error:" + err);
    }
    else {
      console.log("getByPager Res:" + JSON.stringify(res));
    }
  })
}

getByPager();

getByRegex();

getById();

getCountByConditions();

getByConditions();

del();

findByIdAndUpdate();

update();

initUses();

function initUses() {
  let users = [{
    username : 'hong1',
    userpwd: '123',
    userage: parseInt(Math.random() * 100),
    logindate : new Date()},
    {
      username : 'hong2',
      userpwd: '342',
      userage: parseInt(Math.random() * 100),
      logindate : new Date()},
    {
      username : 'hong3',
      userpwd: '67',
      userage: parseInt(Math.random() * 100),
      logindate : new Date()}
  ]
  for (let i=0; i<users.length; i++) {
    insert(users[i]);
  }
}


