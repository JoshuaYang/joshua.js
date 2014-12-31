# Sprite
display sequence images.

## html format：
```html
<!-- the wrapper -->
<div class="js-sprite js-sprite1">
    <!-- add images that will be used -->
    <!-- nothing will still be ok, but may be slower -->
    <div class="js-picture js-picture01" js-source="images/sprite/enter-ani.png"></div>
</div>
```

## usage:
```javascript
var s1 = new Sprite('.js-sprite1', {
    width: 320,
    height: 238,
	texture: 'images/sprite/enter-ani.png'
	frames: 14,
	firstFrame: 0,
	lastFrame: 13,
	cols: 14,
	loop: false,
	reverse: false,
	fps: 24,
    mode: 'canvas',
    onload: function(){},
    ondone: function(){}
});
$(s1).on('loaded', function(){
    //...
}).on('done', function(){
    //...
});

Sprite.load();
```
* call `Sprite.load()` is necessary.
* `width`, `height`, `texture`, `frames` these properties are necessary.
* you can also set properties in html. use `js-` prefix, all upper-words should change to `-` plus lower words.
  * eg. 'firstFrame'  ===>>>  js-first-frame="320"

## constructor options:
* `width` - width of each frame
* `height` - height of each frame
* `texture` - frames image path
* `frames` - count of frames
* `firstFrame` - the first frame to render [*default: 0*]
* `lastFrame` - the last frame to render [*default: frames - 1*]
* `cols` - cols of frame image [*default: frames*]
* `loop` - whether need to loop [*default: false*]
* `reverse` - back to front [*default: false*]
* `fps` - the fps of frames [*default: 24*]
* `mode` - how to render frames (`'canvas'` or `'background'`) [*if browser support canvas, then will use, otherwise will use background*]
* `onload` - call when source image loaded
* `ondone` - call when frame animation is finished

## static method:
* `get(elem)` - get Sprite object
	* elem: selector or dom element
* `remove(instance)` - remove Sprite object, and dispose all relatived resources
	* instance: Sprite object
* `load()` - start to load resources

## object method:
* `pause()` - pause the playing frames animation
* `play()` - play the paused frames animation
* `replay()` - replay the paused frames animation
* `seekTo(index)` - jump to the specified frame 
	* index: the frame which will jump to
* `config(opts)` - config Sprite object with new options (**except `width`, `height` and `mode`**)
	* opts: same as the constructor options, without `width`, `height` and `mode`