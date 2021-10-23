import React, {useState, useEffect} from "react";
import movieService from "../services/movie-service";
import MovieGrid from "./movie/movie-grid";

const TopRatedMovies = () => {
    const [results, setResults] = useState({ results: [] });
    useEffect(() => {
        movieService.findTopRated()
            .then((result) => {
                setResults(result)
            })
    }, [])
    return (
        <div>
            <ul className="list-group">
                {
                    results.results &&
                    <MovieGrid
                        msg="Top Rated Movies"
                        movies={results.results}/>
                }
            </ul>
        </div>
    )
};

export default TopRatedMovies;