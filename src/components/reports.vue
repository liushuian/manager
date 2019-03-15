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
import $ from "jquery";
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
            data: []
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: []
      }
    };
  },
  async mounted() {
    
    let res = await this.$http.get('reports/type/1');
    //遍历服务器传回来的值并赋值给本地option
    for(const key in res.data.data){
      this.option[key] = res.data.data[key];
    }
    //X轴从左边开始
    this.option.xAxis[0].boundaryGap = false
    //合并,参数1--deep(是否深度合并,默认false),参数2--target(目标对象),参数3--obj(被合并的第一个对象)
    // $.extend(true,this.option,res.data.data);
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




