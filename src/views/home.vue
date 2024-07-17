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
                      <img :src="item.pic_url" class="card-image" alt="Image">
                      <div style="padding: 12px;">
                        <span class="card-name">{{ item.name }}</span>
                        <div class="card-description">{{ item.desc }}</div>
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
import {onMounted, ref} from 'vue'
import {getAllScenicareas} from "@/api/scenic/index.js";

const userStore = useUserStore();
const size = ref('default')
const items = ref([])

onMounted(async () => {
  const res = await getAllScenicareas()
  items.value = res.data
})

</script>


<style scoped>
@import "src/assets/styles/css/style.css";

</style>
