const { getWebimState } = require("../services/getWebimState");
const { getCurrentStatuses } = require("../services/getCurrentStatuses");
const { normalizeWebimStatuses } = require("../helpers/normalizeWebimInfo");
const { getCheckedStatuses } = require("../helpers/normalizeWebimInfo");

const stateController = async (req, res, next) => {
  const { data: webimState } = await getWebimState();
  const { data: statuses } = await getCurrentStatuses();
  const info = normalizeWebimStatuses(webimState, statuses);
  const checkedStatuses = getCheckedStatuses();

  res
    .status(200)
    .json({ info, checkedStatuses, departInfo: webimState.chatsByDepartment });
};

module.exports = { stateController };
