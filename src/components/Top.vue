<template>
  <el-tabs
      style="height: 200px;
      display: flex;
      justify-content: center;"
      @tab-click="handleClick()"
  >
    <el-tab-pane label="首页" name="home"></el-tab-pane>
    <el-tab-pane label="景点" name="scenic"></el-tab-pane>
    <el-tab-pane label="景点推荐" name="recommend"></el-tab-pane>
    <el-tab-pane label="路线" name="route"></el-tab-pane>
    <el-tab-pane label="我的订单" name="order"></el-tab-pane>
  </el-tabs>
  <slide/>
</template>

<script setup lang="ts">
import Slide from "@/layout/components/slide.vue";

const handleClick = ()=>{
  console.log(this)
}
</script>

<style scoped>

</style>
