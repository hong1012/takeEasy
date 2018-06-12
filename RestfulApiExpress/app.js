var app = require('express')();
var responseTime = require('response-time');
var redis = require('redis');
var bodyParser = require('body-parser');
var multer = require('multer');
/*
// 创建数据库客户端
var client = redis.createClient();
client.on('error',function(err){
	console.log('error'+err);
});*/

// 设置端口
app.set('port',(process.env.PORT || 3000));

// 使用请求计时模块
app.use(responseTime());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(multer);


// 设置/routes/index文件为总的路由控制文件
// 在routes/index文件中再进行统一的路由分发，这样防止app.js中代码过于臃肿
var routes = require('./routes/index');
routes(app);

// 启动服务的时候监听端口号
app.listen(app.get('port'),function(){
	console.log('Server listening on port:',app.get('port'));
});
