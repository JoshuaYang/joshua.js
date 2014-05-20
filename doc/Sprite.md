![joshua](https://avatars1.githubusercontent.com/u/5389166?s=460)
# joshua-sprite
display sequence images.

## html format：
```html
<!-- the wrapper -->
<div class="js-sprite js-sprite1" js-loop="true" js-texture="img/cursorFrames.png">
    <!-- add images that will be used -->
    <!-- nothing will still be ok, but may be slower -->
    <img src="img/cursorFrames.png" alt="">
</div>
```

## less format:
just set the width property of wrapper
```css
.js-sprite1{
	width: 320px;
}
```

## usage:
```javascript
var s1 = new Sprite('.js-sprite1', {
    width: 320,
    height: 238,
	texture: 'img/cursorFrames.png',
	staticSource: 'img/cursorStatic.png',
	frames: 72,
	firstFrame: 0,
	lastFrame: 71,
	rows: 3,
	cols: 24,
	loop: false,
	reverse: false,
	fps: 24,
	cWidth: 320,
	cHeight: 238,
	offsetX: 0,
	offsetY: 0
});
```
* `width`, `height`, `texture`, `staticSource`, `frames` these properties are necessary.
* you can also set properties in html. use `js-` prefix, all upper-words should change to `-` plus lower words.
  * eg. 'cWidth'  ===>>>  js-c-width="320"

## constructor options:
* `width` - width of each frame
* `height` - height of each frame
* `texture` - frames image path
* `staticSource` - if browser doesn't support canvas, the static image will be used
* `frames` - count of frames
* `firstFrame` - the first frame to render [*default: 0*]
* `lastFrame` - the last frame to render [*default: frames - 1*]
* `rows` - rows of frame image [*default: 1*]
* `cols` - cols of frame image [*default: frames*]
* `loop` - whether need to loop [*default: false*]
* `reverse` - back to front [*default: false*]
* `fps` - the fps of frames [*default: 24*]
* `cWidth` - width of canvas (**can be set once only when object is created**) [*default: width*]
* `cHeight` - height of canvas (**can be set once only when object is created**) [*default: height*]
* `offsetX` - X offset of frame in canvas [*default: 0*]
* `offsetY` - Y offset of frmae in canvas [*default: 0*]

## static method:
* `get(elem)` - get Sprite object
	* elem: selector or dom element
* `remove(instance)` - remove Sprite object, and dispose all relatived resources
	* instance: Sprite object

## object method:
* `pause()` - pause the playing frames animation
* `play()` - play the paused frames animation
* `replay()` - replay the paused frames animation
* `seekTo(index)` - jump to the specified frame 
	* index: the frame which will jump to
* `config(opts)` - config Sprite object with new options (**except `cWidth`, `cHeight` and `staticSource`**)
	* opts: same as the constructor options, without `cWidth`, `cHeight` and `staticSource`

## event:
* `loaded` - trigger when source imgage loaded
* `done` - trigger when frame animation is finished