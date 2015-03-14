(function ($, window, document) {

    var Magnifier = {
        magnifier: 0,
        glass: 0,
        zoom: 1.5,
        coverFactor: 1,
        nativeW: 0,
        nativeH: 0,
        CoverOffsetX: 0,
        CoverOffsetY: 0,

        enabled: true,

        /* standard selection */
        selectors: {
            glass_class: 'glass' // lame
            , glass: '.glass'
            , thumb: '.thumb'
            , active_class: 'active'
        },
        init: function (el) {
            //add glass to each magnifier
            Magnifier.glass = $('<div></div>').addClass(Magnifier.selectors.glass_class);

            // get the native image size of each magnifier source image
            Magnifier.magnifier = $(el);
            var $thumb = Magnifier.magnifier.find(Magnifier.selectors.thumb);
            
            Magnifier.initParam();

            $thumb.before(Magnifier.glass.css({
                'background-image': 'url(' + $thumb.attr('src') + ')'
            }));

            // EVENTI
            Magnifier.magnifier.on('mousemove', Magnifier.behaviors.mousemove);

            $(window).on('resize', Magnifier.behaviors.resize);

            $(document).keydown(function(e) {
                if (e.keyCode == 27) {
                    Magnifier.enabled = false;
                    Magnifier.behaviors.fadeOut();
                }   // escape key (keycode '27')
            });

            $thumb.on('mouseleave', function () {
                Magnifier.behaviors.fadeOut();
            });

            return Magnifier;
        },
        initParam: function () {
            var $thumb = Magnifier.magnifier.find(Magnifier.selectors.thumb);

            var image_object = new Image();
            image_object.src = $thumb.attr("src");
            // onload img
            image_object.onload = function () {

                //calcolo per le dimensioni dell'immagine con COVER
                var nativeWidth = image_object.width;
                var nativeHeight = image_object.height;
                Magnifier.nativeW = nativeWidth;
                Magnifier.nativeH = nativeHeight;

                var thumbWidth = $thumb.width();
                var thumbHeight = $thumb.height();
                var coverFactor = Math.max(thumbWidth / nativeWidth, thumbHeight / nativeHeight);
                Magnifier.coverFactor = coverFactor;

                var finalWidth = nativeWidth * coverFactor * Magnifier.zoom;
                var finalHeight = nativeHeight * coverFactor * Magnifier.zoom;

                // offset impostato dal COVER center center
                Magnifier.CoverOffsetX = ($thumb.width() - nativeWidth * coverFactor) / 2;
                Magnifier.CoverOffsetY = ($thumb.height() - nativeHeight * coverFactor) / 2;
                
                Magnifier.glass.css('background-size', finalWidth + 'px ' + finalHeight + 'px');
            }
            Magnifier.glass.css('background-image', 'url(' + $thumb.attr('src') + ')');
            return Magnifier;
        },
        behaviors: {
            fadeDelay: 300,
            /* fade in/out glass overlay if mouse is outside container */
            isHover: function (cw, ch, mx, my) {
                return ((mx < cw && my < ch && mx > 0 && my > 0) && $(window).width() > 991 && !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)))
                ;
            },
            fadeOut: function () {
                Magnifier.glass.fadeOut(Magnifier.behaviors.fadeDelay);
            }
            ,
            mousemove: function (e) {
                if (!Magnifier.enabled) return;

                var $magnifier = $(this)
                    , offset = $magnifier.offset() // relative position
                    , mx = e.pageX - offset.left // relative to mouse
                    , my = e.pageY - offset.top  // relative to mouse
                    , $glass = $magnifier.find(Magnifier.selectors.glass)
                    , $thumb = $magnifier.find(Magnifier.selectors.thumb)
                    , rx, ry, bgp // relative ratios
                    , glass_width = $glass.width()
                    , glass_height = $glass.height()
                ;

                if (Magnifier.behaviors.isHover($magnifier.width(), $magnifier.height(), mx, my)) {
                    $glass.fadeIn(Magnifier.behaviors.fadeDelay);     // show glass

                    //The background position of .glass will be changed according to the position
                    //of the mouse over the .small image. So we will get the ratio of the pixel
                    //under the mouse pointer with respect to the image and use that to position the
                    //large image inside the magnifying glass
                    Rx = -Math.round((mx) * Magnifier.nativeW * Magnifier.coverFactor * Magnifier.zoom / $thumb.width() - glass_width / 2);
                    Ry = -Math.round((my) * Magnifier.nativeH * Magnifier.coverFactor * Magnifier.zoom / $thumb.height() - glass_height / 2);
                    var cx = mx * 2 * Magnifier.CoverOffsetX / $thumb.width() - Magnifier.CoverOffsetX;
                    var cy = my * 2 * Magnifier.CoverOffsetY / $thumb.height() - Magnifier.CoverOffsetY;
                    bgp = (Rx - cx) + "px " + (Ry - cy) + "px";

                    $glass.css({
                        left: mx - glass_width / 2
                        , top: my - glass_height / 2
                        , backgroundPosition: bgp
                    });

                }//-- if visible
                else {
                    // hide
                    Magnifier.behaviors.fadeOut();
                }
            },//--        fn mousemove
            resize: function () {
                Magnifier.initParam();
            }
        }
    };////----        Magnifier


    $.fn.magnifier = function () {
        return this.each(function () {
            if ($(this).data("magn-init") === true) {
                return false;
            }
            $(this).data("magn-init", true);
            var magnifier = Object.create(Magnifier);
            var M = magnifier.init(this);
            $(this).data("magnifier", M);
        });
    };

}(jQuery, window, document));