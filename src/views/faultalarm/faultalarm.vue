<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px" height="100%">
        <el-input
        v-model="input2"
        class="w-50 m-2"
        placeholder="仪表编号"
        :prefix-icon="Search"
      />
      <div class="left-select">
        <el-divider content-position="left">事件级别</el-divider>
        <el-checkbox v-model="checked1" style="display:block;" label="次要报警" size="large" />
        <el-checkbox v-model="checked2" style="display:block;" label="主要报警" size="large" />
        <el-divider content-position="left">事件类型</el-divider>
        <el-checkbox v-model="checked3" style="display:block;" label="漏损率" size="large" />
        <el-checkbox v-model="checked4" style="display:block;" label="夜间小流" size="large" />
        <el-checkbox v-model="checked5" style="display:block;" label="仪表报警" size="large" />
        <el-checkbox v-model="checked6" style="display:block;" label="压力" size="large" />
      </div>
      </el-aside>
      <el-main>
        <div class="content">
          <p class="title">事件管理</p>
          <el-divider />
          <tableitem></tableitem>
          <tableitem></tableitem>
          <tableitem></tableitem>
          <tableitem></tableitem>
          <tableitem></tableitem>
          <tableitem></tableitem>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang='ts'>
import { ref , reactive } from 'vue'
import { Calendar, Search } from '@element-plus/icons-vue'
import tableitem from './components/tableitem.vue';
const input2 = ref('')
// 复选框
const checked1 = ref(true)
const checked2 = ref(false)
const checked3 = ref(true)
const checked4 = ref(false)
const checked5 = ref(true)
const checked6 = ref(false)
</script>
<style lang="scss" scoped>
::v-deep .el-input{
  width:180px;
}
::v-deep .el-divider__text {
  background-color: rgba(0, 0, 0, 0);
}
.common-layout{
  .left-select{
    width:96%;
    margin: auto;
  }
  .content{
    margin-top: -10px;
    width:100%;
    height: 100vh;
    border: 1px solid #dcdfe6;
    background-color: #fff;
    .title{
      line-height: 14px;
      margin-left: 6px;
      font-size: 14px;
    }
  }
}
</style>
