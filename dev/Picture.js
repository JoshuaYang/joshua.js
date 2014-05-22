/**
 * @author Joshua
 * @date 2013/5/22
 */

define(['jquery'], function($){
	function Picture(element){
		this.$element = $(element);
		this._build();
	}

	Picture.className = "js-picture";

	// check whether browser support canvas or not
	Picture._supportCanvas = function(){
		if(document.createElement('canvas').getContext){
			return true;
		}else{
			console.log("don't support canvas");
			return false;
		}
	}

	Picture.prototype._build = function(){
		this._initProperty();

		this._load();
	}

	Picture.prototype._initProperty = function(){
		this._source = this.$element.attr('js-source');
		this._loaded = false;
		this.rendered = false;
		this._renderCanvas = Picture._supportCanvas();
	}

	Picture.prototype._load = function(){
		var scope = this;

		scope._texture = new Image();
		scope._texture.onload = function(){
			scope._width = scope._texture.width;
			scope._height = scope._texture.height;
			scope._loaded = true;

			scope._render();
		}
		scope._texture.alt = "";
		scope._texture.src = scope._source;
	}

	Picture.prototype._render = function(){
		if(this._renderCanvas){
			this._canvas = $('<canvas width="' + this._width + '" height="' + this._height + '">').appendTo(this.$element)[0];
			this._context = this._canvas.getContext("2d");
			this._context.drawImage(this._texture, 0, 0,  this._width,  this._height);
			this.rendered = true;
		}else{
			this.$element.append(this._texture);
			this.rendered = true;
		}
	}


	return Picture;
});