
// * Média de Throughput dos clientes [ Histograma ]
// * Média de PDR dos clientes [ Histograma ]
// * Média de PER dos clientes [ Histograma ]
// * Média de RSSI dos clientes [ Histograma ]
// * Média de latência dos clientes [ Histograma ]

function plot_mean_clients_throughput_histogram(data) {}

function plot_mean_clients_pdr_histogram(data) {}

function plot_mean_clients_per_histogram(data) {}

function plot_mean_clients_delay_histogram(data) {}

function plot_mean_clients_rssi_histogram(data) {}

function plot_dashboard(data) {

    const dashboardSections = document.getElementsByClassName("link-dashboard");

    for (let section of dashboardSections) {

        section.innerHTML = `
        <canvas id="mean_clients_throughput_histogram"></canvas>
        <canvas id="mean_clients_pdr_histogram"></canvas>
        <canvas id="mean_clients_per_histogram"></canvas>
        <canvas id="mean_clients_delay_histogram"></canvas>
        <canvas id="mean_clients_rssi_histogram"></canvas>
        `;
    }

    plot_mean_clients_throughput_histogram(data);
    plot_mean_clients_pdr_histogram(data);
    plot_mean_clients_per_histogram(data);
    plot_mean_clients_delay_histogram(data);
    plot_mean_clients_rssi_histogram(data);
}


export default {

    plot_dashboard
};
