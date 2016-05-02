'use strict';

var $images = $('#setion-portfolio .cell');
var $imgCover = $('#img-cover');
var $sectionCover = $('#section-cover');

var types = ['blondes', 'brunettes', 'reds'];

$images.click(function() {

	$sectionCover.css('display', 'block');

    var index = $images.index(this);

    $images.removeClass('is-active');
    $(this).addClass('is-active');
    $imgCover.css('opacity', 0)
        .attr('src', '../assets/img/portfolio/' + types[index] + '.jpg')
        .animate({'opacity': 1}, 'slow');

    scrollTo(0, 0);
});
