<template>
  <div class="tab-title">
    <p class="first-title">当前选择：{{ id }}</p>
    <el-divider content-position="left">基本信息</el-divider>
    <div class="base">
      <el-row>
        <el-col :span="6">
          仪表编号:{{ id }}
        </el-col>
        <el-col :span="6">
          厂商：---
        </el-col>
        <el-col :span="6">
          设备编号：---
        </el-col>
        <el-col :span="6">
          口径：---
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          安装位置:---
        </el-col>
        <el-col :span="6">
          坐标：---
        </el-col>
        <el-col :span="6">
          安装日期：---
        </el-col>
        <el-col :span="6">
          DMA分区：---
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          分区:---
        </el-col>
      </el-row>
    </div>
    <el-divider />
    <div class="table">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="计量数据" name="first">
          <div class="drive-table" id="drive-table"></div>
        </el-tab-pane>
        <el-tab-pane label="水量分析" name="second">水量分析</el-tab-pane>
      </el-tabs>
    </div>
    <el-divider />
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="抄表时间" width="180" />
      <el-table-column prop="cumulativeflow" label="累计流量" width="180" />
      <el-table-column prop="instantaneousflow" label="瞬时流量" width="180"  />
      <el-table-column prop="forwardflow" label="正向流量" width="180"  />
      <el-table-column prop="backwardflow" label="返向流量" width="180"  />
      <el-table-column prop="Battery" label="电池寿命" width="180"  />
      <el-table-column prop="mainalarm" label="主要报警" />
    </el-table>
    <div style="height: 40px;">
      <el-pagination background layout="->,prev, pager, next" :total="1000" style="margin-top: 10px;" />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { TabsPaneContext } from 'element-plus'
