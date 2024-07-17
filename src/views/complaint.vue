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
              <el-form ref="complaintsRef" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="用户id" prop="userId">
                  <el-input v-model="form.userId" placeholder="请输入用户id" />
                </el-form-item>
                <el-form-item label="投诉内容" prop="content">
                  <el-input v-model="form.content" type="textarea" placeholder="请输入内容" />
                </el-form-item>
                <el-form-item label="投诉时间" prop="submitTime">
                  <el-date-picker clearable
                                  v-model="form.submitTime"
                                  type="date"
                                  value-format="YYYY-MM-DD"
                                  placeholder="请选择投诉时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="上传图片" prop="image">
                  <image-upload v-model="form.image"/>
                </el-form-item>
              </el-form>
              <template #footer>
                <div class="dialog-footer">
                  <el-button type="primary" @click="submitForm">确 定</el-button>
                  <el-button @click="cancel">取 消</el-button>
                </div>
              </template>
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

</style>
