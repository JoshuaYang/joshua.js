define(['jquery', 'joshua/ui/Sprite', 'joshua/ui/Picture', 'joshua/test', 'domReady!'], function($, Sprite, Picture){
	
	/* begin Picture */
	var p1;
	function preload(){
		$('.js-picture').each(function(i, item){
			var p = new Picture(item);

			$(p).on('done', function(){
				//console.log(i);
			}).on('error', function(){
				//console.log('error');
			});
		});
	}

	$('#picture #get').on('click', function(){
		console.log(Picture.get('.js-picture1'));
	});

	$('#picture #remove').on('click', function(){
		Picture.remove(Picture.get('.js-picture1'));
	});

	preload();
	/* end Picture */








	/* begin Sprite */

	var s1;
	function frameAnimation(){
		s1 = new Sprite('.js-sprite1', {
			width: 320,
			height: 238,
			texture: 'images/sprite/cursorFrames.png',
			staticSource: 'images/sprite/cursorStatic.png',
			frames: 72,
			firstFrame: 0,
			lastFrame: 71,
			rows: 3,
			cols: 24,
			loop: false,
			reverse: false,
			fps: 24,
			cWidth: 320,
			cHeight: 238,
			offsetX: 0,
			offsetY: 0
		});

		$(s1).on('loaded', function(){
			console.log('loaded');
		}).on('done', function(){
			//console.log('done');
		});
	}

	$('#sprite #play').on('click', function(){
		s1.play();
	})

	$('#sprite #pause').on('click', function(){
		s1.pause();
	})

	$('#sprite #replay').on('click', function(){
		s1.replay();
	})

	$('#sprite #config').on('click', function(){
		s1.config({
			width: 58,
			height: 52,
			frames: 29,
			texture: 'images/sprite/arrowFrames.png',
			loop: false,
			reverse: true,
			offsetX: 50,
			offsetY: 50
		});

		$(s1).off('loaded').on('loaded', function(){
			//console.log('loaded2');
		});
		$(s1).off('done').on('done', function(){
			//console.log('done2');
		});
	})

	$('#sprite #seekTo').on('click', function(){
		s1.seekTo($('#seekValue').val());
	})

	$('#sprite #get').on('click', function(){
		console.log(Sprite.get('.js-sprite1'));
	});

	$('#sprite #remove').on('click', function(){
		Sprite.remove(s1);
	});

	frameAnimation();
	/* end Sprite */	
});