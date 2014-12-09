/**
 * @author Joshua
 * @date 2013/5/22
 */

define(['jquery', 'joshua/util/Class', 'joshua/util/Platform', 'modernizr'], function($, Class){
	// constructor method
	var Scheme = Class.extend({ 
		init: function(element){
			this.$element = $(element);
		}
	});

	// class name of picture object
	Scheme.className = "js-picture";


	// start to load all pictures
	Scheme.preload = function(options){
		Scheme.options = options ? options : {};

		Scheme.items = $('.' + Scheme.className);
		Scheme.totalCount = Scheme.items.length;
		Scheme.loadCount = 0;

		if(Scheme.totalCount == 0){
			Scheme._doIfComplete();
		}

		Scheme.items.each(function(i, item){
			new Scheme(item)._load();
		});
	}


	// increase loaded count
	Scheme._doIfComplete = function(){
		++Scheme.loadCount;

		if(Scheme.totalCount == 0 || Scheme.loadCount == Scheme.totalCount && Scheme.options.onComplete){
			Scheme.options.onComplete();
		}
	}


	// load image source
	Scheme.prototype._load = function(){
		var scope = this;
		scope._source = scope.$element.attr('js-source');
		scope._imgtype = scope.$element.attr('js-imgtype');

		if(Scheme.options.prefix){
			scope._source = Scheme.options.prefix + '/' + scope._source;
		}

		scope._texture = $('<img>').one('load', function(){
			scope._texture = this;// fixed ie8
			scope._render();
		}).on('error', function(){
			Scheme._doIfComplete();

			if(Scheme.options.onError){
				Scheme.options.onError();
			}
		}).attr('src', scope._source)[0];
	}


	// render image
	Scheme.prototype._render = function(){
		var scope = this;

		if(scope._imgtype == 'bg'){
			scope.$element.css({ 'background-image': 'url('+ scope._source +')'});
		}else if(Modernizr.canvas && !window.platform.isAndroid && scope._source.indexOf('.gif') == -1){
			scope._renderer = $('<canvas width="' + scope._texture.width + '" height="' + scope._texture.height + '">').appendTo(scope.$element);
			scope._context = scope._renderer[0].getContext("2d");
			scope._context.drawImage(scope._texture, 0, 0,  scope._texture.width,  scope._texture.height);
		}else{
			scope._renderer = $('<img src="' + scope._source + '" alt="">').appendTo(scope.$element);
		}

		Scheme._doIfComplete();

		if(Scheme.options.onLoad){
			Scheme.options.onLoad(Scheme.loadCount, Scheme.totalCount);
		}
	}


	return Scheme;
});