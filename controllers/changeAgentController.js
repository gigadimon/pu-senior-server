const { WebimError } = require('../errors/webim');
const { changeAgent } = require('../services/changeAgent');

const changeAgentController = async (req, res, next) => {
  try {
    const {
      body,
      params: { agentId },
    } = req;

    const changedAgent = await changeAgent(agentId, body);

    res.json(changedAgent);
  } catch (err) {
    next(new WebimError(err.message));
  }
};
module.exports = { changeAgentController };
