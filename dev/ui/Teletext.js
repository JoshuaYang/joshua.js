/**
 * @author Joshua
 * @date 2013/5/22
 */

define(['jquery', 'joshua/util/Class', 'modernizr', 'greensock/TweenMax', 'touchswipe'], function($, Class){
	// constructor method
	var Scheme = Class.extend({ 
		init: function(element, opts){
			this.$element = $(element);
			this._initProperty(opts);
		}
	});

	Scheme._options = {
		items: '.teletext-item'
	};

	Scheme.currentStyle = {
		display: 'block',
		'z-index': 3,
		autoAlpha: 1,
		x: '0%',
		y: '0%',
		scale: 1,
		rotation: '0deg'
	};
	Scheme.nextStyle = {
		display: 'block',
		'z-index': 2,
		autoAlpha: 1,
		x: '0%',
		y: '0%',
		scale: 1,
		rotation: '1.6deg'
	};
	Scheme.next2Style = {
		display: 'block',
		'z-index': 1,
		autoAlpha: 1,
		x: '0%',
		y: '0%',
		scale: 1,
		rotation: '3.2deg'
	};
	Scheme.normalStyle = {
		'display': 'none',
		'z-index': -1,
		autoAlpha: 0,
		x: '0%',
		y: '0%',
		scale: 1,
		rotation: '3.2deg'
	};
	Scheme.originStyle = {
		display: 'block',
		x: '180%',
		y: '180%',
		scale: 3,
		rotation: '30deg'
	};

	// set options
	Scheme.prototype._initProperty = function(opts){
		var options = $.extend({}, Scheme._options, opts);

		this._options = options;
		this._items = this.$element.find(this._options.items);
		this.canSwipe = true;

		this._setCss();
		this._initEvents();
	}

	Scheme.prototype._setCss = function(){
		if(this.$element.css('position') != 'relative'){
			this.$element.css('position', 'relative');
		}

		this._items.css({
			position: 'absolute',
			left: 0,
			top: 0,
			width: '100%',
			height: '100%',
			display: 'none'
		});

		this._length = this._items.length;
		this.reset();
	}

	Scheme.prototype._initEvents = function(){
		var scope = this;

		scope.$element.swipe({
			swipeLeft:function(event, direction, distance, duration, fingerCount) {
				scope._startSwipe('-200%');
			},
			swipeRight:function(event, direction, distance, duration, fingerCount) {
				scope._startSwipe('200%');
			},
		    threshold:0
		});
	}

	Scheme.prototype._updateIndex = function(){
		this._nextIndex = (this._currentIndex + 1) == this._length ? 0 : this._currentIndex + 1;
		this._next2Index = (this._nextIndex + 1) == this._length ? 0 : this._nextIndex + 1;
	}

	Scheme.prototype._startSwipe = function(distance){
		var scope = this;

		if(!scope.canSwipe) return;

		scope.canSwipe = false;

		TweenMax.to(scope._items.eq(scope._currentIndex), 0.6, {
			x: distance,
			autoAlpha: 0,
			onComplete: function(){
				setTimeout(function(){
					scope.canSwipe = true;
				}, 1000);

				TweenMax.set(scope._items.eq(scope._currentIndex), Scheme.normalStyle);

				scope._currentIndex = scope._nextIndex;
				scope._updateIndex();

				TweenMax.to(scope._items.eq(scope._currentIndex), 1, Scheme.currentStyle);
				TweenMax.to(scope._items.eq(scope._nextIndex), 1, Scheme.nextStyle);
				TweenMax.to(scope._items.eq(scope._next2Index), 1, Scheme.next2Style);
			}
		});
	}

	Scheme.prototype.reset = function(){
		this.canSwipe = false;
		this._currentIndex = 0;
		this._updateIndex();

		TweenMax.set(this._items, Scheme.normalStyle);
		TweenMax.set(this._items.eq(this._currentIndex), Scheme.currentStyle);
		TweenMax.set(this._items.eq(this._nextIndex), Scheme.nextStyle);
		TweenMax.set(this._items.eq(this._next2Index), Scheme.next2Style);

		TweenMax.set(this._items.eq(this._currentIndex), Scheme.originStyle);
		TweenMax.set(this._items.eq(this._nextIndex), Scheme.originStyle);
		TweenMax.set(this._items.eq(this._next2Index), Scheme.originStyle);
	}

	Scheme.prototype.startAnimation = function(){
		var scope = this;

		setTimeout(function(){
			scope.canSwipe = true;
			
			if(scope._options.callback){
				scope._options.callback();
			}
		}, 1800);

		TweenMax.to(scope._items.eq(scope._next2Index), 0.8, $.extend({}, Scheme.next2Style, {delay: 0}));
		TweenMax.to(scope._items.eq(scope._nextIndex), 0.8, $.extend({}, Scheme.nextStyle, {delay: 0.5}));
		TweenMax.to(scope._items.eq(scope._currentIndex), 0.8, $.extend({}, Scheme.currentStyle, {delay: 1.0}));
	}



	return Scheme;
});