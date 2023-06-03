
// * Média de Throughput dos clientes [ Histograma ]
// * Média de PDR dos clientes [ Histograma ]
// * Média de PER dos clientes [ Histograma ]
// * Média de RSSI dos clientes [ Histograma ]
// * Média de latência dos clientes [ Histograma ]

function plot_histogram(canvasId, data, label) {

    const ctx = document.getElementById(canvasId);

    const chartLabels = Object.keys(data);

    const chartData = Object.values(data);

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: chartLabels,
        datasets: [{
          label: label,
          data: chartData,
          backgroundColor: "rgba(0, 92, 61, 0.2)",
          borderColor: "rgb(0, 92, 61)",
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
}

function plot_mean_clients_throughput_histogram(canvasId, data) {
   plot_histogram(canvasId, data, "# Clients mean throughput (pps)");
}

function plot_mean_clients_pdr_histogram(canvasId, data) {
    plot_histogram(canvasId, data, "# Clients mean PDR");
}

function plot_mean_clients_per_histogram(canvasId, data) {
    plot_histogram(canvasId, data, "# Clients mean PER");
}

function plot_mean_clients_delay_histogram(canvasId, data) {
    plot_histogram(canvasId, data, "# Clients mean delay (ms)");
}

function plot_mean_clients_rssi_histogram(canvasId, data) {
    plot_histogram(canvasId, data, "# Clients mean RSSI (dBm)");
}

function plot_dashboard(data) {

    const dashboardSections = document.getElementsByClassName("link-dashboard");

    for (let section of dashboardSections) {

        const canvasIds = [
            section.id + "_mean_clients_throughput_histogram",
            section.id + "_mean_clients_pdr_histogram",
            section.id + "_mean_clients_per_histogram",
            section.id + "_mean_clients_delay_histogram",
            section.id + "_mean_clients_rssi_histogram"
        ]

        section.innerHTML = `
        <div class="col-md-6 mt-3 mb-3"><canvas id="${canvasIds[0]}"></canvas></div>
        <div class="col-md-6 mt-3 mb-3"><canvas id="${canvasIds[1]}"></canvas></div>
        <div class="col-md-6 mt-3 mb-3"><canvas id="${canvasIds[2]}"></canvas></div>
        <div class="col-md-6 mt-3 mb-3"><canvas id="${canvasIds[3]}"></canvas></div>
        <div class="col-md-6 mt-3 mb-3"><canvas id="${canvasIds[4]}"></canvas></div>
        `;

        plot_mean_clients_throughput_histogram(canvasIds[0], data.mean.throughput);
        plot_mean_clients_pdr_histogram(canvasIds[1], data.mean.pdr);
        plot_mean_clients_per_histogram(canvasIds[2], data.mean.per);
        plot_mean_clients_delay_histogram(canvasIds[3], data.mean.delay);
        plot_mean_clients_rssi_histogram(canvasIds[4], data.mean.rssi);
    }
}


export default {

    plot_dashboard
};
