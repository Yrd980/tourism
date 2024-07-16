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
                <span class="page-title">景点推荐</span>
                <span class="page-desc">网罗天下美景，助您直达完美之旅。</span>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="left-side">
            <!-- 左边内容 -->
            <span>{{ scenic.name }}</span>
            <div>{{ scenic.description }}</div>

          </div>
          <div class="right-side">
            <div class="widget categories">
              <div class="h3 widget-title">
                分类目录
              </div>
              <div class="widget-content">
                <ul>
                  <li>
                    <a href="#"><span class="ui-icon ui-icon-triangle-1-e"></span> 旅游目的地</a>
                    <small>23</small>
                  </li>
                  <li>
                    <a href="#"><span class="ui-icon ui-icon-triangle-1-e"></span> 旅游小贴士</a>
                    <small>12</small>
                  </li>
                  <li>
                    <a href="#"><span class="ui-icon ui-icon-triangle-1-e"></span> 旅游新闻</a>
                    <small>9</small>
                  </li>
                  <li>
                    <a href="#"><span class="ui-icon ui-icon-triangle-1-e"></span> 特价旅游</a>
                    <small>19</small>
                  </li>
                </ul>
              </div>
            </div>

            <div class="widget tabs-widget">
              <div class="h3 widget-title">
                最新评论
              </div>
              <div class="widget-content">
                <div class="tabs">
                  <ul class="tab-control">
                    <li><a href="#tabs-1" id="tab-1-name">朱利尔</a></li>
                  </ul>
                  <div id="tabs-1" class="tab-content">
                    <p id="tab-1-value">Morbic. Duis.</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="widget accordion-widget">
              <div class="h3 widget-title">
                注意事项
              </div>
              <div class="widget-content">
                <div class="accordion">
                  <el-collapse v-model="activeName" accordion>
                    <el-collapse-item title="旅行保障" name="1">
                      <div class="acc-content">
                        <p>
                          先进的管理和控制体系是我们的又一核心优势。我们将服务过程分割成多个环节，以细化的指标控制不同环节，并建立起一套精益服务体系。同时，我们还将制造业的质量管理方法——六西格玛体系成功运用于旅行业。目前，我们各项服务指标均已接近国际领先水平，服务质量和客户满意度也随之大幅提升。</p>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item title="出现保障" name="2">
                      <div class="acc-content">
                        <p>
                          出门必带的东西，要知道我们是会出去放松的，自然不会带很多的东西，但这几件东西一定不能忘，最重要的就是身份证和银行卡，现在什么都是安全为主，如果没有身份证车票、住宿，门票都买不到，即使你到了景点都只能眼巴巴的看着别人去游玩，第二就是银行卡，很多人觉得现在都是网上支付，微信、支付宝应有尽有，其实不然这些是都需要手机，如果在外手机没电了，或是不小心遗失，这时候银行卡就会发挥巨大的作用，所以为了以防万一，一定要带一张有钱的银行卡。</p>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item title="疾病预防" name="3">
                      <div class="acc-content">
                        <p>了解当地医疗制度、费用情况，结合自身身体情况制订适宜的医疗计划，选择购买适合的医疗保险。
                          应急救治
                          了解附近药店、医院的具体位置，熟记当地的急救电话。并将相关信息记录留存备用。
                          关注疫情
                          关注当地报纸、电视等新闻媒体，了解有无疫情爆发。
                          饮食卫生
                          日常生活注意饮食卫生，照顾好自己的身体。
                          不吃不新鲜的食物和变质食物，不吃陌生人交给的食物，不吃捡拾得来的食物，不采摘食用蘑菇和其它不认识的食物。
                          注意食品保质期和保质方法。加工菜豆、豆浆等豆类食品时须充分加热。不吃发芽、发霉的土豆和花生。保持饮用水和厨房用水清洁干净，否则，应把水煮沸或进行消毒处理后饮用。
                          中毒救治
                          发生食物中毒，应立即停止食用可疑食品，赴医院寻求专业救治，或在专业人员指导下，采取饮水、催吐、导泻等方法进行自救。
                          尊重风俗
                          伊斯兰国家禁酒，禁止食用动物血液、猪肉和有利齿利爪的猛兽（如狗肉）、非反刍动物（如驴肉）或自死动物（包括因打、摔、触、勒、电等原因而死的动物）。
                          抑制传染病
                          有效抑制传染病的流行，关键在于切断传染病的传播链：即控制传染源、切断传播途径、保护易感染人群。
                          预防先行
                          养成讲卫生的好习惯，注意个人卫生、食品卫生、环境卫生。
                          加强身体锻炼，提高免疫能力。
                          按规定接种疫苗。对传染病人要早发现、早报告、早治疗、早隔离。防止交叉感染。</p>
                      </div>
                    </el-collapse-item>
                  </el-collapse>
                </div>
              </div>
            </div>

            <div class="widget tag-widget">
              <div class="h3 widget-title">
                热门标签
              </div>
              <div class="widget-content">
                <div class="tag-cloud">
                  <a href="#">国内游</a>
                  <a href="#">五一欢乐游</a>
                  <a href="#">国庆七天乐</a>
                  <a href="#">欧洲</a>
                  <a href="#">东南亚</a>
                  <a href="#">家庭</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-main>
      <Footer/>
    </el-container>
  </div>
</template>

<script setup>
import Top from "@/components/Top.vue";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {attractionData} from "@/views/route/data.js";

const activeName = ref('1')

const route = useRoute() //使用钩子函数获取路由
const scenic = ref({
  id: 1,
  name: "东方明珠塔",
  description: "东方明珠广播电视塔是上海的标志性文化景观之一，塔高约468米。",
  image: "https://example.com/image/oriental_pearl_tower.jpg",
  position: [121.4737, 31.2304], // 经度, 纬度
})

onMounted(() => {
  let index = route.params.id
  scenic.value = attractionData[index]
})

</script>

<style scoped>
@import "@/assets/styles/css/style.css";

.container {
  display: flex;
}

.left-side {
  flex: 0 0 40%; /* 占据宽度60%，剩余40%给右边的div */
  margin-left: 260px;
  margin-right: 30px;
  background-color: #f0f0f0;
}

.right-side {
  flex: 0 0 22%; /* 占据宽度40%，剩余60%给左边的div */
  background-color: #ddd;
}
</style>
