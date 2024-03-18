const router = require("express").Router();
const auth_manager = require('../middlewares/auth_manager');


const {

    getDataForDashboard

} = require('../controllers/system_controller');


router.get("/data-for-dashboard",/*  auth_manager, */ getDataForDashboard)


module.exports = router;
