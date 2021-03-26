const textLimit = 140;
$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    let length = $(this).val().trim().length;
    let count = textLimit - $(this).val().trim().length;
    let counter = $(this).next().children('.counter');
    count < 0 ? $(counter).addClass('negative') :  $(counter).removeClass('negative');
    $(counter).html(count);
  });
});

