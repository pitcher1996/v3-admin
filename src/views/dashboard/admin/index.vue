<template>
  <div class="content">
    <div id="cesiumContainer" class="cesiumContainer"></div>
    <!-- 返回主视角按钮 -->
    <div class="back-main" @click="backCamera()" v-if="isShowBack">
      <svg
        t="1686646842774"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2921"
        width="30"
        height="30"
      >
        <path
          d="M700.371228 394.525472 174.028569 394.525472l255.952416-227.506551c12.389168-11.011798 13.505595-29.980825 2.492774-42.369993-11.011798-12.386098-29.977755-13.506619-42.367947-2.492774L76.425623 400.975371c-6.960529 5.496178-11.434423 14.003945-11.434423 23.561625 0 0.013303 0.001023 0.026606 0.001023 0.039909 0 0.01228-0.001023 0.025583-0.001023 0.037862 0 0.473791 0.01535 0.946558 0.037862 1.418302 0.001023 0.016373 0.001023 0.032746 0.001023 0.049119 0.39295 8.030907 3.992941 15.595186 10.034541 20.962427l315.040163 280.028764c5.717212 5.083785 12.83533 7.580652 19.925818 7.580652 8.274454 0 16.514115-3.403516 22.442128-10.07445 11.011798-12.387122 9.896394-31.357172-2.492774-42.367947l-256.128425-227.665163 526.518668 0c109.219517 0 198.075241 88.855724 198.075241 198.075241s-88.855724 198.075241-198.075241 198.075241L354.324888 850.696955c-16.57449 0-30.011524 13.437034-30.011524 30.011524s13.437034 30.011524 30.011524 30.011524l346.046341 0c142.31631 0 258.098289-115.783003 258.098289-258.098289S842.686515 394.525472 700.371228 394.525472z"
          fill="#1296db"
          p-id="2922"
        ></path>
      </svg>
    </div>
    <!-- 控制显示整个提示框 -->
    <div v-if="!isHomepage">
      <!-- 左上角仪表盘 -->
      <div id="hourglass-tip" class="hourglass-tip" v-show="isShowTip">
        <div class="toleft">
          <el-tooltip class="box-item" effect="dark" content="点击收起" placement="right">
            <el-icon class="darrow-left" style="z-index: 9999" @click="changeShowTip()">
              <DArrowLeft />
            </el-icon>
          </el-tooltip>
        </div>
        <div id="yb" class="yb"></div>
        <div class="tip-message">
          <p style="position: relative; text-align: center; line-height: 12px">
            总表数量：
            <el-icon style="position: absolute; top: 1px; color: green">
              <Top />
            </el-icon>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;220
          </p>
          <p style="position: relative; text-align: center; line-height: 12px">
            户表数量：
            <el-icon style="position: absolute; top: 1px; color: green">
              <Top />
            </el-icon>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;220
          </p>
          <p style="position: relative; text-align: center; line-height: 12px">
            用水量：
            <el-icon style="position: absolute; top: 0px; color: red">
              <Bottom />
            </el-icon>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;220
          </p>
          <p style="position: relative; text-align: center; line-height: 12px">
            漏水差值：
            <el-icon style="position: absolute; top: 0px; color: red">
              <Bottom />
            </el-icon>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;220
          </p>
          <p style="position: relative; text-align: center; line-height: 12px">
            总供水量：
            <el-icon style="position: absolute; top: 0px; color: red">
              <Bottom />
            </el-icon>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;220
          </p>
        </div>
      </div>
      <!-- 隐藏仪表盘 -->
      <div id="open-tip" class="open-tip" v-show="!isShowTip">
        <el-tooltip class="box-item" effect="dark" content="点击展开" placement="right">
          <el-icon class="darrow-left" style="z-index: 9999" @click="changeShowTip()">
            <DArrowRight />
          </el-icon>
        </el-tooltip>
      </div>
    </div>
    <!-- 左下角大小表 -->
    <div v-show="isShowAll">
      <div id="outside" class="outside" v-if="isShowQuyu">
        <div class="toleft">
          <el-tooltip class="box-item" effect="dark" content="点击收起" placement="right">
            <el-icon class="darrow-left" style="z-index: 9999" @click="changeShowQuyu()">
              <DArrowLeft />
            </el-icon>
          </el-tooltip>
        </div>
        <p class="title">区域所属设备</p>
        <el-tree :data="listdata" @node-click="handleNodeClick">
          <template #default="{ node }">
            <div style="color: red" v-if="node.label == 'Level1-101'">
              {{ node.label }}&nbsp;<span style="text-decoration: underline" @click.prevent="todetail($event)"
                >查看详细</span
              >
            </div>
            <div v-else-if="node.label == '厂商：中沛'">{{ node.label }}</div>
            <div v-else-if="node.label == '口径：20mm'">{{ node.label }}</div>
            <div v-else-if="node.label == '安装日期：2023-04-01'">{{ node.label }}</div>
            <div v-else-if="node.label == '分区：万利'">{{ node.label }}</div>
            <div v-else-if="node.label == '采集器：0101'">{{ node.label }}</div>
            <div v-else-if="node.label == '电池寿命：90h'">{{ node.label }}</div>
            <div v-else-if="node.label == '数据源：csv'">{{ node.label }}</div>
            <div v-else-if="node.label == '累计流量：20mm'">{{ node.label }}</div>
            <div v-else>
              {{ node.label }}&nbsp;<span style="text-decoration: underline" @click.prevent="todetail($event)"
                >查看详细</span
              >
            </div>
          </template>
        </el-tree>
      </div>
      <!-- 隐藏仪表盘 -->
      <div id="open-quyu" class="open-quyu" v-show="!isShowQuyu">
        <el-tooltip class="box-item" effect="dark" content="点击展开" placement="right">
          <el-icon class="darrow-left" style="z-index: 9999" @click="changeShowQuyu()">
            <DArrowRight />
          </el-icon>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>
