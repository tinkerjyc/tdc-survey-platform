# Movie-Manager-Web
Web Development Project

Project name: Movie Manager Website
Project team member: 
- Xingbo Liu liu.xingb@northeastern.edu
- Yicheng Jiang jiang.yich@northeastern.edu
 
**1.State the problem you are trying to solve**
 
For movie lovers, we would like to enable all people to know movies that they are interested in, and at the same time help them discover new movies. To provide movie fans a platform to search, get and save movie information, we plan and build up a movie rating website from scratch. In this web application, we are going to use a real API to search for movies as we type, also add movies to and remove them from our favorites. Furthermore, we could optimize the search engine for the website. For fetching users, we need to optimize our website so that users' ratings and reviews appear along with movie details.
	
**1. Include a description of at least two types of users that would use your Web application**

We are making this web application that has following types of users:

Admin: Admin users have access to admin pages.

General user: Users can post reviews of movies and edit personal profiles.

Guest: Support functionality for anonymous users. For example, anonymous users should be able to search movies, view movie details, read movie reviews, etc.
	
**2. For each of the types of users, provide two goals the user would like to achieve with your Web application**

Admins are authorized users on a user's account.

Admins can manage users: 

	Create/update user with information
	Delete user account

Guests can search and get information about movies, but don't have access to features such as posting reviews and ratings.

Users can be granted access to sites:

	Login/Logout user account
	Create, update and user profile 
	Search movie using search bar
	Review(post text comment) and rate movie
	Add/modify favorite list
	Add/modify watch later list

***UML***
![blockchain](https://github.com/tinkerjyc/movie-application-final/blob/main/uml.png "UML")

**2.State the overall strategy of how you intend to solve the problem**

By using TMDB API to support our date, we would like to build a website which supports users including general users and guests. We could give users the authority to rate, and give guests the authority to review their favorite list or watch for later list.

Users can register and login to access with more functionality which include rating, saving movies in favorite and watch later list. Guests are also welcome to explore movies, and check information on their interested movies. Admin account is set to manage movie databases and user accounts if needed.

We plan to use REACT as frontend, Java as backend/middleware, and SQL for database. 
 
**3. One of the main requirements is to work with data available from some public, free, Web API. Provide a brief description of the Web API you intend to use**

The **TMDB** API service is for our team using movie data in our application. This is a free public API resource. The API provides for the team to programmatically fetch and use the data and images. 

Below is a API to get the primary information about a movie on TMDB:	
https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

TMDB API Guide:
https://developers.themoviedb.org/3/getting-started/introduction

API Endpoints:

Get the primary information about a movie.

	GET/movie/{movie_id}
	
Get the images that belong to a movie.

	GET/movie/{movie_id}/images

Get a list of recommended movies for a movie.
 
	GET/movie/{movie_id}/recommendations


# To Run This Project 

### Clone this repo and open this folder

### Install server dependencies

```bash
npm install
```

### Install client dependencies

```bash
cd client
npm install
```

### Run both Express & React from root

```bash
npm run dev
```

### Build for production

```bash
cd client
npm run build
```

### Terminating Node process

```bash
pkill node
