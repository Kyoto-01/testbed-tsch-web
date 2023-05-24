import fetch from "node-fetch"


const CONTROL_BRIDGE_API_ADDR = "192.168.1.100";

const CONTROL_BRIDGE_API_PORT = "6000";

const CONTROL_BRIDGE_API_URL = `http://${CONTROL_BRIDGE_API_ADDR}:${CONTROL_BRIDGE_API_PORT}`;


async function create_control_msg(msg) {
    const url = `${CONTROL_BRIDGE_API_URL}/control`;

    const request = {
        "method": "post",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(msg)
    };

    const response = await fetch(url, request);

    let success = true;

    if (response.status != 202) {
        success = false;
    }

    return [success, response.status];
}


export default {
    create_control_msg
};