<script setup>
import * as Cesium from "cesium"
import "../../../../public/Widgets/widgets.css"
import "animate.css"
import { ref, reactive, onMounted, onActivated, watch } from "vue"
import * as echarts from "echarts"
import { ElMessage } from "element-plus"
import { CesiumPopup } from "cesium-popup-es6"
import { AmapImageryProvider, BaiduImageryProvider, GeoVisImageryProvider } from "@dvgis/cesium-map"
import { useRouter } from "vue-router" // 导入路由模块
// pinia保存点击的信息
import { storeToRefs } from "pinia"
import { usePosition } from "@/store/modules/position"
//setup模式
const store = usePosition()
const { czml, sumitData, czml2 } = storeToRefs(store)
const { change } = store

onActivated(() => {
  // console.log(czml.value, 'czml');
  console.log(sumitData.value, "sumitData")
  addregion("add")
  clicklisten()
})

// 设置地图主题
const mapStyle = ref({
  styleJson: [
    {
      featureType: "all",
      elementType: "geometry",
      stylers: {
        hue: "#007fff",
        saturation: 89
      }
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: {
        color: "#ffffff"
      }
    }
  ]
})

const router = useRouter()
const isShowAll = ref(false) // 显示区域所属设备框
const isShowBack = ref(false) // 显示二级页面返回主页面按钮
const isHomepage = ref(true) // 显示一整个流量提示框

