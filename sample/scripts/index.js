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
        'modernizr': 'vendors/modernizr/modernizr'
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
        'joshua/ui/Falldown',
        'joshua/ui/Fireworks',
        'joshua/util/Url',
        'joshua/test',
        'domReady!'], 
    function($, Sprite, Picture, SmoothMouseWheel, Falldown, Fireworks, Url){

    console.log(Url.getParamValue('id'));
    
    /* begin Picture */
    Picture.preload({
        prefix: './',
        onError: function(){},
        onLoad: function(loadCount, totalCount, source, width, height, element){
            console.log(parseInt(loadCount / totalCount * 100) + '%');
        },
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






    // rain
    new Falldown($('#falldown'), {
        source: ['images/falldown/yellow.png', 'images/falldown/blue.png', 'images/falldown/pink.png'],
        count: 20,
        minSpeed: 6,
        maxSpeed: 10,
        minDelay: 2,
        maxDelay: 6
    });



    //fireworks
    new Fireworks('.fireworks', {
        width: 300,
        height: 300
    });
});
