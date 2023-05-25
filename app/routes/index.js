import express from "express"
import path from "path"

import cbController from "../controllers/control_bridge_controller.js"


const router = express.Router();


router.get("/", (req, res) => {
    res.render("home");
}
)

router.get("/setup", (req, res) => {
        res.render("setup");
    }
)

router.get("/experiments", (req, res) => {
        res.render("experiments");
    }
)

router.post("/control", cbController.create_control_msg);


export default {
    router
};
