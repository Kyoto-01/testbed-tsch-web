import fetch from "node-fetch";


const ANALYZE_API_ADDR = "192.168.1.100";

const ANALYZE_API_PORT = "5000";

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

async function get_experiment_general_data(experiment, topics) {

    let response = await get_experiment_data("general", experiment, "", topics);

    return response;
}

async function get_experiment_client_data(experiment, mote, topics) {

    let response = await get_experiment_data("client", experiment, mote, topics);

    return response;
}

async function get_experiment_server_data(experiment, mote, topics) {

    let response = await get_experiment_data("server", experiment, mote, topics);

    return response;
}

async function get_experiment_summary(experiment) {

    const topics = ["testbed/"];
    
    let response = await get_experiment_general_data(experiment, topics);
    
    if (response.status == 200) {
        
        // remove the main experiment from experiment list

        const mainExperimentIndex = response.body.testbed.testbed.indexOf(
            "testbed-main"
        );
            
        delete response.body.testbed.testbed.splice(
            mainExperimentIndex, 1
        );
    }
            
    return response;
}
        
async function get_experiments() {

    const response = await get_experiment_summary("testbed-main");

    response.body = response.body.testbed.testbed;

    return response;
}

async function get_experiment_client_raw_packets(experiment, mote) {
    
    const topics = [
        "general/",
        "raw/packet/", 
        "raw/acked/", 
        "raw/pktlen/", 
        "raw/txpower/", 
        "raw/channel/", 
        "raw/rssi/"
    ];

    const response = await get_experiment_client_data(experiment, mote, topics);

    return response;
}

async function get_experiment_server_raw_packets(experiment, mote) {
    
    const topics = [
        "general/",
        "raw/packet/", 
        "raw/acked/", 
        "raw/pktlen/", 
        "raw/txpower/", 
        "raw/channel/", 
        "raw/rssi/" 
    ];

    const response = await get_experiment_server_data(experiment, mote, topics);

    return response;
}

async function get_experiment_client_raw_delays(experiment, mote) {

    const topics = [
        "general/",
        "raw/delay/"
    ];

    const response = await get_experiment_client_data(experiment, mote, topics);

    return response;
}

async function get_experiment_server_raw_delays(experiment, mote) {

    const topics = [
        "general/",
        "raw/delay/"
    ];
    
    const response = await get_experiment_server_data(experiment, mote, topics);

    return response;
}

async function get_experiment_client_raw_throughputs(experiment, mote) {

    const topics = [
        "general/",
        "raw/throughput/"
    ];

    const response = await get_experiment_client_data(experiment, mote, topics);

    return response;
}

async function get_experiment_server_raw_throughputs(experiment, mote) {

    const topics = [
        "general/",
        "raw/throughput/"
    ];

    const response = await get_experiment_server_data(experiment, mote, topics);

    return response;
}

async function get_experiment_client_raw_pdr(experiment, mote) {

    const topics = [
        "general/",
        "raw/pdr/"
    ];

    const response = await get_experiment_client_data(experiment, mote, topics);

    return response;
}

async function get_experiment_server_raw_pdr(experiment, mote) {

    const topics = [
        "general/",
        "raw/pdr/"
    ];

    const response = await get_experiment_server_data(experiment, mote, topics);

    return response;
}

async function get_experiment_client_raw_per(experiment, mote) {

    const topics = [
        "general/",
        "raw/per/"
    ];

    const response = await get_experiment_client_data(experiment, mote, topics);

    return response;
}

async function get_experiment_server_raw_per(experiment, mote) {

    const topics = [
        "general/",
        "raw/per/"
    ];

    const response = await get_experiment_server_data(experiment, mote, topics);

    return response;
}


export default {
    get_experiments,
    get_experiment_summary,
    get_experiment_client_raw_packets,
    get_experiment_server_raw_packets,
    get_experiment_client_raw_delays,
    get_experiment_server_raw_delays,
    get_experiment_client_raw_throughputs,
    get_experiment_server_raw_throughputs,
    get_experiment_client_raw_pdr,
    get_experiment_server_raw_pdr,
    get_experiment_client_raw_per,
    get_experiment_server_raw_per
};
