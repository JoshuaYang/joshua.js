![joshua](https://raw.githubusercontent.com/JoshuaYang/joshua.js/master/res/picture.jpg)
# Picture
preload image. If browser support canvas, will use `<canvas>`, otherwise will use `<img>`.

## html format：
```html
<!-- the wrapper -->
<!-- all options define here -->
<div class="js-picture js-picture1" js-source="images/picture/tio.jpg" js-enter-animate="true" js-enter-duration="0.5"></div>
```
* `source` property is necessary.

## usage:
```javascript
var p = new Picture('js-picture1');
```

## constructor options:
* `source` - image path
* `enterAnimate` - whether need use enter animation [*default: false*]
* `enterDuration` - duration time of enter animation [*default: 0.5*]


## static method:
* `get(elem)` - get Picture object
	* elem: selector or dom element
* `remove(instance)` - remove Picture object, and dispose all relatived resources
	* instance: Picture object

## event:
* `done` - trigger when image is rendered
* `error` - trigger when cause error during load