const { WebimError } = require('../errors/webim.js');
const { getAgents } = require('../services/getAgents.js');

const agentController = async (req, res, next) => {
  try {
    const { agentId } = req.params;
    const agents = await getAgents();

    const currentAgent = agents
      .filter(el => el.id.toString() === agentId)
      .reduce((_, el) => el, {});

    res.json(currentAgent);
  } catch (err) {
    next(new WebimError(err.message));
  }
};

module.exports = { agentController };