const props = defineProps({
  isunit: {
    type: Number,
    default: 0
  }
})
// 列表选择
let listdata = ref([
  {
    id: 1,
    label: "wl01(大表号/楼栋)",
    children: [
      {
        label: "1单元",
        children: [
          {
            id: 201,
            label: "Level1-101",
            children: [
              {
                id: 301,
                label: "厂商：中沛"
              },
              {
                id: 302,
                label: "口径：20mm"
              },
              {
                id: 302,
                label: "安装日期：2023-04-01"
              },
              {
                id: 302,
                label: "分区：万利"
              },
              {
                id: 302,
                label: "采集器：0101"
              },
              {
                id: 302,
                label: "电池寿命：90h"
              },
              {
                id: 302,
                label: "数据源：csv"
              },
              {
                id: 302,
                label: "累计流量：20mm"
              }
            ]
          },
          {
            id: 202,
            label: "Level1-102",
            children: [
              {
                id: 301,
                label: "厂商：中沛"
              },
              {
                id: 302,
                label: "口径：20mm"
              },
              {
                id: 302,
                label: "安装日期：2023-04-01"
              },
              {
                id: 302,
                label: "分区：万利"
              },
              {
                id: 302,
                label: "采集器：0101"
              },
              {
                id: 302,
                label: "电池寿命：90h"
              },
              {
                id: 302,
                label: "数据源：csv"
              },
              {
                id: 302,
                label: "累计流量：20mm"
              }
            ]
          },
          {
            id: 203,
            label: "Level1-103"
          },
          {
            id: 204,
            label: " Level2-201"
          },
          {
            id: 205,
            label: " Level2-202"
          },
          {
            id: 206,
            label: " Level2-203"
          },
          {
            id: 207,
            label: " Level3-301"
          },
          {
            id: 208,
            label: " Level3-302"
          },
          {
            id: 209,
            label: " Level3-303"
          }
        ]
      },
      {
        label: "2单元",
        children: [
          {
            id: 201,
            label: "Level1-101",
            children: [
              {
                id: 301,
                label: "厂商：中沛"
              },
              {
                id: 302,
                label: "口径：20mm"
              },
              {
                id: 302,
                label: "安装日期：2023-04-01"
              },
              {
                id: 302,
                label: "分区：万利"
              },
              {
                id: 302,
                label: "采集器：0101"
              },
              {
                id: 302,
                label: "电池寿命：90h"
              },
              {
                id: 302,
                label: "数据源：csv"
              },
              {
                id: 302,
                label: "累计流量：20mm"
              }
            ]
          },
          {
            id: 202,
            label: "Level1-102",
            children: [
              {
                id: 301,
                label: "厂商：中沛"
              },
              {
                id: 302,
                label: "口径：20mm"
              },
              {
                id: 302,
                label: "安装日期：2023-04-01"
              },
              {
                id: 302,
                label: "分区：万利"
              },
              {
                id: 302,
                label: "采集器：0101"
              },
              {
                id: 302,
                label: "电池寿命：90h"
              },
              {
                id: 302,
                label: "数据源：csv"
              },
              {
                id: 302,
                label: "累计流量：20mm"
              }
            ]
          },
          {
            id: 203,
            label: "Level1-103"
          },
          {
            id: 204,
            label: " Level2-201"
          },
          {
            id: 205,
            label: " Level2-202"
          },
          {
            id: 206,
            label: " Level2-203"
          },
          {
            id: 207,
            label: " Level3-301"
          },
          {
            id: 208,
            label: " Level3-302"
          },
          {
            id: 209,
            label: " Level3-303"
          }
        ]
      }
    ]
  }
])
Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmNzRhNjJiNS0wN2Y5LTRkMDEtOWVjZC04ZjM3MjExZmZkNWEiLCJpZCI6MTQzMDkxLCJpYXQiOjE2ODgwMjg3OTB9.N116NN4z5ZD9pcPRaxZ6P5ZmatxcFbP6frzf7b-teuI"
window.CESIUM_BASE_URL = "/"
let viewer = null
const isShowTip = ref(false)
onMounted(() => {
  setMap()
  // driveTip() 对楼层的提示框进行绘制
  // addWl()
})
// 绘制cesium，并且启动开屏动画
const setMap = () => {
  viewer = new Cesium.Viewer("cesiumContainer", {
    geocoder: false, //搜索框
    homeButton: false, //home按钮
    sceneModePicker: false, //3d/2d 模式切换按钮
    // baseLayerPicker: true, //图层选择按钮
    navigationHelpButton: false, //右上角的帮助按钮
    animation: false, //左下角的动画控件的显示
    shouldAnimate: false, //控制模型动画
    timeline: false, //底部的时间轴
    fullscreenButton: false, //右下角的全屏按钮
    selectionIndicator: true, //选择指示器
    infoBox: false, //信息面板
    terrainProvider: Cesium.createWorldTerrain({
      requestWaterMask: true,
      requestVertexNormals: true
    })
    // 高德地图
    // imageryProvider: new Cesium.UrlTemplateImageryProvider({
    //   url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
    //   minimumLevel: 4,
    //   maximumLevel: 18,
    // })
  })
  let options = {
    style: "elec", // style: img、elec、cva
    crs: "WGS84" // 使用84坐标系，默认为：GCJ02
  }
  viewer.imageryLayers.add(new Cesium.ImageryLayer(new AmapImageryProvider(options)))
  viewer.scene.screenSpaceCameraController.minimumZoomDistance = 1500 // 地图最小放大倍数
  // 隐藏logo
  viewer.cesiumWidget.creditContainer.style.display = "none"
  // 设置相机起始方向
  viewer.camera.setView({
    // 设置视角启始的位置
    destination: Cesium.Cartesian3.fromDegrees(120.0252866079009, 30.285063907813566, 5000),
    // 设置相机方向
    orientation: {
      heading: Cesium.Math.toRadians(0),
      // 控制相机朝向的方向
      pitch: Cesium.Math.toRadians(-90.0),
      roll: 0.0
    }
  })
  addregion("add")
  // addBuild() //等点击区域时在建模型
}

