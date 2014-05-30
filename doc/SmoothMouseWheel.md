# SmoothMousewheel
take over mouse wheel event, and make it smooth.

## options
``` javascript
defaultOptions = {
	spring : .4,		spring ease
    duration : 900,		the time scrollTo will take
    maxDetail : 40		length of step
}
```

## API
* `SmoothMousewheel.enable([options])` - enable SmoothMousewheel
* `SmoothMouseWheel.disable()` - disable SmoothMousewheel
* `SmoothMouseWheel.destroy()` - destroy SmoothMousewheel
* `SmoothMouseWheel.lock()` - lock SmoothMousewheel
* `SmoothMouseWheel.unlock()` - unlock SmoothMousewheel
* `SmoothMouseWheel.scrollTo(top, [duration, easing])` - scroll to designated top position
	* `top` - top position
	* `duration` - the time scrollTo will take, default is 900
	* `easing` - jquery easing, default is "linear"


## event
``` javascript
$(window).on("SmoothScroll",function(e){
	console.log(e.scrollTop);
});
```