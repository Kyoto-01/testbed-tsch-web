
// * Throughput por tempo [ Série Temporal ]
// * PDR por tempo [ Série Temporal ]
// * PER por tempo [ Série Temporal ]
// * Latência por pacote transmitido [ Série Temporal ]
// * RSSI por pacote transmitido [ Série Temporal ]

function plot_throughput_time_series(data) {}

function plot_pdr_time_series(data) {}

function plot_per_time_series(data) {}

function plot_delay_time_series(data) {}

function plot_rssi_time_series(data) {}

function plot_dashboard(data) {

    plot_throughput_time_series(data);
    plot_pdr_time_series(data);
    plot_per_time_series(data);
    plot_delay_time_series(data);
    plot_rssi_time_series(data);
}


export default {

    plot_dashboard
};