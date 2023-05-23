import fetch from 'node-fetch'


CONTROL_BRIDGE_API_ADDR = "192.168.1.100";

CONTROL_BRIDGE_API_PORT = "6000";

CONTROL_BRIDGE_API_URL = `http://${CONTROL_BRIDGE_API_ADDR}:${CONTROL_BRIDGE_API_PORT}`;


async function forward_control_msg(msg) {
    const url = `${CONTROL_BRIDGE_API_URL}/control`;

    const request = {
        "method": "post",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(msg)
    }

    await fetch(url, request)
}
