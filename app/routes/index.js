import express from "express";

import cbController from "../controllers/control_bridge_controller.js";
import analyzeController from "../controllers/analyze_controller.js";


const router = express.Router();

// static pages

router.get("/", (req, res) => {
    res.render("pages/home");
})

router.get("/setup", (req, res) => {
    res.render("pages/setup");
})

// dynamic pages (that interact with APIs)

router.get("/experiments", analyzeController.get_experiments);

router.get("/experiment", analyzeController.get_experiment_summary);

router.get("/experiment/raw", analyzeController.get_experiment_raw);

router.get("/experiment/dashboard", analyzeController.get_experiment_dashboard);

// form submissions

router.post("/control", cbController.create_control_msg);


export default {
    router
};
