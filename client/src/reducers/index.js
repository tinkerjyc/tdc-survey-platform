import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import comment from './comment';
import watchlist from './watchlist';
import favoritelist from './favoritelist';

export default combineReducers({
  alert,
  auth,
  profile,
  comment,
  watchlist,
  favoritelist
});
