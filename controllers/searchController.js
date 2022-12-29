const { getAgents } = require('../services/getAgents');
const { addStatusesToOperators } = require('../helpers/normalizeWebimInfo');
const { WebimError } = require('../errors/webim');

const searchController = async (req, res, next) => {
  try {
    const { search } = req.query;
    const agents = await getAgents();
    const soughtAgents = agents.filter(agent =>
      agent.name.toLowerCase().includes(search.toLowerCase())
    );
    const normalSoughtAgents = await addStatusesToOperators(soughtAgents);
    res.json(normalSoughtAgents);
  } catch (err) {
    next(new WebimError(err.message));
  }
};

module.exports = { searchController };
