/**
 * @author Joshua
 * @date 2013/5/22
 */

define(['jquery', 'modernizr', 'greensock/TweenMax'], function($){
	function Picture(element){
		var instance = Picture.get(element);
		if(instance){
			return instance;
		}

		Picture._instances.push(this);

		this.$element = $(element);
		this._build();
	}

	// class name of picture object
	Picture.className = "js-picture";

	// alive object array
	Picture._instances = [];
	
	// default options
	Picture._options = {
		enterAnimate: false,
		enterDuration: 0.5
	};

	// get a picture object
	Picture.get = function(element){
		var ele = $(element)[0];
		for (var i = 0; i < Picture._instances.length; ++i) {
	        var instance = Picture._instances[i];
	        if (instance.$element && instance.$element[0] == ele) {
	            return instance;
	        }
	    }
	    return null;
	}

	// remove and dispose frame object
	Picture.remove = function(instance){
		var index = Picture._instances.indexOf(instance);
		if (index >= 0) {
	        Picture._instances.splice(index, 1);
	        instance._dispose();
	        instance = null;
	    }
	}

	// set options and do next
	Picture.prototype._build = function(){
		this._initProperty();
		this._load();
	}

	// set options
	Picture.prototype._initProperty = function(){
		var options = $.extend({}, Picture._options, {
			enterAnimate: this.$element.attr('js-enter-animate') == 'true',
			enterDuration: this.$element.attr('js-enter-duration')
		});


		this._source = this.$element.attr('js-source');
		this._enterAnimate = options.enterAnimate;
		this._enterDuration = options.enterDuration;

		this._loaded = false;
		this._rendered = false;
		this._renderCanvas = Modernizr.canvas;
	}

	// load image source
	Picture.prototype._load = function(){
		var scope = this;

		scope._texture = $('<img>').one('load', function(){
			scope._width = scope._texture.width;
			scope._height = scope._texture.height;
			scope._loaded = true;

			scope._render();
		}).on('error', function(){
			$(scope).trigger('error');
		}).attr('src', scope._source)[0];
	}

	// render image
	Picture.prototype._render = function(){
		this._beforeAnimate();

		if(this._renderCanvas){
			this._canvas = $('<canvas width="' + this._width + '" height="' + this._height + '">').appendTo(this.$element);
			this._context = this._canvas[0].getContext("2d");
			this._context.drawImage(this._texture, 0, 0,  this._width,  this._height);
		}else{
			this.$element.append(this._texture);
		}

		this._rendered = true;
		$(this).trigger('done');

		this._animate();
	}

	// pretreatment for animate
	Picture.prototype._beforeAnimate = function(){
		if(!this._enterAnimate){
			return;
		}

		TweenMax.set(this.$element, {
			autoAlpha: 0
		});
	}

	// do animate if exist
	Picture.prototype._animate = function(){
		if(!this._enterAnimate){
			return;
		}

		TweenMax.to(this.$element, this._enterDuration, {
			autoAlpha: 1
		});
	}

	// dispose resource of picture object
	Picture.prototype._dispose = function(){
		$(this).off();
		delete this._source;
		delete this._enterAnimate;
		delete this._enterDuration;
		delete this._loaded;
		delete this._rendered;
		delete this._renderCanvas;
		delete this._texture;
		delete this._width;
		delete this._height;
		delete this._canvas;
		delete this._context;
		delete this.$element;
	}


	return Picture;
});