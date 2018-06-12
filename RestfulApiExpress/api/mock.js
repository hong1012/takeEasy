var express = require('express');
var router = express.Router();
var fs = require("fs");
let subRoot = 'RestfulApiExpress';

function getJson(fname) {
	return new Promise(function(resolve, reject) {
		fs.readFile('../'+subRoot+'/data/'+fname+ '.json', function (err, data) {
			if (err) {
				return console.error(err);
			}
			let fileStr = data.toString();
			resolve(fileStr);
		});
	});


}
// 处理get请求
router.get('/', function(req, res) {
	res.send({
		'username':'hong',
		'sex':'man',
		'address':'深圳'
	});
});

// 处理POST请求
router.post('/',function(req,res){
	let filename = req.param('method');
/*	res.send({
		'result':{method:req.param('method'), data:[]}
		'result':{'method':req.body.method, 'data':[]}
	})*/
	getJson(filename).then(json => {
		res.send(json)
	});
});

module.exports = router;