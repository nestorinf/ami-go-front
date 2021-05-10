<script>
export default {
  VisitChart: {
    series: [80, 60, 20, 140],
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
                label: "Visit Source",
                color: "#99abb4"
              }
            }
          }
        }
      },
      stroke: {
        width: 1,
        colors: "rgba(0,0,0,0.1)"
      },
      legend: {
        show: false
      },
      colors: ["#745af2", "#f62d51", "#26c6da", "#dadada"],
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