const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const reduceMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
  m_created_at: ["movies", null, "created_at"],
  m_updated_at: ["movies", null, "updated_at"],
  is_showing: ["movies", null, "is_showing"],
  mt_theater_id: ["movies", null, "theater_id"],
});

async function list() {
  return knex
    .from("theaters as t")
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select(
      "t.*",
      "m.*",
      "m.created_at as m_created_at",
      "m.updated_at as m_.updated_at",
      "mt.is_showing",
      "mt.theater_id as mt_theater_id"
    )
    .then(reduceMovies);
}

async function onlyTheaterslist(movie_id) {
  return knex
    .from("theaters as t")
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .select("t.*", "mt.*")
    .where({ "mt.movie_id": movie_id });
}

module.exports = {
  list,
  onlyTheaterslist,
};
