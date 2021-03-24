/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $('.tweet-container').hover(function() {
    $(this).addClass('emphasis');
  } , function() {
      $(this).removeClass('emphasis')

    }
  );  
});