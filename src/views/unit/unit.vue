<template>
  <div class="content">
    <p class="title">当前小区：{{ selectXq.village }}<el-divider direction="vertical" />当前楼栋：{{ route.query.id }}<el-divider
        direction="vertical" /></p>
    <div class="search">
      <el-row :gutter="20">
        <el-col :span="6"> 楼栋号： <el-tree-select v-model="value" :data="lddata" check-strictly
            :render-after-expand="false" />
        </el-col>
        <!-- <el-button type="primary">查找</el-button> -->
        <el-col :span="6">
          <el-button type="primary" @click="showmap">打开地图</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="table-main">
      <vxe-toolbar>
        <template #buttons>
          <vxe-input v-model="searchName" placeholder="搜索"></vxe-input>
          <vxe-button status="primary">搜索</vxe-button>
          <vxe-button icon="vxe-icon-square-plus" @click="insertEvent()">新增</vxe-button>
        </template>
      </vxe-toolbar>
      <vxe-table border show-overflow ref="xTable" height="300" :column-config="{ resizable: true }"
        :row-config="{ isHover: true }" :data="tableData" @cell-dblclick="cellDBLClickEvent">
        <vxe-column type="seq" width="60"></vxe-column>
        <vxe-column field="community" title="小区名称"></vxe-column>
        <vxe-column field="buildingnumber" title="楼栋编号"></vxe-column>
        <vxe-column field="floors" title="楼层数"></vxe-column>
        <vxe-column field="households" title="户数" show-overflow></vxe-column>
        <vxe-column field="types" title="楼栋类型"></vxe-column>
        <vxe-column field="founder" title="创建人"></vxe-column>
        <vxe-column field="foundertime" title="创建时间"></vxe-column>
        <vxe-column field="updated" title="最近更新人"></vxe-column>
        <vxe-column field="updatedtime" title="最近时间"></vxe-column>
        <vxe-column field="notes" title="备注"></vxe-column>
        <vxe-column title="操作" width="100" show-overflow>
          <template #default="{ row }">
            <vxe-button type="text" icon="vxe-icon-edit" @click="editEvent(row)"></vxe-button>
            <vxe-button type="text" icon="vxe-icon-delete" @click="removeEvent(row)"></vxe-button>
          </template>
        </vxe-column>
      </vxe-table>
      <vxe-modal v-model="showEdit" :title="selectRow ? '编辑&保存' : '新增&保存'" width="800" height="96%" min-width="600"
        min-height="300" :loading="submitLoading" resize destroy-on-close>
        <template #default>
          <vxe-form :data="formData" :rules="formRules" title-align="right" title-width="100" @submit="submitEvent">
            <vxe-form-item field="community" title="小区名称" :span="12" :item-render="{}">
              <template #default="{ data }">
                <vxe-input v-model="data.community" placeholder="请输入小区名称"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item field="buildingnumber" title="楼栋编号" :span="12" :item-render="{}">
              <template #default="{ data }">
                <vxe-input v-model="data.buildingnumber" placeholder="请输入楼栋编号"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item field="floors" title="楼层数" :span="12" :item-render="{}">
              <template #default="{ data }">
                <vxe-input v-model="data.floors" placeholder="请输入楼层数"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item field="households" title="户数" :span="12" :item-render="{}">
              <template #default="{ data }">
                <vxe-input v-model="data.households" placeholder="请输入户数"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item field="types" title="楼栋类型" :span="12" :item-render="{}">
              <template #default="{ data }">
                <vxe-input v-model="data.types" placeholder="请输入楼栋类型"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item field="property" title="经度" :span="12" :item-render="{}">
              <template #default="{ data }">
                <vxe-input v-model="data.jd" placeholder="请输入经度"></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item field="company" title="纬度" :span="12" :item-render="{}">
              <template #default="{ data }">
                <vxe-input v-model="data.wd" placeholder="请输入纬度" transfer></vxe-input>
              </template>
            </vxe-form-item>
            <vxe-form-item field="img" title="小区图片" :span="24" :item-render="{}">
              <el-upload v-model:file-list="fileList" class="upload-demo"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple :on-preview="handlePreview"
                :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed">
                <el-button type="primary">上传小区图片</el-button>
                <template #tip>
                  <div class="el-upload__tip">
                    jpg/png文件,大小小于500KB。
                  </div>
                </template>
              </el-upload>
            </vxe-form-item>
            <vxe-form-item :span="24">
              <div class="map">
                <!-- <div class="city">请输入城市</div> -->
                <!-- <el-input class="city" v-model="city" placeholder="请输入城市"></el-input> -->
                <!-- <el-input class="keyword" v-model="keyword" clearable placeholder="请输入关键字"></el-input> -->
                <baidu-map class="baidu-map" :center="center" :zoom="zoom" @ready="handler" @click="getpoint"
                  :scroll-wheel-zoom="true">
                  <bm-local-search :keyword="keyword" :auto-viewport="true" :location="city"></bm-local-search>
                  <bm-polygon :path="polygonPath" stroke-color="blue" :stroke-opacity="0.5" :stroke-weight="2"
                    :editing="true" @lineupdate="updatePolygonPath" v-if="isdraw" />
                </baidu-map>
              </div>
            </vxe-form-item>
            <vxe-form-item align="center" title-align="left" :span="24">
              <template #default>
                <vxe-button type="submit">提交</vxe-button>
                <vxe-button type="reset">重置</vxe-button>
              </template>
            </vxe-form-item>
          </vxe-form>
        </template>
      </vxe-modal>
    </div>
    <div class="map-tip" v-show="drawer">
      <!-- <span @click="close()">✖️</span> -->
      <el-icon class="darrow" :size="20" @click="close()">
        <DArrowRight></DArrowRight>
      </el-icon>
      <el-tree-select class="cell-search" v-model="value" :data="data" :render-after-expand="false" />
      <home @setdata="setdata" ref="homePage"></home>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useRouter, useRoute } from 'vue-router'; // 导入路由模块
