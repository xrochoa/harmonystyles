'use strict';

var $navBurger = $('.nav-burger');
var $siteNav = $('#site-nav');
var $body = $('body');


$navBurger.click(function() {

    $siteNav.toggleClass('is-active');
    $navBurger.toggleClass('is-active');
    $body.toggleClass('is-active');

});
