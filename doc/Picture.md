# Picture
preload image. If browser support canvas, will use `<canvas>`, otherwise will use `<img>`.

## html format：
```html
<!-- the wrapper -->
<!-- all options define here -->
<div class="js-picture js-picture1" js-source="images/picture/tio.jpg"></div>
```
* `source` property is necessary.

## usage:
```javascript
var p = new Picture('js-picture1');
$(p).on('done', function(){
    //...
}).on('error', function(){
    //...
});

Picture.load();
```
* call `Picture.load()` is necessary.

## constructor options:
* `source` - image path


## static method:
* `get(elem)` - get Picture object
	* elem: selector or dom element
* `remove(instance)` - remove Picture object, and dispose all relatived resources
	* instance: Picture object
* `load()` - start to load resources

## event:
* `done` - trigger when image is rendered
* `error` - trigger when cause error during load