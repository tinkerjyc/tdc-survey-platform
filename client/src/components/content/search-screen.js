import React, {useState, useEffect} from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import movieService from "../services/movie-service";
import searchmovie from "../content/searchmovie.png";
import MovieGrid from "./movie/movie-grid";

const SearchScreen = () => {
    const history = useHistory();
    const { title, pageId } = useParams();
    const [searchTitle, setSearchTitle] = useState(title);
    const [popular, setPopular] = useState(null);
    const [results, setResults] = useState({ results: [] });
    useEffect(() => {
        setSearchTitle(title)
        findMoviesByTitle(title, pageId)
    }, [title, pageId])
    const findMoviesByTitle = (title, pageId) => {
        if (title === undefined || title === "") {
            setPopular(true)
            movieService.findPopular()
                .then((result) => {
                    setResults(result)
                })
        } else {
            setPopular(false)
            if (pageId === undefined || pageId === "") {
                movieService.findMoviesByTitle(title, 1)
                    .then((results) => {
                        setResults(results)
                    })
            }
            else {
                movieService.findMoviesByTitle(title, pageId)
                    .then((results) => {
                        setResults(results)
                        if (results.total_results == 0) {
                            history.push("/search")
                        }
                    })


            }
        }
    }
    return (
        <div style={{padding: '2rem'}}>
            <div className="row mt-3">
                <div className="col-10">
                    <input value={searchTitle}
                           onChange={(event) => {
                               setSearchTitle(event.target.value)
                           }}
                           className="form-control"/>
                </div>
                <div className="col-2">
                    {
                        (searchTitle !== undefined && searchTitle !== "") &&
                        <Link to={`/search/${searchTitle}/page/1`}
                              className="btn btn-primary">
                            Search Movie
                        </Link>
                    }
                    {
                        (searchTitle === undefined || searchTitle === "") &&
                        <Link to={`/search`}
                              className="btn btn-primary">
                            Search Movie
                        </Link>
                    }
                </div>
            </div>
            {
                popular && <h3>Popular Movies</h3>
            }
            <ul className="list-group">
                {
                    results.results &&
                    <MovieGrid movies={results.results}/>
                }
            </ul>
            {
                (!popular && (Number(results.page) >= 1) && (Number(results.page) <= results.total_pages)) &&
                <div className="row">
                    {
                        (Number(results.page) > 1) &&
                        <Link to={`/search/${title}/page/${Number(results.page) - 1}`}
                              className="btn btn-outline-primary col-2">
                            {/*&lt;&lt;*/}
                            prev
                        </Link>
                    }
                    <div className="col-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {results.page}
                    </div>
                    {
                        (Number(results.page) < results.total_pages) &&
                        <Link to={`/search/${title}/page/${Number(results.page) + 1}`}
                              className="btn btn-outline-primary col-2">
                            {/*&gt;&gt;*/}
                            next
                        </Link>
                    }
                </div>
            }
        </div>
    )
};

export default SearchScreen;