//设置相机
const setCamera = () => {
  let position = Cesium.Cartesian3.fromDegrees(sumitData.value.jd, sumitData.value.wd, 500)
  console.log(position, "position")
  viewer.camera.flyTo({
    destination: position,
    orientation: {
      heading: Cesium.Math.toRadians(0)
      // 控制相机朝向的方向
      // pitch: Cesium.Math.toRadians(-20.0),
    },
    duration: 3 //飞行所用时间
  })
}
// 添加贴面
const addregion = (item) => {
  if (item == "add") {
    const dataSourcePromise1 = Cesium.CzmlDataSource.load(czml.value)
    viewer.dataSources.add(dataSourcePromise1)
  } else if (item == "setbuild") {
    // 点击进入二级页面
    const dataSourcePromise2 = Cesium.CzmlDataSource.load(czml2.value)
    // 已经在小区级或者点击了小区图标

    viewer.dataSources.add(dataSourcePromise2)
    isShowBack.value = true
  } else {
    console.log(viewer.dataSources._dataSources[0].show, "viewer.dataSources")
    viewer.dataSources.remove(dataSourcePromise, true)
    viewer.dataSources._dataSources[0].show = false
    console.log(viewer.dataSources._dataSources[0].show, "viewer.dataSources")
  }
}

// 点击区域事件
const isShowoutside = ref(false)
const clicklisten = () => {
  let handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas)
  handler.setInputAction((click) => {
    // debugger
    // 将屏幕坐标转换为场景中的三维坐标
    let pickedObject = viewer.scene.pick(click.position)
    console.log(pickedObject, "pickedObject")
    viewer.dataSources.removeAll()
    setCamera()
    addregion("setbuild")
    viewer.scene.screenSpaceCameraController.minimumZoomDistance = 0 // 修改最大放大倍数，要不然移动图层会变大

    // 调接口，给入参，返回出参
    // console.log(czml,'改变show的值');
    //   if(pickedObject =1) {
    //     console.log('111');
    //   } else{
    //     viewer.dataSources.removeAll()
    //     setCamera()
    //     addregion('setbuild')
    //     viewer.scene.screenSpaceCameraController.minimumZoomDistance = 0 // 修改最大放大倍数，要不然移动图层会变大
    //   }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
}

const watersupply = ref("小区供水量")
const wateruse = ref("小区用水量")
// 仪表盘绘制
const dirveYB = () => {
  let chartDom = document.getElementById("yb")
  let myChart = echarts.init(chartDom)
  let option = {
    // title: {
    //   text: 'Stacked Line'
    // },
    tooltip: {
      trigger: "axis"
    },
    legend: {
      data: ["小区供水量", "小区用水量"]
    },
    grid: {
      left: "3%",
      right: "8%",
      bottom: "3%",
      top: "20%",
      containLabel: true
    },
    // 隐藏下载按钮
    // toolbox: {
    //   feature: {
    //     saveAsImage: {}
    //   }
    // },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        name: "小区用水量",
        type: "line",
        stack: "Total",
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: "小区供水量",
        type: "line",
        stack: "Total",
        data: [220, 182, 191, 234, 290, 330, 310]
      }
    ]
  }
  option && myChart.setOption(option)
}

// 控制仪表片收缩
const changeShowTip = () => {
  isShowTip.value = !isShowTip.value
}

