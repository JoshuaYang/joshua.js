/**
 * @author Joshua
 * @date 2013/5/6
 */

// constructor method
function Sprite(element, opts){
	var instance = Sprite.get(element);
	if(instance){
		return instance;
	}

	Sprite._instances.push(this);

	this.$element = $(element);
	this._setCss();

	this._build(opts);
}

// alive object array
Sprite._instances = [];

// default options
Sprite._options = {
	firstFrame: 0,
	//lastFrame: ,
	rows: 1,
	//cols: ,
	loop: false,
	reverse: false,
	fps: 24,
	//cWidth: ,
	//cHeight: ,
	offsetX: 0,
	offsetY: 0,
	onInitialized: null,
	onFinished: null
};

// check whether browser support canvas or not
Sprite._supportCanvas = function(){
	if(document.createElement('canvas').getContext){
		return true;
	}else{
		console.log("don't support canvas");
		return false;
	}
}

// get a frame object
Sprite.get = function(element){
	var ele = $(element)[0];
	for (var i = 0; i < Sprite._instances.length; ++i) {
        var instance = Sprite._instances[i];
        if (instance.$element && instance.$element[0] == ele) {
            return instance;
        }
    }
    return null;
}

// remove and dispose frame object
Sprite.remove = function(instance){
	var index = Sprite._instances.indexOf(instance);
	if (index >= 0) {
        Sprite._instances.splice(index, 1);
        instance._dispose();
        instance = null;
    }
}

// set css properties
Sprite.prototype._setCss = function(){
	this.$element.find('div, img').css('display', 'none');
	this.$element.find('img, canvas').css('width', '100%');
}

// build options and do next
Sprite.prototype._build = function(opts){
	this._initProperty(opts);

	if(!this._renderCanvas){
		this._renderStatic();
		return;
	}

	this._initStage();
	this._loadResource();
}

// init properties
Sprite.prototype._initProperty = function(opts){
	var options = $.extend({}, Sprite._options, {
		width: this.$element.attr('js-width'),
		height: this.$element.attr('js-height'),
		texture: this.$element.attr('js-texture'),
		staticSource: this.$element.attr('js-static-source'),
		frames: this.$element.attr('js-frames'),
		firstFrame: this.$element.attr('js-first-frame'),
		lastFrame: this.$element.attr('js-last-frame'),
		rows: this.$element.attr('js-rows'),
		cols: this.$element.attr('js-cols'),
		loop: this.$element.attr('js-loop') == 'true',
		reverse: this.$element.attr('js-reverse') == 'true',
		fps: this.$element.attr('js-fps'),
		cWidth: this.$element.attr('js-c-width'),
		cHeight: this.$element.attr('js-c-height'),
		offsetX: this.$element.attr('js-offset-x'),
		offsetY: this.$element.attr('js-offset-y')
	}, opts);

	this._width = options.width;
	this._height = options.height;
	this._texture = options.texture;
	this._staticSource = options.staticSource;
	this._frames = options.frames;
	this._firstFrame = options.firstFrame;
	this._lastFrame = options.lastFrame ? options.lastFrame : this._frames - 1;
	this._rows = options.rows;
	this._cols = options.cols ? options.cols : this._frames;
	this._loop = options.loop;
	this._reverse = options.reverse;
	this._fps = options.fps;
	this._cWidth = options.cWidth ? options.cWidth : this._width;
	this._cHeight = options.cHeight ? options.cHeight : this._height;
	this._offsetX = options.offsetX;
	this._offsetY = options.offsetY;

	this._currentIndex = this._reverse ? this._lastFrame : this._firstFrame;
	this._timeDist = 1000 / this._fps;
	this._st = null;
	this._paused = true;
	this._ended = false;
	this._loaded = false;
	this._renderCanvas = Sprite._supportCanvas();
}

// show static image, only when browser doesn't support canvas
Sprite.prototype._renderStatic = function(){
	var scope = this;

	var img = scope.$element.find("img[src='" + scope._staticSource + "']");
	if(img.length > 0){
		img.css('display', 'block');
	}else{
		var ti = new Image();
		ti.onload = function(){
			ti.style.display = 'block';
			scope.$element.append(ti);
		}
		ti.src = scope._staticSource;
	}
}

// init canvas, and get the context
Sprite.prototype._initStage = function(){
	var scope = this;

	scope._canvas = $('<canvas width="' + scope._cWidth + '" height="' + scope._cHeight + '">').css('width', '100%').appendTo(scope.$element)[0];
	scope._context = scope._canvas.getContext("2d");
}

