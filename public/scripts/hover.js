$(document).ready(function() {
  $('.tweet').hover(
    function () {
      $(this).addClass('hover');
    },
    function () {
      $(this).removeClass("hover");
    }
  );

})