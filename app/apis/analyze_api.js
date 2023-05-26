import fetch from "node-fetch";


const ANALYZE_API_ADDR = "192.168.1.100";

const ANALYZE_API_PORT = "5000";

const ANALYZE_API_URL = `http://${ANALYZE_API_ADDR}:${ANALYZE_API_PORT}`;


async function get_experiments() {
    const url = `${ANALYZE_API_URL}/api/report/general`;

    const body = {
        "testbed_name": "testbed-main",
        "topics": ["testbed/testbed/"]
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
    get_experiments
};
