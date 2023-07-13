<template>
<div class="main">
  <div class="left">
    <el-icon :size="26">
      <Odometer></Odometer>
    </el-icon>
  </div>
  <div class="right">
    <p>001<span style="color: red;">(仪表报警)</span></p>
    <p>事件探测时间：2023-01-01 区域名称：万利大厦 仪表报警：---</p>
  </div>
</div>
<el-divider />
</template>

<script setup lang='ts'>
import { ref , reactive } from 'vue'

</script>
<style lang="scss" scoped>
.main{
  width:100%;
  height:80px;
  display: flex;
  align-items: center;
  // background-color: pink;
  .left{
    width:100px;
    text-align: center;
    align-items: center;
  }
  .right{

  }
}
.el-divider{
  margin: 14px 0 !important;
}
</style>
