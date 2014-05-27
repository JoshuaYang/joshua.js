![joshua](https://avatars1.githubusercontent.com/u/5389166?s=460)
# Class
a javascript module for object-oriented.

## usage
```javascript
var Base = Class.extend({
    init: function(){
    	console.log('Base constructor method');
    }
});

var Sub = Base.extend({
	init: function(opts){
    	console.log('Sub constructor method');
    }
});
```

## parameter
* `init` - the constructor method

## methid
* `extend(object)` - derive a new class from current class, all object attributes will be prototype attributes.