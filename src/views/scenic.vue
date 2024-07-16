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
                <span class="page-title">景点浏览</span>
                <span class="page-desc">网罗天下美景，助您直达完美之旅。</span>
              </div>
            </div>
          </div>
        </div>

        <div id="content">
          <div class="user-searchbox">
            <el-input
                v-model="searchInput"
                id="search-spots-input"
                class="user-search"
                placeholder="搜索景点"/>
            <el-button
                id="search-spots"
                :icon="Search"
                circle
            />
          </div>
        </div>

        <div class="card-container">
          <el-row :gutter="8">
            <el-col v-for="(item, index) in items" :key="index" :span="6">
              <el-card class="box-card">
                <img :src="item.image" class="card-image" alt="Image">
                <div style="padding: 12px;">
                  <span class="card-name">{{ item.name }}</span>
                  <div class="card-description">{{ item.description }}</div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-main>
      <Footer style="margin-top:40px;"/>
    </el-container>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {Search} from "@element-plus/icons-vue";
import Top from "@/components/Top.vue";

const searchInput = ref('')

const items = [
  {image: 'src/assets/images/uploads/1280x800/login-background.jpg', name: 'Name 1', description: 'Description 1'},
  {image: 'https://via.placeholder.com/150', name: 'Name 2', description: 'Description 2'},
  {image: 'https://via.placeholder.com/150', name: 'Name 3', description: 'Description 3'},
  {image: 'https://via.placeholder.com/150', name: 'Name 4', description: 'Description 4'},
  {image: 'https://via.placeholder.com/150', name: 'Name 5', description: 'Description 5'},
  {image: 'https://via.placeholder.com/150', name: 'Name 6', description: 'Description 6'},
  {image: 'https://via.placeholder.com/150', name: 'Name 7', description: 'Description 7'},
  {image: 'https://via.placeholder.com/150', name: 'Name 8', description: 'Description 8'},

]
</script>

<style scoped>
@import "@/assets/styles/css/style.css";


</style>


