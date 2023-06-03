
// * Throughput total por tempo [ Série Temporal ]
// * Média de PDR total por tempo [ Série Temporal ]
// * Média de PER total por tempo [ Série Temporal ]
// * Média de latência total por tempo [ Série Temporal ]

function plot_time_series(canvasId, data, label) {

    const ctx = document.getElementById(canvasId);

    const chartLabels = Object.values(data).map(x => {
        let date = new Date(x.time);
        return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} \
${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    });

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
    plot_time_series(canvasId, data, "# Network throughput (pps)");
}

function plot_mean_pdr_time_series(canvasId, data) {
    plot_time_series(canvasId, data, "# Network PDR");
}

function plot_mean_per_time_series(canvasId, data) {
    plot_time_series(canvasId, data, "# Network PER");
}

function plot_mean_delay_time_series(canvasId, data) {
    plot_time_series(canvasId, data, "# Network delay");
}

function plot_dashboard(data) {

    const dashboardSections = document.getElementsByClassName("link-dashboard");

    for (let section of dashboardSections) {

        const canvasIds = [
            section.id + "_plot_throughput_time_series",
            section.id + "_plot_pdr_time_series",
            section.id + "_plot_per_time_series",
            section.id + "_plot_delay_time_series"
        ]

        section.innerHTML = `
        <div class="col-md-6 mt-3 mb-3"><canvas id="${canvasIds[0]}"></canvas></div>
        <div class="col-md-6 mt-3 mb-3"><canvas id="${canvasIds[1]}"></canvas></div>
        <div class="col-md-6 mt-3 mb-3"><canvas id="${canvasIds[2]}"></canvas></div>
        <div class="col-md-6 mt-3 mb-3"><canvas id="${canvasIds[3]}"></canvas></div>
        `;

        plot_throughput_time_series(canvasIds[0], data.raw.throughput["general"]);
        plot_mean_pdr_time_series(canvasIds[1], data.raw.pdr["general"]);
        plot_mean_per_time_series(canvasIds[2], data.raw.per["general"]);
        plot_mean_delay_time_series(canvasIds[3], data.raw.delay["general"]);
    }
}


export default {

    plot_dashboard
};
