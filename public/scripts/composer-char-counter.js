$(document).ready(function() {
  console.log('loaded')
});

document.querySelector("#tweet-text").focus();
document.querySelector("#tweet-text").setSelectionRange(0,0);


// $('#tweet-text').blur(function() {
//   console.log( "Handler for .blur() called.", this );
// });

// $('#tweet-text').focus(function() {
//   console.log( "Handler for .focus() called.", this );
// });

// $( '#tweet-text' ).keydown(function() {
//   console.log( "Handler for .keydown() called.", this );
// });

$('#tweet-text').on('input',function() {
   let countDown = 140-($(this).val().length - 12)
   let counter = $(this).parent().children('.below-tweet').children('.counter');
   if(countDown >= 0) {
   counter.html(countDown).removeClass("text-red")
   } else {
    counter.html(countDown).addClass("text-red")
   }
});







// $( '#tweet-text' ).change(function() {
//   console.log( "Handler for .change() called.", this );
// });

// $( '#tweet-text' ).on(function() {
//   console.log( "Handler for .input() called.", this );
// });

// $( '#tweet-text' ).click(function() {
//   console.log( "Handler for .input() called.", this );
// });


