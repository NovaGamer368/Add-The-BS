const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

class MovieDB_DAL {
    
    baseURL = "https://api.themoviedb.org/3/";
    apiKey = process.env.MOVIE_DB_APIKEY;

    async authenticate() 
    {
        try {
            const url = `${this.baseURL}authentication`;
            console.log(url)
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    accept: 'application/json',
                },
            });

            const data = await response.json();
            return data;
        }
        catch (e) {
            console.log('ERROR WITH API:', e.message);
            throw e;
        }
    }

    async getMovies(pageNum) {
    console.log("API KEY", this.apiKey) 

        try {
            const url = `${this.baseURL}movie/now_playing?language=en-US&page=${pageNum}`;
            console.log(url)
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    accept: 'application/json',
                },
            });

            const data = await response.json();
            return data;
        }
        catch (e) {
            console.log('ERROR WITH API:', e.message);
            throw e;
        }
    }
}

module.exports = MovieDB_DAL;
