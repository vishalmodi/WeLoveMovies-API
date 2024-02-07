const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  if (!req.params.movieId) {
    return next({
      status: 404,
      message: `Movie cannot be found without movie id`,
    });
  }

  const movie = await service.read(req.params.movieId);

  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return next({ status: 404, message: `Movie cannot be found.` });
}

async function read(request, res) {
  const data = res.locals.movie;
  res.json({ data: data });
}

async function list(req, res) {
  const { is_showing } = req.query;
  const is_showing_flag = is_showing === "true" ? true : false;
  const data = await service.list(is_showing_flag);
  res.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  movieExists: movieExists,
};
