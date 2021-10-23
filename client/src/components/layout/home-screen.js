import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PopularMoviesTopFive from "../content/popular-movies-landing";
import TopRatedMovies from "../content/top-rating-movies";
import UserComment from '../content/comment/user-comment';

const HomeScreen = ({ auth: { isAuthenticated, user } }) => {
  return (
    <section className='landing'>
      <div className=''>
        {
          isAuthenticated &&
          <>
            <UserComment userId={user._id}/>
              <TopRatedMovies />
          </>
        }
        {
              !isAuthenticated &&
              <PopularMoviesTopFive />
            }

          </div>
    </section>
  );
};

HomeScreen.propTypes = {
        isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(HomeScreen);
