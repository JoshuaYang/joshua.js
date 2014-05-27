![joshua](https://raw.githubusercontent.com/JoshuaYang/joshua.js/master/res/class.jpg)
# Class
a javascript module for object-oriented programming.

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