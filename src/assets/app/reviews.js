'use strict';

var reviewsData = [
    { quote: "...she is probably the most skilled stylist I have ever been to. The compliments I get on my cut and color confirm that!...", cite: "- Tara H." },
    { quote: "I guarantee that you will have 5 star treatments because of the attention and care from Harmony, the view, and the way you feel when you walk out of her salon!", cite: "- Linda C." },
    { quote: "Harmony always gets my hair coloring just right, whether we're highlighting, going for full coverage or just touching up those pesky grays. And she is one of the rare few who can thin, layer and tame my long curly locks", cite: "- Becky W." },
    { quote: "Harmony, secret Zen master. Who knew?", cite: "- Spike M." },
    { quote: "...what really makes her a superstar is her ability to add interesting, complementary and vivid color...", cite: "- Megan S." },
    { quote: "I have definitely found my new hair stylist and its Harmony!", cite: "- Jackie F." },
    { quote: "The best cut and color I have had in ages hand down!", cite: "- April H." },
    { quote: "Harmony takes her time with each client and goes out of her way to deliver great service.  Plus, she's super nice and friendly. She's truly the best!", cite: "- Sasha I." },
    { quote: "...every time I go in with a new idea, I leave with exactly what I had in mind.  Harmony is so talented - she always gets it right!", cite: "- Amber M." },
    { quote: "...she has some mad skills with the shears and has a great attitude...", cite: "- Peanut B." }
];

var $quote = $('#quote');
var $cite = $('#cite');
var $selectors = $('.selector');
var i = 0;

/* AUTOPLAY REVIEWS */

var autoplay;
autoplayReviews();

/* CLICK ON SELECTOR */

$selectors.click(function() {

    var index = $selectors.index(this);
    i = index;
    updateReviews(i);

    //pause
    clearInterval(autoplay);
    //restart
    autoplayReviews();



});

/* FUNCTIONS */

function autoplayReviews() {

    autoplay = setInterval(function() {

        i = (i < (reviewsData.length - 1)) ? (i + 1) : 0;

        updateReviews(i);

    }, 4000);

}

function updateReviews(i) {

    //text
    $quote.css({ opacity: '0' }, "slow").animate({ opacity: '1' }, "slow").text(reviewsData[i].quote);
    $cite.css({ opacity: '0' }, "slow").animate({ opacity: '1' }, "slow").text(reviewsData[i].cite);

    //selectors
    $selectors.removeClass('is-active');
    $($selectors[i]).addClass('is-active');

}
