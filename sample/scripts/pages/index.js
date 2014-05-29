define(['jquery', 'joshua/ui/Sprite', 'joshua/ui/Picture', 'joshua/test', 'domReady!'], function($, Sprite, Picture){
	
	/* begin Picture */
	var p1;
	function preload(){
		$('.js-picture').each(function(i, item){
			var p = new Picture(item);

			$(p).on('done', function(){
				//console.log(i);
				alert(i);
			}).on('error', function(){
				//alert('error');
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
			width: 300,
			height: 291,
			texture: 'images/sprite/enter-ani.png',
			frames: 14,
			firstFrame: 0,
			lastFrame: 13,
			cols: 14,
			loop: false,
			reverse: false,
			fps: 24
		});

		$(s1).on('loaded', function(){
			//alert('loaded');
		}).on('done', function(){
			//alert('done');
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
			texture: 'images/sprite/left-ani.png',
			frames: 32,
			loop: false,
			reverse: false
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