// 控制显示区域所属设备
const isShowQuyu = ref(true)
const changeShowQuyu = () => {
  isShowQuyu.value = !isShowQuyu.value
}

// 添加3d建筑
const addBuild = () => {
  const osmBuildingsTileset = Cesium.createOsmBuildings()
  osmBuildingsTileset.style = new Cesium.Cesium3DTileStyle({
    defines: {
      distance:
        "distance(vec2(${feature['cesium#longitude']},${feature['cesium#latitude']}),vec2(120.004200,30.281200))" //距离计算
    },
    color: "color('white')"
  })
  // osmBuildingsTileset.style.style.backgroundColor = 'color("blue")';
  const osmBuild = viewer.scene.primitives.add(osmBuildingsTileset)

  const polygon = viewer.entities.add({
    polygon: {
      hierarchy: new Cesium.PolygonHierarchy(
        Cesium.Cartesian3.fromRadiansArray([
          120.008529, 30.278337, 120.008614, 30.278114, 120.009752, 30.27844, 120.009659, 30.278667
        ])
      ),
      material: Cesium.Color.RED.withAlpha(0.5),
      classificationType: Cesium.ClassificationType.BOTH
    }
  })

  polygon.polygon.classificationType = Cesium.ClassificationType.BOTH
}

// 点击返回主视角
const backCamera = () => {
  // 设置相机起始方向
  let position = Cesium.Cartesian3.fromDegrees(120.0252866079009, 30.285063907813566, 5000)
  viewer.camera.flyTo({
    // 设置视角启始的位置
    destination: position,
    // 设置相机方向
    orientation: {
      heading: Cesium.Math.toRadians(0),
      // 控制相机朝向的方向
      pitch: Cesium.Math.toRadians(-90.0),
      roll: 0.0
    },
    duration: 5 //飞行所用时间
  })
  viewer.dataSources.removeAll()
  const dataSourcePromise1 = Cesium.CzmlDataSource.load(czml.value)
  viewer.dataSources.add(dataSourcePromise1)
  isShowAll.value = false
  isShowBack.value = false
  isHomepage.value = true
}

// 树形控件
const handleNodeClick = (data) => {
  // console.log(data,'点击显示的信息')
}

// 点击树形跳转到具体表信息
const todetail = (e) => {
  // console.log(e.srcElement.parentElement.innerText,'e');
  let all = e.srcElement.parentElement.innerText
  let querynumbere = all.trim().split(/\s+/)[0]
  console.log(querynumbere, "截取的目录")
  router.push({ path: "/meterinformation/detail", query: { id: querynumbere } })
}

let i = true
const interbuild = () => {
  if (i == true) {
    setCamera()
    viewer.dataSources.removeAll()
  } else {
    setCamera()
  }
}

defineExpose({
  setCamera,
  addregion,
  interbuild
})
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  position: relative;

  .cesiumContainer {
    width: 100%;
    height: 100%;
  }

  .hourglass-tip {
    animation-name: fadeInLeft;
    animation-duration: 3s;
    position: absolute;
    top: 10px;
    left: 10px;
    width: 220px;
    height: 290px;
    margin: auto;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .toleft {
      float: right;
      width: 18px;
      margin-top: 4px;
    }

    .darrow-left {
      width: 14px;
      height: 14px;
    }

    .yb {
      // top: 40px;
      // left: 10px;
      width: 100%;
      height: 140px;
      margin-top: 10px;
      z-index: 99;
      // background-color: pink;
    }

    .tip-message {
      font-size: 13px;
      margin: 4px 24px 0 24px;
    }
  }

  .back-main {
    position: absolute;
    top: 12px;
    left: 240px;
  }

  .outside {
    animation-name: fadeInLeft;
    animation-duration: 3s;
    position: absolute;
    top: 310px;
    left: 10px;
    width: 220px;
    height: 384px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    overflow: scroll;

    .toleft {
      position: absolute;
      top: 4px;
      right: 4px;
    }

    .title {
      font-size: 14px;
      text-align: center;
    }
  }

  .open-tip {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 16px;
    height: 16px;
    background-color: #fff;
  }

  .open-quyu {
    position: absolute;
    top: 320px;
    left: 10px;
    width: 16px;
    height: 16px;
    background-color: #fff;
  }
}
</style>
