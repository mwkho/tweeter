/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const dateConvert = (time) => {
  const difference = Date.now() - new Date(time);
  let postedDuration = (new Date(time)).toDateString();
  console.log(difference)
  // posted  now or X (seconds, minutes, or days ago), up to a month then insert date
  if (difference < 1000){
    postedDuration ='now';
  }
  if (difference >= 1000 && difference < 60000){
    postedDuration = `${Math.floor(difference/1000)} seconds ago`;
  }
  if (difference >= 60000 && difference < 3600000){
    postedDuration = `${Math.floor(difference/60000)} minutes ago`;
  }
  if (difference >= 3600000 && difference < 86400000){
    postedDuration = `${Math.floor(difference/3600000)} hours ago`;
  }
  if (difference >= 86400000 && difference < 2419200000){
    postedDuration = `${Math.floor(difference/86400000)} days ago`;
  } 
  return postedDuration;
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
            ${tweet.content.text}
          </p>
          <footer class="tweet-footer">
            <p> Posted ${dateConvert(tweet.created_at)}</p>
            <img src="../images/profile-hex.png"> 
          </footer>
        </article>`;
  return formattedTweet;
}

// Function to format tweet data array and add to the tweet container
const renderTweets = (tweets) => {
  tweets.forEach((tweet) => {
    $('#tweet-container').append(createTweetElement(tweet));
  })
}

$(document).ready(function() {
  const loadTweets = () => {
    $.ajax('http://localhost:8080/tweets', {
      method: "GET",
      success: (data) => {
        renderTweets(data)
      }
    })
  }
  loadTweets();
  // renderTweets(data);
  $('form').on('submit', function(event){
    event.preventDefault();
    $.ajax({ 
      method: 'POST',
      url: 'localhost:8080/',
      data: $(this).serialize()
    })
  });

  $('article.tweet').hover(function() {
    $(this).addClass('emphasis');
  } , function() {
      $(this).removeClass('emphasis')
    }
  );
});



