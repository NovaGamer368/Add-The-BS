const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();

class MovieDB_DAL {
  baseURL = "https://api.themoviedb.org/3";
  apiKey = process.env.MOVIE_DB_APIKEY;

  async authenticate() {
    try {
      const url = `${this.baseURL}/authentication`;
      // console.log(url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          accept: "application/json",
        },
      });

      const data = await response.json();
      return data;
    } catch (e) {
      console.log("ERROR WITH API:", e.message);
      throw e;
    }
  }

  async getMovies(pageNum) {
    try {
      const url = `${this.baseURL}/movie/now_playing?language=en-US&page=${pageNum}`;
      // console.log(url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          accept: "application/json",
        },
      });

      const data = await response.json();
      return data;
    } catch (e) {
      console.log("ERROR WITH API:", e.message);
      throw e;
    }
  }
  async getSimpleMovies(pageNum) {
    try {
      const url = `${this.baseURL}/movie/now_playing?language=en-US&page=${pageNum}`;
      // console.log(url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          accept: "application/json",
        },
      });

      const data = await response.json();
      const returnList = [];
      await data.results.forEach((movie) => {
        var data = {
          original_title: movie.original_title,
          overview: movie.overview,
          title: movie.title,
          poster: movie.poster_path,
        };
        returnList.push(data);
        // console.log(returnList)
      });
      return {
        list: returnList,
      };
    } catch (e) {
      console.log("ERROR WITH API:", e.message);
      throw e;
    }
  }
  async getMovieGenre() {
    try {
      const url = `${this.baseURL}/genre/movie/list?language=en`;
      // console.log(url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          accept: "application/json",
        },
      });

      const data = await response.json();
      return data;
    } catch (e) {
      console.log("ERROR WITH API:", e.message);
      throw e;
    }
  }
  async getMoviesByGenre(genre) {
    try {
      const genreList = await this.getMovieGenre();
      var genreId = 28;
      genreList.genres.forEach((genreObject) => {
        if (genreObject.name === genre) {
          genreId = genreObject.id;
        }
      });
      const url = `${this.baseURL}/discover/movie?with_genres=${genreId}`;
      // console.log(url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          accept: "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      return data;
    } catch (e) {
      console.log("ERROR WITH API:", e.message);
      throw e;
    }
  }
  async getActorById(id) {
    try {
      const url = `${this.baseURL}/person/${id}?language=en-US`;
      // console.log(url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          accept: "application/json",
        },
      });

      const data = await response.json();
      return data;
    } catch (e) {
      console.log("ERROR WITH API:", e.message);
      throw e;
    }
  }
  async getActorByName(name) {
    const searchEndpoint = "/search/person";
    const query = encodeURIComponent(name);

    const url = `${this.baseURL}${searchEndpoint}?query=${query}`;
    // console.log(url);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          accept: "application/json",
        },
      });
      const data = await response.json();

      if (response.ok) {
        return data.results;
      } else {
        throw new Error(`Failed to fetch people. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error in API request:", error.message);
      throw error;
    }
  }
  async getTrendingMovies() {
    try {
      const url = `${this.baseURL}/trending/movie/day?language=en-US'`;
      // console.log(url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          accept: "application/json",
        },
      });

      const data = await response.json();
      return data;
    } catch (e) {
      console.log("ERROR WITH API:", e.message);
      throw e;
    }
  }
  async getMovieByName(name) {
    const searchEndpoint = "/search/movie";
    const query = encodeURIComponent(name);

    const url = `${this.baseURL}${searchEndpoint}?query=${query}`;
    // console.log(url);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          accept: "application/json",
        },
      });
      const data = await response.json();

      if (response.ok) {
        return data.results;
      } else {
        throw new Error(`Failed to fetch people. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error in API request:", error.message);
      throw error;
    }
  }
  //https://developer.themoviedb.org/reference/movie-details
  async getMovieById(id) {
    const url = `${this.baseURL}/movie/${id}?language=en-US`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          accept: "application/json",
        },
      });
      const data = await response.json();
  
      if (response.ok) {
        const { vote_average, ...movieDetails } = data;
        return { ...movieDetails, rating: vote_average };
      } else {
        throw new Error(`Failed to fetch movie details. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error in API request:", error.message);
      throw error;
    }
  }

  async getMovieRecommendations(movieId) {
    try {
      const url = `${this.baseURL}/movie/${movieId}/recommendations?language=en-US&page=1`;
      // console.log(url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          accept: "application/json",
        },
      });

      const data = await response.json();
      return data;
    } catch (e) {
      console.log("ERROR WITH API:", e.message);
      throw e;
    }
  }
  async getSimilarMovie(movieId) {
    try {
      const url = `${this.baseURL}/movie/${movieId}/similar?language=en-US&page=1`;
      // console.log(url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          accept: "application/json",
        },
      });

      const data = await response.json();
      return data;
    } catch (e) {
      console.log("ERROR WITH API:", e.message);
      throw e;
    }
  }
  async getMoviePoster(poster) {
    try {
      const url = `https://image.tmdb.org/t/p/w500/${poster}`;
      // console.log(poster);
      return url;
    } catch (e) {
      console.log("ERROR WITH API:", e.message);
      throw e;
    }
  }
}

module.exports = MovieDB_DAL;
