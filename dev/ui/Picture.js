/**
 * @author Joshua
 * @date 2013/5/22
 */

define(['jquery', 'joshua/util/Class', 'modernizr', 'greensock/TweenMax'], function($, Class){
	// constructor method
	var Scheme = Class.extend({
		init: function(element){
			var instance = Scheme.get(element);
			if(instance){
				return instance;
			}

			Scheme._instances.push(this);

			this.$element = $(element);
			this._build();
		}
	});

	// class name of picture object
	Scheme.className = "js-picture";

	// alive object array
	Scheme._instances = [];
	
	// default options
	Scheme._options = {
		enterAnimate: false,
		enterDuration: 0.5
	};

	// get a picture object
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

	// remove and dispose frame object
	Scheme.remove = function(instance){
		var index = Scheme._instances.indexOf(instance);
		if (index >= 0) {
	        Scheme._instances.splice(index, 1);
	        instance._dispose();
	        instance = null;
	    }
	}

	// set options and do next
	Scheme.prototype._build = function(){
		this._initProperty();
		this._load();
	}

	// set options
	Scheme.prototype._initProperty = function(){
		this._source = this.$element.attr('js-source');
		this._loaded = false;
		this._rendered = false;
	}

	// load image source
	Scheme.prototype._load = function(){
		var scope = this;

		scope._texture = $('<img>').one('load', function(){
			scope._loaded = true;

			scope._render();
		}).on('error', function(){
			$(scope).trigger('error');
		}).attr('src', scope._source)[0];
	}

	// render image
	Scheme.prototype._render = function(){
		if(Modernizr.canvas){
			this._canvas = $('<canvas width="' + this._texture.width + '" height="' + this._texture.height + '">').appendTo(this.$element);
			this._context = this._canvas[0].getContext("2d");
			this._context.drawImage(this._texture, 0, 0,  this._texture.width,  this._texture.height);
		}else{
			this.$element.append(this._texture);
		}

		this._rendered = true;
		$(this).trigger('done');
	}

	// dispose resource of picture object
	Scheme.prototype._dispose = function(){
		$(this).off();
		delete this._source;
		delete this._loaded;
		delete this._rendered;
		delete this._texture;
		delete this._canvas;
		delete this._context;
		delete this.$element;
	}


	return Scheme;
});