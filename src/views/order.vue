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
            <section id="content">
              <div class="two-third">
                <div id="searchmodule" class="tabs">
                  <ul class="tab-control">
                    <li><a href="#hotel-search">酒店预定</a></li>
                  </ul>

                  <div id="hotel-search" class="tab-content">
                    <form action="#">
                      <div class="field">
                        <label for="hotel-to">城市:</label>
                        <input type="text" id="hotel-to" class="input-text" placeholder="输入地址" autocomplete="off"/>
                      </div>
                      <div class="field half">
                        <label for="hotel-depart">入住日期:</label>
                        <input type="text" id="hotel-depart" class="input-text input-cal" placeholder="点击选择"
                               autocomplete="off"/>
                      </div>
                      <div class="field half even">
                        <label for="hotel-return">离店日期:</label>
                        <input type="text" id="hotel-return" class="input-text input-cal" placeholder="点击选择"
                               autocomplete="off"/>
                      </div>
                      <div class="field half even">
                        <label for="hotel-room">人数:</label>
                        <select id="hotel-room">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                        </select>
                      </div>
                      <button type="submit" class="submit hotel-search-button">查询</button>
                      <br class="clear"/>
                    </form>
                  </div>

                  <!--travel search -->
                </div>
              </div>
              <!--searchmodule -->

              <div class="one-third last">
                <div id="newsletter" class="module">
                  <div class="module-content">
                    <div class="module-content-wrap">
                      <a href="www.baidu.com"><img width="100%" height="auto"
                                                   src="https://source.qunarzz.com/site/images/wns/20171019_pc_464x320_7667.jpg"/></a>
                    </div>
                  </div>
                </div>
              </div>
              <!--newsletter -->

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
                <a class="right" href="spots.html">查看所有目的地</a>
              </div>

              <div class="fourth-spots">

              </div>


              <div class="action-box">
                <div class="left">
                  <div class="action-title">30％的折扣：3晚豪华逃生到巴厘岛库塔</div>
                  <div class="action-desc">
                    一场前所未有的旅途体验，带上你的好友们快来体验吧！点击现在预定获取最低优惠，我们等你哦~
                  </div>
                </div>
                <div class="right">
                  <a class="button">
                    现在预定
                  </a>
                </div>
              </div>
              <!--action-box -->


              <br class="clear"/>
            </section>
          </div>
        </div>
        <Footer/>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">

import Footer from "@/components/Footer.vue";
import Top from "@/components/Top.vue";
import Slide from "@/layout/components/slide.vue";
</script>

<style scoped>

</style>
