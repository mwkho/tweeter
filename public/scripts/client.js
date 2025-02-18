/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const dateConvert = (time) => {
  const difference = Date.now() - new Date(time);
  let postedDuration = (new Date(time)).toDateString();
  // posted  now or X (seconds, minutes, or days ago), up to a month then insert date
  if (difference < 1000) {
    postedDuration = 'now';
  }
  if (difference >= 1000 && difference < 60000) {
    postedDuration = `${Math.floor(difference / 1000)} seconds ago`;
  }
  if (difference >= 60000 && difference < 3600000) {
    postedDuration = `${Math.floor(difference / 60000)} minutes ago`;
  }
  if (difference >= 3600000 && difference < 86400000) {
    postedDuration = `${Math.floor(difference / 3600000)} hours ago`;
  }
  if (difference >= 86400000 && difference < 2419200000) {
    postedDuration = `${Math.floor(difference / 86400000)} days ago`;
  }
  return postedDuration;
};

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

let createTweetElement = (tweet) => {
  const user = tweet.user;
  let formattedTweet = `<article class="tweet">
          <header class="tweet-header">
            <div class="tweet-user">
              <img src="${user.avatars}"> 
              ${user.name}
            </div>
            <p>${user.handle}</p>
          </header>
          <p class="tweet-content">
            ${escape(tweet.content.text)}
          </p>
          <footer class="tweet-footer">
            <p> Posted ${dateConvert(tweet.created_at)}</p>
            <div>
            <i class="flaticon-like"></i>
            <i class="flaticon-comment"></i>
            <i class="flaticon-share"></i>
            </div>
          </footer>
        </article>`;
  return formattedTweet;
};

// Function to format tweet data array and add to the tweet container
const renderTweets = (tweets) => {
  tweets.forEach((tweet) => {
    $('#tweet-container').prepend(createTweetElement(tweet));
  });
};

const loadTweets = () => {
  $.ajax({
    method: "GET",
    url:'/tweets',
    success: (data) => {
      renderTweets(data);
    }
  });
};

$(document).ready(function() {
  const textLimit = 140;
  loadTweets();
  $('#tweet-text').val('');

  
  $('form').on('submit', function(event) {
    event.preventDefault();
    let length = $('#tweet-text').val().trim().length;

    // error handling
    $('.error').hide();
    if (length === 0) {
      $('.error').text('Empty tweets are not allowed!');
      $('.error').slideDown(300);
    }
    if (length > textLimit) {
      $('.error').text(`Tweets must be ${textLimit} non whitespace characters or less. Yours is ${length} long.`);
      $('.error').slideDown(300);
    }
    if (length > 0 && length <= textLimit) {
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: $(this).serialize(),
        success: () => {
          $('#tweet-text').val('');
          // $('.tweet').remove();
          // loadTweets();
          $.ajax({
            method: "GET",
            url:'/tweets',
            success: (data) => {
              renderTweets(data.slice(data.length - 1));
            }
          });
          $('.counter').html(textLimit);
        }
      });
    }
  });
});

