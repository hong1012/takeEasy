/**
 * Created by hong on 2018/5/18.
 */

function observeKeyv(obj, key, keyv) {
  observeObject(keyv)
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get: function() {
      console.log('我被读取了' + key + ':' + keyv)
      return keyv
    },
    set: function(value) {
      console.log('我被设置了' + key + ':' + value)
      keyv = value
    }
  })
}
function observeObject(obj) {
  if(typeof obj !== 'object') {
    return;
  }
  for (var key in obj) {
    observeKeyv(obj, key, obj[key]);
  }
}

var testObject = {
  a: {
    name: 'hongge',
    age: 32
  },
  b: 2,
  c: 3
};

observeObject(testObject);
testObject.a.name = 'hggg'
console.log(testObject.a.name)


/*console.log(testObject.a.name + 1)
testObject.b = 3
console.log(testObject.b + 1)
console.log(testObject.a.name)*/
