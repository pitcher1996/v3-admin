<template>
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
      <vxe-column field="region" title="区域名称"></vxe-column>
      <vxe-column field="village" title="小区名称"></vxe-column>
      <vxe-column field="address" title="地址"></vxe-column>
      <vxe-column field="zipcode" title="邮编" show-overflow></vxe-column>
      <vxe-column field="area" title="小区面积"></vxe-column>
      <vxe-column field="build" title="楼栋数"></vxe-column>
      <vxe-column field="households" title="小区户数"></vxe-column>
      <vxe-column field="property" title="所属物业"></vxe-column>
      <vxe-column field="company" title="所属自来水公司"></vxe-column>
      <vxe-column field="person" title="创建人"></vxe-column>
      <vxe-column field="time" title="创建时间"></vxe-column>
      <vxe-column field="nearperson" title="最近更新人"></vxe-column>
      <vxe-column field="neartime" title="最近更新时间"></vxe-column>
      <vxe-column title="操作" width="100" show-overflow>
        <template #default="{ row }">
          <vxe-button type="text" icon="vxe-icon-edit" @click="editEvent(row)"></vxe-button>
          <vxe-button type="text" icon="vxe-icon-delete" @click="removeEvent(row)"></vxe-button>
        </template>
      </vxe-column>
    </vxe-table>

    <vxe-modal v-model="showEdit" :title="selectRow ? '编辑&保存' : '新增&保存'" width="800" height="90%" min-width="600"
      min-height="300" :loading="submitLoading" resize destroy-on-close>
      <template #default>
        <vxe-form :data="formData" :rules="formRules" title-align="right" title-width="100" @submit="submitEvent">
          <vxe-form-item field="region" title="区域名称" :span="12" :item-render="{}">
            <template #default="{ data }">
              <vxe-input v-model="data.region" placeholder="请输入区域名称"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="village" title="小区名称" :span="12" :item-render="{}">
            <template #default="{ data }">
              <vxe-input v-model="data.village" placeholder="请输入小区名称"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="build" title="楼栋数" :span="12" :item-render="{}">
            <template #default="{ data }">
              <vxe-input v-model="data.build" placeholder="请输入楼栋数"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="households" title="小区户数" :span="12" :item-render="{}">
            <template #default="{ data }">
              <vxe-input v-model="data.households" placeholder="请输入小区户数"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="area" title="小区面积" :span="12" :item-render="{}">
            <template #default="{ data }">
              <vxe-input v-model="data.area" placeholder="请输入小区面积"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="zipcode" title="邮政编码" :span="12" :item-render="{}">
            <template #default="{ data }">
              <vxe-input v-model="data.zipcode" placeholder="请输入邮政编码"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="checkedList" title="可选信息" :visible-method="visibleMethod" :span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-checkbox-group v-model="data.checkedList">
                <vxe-checkbox label="1" content="运动、跑步"></vxe-checkbox>
                <vxe-checkbox label="2" content="听音乐"></vxe-checkbox>
                <vxe-checkbox label="3" content="爬山"></vxe-checkbox>
                <vxe-checkbox label="4" content="吃美食"></vxe-checkbox>
              </vxe-checkbox-group>
            </template>
          </vxe-form-item>
          <vxe-form-item field="property" title="所属物业" :span="12" :item-render="{}">
            <template #default="{ data }">
              <vxe-input v-model="data.property" placeholder="请输入数值"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="company" title="自来水公司" :span="12" :item-render="{}">
            <template #default="{ data }">
              <vxe-input v-model="data.company" placeholder="请选择自来水公司" transfer></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="address" title="小区地址" :span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-textarea v-model="data.address" placeholder="请填写小区地址"></vxe-textarea>
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
          <vxe-form-item field="region" title="小区图片" :span="24" :item-render="{}">
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
              <el-input class="keyword" v-model="formData.village" clearable placeholder="请输入关键字"></el-input>
              <baidu-map class="baidu-map" :center="center" :zoom="zoom" @ready="handler" @click="getpoint"
                :scroll-wheel-zoom="true">
                <bm-local-search :keyword="formData.village" :auto-viewport="true" :location="city"></bm-local-search>
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
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import { storeToRefs } from 'pinia';
import { VXETable, VxeTableInstance, VxeColumnPropTypes, VxeFormPropTypes, VxeFormItemPropTypes, VxeTableEvents } from 'vxe-table'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'
import gcoord from 'gcoord' // 导入坐标转换
import { usePosition } from '@/store/modules/position' // 从pinia中导入到村的地理位置信息
import { useRouter } from 'vue-router'; // 导入路由模块
// 从store中取保存的坐标值
const store = usePosition();
const { czml } = storeToRefs(store);
const { change , saveForm} = store
// 使用路由
const router = useRouter()
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

