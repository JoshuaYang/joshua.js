/**
 * @author Joshua
 * @date 2014/11/18
 */

define(['jquery', 'joshua/util/Class'], function($, Class){
	// constructor method
	var Scheme = Class.extend({ 
		init: function(element, options){
			this.$element = $(element);

			this._setCss();
			this._initProperty(options);
			this._generateRandom();
		}
	});


	Scheme._options = {
		count: 20,
		minSpeed: 6,
		maxSpeed: 10,
		minDelay: 2,
		maxDelay: 6
	};

	Scheme.prototype._setCss = function(){
		this.$element.css({
			'pointer-events': 'none',
			'user-select': 'none'
		});

		if(this.$element.css('position') != 'fixed' && this.$element.css('position') != 'absolute'){
			this.$element.css('position', 'relative');
		}
	}

	Scheme.prototype._initProperty = function(options){
		this._options = $.extend({}, Scheme._options, options);
	}

	Scheme.prototype._generateRandom = function(){
		var scope = this; 

		for(var i = 0; i < scope._options.count; ++i){
			var posX = random(10, scope.$element.width() - 20);
			var duration = random(scope._options.minSpeed, scope._options.maxSpeed);
			var delay = random(scope._options.minDelay, scope._options.maxDelay);
			var index = random(0, scope._options.source.length);

			var img = $('<img>').attr('src', scope._options.source[index])
						.css({
							position: 'absolute',
							left: posX,
							top: -20,
							animation: 'falldown ' + duration + 's linear ' + delay + 's infinite'
						})
						.appendTo(scope.$element);
		}
	}


	function random(start, end){
		return parseInt(start + Math.random() * (end - start));
	}


	return Scheme;
});