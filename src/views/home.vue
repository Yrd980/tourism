<template>
  <div class="tourism">
    <el-container>
      <el-header>
        <Top/>
      </el-header>
      <el-main>
        <slide style="margin-bottom: 40px"/>
        <div id="wrapper">
          <div id="container">
            <div id="content" style="margin-bottom: 250px">

              <div class="hr">
                <hr/>
              </div>

              <div class="one-third">
                <h3 class="icon32 icon-tick thin">技术领先</h3>
                <p>
                  我们一直将技术创新视为企业的活力源泉，在提升研发能力方面不遗余力。我们建立了一整套现代化服务系统，包括：国际机票、酒店预订平台、客户管理系统、房量管理系统、呼叫排队系统、订单处理系统、服务质量监控系统等。依靠这些先进的服务和管理系统，我们为会员提供更加便捷和高效的服务。</p>
              </div>

              <div class="one-third">
                <h3 class="icon32 icon-tick thin">规模经营</h3>
                <p>
                  服务规模化和资源规模化是我们的核心优势之一。我们在全球200个国家和地区与近80万家酒店建立了长期稳定的合作关系，其机票预订网络已覆盖国际国内绝大多数航线。规模化的运营不仅可以为会员提供更多优质的旅行选择，还保障了服务的标准化，确保服务质量，并降低运营成本。</p>
              </div>

              <div class="one-third last">
                <h3 class="icon32 icon-tick thin">体系规范</h3>
                <p>
                  先进的管理和控制体系是我们的又一核心优势。我们将服务过程分割成多个环节，以细化的指标控制不同环节，并建立起一套精益服务体系。同时，我们还将制造业的质量管理方法——六西格玛体系成功运用于旅行业。目前，我们各项服务指标均已接近国际领先水平，服务质量和客户满意度也随之大幅提升。</p>
              </div>

              <div class="hr">
                <hr/>
              </div>

              <!--newsection -->
              <div class="section-title">
                <span class="h3">热门目的地</span>
                <router-link style="float: right" to="/recommend">查看目的地</router-link>
              </div>

              <div class="card-container" style="transform: translateX(-10px) ; max-height: 600px">
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

            </div>
          </div>
        </div>
        <Footer/>
      </el-main>
    </el-container>
  </div>
</template>


<script setup>
import Top from "@/components/Top.vue";
import Footer from "@/components/Footer.vue";
import Slide from "@/layout/components/slide.vue";
import useUserStore from '@/store/modules/user'
import {ref} from 'vue'

const userStore = useUserStore();
const size = ref('default')

const items = [
  {
    image: 'src/assets/images/home/image1_1.jpg',
    name: '武侯祠',
    description: '此身抱薪，可付丹鼎，五十四年春秋昭炎汉长明。南征北伐，誓还旧都，二十四代王业不偏安一隅。'
  },
  {
    image: 'src/assets/images/home/image2_1.jpg',
    name: '文殊院',
    description: '大片红墙，明星打卡地，感受都市里的寺庙祈福。'
  },
  {image: 'src/assets/images/home/image3_1.jpg', name: '杜甫草堂', description: '杜甫诗人的故居，清幽秀丽的诗意景象'},
  {
    image: 'src/assets/images/home/image4_1.jpg',
    name: '东郊记忆',
    description: '工业风建筑拍照嘎嘎出片，周末会有很多特色主题的集市。'
  },
  {
    image: 'src/assets/images/home/image5_1.jpg',
    name: '大熊猫基地',
    description: '都来成都了真的不去大熊猫基地看看吗。'
  },
  {
    image: 'src/assets/images/home/image6_1.jpg',
    name: '都江堰',
    description: '千年古堰，天府之源。晚上灯光映水，欣赏南桥夜景。'
  },
  {
    image: 'src/assets/images/home/image7_1.jpg',
    name: '青城山',
    description: '拜水都江堰，问道青城山。青城山是西蜀第一山，是孙悟空拜师的取景地，还可以了解道教和太极的发源。'
  },
  {
    image: 'src/assets/images/home/image8_1.jpg',
    name: '三星堆',
    description: '一场跨越时空的对话，亲身感受历史带来的震撼'
  },

]

</script>


<style scoped>
@import "src/assets/styles/css/style.css";

</style>
