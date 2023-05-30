import analyzeApi from "../apis/analyze_api.js";


async function get_experiments(req, res) {
    try {

        const experimentsName = await analyzeApi.get_experiments();

        const experimentsData = [];

        if (experimentsName.status == 200) {

            for (let exp of experimentsName.body) {

                let expData = await analyzeApi.get_report_summary(exp);

                if (expData.status == 200) {

                    expData = {
                        "name": expData.body.testbed.name,
                        "status": expData.body.testbed.status == "start" ? "Running" : "Stopped",
                        "start": new Date(expData.body.testbed.start * 1000),
                        "stop": expData.body.testbed.stop ? new Date(expData.body.testbed.stop * 1000) : "-"
                    };

                    experimentsData.push(expData);
                }
            }

            // from most current to oldest experiment sort
            experimentsData.sort((a, b) => (a.start < b.start) ? 1 : -1);

            const context = {
                "experiments": experimentsData
            };

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
                "experiment_status": response.body.testbed.status == "start" ? "Running" : "Stopped",
                "experiment_start": new Date(response.body.testbed.start * 1000),
                "experiment_stop": response.body.testbed.stop ? new Date(response.body.testbed.stop * 1000) : "-",
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
            { 
                "msg": "Failed to get experiment information.",
                "note": "(If you just created an experiment, wait a few seconds and restart the screen." + 
                    " Maybe your experiment is not built yet.)" 
            }
        );
    }
}


export default {
    get_experiments,
    get_report_summary
};
