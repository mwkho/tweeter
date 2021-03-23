let ev = 'input'
$(document).ready(function() {
  $('#tweet-text').on(ev, function() {
    let count = 140 - $(this).val().length;
    let counter = $(this).next().children('.counter');
    if (count < 0){
      $(counter).css('color','red');
    }
    $(counter).html(count);
  });
});

