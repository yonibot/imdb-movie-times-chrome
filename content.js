// On page load (of G Movies), add a box with IMDB rating (for now),
// which also links to the IMDB page.

// 1. Grab all movie title strings
// 2. Loop through each title and query the rating
// 3. When the rating arrives, add a new DOM element next to the movie title
// with the rating and a link to the movie on IMDB


function allMovieTitleLinks() {
  return $('.movie .name a')
}

function getMovieTitle(title) {
  return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', "http://www.omdbapi.com/?t="+title);
      xhr.onload = resolve;
      xhr.onerror = reject;
      xhr.send();
  });
}

function addMovieRatings() {
  allMovieTitleLinks().each(function() {
    var movieLink = this;
    var movieTitle = this.innerHTML;
    getMovieTitle(movieTitle)
      .then(function(e) {
        var json = JSON.parse(e.target.response);
        var imdbLink = "http://www.imdb.com/title/" + json.imdbID + "/";
        var imdbRating = json.Response == "False" ? "N/A" : json.imdbRating;
        $(movieLink).parents('.name').prepend('<a style="font-weight: bold; padding-right: 5px; text-decoration: none;" href="' + imdbLink + '" target="_blank">' + imdbRating + '</span>');
      })
  })
}

addMovieRatings()
