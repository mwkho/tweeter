let ev = 'input'
$(document).ready(function() {
  $('#tweet-text').on(ev, function() {
    let count = 140 - $(this).val().length;
    $(this).next().children('.counter').html(count);
  });
});

