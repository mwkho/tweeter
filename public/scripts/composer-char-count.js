const textLimit = 140;
$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    let count = textLimit - $(this).val().length;
    let counter = $(this).next().children('.counter');
    count < 0 ? $(counter).addClass('negative') :  $(counter).removeClass('negative')
    $(counter).html(count);
  });
});

