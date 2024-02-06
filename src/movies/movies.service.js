const knex = require("../db/connection");
const MOVIES_TABLE = "movies";

async function list(is_showing) {
  return knex
    .from(MOVIES_TABLE)
    .select(
      "movies.movie_id as id",
      "title",
      "runtime_in_minutes",
      "rating",
      "description",
      "image_url"
    )
    .modify((queryBuilder) => {
      if (is_showing) {
        queryBuilder
          .join(
            "movies_theaters",
            "movies.movie_id",
            "movies_theaters.movie_id"
          )
          .where({ "movies_theaters.is_showing": true })
          .groupBy("movies.movie_id");
      }
    });
}

async function read(movie_id) {
  return knex
    .from(MOVIES_TABLE)
    .select("*")
    .where({ "movies.movie_id": movie_id })
    .first();
}

module.exports = {
  list,
  read,
};