import { reactive, ref, onMounted, onActivated ,nextTick} from 'vue'
import type { Ref } from 'vue'
import { storeToRefs } from 'pinia';
import { VXETable, VxeTableInstance, VxeColumnPropTypes, VxeFormPropTypes, VxeFormItemPropTypes, VxeTableEvents } from 'vxe-table'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'
import gcoord from 'gcoord' // 导入坐标转换
import { usePosition } from '@/store/modules/position' // 从pinia中导入到村的地理位置信息
import home from '../dashboard/admin/index.vue'
import { buildErrorMessage } from 'vite';
// 从store中取保存的坐标值
const store = usePosition();
const { czml ,sumitData} : any = storeToRefs(store);
const { change, saveForm ,saveBuild ,buildMessage} = store
// 使用路由
let route: any = useRoute()
const router = useRouter()
let selectXq = JSON.parse(route.query.data)
console.log(selectXq,'selectXq');

onActivated(() => {
  selectXq = JSON.parse(route.query.data)
})
// 下拉框小区数据
const data = [
  {
    value: '1',
    label: '1单元',
    children: [
      {
        value: '1-1',
        label: '1楼',
        children: [
          {
            value: '1-0-1',
            label: '101',
          },
          {
            value: '1-0-2',
            label: '102',
          },
          {
            value: '1-0-2',
            label: '103',
          },
        ],
      },
      {
        value: '1-2',
        label: '2楼',
        children: [
          {
            value: '2-0-1',
            label: '201',
          },
          {
            value: '2-0-2',
            label: '202',
          },
          {
            value: '2-0-3',
            label: '203',
          },
        ],
      },
      {
        value: '1-3',
        label: '3楼',
        children: [
          {
            value: '3-0-1',
            label: '301',
          },
          {
            value: '2-0-2',
            label: '302',
          },
          {
            value: '3-0-3',
            label: '303',
          },
        ],
      },
    ],
  },
  {
    value: '2',
    label: '2单元',
    children: [
      {
        value: '1-1',
        label: '1楼',
        children: [
          {
            value: '1-0-1',
            label: '101',
          },
          {
            value: '1-0-2',
            label: '102',
          },
          {
            value: '1-0-2',
            label: '103',
          },
        ],
      },
      {
        value: '1-2',
        label: '2楼',
        children: [
          {
            value: '2-0-1',
            label: '201',
          },
          {
            value: '2-0-2',
            label: '202',
          },
          {
            value: '2-0-3',
            label: '203',
          },
        ],
      },
      {
        value: '1-3',
        label: '3楼',
        children: [
          {
            value: '3-0-1',
            label: '301',
          },
          {
            value: '2-0-2',
            label: '302',
          },
          {
            value: '3-0-3',
            label: '303',
          },
        ],
      },
    ],
  },
  {
    value: '3',
    label: '3单元',
    children: [
      {
        value: '1-1',
        label: '1楼',
        children: [
          {
            value: '1-0-1',
            label: '101',
          },
          {
            value: '1-0-2',
            label: '102',
          },
          {
            value: '1-0-2',
            label: '103',
          },
        ],
      },
      {
        value: '1-2',
        label: '2楼',
        children: [
          {
            value: '2-0-1',
            label: '201',
          },
          {
            value: '2-0-2',
            label: '202',
          },
          {
            value: '2-0-3',
            label: '203',
          },
        ],
      },
      {
        value: '1-3',
        label: '3楼',
        children: [
          {
            value: '3-0-1',
            label: '301',
          },
          {
            value: '2-0-2',
            label: '302',
          },
          {
            value: '3-0-3',
            label: '303',
          },
        ],
      },
    ],
  },
]
// 下拉框当前小区楼栋数据
const lddata = [{
  value: '1',
  label: '1幢',
},{
  value: '2',
  label: '2幢',
},{
  value: '3',
  label: '3幢',
}]

