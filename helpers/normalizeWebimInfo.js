const path = require("path");
const fs = require("fs");

const getCheckedStatuses = () => {
  const triggerStatuses = JSON.parse(
    fs.readFileSync(path.resolve("./triggerStatuses.json"))
  );
  const neutralStatuses = JSON.parse(
    fs.readFileSync(path.resolve("./neutralStatuses.json"))
  );

  return { triggerStatuses, neutralStatuses };
};

const normalizeOperatorStatuses = (operators, statuses) => {
  return operators.map((elem) => {
    const statusInfo = statuses.reduce((acc, element) => {
      return elem.status === element.value
        ? { status: element.name, color: element.color }
        : acc;
    }, {});
    return { ...elem, ...statusInfo };
  });
};

const normalizeWebimStatuses = (webimState, statuses) => {
  return Object.values(webimState.chatsByOperator).map((el) => {
    const operators = Object.values(el.operators);
    const normOperators = normalizeOperatorStatuses(operators, statuses);
    return { department: el.departmentName, operators: normOperators };
  });
};

module.exports = { normalizeWebimStatuses, getCheckedStatuses };
