/**
 * Created by hong on 2018-06-12.
 */

var api = require('./utils/api');

/*var url = 'http://retail.jdy.com/openapi/rest?method=jdy.login.user.find&dbid=79111983918&loginName=kingdeetestwjw&ver=1.0&ts=1526548977493';
api.get(url).then(function (result) {
    console.log('get data222:' + JSON.stringify(result));
  })
  .catch(function (err) {
    console.log('get error222:' + err);
  });*/

var url = 'http://retail.jdy.com/openapi/rest?method=jdy.item.picker.list&dbid=79111983918&loginName=kingdeetestwjw&ver=1.0&ts=1528772918765';
var params = {"type":"assist","pageindex":1,"pagesize":3};

api.post(url, params).then(function (parsedBody) {
    console.log('post data' + JSON.stringify(parsedBody));
  })
  .catch(function (err) {
    console.log(err);
  });
