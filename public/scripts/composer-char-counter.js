$(document).ready(function() {
  $('.tweet-text').on('input',function() {
    let countDown = 140-($(this).val().length)
    let $counter = $(this).parent().children('.below-tweet').children('.counter');
    if(countDown >= 0) {
    $counter.text(countDown).removeClass("text-red")
    } else {
    $counter.text(countDown).addClass("text-red")
    }
  });
});






