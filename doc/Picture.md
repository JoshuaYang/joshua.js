# Picture
preload image. If browser support canvas, will use `<canvas>`, otherwise will use `<img>`.

## html format：
```html
<div class="js-picture" js-imgtype="bg" js-source="images/picture/tio.jpg"></div>
```
* `source` property is necessary.

## usage:
```javascript
Picture.preload({
    onError: function(){},
    onLoad: function(){},
    onComplete: function(){}
});
```

## property:
* `js-source` - image path
* `js-imgtype` - declare only if want to render as background-image


## static method:
* `preload()` - load all images

## options:
* `onError` - call when cause error during load
* `onLoad(loadCount, totalCount, source)` - call when image is loaded
* `onComplete` - call when all images are loaded