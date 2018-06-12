/**
 * Created by hong on 2018/5/17.
 */
var http=require('http');

function testPost(num) {
  var querystring=require('querystring');
//发送 http Post 请求
  var param = {"skey":"","nickname":"","info":{"lableName":"","startDate":"","endDate":"","dateRange":"","mobile":"","name":"","type":"","nickname":"","shopid":""},"orderColum":"","orderRule":"","shopid":"","pageIndex":1,"pageSize":20,"fromDate":"","toDate":""};
  var postData=querystring.stringify(param);
  var options={
    hostname: 'retail.jdy.com',
    port:80,
    path:'/openapi/rest?method=jdy.member.mbBaseInfoService.list&dbid=79111983918&loginName=kingdeetestwjw&ver=1.0&ts=1526545331309',
    method:'POST',
    headers:{
      'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
      'Content-Length':Buffer.byteLength(postData)
    }
  }
  var req=http.request(options, function(res) {
/*    console.log('Status:',res.statusCode);
    console.log('headers:',JSON.stringify(res.headers));*/
    var result = '';
    res.setEncoding('utf-8');
    res.on('data',function(data){
      result += data;
    });
    res.on('end',function(){
      console.log('result data');
      console.log(num);
      console.log(result);
/*      var data = JSON.parse(result)
      console.log(data);*/
    });
  });
  req.on('errorerror',function(err){
    console.error('on error');
    console.error(err);
  });
  req.write(postData);
  req.end();
}

/*for(var i=0; i<2; i++) {
  testPost(i);
}*/

function testGet() {
  //get 请求外网
  //http.get('http://www.baidu.com',function(req,res){
  var url = 'http://retail.jdy.com/openapi/rest?method=jdy.login.user.find&dbid=79111983918&loginName=kingdeetestwjw&ver=1.0&ts=1526548977493';
  http.get(url,function(req,res){
    var html='';
    req.on('data',function(data){
      html+=data;
    });
    req.on('end',function(){
      console.info(html);
    });
  });
}
//testGet()

const request = require('request');
function testGet2() {
  var url = 'http://retail.jdy.com/openapi/rest?method=jdy.login.user.find&dbid=79111983918&loginName=kingdeetestwjw&ver=1.0&ts=1526548977493';
  request(url, {json: true}, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log('body');
    console.log(body);
  });
}

testGet2();

module.exports= testPost

