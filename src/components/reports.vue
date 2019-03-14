<template>
  <div>
    <!-- 面包屑 -->
    <mybreadxie second="数据统计" third="数据报表"></mybreadxie>
    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div id="main" style="width: 872px;height:500px;"></div>
  </div>
</template>
<script>
import echarts from "echarts";

export default {
  data() {
    return {
      option: {
        title: {
          text: "用户来源"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["华东", "华南", "华北", "西部", "其他"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["2017-12-27", "2017-12-28", "2017-12-29", "2017-12-30", "2017-12-31", "2018-1-1"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "华东",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [2999, 3111, 4100, 3565, 3528,6000]
          },
          {
            name: "华南",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [5090, 2500, 3400, 6000, 6400,7800]
          },
          {
            name: "华北",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [6888, 4000, 8010, 12321, 13928,12984]
          },
          {
            name: "西部",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [9991, 4130, 7777, 12903, 13098,14028]
          },
          {
            name: "其他",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: { normal: {} },
            data: [15212, 5800, 13928, 14821, 15982,14091]
          }
        ]
      }
    };
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.querySelector("#main"));
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(this.option);
  }
};
</script>
<style>
#main{
    background-color: #fff;
}
</style>




