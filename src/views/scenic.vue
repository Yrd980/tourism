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
      <el-footer>
        <Footer/>
      </el-footer>
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
  {image: 'https://via.placeholder.com/150', name: 'Name 9', description: 'Description 9'},
  {image: 'https://via.placeholder.com/150', name: 'Name 10', description: 'Description 10'},
  {image: 'https://via.placeholder.com/150', name: 'Name 11', description: 'Description 11'},
  {image: 'https://via.placeholder.com/150', name: 'Name 12', description: 'Description 12'},
  {image: 'https://via.placeholder.com/150', name: 'Name 13', description: 'Description 13'},
  {image: 'https://via.placeholder.com/150', name: 'Name 14', description: 'Description 14'},
  {image: 'https://via.placeholder.com/150', name: 'Name 15', description: 'Description 15'},
  {image: 'https://via.placeholder.com/150', name: 'Name 16', description: 'Description 16'},
]
</script>

<style scoped>
@import "@/assets/styles/css/style.css";

.tourism {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 确保页面内容高度至少为视口高度 */
  background-image: url('src/assets/images/uploads/1280x800/moscow.jpg');
  background-color: rgba(255, 255, 255, 0.5);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.card-container {
  display: flex;
  flex-wrap: wrap; /* 允许在子元素超出容器时换行 */
  flex-grow: 1;
  justify-content: center; /* 子元素之间留有空间 */
  margin-top: 20px;
  margin-bottom: 20px;
  width: 960px;
  height: 600px;
  transform: translateX(250px);
}

.box-card {
  transition: 0.3s;
}

.box-card:hover {
  transform: translateY(-10px);
}

.card-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.card-name {
  font-weight: bold;
  font-size: 16px;
}

.card-description {
  color: #666;
  margin-top: 10px;
}
</style>


