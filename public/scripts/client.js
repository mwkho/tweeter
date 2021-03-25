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
}

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
            <img src="../images/profile-hex.png"> 
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
 
  // for when the mouse hovers a tweet, make the shawdow show
  $('.tweet').on('click',function () {
      $(this).addClass('hover');
    }
    //, function () {
    //   $(this).removeClass('hover');
    // }
  );
  loadTweets();
  $('#tweet-text').val('');

  
  // $('form').on('submit', function(event){
  //   event.preventDefault();
  //   $('.error' ).hide()
  //   length = $('#tweet-text').val().trim().length;
  //   if(length === 0){
  //     $('.error').text('Tweets that are empty or with only whitespace are not alllowed!');
  //     $('.error').slideDown(300);
  //   }
  //   if(length > textLimit){
  //     $('.error').text(`Tweets must be ${textLimit} non whitespace characters or less. Yours is ${length} long.`);
  //     $('.error').slideDown(300);
  //   }
  //   if (length > 0 && length <= textLimit){
  //     $.ajax({ 
  //       method: 'POST',
  //       url: '/tweets',
  //       data: $(this).serialize(),
  //       success: () => {
  //         $('#tweet-text').val('');
  //         $('.tweet').remove();
  //         loadTweets();
  //       }
  //     })
  //   }
  // });
});

