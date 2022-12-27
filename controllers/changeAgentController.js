const { changeAgent } = require("../services/changeAgent");

const changeAgentController = async (req, res, next) => {
  const {
    body,
    params: { agentId },
  } = req;

  const changedAgent = await changeAgent(agentId, body);

  res.json(changedAgent);
};
module.exports = { changeAgentController };
