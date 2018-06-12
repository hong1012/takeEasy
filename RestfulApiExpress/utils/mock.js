var express = require('express');
var router = express.Router();
var fs = require("fs");
var api = require('./api');
const subRoot = 'RestfulApiExpress';
const forwardUrl = 'http://retail.jdy.com/openapi/rest';
var rnum = 0;
var localFilePriority = false;

// 处理get请求
router.get('/', function(req, res) {
	res.send('getting');
});

// 处理POST请求
router.post('/',function(req,res){
/*	console.log(req)
	console.log('req.url')
	console.log(req.url)
	console.log('req.body')
	console.log(req.body)*/
	console.log('req.query')
	console.log(req.query)
	rnum = rnum + 1;
	let method = req.param('method');
	let dbid = req.query.dbid || 0;
	let dirname = '../'+subRoot+'/data/'+dbid+'/';
	let filename = dirname+method+ '.json';
	if (localFilePriority) {
		fs.exists(filename,function(exists){
			if(exists){
				console.log('本地模拟:' + rnum);
				console.log(method);
				console.log(req.body);
				api.getData(filename).then(json => {
					res.send(json)
				});
			} else {
				callApi(req,res,dirname,filename);
			}
		})
	} else {
		callApi(req,res,dirname,filename);
	}
});

function callApi(req, res, dirname, filename) {
	// 转发请求
	var url = req.url || '';
	url = forwardUrl + url.substr(1);
	var params = req.body;
	console.log('转发请求:' + rnum);
	console.log(url);
	console.log(params);
	api.post(url, params).then(function (parsedBody) {
			res.send(parsedBody);
			api.saveData(dirname, filename, parsedBody);
		})
		.catch(function (err) {
			console.log('请求没响应');
			console.log(err);
		});
}

module.exports = router;