let drawer = ref(true)

// 导入首页文件
const homePage: any = ref(null)
const value = ref('')
// 搜索关键词
const searchName = ref('')
// 上传文件
const fileList = ref<UploadUserFile[]>([
  // {
  //   name: 'element-plus-logo.svg',
  //   url: 'https://element-plus.org/images/element-plus-logo.svg',
  // },
  // {
  //   name: 'element-plus-logo2.svg',
  //   url: 'https://element-plus.org/images/element-plus-logo.svg',
  // },
])
const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `限制文件为1个, 这次你选择了${files.length}个文件`
  )
  // 限制为1，您这次选择了个文件。长度文件，加起来为个文件。上传长度文件。总共长度
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `是否删除${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  )
}

// 展示地图，需要保留
const showmap = () => {
  drawer.value = !drawer.value
}
// 关闭小区选择弹框
const close = () => {
  drawer.value = false
}

const center = ref({ lng: 0, lat: 0 });
const zoom = ref(3);
const city = ref('')
const keyword = ref('')

const handler = ({ BMap, map }: any) => {
  console.log(BMap, map, 'bmmap');
  let jd = sumitData.value.jd
  let wd = sumitData.value.wd
  let result = gcoord.transform(
    [jd, wd],           // 经纬度坐标
    gcoord.WGS84,        // 当前坐标系
    gcoord.BD09,       // 目标坐标系
  );
  center.value.lng = result[0]
  center.value.lat = result[1]
  zoom.value = 18
}
// 绘制点
const getpoint = ({ target, point, pixel, overlay }: any) => {
  // console.log('点击事件经纬度', point.lng, point.lat);
  let jd = point.lng
  let wd = point.lat
  // 将百度坐标转换为WGS84坐标
  let result = gcoord.transform(
    [jd, wd],           // 经纬度坐标
    gcoord.BD09,        // 当前坐标系
    gcoord.WGS84,       // 目标坐标系
  );
  formData.jd = result[0]
  formData.wd = result[1]
  polygonPath.value.push(point)
}
// 绘制折线
const polygonPath = ref<any[]>([]);
// 是否进入点编辑模式
let isdraw = ref(false)

const setdata = (id: string) => { }

const updatePolygonPath = (e: any) => {
  polygonPath.value = e.target.getPath()
}
interface RowVO {
  id: number
  community: string
  buildingnumber: string
  floors: string
  households: number
  types: string
  founder: number
  foundertime: number
  updated: string
  updatedtime: string
  notes: string
  jd: string,
  wd: string
}

const xTable = ref<VxeTableInstance<RowVO>>()

const formData = reactive({
  community: '',
  buildingnumber: '',
  floors: '',
  households: '',
  types: '',
  founder: '',
  foundertime: '',
  updated: '',
  updatedtime:'',
  notes:'',
  jd: '',
  wd: '',
})

const submitLoading = ref(false)
const showEdit = ref(false)
const selectRow = ref<RowVO | null>()
const tableData = ref<RowVO[]>([])

const sexList = ref([
  { label: '女', value: '0' },
  { label: '男', value: '1' }
])

const formRules = reactive<VxeFormPropTypes.Rules>({
  region: [
    { required: true, message: '请输入名称' },
    { min: 3, max: 5, message: '长度在 3 到 5 个字符' }
  ],
  nickname: [
    { required: true, message: '请输入昵称' }
  ],
  sex: [
    { required: true, message: '请选择性别' }
  ]
})

const visibleMethod: VxeFormItemPropTypes.VisibleMethod = ({ data }) => {
  return data.flag1 === 'Y'
}

const insertEvent = () => {
  Object.assign(formData, {
    community: '',
    buildingnumber: '',
    floors: '',
    households: '',
    types: '',
    founder: '',
    foundertime: '',
    updated: '',
    updatedtime:'',
    notes:'',
    jd: '',
    wd: '',
  })
  selectRow.value = null
  showEdit.value = true
}

const editEvent = (row: RowVO) => {
  Object.assign(formData, row)
  selectRow.value = row
  showEdit.value = true
}

const cellDBLClickEvent = (row: any) => {
  // editEvent(row)
  console.log(row.data, 'row');
  // let rows = row.toString()
  // 前往户表信息
  // router.push({ path: '/basicInformation/build', query: { data: JSON.stringify(row.data[0]) } })
  router.push({ path: '/basicInformation/build' })
}

const removeEvent = async (row: RowVO) => {
  const type = await VXETable.modal.confirm('您确定要删除该数据?')
  if (type === 'confirm') {
    const $table = xTable.value
    if ($table) {
      $table.remove(row)
    }
  }
}
let showbaidumap = ref(true)
// 提交楼栋信息
const submitEvent = async() => {
  submitLoading.value = true
  // showbaidumap.value = false
  await nextTick()
  setTimeout(() => {
    const $table = xTable.value
    if ($table) {
      submitLoading.value = false
      showEdit.value = false
      if (selectRow.value) {
        VXETable.modal.message({ content: '保存成功', status: 'success' })
        Object.assign(selectRow.value, formData)
      } else {
        VXETable.modal.message({ content: '新增成功', status: 'success' })
        $table.insert({ ...formData })
        // 将楼栋信息保存到pinia
        buildMessage(formData)
        // 将表单信息保存
        saveBuild(formData)
        // 加载完成后要立即刷新地图组件
        // 根据高度展示不同广告牌
        homePage.value.interbuild()
        homePage.value.addregion('setbuild')
      }
    }
  }, 500)
}

setTimeout(() => {
  const list: RowVO[] = []
  tableData.value = list
}, 100)


</script>
<style lang="scss" scoped>
.content {
  padding: 8px;

  .title {
    font-size: 14px;
  }

  .search {
    font-size: 14px;
  }

  .unit-table {
    margin-top: 10px;
  }

  .map-tip {
    position: fixed;
    width: 300px;
    height: 100%;
    background-color: #fff;
    top: 0px;
    right: 0px;
    z-index: 999;
    overflow: hidden;

    .darrow {
      position: fixed;
      z-index: 9990;
    }

    .cell-search{
      position: fixed;
      z-index: 9990;
    }
  }
}

.map {
  width: 100%;
  height: 240px;
  position: relative;
  background-color: pink;

  // background-color: pink;
  .baidu-map {
    width: 100%;
    height: 240px;
    overflow: hidden;
  }
}

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

//  修改头部文字
::v-deep .el-drawer__header {
  margin-bottom: 0px;
  padding: 10px;
}

::v-deep .el-drawer__body {
  padding: 0px;
}
</style>
