// core
import { createApp } from "vue"
import App from "@/App.vue"
import store from "@/store"
import router from "@/router"
import "@/router/permission"
import BaiduMap from 'vue-baidu-map-3x' // 导入百度地图组件
// load
import { loadSvg } from "@/icons"
import { loadPlugins } from "@/plugins"
import { loadDirectives } from "@/directives"
// css
import "uno.css"
import "normalize.css"
import "element-plus/dist/index.css"
import "element-plus/theme-chalk/dark/css-vars.css"
import "vxe-table/lib/style.css"
import "vxe-table-plugin-element/dist/style.css"
import "@/styles/index.scss"
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

//VXETable全局参数
VXETable.setup({
  zIndex: 999, // 全局 zIndex 起始值，如果项目的的 z-index 样式值过大时就需要跟随设置更大，避免被遮挡
})

function useTable (app:any) {
  app.use(VXETable)
}

const app = createApp(App)

/** 加载插件 */
loadPlugins(app)
/** 加载全局 SVG */
loadSvg(app)
/** 加载自定义指令 */
loadDirectives(app)

app.use(store).use(router).use(BaiduMap,{
  ak:'1hKv9tskwuH6cUZ4v7z1X2DDCpQdhGGw'
}).use(useTable)
router.isReady().then(() => {
  app.mount("#app")
})