const center = ref({ lng: 0, lat: 0 });
const zoom = ref(3);
const city = ref('')
const keyword = ref('')

const handler = ({ BMap, map }: any) => {
  console.log(BMap, map, 'bmmap');
  center.value.lng = 116.404;
  center.value.lat = 39.915;
  zoom.value = 15;
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

const updatePolygonPath = (e: any) => {
  polygonPath.value = e.target.getPath()
}
interface RowVO {
  id: number
  region: string
  village: string
  address: string
  zipcode: number
  area: string
  build: number
  households: number
  property: string
  company: string
  person: string
  time: string
  nearperson: string
  neartime: string
  jd: string,
  wd: string
}

const xTable = ref<VxeTableInstance<RowVO>>()

const formData = reactive({
  region: '',
  village: '',
  build: '',
  households: '',
  area: '',
  zipcode: '',
  property: '',// 物业
  address: '',
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
    region: '',
    village: '',
    build: '',
    households: '',
    area: '',
    zipcode: '',
    property: '', // 物业
    address: '',
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

const cellDBLClickEvent = (row :any) => {
  // editEvent(row)
  console.log(row.data,'row');
  // let rows = row.toString()
  router.push({path:'/basicInformation/unit',query: { data: JSON.stringify(row.data[0]) }} )
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

const submitEvent = () => {
  submitLoading.value = true
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
        // 将地图图标保存到pinia
        change(formData)
        // 将表单信息保存
        saveForm(formData)
        // 转换坐标系
        console.log(czml, 'pinia中的值');
      }
    }
  }, 500)
}

setTimeout(() => {
  const list: RowVO[] = [
    // { id: 10001, region: '中沛水表开关阀测试', village: '测试', address: 'Develop', zipcode: 123, area: '100m2', build: 1, households: 1, property: '无', company: '无', person: 'admin', time: '2023-06-01', nearperson: 'admin', neartime: '2023-06-01', jd: '11度', wd: '11度' },
    // { id: 10002, region: '中沛水表开关阀测试', village: '测试', address: 'Designer', zipcode: 123, area: '100m2', build: 1, households: 1, property: '无', company: '无', person: 'admin', time: '2023-06-01', nearperson: 'admin', neartime: '2023-06-01', jd: '11度', wd: '11度' },
  ]
  tableData.value = list
}, 100)

</script>
<style lang="scss" scoped>
.table-main {
  width: 98%;
  margin: auto;
}

.map {
  width: 100%;
  height: 240px;
  position: relative;

  // background-color: pink;
  .baidu-map {
    width: 100%;
    height: 240px;
    overflow: hidden;
  }

  // .city{
  //   z-index: 999;
  //   position: absolute;
  //   top:5px;
  //   left:5px;
  //   color: black;
  //   font-size: 14px;
  // }
  .keyword {
    z-index: 999;
    position: absolute;
    top: 6px;
    left: 6px;
    width: 200px;
    color: black;
    font-size: 14px;
  }

  .clear-line {
    z-index: 999;
    position: absolute;
    top: 6px;
    left: 210px;
    // width: 200px;
    color: black;
    font-size: 14px;
  }
}

.bm-view {
  width: 100%;
  height: 200px;
}

// 提示框
.vxe-modal--wrapper {
  z-index: 9999 !important;
}
</style>
