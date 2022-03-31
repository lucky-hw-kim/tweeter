/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const $tweetForm = $('.tweet-submit-form');
  const text = $('.tweet-text');
  const $scrollUpBtn = $('.fa-circle-chevron-up');
  const $newTweet = $('.new-tweet');

  $('#empty').hide();
  $('#exceed').hide();

  /* 
  * Helper Functions
  */
  
  //scroll page to the top & slides down the new tweetpage
  $scrollUpBtn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop:0}, '300');
    if ($newTweet.hasClass("form-toggle")) {
      text.focus();
    } else {
      $newTweet.toggleClass("form-toggle");
      text.focus();
    }
  });

  //Toggle scroll to top button
  $(window).scroll(function() {
    if ($(window).scrollTop() > 100) {
      $scrollUpBtn.addClass('btn-show');
    } else {
      $scrollUpBtn.removeClass('btn-show');
    }
  });


  // Toggle new tweet section
  const $navArrow = $('.fa-angles-down');
  $navArrow.click(function() {
    $newTweet.toggleClass("form-toggle");
    text.focus();
  });


  //Escape function for preventing XSS
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

   
  /*
  * Create, load and render all the tweets to the page
  */

  const loadTweets = function() {
    $.get('/tweets/', function(data) {
      $('#tweet-container').empty();
      renderTweets(data);
    });
  };

  loadTweets();

  let renderTweets = function(tweets) {
    for (let tweet of tweets) {
      $('#tweet-container').prepend(createTweetElement(tweet));
    }
  };

  const createTweetElement = function(tweet) {
    let $tweet = `<article class="tweet"> 
            <header>
              <div class="user">
                <img class="user-icon" src=${tweet.user.avatars}>
                <p class="name">${tweet.user.name}</p>
              </div>
              <div class="user-handle">${tweet.user.handle}</div>
            </header>
              <div class=length-control>
                <h4 class="tweet-msg">${escape(tweet.content.text)}</h4>
                <div class="tweet-msg-line"></div>
              </div>
            <footer>
              <div class="post-date">${timeago.format(tweet.created_at)}</div>
              <div class="tweet-icons">
                <i class="fa-solid fa-flag"></i>
                <i class="fa-solid fa-retweet"></i>
                <i class="fa-solid fa-heart"></i>
              </div>
            </footer>
          </article>`;
    return $tweet;
  };

  /*
  * Submit new post the page using ajax 
  */

  $tweetForm.submit(function(event) {
    event.preventDefault();
    //Hide the error message back
    $('#empty').slideUp();
    $('#exceed').slideUp();

    //Trigger error messages
    if (text.val().length < 1 || text.val() === null) {
      $('#empty').slideDown().show();
    } else if (text.val().length > 140) {
      $('#exceed').slideDown().show();
    } else {
      let serializedText = text.serialize();
      $.post('/tweets/', serializedText).done(()=> {
        loadTweets();
      });
      text.parent().find(".counter").removeClass('text-red').val(140);
      text.val('');
    }
    text.focus();
  });
});



