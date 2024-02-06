# WeLoveMovies Server
WeLoveMovies server repo build the backend functionality to support the WeLoveMovies application. 

## Routes
Currently following APIs are supported by the WeLoveMovies server.

- `GET /movies`
- `GET /movies?is_showing=true`
- `GET /movies/:movieId`
- `GET /movies/:movieId` (incorrect ID)
- `GET /movies/:movieId/theaters`
- `GET /movies/:movieId/reviews`
- `GET /theaters`
- `DELETE /reviews/:reviewId`
- `PUT /reviews/:reviewId`

## Technical Stack 
- NodeJS
- PostgreSQL
- Express
- Knex
