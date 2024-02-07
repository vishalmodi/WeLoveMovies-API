const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const REVIEWS_TABLE = "reviews";

const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});

async function destroy(review_id) {
  return knex.from(REVIEWS_TABLE).where({ review_id }).del();
}

async function list(movie_id) {
  return knex
    .from(`${REVIEWS_TABLE} as r`)
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("r.*", "c.*")
    .where({ "r.movie_id": movie_id })
    .then((reviews) => Promise.all(reviews.map((review) => addCritic(review))));
}

async function read(review_id) {
  return knex.from(REVIEWS_TABLE).select("*").where({ review_id }).first();
}

async function readCritic(critic_id) {
  return knex("critics").where({ critic_id }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  return knex(REVIEWS_TABLE)
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(setCritic);
}

module.exports = {
  destroy,
  list,
  read,
  update,
};
