import React, {useState, useEffect} from "react";
import movieService from "../services/movie-service";
import MovieGrid from "./movie/movie-grid";

const PopularMovies = () => {
    const [results, setResults] = useState({ results: [] });
    useEffect(() => {
        movieService.findPopular()
            .then((result) => {
                setResults(result)
            })
    }, [])
    return (
        <div>
            <h3>Popular Movies</h3>
            <ul className="list-group">
                {
                    results.results &&
                    <MovieGrid movies={results.results}/>
                }
            </ul>
        </div>
    )
};

export default PopularMovies;