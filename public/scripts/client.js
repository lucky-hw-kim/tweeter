/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  const loadTweets = function () {
  $.get('/tweets/', function (data){
    renderTweets(data)
    })
  }

  loadTweets();

  let renderTweets = function (tweets) {
    for(let tweet of tweets) {
     $('#tweet-container').prepend(createTweetElement(tweet))
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
          </article>`
    return $tweet;
  }

  //Escape function for preventing XSS
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const $tweetForm = $('#tweet-submit-form');
  const text = $('.tweet-text')

  // $tweetBtn.click(function() {
    $tweetForm.submit(function(event) {
      //Stop backend POST request
      event.preventDefault();

      //If text is longer than 140, alert error message
      //If 0 or null alert error message
      if(text.val().length < 1 || text.val() === null) {
        alert(`⚠️You need to write something to post it!!!⚠️`)
      } 
      else if(text.val().length > 140) {
        alert(`⚠️Your post length exceeds the limit (140 characters)!!!⚠️`)
      } else {
        let serializedText = text.serialize();   
        $.post('/tweets/', serializedText).done(() => {
          $.get('/tweets/', function (data){
            const newTweet = data[data.length - 1];
            const $createTweet = createTweetElement(newTweet);
            $('#tweet-container').prepend($createTweet);
          });
        });
      }
      text.val('').focus();
      text.parent().find(".counter").removeClass('text-red').val(140);
    })
   });
//    loadTweets();
// })





