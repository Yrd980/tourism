<template>
  <div class="tourism">
    <el-container>
      <el-header>
        <Top/>
      </el-header>
      <el-main>
        <div id="wrapper">
          <div id="container">
            <div class="subheader">
              <div class="left">
                <span class="page-title">投诉信息</span>
                <span class="page-desc">发起投诉</span>
              </div>
            </div>
            <div>


            </div>
          </div>
        </div>
        <ComplaintList/>
        <Footer/>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>

import Footer from "@/components/Footer.vue";
import Top from "@/components/Top.vue";
import ComplaintList from "@/views/ComplaintList.vue";
</script>

<style scoped>
@import "@/assets/styles/css/style.css";
</style>
