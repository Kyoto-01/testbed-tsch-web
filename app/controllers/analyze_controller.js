import analyzeApi from "../apis/analyze_api.js";


async function get_experiments(req, res) {
    try {
        const response = await analyzeApi.get_experiments();

        if (response.status == 200) {
            const context = {
                "experiments": response.body
            }

            res.render("pages/experiments", context);

        } else {
            throw new Error;
        }

    } catch {
        res.render(
            "pages/message",
            { "msg": "Failed to get experiments." }
        );
    }
}

async function get_report_summary(req, res) {
    try {
        const experimentName = req.query.experiment;

        const response = await analyzeApi.get_report_summary(experimentName);

        if (response.status == 200) {
            const context = {
                "experiment_name": response.body.testbed.name,
                "client_motes": response.body.testbed.client,
                "server_motes": response.body.testbed.server
            };

            res.render("pages/experiment", context);
            
        } else {
            throw new Error;
        }

    } catch {
        res.render(
            "pages/message",
            { "msg": "Failed to get experiment information." }
        );
    }
}


export default {
    get_experiments,
    get_report_summary
};
