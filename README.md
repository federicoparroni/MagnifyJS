# MagnifyJS

A Javascript library enabling magnifying glass effect on any element with background-image property set. Background image can have any size.

Features:
- Custom zoom level
- Works on DIVs with SRC attribute image
- Works for all background-size configuration, automatically detect background-image: size cover/contain (work in progress!)
- Press ESC to disable




HOW TO USE:

HTML:
	1) Import reference to .js and .ccs files
	2) Insert in body DIV:   <div class="magnify" src="image.jpg" style="background: url(image.jpg) center center /cover">
JS:
	1) Initialize:				                 $('.magnify').magnifier();
	2) Initialize and get magnify data:	   var magnify = $('.magnify').magnifier().data('magnifier');



API:

Methods:
	1) Set zoom level: 	 magnify.setZoom(2);	// zoom level 200%, default 1.5
	2) Disable/Enable: 	 magnify.enabled = false/true;
	3) Reinit: 		       magnify.reInit();
