import express from "express"

import cbController from "../controllers/control_bridge_controller.js"


const router = express.Router();


// Pages

router.get("/", (req, res) => {
    res.render("pages/home");
}
)

router.get("/setup", (req, res) => {
        res.render("pages/setup");
    }
)

router.get("/experiments", (req, res) => {
        res.render("pages/experiments");
    }
)

// Gateway

router.post("/control", cbController.create_control_msg);


export default {
    router
};
