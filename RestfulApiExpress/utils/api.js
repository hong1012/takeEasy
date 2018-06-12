/**
 * Created by hong on 2018-06-12.
 */
//const request = require('request');
const rp = require('request-promise');
var fs = require("fs");

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

function saveData(fname, data) {
  //异步方法
  fs.writeFile(fname, JSON.stringify(data),function(err){
    if(err)
      console.log('写文件' + fname + '操作失败');
    else
      console.log(fname + '已生成');
  });
}

module.exports = {
  get,
  post,
  getData,
  saveData
}
