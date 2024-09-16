// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  const directors = moviesArray.map(movie => movie.director);
  return [...new Set(directors)];
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  return moviesArray.filter(movie => 
    movie.director === "Steven Spielberg" && movie.genre.includes("Drama")
  ).length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (moviesArray.length === 0) return 0;

  // Map scores to 0 if undefined or null, and then filter out any possible negative scores (although should not be present)
  const scores = moviesArray
    .map(movie => movie.score || 0); // Extract scores, default to 0 if undefined or null

  if (scores.length === 0) return 0; // If no valid scores, return 0

  const totalScore = scores.reduce((sum, score) => sum + score, 0);
  const averageScore = totalScore / scores.length;

  return parseFloat(averageScore.toFixed(2));
}


// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  const dramaMovies = moviesArray.filter(movie => movie.genre.includes("Drama"));
  if (dramaMovies.length === 0) return 0;
  const totalDramaScore = dramaMovies.reduce((sum, movie) => {
    return sum + (movie.score || 0);  
  }, 0);
  const averageDramaScore = totalDramaScore / dramaMovies.length;
  return parseFloat(averageDramaScore.toFixed(2));  
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  return moviesArray
    .slice()  // Create a shallow copy of the array
    .sort((a, b) => {
      if (a.year === b.year) {
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());  // Order by title if years are the same
      }
      return a.year - b.year;  // Order by year
    });
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  return moviesArray
    .map(movie => movie.title)  // Extract titles
    .sort((a, b) => a.localeCompare(b))  // Sort titles alphabetically
    .slice(0, 20); 
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  return moviesArray.map(movie => {
    const duration = movie.duration;
    let hours = 0;
    let minutes = 0;

    // Check if duration includes 'h' and extract hours
    if (duration.includes('h')) {
      hours = parseInt(duration.split('h')[0]);
    }

    // Check if duration includes 'min' and extract minutes
    if (duration.includes('min')) {
      minutes = parseInt(duration.split('h')[1]?.replace('min', '').trim()) || 0;
    }

    // Calculate total minutes
    const totalMinutes = (hours * 60) + minutes;

    // Return a new movie object with updated duration
    return { ...movie, duration: totalMinutes };
  });
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (moviesArray.length === 0) return null;  // Return null for an empty array

  const yearMap = moviesArray.reduce((acc, movie) => {
    const year = movie.year;
    const score = movie.score || 0;

    if (!acc[year]) {
      acc[year] = { totalScore: 0, count: 0 };
    }
    acc[year].totalScore += score;
    acc[year].count += 1;

    return acc;
  }, {});

  let bestYear = null;
  let bestAverage = -Infinity;  // Initialize with a very low value to find the highest average

  // Iterate through yearMap to find the best year
  for (const year in yearMap) {
    const { totalScore, count } = yearMap[year];
    const averageScore = totalScore / count;

    // Update bestYear and bestAverage based on the conditions
    if (averageScore > bestAverage || (averageScore === bestAverage && parseInt(year) < parseInt(bestYear))) {
      bestAverage = averageScore;
      bestYear = year;
    }
  }

  // Format averageScore to remove trailing zeroes
  const formattedAverage = Number(bestAverage.toFixed(2)).toString();

  return `The best year was ${bestYear} with an average score of ${formattedAverage}`;
}





// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg,
  };
}
