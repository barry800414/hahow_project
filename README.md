Hahow Front-End Engineer Recruiting Project
===

This is a small project for recruiting front-end engineer in Hahow. Inc., please check [Reference](http://hahow-recruit.herokuapp.com/frontend) first. 

## Author
Wei-Ming Chen barry800414@gmail.com

## Prerequisites
Please install [npm](https://www.npmjs.com/) first.

## Build
* install required packages: `npm install`
* build website: `npm start`

After above commands, please just use browser to open `index.html` in `public` folder, or using `python3 -m server.http` to invoke a http server, then type in `http://localhost:8000/public/index.html`.

## Applied framework and packages
* Front-end framework: [Vue.js](https://vuejs.org/) and vue-resource.js for sending requests.
* Routing: using [Director.js](https://github.com/flatiron/director) to implement routing service.
* Style: using [Bootstrap](http://getbootstrap.com/) for layout and RWD.
* Build: using [Gulp](http://gulpjs.com/) to build website.
* Javascript compiler: using [Babel](https://babeljs.io/) to compile js to a more compatible version.


## Infrastructure
`heroList` & `heroProfile` are two Vue instance, managing all necessary interaction with users.

* `heroList` deals with the following issues:
    * send request to load hero list(names and image links)
    * invoke loading when user click a hero card
    * bind `selected` class when a hero card is selected

* `heroProfile` deals with the following issues:
    * send request to load hero profile
    * send request to update hero profile
    * validate the correctness of ability points

* [Director.js](https://github.com/flatiron/director) will help us update url routing and listen routing changing.
