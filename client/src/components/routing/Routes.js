import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Profile from '../profile/profile';
import ProfileForm from '../community/profile-forms/ProfileForm';
import Profiles from '../community/profiles/Profiles';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';
import UserProfile from "../community/profiles/user-profile";
import WatchList from "../content/watch-list";
import DetailsScreen from "../content/details-screen";
import FavoriteList from "../content/favorite-list";

const Routes = props => {
  return (
    <section className="container pb-5 mb-5">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:profileId"
               component={UserProfile}
               render={props =>
                   <UserProfile {...props} />}/>
        <Route exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/watchlist" component={WatchList} />
        <PrivateRoute exact path="/watchlist/:watchlistId" component={DetailsScreen} />
        <PrivateRoute exact path="/favoritelist" component={FavoriteList} />
        <PrivateRoute exact path="/favoritelist/:favoritelistId" component={DetailsScreen} />
        <PrivateRoute exact path="/create-profile" component={ProfileForm} />
        <PrivateRoute exact path="/edit-profile" component={ProfileForm} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
