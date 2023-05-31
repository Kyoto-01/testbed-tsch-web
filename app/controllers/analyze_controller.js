import analyzeApi from "../apis/analyze_api.js";


async function get_experiments(req, res) {
    try {

        const experimentsName = await analyzeApi.get_experiments();

        const experimentsData = [];

        if (experimentsName.status == 200) {

            for (let exp of experimentsName.body) {

                let expData = await analyzeApi.get_experiment_summary(exp);

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

async function get_experiment_summary(req, res) {
    try {

        const experimentName = req.query.experiment;

        const response = await analyzeApi.get_experiment_summary(experimentName);

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

async function get_experiment_raw_packets_context(moteType, mote, experiment) {

    let response = null;

    let context = null;

    if (moteType == "client") {

        response = await analyzeApi.get_experiment_client_raw_packets(
            experiment, mote
        );

    } else if (moteType == "server") {

        response = await analyzeApi.get_experiment_server_raw_packets(
            experiment, mote
        );
    }

    const acked = {};

    for (let peer in response.body.raw.packet) {

        acked[peer] = [];

        response.body.raw.packet[peer].forEach((pkt) => {

            if (
                (peer in response.body.raw.acked) && 
                (pkt.value in response.body.raw.acked[peer])
            ) {

                acked[peer].push({ "time": pkt.time, "value": "Yes" });

            } else {

                acked[peer].push({ "time": pkt.time, "value": "No" });
            }    
        });
    }

    if (response.status == 200) {

        context = {
            "mote_type": moteType,
            "experiment": experiment,
            "general": response.body.general,
            "raw": {
                "key": { "title": "Packet", "data": response.body.raw.packet },
                "acked": { "title": "Acked", "data": acked },
                "pktlen": { "title": "Length (bits)", "data": response.body.raw.pktlen },
                "txpower": { "title": "Tx Power (dBm)", "data": response.body.raw.txpower },
                "channel": { "title": "Channel", "data": response.body.raw.channel },
                "rssi": { "title": "RSSI (dBm)", "data": response.body.raw.rssi }
            }
        };

    } else {

        throw new Error;
    }

    return context;
}

async function get_experiment_raw_delays_context(moteType, mote, experiment) {

    let response = null;

    let context = null;

    if (moteType == "client") {

        response = await analyzeApi.get_experiment_client_raw_delays(
            experiment, mote
        );

    } else if (moteType == "server") {

        response = await analyzeApi.get_experiment_server_raw_delays(
            experiment, mote
        );
    }

    const delays = {};

    for (let peer in response.body.raw.delay) {

        delays[peer] = [];

        response.body.raw.delay[peer].forEach((delay) => {

            if (delay.value < 0) {

                delays[peer].push({ "time": delay.time, "value": "-" });

            } else {

                delays[peer].push(delay);
            }
        });
    }

    if (response.status == 200) {

        context = {
            "mote_type": moteType,
            "experiment": experiment,
            "general": response.body.general,
            "raw": {
                "key": { "title": "Delays (ms)", "data": delays }
            }
        };

    } else {

        throw new Error;
    }

    return context;
}

async function get_experiment_raw_throughputs_context(moteType, mote, experiment) {

    let response = null;

    let context = null;

    if (moteType == "client") {

        response = await analyzeApi.get_experiment_client_raw_throughputs(
            experiment, mote
        );

    } else if (moteType == "server") {

        response = await analyzeApi.get_experiment_server_raw_throughputs(
            experiment, mote
        );
    }

    if (response.status == 200) {

        context = {
            "mote_type": moteType,
            "experiment": experiment,
            "general": response.body.general,
            "raw": {
                "key": { "title": "Throughputs (pps)", "data": response.body.raw.throughput }
            }
        };

    } else {

        throw new Error;
    }

    return context;
}

async function get_experiment_raw_pdr_context(moteType, mote, experiment) {

    let response = null;

    let context = null;

    if (moteType == "client") {

        response = await analyzeApi.get_experiment_client_raw_pdr(
            experiment, mote
        );

    } else if (moteType == "server") {

        response = await analyzeApi.get_experiment_server_raw_pdr(
            experiment, mote
        );
    }

    if (response.status == 200) {

        context = {
            "mote_type": moteType,
            "experiment": experiment,
            "general": response.body.general,
            "raw": {
                "key": { "title": "PDR", "data": response.body.raw.pdr }
            }
        };

    } else {

        throw new Error;
    }

    return context;
}

async function get_experiment_raw_per_context(moteType, mote, experiment) {

    let response = null;

    let context = null;

    if (moteType == "client") {

        response = await analyzeApi.get_experiment_client_raw_per(
            experiment, mote
        );

    } else if (moteType == "server") {

        response = await analyzeApi.get_experiment_server_raw_per(
            experiment, mote
        );
    }

    if (response.status == 200) {

        context = {
            "mote_type": moteType,
            "experiment": experiment,
            "general": response.body.general,
            "raw": {
                "key": { "title": "PER", "data": response.body.raw.per }
            }
        };

    } else {

        throw new Error;
    }

    return context;
}

async function get_experiment_raw(req, res) {
    try {

        const dataType = req.query.data_type;

        const experimentName = req.query.experiment;

        const moteType = req.query.mote_type;

        const moteAddr = req.query.mote_addr;

        let context = null;

        switch (dataType) {

            case "packets":
                context = await get_experiment_raw_packets_context(
                    moteType, moteAddr, experimentName
                );
                break;
            case "delays":
                    context = await get_experiment_raw_delays_context(
                        moteType, moteAddr, experimentName
                    );
                    break;
            case "throughputs":
                context = await get_experiment_raw_throughputs_context(
                    moteType, moteAddr, experimentName
                );
                break;
            case "pdr":
                context = await get_experiment_raw_pdr_context(
                    moteType, moteAddr, experimentName
                );
                break;
            case "per":
                context = await get_experiment_raw_per_context(
                    moteType, moteAddr, experimentName
                );
                break;
        }

        res.render("pages/experiment_raw", context);

    } catch {
        res.render(
            "pages/message",
            { 
                "msg": "Failed to get experiment raw data."
            }
        );
    }
}


export default {
    get_experiments,
    get_experiment_summary,
    get_experiment_raw
};
