<script>
export default {
  SalesChartC: {
    series: [
      {
        name: "Sales C",
        data: [2, 4, 4, 6, 8, 5, 6, 4, 8, 6, 6, 2]
      }
    ],
    chartOptions: {
      grid: {
        show: false,
        padding: {
          left: 0,
          right: 0
        }
      },
      colors: ["#7460ee"],
      fill: {
        type: "solid",
        opacity: 1
      },
      chart: {
        toolbar: {
          show: false
        },
        sparkline: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight",
        width: 0
      },
      tooltip: {
        theme: "dark"
      }
    }
  }
};
</script>