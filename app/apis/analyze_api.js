import fetch from "node-fetch";


const ANALYZE_API_ADDR = "192.168.1.100";

const ANALYZE_API_PORT = "5000";

const ANALYZE_API_URL = `http://${ANALYZE_API_ADDR}:${ANALYZE_API_PORT}`;


async function get_experiments() {
    const response = await get_report_summary("testbed-main")

    response.body = response.body.testbed.testbed;

    return response;
}

async function get_report_summary(experiment) {
    const url = `${ANALYZE_API_URL}/api/report/general`;

    const body = {
        "testbed_name": experiment,
        "topics": ["testbed/"]
    };

    const request = {
        "method": "post",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(body)
    };

    let response = await fetch(url, request);

    if (response.status == 200) {
        response = await response.json();

        // remove the main experiment from experiment list
        const mainExperimentIndex = response.testbed.testbed.indexOf(
            "testbed-main"
        );
        delete response.testbed.testbed.splice(mainExperimentIndex, 1);

        response = { "status": 200, "body": response }
    }

    return response;
}


export default {
    get_experiments,
    get_report_summary
};
