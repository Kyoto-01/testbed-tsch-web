
// * Throughput total por tempo [ Série Temporal ]
// * Média de PDR total por tempo [ Série Temporal ]
// * Média de PER total por tempo [ Série Temporal ]
// * Média de latência total por tempo [ Série Temporal ]

function plot_throughput_time_series(data) {}

function plot_mean_pdr_time_series(data) {}

function plot_mean_per_time_series(data) {}

function plot_mean_delay_time_series(data) {}

function plot_dashboard(data) {

    const dashboardSections = document.getElementsByClassName("link-dashboard");

    for (let section of dashboardSections) {

        section.innerHTML = `
        <canvas id="throughput_time_series"></canvas>
        <canvas id="mean_pdr_time_series"></canvas>
        <canvas id="mean_per_time_series"></canvas>
        <canvas id="mean_delay_time_series"></canvas>
        `;
    }

    plot_throughput_time_series(data);
    plot_mean_pdr_time_series(data);
    plot_mean_per_time_series(data);
    plot_mean_delay_time_series(data);
}


export default {

    plot_dashboard
};
