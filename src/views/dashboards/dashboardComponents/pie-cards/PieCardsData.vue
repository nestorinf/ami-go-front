<script>
export default {
  searchChart: {
    series: [5, 15],
    chartOptions: {
      labels: ["Search Traffic", "Free"],
      dataLabels: {
        enabled: false
      },
      grid: {
        padding: {
          left: 0,
          right: 0
        }
      },
      chart: {},
      plotOptions: {
        pie: {
          donut: {
            size: "85px"
          }
        }
      },
      stroke: {
        width: 0
      },
      legend: {
        show: false
      },
      colors: ["rgb(30, 136, 229)", "rgb(250, 250, 250)"],
      tooltip: {
        enabled: false,
        theme: "dark"
      }
    }
  },
  referralChart: {
    series: [4, 15],
    chartOptions: {
      labels: ["Referral Traffic", "Free"],
      dataLabels: {
        enabled: false
      },
      grid: {
        padding: {
          left: 0,
          right: 0
        }
      },
      chart: {},
      plotOptions: {
        pie: {
          donut: {
            size: "85px"
          }
        }
      },
      stroke: {
        width: 0
      },
      legend: {
        show: false
      },
      colors: ["rgb(38, 198, 218)", "rgb(250, 250, 250)"],
      tooltip: {
        enabled: false,
        theme: "dark"
      }
    }
  },
  socialChart: {
    series: [11, 15],
    chartOptions: {
      labels: ["Social Traffic", "Free"],
      dataLabels: {
        enabled: false
      },
      grid: {
        padding: {
          left: 0,
          right: 0
        }
      },
      chart: {},
      plotOptions: {
        pie: {
          donut: {
            size: "85px"
          }
        }
      },
      stroke: {
        width: 0
      },
      legend: {
        show: false
      },
      colors: ["rgb(116, 96, 238)", "rgb(250, 250, 250)"],
      tooltip: {
        enabled: false,
        theme: "dark"
      }
    }
  },
  directChart: {
    series: [20, 15],
    chartOptions: {
      labels: ["Direct Traffic", "Free"],
      dataLabels: {
        enabled: false
      },
      grid: {
        padding: {
          left: 0,
          right: 0
        }
      },
      chart: {},
      plotOptions: {
        pie: {
          donut: {
            size: "85px"
          }
        }
      },
      stroke: {
        width: 0
      },
      legend: {
        show: false
      },
      colors: ["rgb(252, 75, 108)", "rgb(250, 250, 250)"],
      tooltip: {
        enabled: false,
        theme: "dark"
      }
    }
  }
};
</script>