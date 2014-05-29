/**
 * @author Joshua
 * @date 2013/5/6
 */

define(['jquery','joshua/ui/Picture', 'joshua/util/Class', 'modernizr'], function($, Picture, Class){
 	// constructor method
 	var Scheme = Class.extend({
 		init: function(element, opts){
 			var instance = Scheme.get(element);
			if(instance){
				return instance;
			}

			Scheme._instances.push(this);

			this.$element = $(element);
			this._setCss();

			this._initProperty(opts);
 		}
 	});

	// class name of sprite object
	Scheme.className = "js-sprite";

	// alive object array
	Scheme._instances = [];

	// default options
	Scheme._options = {
		firstFrame: 0,
		//lastFrame: ,
		//cols: ,
		loop: false,
		reverse: false,
		fps: 24,
		mode: Modernizr.canvas ? 'canvas' : 'background'  // canvas & background
	};

	// get a sprite object
	Scheme.get = function(element){
		var ele = $(element)[0];
		for (var i = 0; i < Scheme._instances.length; ++i) {
	        var instance = Scheme._instances[i];
	        if (instance.$element && instance.$element[0] == ele) {
	            return instance;
	        }
	    }
	    return null;
	}

	// remove and dispose sprite object
	Scheme.remove = function(instance){
		for(var i = 0; i < Scheme._instances.length; ++i){
			if(Scheme._instances[i] == instance){
				Scheme._instances.splice(i, 1);
				instance._dispose();
				instance = null;
				break;
			}
		}
	}

	// start to load all resources
	Scheme.load = function(){
		for(var i = 0; i < Scheme._instances.length; ++i){
			Scheme._instances[i]._load();
		}
	}

	// set css properties
	Scheme.prototype._setCss = function(){
		this.$element.find('div').css('display', 'none');
	}

	// init properties
	Scheme.prototype._initProperty = function(opts){
		var options = $.extend({}, Scheme._options, {
			width: this.$element.attr('js-width'),
			height: this.$element.attr('js-height'),
			texture: this.$element.attr('js-texture'),
			frames: this.$element.attr('js-frames'),
			firstFrame: this.$element.attr('js-first-frame'),
			lastFrame: this.$element.attr('js-last-frame'),
			cols: this.$element.attr('js-cols'),
			loop: this.$element.attr('js-loop') == 'true',
			reverse: this.$element.attr('js-reverse') == 'true',
			fps: this.$element.attr('js-fps'),
			mode: this.$element.attr('js-mode')
		}, opts);

		this._width = options.width;
		this._height = options.height;
		this._texture = options.texture;
		this._frames = options.frames;
		this._firstFrame = options.firstFrame;
		this._lastFrame = options.lastFrame ? options.lastFrame : this._frames - 1;
		this._cols = options.cols ? options.cols : this._frames;
		this._loop = options.loop;
		this._reverse = options.reverse;
		this._fps = options.fps;
		this._mode = options.mode;

		this._currentIndex = this._reverse ? this._lastFrame : this._firstFrame;
		this._timeDist = 1000 / this._fps;
		this._st = null;
		this._paused = true;
		this._ended = false;
		this._loaded = false;
	}

	Scheme.prototype._load = function(){
		switch(this._mode){
			case 'canvas':
				this._initCanvas();
				break;
			case 'background':
				this._initBackground();
				break;
		}
	}

	// init canvas, get the context, load source image
	Scheme.prototype._initCanvas = function(){
		var scope = this,
			$scope = $(scope);

		if(scope._loaded){
			$scope.trigger('loaded');
			return;
		}

		if(!scope._canvas){
			scope._canvas = $('<canvas width="' + scope._width + '" height="' + scope._height + '">').appendTo(scope.$element)[0];
			scope._context = scope._canvas.getContext("2d");
		}

		scope._img = $('<img>').one('load', function(){
			scope._loaded = true;
			$scope.trigger('loaded');
		}).attr('src', scope._texture)[0];
	}

	// init background
	Scheme.prototype._initBackground = function(){
		var scope = this,
			$scope = $(scope);

		if(scope._loaded){
			$scope.trigger('loaded');
			return;
		}

		scope.$element.css({
			'background-image': 'url(' + scope._texture + ')',
			'background-position': '0 0'
		});

		scope._loaded = true;
		$scope.trigger('loaded');
	}

	// render frame animation, and check if reach end or should loop
	Scheme.prototype._renderFrames = function(){
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
	Scheme.prototype._draw = function(){
		var xPos = this._currentIndex % this._cols;
		var yPos = parseInt(this._currentIndex / this._cols);


		switch(this._mode){
			case 'canvas':
				this._context.clearRect(0, 0, this._width, this._height);
				this._context.drawImage(this._img, xPos * this._width, yPos * this._height, this._width, this._height, 0, 0, this._width, this._height);
				break;;
			case 'background':
				this.$element.css({
					'background-position': -xPos * this._width + 'px ' + (-yPos * this._height + 'px')
				});
				break;
		}
	}

	// dispose resource of sprite object
	Scheme.prototype._dispose = function(){
		$(this).off();
		delete this._width;
		delete this._height;
		delete this._texture;
		delete this._frames;
		delete this._firstFrame;
		delete this._lastFrame;
		delete this._cols;
		delete this._loop;
		delete this._reverse;
		delete this._fps;
		delete this._currentIndex;
		delete this._timeDist;
		delete this._st;
		delete this._paused;
		delete this._ended;
		delete this._loaded;
		delete this.$element;
		delete this._canvas;
		delete this._context;
		delete this._img;
		delete this._mode;
	}

	

	// pause the animation at current frame
	Scheme.prototype.pause = function(){
		if(!this._loaded) return;
		if(this._paused) return;
		if(this._ended) return;
		
		this._paused = true;
		clearTimeout(this._st);
	}

	// play the animation from current frame
	Scheme.prototype.play = function(){
		if(!this._loaded) return;
		if(!this._paused) return;
		if(this._ended) return;

		this._paused = false;
		this._renderFrames();
	}

	// replay the paused or finished animation from the first frame
	Scheme.prototype.replay = function(){
		if(!this._loaded) return;
		if(!this._paused) return;

		this._currentIndex = this._reverse ? this._lastFrame : this._firstFrame;
		this._paused = false;
		this._ended = false;
		this._renderFrames();
	}

	// jump to the specified frame
	Scheme.prototype.seekTo = function(index){
		this._ended = false;
		this.pause();

		index = index < 0 ? 0 : index;
		index = index > this._frames ? this._frames - 1 : index;
		this._currentIndex = index;
		this._draw();
	}

	// config Scheme object with new options
	Scheme.prototype.config = function(opts){
		if(!this._paused) return;

		this._texture = opts.texture ? opts.texture : this._texture;
		this._frames = opts.frames ? opts.frames : this._frames;
		this._firstFrame = opts.firstFrame ? opts.firstFrame : 0;
		this._lastFrame = opts.lastFrame ? opts.lastFrame : this._frames - 1;
		this._cols = opts.cols ? opts.cols : this._frames;
		this._loop = opts.loop ? opts.loop : false;
		this._reverse = opts.reverse ? opts.reverse : false;
		this._fps = opts.fps ? opts.fps : 24;

		this._currentIndex = this._reverse ? this._lastFrame : this._firstFrame;
		this._timeDist = 1000 / this._fps;
		this._st = null;
		this._paused = true;
		this._ended = false;
		this._loaded = false;
	}


	return Scheme;
});

