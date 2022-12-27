const express = require("express");
const { stateController } = require("../../controllers/stateController");
// const { historyController } = require("../../controllers/historyController");
const { agentController } = require("../../controllers/agentController");
const { localeController } = require("../../controllers/localeController");
const {
  changeAgentController,
} = require("../../controllers/changeAgentController");

const router = express.Router();

router.get("/current-state", stateController);
router.get("/agents/:agentId", agentController);
router.put("/agents/:agentId", changeAgentController);
router.get("/locale", localeController);

module.exports = router;
