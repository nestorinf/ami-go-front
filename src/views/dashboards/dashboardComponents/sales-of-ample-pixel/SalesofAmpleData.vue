<script>
export default {
  SalesAmpleChart: {
    series: [
      {
        name: "Ample",
        data: [
          0,
          4,
          3,
          24,
          9,
          10,
          18,
          15,
          44,
          17,
          19,
          26,
          31,
          8,
          37,
          10,
          24,
          51
        ]
      },
      {
        name: "Pixel",
        data: [0, 1, 1, 10, 24, 6, 12, 4, 21, 15, 44, 24, 28, 4, 10, 21, 5, 47]
      }
    ],
    chartOptions: {
      grid: {
        show: true,
        borderColor: "rgba(0, 0, 0, .3)",
        strokeDashArray: 3,
        padding: {
          left: 0,
          right: 30,
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
      colors: ["rgba(30, 172, 190, .3)", "rgba(38, 198, 218, .7)"],
      fill: {
        type: "solid",
        opacity: 1
      },
      markers: {
        size: 1,
        strokeColors: "rgba(30, 172, 190, .7)"
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
      legend: {
        show: false
      },
      xaxis: {
        type: "category",
        categories: [
          "0",
          "4",
          "8",
          "12",
          "16",
          "20",
          "24",
          "30",
          "16",
          "20",
          "24",
          "30",
          "34",
          "38",
          "42",
          "46",
          "50",
          "54"
        ],
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
        curve: "smooth",
        width: 0
      },
      tooltip: {
        theme: "dark"
      }
    }
  }
};
</script>