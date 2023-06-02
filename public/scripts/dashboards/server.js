
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

    plot_mean_clients_throughput_histogram(data);
    plot_mean_clients_pdr_histogram(data);
    plot_mean_clients_per_histogram(data);
    plot_mean_clients_delay_histogram(data);
    plot_mean_clients_rssi_histogram(data);
}


export default {

    plot_dashboard
};
