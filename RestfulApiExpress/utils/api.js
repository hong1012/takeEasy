/**
 * Created by hong on 2018-06-12.
 */
//const request = require('request');
const rp = require('request-promise');
var fs = require("fs");
var path = require('path');

function get(url) {  
  var options = {
    uri: url,
    qs: {
      access_token: ''
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  };
  return rp(options);
}

function post(url, params) {
  var options = {
    method: 'POST',
    uri: url,
    body: params,
    json: true
  };
  return rp(options);
}

function getData(fname) {
  return new Promise(function(resolve, reject) {
    fs.readFile(fname, 'utf8', function (err, data) {
      if (err) {
        return console.error(err);
      }
      let fileStr = data.toString();
      resolve(fileStr);
    });
  });
}

function createFile(fname, data) {
  if (data.result === 200) {
    // 只保存服务器正常响应的内容
    fs.writeFile(fname, JSON.stringify(data),function(err){
      if(err)
        console.log('写文件' + fname + '操作失败');
      else
        console.log(fname + '已生成');
    });
  }
}

function fileExists(filepath) {
  return new Promise(function(resolve, reject) {
    fs.exists(filepath,function(exists){
      resolve(exists)
    });
  });
}

function mkdir(dirname, filepath) {
  return new Promise(function(resolve, reject) {
    fs.mkdir(filepath,function(err){
      if(err){
        console.error(err);
      }else {
        console.log('目录' + dirname + '已生成');
      }
      resolve(!err);
    });
  });
}

async function saveData(dirname, fname, data) {
  var filepath = path.resolve(dirname);
  let fexists = await fileExists(filepath);
  if (!fexists) {
    await mkdir(dirname, filepath)
  }
  createFile(fname, data);
}

/*
function saveData(dirname, fname, data) {
  var filepath = path.resolve(dirname);
  console.info(filepath);
  fs.exists(filepath,function(exists){
    if(exists)
      createFile(fname, data);
    else
      console.log('文件夹不存在');
      fs.mkdir(filepath,function(err){
        if(err){
          console.error(err);
        }else {
          console.log('目录'+ dirname + '已生成');
          createFile(fname, data);
        }
      });
  });
}
*/

module.exports = {
  get,
  post,
  getData,
  saveData
}
