
import report from "/scripts/api/reports.js"

import dashboard_general from "/scripts/dashboards/general.js";
import dashboard_server from "/scripts/dashboards/server.js";
import dashboard_client from "/scripts/dashboards/client.js";


async function plot_dashboard(experimentName, moteType, moteAddr) {

    const topics = 
    {
        "general": [
            "raw/throughput",
            "raw/pdr",
            "raw/per",
            "raw/delay"
        ],
        "server": [
            "mean/throughput",
            "mean/pdr",
            "mean/per",
            "mean/delay",
            "mean/rssi"
        ],
        "client": [
            "raw/throughput",
            "raw/pdr",
            "raw/per",
            "raw/delay",
            "raw/rssi"
        ]
    };

    let data = await report.get_experiment_data(
        moteType, 
        experimentName, 
        moteAddr, 
        topics[moteType]
    );

    if (data.status == 200) {

        data = data.body;

        switch (moteType) {

            case "general":
                dashboard_general.plot_dashboard(data);
                break;

            case "server":
                dashboard_server.plot_dashboard(data);
                break;

            case "client":
                dashboard_client.plot_dashboard(data);
                break;
        }
    }
}

export default {

    plot_dashboard
};
