
const ANALYZE_API_ADDR = "192.168.1.100";

const ANALYZE_API_PORT = "8080";

const ANALYZE_API_URL = `http://${ANALYZE_API_ADDR}:${ANALYZE_API_PORT}`;


async function get_experiment_data(reportType, experiment, mote, topics) {

    const url = `${ANALYZE_API_URL}/api/report/${reportType}`;

    const body = {
        "testbed_name": experiment,
        "mote_addr": mote,
        "topics": topics
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
        response = { "status": 200, "body": response };
    }

    return response;
}


export default {

    get_experiment_data
};
