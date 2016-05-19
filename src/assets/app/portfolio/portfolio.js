'use strict';

var $images = $('#setion-portfolio .cell');
var $imgCover = $('#img-cover');
var $sectionCover = $('#section-cover');

var $h2text = $('#setion-portfolio h2');

var types = [];

$h2text.each(function() {

    types.push($(this).text().toLowerCase());

});

//console.log(types);

/*initialize*/
loadImage();


/*hash change*/
$(window).on('hashchange', loadImage);

function loadImage() {

    //console.log(location.hash);

    if (types.indexOf(location.hash.substring(1)) === -1) {

        $sectionCover.css('display', 'none');
        $images.removeClass('is-active');

    } else {

        $sectionCover.css('display', 'block');

        var index = types.indexOf(location.hash.substring(1));

        //console.log(location.hash.substring(1));


        $images.removeClass('is-active');

        $('[href="' + location.hash + '"]').parent().addClass('is-active');

        $imgCover.css('opacity', 0)
            .attr('src', '../assets/img/portfolio/' + types[index] + '.jpg')
            .animate({ 'opacity': 1 }, 'slow');
    }

    scrollTo(0, 0);
}
