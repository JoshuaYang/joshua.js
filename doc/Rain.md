# Rain
generate some elements to fall down like rain.

## html format：
```html
<div id="rain"></div>
```

## style:
```css
@import "../../dev/style/rain.less";

#rain{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999999;
}
```

## usage:
```javascript
new Rain($('#rain'), {
    source: ['images/rain/yellow.png', 'images/rain/blue.png', 'images/rain/pink.png'],
    count: 20,
    minSpeed: 6,
    maxSpeed: 10,
    minDelay: 2,
    maxDelay: 6
});
```

## options:
* `source` - image source path, which are used as fall down elements
* `count` - count of fall down elements
* `minSpeed` - min speed to fall down
* `maxSpeed` - max speed to fall down
* `minDelay` - min delay time before fall down
* `maxDelay` - max delay time before fall down