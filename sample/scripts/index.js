window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

require.config({
    baseUrl: './',
    waitSeconds: 0,
    paths: {
        "jquery": "vendors/jquery/dist/jquery.min",
        'domReady': 'vendors/requirejs-domready/domReady',
        'modernizr': 'vendors/modernizr/modernizr',
        'touchswipe': 'vendors/jquery-touchswipe/jquery.touchSwipe.min'
    },
    shim: {
        'touchswipe': {
            deps: ['jquery']
        }
    }, 
    packages: [
        { name: 'greensock', main: '', location: 'vendors/greensock/src/uncompressed' },
        { name: 'joshua', main: '', location: '../dev' }]
});

require(['jquery', 
        'joshua/ui/Sprite', 
        'joshua/ui/Picture', 
        'joshua/interact/smooth_mousewheel', 
        'joshua/ui/Teletext',
        'joshua/ui/Rain',
        'joshua/test', 
        'domReady!'], 
    function($, Sprite, Picture, SmoothMouseWheel, Teletext, Rain){

    /* begin Picture */
    Picture.preload({
        onError: function(){},
        onLoad: function(){},
        onComplete: function(){}
    });
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
            fps: 24,
            onload: function(){},
            ondone: function(){}
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
        }
    });
    // t1.reset();
    setTimeout(function(){
        t1.startAnimation();
    }, 0000);








    // rain
    new Rain($('#rain'), {
        source: ['images/rain/yellow.png', 'images/rain/blue.png', 'images/rain/pink.png'],
        count: 20,
        minSpeed: 6,
        maxSpeed: 10,
        minDelay: 2,
        maxDelay: 6
    });
});
