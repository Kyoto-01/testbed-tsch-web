import express from "express"

import cbController from "../controllers/control_bridge_controller.js"


const router = express.Router();


router.post('/control', cbController.create_control_msg);


export default {
    router
};
