/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  const loadTweets = function () {
  $.get('/tweets/', function (data){
    renderTweets(data);
    })
  }
  loadTweets();

  const renderTweets = function (tweets) {
    for(let tweet of tweets) {
     $('#tweet-container').append(createTweetElement(tweet))
    }
  }

  const createTweetElement = function (tweet) {
    let $tweet = `<article class="tweet"> 
            <header>
              <div class="user">
                <img class="avatar" src=${tweet.user.avatars}>
                <p>${tweet.user.name}</p>
              </div>
              <div class="user-handle">${tweet.user.handle}</div>
            </header>
              <div class=length-control>
                <h4 class="tweet-msg">${tweet.content.text}</h4>
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
          </article>`
    return $tweet;
  }

  const $tweetBtn = $('.tweet-btn');
  const $tweetForm = $('#tweet-submit-form');
  const text = $('.tweet-text')

  $tweetBtn.click(function() {
    $tweetForm.submit(function(event) {
      if(text.val().length > 140) {
        alert(`⚠️Your post length exceeds the limit (140 characters)!!!⚠️`)
        event.preventDefault();
      } else if(text.val().length < 1 || text.val() === null) {
        alert(`⚠️You need to write something to post it!!!⚠️`)
        event.preventDefault();
      } else {
        let serializedText = text.serialize();   
        $.post('/tweets/', serializedText);
        event.preventDefault();
      }
      $('.tweet-text').val('');
      $('.counter').replaceWith(140)
    })
   });
})


// else {
//   $tweetForm.submit(function(event) {
//     let serializedText = text.serialize();   
//     $.post('/tweets/', serializedText);
//     event.preventDefault();
//   })
//   $('.tweet-text').val('');
//   $('.counter').replaceWith(140)
// }
