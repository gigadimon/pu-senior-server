const { getWebimState } = require('../services/getWebimState');
const { normalizeWebimStatuses } = require('../helpers/normalizeWebimInfo');
const { getCheckedStatuses } = require('../helpers/normalizeWebimInfo');
const { WebimError } = require('../errors/webim');

const stateController = async (req, res, next) => {
  try {
    const { data: webimState } = await getWebimState();
    const info = await normalizeWebimStatuses(webimState);
    const checkedStatuses = getCheckedStatuses();

    res.status(200).json({ info, checkedStatuses, departInfo: webimState.chatsByDepartment });
  } catch (err) {
    next(new WebimError(err.message));
  }
};

module.exports = { stateController };
