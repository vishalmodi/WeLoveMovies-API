const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, resp) {
  const { movieId } = req.params;
  let data = null;
  if (movieId) {
    data = await service.onlyTheaterslist(movieId);
  } else {
    data = await service.list();
  }

  resp.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
