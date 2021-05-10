<script>
export default {
  SalesoverChart: {
    series: [
      {
        name: "Ample",
        data: [9, 5, 3, 7, 5, 10, 3]
      },
      {
        name: "Pixel",
        data: [6, 3, 9, 5, 4, 6, 4]
      }
    ],
    chartOptions: {
      grid: {
        show: true,
        borderColor: "rgba(0,0,0,.3)",
        strokeDashArray: 2,
        padding: {
          left: 0,
          right: 0,
          bottom: 0
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "22%",
          endingShape: "flat"
        }
      },
      colors: ["#1e88e5", "#26c6da"],
      fill: {
        type: "solid",
        opacity: 1
      },
      chart: {
        toolbar: {
          show: false
        },
        sparkline: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0
      },
      legend: {
        show: false
      },
      xaxis: {
        type: "category",
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        labels: {
          style: {
            cssClass: "grey--text lighten-2--text fill-color"
          }
        }
      },
      yaxis: {
        show: true,
        labels: {
          style: {
            cssClass: "grey--text lighten-2--text fill-color"
          }
        }
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