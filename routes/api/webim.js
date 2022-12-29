const express = require('express');
const { stateController } = require('../../controllers/stateController');
// const { historyController } = require("../../controllers/historyController");
const { agentController } = require('../../controllers/agentController');
const { localeController } = require('../../controllers/localeController');
const { changeAgentController } = require('../../controllers/changeAgentController');
const { searchController } = require('../../controllers/searchController');
// const { cookieController } = require('../../controllers/cookieController');
const { authMiddleware } = require('../../middlewares/auth');

const router = express.Router();

router.get('/currentState', authMiddleware, stateController);
router.get('/agents/:agentId', authMiddleware, agentController);
router.put('/agents/:agentId', authMiddleware, changeAgentController);
router.get('/locale', authMiddleware, localeController);
router.get('/searchAgents', authMiddleware, searchController);
// router.get('/setCookie', cookieController);

module.exports = router;
