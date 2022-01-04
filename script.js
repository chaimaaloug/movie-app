// Movie App USING TMDB API

const API_KEY = 'api_key=aa0617a1d1587096d6bef6199d81e063';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+ API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchAPI = "https://api.themoviedb.org/3/search/movie?&api_key=aa0617a1d1587096d6bef6199d81e063&query=";
const main = document.querySelector('main');
const form = document.querySelector('form');
const search = document.querySelector('#search');

getMovies();

//********** GET MOVIES */

// initially get fav movies
getMovies(API_URL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);

    showMovies(respData.results);
}

function showMovies(movies) {
    // clear main
    main.innerHTML = "";

    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML =   `
        <img src="${IMG_URL + poster_path}" alt="${title}">
                
        <div class="movieInfo">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>  
        
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>`;
        
        
              
        
        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(searchAPI + searchTerm);

        search.value = "";
    }
});

