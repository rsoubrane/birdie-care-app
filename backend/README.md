
# Birdie Care App (Technical Test - Backend)

## Description

This is a simple NestJS application toexpose endpoints for the frontend to access data.\
The data is being fetched from the [Birdie](https://birdie.care) MySQL database.

The goal was to offer care receiver's families a nice dashboard to easily visualize their\
 loved one's day.

The application allows you various things such as gathering all the events for a given\
 receiver, get all the events based on a timestamp or simply gets the first and last\
 care date of a specific patient. 

The API is hosted on Heroku and is available [here](https://birdie-care-app-backend.herokuapp.com/api).

## Technical stack

Backend developped using: 
- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [MySQL](https://www.mysql.com/)


Unit & e2e tests done using:
- [Jest](https://jestjs.io/fr/)


## Available Scripts

In the project directory, you can run:

### `yarn`

To install all the dependancies for the project to run in local.


### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `yarn test`

Launches the test runner in the interactive watch mode.\
You can all use `yarn test:coverage` to see the test coverage of the application.

### `yarn build`

Builds the app for production to the `dist` folder.
