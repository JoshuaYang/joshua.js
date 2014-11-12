define(['jquery', 
		'joshua/ui/Sprite', 
		'joshua/ui/Picture', 
		'joshua/interact/smooth_mousewheel', 
		'joshua/ui/Teletext',
		'joshua/test', 
		'domReady!'], 
	function($, Sprite, Picture, SmoothMouseWheel, Teletext){

	/* begin Picture */
	var p1;
	function preload(){
		$('.js-picture').each(function(i, item){
			var p = new Picture(item);

			$(p).on('done', function(){
				//alert(i);
			}).on('error', function(){
				//alert('error');
			});
		});

		Picture.load();
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

		Sprite.load();
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

		$(s1).off().on('loaded', function(){
			//alert('loaded2');
		}).on('done', function(){
			//alert('done2');
		});

		Sprite.load();
	})

	$('#sprite #seekTo').on('click', function(){
		s1.seekTo($('#sprite #seekValue').val());
	})

	$('#sprite #get').on('click', function(){
		console.log(Sprite.get('.js-sprite1'));
	});

	$('#sprite #remove').on('click', function(){
		Sprite.remove(s1);
	});

	frameAnimation();
	/* end Sprite */






	/* begin SmoothMosueWheel */
	$('#smooth_mousewheel #enable').on('click', function(){
		SmoothMouseWheel.enable({
			spring: .4,
	        duration: 900,
	        maxDetail: 40
		});
	});	

	$('#smooth_mousewheel #disable').on('click', function(){
		SmoothMouseWheel.disable();
	});

	$('#smooth_mousewheel #destroy').on('click', function(){
		SmoothMouseWheel.destroy();
	});

	$('#smooth_mousewheel #lock').on('click', function(){
		SmoothMouseWheel.lock();
	});

	$('#smooth_mousewheel #unlock').on('click', function(){
		SmoothMouseWheel.unlock();
	});

	$('#smooth_mousewheel #scrollTo').on('click', function(){
		SmoothMouseWheel.scrollTo($('#smooth_mousewheel #scrollToValue').val());
	});

	/* end SmoothMosueWheel */









	var t1;
	t1 = new Teletext('.js-teletext', {
		callback: function(){
			alert('over');
		}
	});
	// t1.reset();
	setTimeout(function(){
		t1.startAnimation();
	}, 0000);












});