/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



const dateConvert = (time) => {
  let postedDuration = new Date(time);
  const difference = Date.now() - postedDuration;
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
  } else {
    postedDuration = postedDuration.toDateString();
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
        </article>`
  return formattedTweet;
}


$(document).ready(function() {

  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
  }
  const $tweet = createTweetElement(tweetData);
  console.log($tweet);
  $('#tweet-container').append($tweet);
  

  $('article.tweet').hover(function() {
    $(this).addClass('emphasis');
  } , function() {
      $(this).removeClass('emphasis')
    }
  );
});



