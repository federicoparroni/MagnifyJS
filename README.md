# MagnifyJS

A Javascript library enabling magnifying glass effect on any element with background-image property set. Background image can have any size.

Features:
- Custom zoom level
- Works on DIVs with SRC attribute image
- Works for all background-size configuration, automatically detect background-image: size cover/contain (work in progress!)
- Press ESC to disable


### HOW TO USE:

```html
<script type="text/javascript" src="magnify.js"></script>
<link href="magnify.css" rel="stylesheet" type="text/css">

<div class="magnify" src="image.jpg" style="background: url(image.jpg) center center /cover">

<script>
$('.magnify').magnifier(); // init
var magnify = $('.magnify').magnifier().data('magnifier'); // init and get data
</script>
```


### API:

```js
magnify.setZoom(2);	// zoom level to 200% (default 1.5)
magnify.enabled = false; // disable/enable
magnify.reInit(); // reinit
```
