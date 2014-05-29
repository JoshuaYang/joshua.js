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
			this._initProperty();
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
		for(var i = 0; i < Scheme._instances.length; ++i){
			if(Scheme._instances[i] == instance){
				Scheme._instances.splice(i, 1);
				instance._dispose();
				instance = null;
				break;
			}
		}
	}

	// start to load all pictures
	Scheme.load = function(){
		for(var i = 0; i < Scheme._instances.length; ++i){
			Scheme._instances[i]._load();
		}
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
			scope._texture = this;// fixed ie8
			scope._render();
		}).on('error', function(){
			$(scope).trigger('error');
		}).attr('src', scope._source)[0];
	}

	// render image
	Scheme.prototype._render = function(){
		var scope = this,
			$scope = $(scope);

		if(Modernizr.canvas){
			scope._renderer = $('<canvas width="' + scope._texture.width + '" height="' + scope._texture.height + '">').appendTo(scope.$element);
			scope._context = scope._renderer[0].getContext("2d");
			scope._context.drawImage(scope._texture, 0, 0,  scope._texture.width,  scope._texture.height);
		}else{
			scope._renderer = $('<img src="' + scope._source + '" alt="">').appendTo(scope.$element);
		}

		scope._rendered = true;
		$scope.trigger('done');	
	}

	// dispose resource of picture object
	Scheme.prototype._dispose = function(){
		$(this).off();
		delete this._source;
		delete this._loaded;
		delete this._rendered;
		delete this._texture;
		delete this._renderer;
		delete this._context;
		delete this.$element;
	}


	return Scheme;
});