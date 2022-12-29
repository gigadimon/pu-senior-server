const path = require('path');
const fs = require('fs');
const { getActualStatuses } = require('../services/getActualStatuses');
const { getOperatorStatuses } = require('../services/getOperatorStatuses');

const getCheckedStatuses = () => {
  const triggerStatuses = JSON.parse(fs.readFileSync(path.resolve('./triggerStatuses.json')));
  const neutralStatuses = JSON.parse(fs.readFileSync(path.resolve('./neutralStatuses.json')));

  return { triggerStatuses, neutralStatuses };
};

const normalizeOperatorStatuses = async operators => {
  const { data: statuses } = await getActualStatuses();
  return operators.map(elem => {
    const statusInfo = statuses.reduce((acc, element) => {
      return elem.status === element.value ? { status: element.name, color: element.color } : acc;
    }, {});
    return { ...elem, ...statusInfo };
  });
};

const normalizeWebimStatuses = async webimState => {
  return await Promise.all(
    Object.values(webimState.chatsByOperator).map(async el => {
      const operators = Object.values(el.operators);
      const normOperators = await normalizeOperatorStatuses(operators);
      return { department: el.departmentName, operators: normOperators };
    })
  );
};

const addStatusesToOperators = async operators => {
  const { data: actualStatuses } = await getActualStatuses();
  const operatorStatuses = await getOperatorStatuses();
  return operators.map(oper => {
    const normalizeStatus = actualStatuses.reduce(
      (acc, { value, name, color }) =>
        value === operatorStatuses[`${oper.id}`] ? { status: name, statusColor: color } : acc,
      {}
    );
    return { ...oper, ...normalizeStatus };
  });
};

module.exports = {
  normalizeWebimStatuses,
  getCheckedStatuses,
  normalizeOperatorStatuses,
  addStatusesToOperators,
};