import * as echarts from "echarts"
const route = useRoute()
// 表格数据
const tableData = [
  {
    date: '2016-05-05',
    cumulativeflow: '2920.130m³',
    instantaneousflow:'11.690m³/h',
    forwardflow:'2920.130m³',
    backwardflow:'0m³',
    Battery:'100years',
    mainalarm: '流量警告',
  },
  {
    date: '2016-05-04',
    cumulativeflow: '2920.130m³',
    instantaneousflow:'11.690m³/h',
    forwardflow:'2920.130m³',
    backwardflow:'0m³',
    Battery:'100years',
    mainalarm: '流量警告',
  },
  {
    date: '2016-05-03',
    cumulativeflow: '2920.130m³',
    instantaneousflow:'11.690m³/h',
    forwardflow:'2920.130m³',
    backwardflow:'0m³',
    Battery:'100years',
    mainalarm: '流量警告',
  },
  {
    date: '2016-05-02',
    cumulativeflow: '2920.130m³',
    instantaneousflow:'11.690m³/h',
    forwardflow:'2920.130m³',
    backwardflow:'0m³',
    Battery:'100years',
    mainalarm: '流量警告',
  },
  {
    date: '2016-05-01',
    cumulativeflow: '2920.130m³',
    instantaneousflow:'11.690m³/h',
    forwardflow:'2920.130m³',
    backwardflow:'0m³',
    Battery:'100years',
    mainalarm: '流量警告',
  },
  {
    date: '2016-04-30',
    cumulativeflow: '2920.130m³',
    instantaneousflow:'11.690m³/h',
    forwardflow:'2920.130m³',
    backwardflow:'0m³',
    Battery:'100years',
    mainalarm: '流量警告',
  },
  {
    date: '2016-05-03',
    cumulativeflow: '2920.130m³',
    instantaneousflow:'11.690m³/h',
    forwardflow:'2920.130m³',
    backwardflow:'0m³',
    Battery:'100years',
    mainalarm: '流量警告',
  },
]
onMounted(() => {
  driveChart()
})
let id = route.query.id
const activeName = ref('first') //设置默认值
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
// 绘制echarts图表
const driveChart = () => {
  let chartDom: any = document.getElementById('drive-table');
  let myChart = echarts.init(chartDom);
  let bgColor = "#fff";
  let color = ["#0090FF", "#36CE9E", "#FFC005", "#FF515A", "#8B5CFF", "#00CA69"];
  let echartData = [
    {
      name: "1",
      value1: 100,
      value2: 233,
    },
    {
      name: "2",
      value1: 138,
      value2: 233,
    },
    {
      name: "3",
      value1: 350,
      value2: 200,
    },
    {
      name: "4",
      value1: 173,
      value2: 180,
    },
    {
      name: "5",
      value1: 180,
      value2: 199,
    },
    {
      name: "6",
      value1: 150,
      value2: 233,
    },
    {
      name: "7",
      value1: 180,
      value2: 210,
    },
    {
      name: "8",
      value1: 230,
      value2: 180,
    },
    {
      name: "9",
      value1: 190,
      value2: 280,
    },
    {
      name: "10",
      value1: 230,
      value2: 180,
    },
    {
      name: "11",
      value1: 290,
      value2: 240,
    },
    {
      name: "12",
      value1: 200,
      value2: 180,
    },
  ];

  let xAxisData = echartData.map((v) => v.name);
  //  ["1", "2", "3", "4", "5", "6", "7", "8"]
  let yAxisData1 = echartData.map((v) => v.value1);
  // [100, 138, 350, 173, 180, 150, 180, 230]
  let yAxisData2 = echartData.map((v) => v.value2);
  // [233, 233, 200, 180, 199, 233, 210, 180]
  const hexToRgba = (hex: any, opacity: any) => {
    let rgbaColor = "";
    let reg = /^#[\da-f]{6}$/i;
    if (reg.test(hex)) {
      rgbaColor = `rgba(${parseInt("0x" + hex.slice(1, 3))},${parseInt(
        "0x" + hex.slice(3, 5)
      )},${parseInt("0x" + hex.slice(5, 7))},${opacity})`;
    }
    return rgbaColor;
  };
  let option = {
    backgroundColor: bgColor,
    color: color,
    legend: {
      right: 60,
      top: 20,
    },
    tooltip: {
      trigger: "axis",
      formatter: function (params: any) {
        let html = "";
        params.forEach((v: any) => {
          console.log(v);
          html += `<div style="color: #666;font-size: 14px;line-height: 24px">
                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${color[v.componentIndex]
            };"></span>
                ${v.seriesName}
                <span style="color:${color[v.componentIndex]
            };font-weight:700;font-size: 18px">${v.value}</span>
            m³`;
        });
        return html;
      },
      extraCssText:
        "background: #fff; border-radius: 0;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);color: #333;",
      axisPointer: {
        type: "shadow",
        shadowStyle: {
          color: "#ffffff",
          shadowColor: "rgba(225,225,225,1)",
          shadowBlur: 5,
        },
      },
    },
    dataZoom: [
        {
            type: 'slider',
            start: 0,
            end: 50,
        },
        // {  type: 'slider',  showDataShadow: false,
        //  handleIcon: 'path:M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        //   handleSize: '80%' ,
        //   start: 0,
        // //   end: data.length > 3 ? 35 : 100
        //  },
        {
            type: 'inside',
            orient: 'vertical',
            // start: 15,
            // end: 65,
        },
        // { //  type: 'inside', //  orient: 'vertical', // showDataShadow: false, //  // handleIcon: 'path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z', //     // handleSize: '80%' // }
    ],
    grid: {
      top: 100,
      x: 50,
      y: 25,
      x2: 50,
      y2: 50,
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        axisLabel: {
          formatter: "{value}月",
          textStyle: {
            color: "#333",
          },
        },
        axisLine: {
          lineStyle: {
            color: "#D9D9D9",
          },
        },
        data: xAxisData,
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "单位：m³",
        axisLabel: {
          textStyle: {
            color: "#666",
          },
        },
        nameTextStyle: {
          color: "#666",
          fontSize: 12,
          lineHeight: 40,
        },
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: "#E9E9E9",
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: "用水量",
        type: "line",
        smooth: true,
        // showSymbol: false,/
        symbolSize: 8,
        zlevel: 3,
        lineStyle: {
          normal: {
            color: color[0],
            shadowBlur: 3,
            shadowColor: hexToRgba(color[0], 0.5),
            shadowOffsetY: 8,
          },
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: hexToRgba(color[0], 0.3),
                },
                {
                  offset: 1,
                  color: hexToRgba(color[0], 0.1),
                },
              ],
              false
            ),
            shadowColor: hexToRgba(color[0], 0.1),
            shadowBlur: 10,
          },
        },
        data: yAxisData1,
      },
      {
        name: "供水量",
        type: "line",
        smooth: true,
        // showSymbol: false,
        symbolSize: 8,
        zlevel: 3,
        lineStyle: {
          normal: {
            color: color[1],
            shadowBlur: 3,
            shadowColor: hexToRgba(color[1], 0.5),
            shadowOffsetY: 8,
          },
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: hexToRgba(color[1], 0.3),
                },
                {
                  offset: 1,
                  color: hexToRgba(color[1], 0.1),
                },
              ],
              false
            ),
            shadowColor: hexToRgba(color[1], 0.1),
            shadowBlur: 10,
          },
        },
        data: yAxisData2,
      },
    ],
  }
  option && myChart.setOption(option);
}

</script>
<style lang="scss" scoped>
.tab-title {
  width: 98%;
  height: 100%;
  margin: auto;

  .first-title {
    font-size: 14px;
  }

  .base {
    font-size: 14px;
  }

  .table {
    width: 100%;

    .drive-table {
      width: 100%;
      height: 300px;
    }
  }
}

::v-deep .el-divider__text {
  background-color: rgba(0, 0, 0, 0);
}

// 布局样式
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

// 标签选择样式
</style>
