<script>
export default {
  donutChart: {
    series: [50, 40, 30, 10],
    chartOptions: {
      labels: ["Other", "Desktop", "Tablet", "Mobile"],
      dataLabels: {
        enabled: false
      },
      grid: {
        padding: {
          left: 0,
          right: 0
        },
        borderColor: "rgba(0,0,0,0.1)"
      },
      plotOptions: {
        pie: {
          donut: {
            size: "86px",
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: "18px",
                color: undefined,
                offsetY: -10
              },
              value: {
                show: true,
                color: "#99abb4"
              },
              total: {
                show: true,
                label: "Product Sales",
                color: "#99abb4"
              }
            }
          }
        }
      },
      stroke: {
        width: 0
      },
      legend: {
        show: false
      },
      colors: ["#1e88e5", "#26c6da", "#eceff1", "#745af2"],
      tooltip: {
        fillSeriesColor: false
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 250
            }
          }
        }
      ]
    }
  }
};
</script>