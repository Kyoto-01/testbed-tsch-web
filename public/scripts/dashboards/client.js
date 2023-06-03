
// * Throughput por tempo [ Série Temporal ]
// * PDR por tempo [ Série Temporal ]
// * PER por tempo [ Série Temporal ]
// * Latência por pacote transmitido [ Série Temporal ]
// * RSSI por pacote transmitido [ Série Temporal ]

function plot_time_series(canvasId, data, label, tsType) {

    const ctx = document.getElementById(canvasId);

    let chartLabels = [];

    if (tsType == "per_packet") {

        chartLabels = Array(Object.keys(data).length).fill().map((element, index) => index + 1);

    } else {

        chartLabels = Object.values(data).map(x => {
            let date = new Date(x.time);
            return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} \
${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        });
    }

    const chartData = Object.values(data).map(x => x.value);

    new Chart(ctx, {
        type: "line",
        data: {
            labels: chartLabels,
            datasets: [{
                label: label,
                data: chartData,
                fill: false,
                borderColor: "rgb(0, 92, 61)",
                tension: 0.1
            }]
        },
    });
}

function plot_throughput_time_series(canvasId, data) {
    plot_time_series(canvasId, data, "# Link throughput (pps)");
}

function plot_pdr_time_series(canvasId, data) {
    plot_time_series(canvasId, data, "# Link PDR");
}

function plot_per_time_series(canvasId, data) {
    plot_time_series(canvasId, data, "# Link PER");
}

function plot_delay_time_series(canvasId, data) {
    plot_time_series(canvasId, data, "# Link delay (ms)");
}

function plot_rssi_time_series(canvasId, data) {
    plot_time_series(canvasId, data, "# Link RSSI per packet", "per_packet");
}

function plot_dashboard(data) {

    const dashboardSections = document.getElementsByClassName("link-dashboard");

    for (let section of dashboardSections) {

        const canvasIds = [
            section.id + "_plot_throughput_time_series",
            section.id + "_plot_pdr_time_series",
            section.id + "_plot_per_time_series",
            section.id + "_plot_delay_time_series",
            section.id + "_plot_rssi_time_series"
        ]

        section.innerHTML = `
        <div class="col-md-6 mt-3 mb-3"><canvas id="${canvasIds[0]}"></canvas></div>
        <div class="col-md-6 mt-3 mb-3"><canvas id="${canvasIds[1]}"></canvas></div>
        <div class="col-md-6 mt-3 mb-3"><canvas id="${canvasIds[2]}"></canvas></div>
        <div class="col-md-6 mt-3 mb-3"><canvas id="${canvasIds[3]}"></canvas></div>
        <div class="col-md-6 mt-3 mb-3"><canvas id="${canvasIds[4]}"></canvas></div>
        `;

        plot_throughput_time_series(canvasIds[0], data.raw.throughput[section.id]);
        plot_pdr_time_series(canvasIds[1], data.raw.pdr[section.id]);
        plot_per_time_series(canvasIds[2], data.raw.per[section.id]);
        plot_delay_time_series(canvasIds[3], data.raw.delay[section.id]);
        plot_rssi_time_series(canvasIds[4], data.raw.rssi[section.id]);
    }
}


export default {

    plot_dashboard
};
