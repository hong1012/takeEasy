var express = require('express');
var router = express.Router();
var fs = require("fs");
var api = require('./api');
const subRoot = 'RestfulApiExpress';
const forwardUrl = 'http://retail.jdy.com/openapi/rest';
var rnum = 0;

// 处理get请求
router.get('/', function(req, res) {
	res.send({'getting'});
});

// 处理POST请求
router.post('/',function(req,res){
/*	console.log(req)
	console.log('req.url')
	console.log(req.url)
	console.log('req.body')
	console.log(req.body)*/
	rnum = rnum + 1;
	let method = req.param('method');
	let filename = '../'+subRoot+'/data/'+method+ '.json';
	var params = req.body;
	fs.exists(filename,function(exists){
		if(exists){
			console.log('本地模拟:' + rnum);
			console.log(method);
			console.log(params);
			api.getData(filename).then(json => {
				res.send(json)
			});
		} else {
			// 转发请求
			var url = req.url || '';
			url = forwardUrl + url.substr(1);
			console.log('转发请求:' + rnum);
			console.log(url);
			console.log(params);
			api.post(url, params).then(function (parsedBody) {
					res.send(parsedBody);
					api.saveData(filename, parsedBody);
				})
				.catch(function (err) {
					console.log(err);
				});
		}
	})
});

module.exports = router;