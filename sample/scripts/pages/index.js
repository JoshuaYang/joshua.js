define(['jquery', 'joshua/Sprite', 'joshua/Picture', 'domReady!'], function($, Sprite, Picture){
	
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
			console.log('done');
		});
	}

	$('#play').on('click', function(){
		s1.play();
	})

	$('#pause').on('click', function(){
		s1.pause();
	})

	$('#replay').on('click', function(){
		s1.replay();
	})

	$('#config').on('click', function(){
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
			console.log('loaded2');
		});
		$(s1).off('done').on('done', function(){
			console.log('done2');
		});
	})

	$('#seekTo').on('click', function(){
		s1.seekTo($('#seekValue').val());
	})

	$('#get').on('click', function(){
		console.log(Sprite.get('.js-sprite1'));
	});

	$('#remove').on('click', function(){
		Sprite.remove(s1);
	});

	frameAnimation();

	/* end Sprite */




	/* begin Picture */

	var p1;
	function preload(){
		new Picture('.js-picture1');
	}

	preload();
	/* end Picture */
});