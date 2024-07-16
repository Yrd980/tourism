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
                  <router-link
                      :to="{ name: 'detail', params: { id: index }}"
                  >
                    查看详情
                  </router-link>
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
  {image: 'src/assets/images/home/image1_1.jpg', name: '武侯祠', description: '此身抱薪，可付丹鼎，五十四年春秋昭炎汉长明。南征北伐，誓还旧都，二十四代王业不偏安一隅。'},
  {image: 'src/assets/images/home/image2_1.jpg', name: '文殊院', description: '大片红墙，明星打卡地，感受都市里的寺庙祈福。'},
  {image: 'src/assets/images/home/image3_1.jpg', name: '杜甫草堂', description: '杜甫诗人的故居，清幽秀丽的诗意景象'},
  {image: 'src/assets/images/home/image4_1.jpg', name: '东郊记忆', description: '工业风建筑拍照嘎嘎出片，周末会有很多特色主题的集市。'},
  {image: 'src/assets/images/home/image5_1.jpg', name: '大熊猫基地', description: '都来成都了真的不去大熊猫基地看看吗。'},
  {image: 'src/assets/images/home/image6_1.jpg', name: '都江堰', description: '千年古堰，天府之源。晚上灯光映水，欣赏南桥夜景。'},
  {image: 'src/assets/images/home/image7_1.jpg', name: '青城山', description: '拜水都江堰，问道青城山。青城山是西蜀第一山，是孙悟空拜师的取景地，还可以了解道教和太极的发源。'},
  {image: 'src/assets/images/home/image8_1.jpg', name: '三星堆', description: '一场跨越时空的对话，亲身感受历史带来的震撼'},

]
</script>

<style scoped>
@import "@/assets/styles/css/style.css";

</style>


