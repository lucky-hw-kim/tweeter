$(document).ready(function() {
  console.log('scripts have been loaded');

  $('.tweet-text').on('input',function() {
    let countDown = 140-($(this).val().length - 12)
    let $counter = $(this).parent().children('.below-tweet').children('.counter');
    if(countDown >= 0) {
    $counter.html(countDown).removeClass("text-red")
    } else {
    $counter.html(countDown).addClass("text-red")
    }
  });
});


//$inputField.val('')







