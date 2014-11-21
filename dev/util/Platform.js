/**
 * @author Joshua
 * @date 2014/11/21
 */

define(function(){
    var ua = window.navigator.userAgent.toLowerCase();//alert(ua);

    window.platform = {
        isiPad: ua.match(/ipad/i) !== null,
        isiPhone: ua.match(/iphone/i) !== null,
        isAndroid: ua.match(/android/i) !== null,
        isBustedAndroid: ua.match(/android 2\.[12]/) !== null,
        isAndroid23: ua.match(/android 2\.3/i) !== null,
        isAndroid404: ua.match(/android 4\.0\.4/i) !== null,
        isAndroid412: ua.match(/android 4\.1\.2/i) !== null,
        isAndroid422: ua.match(/android 4\.2\.2/i) !== null,
        isAndroid43: ua.match(/android 4\.3/i) !== null,
        isIE: /(msie|trident)/i.test(navigator.userAgent), //window.navigator.appName.indexOf("Microsoft") !== -1,
        isIE8: ua.match(/msie 8/) !== null,
        ltIE9 : $("html").hasClass("lt-ie9"),
        isChrome: ua.match(/Chrome/gi) !== null,
        isFirefox: ua.match(/firefox/gi) !== null,
        isWebkit: ua.match(/webkit/gi) !== null,
        isGecko: ua.match(/gecko/gi) !== null,
        isOpera: ua.match(/opera/gi) !== null,
        isMobile: navigator.userAgent.match(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile/i) && navigator.userAgent.match(/Mobile/i) !== null,
        hasTouch: ('ontouchstart' in window),
        supportsSvg: !! document.createElementNS && !! document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect
    };

    window.platform.isAndroidPad = platform.isAndroid && !platform.isMobile;
    window.platform.isTablet = platform.isiPad || platform.isAndroidPad;
    window.platform.isDesktop = !(platform.isMobile || platform.isTablet);
    window.platform.isIOS = platform.isiPad || platform.isiPhone;
    window.platform.isiPhone4 = platform.isiPhone && window.screen.height == 480;
    window.platform.isiPhone5 = platform.isiPhone && window.screen.height == 568;
    window.platform.isIOS5 = window.platform.isIOS && ua.match(/os 5/i) !== null;
    window.platform.isIOS6 = window.platform.isIOS && ua.match(/os 6/i) !== null;
    window.platform.isIOS7 = window.platform.isIOS && ua.match(/os 7/i) !== null;
});

