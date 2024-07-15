<template>
  <div class="tourism">
    <el-container>
      <el-header>
        <Top/>
      </el-header>
      <el-main>
        <slide/>
      </el-main>
      <el-footer>
        <Footer/>
      </el-footer>
    </el-container>
  </div>
</template>


<script setup lang="ts">
import Top from "@/components/Top.vue";
import Footer from "@/components/Footer.vue";
import Slide from "@/layout/components/slide.vue";
</script>


<style scoped>
@import "src/assets/styles/css/style.css";

</style>