// load resource image
Sprite.prototype._loadResource = function(){
	var scope = this;
		$scope = $(scope);

	//source exists and loaded
	if(scope._img && scope._img.src.indexOf(scope._texture) != -1){
		scope._loaded = true;
		return;
	}

	var ss = scope.$element.find("img[src='" + scope._texture + "']");
	if(ss.length > 0){
		scope._img = ss[0];
		scope._loaded = true;

		setTimeout(function(){
			$scope.trigger('loaded');
		}, 50);
	}else{
		scope._img = new Image();

		scope._img.onload = function(){
			scope._loaded = true;

			setTimeout(function(){
				$scope.trigger('loaded');
			}, 50);
		}
		scope._img.alt = "";
		scope._img.src = scope._texture;
	}
}

// render frame animation, and check if reach end or should loop
Sprite.prototype._renderFrames = function(){
	var scope = this,
		$scope = $(scope);

	scope._st = setTimeout(function(){
		scope._draw();

		if(scope._reverse){
			--scope._currentIndex;
		}else{
			++scope._currentIndex;
		}
		
		//end
		if((!scope._reverse && scope._currentIndex == scope._lastFrame + 1) || (scope._reverse && scope._currentIndex == scope._firstFrame - 1)){
			if(scope._loop){
				scope._currentIndex = scope._reverse ? scope._lastFrame : scope._firstFrame;
				scope._renderFrames();
			}else{
				scope._ended = true;
				scope._paused = true;
				clearTimeout(scope._st);

				$scope.trigger('done');
			}
		}else{
			scope._renderFrames();
		}
	}, scope._timeDist);	
}

// draw current frame
Sprite.prototype._draw = function(){
	var xPos = this._currentIndex % this._cols;
	var yPos = parseInt(this._currentIndex / this._cols);

	this._context.clearRect(0, 0, this._cWidth, this._cHeight);
	this._context.drawImage(this._img, xPos * this._width, yPos * this._height, this._width, this._height, this._offsetX, this._offsetY, this._width, this._height);
}

// dispose resource of frame object
Sprite.prototype._dispose = function(){
	$(this).off();
	delete this._width;
	delete this._width;
	delete this._height;
	delete this._texture;
	delete this._staticSource;
	delete this._frames;
	delete this._firstFrame;
	delete this._lastFrame;
	delete this._rows;
	delete this._cols;
	delete this._loop;
	delete this._reverse;
	delete this._fps;
	delete this._cWidth;
	delete this._cHeight;
	delete this._offsetX;
	delete this._offsetY;
	delete this._currentIndex;
	delete this._timeDist;
	delete this._st;
	delete this._paused;
	delete this._ended;
	delete this._loaded;
	delete this._renderCanvas;
	delete this.$element;
	delete this._canvas;
	delete this._context;
	delete this._img;
}

// pause the animation at current frame
Sprite.prototype.pause = function(){
	if(!this._renderCanvas) return;
	if(!this._loaded) return;
	if(this._paused) return;
	if(this._ended) return;
	
	console.log('===pause===');
	this._paused = true;
	clearTimeout(this._st);
}

// play the animation from current frame
Sprite.prototype.play = function(){
	if(!this._renderCanvas) return;
	if(!this._loaded) return;
	if(!this._paused) return;
	if(this._ended) return;
	
	console.log('===play===');
	this._paused = false;
	this._renderFrames();
}

// replay the paused or finished animation from the first frame
Sprite.prototype.replay = function(){
	if(!this._renderCanvas) return;
	if(!this._loaded) return;
	if(!this._paused) return;

	console.log('===replay===');
	this._currentIndex = this._reverse ? this._lastFrame : this._firstFrame;
	this._paused = false;
	this._ended = false;
	this._renderFrames();
}

// jump to the specified frame
Sprite.prototype.seekTo = function(index){
	if(!this._renderCanvas) return;

	this._ended = false;
	this.pause();

	index = index < 0 ? 0 : index;
	index = index > this._frames ? this._frames - 1 : index;
	this._currentIndex = index;
	this._draw();
}

// config Sprite object with new options
Sprite.prototype.config = function(opts){
	if(!this._renderCanvas) return;
	if(!this._paused) return;

	this._width = opts.width ? opts.width : this._width;
	this._height = opts.height ? opts.height : this._height;
	this._texture = opts.texture ? opts.texture : this._texture;
	this._frames = opts.frames ? opts.frames : this._frames;
	this._firstFrame = opts.firstFrame ? opts.firstFrame : 0;
	this._lastFrame = opts.lastFrame ? opts.lastFrame : this._frames - 1;
	this._rows = opts.rows ? opts.rows : 1;
	this._cols = opts.cols ? opts.cols : this._frames;
	this._loop = opts.loop ? opts.loop : false;
	this._reverse = opts.reverse ? opts.reverse : false;
	this._fps = opts.fps ? opts.fps : 24;
	this._offsetX = opts.offsetX ? opts.offsetX : 0;
	this._offsetY = opts.offsetY ? opts.offsetY : 0;

	this._currentIndex = this._reverse ? this._lastFrame : this._firstFrame;
	this._timeDist = 1000 / this._fps;
	this._st = null;
	this._paused = true;
	this._ended = false;
	this._loaded = false;

	this._loadResource();
}