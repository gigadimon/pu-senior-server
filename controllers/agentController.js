const { getAgents } = require("../services/getAgents.js");

const agentController = async (req, res, next) => {
  const { agentId } = req.params;
  const { data: agents } = await getAgents();

  const currentAgent = agents
    .filter((el) => el.id.toString() === agentId)
    .reduce((_, el) => el, {});

  res.json(currentAgent);
};

module.exports = { agentController };
