const calendar = new VanillaCalendar({
  selector: "#myCalendar",
  months: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  shortWeekday: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
  onSelect: (data, elem) => {
    console.log(data);
    console.log(elem);
    selectedDate = data;
    displayMovie(new Date(data.date).toISOString());
  },
});

let selectedDate = {};

const movieForm = document.querySelector("#movie-form");
movieForm.addEventListener("submit", addMovie);

const movieList = document.querySelector("#movie-list");

function addMovie(e) {
  e.preventDefault();
  const formData = new FormData(movieForm);
  console.log(formData);
  const title = formData.get("title");
  const year = formData.get("year");
  const duration = formData.get("duration");
  const genres = formData.getAll("genres");
  const newMovie = {
    title,
    year: Number(year),
    duration,
    genres,
    date: new Date(selectedDate.date),
  };
  console.log(newMovie);
  saveMovie(newMovie);
  movieForm.reset();
}

function saveMovie(movie) {
  let movies = JSON.parse(localStorage.getItem("movies")) || [];
  movies = [...movies, movie];
  localStorage.setItem("movies", JSON.stringify(movies));
}

function displayMovie(date) {
  let movies = JSON.parse(localStorage.getItem("movies")) || [];
  const moviesAtThisDate = movies.filter((movie) => {
    // retrieve date without time
    return movie.date.split("T")[0] === date.split("T")[0];
  });
  if (moviesAtThisDate.length === 1) {
    const movie = moviesAtThisDate[0];
    movieList.innerHTML = `
        <div class="movie-item">
        <h3>${movie.title}</h3>
        <span>année : ${movie.year}</span>
        <span>durée : ${movie.duration}</span>
        <span>genre : ${movie.genres.join(", ")}</span>
        </div>
        `;
  } else if (moviesAtThisDate.length > 1) {
    displayMovies(moviesAtThisDate);
  } else {
    movieList.innerHTML = `
        <div class="movie-item">
        <h3>Aucun film prévu ce jour là</h3>
        Vous pouvez ajouter un film grâce au formulaire ci-dessous.
        </div>
        `;
  }
}

function displayMovies(movies) {
  let content = [];
  movies.forEach((movie) => {
    const singleMovieHTML = `
        <div class="movie-item">
            <h3>${movie.title}</h3>
            <span>année : ${movie.year}</span>
            <span>durée : ${movie.duration}</span>
            <span>genre : ${movie.genres.join(", ")}</span>
            </div>
            `;
    content = [...content, singleMovieHTML];
  });

  movieList.innerHTML = content.join("");
}
