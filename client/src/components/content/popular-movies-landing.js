import React, {useState, useEffect} from "react";
import movieService from "../services/movie-service";
import MovieGrid from "./movie/movie-grid";

const PopularMoviesTopFive = () => {
    const [results, setResults] = useState({ results: [] });
    useEffect(() => {
        movieService.findPopular()
            .then((result) => {
                setResults(result)
            })
    }, [])
    return (
        <div>
            <div className="list-group">
                {
                    results.results &&
                    <MovieGrid
                        movies={results.results.slice(0, 6)}
                        msg="Most recent popular movies - Top 6"/>
                }
            </div>
        </div>
    )
};

export default PopularMoviesTopFive;