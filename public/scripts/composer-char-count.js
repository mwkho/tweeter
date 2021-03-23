let ev = 'input'
$(document).ready(function() {
  $('#tweet-text').on(ev, function() {
    let count = 140 - $(this).val().length;
    let counter = $(this).next().children('.counter');
    count < 0 ? $(counter).addClass('negative') :  $(counter).removeClass('negative')
    $(counter).html(count);
  });
});

