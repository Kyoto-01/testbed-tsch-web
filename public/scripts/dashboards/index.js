
//import report from "/scripts/api/reports.js"

import dashboard_general from "/scripts/dashboards/general.js";
import dashboard_server from "/scripts/dashboards/server.js";
import dashboard_client from "/scripts/dashboards/client.js";


function plot_dashboard(experimentName, moteType, moteAddr) {

    switch (moteType) {

        case "general":
            dashboard_general.plot_dashboard(experimentName, moteAddr);
            break;

        case "server":
            dashboard_server.plot_dashboard(experimentName, moteAddr);
            break;

        case "client":
            dashboard_client.plot_dashboard(experimentName, moteAddr);
            break;
    }
}

export default {

    plot_dashboard
};
